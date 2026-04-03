

# projX App Logic (app-logic.md)

## 1\. Architecture & Data Flow

Since the prototype has no backend or API, data flows unidirectionally from the static mock data file to the React components.

  * **Source of Truth:** `lib/mock-data.ts` acts as the faux-database.
  * **Data Fetching:** None. Components import arrays (`featuredItems`, `hotProjects`, `exploreProjects`) directly.
  * **Rendering Strategy:** Server-side rendered (SSR) by default via Next.js App Router, using Client Components (`"use client"`) only where user interaction (like copying text or horizontal scrolling) is required.

## 2\. Routing & Navigation Strategy

The app uses Next.js 14 App Router.

  * **Current Active Route:** `/` (Home Screen).
  * **Layout Wrapper (`app/layout.tsx`):** Enforces the mobile-first constraint (`max-w-[420px]`, `mx-auto`, `min-h-screen`, `flex flex-col`). This ensures the app looks like a mobile app even on desktop browsers.
  * **Bottom Navigation:** Fixed to the bottom using flex layout. The "Home" tab is statically set to active (100% opacity, olive accent stroke/text).

## 3\. UI State & Interactions

While there is no global state manager (like Redux or Zustand), local component state is needed for specific micro-interactions.

### A. Horizontal Scrolling

  * **Components:** `FeaturedScroll`, `HotProjects`
  * **Logic:** Uses native CSS overflow (`overflow-x-auto`, `scrollbar-none`) for smooth swipe gestures on mobile. No JavaScript state is needed for the scroll tracking itself.
  * **Example:** \`\`\`tsx
    // The wrapper simply needs these classes to handle swipe logic natively
    \<div className="flex gap-3 overflow-x-auto scrollbar-none snap-x"\>
    {items.map(item =\> \<Card key={item.id} className="snap-center" /\>)}
    \</div\>
    ```
    
    ```

### B. Clipboard Interaction

  * **Component:** `ReferralBanner`
  * **Logic:** Requires `"use client"`. Clicking the "Copy" button uses the `navigator.clipboard.writeText()` API.
  * **State needed:** A temporary `isCopied` boolean to change the button text from "Copy" to "Copied\!" for 2 seconds to provide feedback.

### C. Search Bar

  * **Component:** `SearchBar`
  * **Logic:** In the current static prototype, this is purely visual. For future functionality, it would require local state (`const [query, setQuery] = useState('')`) and potentially an `onChange` handler that filters the mock data based on the input.

### D. Layout Mechanics (Flexbox)

  * **Top Nav:** Static height.
  * **Main Content:** Uses `flex-1 overflow-y-auto` to consume remaining vertical space. This prevents the whole page from scrolling and keeps the top and bottom navs in place.
  * **Bottom Nav:** Forced to the bottom by the `flex-1` property of the main content area.

## 4\. Component-Specific Behaviors

  * **`HeroCard` & `HotProjects` Cards:** Action buttons (e.g., "Register Interest", "Save") are static placeholders. Visually, primary actions always use the accent color (Olive/Gold), while secondary actions use the subtle raised background.
  * **Badges (`Badge.tsx`):** Render logic depends purely on the string passed to the `variant` prop (`event` | `perk` | `project` | `hot` | `open`). The component acts as a pure dictionary mapping the prop to specific Tailwind classes.