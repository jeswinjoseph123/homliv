# HomLiv — Investor Overview
**Confidential · April 2026**

---

## Executive Summary

HomLiv is a premium Irish rental management and listing platform targeting Ireland's chronically undersupplied private rental market. Built for three distinct user types — **landlords**, **tenants**, and **roommates** — HomLiv replaces fragmented, outdated property portals with a single vertically-integrated platform that handles discovery, verification, payments, maintenance, and communication end-to-end.

The platform is currently a high-fidelity, fully functional frontend product (React + TypeScript) with mock data, ready for backend integration and market launch.

---

## The Problem

Ireland's rental market is one of the most dysfunctional in the EU:

- **Dublin rents are among the highest in Europe.** Average asking rents surpassed €2,200/month for a one-bed in 2025.
- **Rent Pressure Zone (RPZ) rules** cap annual increases but are widely ignored or misunderstood, leaving tenants unprotected.
- **Existing platforms (Daft.ie, Rent.ie)** are listing aggregators only — no landlord tools, no tenant portals, no in-app communication, no maintenance tracking.
- **28% of Dublin tenants** report difficulty contacting their landlord in emergencies.
- **Landlord compliance is low** — RTB (Residential Tenancies Board) registration is legally required but regularly missed.
- **Roommate/house-share listings** are scattered across Facebook groups, StudentHubs, and generic classifieds with zero trust signals.

**The opportunity:** No single platform owns the full rental lifecycle in Ireland. HomLiv does.

---

## The Solution — HomLiv

HomLiv is a three-sided marketplace with dedicated role-based portals for every participant in the Irish rental market.

### For Tenants
- Search and filter verified listings across Dublin, Cork, and Galway
- Save properties to a wishlist with live popularity counters
- View full property detail: BER rating, Eircode, RPZ status, amenities, transport links, house rules
- Manage active tenancy: lease details, inventory, interactive property map
- Raise and track maintenance tickets in real time
- Pay rent digitally and view full payment history
- Chat directly with landlord from within the app

### For Landlords
- List properties through a guided 3-step wizard (type, details, photos)
- **4-step identity and ownership verification** (PPS number, Eircode, proof of ownership, IBAN/BIC) — creates a verified landlord badge that builds tenant trust
- Tenant management dashboard: rent status, maintenance queue, communication log
- RTB compliance banner — automated reminder to register tenancy within the legal 1-month window
- Payments tracker: collected, pending, overdue — per property, per tenant
- Inline messaging with all tenants in one place

### For Roommates
- Dedicated signup and identity verification flow (2-step: email + phone)
- List a spare room with permanent or temporary availability (date ranges)
- Browse and enquire about rooms posted by verified roommates or landlords
- Dashboard with listing expiry tracking, enquiry feed, and messaging

---

## Market Opportunity

| Metric | Figure | Source |
|---|---|---|
| Private rental sector, Ireland | ~330,000 households | RTB 2024 |
| Dublin alone | ~185,000 rental units | CSO |
| Average monthly rent, Dublin | €2,200 (1-bed) · €1,100 (room) | Daft.ie Rental Report 2025 |
| RTB registered tenancies | ~215,000 active | RTB 2024 |
| Room-share listings (Dublin) | ~8,000 active at any time | Estimated |
| TAM (platform fees at 1% of rent) | ~€87M/year (Dublin only) | HomLiv estimate |
| SAM (Year 1 target, 5% market share) | ~€4.3M ARR | HomLiv estimate |

Ireland's rental market is **structurally supply-constrained** — demand is not cyclical. Population growth, immigration, and insufficient housing construction guarantee sustained demand for quality rental tooling.

---

## Product — Current Build

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 5.9 |
| Build tool | Vite 6.3 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Component library | shadcn/ui (Radix UI primitives) |
| Icons | Lucide React |
| Animations | CSS View Transitions API (iOS-style page transitions) + Motion |
| Forms | React Hook Form |
| Charts | Recharts |
| Drag & drop | React DnD (document upload in verification wizard) |
| Toast notifications | Sonner |
| State persistence | localStorage (verification state, wishlist, roommate store) |

### Design Language

HomLiv's UI is built to Apple's premium standard — intentionally distinct from Irish property portals that look frozen in 2012:

