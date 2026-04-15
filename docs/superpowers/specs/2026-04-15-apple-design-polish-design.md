# Apple-Inspired Premium Design Polish — Spec

**Date:** 2026-04-15
**Scope:** Apply Apple-inspired premium design consistently across every page and component in HomLiv. Fix all spec violations and polish dashboard tab interiors.

---

## Approach

Option B: Fix all violations + visual polish on dashboard tabs. The design system is fully defined in CLAUDE.md. This spec records every concrete change required per file.

---

## Section 1 — Public Pages

### `TenantLoginPage.tsx`
- **Inputs:** Replace bottom-border-only style (`border-0 border-b border-ghost/30 rounded-none bg-transparent`) with full-border style to match spec and LandlordSignupPage: `border border-ghost/40 rounded-lg px-4 py-3 focus:border-coral outline-none transition-colors bg-white`

### `ListingsPage.tsx`
- **Concierge chat FAB:** Replace `bg-coral` with terracotta gradient: `style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}`
- **Chat panel header:** Replace `bg-coral` with same gradient

### `PropertyDetailPage.tsx`
- **RPZ badge:** Replace `bg-red-600` with `bg-coral`
- **Description body text:** Replace `text-slate-brand` with `text-ink` (Body LG spec)
- **Section headings** ("The Space", "Amenities", "Location"): tracking `-0.01em` → `-0.02em`

### `HomePage.tsx`, `LandlordSignupPage.tsx`, `Navbar.tsx`, `Footer.tsx`, `PropertyCard.tsx`
- Already compliant. No changes.

---

## Section 2 — Dashboard Shells

### `LandlordDashboard.tsx`
- **RTB banner:** Remove `ℹ️` emoji. Replace with `<Info size={16} className="text-coral shrink-0 mt-0.5" />` (import `Info` from lucide-react)
- **RTB banner background:** `bg-surface` → `bg-coral/5` for warmer on-brand tint

### `TenantDashboard.tsx`
- Already compliant. No changes.

---

## Section 3 — Landlord Dashboard Tabs

### `landlord/OverviewTab.tsx`
- **KPI card icon background:** `bg-coral/10` → `bg-surface-low` (decorative coral violation). Keep `text-coral` on the icon itself.

### `landlord/PropertiesTab.tsx`
- Already compliant. No changes.

### `landlord/TenantsTab.tsx`
- **Overdue row tint:** Remove `bg-red-50` from overdue rows. Status conveyed by `StatusBadge` alone.

### `landlord/PaymentsTab.tsx`
- **Stat card values:** Replace external color classes:
  - `text-green-600` (Collected) → `text-jet`
  - `text-amber-500` (Pending) → `text-coral`
  - `text-red-600` (Overdue) → `text-coral`
- **Stat card icon backgrounds:** All currently plain white cards with no icon backgrounds — already fine.

### `landlord/MaintenanceTab.tsx`
- No violations. Table internal dividers (`border-b border-ghost/20`, `border-b border-ghost/10`) are within a white card — acceptable structure. No changes.

### `landlord/MessagesTab.tsx`
- Large `<MessageSquare>` icon uses `text-coral` as a purely decorative empty-state visual → change to `text-slate-brand`.

### `landlord/SettingsTab.tsx`
- **"Premium Landlord" badge:** `bg-coral/10 text-coral` → `bg-surface-low text-slate-brand`
- Dev Tools card verification status (`text-green-600` / `text-amber-500`): semantic status, keep.

---

## Section 4 — Tenant Dashboard Tabs

### `tenant/OverviewTab.tsx`
- **Upcoming Viewings card wrapper:** Remove `border: '1px solid rgba(220,193,183,0.18)'` — card borders violation.
- **Saved Properties mini-cards:** Remove `border: '1px solid rgba(220,193,183,0.18)'` from each mini card.

### `tenant/WishlistTab.tsx`
- **Property card containers:** Remove `border: '1px solid rgba(220,193,183,0.18)'`. Keep shadow only. White card on `bg-surface-low` background provides sufficient contrast.

### `tenant/PaymentsTab.tsx`
- **"Total paid" stat card icon:** `bg-green-50 / text-green-600` → `bg-surface-low / text-slate-brand`
- Payment status badges (`bg-green-50 text-green-600` / `bg-amber-50 text-amber-600`): semantic status indicators, keep.

