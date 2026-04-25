# HomLiv — Project Overview

**Status:** Frontend only (React + TypeScript). Mock data, no backend yet. Ready for design handoff.

---

## What It Does

Irish rental management + listing platform. Three user roles:

- **Tenants** — search listings, save favorites, raise maintenance tickets, pay rent, view lease
- **Landlords** — list properties, verify identity, track rent/tenants, manage maintenance, verify before listing
- **Roommates** — list spare rooms, field enquiries, temporary/permanent listings

---

## Design Language

**Apple-premium:** Clean, generous whitespace, neutral surfaces, bold typography.
- **Font:** Apple system stack (`-apple-system, SF Pro Display, …`)
- **Color palette:** Jet (`#2d3142`), slate-brand (`#4f5d75`), coral (`#ef8354`), surface (`#fafafa`), surface-low (`#f5f5f7`), ink (`#1d1d1f`)
- **Typography:** iOS-scale with tight tracking (`-0.03em` to `-0.04em`)
- **Buttons:** Terracotta gradient `linear-gradient(180deg, #d47550 0%, #b85530 100%)`
- **Cards:** White on surface-low, lift on hover, no borders (contrast defines edge)
- **Shadows:** Explicit values only (no Tailwind presets)

### No-Go Rules
- NO border lines for sections — use background color shifts only
- NO 100% black — use `text-jet` or `text-ink`
- NO flat coral buttons — gradient only
- NO Google Fonts — system fonts only
- NO `overflow-hidden` on table wrappers — clips dropdowns
- NO Tailwind shadow presets — explicit `boxShadow` only
- MINIMUM grid gap 24px

---

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + custom config
- **Components:** shadcn/ui (auto-generated, never edit) + lucide-react icons
- **Routing:** React Router v7 (client-side, no auth guard)
- **Persistence:** localStorage only (no backend yet)
- **Page Transitions:** View Transitions API (iOS-style push/pop)

---

## Routes (14 Total)

```
/                      HomePage
/listings              ListingsPage (10 per page, 14 mock properties)
/property/:id          PropertyDetailPage
/login                 TenantLoginPage (50/50 split layout)
/landlord              LandlordSignupPage (50/50 split layout)
/dashboard             LandlordDashboard
/tenant-dashboard      TenantDashboard
/chat/:tenancyId       ChatPage
/landlord/verify       LandlordVerifyPage (4-step wizard)
/landlord/list-property LandlordListPropertyPage (3-step wizard)
/roommate              RoommateSignupPage
/roommate/verify       RoommateVerifyPage (2-step lightweight)
/roommate/dashboard    RoommateDashboard
/roommate/list-room    ListRoomPage (3-step wizard)
```

---

## Core Features

