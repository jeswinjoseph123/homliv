# CLAUDE.md — HomLiv Project Intelligence

This file tells Claude Code everything it needs to know about this project.
Read this file before writing any code. Never deviate from these rules.

---

## Project Overview

**Name:** HomLiv (was RoomNest — brand renamed)
**Type:** Irish rental management + listing platform
**Stack:** React + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui + react-router v7
**Status:** Frontend only — mock data, no backend connected yet
**Design Language:** "The Digital Curator" — high-end editorial aesthetic

---

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # ESLint check
npm run typecheck  # TypeScript check
```

---

## Architecture

```
src/
  components/
    layout/        # Navbar, Footer
    shared/        # PropertyCard, LogoMark, StatusBadge
    ui/            # shadcn/ui components (auto-generated, do not edit)
  pages/           # One file per route
  data/            # Mock data only — mockProperties.ts (14 properties)
  hooks/           # useWishlist, useChat (local state)
  lib/             # utils.ts (shadcn helper + custom utils)
  types/           # Shared TypeScript interfaces
```

**Never put business logic inside pages.** Extract to hooks.
**Never import from `../../../`** — use path aliases `@/components`, `@/data`, `@/hooks`.

---

## Brand & Logo

- **`<LogoMark />`** lives at `src/app/components/shared/LogoMark.tsx`
- House + H SVG using `currentColor` fill — always pass `className="text-coral"` for coral colour
- Usage: `<LogoMark size={22} className="text-coral" />` + `<span>HomLiv</span>` beside it
- Present in: Navbar, Footer, LandlordDashboard top bar, TenantLoginPage, LandlordSignupPage

---

## Design System — READ BEFORE WRITING ANY CSS

### Colors — use these exact values, no exceptions

| Token | Hex | Usage |
|---|---|---|
| `jet` | `#2d3142` | Navbar bg, Display headings, dark surfaces |
| `slate-brand` | `#4f5d75` | Sidebar bg, secondary text, meta info |
| `coral` | `#ef8354` | CTAs, prices, active states, accents |
| `coral-dark` | `#9c441a` | Coral hover state only |
| `surface` | `#faf8ff` | Page background |
| `surface-low` | `#f3f2ff` | Section backgrounds, filter sidebar |
| `ink` | `#171b2b` | Body text |
| `ghost` | `#dcc1b7` | Borders at 15% opacity only |

**In Tailwind:** these are configured as `bg-jet`, `text-coral`, `bg-surface-low`, etc.

### The Rules (violations will be flagged)

1. **NO BORDER LINES for sections.** Boundaries must be defined by background color shifts only. Never use `border-b`, `border-t`, or `divide-*` to separate sections.
2. **NO 100% BLACK.** Always use `text-jet` (`#2d3142`) for deep tones.
3. **CORAL IS SCARCE.** Only use coral for: CTA buttons, price tags, active states, key highlights. Never decorative.
4. **NO DEFAULT SHADOWS.** Never use `shadow-md`, `shadow-lg`, or any Tailwind shadow preset. Use explicit shadow values only.
5. **NO CARD BORDERS.** Cards are `bg-white` on `bg-surface-low` or `bg-surface`. Contrast creates the boundary.
6. **MINIMUM GRID GAP is 24px (`gap-6`).** Never go below this.
7. **Ghost borders** when absolutely required: `border border-[#dcc1b7]/15` — only for form containers and modal wrappers.

### Primary Button — ALL primary buttons use terracotta gradient

```tsx
// Primary CTA — use this everywhere, never flat bg-coral
style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
className="... text-white font-semibold transition-opacity hover:opacity-90"

// Secondary (Ghost)
className="border border-ghost/20 text-jet rounded-lg px-6 py-3 font-medium hover:bg-surface-low transition-colors"
```

### Typography — use these class combinations

```tsx
// Display LG — Hero headings
className="font-bold leading-[1.08] tracking-[-0.02em] text-white"
style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4rem)' }}

// Headline MD — Section titles
className="font-bold tracking-[-0.02em] text-[1.75rem] text-jet"

// Title SM — Card titles, sub-headers
className="text-base font-medium text-jet"

// Body LG — Descriptions
className="text-base font-normal leading-relaxed text-ink"

// Label MD — Tags, specs, micro-copy
className="text-[0.75rem] font-bold tracking-[0.05em] uppercase text-slate-brand"
```

### Input Fields

