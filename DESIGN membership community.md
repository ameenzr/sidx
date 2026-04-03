# DESIGN.md — Exclusive Membership App Design System

> This file is the single source of truth for all UI decisions.
> Every component, screen, and interaction must conform to these rules.
> When in doubt, refer here before writing a single line of code or CSS.

---

## 1. Identity

**App type:** Exclusive paid membership — events discovery + curated investment projects  
**Tone:** Premium, intentional, dark. Not flashy. Confident restraint.  
**Aesthetic:** Dark entertainment with financial precision. Think members' club meets investment dashboard.  
**Primary content:** Events (dominant). Investment projects (secondary).  
**Audience:** Paying members who expect a curated, gated experience.

---

## 2. Color Tokens

All colors are defined as CSS custom properties. Never hardcode hex values in components.

```css
:root {
  /* Backgrounds — 5 levels of depth */
  --bg-base:    #0C0C0D;  /* page background, outermost */
  --bg-subtle:  #141416;  /* nav bars, bottom bar */
  --bg-surface: #1C1C1F;  /* cards, sheets */
  --bg-raised:  #252528;  /* KPI tiles, input fields */
  --bg-overlay: #2E2E32;  /* tooltips, popovers, hover states */

  /* Borders */
  --border:     #2A2A2F;  /* default — all card edges */
  --border-em:  #3A3A40;  /* emphasized — active/focused elements */

  /* Text */
  --text-0:     #FFFFFF;  /* primary — headings, key values */
  --text-1:     #E4E4E6;  /* body text */
  --text-2:     #A0A0A5;  /* secondary — meta, descriptions */
  --text-3:     #5C5C62;  /* tertiary — placeholders, timestamps, labels */

  /* Accent — Olive (CTA + active states ONLY) */
  --olive:      #8A9530;
  --olive-dim:  #6B7525;
  --olive-bg:   rgba(138, 149, 48, 0.15);
  --olive-text: #B8C847;

  /* Accent — Gold (membership + exclusivity ONLY) */
  --gold:       #C9A84C;
  --gold-bg:    rgba(201, 168, 76, 0.14);
  --gold-text:  #E8C97A;

  /* Semantic */
  --red:        #E24B4A;
  --red-bg:     rgba(226, 75, 74, 0.13);
  --red-text:   #F07C7B;

  --green:      #4AAD6E;
  --green-bg:   rgba(74, 173, 110, 0.13);
  --green-text: #70CC90;

  --amber:      #D4903A;
  --amber-bg:   rgba(212, 144, 58, 0.13);
}
```

### Color Rules — Non-Negotiable

| Color | Allowed uses | Forbidden uses |
|---|---|---|
| `--olive` | Primary buttons, active tab/chip, progress bars, checkmarks | Membership badges, financial highlights |
| `--gold` | Member badge, "Exclusive" label, avatar ring for members, tier highlight | CTA buttons, progress bars, general UI |
| `--red` | "Sold out", "Expired", "Closing soon", error states | Branding, decorative use |
| `--green` | Funding milestones, "Open" status, positive returns | Success toasts only if paired with text |
| `--text-0` | Headings, prices, key numbers | Body paragraphs, descriptions |
| `--text-3` | Timestamps, labels, placeholders | Anything interactive |

**Hard rules:**
- Olive and gold must never appear on the same element simultaneously
- Never use `--gold` on a button — gold is status, olive is action
- Never use white (`#FFFFFF`) as a background — even modals use `--bg-surface`
- No pure black text on dark backgrounds — use `--text-0` through `--text-3`

---

## 3. Typography

**Font family:** DM Sans (primary) · DM Mono (data/code)

```css
--font-sans: 'DM Sans', sans-serif;
--font-mono: 'DM Mono', monospace;
```

### Type Scale

| Token | Size | Weight | Color | Use |
|---|---|---|---|---|
| `display` | 22px | 700 | `--text-0` | Page titles, hero headings |
| `title` | 18px | 700 | `--text-0` | Card hero, section featured |
| `heading` | 15px | 700 | `--text-0` | Card title, event name |
| `subheading` | 14px | 600 | `--text-1` | Section labels within cards |
| `body` | 14px | 400 | `--text-1` | Descriptions, body copy |
| `meta` | 12px | 500 | `--text-2` | Dates, venues, event meta |
| `caption` | 11px | 400 | `--text-3` | Timestamps, fine print |
| `label` | 10px | 600 | `--text-3` | Section headers (uppercase, 0.12em tracking) |
| `price` | 16–22px | 700 | `--text-0` | Ticket price, investment min |
| `stat` | 16px | 700 | `--text-0` or semantic | KPI values, funded % |

