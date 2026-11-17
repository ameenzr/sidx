# sid-X App Logic

> How the app is wired: data flow, navigation, and state. For visual rules see
> `DESIGN membership community.md` and `sid-x light theme.md`.
>
> Verified against the code on 2026-11-17. If you change navigation or state
> ownership, update this file in the same commit.

---

## 1. Stack

| Thing | Version / choice |
|---|---|
| Framework | **Next.js 16.2.2**, App Router |
| React | 19.2.4 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/postcss`), tokens in `src/app/globals.css` |
| Animation | `framer-motion` |
| Icons | Inline SVG paths, mostly Heroicons outline. `lucide-react` is installed but barely used |
| Fonts | DM Sans (`--font-dm-sans`), DM Serif Display (`--font-dm-serif-display`), IBM Plex Mono (`--font-ibm-plex-mono`) |
| Sessions | `jose` (HS256 JWT) |

`npm run dev` binds `0.0.0.0` so a phone on the same Wi-Fi can load it;
`next.config.ts` whitelists the LAN IPs via `allowedDevOrigins`.

---

## 2. Architecture & data flow

No backend, no database, no API calls for content. Data flows one way from a
static module into components.

- **Source of truth:** `src/lib/mock-data.ts` — the faux database. Exports
  `featuredItems`, `hotProjects` (and `exploreProjects`, which is just an alias
  of `hotProjects`), `homePerks`, `userRewards`, `userPortfolio`,
  `portfolioInvestments`, plus the `Item`, `HomePerk` and `PortfolioInvestment`
  types.
- **Data fetching:** none. Components `import` the arrays directly.
- **Rendering:** almost everything is a Client Component. `src/app/page.tsx`
  itself is `"use client"`, so the whole interactive app ships to the browser.
  The only server-side files are `layout.tsx`, `login/layout.tsx`, the two
  route handlers, and `proxy.ts`.
- Some screens keep their own local data instead of using `mock-data.ts` —
  `AirportsScreen`, `BenefitsScreen`, `InboxScreen` and `EventsScreen` define
  their lists inline at the top of the file. If you are changing content, check
  the screen file before assuming it lives in `mock-data.ts`.

---

## 3. Routing

Only three real routes exist:

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | The entire app |
| `/login` | `src/app/login/page.tsx` | Password gate, own minimal layout |
| `/api/auth/login`, `/api/auth/logout` | route handlers | Session cookie in / out |

**Everything inside the app is tab state, not routing.** `page.tsx` holds a
single `activeTab` string and conditionally renders one screen at a time. There
are no nested routes, no URL changes, and therefore **no browser back button and
no deep links** — a reload always returns to Home.

### Tabs and sub-screens

`activeTab` takes one of nine values:

- **Main tabs** (bottom nav visible): `Home`, `Projects`, `Travel`, `Community`
- **Sub-screens** (bottom nav hidden, back arrow in header): `Portfolio`,
  `Airports`, `Events`, `Benefits`, `Inbox`

`isSubScreen` drives that difference. Back behaviour is hardcoded in
`handleBack`: Airports → Travel, Events/Benefits → Community, Portfolio and
Inbox → Home.

Child screens never set tabs themselves; they take callbacks
(`onBack`, `onOpenPortfolio`, `onOpenEvents`, `onOpenBenefits`,
`onOpenAirports`) so all navigation stays owned by `page.tsx`.

`openAirports(airport?, service?)` is a deep-link-ish helper: it stashes the
target in `airportsNav` state and switches tabs, so `AirportsScreen` can open
pre-scrolled to a given airport or service.

---

## 4. Auth

A single shared password, not user accounts.

1. `src/proxy.ts` — Next 16's **`proxy` convention, which replaced
   `middleware`** (same file position, named export `proxy`, Node.js runtime
   only). It lets `/login` and `/api/auth/*` through, and redirects every other
   matched path to `/login` unless a valid `sidx-session` cookie is present. An
   invalid or expired token is deleted on the way out.
2. `POST /api/auth/login` compares the submitted password against
   `AUTH_PASSWORD` with `crypto.timingSafeEqual`, then issues a 7-day HS256 JWT
   (`src/lib/auth.ts`) as an `httpOnly` cookie. The payload is empty — the
   token proves "someone knew the password", nothing more.
3. `POST /api/auth/logout` deletes the cookie. Called from `ProfileDrawer`.

**Required env vars** in `.env.local` (gitignored, so a fresh clone has none):

```
AUTH_PASSWORD=...
SESSION_SECRET=...   # any long random string
```

Without them the app either 500s on login or redirects to `/login` forever.

---

## 5. Layout mechanics

- `src/app/layout.tsx` sets the fonts, wraps everything in `ThemeProvider`, and
  gives `<body>` `min-h-screen flex flex-col`. **It does not constrain width** —
  there is no `max-w-[420px]` wrapper, so on desktop the app stretches full
  width. Mobile-first here means designed at phone width, not clamped to it.
- The header in `page.tsx` is `fixed` at `z-[150]` with a backdrop blur, and the
  content column offsets it with `pt-[56px]`. `<main>` adds `pb-[56px]` for the
  nav.
- `BottomNav` is a `fixed` floating glass pill (`z-50`), not a flex sibling. It
  respects `env(safe-area-inset-bottom)` and is rendered only when
  `!isSubScreen`.
- The page scrolls as one document. There is no inner `overflow-y-auto` scroll
  container.

---

## 6. State

No Redux, Zustand or URL state. One React Context, everything else local.

### Global: `ThemeProvider`

`src/components/ThemeProvider.tsx` — the only app-wide state. Holds
`theme: "dark" | "light"`, exposes `useTheme()` returning `{ theme, toggle }`,
persists to `localStorage` under `sidx-theme`, and applies it by setting
`data-theme` on `<html>`.

It initialises to `"dark"` and reads storage in an effect, so a light-theme user
gets one dark frame on load. Light styling hangs off the `[data-theme="light"]`
block in `globals.css`.

### Owned by `page.tsx`

| State | Purpose |
|---|---|
| `activeTab` | Which screen renders (§3) |
| `hasLaunched` | Fades the app in after the splash. A 5s `setTimeout` force-sets it as a safety net if `LaunchAnimation` never fires `onComplete` |
| `isProfileOpen` | `ProfileDrawer` |
| `selectedItem` + `drawerType` | `DetailDrawer` — which item, and whether to render it as an event or a project |
| `feedback` | `ActionFeedback` dialog payload; `setFeedback` is passed down as `onFeedback` |
| `airportsNav` | Pending airport/service target (§3) |
| `activeOpenProjectIndex` | Auto-advancing open-project carousel on Home (4.5s interval) |

`isAnyDrawerOpen` (profile or detail) darkens and deepens the header blur.

### Per-screen patterns

Three patterns repeat across screens — follow them rather than inventing a fourth:

1. **Filter chips.** A horizontally scrolling row of chips backed by one
   `activeFilter` / `activeCategory` string, defaulting to `"All"`, with the
   list filtered by `.filter()` on render. Used by `ProjectsTab`,
   `EventsScreen`, `BenefitsScreen`, `InboxScreen`.
2. **Local selection then drawer.** A `selected` / `selectedItem` state set on
   card tap, rendered as a bottom sheet, cleared on dismiss. `EventsScreen`,
   `BenefitsScreen` and `ProjectsTab` each keep their own rather than lifting
   it, so Home and the sub-screens open detail views independently.
3. **Horizontal scroll.** Native CSS only — `flex gap-* overflow-x-auto
   scrollbar-none`, no JS scroll tracking.

Screens with more going on:

- **`AirportsScreen`** — the largest at ~880 lines. `selectedCode`,
  `searchQuery`, `showSearch`, `activeService`, synced to the `initialAirport`
  and `highlightService` props by effects. The only real search input in the app.
- **`InboxScreen`** — two filters (`activeTypeFilter`, `readFilter` defaulting
  to `"unread"`) plus a `readIds: Set<string>`. Read state is in-memory and
  resets on reload. The header's unread count is a hardcoded `3` and does not
  track it.
- **`DetailDrawer`** — gallery paging (`activeGalleryIdx`, `direction` for slide
  direction) and `canDrag`, which disables drag-to-dismiss while the gallery is
  being swiped.
- **`LaunchAnimation`** — a four-phase splash (`"in" | "burst" | "reveal" |
  "out"`) driven by framer-motion's `useAnimate`.
- **`ActionFeedback`** — a modal confirmation for placeholder actions. Takes
  `FeedbackData` (`title`, `message`, `type: "success" | "pending" | "info"`,
  optional primary action) and auto-closes after 5s.
- **`login/page.tsx`** — `password`, `showPassword`, `error`, `isLoading`.

---

## 7. Component behaviours

- **Action buttons** ("Register Interest", "Save", "Book") are placeholders.
  They do not mutate data; they call `onFeedback(...)` to open `ActionFeedback`.
  Nothing persists.
- **`Badge`** (`src/components/ui/Badge.tsx`) takes a **`label` string, not a
  `variant`**. It lowercases the label and matches it against known strings to
  pick colours: gold for `exclusive` / `gold`, olive for `active` /
  `current plan`, red for `sold out` / `expired` / `closing soon`, green for
  `open` / `live` / `milestone`, a special emerald for `open for investor`, and
  an outlined neutral for anything unmatched. Note `BadgeType` in
  `mock-data.ts` lists variants (`event`, `perk`, `project`, `hot`) that the
  component has no branch for — they fall through to neutral.
- **Theme toggle** lives in `ProfileDrawer`, alongside logout.
- The header logo swaps on theme (`/sid-x_logo_light.png` vs `/sid-x_logo.png`).

---

## 8. Known rough edges

Worth knowing before you touch these:

- **Dead code.** `EventsTab`, `BenefitsTab`, `ui/Card`, `ui/TabHeader` and
  `ui/card-stack` (~1,000 lines together) have no importers. `EventsTab` and
  `BenefitsTab` are older duplicates of `EventsScreen` / `BenefitsScreen` —
  edit the `*Screen` versions.
- `getScreenTitle()` in `page.tsx` is unused; the header inlines its titles
  instead, and disagrees with it ("Privileges" vs "Member Privileges").
- `page.tsx` is ~630 lines with the whole Home screen inline.
- The light theme is partly implemented as per-utility-class overrides in
  `globals.css` (e.g. `[data-theme="light"] .bg-black\/70`) rather than token
  swaps, so new dark-mode utilities need a matching override.
- Plenty of raw Tailwind colours (`text-white/70`, `bg-emerald-500/20`) sit
  alongside the CSS tokens, against the design system's own rule.
- No tests and no CI.