### `tenant/MaintenanceTab.tsx`
- **"Open" stat card icon:** `bg-red-50 / text-red-500` → `bg-surface-low / text-coral`
- **"Resolved" stat card icon:** `bg-green-50 / text-green-600` → `bg-surface-low / text-slate-brand`
- **Ticket response bubble:** `rgba(243,242,255,0.80)` (purple-tinted) → `bg-surface-low`
- Priority accent bar colors (`#ef4444`, `#f59e0b`, `#22c55e`): semantic status, keep.

### `tenant/SettingsTab.tsx`
- **"Change Photo" button background:** `rgba(250,248,255,0.8)` (purple-tinted) → `bg-white`
- "Verified Tenant" badge (`bg-green-50 text-green-600`): semantic, keep.
- "Delete Account" (`text-red-500`): danger action semantic, keep.

### `tenant/TenancyTab.tsx`
- **Action buttons background:** `rgba(250,248,255,0.8)` (purple-tinted) → `bg-white`
- **"Active Lease" overlay badge:** `bg-green-500/90` → `bg-coral/90` (on-brand)

---

## Section 5 — ChatInterface + Verify + Landlord Settings

### `shared/ChatInterface.tsx`
- **Search input background:** `#f3f2ff` → `#f5f5f7`
- **Chat message input background:** `#f3f2ff` → `#f5f5f7`
- **SuggestViewingPanel time slot inactive:** `rgba(243,242,255,1)` → `#f5f5f7`
- **Conversation hover state:** `#faf8ff` → `#fafafa`
- **ViewingRequestCard calendar icon background:** `bg-coral/10` → `bg-surface-low`
- "Verified Landlord" badge (`bg-green-50 text-green-600`): semantic, keep.
- "Accept" button (`bg-green-600`): semantic action, keep.

### `LandlordVerifyPage.tsx`
- Already well-structured. Progress sidebar 1px right-border via boxShadow is a structural element, not a section separator — keep.

---

## What Is NOT Changed

- All semantic status colors: `bg-green-50 text-green-600` on "Verified", "Paid", "Active Lease" badges; `text-red-500` on "Delete Account"; priority accent bars on maintenance tickets; `bg-green-600` on "Accept" button — these convey meaning, not decoration.
- Internal card dividers (`border-b border-ghost/15`) within white card containers — acceptable structure.
- Table header `border-b border-ghost/20` within the white TenantsTab card — acceptable.
- The conversation list `borderLeft: '2px solid #ef8354'` active indicator in ChatInterface — small indicator, not a section separator.

---

## Design Language Reference — Use For All Future Features

This section is the canonical design reference for HomLiv. Every new component, tab, page, or modal must follow these rules exactly. When in doubt, check here first.

---

### Color Tokens (Tailwind classes — never raw hex)

| Token | Hex | Use for |
|---|---|---|
| `bg-jet` / `text-jet` | `#2d3142` | Navbar, dark surfaces, display headings, deep body text |
| `bg-slate-brand` / `text-slate-brand` | `#4f5d75` | Sidebar bg, secondary text, meta info, inactive icons |
| `text-coral` / `bg-coral` | `#ef8354` | CTA buttons (via gradient), prices, active nav states, key highlights only |
| `text-coral-dark` | `#9c441a` | Coral hover state only — never as a standalone color |
| `bg-surface` | `#fafafa` | Page background — neutral, no tint |
| `bg-surface-low` | `#f5f5f7` | Section backgrounds, input fields, icon containers, hover states — Apple's signature gray |
| `text-ink` | `#1d1d1f` | Body copy — Apple's near-black |
| `border-ghost` | `#dcc1b7` | Ghost borders at `/15` or `/40` opacity only |

**Never** use raw hex in className or style for any of the above — always use the Tailwind token.

---

### The 8 Rules (violations will be flagged in every review)