### HomePage
- Hero (dark #0a0a0f + coral ambient glow)
- Animated stats counter (14K+ listings, 3.2K+ landlords, 28K+ tenants, 3 cities)
- Featured listings grid (3 cards)
- App download section
- Why HomLiv (3 features)
- Testimonials (3 cards, coral border on hover)
- How it Works (Tenants light + Landlords dark cards)
- CTA email input
- Back-to-top button (fixed, bottom-right)

### Tenant Dashboard
Tabs: Overview | Wishlist | Tenancy | Maintenance | Payments | Settings
- **Overview:** KPI grid, saved properties, open tickets, recent activity
- **Wishlist:** Saved properties grid
- **Tenancy:** Lease details, inventory, property map
- **Maintenance:** Raise ticket modal, ticket status cards
- **Payments:** Payment history, due dates
- **Settings:** Profile, notifications, security

### Landlord Dashboard
Tabs: Overview | Properties | Tenants | Messages | Maintenance | Payments | Settings
- **Overview:** KPI cards (if verified), upcoming rent, recent activity, RTB banner
- **Properties:** List of properties (gated: must verify to list)
- **Tenants:** Table with status (active/overdue), ticket count, message/phone actions
- **Maintenance:** Tickets table with priority (High/Medium/Low), status
- **Payments:** Rent tracker table with ActionsDropdown, rent schedule setup
- **Verification:** 4-step wizard (Personal Info → Ownership → Bank → Confirmation) — gates listing ability
- **Dev Tools:** Toggle verification status (settings tab)

### Roommate Dashboard
Tabs: Overview | My Listings | Messages | Settings
- **Overview:** Active listing card, enquiry feed, quick actions
- **My Listings:** Roommate's active rooms (temporary/permanent)
- **Messages:** Enquiry conversations
- **Verification:** 2-step lightweight flow (email + phone) → gates listing ability

---

## Data Model

### Property (14 mock properties)
```ts
{
  id: string
  title: string
  type: 'Single Room' | 'Double Room' | 'En-Suite' | 'Studio' | 'Penthouse'
  location: string
  eircode: string
  price: number (€/month)
  images: string[] (Unsplash URLs)
  amenities: string[]
  bedrooms, bathrooms, area: number
  available: boolean
  wishlistCount: number
  isRPZ: boolean (Rent Price Freeze area)
  landlord: { name, verified, avatar }
  description, houseRules, transport: string[]
  
  // Optional roommate fields
  postedBy: 'landlord' | 'roommate'
  roommateVerified: boolean
  listingType: 'permanent' | 'temporary'
  availableFrom: ISO date
  availableUntil: ISO date | null
}
```

### Tenant, MaintenanceTicket, Message, Report
Defined in `src/types/index.ts`

---

## Component Architecture

```
src/
  app/
    pages/              # One file per route (14 pages)
    components/
      layout/           # Navbar, Footer
      shared/           # PropertyCard, LogoMark, StatusBadge, ChatInterface
      landlord/         # Dashboard tabs + verify/ wizard steps
      roommate/         # Dashboard tabs
      tenant/           # Dashboard tabs
      ui/               # shadcn/ui (auto-generated)
  hooks/
    useWishlist, useChat, useVerificationStore, useRoommateStore
    useCountUp (stats animation), useScrollReveal (on-viewport animation)
  lib/
    utils.ts            # cn() + custom helpers
  types/
    index.ts            # Shared interfaces
  styles/
    theme.css           # Design tokens, animations
  data/
    mockProperties.ts   # Single source: properties, tenants, tickets, chats
```

---

## Verification & Gates

### Landlord
- 4-step form wizard
- localStorage key: `homliv_landlord_verified`
- Gates: Cannot list properties until verified
- Banner: "Remember to register with RTB within 1 month"

### Roommate
- 2-step lightweight form (email + phone only)
- localStorage key: `homliv_roommate_verified`
- Gates: Cannot list rooms until verified
- Dismissible banner on dashboard

---

## Ireland-Specific Rules

- Currency: `€950/mo` (Euro, no space, `/mo` suffix)
- Address: `Eircode` (never "zip" or "postcode")
- Energy: `BER Rating` (never "energy rating")
- RPZ Badge: Coral `RPZ AREA` badge on rent-controlled properties
- Phone Prefix: `+353` for Ireland
- Copyright: `© 2026 HomLiv. All rights reserved.`

---

## Mock Data Summary

14 properties (IDs 1–14):
- Dublin city focus (Ranelagh, Smithfield, Grand Canal, Rathmines, Merrion Square, Docklands, Ballsbridge, Portobello, Stoneybatter, Phibsborough, Sandymount, Drumcondra)
- Mix of single/double/studio/penthouse
- €700–€3,200/month range
- 8 RPZ areas, 2 let-agreed, 2 let-available
- Landlord verified status varies
- 3–4 amenities per property, transport links, descriptions

---

## Performance & UX Notes

- **Page transitions:** View Transitions API — iOS-style slide in/out
- **Smooth scrolling:** Global `scroll-behavior: smooth` on `<html>`
- **Stats animation:** `useCountUp` + `IntersectionObserver` (fires on viewport enter)
- **Scroll reveal:** `useScrollReveal` hook (one-shot, disconnects after fire)
- **Back navigation:** `navBack()` helper sets `data-nav-back` attribute for pop animation
- **Lazy images:** Unsplash URLs preloaded via mock data

---

## Design Checklist for Mobile App

- [ ] System font stack (no Google Fonts)
- [ ] Coral gradient buttons (never flat)
- [ ] No border lines — use bg color shifts
- [ ] Explicit shadows only
- [ ] 24px+ grid gaps
- [ ] RPZ badge on rent-controlled properties
- [ ] RTB banner on landlord side
- [ ] Eircode labeling
- [ ] Euro formatting (€X/mo)
- [ ] Verification wizards (landlord 4-step, roommate 2-step)
- [ ] View Transitions on navigation (if platform supports)
- [ ] Mobile-optimized sidebar (slide-out nav)
- [ ] Responsive typography (clamp, not fixed sizes)
- [ ] Maintenance table (fixed columns, no overflow-hidden)
- [ ] Chat interface (dual-context: dashboard + standalone page)

---

## Known God Nodes (Touch Carefully)

- `cn()` utility in `src/app/components/ui/utils.ts` — 39 components depend on it
- `mockProperties.ts` — feeds listings, chat, wishlist, maintenance
- `useVerificationStore` — 4 components read this
- `useRoommateStore` — 3 components read this
- `TenantDashboard` shell — orchestrates all tenant tabs
- `LandlordDashboard` shell — orchestrates all landlord tabs

---

## Ready for Design Handoff

✅ Routes finalized (14 total)
✅ Data model frozen (14 mock properties)
✅ Component hierarchy locked
✅ Design system documented
✅ Verification flows defined
✅ Ireland compliance rules set
✅ Animations specified (View Transitions, scroll reveal, count-up)

**Next step:** Mobile app design → handoff to dev team to replicate design patterns in native or Flutter/React Native.