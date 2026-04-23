# CLAUDE.md — HomLiv Project Intelligence

This file tells Claude Code everything it needs to know about this project.
Read this file before writing any code. Never deviate from these rules.

---

## Project Overview

**Name:** HomLiv (was RoomNest — brand renamed)
**Type:** Irish rental management + listing platform
**Stack:** React + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui + react-router v7
**Status:** Frontend only — mock data, no backend connected yet
**Design Language:** Apple-inspired premium — clean, generous whitespace, neutral surfaces, bold typography

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
      landlord/      # LandlordDashboard tab components + verify/ wizard steps
      roommate/      # RoommateDashboard tab components
      tenant/        # TenantDashboard split components
      ui/            # shadcn/ui components (auto-generated, do not edit)
    pages/           # One file per route
  data/              # Mock data only — mockProperties.ts (14 properties)
  hooks/             # useWishlist, useChat, useVerificationStore, useRoommateStore, useCountUp, useScrollReveal
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
- Present in: Navbar, Footer, TenantLoginPage, LandlordSignupPage

---

## Typography & Font

**Font:** Apple system font stack — resolves to SF Pro on macOS/iOS automatically.

```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
```

Set globally in `src/styles/theme.css` and `index.html`. **Do not add any Google Fonts link.**
`-webkit-font-smoothing: antialiased` is set globally for crisp rendering.

### Smooth Scrolling

`scroll-behavior: smooth` is set on `html` in `src/styles/theme.css`. This applies globally — all anchor links, `scrollIntoView()`, and `window.scrollTo()` calls animate automatically. **Do not set it per-element.**

---

## Design System — READ BEFORE WRITING ANY CSS

### Colors — use these exact values, no exceptions

| Token | Hex | Usage |
|---|---|---|
| `jet` | `#2d3142` | Navbar bg, Display headings, dark surfaces |
| `slate-brand` | `#4f5d75` | Sidebar bg, secondary text, meta info |
| `coral` | `#ef8354` | CTAs, prices, active states, accents |
| `coral-dark` | `#9c441a` | Coral hover state only |
| `surface` | `#fafafa` | Page background (neutral, no purple tint) |
| `surface-low` | `#f5f5f7` | Section backgrounds — Apple's signature gray |
| `ink` | `#1d1d1f` | Body text — Apple's near-black |
| `ghost` | `#dcc1b7` | Borders at 15% opacity only |

**In Tailwind:** these are configured as `bg-jet`, `text-coral`, `bg-surface-low`, etc.

### The Rules (violations will be flagged)

1. **NO BORDER LINES for sections.** Boundaries must be defined by background color shifts only. Never use `border-b`, `border-t`, or `divide-*` to separate sections.
2. **NO 100% BLACK.** Always use `text-jet` (`#2d3142`) for deep tones. `text-ink` (`#1d1d1f`) for body copy.
3. **CORAL IS SCARCE.** Only use coral for: CTA buttons, price tags, active states, key highlights. Never decorative.
4. **NO DEFAULT SHADOWS.** Never use `shadow-md`, `shadow-lg`, or any Tailwind shadow preset. Use explicit shadow values only.
5. **NO `overflow-hidden` on table card wrappers.** Any card that contains a `<table>` with dropdowns/popovers must NOT use `overflow-hidden` — it clips absolutely-positioned children. Apply border-radius to header `<th>` cells directly instead.
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

### Typography — Apple-scale, tight tracking

```tsx
// Display LG — Hero headings (Apple-style)
className="font-bold text-white"
style={{ fontSize: 'clamp(3rem, 6.5vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}

// Headline MD — Section titles
className="font-bold text-jet"
style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.03em' }}

// Title SM — Card titles, sub-headers
className="text-base font-bold text-jet" style={{ letterSpacing: '-0.02em' }}

// Body LG — Descriptions
className="text-base font-normal leading-relaxed text-ink"

// Label MD — Tags, specs, micro-copy
className="text-[0.75rem] font-bold tracking-[0.05em] uppercase text-slate-brand"
```

### Gradient Text (Apple-style accent phrase)