1. **NO section border lines.** Section boundaries = background color shifts only. Never `border-b`, `border-t`, or `divide-*` between sections.
2. **NO 100% black.** `text-jet` for headings, `text-ink` for body copy. Never `text-black` or `#000`.
3. **CORAL IS SCARCE.** Coral only for: CTA buttons, price tags, active nav states, key highlights. Never on decorative icons, background tints, or informational elements.
4. **NO default Tailwind shadows.** Never `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`. Always use explicit `boxShadow` values from the shadow system below.
5. **NO card borders.** White card on `bg-surface-low` = sufficient contrast. No `border` on card wrappers.
6. **MINIMUM gap is `gap-6` (24px).** Never use `gap-4` or below in grid/flex layouts.
7. **NO purple-tinted surfaces.** Never `#f3f2ff`, `#faf8ff`, `rgba(243,242,255,...)`, `rgba(250,248,255,...)`. Use `bg-surface-low` (`#f5f5f7`) or `bg-surface` (`#fafafa`).
8. **Inline style only for values with no Tailwind equivalent.** Gradients, `clamp()` font sizes, explicit `boxShadow`, `letterSpacing` — these are valid inline styles. Colors with a registered token must use the Tailwind class, not an inline hex.

---

### Buttons

```tsx
// Primary CTA — terracotta gradient (ALWAYS, never flat bg-coral)
<button
  className="px-6 py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
  style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
>
  Action →
</button>

// Secondary / Ghost
<button className="border border-ghost/20 text-jet rounded-lg px-6 py-3 font-medium hover:bg-surface-low transition-colors">
  Secondary
</button>

// Tertiary text-only
<button className="text-xs font-bold tracking-[0.05em] uppercase text-coral hover:text-coral-dark transition-colors">
  View Details →
</button>
```

---

### Typography

```tsx
// Display LG — hero headings
className="font-bold"
style={{ fontSize: 'clamp(3rem, 6.5vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}

// Headline MD — section titles
className="font-bold text-jet"
style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.03em' }}

// Title SM — card titles, sub-headers
className="text-base font-bold text-jet" style={{ letterSpacing: '-0.02em' }}

// Body LG — descriptions, detail text
className="text-base font-normal leading-relaxed text-ink"

// Label MD — tags, specs, micro-copy, table headers
className="text-[0.75rem] font-bold tracking-[0.05em] uppercase text-slate-brand"

// Gradient accent phrase (Apple-style)
const gradientText: React.CSSProperties = {
  background: 'linear-gradient(135deg, #ef8354 0%, #d47550 60%, #c05030 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};
// <span style={gradientText}>key phrase</span>
```

---

### Input Fields

```tsx
// Standard form input (login/signup panels)
className="w-full border border-ghost/40 rounded-lg px-4 py-3 text-sm text-jet outline-none focus:border-coral transition-colors bg-white placeholder:text-slate-brand/40"

// Apple-style gray box input (verification wizard, chat search, message compose)
className="w-full bg-surface-low rounded-xl px-4 py-3 text-sm text-jet outline-none transition-colors placeholder:text-slate-brand/40"
// focus: bg-[#e8e9ec] for wizard fields; border-coral focus ring for form fields
```

---

### Cards

```tsx
// Standard white card (dashboard stat, content card)
className="bg-white rounded-xl p-5"
style={{ boxShadow: '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)' }}

// Property card — lift on hover
className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
// onMouseEnter: boxShadow = '0 16px 48px rgba(0,0,0,0.12)'
// onMouseLeave: boxShadow = '0 2px 12px rgba(0,0,0,0.06)'

// Coral gradient stat card
style={{ background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)' }}

// Slate/dark gradient stat card
style={{ background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)', boxShadow: '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)' }}

// Dark card (hero sections, app download)
style={{ background: 'linear-gradient(145deg, #1a1c2e 0%, #0f1018 100%)', boxShadow: '0 8px 40px rgba(0,0,0,0.22)' }}
```

---

### Icon Containers (stat cards, feature lists)

```tsx
// Standard icon container — always bg-surface-low, never bg-coral/10
<div className="w-10 h-10 rounded-xl bg-surface-low flex items-center justify-center shrink-0">
  <Icon size={18} className="text-coral" />   {/* coral only if primary/active */}
  <Icon size={18} className="text-slate-brand" />  {/* slate for neutral/informational */}
</div>
```