```tsx
// Editorial (bottom-border only — forms inside auth pages)
className="border-0 border-b border-ghost/30 rounded-none bg-transparent px-0 py-2 focus:border-coral outline-none transition-colors"

// Standard (full border — signup/login form panels)
className="border border-ghost/40 rounded-lg px-4 py-3 focus:border-coral outline-none transition-colors bg-white"
```

### Cards

```tsx
// Property Card — inset image pattern
// Outer: className="bg-white rounded-2xl overflow-hidden cursor-pointer"
//        style={{ border: '1px solid rgba(220,193,183,0.18)', shadow: '0 2px 16px rgba(23,27,43,0.06)' }}
// Image: className="relative m-3 rounded-xl overflow-hidden h-52"

// Dashboard stat card
className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(23,27,43,0.04)]"

// Dark card (How-It-Works landlord side, App Download)
style={{ background: 'linear-gradient(145deg, #2d3142 0%, #232637 100%)' }}
```

### Navigation

```tsx
// Navbar — glassmorphism on all pages
style={{ background: 'rgba(18,20,31,0.90)' }}
className="backdrop-blur-xl sticky top-0 z-50"

// "Listings" link lives on the LEFT beside the logo — not in the right nav

// Landlord Dashboard Sidebar
className="bg-slate-brand w-[260px] h-screen sticky top-0 flex flex-col"

// Sidebar active item — "cut-out" effect
className="bg-surface text-jet rounded-l-xl ml-2 font-semibold"

// Sidebar inactive item
className="text-white/70 hover:text-white px-4 py-3 rounded-l-xl ml-2 transition-colors"
```

---

## Auth Pages Layout

Both login pages use identical 50/50 split structure — maintain this:

```tsx
// Outer
<div className="min-h-screen flex flex-col lg:flex-row">

// Left panel (dark + background image)
<div className="relative flex flex-col justify-between p-8 lg:p-12 bg-jet"
     style={{ flex: '0 0 50%', minHeight: '40vh' }}>
  {/* Background image at 18% opacity */}
  {/* Logo · Headline · 3 feature items · Bottom badge */}
</div>

// Right panel (form)
<div className="bg-white flex flex-col justify-center items-center p-8 lg:p-12 lg:flex-1">
  {/* Tab switcher (Sign In / Sign Up) · Form · Social auth */}
</div>
```

- **TenantLoginPage** — `photo-1493809842364-78817add7ffb`, badge: "Tenant Portal"
- **LandlordSignupPage** — `photo-1696743297474-d674b8e3d82a`, badge: "Premium Landlord Suite"
- Both have Sign In + Sign Up tabs on the same page

---

## HomePage Section Order

```
Hero (dark #12141f + coral ambient glow orb + floating preview card)
  └─ Stats strip at bottom of hero (14,000+ Listings · 3,200+ Landlords · 28,000+ Tenants · 3 Cities)
Featured Listings (3 cards — one row only)
App Download (dark gradient card, bg-surface-low section)
Why HomLiv strip (bg-white — 3 icon features)
Testimonials (bg-surface-low — 3 review cards)
How it Works (#f2f2f4 — For Tenants + For Landlords cards)
CTA — "Start your Dublin journey" (bg-white, max-w-7xl coral gradient card)
Footer
```

### Hero card animation
```tsx
// Add to <style> tag in HomePage
@keyframes float {
  0%, 100% { transform: rotate(3deg) translateY(0px); }
  50% { transform: rotate(3deg) translateY(-14px); }
}
.animate-float { animation: float 6s ease-in-out infinite; }
```

---

## Listings Page

- `ITEMS_PER_PAGE = 10` — 10 listings per page
- 14 total mock properties → 10 on page 1, 4 on page 2
- Sidebar blends with `bg-surface` (no white card background)
- Sort buttons: `rounded-full`, terracotta gradient when active
- "Dublin City" heading uses `text-coral`

---

## Mock Data

`src/data/mockProperties.ts` — 14 properties (IDs 1–14):
- 1: Double room Ranelagh €950 (RPZ)
- 2: Master Suite Smithfield €1,100 (RPZ)
- 3: Modern Studio Grand Canal €1,450 (RPZ)
- 4: Single Room Rathmines €750 (RPZ, let agreed)
- 5: Georgian Penthouse Merrion Square €3,200
- 6: Docklands Loft €2,850
- 7: Rathmines Suite €2,400 (RPZ)
- 8: Bright Studio Ranelagh €950 (RPZ)
- 9: Double Room Portobello €880 (RPZ)
- 10: En-Suite Ballsbridge €1,300
- 11: Single Room Stoneybatter €700 (RPZ)
- 12: Double Room Phibsborough €825 (RPZ)
- 13: Studio Sandymount €1,650
- 14: En-Suite Drumcondra €1,050 (RPZ, let agreed)