```tsx
const gradientText: React.CSSProperties = {
  background: 'linear-gradient(135deg, #ef8354 0%, #d47550 60%, #c05030 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};
// Usage: <span style={gradientText}>key phrase</span>
```

### Input Fields

```tsx
// Verification wizard fields (gray rounded box — Apple style)
className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40"

// Standard (full border — signup/login form panels)
className="border border-ghost/40 rounded-lg px-4 py-3 focus:border-coral outline-none transition-colors bg-white"
```

### Cards

```tsx
// Property Card — lift-on-hover, no border
// Outer: className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
//        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
//        onMouseEnter: boxShadow = '0 16px 48px rgba(0,0,0,0.12)'
// Image: className="relative m-3 rounded-xl overflow-hidden h-52"

// Dashboard stat card — white
className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]"

// Dashboard stat card — coral gradient
style={{ background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)' }}

// Dashboard stat card — slate/dark
style={{ background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)', boxShadow: '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)' }}

// Dark card (How-It-Works landlord side, App Download, Payments hero)
style={{ background: 'linear-gradient(145deg, #1a1c2e 0%, #0f1018 100%)', boxShadow: '0 8px 40px rgba(0,0,0,0.22)' }}

// Form card (verification wizard)
className="bg-white rounded-2xl p-6"
style={{ boxShadow: '0 4px 24px rgba(23,27,43,0.08), 0 1px 4px rgba(23,27,43,0.04)' }}
```

### Shadow System

| Card type | Shadow value |
|---|---|
| White card (Apple-clean) | `0 2px 12px rgba(0,0,0,0.06)` |
| White card hover | `0 16px 48px rgba(0,0,0,0.12)` |
| Dashboard white card | `0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)` |
| Coral gradient card | `0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)` |
| Slate gradient card | `0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)` |
| Jet dark card | `0 8px 40px rgba(0,0,0,0.22)` |
| Navbar (floating) | `0 4px 24px rgba(18,20,31,0.50), 0 1px 4px rgba(18,20,31,0.30)` |
| Footer (upward) | `0 -8px 32px rgba(23,27,43,0.12)` |

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
- **LandlordSignupPage "Create Account"** navigates to `/landlord/verify` (not `/dashboard`)
- **LandlordSignupPage "Sign In"** navigates to `/dashboard`

---

## HomePage Section Order (Apple-premium redesign)

```
Hero (dark #0a0a0f + coral ambient glow + pill tag + gradient text headline + floating preview card)
  └─ Stats strip at bottom of hero (animated counters)
Featured Listings (bg-surface-low — 3 cards, centered header, no coral badge decorators)
App Download (dark card on bg-surface-low)
Why HomLiv (bg-white — 3 icon features, hover interactions)
Testimonials (bg-surface-low — 3 review cards, coral top-border on hover)
How it Works (bg-white — For Tenants light card + For Landlords dark card, lift on hover)
CTA — "Start your Dublin journey" (bg-surface-low, centered, pill email input)
Footer
Back-to-top button (fixed, bottom-right, appears after 500px scroll)
```

### Hero specifics
- Background: `#0a0a0f` (deeper than before)
- Hero text: `clamp(3rem, 6.5vw, 5rem)` with `letterSpacing: '-0.04em'`
- Gradient text on accent phrase using `WebkitBackgroundClip: 'text'`
- Pill tag at top: coral tinted with pulse dot
- Section headings: `clamp(2rem, 4vw, 2.75rem)` with `-0.03em` tracking
- No coral line + badge combos before headings — headings stand alone

### Hero card animation
```tsx
@keyframes float {
  0%, 100% { transform: rotate(3deg) translateY(0px); }
  50% { transform: rotate(3deg) translateY(-14px); }
}
.animate-float { animation: float 6s ease-in-out infinite; }
```

### Stats strip — animated counters
Stats count up from 0 to their target value on page load using `IntersectionObserver` (fires when strip enters viewport). Uses cubic ease-out via `requestAnimationFrame`. Implemented via `useCountUp` hook (`src/hooks/useCountUp.ts`) and `StatCounter` component defined locally in `HomePage.tsx`. Scroll reveal uses `useScrollReveal` hook (`src/hooks/useScrollReveal.ts`) — fires once when element enters viewport, then disconnects observer.

