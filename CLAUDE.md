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
  app/
    components/
      layout/        # Navbar, Footer
      shared/        # PropertyCard, LogoMark, StatusBadge, ChatInterface
      tenant/        # TenantDashboard split components (see Tenant Dashboard section)
      ui/            # shadcn/ui components (auto-generated, do not edit)
    pages/           # One file per route
  data/              # Mock data only — mockProperties.ts (14 properties)
  hooks/             # useWishlist, useChat (local state)
  lib/               # utils.ts (shadcn helper + custom utils)
  types/             # Shared TypeScript interfaces (index.ts)
```

**Never put business logic inside pages.** Extract to hooks.
**Never import from `../../../`** — use path aliases `@/app/components`, `@/data`, `@/hooks`, `@/types`.

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
//        style={{ border: '1px solid rgba(220,193,183,0.18)', boxShadow: '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)' }}
// Image: className="relative m-3 rounded-xl overflow-hidden h-52"

// Dashboard stat card — white
className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]"

// Dashboard stat card — coral gradient
style={{ background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)' }}

// Dashboard stat card — slate/dark
style={{ background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)', boxShadow: '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)' }}

// Dark card (How-It-Works landlord side, App Download, Payments hero)
style={{ background: 'linear-gradient(145deg, #2d3142 0%, #232637 100%)', boxShadow: '0 8px 32px rgba(23,27,43,0.40), 0 2px 8px rgba(23,27,43,0.15)' }}
```

### Shadow System

Every surface has a shadow — no flat cards. Use color-tinted shadows for colored cards:

| Card type | Shadow value |
|---|---|
| White card | `0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)` |
| Coral gradient card | `0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)` |
| Slate gradient card | `0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)` |
| Jet dark card | `0 8px 32px rgba(23,27,43,0.40), 0 2px 8px rgba(23,27,43,0.15)` |
| Navbar (floating) | `0 4px 24px rgba(18,20,31,0.50), 0 1px 4px rgba(18,20,31,0.30)` |
| Footer (upward) | `0 -8px 32px rgba(23,27,43,0.12)` |
| Gallery / hero image | `0 8px 32px rgba(23,27,43,0.12)` |

### Navigation

```tsx
// Navbar — glassmorphism on all pages
style={{ background: 'rgba(18,20,31,0.90)', boxShadow: '0 4px 24px rgba(18,20,31,0.50), 0 1px 4px rgba(18,20,31,0.30)' }}
className="backdrop-blur-xl sticky top-0 z-50"

// "Listings" link lives on the LEFT beside the logo — not in the right nav

// Both dashboard sidebars — bg-slate-brand, right-side depth shadow
style={{ boxShadow: '6px 0 40px rgba(23,27,43,0.55), 2px 0 8px rgba(23,27,43,0.25)' }}

// Sidebar active item — coral gradient pill (BOTH dashboards)
className="flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-white font-semibold text-sm"
style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)', boxShadow: '0 4px 12px rgba(180,80,40,0.35)' }}

// Sidebar inactive item
className="text-white/60 hover:text-white hover:bg-white/[0.07] px-4 py-3 mx-2 rounded-xl text-sm font-medium transition-colors"
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

## Tenant Dashboard — Component Split

`TenantDashboard.tsx` is a **thin shell** — it owns state and wires components together only. All tab UI lives in `src/app/components/tenant/`.

```
src/app/components/tenant/
  types.ts              — Tab union, LocalTicket, TicketForm interfaces + CATEGORY_STYLE, PRIORITY_STYLE maps
  TenantSidebar.tsx     — sidebar nav + mobile backdrop (props: activeTab, onNav, isOpen, onClose)
  OverviewTab.tsx       — overview dashboard grid (props: wishlistItems, tickets, onNav, onRaiseTicket)
  WishlistTab.tsx       — saved properties grid (props: wishlistItems, onRemove, onClear)
  TenancyTab.tsx        — lease details, inventory, map (props: onNav, onRaiseTicket)
  MaintenanceTab.tsx    — stat cards + ticket cards (props: tickets, onRaiseTicket)
  PaymentsTab.tsx       — payments hero + history (no special props)
  SettingsTab.tsx       — profile, notifications, security (no special props)
  RaiseTicketModal.tsx  — raise ticket modal (props: open, onClose, form, onFormChange)