---

## Component Contracts

### `<LogoMark />`
```ts
interface LogoMarkProps {
  size?: number;   // default 24
  className?: string; // use "text-coral" for coral colour
}
```

### `<PropertyCard />`
```ts
interface PropertyCardProps {
  property: Property;
  isWishlisted: boolean;
  onWishlistToggle: (id: string) => void;
  onClick?: () => void;
}
// Image is inset: m-3 rounded-xl overflow-hidden h-52
```

### `<StatusBadge />`
```ts
interface StatusBadgeProps {
  status: 'Open' | 'In Progress' | 'Resolved' | 'Active' | 'Overdue';
}
// Open → coral, Resolved → green, Overdue → red, In Progress → amber
```

---

## TypeScript Interfaces

Keep all shared types in `src/types/index.ts`:

```ts
export interface Property {
  id: string;
  title: string;
  type: 'Single Room' | 'Double Room' | 'En-Suite' | 'Studio' | 'Penthouse';
  location: string;
  eircode: string;
  price: number;
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  available: boolean;
  wishlistCount: number;
  isRPZ: boolean;
  landlord: Landlord;
  description: string;
  houseRules: string[];
  transport: string[];
}

export interface Landlord {
  name: string;
  verified: boolean;
  avatar: string;
}

export interface Message {
  id: string;
  sender: 'tenant' | 'landlord';
  text: string;
  time: string;
  read: boolean;
}

export interface Tenant {
  id: string;
  name: string;
  avatar: string;
  property: string;
  rentDue: string;
  status: 'active' | 'overdue';
  tickets: number;
}

export interface MaintenanceTicket {
  id: string;
  tenantName: string;
  property: string;
  issue: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
  priority: 'High' | 'Medium' | 'Low';
}
```

---

## Ireland-Specific Rules

- Currency: always `€950/mo` — Euro sign, no space, `/mo` suffix
- Address fields: label as `Eircode` never "zip code" or "postcode"
- Energy: `BER Rating` never "energy rating"
- RTB banner: show in landlord dashboard — `"Remember to register this tenancy with the RTB within 1 month."`
- RPZ badge: show `RPZ AREA` badge in coral on property cards where `isRPZ: true`
- Phone fields: prefix `+353` for Ireland
- Copyright: `© 2026 HomLiv. All rights reserved.`

---

## Routing Map

```
/                     → HomePage
/listings             → ListingsPage
/property/:id         → PropertyDetailPage
/login                → TenantLoginPage
/landlord             → LandlordSignupPage
/dashboard            → LandlordDashboard
/tenant-dashboard     → TenantDashboard
/chat/:tenancyId      → ChatPage
```

All routes are client-side. No auth guard needed — mock navigation only.

---

## What NOT To Do

- **Never** use `Inter` imported via `@fontsource` — use Google Fonts `<link>` in `index.html`
- **Never** use `placeholder.com` or `picsum.photos` — use Unsplash URLs from mock data
- **Never** use `console.log` in final component code
- **Never** use `any` type in TypeScript
- **Never** use inline `style={{}}` for colors — always use Tailwind classes
- **Never** install additional UI libraries — only shadcn/ui + lucide-react
- **Never** create new files in `src/components/ui/` — those are shadcn auto-generated
- **Never** use `h1`–`h6` without the corresponding typography class combination above
- **Never** use Tailwind's `prose` class — write all typography manually
- **Never** use flat `bg-coral` for primary buttons — always use the terracotta gradient

---

## File Naming

- Components: `PascalCase.tsx` — e.g. `PropertyCard.tsx`
- Pages: `PascalCase.tsx` — e.g. `ListingsPage.tsx`
- Hooks: `camelCase.ts` prefixed with `use` — e.g. `useWishlist.ts`
- Data: `camelCase.ts` — e.g. `mockProperties.ts`
- Types: `index.ts` in `src/types/`

---

## Git Commit Convention

```
feat: add PropertyCard component
fix: correct coral hover state on mobile
style: align listing grid gap to 24px minimum
chore: update CLAUDE.md project intelligence
```