```tsx
// STATS shape — numeric end + suffix stored separately
const STATS = [
  { end: 14000, suffix: '+', label: 'Active Listings' },
  { end: 3200,  suffix: '+', label: 'Verified Landlords' },
  { end: 28000, suffix: '+', label: 'Happy Tenants' },
  { end: 3,     suffix: '',  label: 'Cities Covered' },
];
```

### Hover interactions (homepage)

| Section | Effect |
|---|---|
| **Testimonial cards** | Coral `2px` top border slides in, card lifts `-4px`, avatar gets `ring-coral/30`, shadow deepens |
| **Why HomLiv features** | White card bg appears, icon container → `bg-coral/10`, icon scales `1.1×`, card lifts |
| **How It Works — Tenants** | Card lifts `-4px`, shadow deepens to `0 16px 48px rgba(23,27,43,0.12)` |
| **How It Works — Landlords** | Card lifts `-4px`, dark shadow deepens to `0 20px 60px rgba(0,0,0,0.35)` |
| **Featured PropertyCards** | Lift `-4px` + shadow deepen (handled inside `PropertyCard` component) |

### Back-to-top button
Fixed bottom-right (`bottom-8 right-8`), terracotta gradient, coral glow shadow. Appears/hides via `showTopBtn` state driven by `window.scrollY > 500`. Animates in/out with `opacity` + `translateY` + `scale`. `pointerEvents: none` when hidden.

```tsx
// Scroll listener in useEffect — passive for perf
window.addEventListener('scroll', onScroll, { passive: true });
```

---

## Listings Page

- `ITEMS_PER_PAGE = 10` — 10 listings per page
- 14 total mock properties → 10 on page 1, 4 on page 2
- Sidebar blends with `bg-surface` (no white card background)
- Sort buttons: `rounded-full`, terracotta gradient when active
- "Dublin City" heading uses `text-coral`

---

## Landlord Verification Flow

### Overview

When a landlord creates an account they are sent to `/landlord/verify`. They can skip via "Do it later" → dashboard as unverified. Unverified landlords cannot list properties — the listing buttons redirect to `/landlord/verify`.

### Hook: `useVerificationStore`

`src/hooks/useVerificationStore.ts` — localStorage-backed (`homliv_landlord_verified`).

```ts
const { isVerified, setVerified } = useVerificationStore();
// setVerified(true)  → mark verified
// setVerified(false) → reset to unverified
```

### Route: `/landlord/verify` → `LandlordVerifyPage`

Layout: `LandlordSidebar` (nav) → steps list (w-44, no bg card, blends into surface-low) → form (flex-1, scrollable) → trust panel (w-52). Steps list and form are wrapped together in a `viewTransitionName: 'main-content'` div so they slide as one unit.

Steps:
1. **Personal Info** — Full name, phone (+353), DOB, PPS number
2. **Ownership** — Ownership type, Eircode, proof of ownership upload
3. **Bank Details** — Account holder, IBAN, BIC
4. **Confirmation** — Read-only summary + T&C checkbox

Form inputs use gray rounded box style: `bg-[#f0f1f3] rounded-xl px-4 py-3`.
Form card: `bg-white rounded-2xl p-6` with soft shadow.
"Do it later" → `setVerified(false)` → `/dashboard`.
"Submit for Review" → `setVerified(true)` → toast → `/dashboard`.

### Step components

```
src/app/components/landlord/verify/
  Step1PersonalInfo.tsx   — exports Step1Form interface
  Step2Ownership.tsx      — exports Step2Form interface (drag-and-drop upload)
  Step3BankDetails.tsx    — exports Step3Form interface (GDPR notice)
  Step4Confirmation.tsx   — read-only summary + T&C checkbox
```

### Dashboard: verification gate

`LandlordDashboard.tsx` reads `isVerified` from `useVerificationStore`:
- If `!isVerified`: amber banner shown with "Verify Now" button → `/landlord/verify`
- `OverviewTab` and `PropertiesTab` both receive `isVerified: boolean` prop
- When `isVerified=false`: "List Property" / "List New Property" → navigate to `/landlord/verify`
- When `isVerified=true`: buttons open `ListPropertyModal` normally

