# Design System Strategy: The Digital Atelier

## 1. Overview & Creative North Star
**Creative North Star: The Digital Atelier**
This design system moves away from the "software" aesthetic and toward a "service" aesthetic. It treats the screen not as a grid of containers, but as a curated desk of premium materials—fine paper, polished metal, and organic textiles. 

We achieve an exclusive feel through **intentional asymmetry** and **breathable white space**. In this system, white space is not "empty"—it is a luxury material used to frame content. We reject the "boxed-in" look of standard apps; instead, we use overlapping layers and shifting tonal depths to guide the eye. The goal is to make the user feel they are navigating a high-end editorial lookbook rather than a database.

---

## 2. Colors & Tonal Depth
The palette is rooted in nature and prestige. We avoid sterile greys in favor of "living" neutrals and deep, earthy accents.

*   **Primary (Deep Olive - #6B7525):** Used for decisive actions. It represents growth and grounded authority. Use the `primary_container` variant for subtle hover states.
*   **Secondary (Polished Gold - #B89336):** Reserved strictly for membership status, achievement, and exclusive "Gold-Tier" features. It is a reward, not a utility.
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. To separate content, use background shifts. For example, a `surface_container_low` (#F3F3F3) section should sit directly against a `surface` (#F9F9F9) background. Boundaries are felt, not seen.
*   **Signature Textures:** For primary hero moments or large CTAs, use a subtle linear gradient transitioning from `primary` (#535C0C) to `primary_container` (#6B7525) at a 135-degree angle. This adds a "silk-press" finish that flat color cannot replicate.
*   **Glassmorphism:** For floating navigation or modal overlays, use `surface_container_lowest` (#FFFFFF) at 80% opacity with a `20px` backdrop blur. This ensures the premium background colors bleed through, maintaining a sense of place.

---

## 3. Typography: The Editorial Contrast
We use a dual-font strategy to balance human warmth with technical precision.

*   **DM Sans (Primary/Editorial):** Used for all `display`, `headline`, `title`, and `body` tokens. Set `display-lg` and `headline-lg` with a slightly tighter letter-spacing (-0.02em) to mimic high-end print headlines.
*   **DM Mono (Data/Utility):** Used for `label-md`, `label-sm`, and any financial or numerical figures. This creates a "ledger" or "bespoke invitation" feel. Whenever displaying currency or dates, use DM Mono to signal accuracy and exclusivity.
*   **Contrast Ratios:** Primary headings use `on_surface` (#1A1A1A) for maximum authority. Secondary information uses `on_surface_variant` (#47483A) or Slate Grey (#666666) to create a clear visual hierarchy without clutter.

---

## 4. Elevation & Depth: Tonal Layering
In this system, depth is achieved through "stacking" rather than traditional drop shadows.

*   **The Layering Principle:** 
    *   **Level 0 (Base):** `surface` (#F9F9F9)
    *   **Level 1 (Sections):** `surface_container_low` (#F3F3F3)
    *   **Level 2 (Cards):** `surface_container_lowest` (#FFFFFF)
*   **Ambient Shadows:** When a component must float (e.g., a primary action sheet), use a "Sunlight Shadow": `0px 12px 32px rgba(26, 28, 28, 0.04)`. The shadow color is a desaturated version of our `on_surface` token, making it feel like a natural light casting.
*   **The Ghost Border Fallback:** If a layout requires a border for accessibility (e.g., input fields), use the `outline_variant` (#C8C8B5) at **20% opacity**. It should be a whisper of a line, barely visible but enough to define shape.

---

## 5. Components

### Buttons & Interaction
*   **Primary Button:** Deep Olive background, white text. Pill-shaped (`full` roundedness). Use a subtle internal glow (1px top-inner-border, white at 10% opacity) to give it a 3D "pressed" feel.
*   **Membership Chip:** Pill-shaped, using `secondary_fixed` (#FFDF9A) background with `on_secondary_fixed` (#251A00) text. These should always be accompanied by a DM Mono label for "Member Since" data.

### Input Fields & Search
*   **Search Bar:** Pill-shaped, `surface_container_low` background, no border. Use an icon in `on_surface_variant` (#47483A).
*   **Text Inputs:** Use the "Ghost Border" (20% opacity `outline_variant`) only on the bottom edge to maintain an editorial, minimalist look.

### Cards & Lists
*   **Cards:** 14px (`xl` scale) corner radius. Forbid the use of divider lines. Instead, use `24px` of vertical white space to separate items.
*   **Nesting:** Place `surface_container_lowest` cards inside a `surface_container_low` section to create "Soft Lift."

### Status & Feedback
*   **Exclusivity Indicators:** Use the Polished Gold in a small, 4px dot (like a jeweler's mark) next to premium content titles.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetric Margins:** Allow the left margin of a headline to be wider than the right to create a "gallery" feel.
*   **Embrace DM Mono:** Use it for all numbers, even in body text, to give financial data a "certified" look.
*   **Leverage Tonal Shifts:** Use the difference between `#FAFAFA` and `#FFFFFF` to define card boundaries.

### Don’t:
*   **Don't use 100% Black:** It is too aggressive for this palette. Always stick to Charcoal (#1A1A1A).
*   **Don't use Dark Mode layers:** This system is built for a "light-filled" experience. If a dark element is needed, use Deep Olive, never pure black.
*   **Don't use 1px Dividers:** They break the fluidity of the Atelier aesthetic. Use space or a shift in background tone instead.
*   **Don't crowd the Gold:** If the Polished Gold is used too often, it loses its "exclusive" value. Use it sparingly, like a signature.