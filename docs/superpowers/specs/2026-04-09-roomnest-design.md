# RoomNest — Implementation Design

**Date:** 2026-04-09  
**Approach:** Option A — Token-first + full pass  
**Status:** Approved

---

## Overview

RoomNest is a premium Irish rental management and listing platform. The codebase is a Vite + React + TypeScript + Tailwind v4 + shadcn/ui frontend with mock data and no backend.

The scaffold (all 8 pages, routing, Navbar, Footer, PropertyCard, mock data) already exists. This implementation fixes the design token foundation, creates missing shared infrastructure, and fills spec gaps in three major pages.

---

## Section 1 — Design Token Foundation

**File:** `src/styles/theme.css`

Add all RoomNest brand colors to the existing Tailwind v4 `@theme inline` block:

```css
--color-jet: #2d3142;
--color-slate-brand: #4f5d75;
--color-coral: #ef8354;
--color-coral-dark: #9c441a;
--color-surface: #faf8ff;
--color-surface-low: #f3f2ff;
--color-surface-card: #ffffff;
--color-ink: #171b2b;
--color-ghost: #dcc1b7;
```

This produces Tailwind utilities: `bg-jet`, `text-coral`, `bg-surface-low`, `text-ink`, `text-slate-brand`, `border-ghost`, etc.

Every `style={{ color: '#...' }}` in the codebase is replaced with the corresponding Tailwind class. No inline color styles remain after this pass.

**Note:** `slate-brand` avoids collision with Tailwind's built-in `slate` color scale.

---

## Section 2 — Component Layer

### New files

| File | Purpose |
|------|---------|
| `src/types/index.ts` | Shared TS interfaces: `Property`, `Landlord`, `Message`, `Tenant`, `MaintenanceTicket` |
| `src/hooks/useWishlist.ts` | Wishlist state backed by `localStorage`; exposes `{ wishlist, toggle, isWishlisted }` |
| `src/app/components/shared/StatusBadge.tsx` | Status pill: Open→coral, In Progress→amber, Resolved→green, Overdue→red, Active→green |
| `src/app/components/shared/AmenityTag.tsx` | `label-md` uppercase pill on `bg-surface-low text-slate-brand` |
| `src/app/components/shared/PriceTag.tsx` | `€{price}/mo` formatted with coral price + slate `/mo` |

### Updated files

| File | Change |
|------|--------|
| `Navbar.tsx` | All `style={{}}` → Tailwind tokens |
| `Footer.tsx` | All `style={{}}` → Tailwind tokens |
| `PropertyCard.tsx` | Tokens + consume `useWishlist` + RPZ badge (`isRPZ: true` → coral `RPZ AREA` badge) |

---

## Section 3 — Page Refactors + Spec Gaps

### All 8 pages — inline style → token sweep

Every page replaces hardcoded hex colors in `style={{}}` with Tailwind token classes. No functional changes, only class-based styling.

### Minor spec gaps (per-page)

| Page | Gap |
|------|-----|
| HomePage | Quick filter chip token classes; hero preview card polish |
| ListingsPage | `bg-surface-low` sidebar; coral slider range value; full-width coral Apply button |
| PropertyDetailPage | Sticky right column (`sticky top-24`); amenity ghost-border pills; transport placeholder tiles (`bg-jet/10`) |
| TenantLoginPage | Radial gradient corners; `OR CONTINUE WITH` divider with lines; Google + Apple ghost buttons |
| LandlordSignupPage | Left panel blurred property background image; 3 feature bullets with slate icon badges; coral line + label at bottom |

### Major spec gaps

#### ChatPage — Viewing Request Widget
Inline widget shown in the chat message stream:
- White card with coral header: `Schedule a Viewing`
- shadcn `Calendar` for date selection
- Time slots as selectable chip buttons (9am, 11am, 2pm, 4pm); active chip = coral bg
- `Confirm Viewing` (coral primary) + `Decline` (ghost) buttons
- On confirm: `sonner` toast — "Viewing confirmed — added to Google Calendar" (sonner is already installed and wired in the project)

#### LandlordDashboard — List New Property Modal (3-step)
shadcn `Dialog` triggered by `+ List New Property` button:
- **Step indicator:** coral filled circle = active, grey = future, connected line
- **Step 1:** Address, Eircode, type (Select), rent, bedrooms, bathrooms
  - RPZ auto-badge: when Eircode is entered, show `RPZ AREA` coral badge inline
- **Step 2:** Amenities checkboxes + House Rules textarea
- **Step 3:** Drag-and-drop photo upload area (UI only, no actual upload) + thumbnail preview grid
- Navigation: `Next →` coral / `← Back` ghost; `Submit Listing` on Step 3

#### TenantDashboard — Raise Ticket Modal
shadcn `Dialog` triggered by `Raise New Ticket` button:
- Title input (bottom-border style)
- Category Select: Heating / Plumbing / Electricity / Other
- Description textarea
- Image upload drag-drop zone (UI only)
- `Submit Ticket` coral full-width button
- On submit: `sonner` toast confirmation + ticket appended to local state list

---

## Constraints

- Tailwind v4 — no `tailwind.config.ts`; all custom tokens live in `theme.css` `@theme inline` block
- React Router v7 (not v6) — use `import { ... } from 'react-router'`
- No `console.log` in final code
- No `any` TypeScript type
- No inline `style={{}}` for colors after this pass
- No additional UI libraries — only shadcn/ui + lucide-react
- All images from Unsplash URLs already in mock data
- All forms local state only — no API calls
- Ireland-specific: `€950/mo` format, `Eircode` label, `BER Rating`, RTB banner in dashboard

---

## File Creation Order

1. `src/types/index.ts`
2. `src/hooks/useWishlist.ts`
3. `src/styles/theme.css` — add tokens
4. Shared components: `StatusBadge`, `AmenityTag`, `PriceTag`
5. `Navbar`, `Footer`, `PropertyCard` — token sweep + hook wiring
6. All pages — token sweep (can be parallelised)
7. Minor spec gaps per page
8. Major gaps: ChatPage widget, LandlordDashboard modal, TenantDashboard modal