```

**State owned by TenantDashboard.tsx:**
- `activeTab` — current visible tab
- `sidebarOpen` — mobile sidebar toggle
- `showTicketModal` — raise ticket modal visibility (triggered from Overview, Tenancy, Maintenance)
- `ticketForm` — raise ticket form state
- `wishlisted` — array of wishlisted property IDs

**Tenant-specific types** live in `src/app/components/tenant/types.ts`, not `src/types/index.ts`:
- `Tab` — union of all tab IDs
- `LocalTicket` — id, title, category, priority, status, date, image, response, description
- `TicketForm` — title, category, description, priority
- `CATEGORY_STYLE` — Record mapping category → Tailwind classes
- `PRIORITY_STYLE` — Record mapping priority → Tailwind classes

**Mock ticket data** (`LOCAL_TICKETS`) lives as a module-level constant in `TenantDashboard.tsx` and is passed as props to `OverviewTab` and `MaintenanceTab`.

---

## Landlord Dashboard — Component Split

`LandlordDashboard.tsx` is a **thin shell** — it owns state and wires components together only. All tab UI lives in `src/app/components/landlord/`.

```
src/app/components/landlord/
  types.ts                — Tab union, NewPropertyForm interface + PRIORITY_CLASSES map
  LandlordSidebar.tsx     — sidebar nav + mobile backdrop (props: activeTab, onNav, isOpen, onClose)
  OverviewTab.tsx         — KPI cards, upcoming rent, recent activity (props: onListProperty)
  PropertiesTab.tsx       — property list rows (props: onListNew)
  TenantsTab.tsx          — tenants table (no special props)
  MessagesTab.tsx         — link to chat page (no special props)
  MaintenanceTab.tsx      — maintenance tickets table (no special props)
  PaymentsTab.tsx         — payment stats + history (no special props)
  SettingsTab.tsx         — profile, settings list (no special props)
  ListPropertyModal.tsx   — 3-step listing wizard (props: open, onClose — owns form state internally)