**Rule:** `bg-coral/10` is only valid as an active/selected state indicator (e.g. active toggle button, selected tab). Never use it as a decorative icon background.

---

### Semantic Status Colors (keep as-is — do not replace)

These are intentional traffic-light semantics, not design violations:

| Usage | Classes |
|---|---|
| Verified / Paid / Active / Resolved badges | `bg-green-50 text-green-600` |
| Overdue / Warning badges (StatusBadge) | `bg-red-50 text-red-600` |
| Pending / In Progress badges | `bg-amber-50 text-amber-500` |
| Danger actions ("Delete Account") | `text-red-500` |
| Accept / Confirm action buttons | `bg-green-600` |
| Priority accent bars (maintenance) | `#ef4444` high / `#f59e0b` medium / `#22c55e` low |

These classes are **exempt from the coral-is-scarce and no-green rules**. Do not replace them.

---

### Shadow System

| Context | Value |
|---|---|
| White card (default) | `0 2px 12px rgba(0,0,0,0.06)` |
| White card (hover) | `0 16px 48px rgba(0,0,0,0.12)` |
| Dashboard white card | `0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)` |
| Coral gradient card | `0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)` |
| Slate gradient card | `0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)` |
| Dark card | `0 8px 40px rgba(0,0,0,0.22)` |
| Navbar | `0 4px 24px rgba(18,20,31,0.50), 0 1px 4px rgba(18,20,31,0.30)` |
| Sidebar | `6px 0 40px rgba(23,27,43,0.55), 2px 0 8px rgba(23,27,43,0.25)` |
| Active sidebar pill | `0 4px 12px rgba(180,80,40,0.35)` |

---

### Navigation Patterns

```tsx
// Navbar — glassmorphism, sticky
style={{ background: 'rgba(18,20,31,0.90)', boxShadow: '0 4px 24px rgba(18,20,31,0.50), 0 1px 4px rgba(18,20,31,0.30)' }}
className="backdrop-blur-xl sticky top-0 z-50"

// Sidebar background (both dashboards)
className="bg-slate-brand"
style={{ boxShadow: '6px 0 40px rgba(23,27,43,0.55), 2px 0 8px rgba(23,27,43,0.25)' }}

// Sidebar active item — coral gradient pill
className="flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-white font-semibold text-sm"
style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)', boxShadow: '0 4px 12px rgba(180,80,40,0.35)' }}

// Sidebar inactive item
className="text-white/60 hover:text-white hover:bg-white/[0.07] px-4 py-3 mx-2 rounded-xl text-sm font-medium transition-colors"
```

---

### Page / Section Backgrounds

| Layer | Class |
|---|---|
| App shell | `bg-surface-low` |
| Page content (alternating sections) | `bg-white` then `bg-surface-low` |
| Main content area | `bg-surface` |
| Card / panel | `bg-white` |
| Input / icon container | `bg-surface-low` |
| Dark hero | `bg-[#0a0a0f]` with coral ambient glow |

Sections alternate between `bg-white` and `bg-surface-low` — never add a border between them.

---

## Files Changed Summary

| File | Changes |
|---|---|
| `TenantLoginPage.tsx` | Input style |
| `ListingsPage.tsx` | FAB + chat panel gradient |
| `PropertyDetailPage.tsx` | RPZ badge, body text color, heading tracking |
| `LandlordDashboard.tsx` | RTB banner emoji + bg |
| `landlord/OverviewTab.tsx` | KPI icon bg |
| `landlord/TenantsTab.tsx` | Overdue row tint |
| `landlord/PaymentsTab.tsx` | Stat value colors |
| `landlord/MessagesTab.tsx` | Decorative icon color |
| `landlord/SettingsTab.tsx` | Badge color |
| `tenant/OverviewTab.tsx` | Card borders |
| `tenant/WishlistTab.tsx` | Card borders |
| `tenant/PaymentsTab.tsx` | Stat card icon |
| `tenant/MaintenanceTab.tsx` | Stat card icons, response bubble |
| `tenant/SettingsTab.tsx` | Button bg |
| `tenant/TenancyTab.tsx` | Button bg, lease badge |
| `shared/ChatInterface.tsx` | Purple-tinted surfaces (4 locations) |