### Typography Rules

- Section labels (`label` token): always uppercase, 0.12em letter-spacing, `--text-3`
- Prices and stats: always `--text-0` unless semantic color applies (e.g. IRR in `--gold-text`)
- Never use Inter, Roboto, or system-ui as fallback — DM Sans only, with `sans-serif` fallback
- Line height: 1.35 for headings, 1.55 for body, 1.4 for meta
- No font size below 11px anywhere in the app
- Financial numbers (IRR %, invested amount): always `--font-mono` to aid scanning

---

## 4. Spacing

Base unit: **4px**. All spacing values must be multiples of 4.

```
4px   — icon-to-label gap, badge internal padding
8px   — tight component internal gap
12px  — card internal gap, between meta rows
16px  — card padding (default)
20px  — section padding, between related cards
24px  — section-to-section margin
32px  — major section breaks
48px  — bottom safe area / nav clearance
```

**Page horizontal padding:** 16px on all screens  
**Card padding:** 14px vertical · 16px horizontal (default), 12px/14px for compact cards

---

## 5. Border Radius

```
4px  (--r-xs)  — inner elements: KPI tiles, progress bar fill
6px  (--r-sm)  — chips, small buttons, tags
10px (--r-md)  — standard buttons, inputs, list items
14px (--r-lg)  — cards (standard)
20px (--r-xl)  — featured cards, member card, gate card
999px (--r-pill) — badges, filter chips, search bar, tab pills
```

**Rules:**
- Cards are always `--r-lg` (14px) minimum
- Featured / hero cards use `--r-xl` (20px)
- Buttons: `--r-md` (10px) default, `--r-sm` (6px) for compact/secondary
- Badges and pills always `--r-pill`
- Never mix pill radius with a single-sided border

---

## 6. Component Specifications

### 6.1 Search Bar

```
Shape:      pill (--r-pill)
Background: --bg-surface
Border:     1px solid --border-em
Padding:    10px 16px
Icon:       16px, --text-3, left side
Placeholder: --text-3
Font:       14px DM Sans
```

- Search placeholder always reads: `Search for '[trending item]'` — contextual, not generic
- No floating label — placeholder only

---

### 6.2 Navigation Tabs

**Pill strip (top, scrollable):**
- Container: pill shape, `--bg-subtle` background, 4px padding
- Inactive tab: `--text-2`, 13px/500
- Active tab: `--olive` background, white text, 13px/600

**Icon tab bar (home screen):**
- Full width, 4 tabs equal width
- Inactive: icon + label, `--text-2`
- Active: `--olive` background, white, `--r-lg` radius
- Icon size: 18px

**Rule:** Only one navigation tab pattern per screen. Never mix both on the same view.

---

### 6.3 Filter Chips

```
Default:  border 1px --border-em · --text-1 · --r-pill
Active:   --olive-bg background · --olive border · --olive-text text
With icon: icon left, 6px gap, 12px font
```

- Chips are always single-select within a filter group unless explicitly a multi-select context
- Active chip always uses olive — never gold

---

### 6.4 Buttons

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| `primary` | `--olive` | white | none | Main CTA: RSVP, Invest, Confirm |
| `secondary` | `--bg-raised` | `--text-1` | 1px `--border-em` | Secondary actions |
| `outline` | transparent | `--text-1` | 1px `--border-em` | Tertiary, cancel |
| `ghost` | transparent | `--text-2` | none | Inline actions, "View →" |
| `upgrade` | `--olive` | white | none | Membership upgrade CTA only |
| `current-plan` | transparent | `--text-2` | 1px `--border-em` | Disabled-like, current tier |

**Sizes:**
- Default: 10px 20px padding, 13px/600, `--r-md`
- Small: 7px 14px, 12px/600, `--r-sm`
- Full-width: same padding, `width: 100%`

**Rules:**
- Primary buttons always use `--olive` — never gold, never any other color
- Never place two primary buttons next to each other
- Destructive actions (cancel membership, withdraw): `--red-text` ghost button only
- Icon buttons: icon left, 8px gap, text right

---

### 6.5 Badges