```

**State owned by LandlordDashboard.tsx:**
- `activeTab` — current visible tab
- `rtbDismissed` — RTB compliance banner toggle
- `sidebarOpen` — mobile sidebar toggle
- `showNewPropertyModal` — modal visibility

**Key difference from TenantDashboard:** `ListPropertyModal` owns its own `newProp` form state and `modalStep` internally (unlike `RaiseTicketModal` which receives form state as props), because no other tab needs access to the property form data.

---

## Shared Chat Component

`src/app/components/shared/ChatInterface.tsx` — reusable chat UI used by:
- `TenantDashboard` chats tab (embedded, no outer chrome)
- `ChatPage` (`/chat/:tenancyId`) — wrapped in Navbar only

The chats tab content wrapper must use `flex overflow-hidden` (not `overflow-y-auto`) so inner panels manage their own scroll:
```tsx
className={activeTab === 'chats' ? 'flex overflow-hidden' : 'overflow-y-auto'}
```

The "Suggest Viewing" date picker is a **floating absolute card** (`bottom-[68px] left-4 w-[520px]`), not a full-width panel.

---

## Component Contracts

### `<LogoMark />`
```ts
interface LogoMarkProps {
  size?: number;      // default 24
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

### `<TenantSidebar />`
```ts
interface TenantSidebarProps {
  activeTab: Tab;
  onNav: (id: Tab) => void;
  isOpen: boolean;
  onClose: () => void;
}
```

### `<RaiseTicketModal />`
```ts
interface RaiseTicketModalProps {
  open: boolean;
  onClose: () => void;
  form: TicketForm;
  onFormChange: (form: TicketForm) => void;
}
```

---

## TypeScript Interfaces

Keep all **shared** types in `src/types/index.ts`. Tenant-dashboard-specific types (`Tab`, `LocalTicket`, `TicketForm`) live in `src/app/components/tenant/types.ts` — do not move them to `src/types/index.ts`.

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

## Dashboard Layout Patterns

Both `TenantDashboard` and `LandlordDashboard` share the same shell structure:

```tsx
// Outer shell
<div className="h-screen flex flex-col overflow-hidden bg-surface-low">
  <Navbar ... />
  <div className="flex flex-1 overflow-hidden min-h-0">
    <Sidebar ... />                          // bg-slate-brand, w-[210px]
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <div className={`flex-1 min-h-0 w-full ${
        activeTab === 'chats' ? 'flex overflow-hidden' : 'overflow-y-auto'
      }`}>
        {/* Tab content */}
      </div>
    </div>
  </div>
</div>
```

**Tab content max-width:** `max-w-[1100px] mx-auto w-full` — apply to all tab content wrappers.

**Panel-based tabs** (chats) must set the content wrapper to `flex overflow-hidden` so inner columns manage their own scroll. All other tabs use `overflow-y-auto`.

---

## What NOT To Do

- **Never** use `Inter` imported via `@fontsource` — use Google Fonts `<link>` in `index.html`
- **Never** use `placeholder.com` or `picsum.photos` — use Unsplash URLs from mock data
- **Never** use `console.log` in final component code
- **Never** use `any` type in TypeScript
- **Never** use inline `style={{}}` for colors — always use Tailwind classes
- **Never** install additional UI libraries — only shadcn/ui + lucide-react
- **Never** create new files in `src/app/components/ui/` — those are shadcn auto-generated
- **Never** use `h1`–`h6` without the corresponding typography class combination above
- **Never** use Tailwind's `prose` class — write all typography manually
- **Never** use flat `bg-coral` for primary buttons — always use the terracotta gradient
- **Never** use Tailwind default shadow presets (`shadow-md`, `shadow-lg`) — always use explicit `boxShadow` values from the Shadow System table above
- **Never** add new tab components directly inside a dashboard page file — extract to `src/app/components/tenant/` or `src/app/components/landlord/`

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

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `python3 -c "from graphify.watch import _rebuild_code; from pathlib import Path; _rebuild_code(Path('.'))"` to keep the graph current

### God Nodes (most connected — touch these carefully)

| Node | Edges | Why it matters |
|---|---|---|
| `UI Utils (cn helper)` | 39 | Every shadcn/ui component routes through this — breaking it breaks all UI |
| `TenantDashboard Page (Shell)` | 13 | Orchestrates all tenant tab components + state |
| `Mock Properties Data` | 9 | Single source for listings, chat conversations, AND wishlist data |
| `Client-Side Router (routes.tsx)` | 9 | All 8 routes wired here |
| `Sidebar UI Component (shadcn)` | 9 | Composite: composes Button, Input, Separator, Skeleton, Tooltip, Sheet |
| `LandlordDashboard Page` | 8 | Landlord-side equivalent of TenantDashboard |

### Key Architectural Insights (from graph run 2026-04-11)

- **`mockProperties.ts` is a hidden data hub** — it exports properties, tenants, tickets, AND conversations. Replacing it with a real API requires touching listings, chat, wishlist, and maintenance simultaneously.
- **`ChatInterface` is dual-context** — used as an embedded tab inside `TenantDashboard` AND as a standalone `ChatPage`. The `flex overflow-hidden` wrapper rule exists because of this dual usage.
- **Ireland compliance lives in two places** — RPZ badge logic is in `PropertyCard.tsx`, RTB banner is in `LandlordDashboard.tsx`. Both implement rules documented only in `CLAUDE.md`. If you touch those components, check the Ireland-Specific Rules section.
- **`AmenityTag` is structurally disconnected from `PropertyCard`** — they're semantically related but have no import edge. AmenityTag was extracted from PropertyCard's inline rendering but the dependency was never formalized.
- **39 shadcn/ui components all depend on `cn()` in `src/app/components/ui/utils.ts`** — never edit or move this file.

### Community Map (39 communities, graph.html for full view)

Key communities:
- **Tenant Dashboard Feature** (22 nodes) — `TenantDashboard`, tab components, `LocalTicket`/`TicketForm` types
- **App Routing & Pages** (10 nodes) — `App.tsx`, `routes.tsx`, all 8 page components
- **Brand Identity** (3 nodes, cohesion 1.0) — `Navbar`, `Footer`, `LogoMark` — always move together
- **Auth Layout** (4 nodes) — `TenantLoginPage`, `LandlordSignupPage`, 50/50 split pattern
- **shadcn/ui Primitive Components** (74 nodes) — auto-generated, never edit directly