- **SF Pro system font stack** — no Google Fonts, instant render
- **Tight typography scale** — `clamp()` fluid sizing, `-0.04em` letter tracking on headings
- **5-colour design system** — Jet (`#2d3142`), Slate (`#4f5d75`), Coral (`#ef8354`), Surface (`#fafafa`), Ink (`#1d1d1f`)
- **No border lines between sections** — depth created by background colour shifts only (Apple's signature approach)
- **iOS-style push/pop page transitions** using the View Transitions API
- **Glassmorphism navbar** — `backdrop-blur-xl` sticky header with deep shadow

### Pages & Routes (14 routes)

| Route | Page |
|---|---|
| `/` | HomePage — hero, stats, featured listings, testimonials, app download, how-it-works, CTA |
| `/listings` | ListingsPage — paginated grid (10/page), sidebar filters, sort |
| `/property/:id` | PropertyDetailPage — image gallery, full details, report modal, wishlist |
| `/login` | TenantLoginPage — 50/50 split auth layout |
| `/landlord` | LandlordSignupPage — 50/50 split auth layout, routes to verification on signup |
| `/dashboard` | LandlordDashboard — 8-tab management portal |
| `/tenant-dashboard` | TenantDashboard — 7-tab tenant portal |
| `/chat/:tenancyId` | ChatPage — real-time-ready chat UI |
| `/landlord/verify` | LandlordVerifyPage — 4-step verification wizard |
| `/landlord/list-property` | LandlordListPropertyPage — 3-step listing wizard |
| `/roommate` | RoommateSignupPage — roommate-specific auth |
| `/roommate/verify` | RoommateVerifyPage — 2-step lightweight verification |
| `/roommate/dashboard` | RoommateDashboard — 4-tab roommate portal |
| `/roommate/list-room` | ListRoomPage — room listing wizard |

### Landlord Dashboard — 8 Tabs

1. **Overview** — KPI cards (properties, tenants, monthly revenue, occupancy), upcoming rent due, recent activity feed
2. **Properties** — all properties with status, occupancy, quick actions; "List New" opens inline modal wizard
3. **Tenants** — tenant table with rent status, overdue indicators (red dot avatar), maintenance ticket count, message/call actions
4. **Maintenance** — ticket table with priority pills (High/Medium/Low), status tracking (Open → In Progress → Resolved)
5. **Payments** — Rent Tracker table, payment history accordion per property, stat cards (Collected/Pending/Overdue), ActionsDropdown for status changes
6. **Messages** — links to full chat interface
7. **Settings** — profile, notification preferences, verification toggle (dev)
8. **RTB compliance** — ambient banner reminding registration obligation

### Tenant Dashboard — 7 Tabs

1. **Overview** — wishlist items, maintenance summary, quick-action shortcuts
2. **Tenancy** — lease card, inventory list, transport map links
3. **Wishlist** — saved properties grid with remove/clear controls
4. **Maintenance** — stat cards + ticket log; raise-ticket modal (category, priority, description)
5. **Payments** — rent payment history, next due date
6. **Chat** — embedded `ChatInterface` component, dual-context (also used standalone at `/chat/:id`)
7. **Settings** — profile, notifications, security

### Landlord Verification Flow

Critical trust feature. Landlords cannot list properties until verified.

**Step 1 — Personal Info:** Full legal name, Irish phone (+353), date of birth, PPS number

**Step 2 — Ownership:** Ownership type (sole/joint/company), property Eircode, proof of ownership upload (drag-and-drop with React DnD)

**Step 3 — Bank Details:** IBAN, BIC, account holder name — GDPR notice displayed

**Step 4 — Confirmation:** Read-only summary, T&C checkbox, submit for review

On submit: `useVerificationStore` sets `homliv_landlord_verified = true` in localStorage. When backend ships, this swaps for a server-side check.

---

## Competitive Landscape

| Feature | HomLiv | Daft.ie | Rent.ie | SpareRoom |
|---|---|---|---|---|
| Ireland-specific compliance (RTB, RPZ) | Yes | Partial | No | No |
| Landlord verification | Yes | No | No | No |
| Tenant portal / lease management | Yes | No | No | No |
| Maintenance ticket system | Yes | No | No | No |
| In-app chat | Yes | No | No | Yes |
| Roommate-specific flow | Yes | No | No | Yes |
| Payment tracking | Yes | No | No | No |
| Mobile-grade UI | Yes | No | No | Partial |
| Premium design standard | Yes | No | No | No |

HomLiv is the **only platform** that serves landlord, tenant, and roommate with dedicated, Ireland-compliant portals.

---

## Ireland-Specific Compliance Built In

HomLiv bakes Irish rental law into the product, not a FAQ page:

- **RPZ badge** on every qualifying listing — displayed on property cards and detail pages where `isRPZ: true`
- **RTB registration reminder** — ambient banner in landlord dashboard: *"Remember to register this tenancy with the RTB within 1 month."*
- **Eircode** used throughout (never "postcode" or "zip code")
- **BER Rating** labelled correctly (not "energy rating")
- **Euro (€) pricing** — `€950/mo` format throughout
- **+353 phone prefix** in all landlord and roommate verification forms
- **Irish locale formatting** — `toLocaleString('en-IE')` on all currency and number displays

---

## User Acquisition Strategy (Phase 1)

**Landlords (supply side — critical path):**
- Target landlord Facebook groups (Dublin Landlords Network, Irish Property Owners)
- Partner with letting agents for white-label verification tooling
- RTB compliance messaging — "avoid €15,000 fines, register in one click"
- Google Ads: "landlord management software Ireland"

**Tenants (demand side):**
- University partnerships (UCD, Trinity, DCU) for student housing
- Relocating professional communities (LinkedIn, expat Slack groups)
- Referral programme — tenants who refer a landlord get 1 month fee-free

**Roommates:**
- Organic growth via verified room listings (supply creates demand)
- Social targeting: 18–30, Dublin/Cork, "looking for accommodation Ireland"

---

## Monetisation Model

HomLiv targets **SaaS + transaction hybrid** monetisation:

| Revenue Stream | Model | Rate |
|---|---|---|
| Landlord subscription | Monthly SaaS | €29–€99/mo per landlord (based on portfolio size) |
| Tenant premium | Optional upgrade | €9.99/mo (early access, priority listings, AI matching) |
| Listing boost | Pay-per-listing | €15–€45 per boosted listing (featured placement) |
| Verification fast-track | One-time | €19 (24-hour verification vs. 5-day standard) |
| Payment processing | Transaction fee | 0.5–1% of rent collected through platform |

**Year 1 target:** 500 landlord subscriptions + 1,000 tenants = ~€250K ARR before transaction revenue.

**Year 3 target:** 5,000 landlords × €49/mo avg = ~€3M ARR + transaction layer.

---

## Roadmap

### Phase 1 — MVP Launch (Q3 2026)
- Backend: Supabase (PostgreSQL + Auth + Storage + Realtime)
- Live listings with real landlord data
- Stripe integration for rent payment collection
- Real-time chat via Supabase Realtime
- Email/SMS notifications (Resend + Twilio)
- iOS and Android PWA

### Phase 2 — Trust & Growth (Q4 2026)
- ID verification via Stripe Identity or Veriff (replace mock PPS check)
- AI-powered listing match recommendations (tenant preferences → property scoring)
- Automated RTB registration form generation
- Landlord analytics: occupancy rates, income trends, market benchmarks

### Phase 3 — Expansion (2027)
- Cork and Galway dedicated property pools
- Property management company portal (multi-landlord accounts)
- Mortgage-to-rent and HAP scheme integrations
- API for letting agents

---

## Architecture — Technical Summary

```
src/
  app/
    components/
      layout/        Navbar, Footer (brand identity nodes)
      shared/        PropertyCard, LogoMark, ChatInterface, StatusBadge
      landlord/      Dashboard tabs + verification wizard steps
      roommate/      Roommate dashboard tabs
      tenant/        Tenant dashboard tabs
      ui/            shadcn/ui primitives (74 components, auto-generated)
    pages/           14 route-level page components
  data/              mockProperties.ts — 14 properties, tenants, tickets, conversations
  hooks/             useWishlist, useVerificationStore, useRoommateStore,
                     useCountUp, useScrollReveal, useChat
  lib/               utils.ts (cn helper — imported by all 74 UI components)
  types/             index.ts — Property, Landlord, Tenant, MaintenanceTicket, Message, Report
  styles/            theme.css (design tokens, View Transition keyframes, global resets)
```

**Key architectural decisions:**
- Dashboard pages are **thin shells** — all tab UI is extracted to dedicated components. This enables parallel development and clean feature boundaries.
- **God nodes identified** — `utils.ts` (cn helper, 39 dependents), `mockProperties.ts` (data hub for listings + chat + maintenance), `routes.tsx` (14 client-side routes). Touch carefully.
- **No backend coupling in frontend** — all state is prop-drilled or hook-based. Swapping localStorage for API calls requires changing only hooks, not pages or components.
- **View Transitions API** — iOS-style directional push/pop animations via `navBack()` helper, zero JavaScript animation libraries needed for page transitions.

---

## Team & Status

| Item | Detail |
|---|---|
| Stage | Frontend complete — backend-ready |
| Frontend components | ~100 React components across 14 routes |
| UI primitives | 74 shadcn/ui components |
| Mock data | 14 properties, 3 tenant personas, maintenance tickets, conversations |
| Design system | Full token set, documented in CLAUDE.md |
| Codebase | TypeScript, zero `any` types, full path aliasing |
| Repo | github.com/jeswinjoseph123/homliv |

---

## Why Now

1. **Irish rental crisis is not cyclical** — structural undersupply guarantees sustained demand
2. **Digitisation gap is widening** — Irish landlords still manage tenancies via email and spreadsheets
3. **RTB enforcement is tightening** — fines for non-registration increased in 2024
4. **PropTech funding in Ireland is thin** — no well-funded vertically-integrated platform exists
5. **Design raises trust** — HomLiv's Apple-grade UI signals legitimacy at first glance, reducing landlord and tenant hesitation to onboard

---

## Ask

**Seeking:** Seed investment to fund backend build, team hire, and Dublin market launch.

**Use of funds:**
- 40% — Engineering (backend, mobile PWA, auth, payments integration)
- 25% — Sales & Marketing (Dublin landlord acquisition, university partnerships)
- 20% — Operations (RTB legal partnerships, compliance, customer support)
- 15% — Reserve

**Contact:** jeswinjoseph08@gmail.com

---

*HomLiv — The Irish Rental Platform, Built Right.*
