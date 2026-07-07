# Design System Specification: The Architectural Service Framework

## 1. Overview & Creative North Star
**Creative North Star: "The Precise Artisan"**

In a retail and service environment, "trustworthy" is often mistaken for "utilitarian." This design system rejects that compromise. We move beyond the generic "blue box" dashboard to create an experience that feels like a high-end architectural studio: precise, airy, and hyper-efficient. 

The system utilizes **Organic Structuralism**. We break the monotony of the standard retail grid by using intentional asymmetry and "The Breathable Gap." By leveraging a sophisticated tonal palette of teals and warm ochres, we create a signature visual identity that feels custom-built for high-stakes service environments where clarity is a premium and efficiency is a requirement.

---

## 2. Colors & Atmospheric Depth
Our palette is rooted in a deep, authoritative teal (`primary`) contrasted against a vibrant, energetic orange (`secondary`). This isn't just about color; it’s about signaling importance through chromatic weight.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Layout boundaries must be established exclusively through:
1.  **Background Shifts:** Placing a `surface-container-low` component against a `surface` background.
2.  **Tonal Transitions:** Using the hierarchy of surface tiers to define edges.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of "Frosted Precision."
- **Layer 0 (Base):** `surface` (#f6fafa) – The canvas.
- **Layer 1 (The Section):** `surface-container-low` (#f0f4f4) – Large layout blocks.
- **Layer 2 (The Component):** `surface-container-lowest` (#ffffff) – High-focus cards or active interactive elements.
- **Layer 3 (The Pop-over):** `surface-bright` (#f6fafa) – Used for floating elements that require a "lifted" presence.

### The "Glass & Gradient" Rule
To elevate the "Cashier" dashboard from a tool to an experience, use **Glassmorphism** for floating sidebars or modal overlays. 
- **Application:** Use `surface_variant` at 70% opacity with a `backdrop-blur` of 20px. 
- **Signature Textures:** Apply a subtle linear gradient (from `primary` to `primary_container`) on primary CTAs to move away from "flat" digitality toward a tactile, "pressable" physical button feel.

---

## 3. Typography: Editorial Utility
We pair **Manrope** (Display/Headlines) with **Inter** (Body/Labels) to balance character with industrial-grade legibility.

*   **Display & Headlines (Manrope):** Use `display-lg` (3.5rem) and `headline-md` (1.75rem) to create an editorial hierarchy. Manrope’s geometric nature feels modern and "designed," making high-density data look like a curated list rather than a spreadsheet.
*   **Body & Labels (Inter):** All functional data, product listings, and service requests use `body-md` (0.875rem) or `label-md` (0.75rem). Inter’s tall x-height ensures that a cashier scanning a screen from 2 feet away can distinguish numbers and status updates instantly.
*   **The Identity Play:** Use `headline-sm` in `primary` for product titles to anchor the user’s eye, while using `label-sm` in `secondary` for urgent status updates (e.g., "Ready for Pickup").

---

## 4. Elevation & Depth
Depth is a functional tool for service speed. We use **Tonal Layering** to guide the eye without the clutter of "skeuomorphic" shadows.

*   **The Layering Principle:** Avoid shadows for static cards. Instead, place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f0f4f4) background. This creates a "soft lift" that is easier on the eyes during long shifts.
*   **Ambient Shadows:** For floating action buttons or active modals, use a diffused "Shadow Bloom." 
    *   *Values:* `0px 12px 32px` blur, color `on-surface` at **4% opacity**.
*   **The "Ghost Border" Fallback:** If accessibility requirements demand an edge (e.g., high-glare environments), use a "Ghost Border": `outline-variant` (#bfc8cd) at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components: The Service Toolkit

### Buttons: The Tactile Command
*   **Primary:** Gradient of `primary` to `primary_container`. `xl` (1.5rem) roundedness. Use `on_primary` (#ffffff) text.
*   **Secondary:** `surface-container-highest` background with `primary` text. No border.
*   **Motion:** Subtle scale-down (0.98) on click to simulate physical resistance.

### Cards & Lists: The No-Divider Standard
*   **Execution:** Forbid the use of divider lines between product items or file requests. 
*   **Solution:** Use **Vertical Breathing Room**. Use spacing token `8` (1.75rem) to separate cards. Use a subtle background shift (`surface-container-high`) on hover to indicate interactivity.

### Input Fields: The Structured Void
*   **Style:** Use `surface-container-low` as the field background. 
*   **Focus State:** Instead of a thick border, use a 2px "Glow" of `primary` and transition the background to `surface-container-lowest`.

### Signature Component: The "Status Orb"
*   In place of standard text tags, use a large, soft-glow orb using `secondary_container` for "In Progress" or `tertiary` for "Completed." This allows for peripheral recognition in a busy retail environment.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use `20` (4.5rem) and `24` (5.5rem) spacing tokens for outer margins to give the dashboard an "expensive" editorial feel.
*   **Do** use `rounded-lg` (1rem) for all main containers to soften the industrial nature of retail data.
*   **Do** use `tertiary` (#004f4f) for "Success" or "Secure" states—it’s a sophisticated alternative to "Standard Green."

### Don't:
*   **Don't** use pure black (#000000) for text. Use `on_surface` (#181c1d) to maintain a premium, soft-contrast look.
*   **Don't** stack more than three levels of surface nesting. If Layer 3 isn't enough, use a `Glassmorphism` overlay.
*   **Don't** use standard "drop shadows" on mobile cards; stick to Tonal Layering to prevent the UI from feeling "muddy" on lower-brightness mobile screens.