### Dev testing

`SettingsTab` has a "Dev Tools" card at the bottom that shows current verification status and toggles it with a button — no need to touch localStorage manually.

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
- `activeTab`, `sidebarOpen`, `showTicketModal`, `ticketForm`, `wishlisted`

---

## Landlord Dashboard — Component Split

`LandlordDashboard.tsx` is a **thin shell** — it owns state and wires components together only. All tab UI lives in `src/app/components/landlord/`.

```
src/app/components/landlord/
  types.ts                — Tab union, NewPropertyForm interface + PRIORITY_CLASSES map
  LandlordSidebar.tsx     — sidebar nav + mobile backdrop (props: activeTab, onNav, isOpen, onClose)
  OverviewTab.tsx         — KPI cards, upcoming rent, recent activity (props: onListProperty, isVerified)
  PropertiesTab.tsx       — property list rows (props: onListNew, isVerified)
  TenantsTab.tsx          — 3 stat cards (Total/Active/Overdue) + table-fixed tenants table; overdue avatar gets red dot indicator; ticket count as coral gradient badge; Message + Phone action buttons (no special props)
  MessagesTab.tsx         — link to chat page (no special props)
  MaintenanceTab.tsx      — 3 stat cards (Open/In Progress/Resolved) + table-fixed tickets table; ticket ID as monospaced pill; priority as colored pill + dot (red/amber/emerald); no overflow-hidden on wrapper (no special props)
  PaymentsTab.tsx         — "Rent Tracker" header + Set up Rent Schedule button; 3 stat cards (Collected/Pending/Overdue) with live totals; table-fixed rent tracker table; ActionsDropdown (... button → contextual status change options); Property Payment History accordion; NO overflow-hidden on table wrapper (no special props)
  SettingsTab.tsx         — profile, settings list + Dev Tools verification toggle
  ListPropertyModal.tsx   — 3-step listing wizard (props: open, onClose — owns form state internally)
  verify/                 — 4-step verification wizard step components
```

**State owned by LandlordDashboard.tsx:**
- `activeTab`, `rtbDismissed`, `verifyDismissed`, `sidebarOpen`, `showNewPropertyModal`
- `isVerified` — read from `useVerificationStore` (not local state)

---

## Roommate Dashboard — Component Split

`RoommateDashboard.tsx` is a **thin shell**. All tab UI lives in `src/app/components/roommate/`.

```
src/app/components/roommate/
  types.ts            — Tab union ('overview'|'listings'|'messages'|'settings') + ListRoomForm interface
  RoommateSidebar.tsx — sidebar nav + mobile backdrop (props: activeTab, onNav, isOpen, onClose, hasActiveListing)
  OverviewTab.tsx     — listing status card, enquiry feed, quick actions (props: onNav, hasActiveListing, expiryDate, isVerified)
  MyListingsTab.tsx   — roommate's active listing card (no special props)
  MessagesTab.tsx     — enquiry messages list (no special props)
  SettingsTab.tsx     — profile + settings (no special props)
```

**State owned by RoommateDashboard.tsx:**
- `activeTab`, `sidebarOpen`, `verifyBannerDismissed`, `listings`
- `isVerified` — read from `useRoommateStore` (not local state)
- `hasActiveListing`, `expiryDate` — derived from `listings`

---

## Roommate Verification Flow

### Hook: `useRoommateStore`

`src/hooks/useRoommateStore.ts` — localStorage-backed.

```ts
// Keys: homliv_roommate_role, homliv_roommate_verified
const { isRoommate, setRoommate, isVerified, setVerified } = useRoommateStore();
```

### Route: `/roommate/verify` → `RoommateVerifyPage`

2-step lightweight verification (email + phone only — simpler than landlord flow):

1. **Email** — enter 6-digit code (send + confirm)
2. **Phone** — enter phone + 6-digit code

On complete: `setVerified(true)` → toast → navigate to `/roommate/list-room`.
"Back to dashboard" uses `navBack()`.

### Dashboard: verification gate