All badges: `--r-pill`, 3px 9px padding, 11px/600

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| `gold` | `--gold-bg` | `--gold-text` | 1px rgba(gold, 0.25) | Member status, "Exclusive" |
| `olive` | `--olive-bg` | `--olive-text` | none | Active, "Current plan" |
| `red` | `--red-bg` | `--red-text` | none | Sold out, Expired, Closing soon |
| `green` | `--green-bg` | `--green-text` | none | Open, Live, Milestone |
| `ghost` | transparent | `--text-2` | 1px `--border-em` | Locked, Free preview |

**Rules:**
- "Closing soon" (red) always overrides any other badge on a project card
- "Members Only" badge: ghost variant with lock icon prefix when locked, gold when user has access
- Never stack two badges vertically — horizontal only, max 2 per card header

---

### 6.6 Cards

**Standard event card:**
```
Background: --bg-surface
Border:     1px solid --border
Radius:     --r-lg (14px)
Thumbnail:  fixed height 110px (grid) / 130px (full-width)
Body padding: 10px 12px
```

**Featured / hero event card:**
```
Background: --bg-surface
Border:     1px solid --border-em
Radius:     --r-xl (20px)
Thumbnail:  200px min-height
Overlay:    linear-gradient(to top, rgba(0,0,0,0.8), transparent 50%)
Body padding: 16px
```

**Investment project card — full:**
```
Background: --bg-surface
Border:     1px solid --border-em
Radius:     --r-lg
Padding:    14px 16px
Logo tile:  40x40px, --bg-raised, --r-md
KPI grid:   3-column, --bg-raised tiles, --r-xs
Progress:   5px height, --bg-overlay track, --olive fill
```

**Investment project card — compact:**
```
Same as full but: no KPI grid, progress bar only, 12px/14px padding
Badge right-aligned in header row
IRR shown right-aligned below progress bar in --gold-text
```

**Rules:**
- Cards never have drop shadows — border only
- Thumbnail backgrounds: use dark gradient fills when no image available, never placeholder gray
- Event cards in grid: always 2-column with 12px gap
- Never place a project card in a 2-col grid — always full-width or list

---

### 6.7 Member Card

```
Background: --bg-surface
Border:     1px solid --border-em
Radius:     --r-xl
Padding:    18px
Avatar:     44x44px, gold ring (2px border --gold), initials in --gold-text
Stats row:  3-column, dividers between, left/center/right alignment respectively
```

- Member avatar always has gold ring — this is the primary membership signal
- Stats: Events attended · Investments · Total invested
- Tier badge top-right, always gold variant

---

### 6.8 Locked Content States

**Event card locked:**
- Thumbnail: `filter: blur(2px)` + dark overlay (rgba 0,0,0, 0.6)
- Lock icon: SVG, centered in overlay, `--text-2`
- Body: `opacity: 0.4`, text replaced with redacted blocks (████)
- Always show that content exists — never fully hide locked cards

**Access gate (section-level):**
- Blurred content rows behind — always render fake rows, never empty space
- Lock icon centered over blur
- Below: title, description, full-width olive CTA
- Gate card uses `--r-xl` (20px radius)

**Rule:** Locked content must always be partially visible. The goal is urgency, not concealment.

---

### 6.9 Progress Bar (Funding)

```
Track:  height 5px, --bg-overlay, border-radius 3px
Fill:   --olive, same border-radius
Label row above: left = amount raised (--text-2, 11px), right = target (--olive-text, 11px/700)
```

- Never show a 100% filled bar — if fully funded, replace with a "Fully Funded" green badge
- Always round funding percentages to nearest integer

---

### 6.10 Membership Tier Cards

```
Container: 2-column grid, 10px gap
Card:      --bg-surface, 1px --border-em, --r-lg, 14px padding
Current:   border-color --olive
Feature list: checkmark (--olive-text SVG) or cross (--text-3 SVG), 12px/--text-2
Price:     22px/700 --text-0 + "/mo" in 12px --text-2
```

- Current plan button: ghost/outline variant, disabled cursor, "Current plan" label
- Upgrade button: primary olive, full-width
- Never show more than 3 features per tier card in the comparison view

---

### 6.11 Bottom Navigation Bar

```
Background: --bg-subtle
Border-top: 1px solid --border
Height:     ~56px + safe area inset
Items:      5 max (Home, Search, Live, My List, Profile)
Active icon: opacity 1.0, label in --olive-text
Inactive:   opacity 0.4 icon, --text-3 label
Label:      10px/500
Icon:       18px
```

- No badge/notification dot uses olive or gold — always `--red` for unread counts
- Active state is label color change only — no background highlight on bottom nav items

