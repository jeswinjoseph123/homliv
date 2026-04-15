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