If `!isVerified`: amber banner shown with "Verify Identity" button → `/roommate/verify`. Banner is dismissible (localStorage `homliv_roommate_banner_dismissed`).
`OverviewTab.handleListRoom`: unverified → `/roommate/verify`, verified → `/roommate/list-room`.

---

## Shared Chat Component

`src/app/components/shared/ChatInterface.tsx` — reusable chat UI used by:
- `TenantDashboard` chats tab (embedded, no outer chrome)
- `ChatPage` (`/chat/:tenancyId`) — wrapped in Navbar only

The chats tab content wrapper must use `flex overflow-hidden` (not `overflow-y-auto`) so inner panels manage their own scroll:
```tsx
className={activeTab === 'chats' ? 'flex overflow-hidden' : 'overflow-y-auto'}
```

---

## Component Contracts

### `<PropertyCard />`
```ts
interface PropertyCardProps {
  property: Property;
  isWishlisted: boolean;
  onWishlistToggle: (id: string) => void;
  onClick?: () => void;
}
// No border. Lift on hover: hover:-translate-y-1, shadow deepens via onMouseEnter/Leave
```

### `<OverviewTab />`
```ts
interface OverviewTabProps {
  onListProperty: () => void;
  isVerified: boolean;
}
```

### `<PropertiesTab />`
```ts
interface PropertiesTabProps {
  onListNew: () => void;
  isVerified: boolean;
}
```

---

## TypeScript Interfaces

Keep all **shared** types in `src/types/index.ts`. Tenant-specific types live in `src/app/components/tenant/types.ts`.

```ts
export interface Property {
  id: string; title: string;
  type: 'Single Room' | 'Double Room' | 'En-Suite' | 'Studio' | 'Penthouse';
  location: string; eircode: string; price: number; images: string[];
  amenities: string[]; bedrooms: number; bathrooms: number; area: number;
  available: boolean; wishlistCount: number; isRPZ: boolean;
  landlord: Landlord; description: string; houseRules: string[]; transport: string[];
  // Roommate fields — optional, existing 14 properties omit these
  postedBy?: 'landlord' | 'roommate';
  roommateVerified?: boolean;
  listingType?: 'permanent' | 'temporary';
  availableFrom?: string;        // ISO date string
  availableUntil?: string | null; // null = permanent
}
export interface Landlord { name: string; verified: boolean; avatar: string; }
export interface Message { id: string; sender: 'tenant' | 'landlord'; text: string; time: string; read: boolean; }
export interface Tenant { id: string; name: string; avatar: string; property: string; rentDue: string; status: 'active' | 'overdue'; tickets: number; }
export interface MaintenanceTicket { id: string; tenantName: string; property: string; issue: string; status: 'Open' | 'In Progress' | 'Resolved'; date: string; priority: 'High' | 'Medium' | 'Low'; }
export interface Report { id: string; listingId: string; reportedBy: string; reason: string; details?: string; timestamp: string; }
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
/                        → HomePage
/listings                → ListingsPage
/property/:id            → PropertyDetailPage
/login                   → TenantLoginPage
/landlord                → LandlordSignupPage
/dashboard               → LandlordDashboard
/tenant-dashboard        → TenantDashboard
/chat/:tenancyId         → ChatPage
/landlord/verify         → LandlordVerifyPage
/landlord/list-property  → LandlordListPropertyPage
/roommate               → RoommateSignupPage
/roommate/verify        → RoommateVerifyPage
/roommate/dashboard     → RoommateDashboard
/roommate/list-room     → ListRoomPage
```

All routes are client-side. No auth guard needed — mock navigation only.

---

## Page Transitions (View Transitions API)

All navigations use `viewTransition: true` in `navigate()`. Only the `main-content` named region animates — Navbar and nav sidebar stay static.

### CSS (theme.css)

```css
/* Forward: old exits left, new enters from right (iOS push) */
::view-transition-old(main-content) { animation: 380ms ... vt-slide-to-left; }
::view-transition-new(main-content) { animation: 380ms ... vt-slide-from-right; }

/* Back: old exits right, new enters from left (iOS pop) */
html[data-nav-back]::view-transition-old(main-content) { animation: 380ms ... vt-slide-to-right; }
html[data-nav-back]::view-transition-new(main-content) { animation: 380ms ... vt-slide-from-left; }
```