---

### 6.12 Notifications

```
Container: --bg-surface, 1px --border, --r-lg, 12px 14px padding
Status dot: 8px circle, top-aligned, color encodes type
Title:     13px/600 --text-0
Body:      12px/400 --text-2, line-height 1.4
Timestamp: 11px --text-3, below body
```

| Dot color | Meaning |
|---|---|
| `--gold` | New exclusive event / membership event |
| `--green` | Project milestone / positive update |
| `--red` | Urgent: closing soon, payment failed |
| `--text-3` | Admin / informational |

- Read notifications: `opacity: 0.55` on entire item
- Never use `--olive` for notification dots — olive is for actions only

---

## 7. Layout Principles

**Grid system:** 4-column mobile grid, 16px gutters  
**Max content width:** 390px (mobile-first, no desktop layout required)  
**Safe areas:** Always account for bottom nav (56px) and notch (env safe-area-inset)

**Section hierarchy on home screen:**
1. Header (location pill + avatar)
2. Search bar
3. Navigation tabs
4. Featured event (hero card, full-width)
5. Filter chips
6. Event grid (2-col)
7. "Projects for you" (full-width list, max 2 shown)

**Scroll behavior:**
- Tab bar: sticky below search, scrolls with page
- Bottom nav: always fixed
- Featured hero card: never sticky

---

## 8. Iconography

- **Style:** Outlined, 1.5px stroke, rounded linecaps, no fill
- **Size:** 16px (inline/meta), 18px (nav/tab), 20–24px (empty states, gates)
- **Color:** Inherit from parent context — never hardcode icon color
- **Source:** Use consistent icon set (Lucide or Phosphor recommended)

**Semantic icons (never substitute):**
- Lock: gated / members-only content
- Calendar: event date
- Pin/location: venue
- Chevron right: navigation, "View →"
- Checkmark: feature included, confirmed
- Bell: notification, reminder

---

## 9. Motion & Transitions

- **Default transition:** `all 0.15s ease` on interactive elements (hover, active)
- **Card press:** `transform: scale(0.98)` on active/tap
- **Tab switch:** opacity crossfade, 0.2s
- **Progress bar:** `transition: width 0.6s ease-out` on mount
- **Gate blur:** static — no animation on the blur itself

**Rules:**
- No entrance animations on list items (performance on mobile)
- No lottie or heavy animation — subtle only
- Skeleton loaders: `--bg-raised` shimmer, no pulsing color change

---

## 10. Banned Elements

The following are explicitly forbidden across the entire app:

- **Gradients on UI surfaces** — backgrounds are always flat solid colors
- **Drop shadows on cards** — border only, no `box-shadow`
- **White or light backgrounds** — the app is always dark
- **Gold on buttons** — gold is status only, never action
- **Olive on badges** — olive is action only, never status (exception: "Active" / "Current plan")
- **Rounded corners on single-sided borders** — only full-border elements get border-radius
- **Full concealment of locked content** — always show that something exists behind the gate
- **Two primary buttons side by side** — always one CTA per action group
- **Purple gradients, neon glows, glassmorphism blur on cards** — this is not a Web3 app
- **Emoji in UI** — use SVG icons only
- **Inter, Roboto, or system-ui** — DM Sans only
- **Font sizes below 11px**
- **Hardcoded hex values in components** — always use CSS tokens

---

## 11. Content Voice

- Event names: title case
- Button labels: sentence case ("RSVP now" not "RSVP NOW")
- Section headers: all caps, spaced (label token)
- Badge text: title case for proper nouns, sentence case for status ("Closing soon", "Members Only")
- Prices: always include ₹ prefix, no space between symbol and value (₹4,500)
- Large numbers: use L/Cr suffix for Indian context (₹78L, ₹1Cr)
- IRR/returns: always 2 significant digits + % (22%, 18.5%) in `--font-mono`
- Dates: "Sat, 19 Apr · 8:00 PM" format — no year unless cross-year event

---

## 12. Accessibility Minimums

- Touch targets: minimum 44x44px for all interactive elements
- Color contrast: `--text-2` on `--bg-surface` must pass AA (4.5:1)
- Never rely on color alone to convey state — always pair with icon or label
- Focus rings: `outline: 2px solid --olive`, 2px offset
- Locked content: must have `aria-label="Members only content"` on gate overlay

---

*Last updated: April 2026 · Maintained by Proto Studio*