### navBack helper

Any navigation that feels like "going back" (Cancel, Do it later, Back to Properties) must use `navBack()`:

```ts
function navBack(navigate, to, state?) {
  document.documentElement.dataset.navBack = '';
  navigate(to, { state, viewTransition: true });
  setTimeout(() => delete document.documentElement.dataset.navBack, 500);
}
```

Defined at module level in each wizard/listing page. **Never call `navigate()` directly for back navigations.**

### viewTransitionName placement

- **Dashboard pages** (`LandlordDashboard`, `RoommateDashboard`): on `<main>`
- **Wizard pages** (`LandlordListPropertyPage`, `ListRoomPage`, `LandlordVerifyPage`, `RoommateVerifyPage`): on the wrapper `<div>` that contains the steps sidebar + form + tips (everything except the nav sidebar)

---

## Wizard Page Layout Pattern

Used by: `LandlordListPropertyPage`, `ListRoomPage`, `LandlordVerifyPage`, `RoommateVerifyPage`

```
h-screen flex flex-col overflow-hidden bg-surface-low
  Navbar
  flex flex-1 overflow-hidden min-h-0
    <NavSidebar>   ← outside viewTransitionName, stays static
    <div flex flex-1 overflow-hidden style={{ viewTransitionName: 'main-content' }}>
      Steps list (w-44, hidden lg:flex, NO bg card — blends into surface-low)
      <main flex-1 overflow-hidden>
        flex justify-center items-start px-5 py-6 overflow-y-auto h-full
          w-full max-w-lg
            Step label + progress bar (above card)
            Form card (bg-white rounded-2xl overflow-hidden — sizes to content)
              <div key={step} — directional slide animation>
                {step content}
              </div>
              Buttons footer (px-6 pb-4 pt-3, border-top ghost/15)
            ← Back to [X] (mt-4, text-left, navBack)
      </main>
      Tips/Trust panel (w-52, bg-surface-low)
    </div>
```

### Steps list (inactive circle uses bg-white/60, NOT bg-surface-low)

```tsx
<div className="hidden lg:flex flex-col w-44 shrink-0 sticky top-0 h-screen pt-8 pb-6 px-3">
  // inactive: 'bg-white/60 text-slate-brand/50'
  // active:   'bg-coral/15 text-coral border-2 border-coral'
  // done:     'bg-coral text-white'
```

### Directional step content animation

```tsx
const stepDir = useRef<'forward' | 'back'>('forward');

// Continue: stepDir.current = 'forward'; setStep(s => s + 1)
// Back:     stepDir.current = 'back';    setStep(s => s - 1)

<div
  key={step}
  className="p-6 pb-2"
  style={{ animation: `420ms cubic-bezier(0.25,1,0.5,1) ${stepDir.current === 'forward' ? 'step-from-right' : 'step-from-left'} both` }}
>
```

Keyframes `step-from-right` and `step-from-left` are in `theme.css`.

---

## Dashboard Layout Patterns

Both `TenantDashboard` and `LandlordDashboard` share the same shell structure:

```tsx
<div className="h-screen flex flex-col overflow-hidden bg-surface-low">
  <Navbar ... />
  <div className="flex flex-1 overflow-hidden min-h-0">
    <Sidebar ... />
    <main className="flex-1 overflow-y-auto">
      <div className="p-4 sm:p-6 max-w-[1100px] mx-auto w-full">
        {/* Tab content */}
      </div>
    </main>
  </div>
</div>
```

**Panel-based tabs** (chats) must use `flex overflow-hidden` on the content wrapper.

---

## What NOT To Do

- **Never** add Google Fonts or any external font link — font is set via system font stack in `index.html` and `theme.css`
- **Never** use `placeholder.com` or `picsum.photos` — use Unsplash URLs from mock data
- **Never** use `console.log` in final component code
- **Never** use `any` type in TypeScript
- **Never** use inline `style={{}}` for colors — always use Tailwind classes
- **Never** install additional UI libraries — only shadcn/ui + lucide-react
- **Never** create new files in `src/app/components/ui/` — those are shadcn auto-generated
- **Never** use Tailwind's `prose` class — write all typography manually
- **Never** use flat `bg-coral` for primary buttons — always use the terracotta gradient
- **Never** use Tailwind default shadow presets (`shadow-md`, `shadow-lg`) — always use explicit `boxShadow` values
- **Never** use purple-tinted surface colors — `surface` is `#fafafa`, `surface-low` is `#f5f5f7`
- **Never** add new tab components directly inside a dashboard page file — extract to `src/app/components/tenant/`, `src/app/components/landlord/`, or `src/app/components/roommate/`
- **Never** set `scroll-behavior: smooth` on individual elements — it is set globally on `html` in `theme.css`
- **Never** use `bg-coral/10` as a static decorative icon background — only valid as an active/selected state indicator
- **Never** use `overflow-hidden` on a card wrapper that contains a `<table>` with dropdowns — clips absolutely-positioned children. Use `table-fixed` + border-radius on `<th>` cells instead
- **Never** use CSS grid (`grid-cols-[...]`) for table headers + rows — use a real `<table>` with `table-fixed` and `<colgroup>` for guaranteed column alignment
- **Dashboard tab pages** must use a `<div className="flex flex-col gap-5">` root with a header block (title + subtitle) at the top, then stat cards, then the main content card

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

---

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
| `Mock Properties Data` | 9 | Single source for listings, chat, wishlist, AND maintenance data |
| `Client-Side Router (routes.tsx)` | 10 | All routes wired here — now 14 including /roommate/verify |
| `Sidebar UI Component (shadcn)` | 9 | Composite: composes Button, Input, Separator, Skeleton, Tooltip, Sheet |
| `LandlordDashboard Page` | 9 | Landlord-side shell — now also reads useVerificationStore |

### Key Architectural Insights (from graph run 2026-04-11)

- **`mockProperties.ts` is a hidden data hub** — exports properties, tenants, tickets, AND conversations. Replacing it with a real API requires touching listings, chat, wishlist, and maintenance simultaneously.
- **`ChatInterface` is dual-context** — embedded in `TenantDashboard` AND standalone in `ChatPage`. The `flex overflow-hidden` wrapper rule exists because of this dual usage.
- **Ireland compliance lives in two places** — RPZ badge in `PropertyCard.tsx`, RTB banner in `LandlordDashboard.tsx`. Check Ireland-Specific Rules when touching either.
- **Verification state is localStorage-only** — `useVerificationStore` persists `homliv_landlord_verified`. No backend. When backend ships, replace the hook.
- **`useVerificationStore` is consumed by 4 components** — `LandlordDashboard`, `OverviewTab` (via prop), `PropertiesTab` (via prop), `SettingsTab` (direct). Any change to the store interface touches all four.
- **`useRoommateStore` mirrors `useVerificationStore` pattern** — localStorage-backed, consumed by `RoommateDashboard`, `RoommateVerifyPage`, `OverviewTab` (roommate). Keys: `homliv_roommate_role` + `homliv_roommate_verified`.
- **39 shadcn/ui components all depend on `cn()` in `src/app/components/ui/utils.ts`** — never edit or move this file.

### Community Map (key communities)

- **Tenant Dashboard Feature** (22 nodes) — `TenantDashboard`, tab components, `LocalTicket`/`TicketForm` types
- **Landlord Verification Flow** (7 nodes) — `LandlordVerifyPage`, 4 step components, `useVerificationStore`, `LandlordSignupPage`
- **Roommate Feature** (6 nodes) — `RoommateDashboard`, tab components, `useRoommateStore`, `RoommateVerifyPage`
- **App Routing & Pages** (10 nodes) — `App.tsx`, `routes.tsx`, all page components (now 14 routes)
- **Brand Identity** (3 nodes, cohesion 1.0) — `Navbar`, `Footer`, `LogoMark` — always move together
- **Auth Layout** (4 nodes) — `TenantLoginPage`, `LandlordSignupPage`, 50/50 split pattern
- **shadcn/ui Primitive Components** (74 nodes) — auto-generated, never edit directly
