# Apple Design Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply Apple-inspired premium design consistently across every page and component — fix all spec violations and remove purple-tinted surfaces.

**Architecture:** Surgical edits only. No new components, no new files. Each task is a batch of related changes to files in the same section. Verify with `npm run typecheck && npm run lint` after each task.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v4, Vite, lucide-react

---

## Files Modified

| File | Change |
|---|---|
| `src/app/pages/TenantLoginPage.tsx` | Input style: underline → rounded bordered |
| `src/app/pages/ListingsPage.tsx` | FAB + chat panel: flat coral → gradient |
| `src/app/pages/PropertyDetailPage.tsx` | RPZ badge color, body text color, heading tracking |
| `src/app/pages/LandlordDashboard.tsx` | RTB banner: emoji → icon, bg tint |
| `src/app/components/landlord/OverviewTab.tsx` | KPI icon bg: decorative coral → surface-low |
| `src/app/components/landlord/TenantsTab.tsx` | Remove overdue row red tint |
| `src/app/components/landlord/PaymentsTab.tsx` | Stat value colors → brand tokens |
| `src/app/components/landlord/MessagesTab.tsx` | Decorative icon color: coral → slate-brand |
| `src/app/components/landlord/SettingsTab.tsx` | Badge: coral → surface-low/slate-brand |
| `src/app/components/tenant/OverviewTab.tsx` | Remove card borders |
| `src/app/components/tenant/WishlistTab.tsx` | Remove card borders |
| `src/app/components/tenant/PaymentsTab.tsx` | Stat card icon: green → surface-low/slate-brand |
| `src/app/components/tenant/MaintenanceTab.tsx` | Stat icons, response bubble purple tint |
| `src/app/components/tenant/SettingsTab.tsx` | Button bg purple tint → white |
| `src/app/components/tenant/TenancyTab.tsx` | Button bg purple tint → white, lease badge |
| `src/app/components/shared/ChatInterface.tsx` | 4× purple-tinted surfaces, decorative coral icon |

---

## Task 1: Public Pages

**Files:**
- Modify: `src/app/pages/TenantLoginPage.tsx`
- Modify: `src/app/pages/ListingsPage.tsx`
- Modify: `src/app/pages/PropertyDetailPage.tsx`

### TenantLoginPage — inputs

- [ ] **Step 1: Replace underline inputs with rounded bordered inputs**

In `src/app/pages/TenantLoginPage.tsx`, find every input with class `border-0 border-b border-ghost/30 rounded-none bg-transparent px-0 py-2` and replace with:

```tsx
// Old (3 inputs: Full Name, Email, Password)
className="w-full border-0 border-b border-ghost/30 rounded-none bg-transparent px-0 py-2 text-sm text-jet outline-none focus:border-coral transition-colors placeholder:text-slate-brand/40"

// New
className="w-full border border-ghost/40 rounded-lg px-4 py-3 text-sm text-jet outline-none focus:border-coral transition-colors bg-white placeholder:text-slate-brand/40"
```

There are 3 inputs (Full Name on create tab, Email, Password). Apply to all three.

### ListingsPage — flat coral → gradient

- [ ] **Step 2: Fix Concierge Chat FAB and panel header**

In `src/app/pages/ListingsPage.tsx`:

Find the FAB button (line ~321):
```tsx
// Old
className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-full text-white text-sm font-semibold z-40 bg-coral shadow-[0_4px_20px_rgba(239,131,84,0.4)]"

// New
className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-full text-white text-sm font-semibold z-40 transition-opacity hover:opacity-90"
style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)', boxShadow: '0 4px 20px rgba(180,80,40,0.40)' }}
```

Find the chat panel header (line ~333):
```tsx
// Old
<div className="px-4 py-3 flex items-center justify-between bg-coral">

// New
<div className="px-4 py-3 flex items-center justify-between" style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}>
```

### PropertyDetailPage — RPZ badge, body text, heading tracking

- [ ] **Step 3: Fix RPZ badge color**

In `src/app/pages/PropertyDetailPage.tsx`, find the RPZ badge inside the gallery (line ~85):
```tsx
// Old
<div className="absolute top-4 left-4 px-2 py-0.5 text-xs font-bold tracking-widest uppercase text-white rounded bg-red-600">

// New
<div className="absolute top-4 left-4 px-2 py-0.5 text-xs font-bold tracking-widest uppercase text-white rounded bg-coral">
```

- [ ] **Step 4: Fix description body text color**

Find "The Space" description paragraph (line ~126):
```tsx
// Old
<p className="text-base leading-relaxed text-slate-brand" style={{ lineHeight: 1.7 }}>

// New
<p className="text-base leading-relaxed text-ink" style={{ lineHeight: 1.7 }}>
```

- [ ] **Step 5: Fix section heading tracking**

There are 3 `h2` headings ("The Space", "Amenities", "Location") all with `letterSpacing: '-0.01em'`. Change all to `-0.02em`:
```tsx
// Old (×3)
style={{ letterSpacing: '-0.01em' }}

// New (×3)
style={{ letterSpacing: '-0.02em' }}
```

- [ ] **Step 6: Verify and commit**

```bash
cd "/Users/jesvinjoseph/Desktop/Claude Ai/008"
npm run typecheck && npm run lint
git add src/app/pages/TenantLoginPage.tsx src/app/pages/ListingsPage.tsx src/app/pages/PropertyDetailPage.tsx
git commit -m "style: fix public page Apple design violations"
```

Expected: typecheck and lint pass with no new errors.

---

## Task 2: Dashboard Shell

**Files:**
- Modify: `src/app/pages/LandlordDashboard.tsx`

- [ ] **Step 1: Add Info import and fix RTB banner**

In `src/app/pages/LandlordDashboard.tsx`, add `Info` to the lucide-react import:
```tsx
// Old
import { X, ShieldAlert } from 'lucide-react';

// New
import { X, ShieldAlert, Info } from 'lucide-react';
```

Find the RTB banner block (line ~68):
```tsx
// Old
<div className="flex items-start gap-3 p-4 rounded-xl bg-surface border-l-4 border-coral mb-5">
  <span className="text-coral shrink-0 mt-0.5">ℹ️</span>

// New
<div className="flex items-start gap-3 p-4 rounded-xl mb-5" style={{ background: 'rgba(239,131,84,0.05)', borderLeft: '4px solid #ef8354' }}>
  <Info size={16} className="text-coral shrink-0 mt-0.5" />
```

- [ ] **Step 2: Verify and commit**

```bash
npm run typecheck && npm run lint
git add src/app/pages/LandlordDashboard.tsx
git commit -m "style: fix RTB banner — replace emoji with icon, warm bg tint"
```

---

## Task 3: Landlord Dashboard Tabs

**Files:**
- Modify: `src/app/components/landlord/OverviewTab.tsx`
- Modify: `src/app/components/landlord/TenantsTab.tsx`
- Modify: `src/app/components/landlord/PaymentsTab.tsx`
- Modify: `src/app/components/landlord/MessagesTab.tsx`
- Modify: `src/app/components/landlord/SettingsTab.tsx`

### OverviewTab — KPI icon bg

- [ ] **Step 1: Remove decorative coral from KPI icon backgrounds**

In `src/app/components/landlord/OverviewTab.tsx`, find the KPI icon div (line ~61):
```tsx
// Old
<div className="w-10 h-10 rounded-lg flex items-center justify-center bg-coral/10 text-coral mb-3">

// New
<div className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface-low text-coral mb-3">
```

### TenantsTab — remove overdue row tint

- [ ] **Step 2: Remove bg-red-50 from overdue rows**

In `src/app/components/landlord/TenantsTab.tsx`, find the overdue row (line ~21):
```tsx
// Old
<tr key={t.id} className={`border-b border-ghost/10 ${t.status === 'overdue' ? 'bg-red-50' : ''}`}>

// New
<tr key={t.id} className="border-b border-ghost/10">
```

### PaymentsTab — stat value colors

- [ ] **Step 3: Replace external color tokens on stat values**

In `src/app/components/landlord/PaymentsTab.tsx`, the `PAYMENT_STATS` array (line ~4):
```tsx
// Old
const PAYMENT_STATS = [
  { label: 'Collected This Month', value: '€2,700', cls: 'text-green-600' },
  { label: 'Pending',              value: '€750',   cls: 'text-amber-500' },
  { label: 'Overdue',              value: '€950',   cls: 'text-red-600' },
];

// New
const PAYMENT_STATS = [
  { label: 'Collected This Month', value: '€2,700', cls: 'text-jet' },
  { label: 'Pending',              value: '€750',   cls: 'text-coral' },
  { label: 'Overdue',              value: '€950',   cls: 'text-coral' },
];
```

### MessagesTab — decorative icon

- [ ] **Step 4: Change decorative coral icon to slate-brand**

In `src/app/components/landlord/MessagesTab.tsx` (line ~7):
```tsx
// Old
<MessageSquare size={40} className="text-coral" />

// New
<MessageSquare size={40} className="text-slate-brand" />
```

### SettingsTab — badge color

- [ ] **Step 5: Fix Premium Landlord badge**

In `src/app/components/landlord/SettingsTab.tsx` (line ~18):
```tsx
// Old
<span className="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block bg-coral/10 text-coral">
  Premium Landlord
</span>

// New
<span className="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block bg-surface-low text-slate-brand">
  Premium Landlord
</span>
```

- [ ] **Step 6: Verify and commit**

```bash
npm run typecheck && npm run lint
git add \
  src/app/components/landlord/OverviewTab.tsx \
  src/app/components/landlord/TenantsTab.tsx \
  src/app/components/landlord/PaymentsTab.tsx \
  src/app/components/landlord/MessagesTab.tsx \
  src/app/components/landlord/SettingsTab.tsx
git commit -m "style: fix landlord tab Apple design violations"
```

---

## Task 4: Tenant Dashboard Tabs

**Files:**
- Modify: `src/app/components/tenant/OverviewTab.tsx`
- Modify: `src/app/components/tenant/WishlistTab.tsx`
- Modify: `src/app/components/tenant/PaymentsTab.tsx`
- Modify: `src/app/components/tenant/MaintenanceTab.tsx`
- Modify: `src/app/components/tenant/SettingsTab.tsx`
- Modify: `src/app/components/tenant/TenancyTab.tsx`

### OverviewTab — remove card borders

- [ ] **Step 1: Remove border from Upcoming Viewings card wrapper**

In `src/app/components/tenant/OverviewTab.tsx`, find the Upcoming Viewings inner wrapper (line ~165):
```tsx
// Old
<div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(220,193,183,0.18)' }}>

// New
<div className="rounded-xl overflow-hidden">
```

- [ ] **Step 2: Remove borders from Saved Properties mini-cards**

Find the mini-card Link elements in the saved properties row (line ~231):
```tsx
// Old
className="shrink-0 w-40 rounded-xl overflow-hidden bg-surface-low cursor-pointer hover:opacity-90 transition-opacity"
style={{ border: '1px solid rgba(220,193,183,0.18)' }}

// New
className="shrink-0 w-40 rounded-xl overflow-hidden bg-surface-low cursor-pointer hover:opacity-90 transition-opacity"
```
Remove the `style` prop entirely from that element.

### WishlistTab — remove card borders

- [ ] **Step 3: Remove border from wishlist property cards**

In `src/app/components/tenant/WishlistTab.tsx`, find the card div (line ~60):
```tsx
// Old
className="bg-white rounded-2xl overflow-hidden group"
style={{ border: '1px solid rgba(220,193,183,0.18)', boxShadow: '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)' }}

// New
className="bg-white rounded-2xl overflow-hidden group"
style={{ boxShadow: '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)' }}
```

### PaymentsTab — stat card icon

- [ ] **Step 4: Fix "Total paid" stat card icon**

In `src/app/components/tenant/PaymentsTab.tsx`, find the first stat card (line ~36):
```tsx
// Old
<div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
  <TrendingUp size={15} className="text-green-600" />
</div>

// New
<div className="w-8 h-8 rounded-lg bg-surface-low flex items-center justify-center">
  <TrendingUp size={15} className="text-slate-brand" />
</div>
```

### MaintenanceTab — stat icons + response bubble

- [ ] **Step 5: Fix Open stat card icon**

In `src/app/components/tenant/MaintenanceTab.tsx`, find the "Open" stat card (line ~34):
```tsx
// Old
<div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
  <AlertTriangle size={15} className="text-red-500" />
</div>

// New
<div className="w-8 h-8 rounded-lg bg-surface-low flex items-center justify-center">
  <AlertTriangle size={15} className="text-coral" />
</div>
```

- [ ] **Step 6: Fix Resolved stat card icon**

Find the "Resolved" stat card (line ~63):
```tsx
// Old
<div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
  <CheckCircle size={15} className="text-green-600" />
</div>

// New
<div className="w-8 h-8 rounded-lg bg-surface-low flex items-center justify-center">
  <CheckCircle size={15} className="text-slate-brand" />
</div>
```

- [ ] **Step 7: Fix ticket response bubble — remove purple tint**

Find the response bubble div (line ~122):
```tsx
// Old
<div className="mt-3 flex items-start gap-2.5 rounded-xl px-3 py-2.5"
     style={{ background: 'rgba(243,242,255,0.80)', border: '1px solid rgba(220,193,183,0.18)' }}>

// New
<div className="mt-3 flex items-start gap-2.5 rounded-xl px-3 py-2.5 bg-surface-low">
```

### SettingsTab — button bg purple tint

- [ ] **Step 8: Fix Change Photo button background**

In `src/app/components/tenant/SettingsTab.tsx`, find the "Change Photo" button (line ~33):
```tsx
// Old
style={{ border: '1px solid rgba(220,193,183,0.40)', background: 'rgba(250,248,255,0.8)' }}

// New
style={{ border: '1px solid rgba(220,193,183,0.40)' }}
```
Add `className="... bg-white"` to the button or just remove the purple background from style. The button already has a `className` — add `bg-white` there:
```tsx
className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-jet transition-colors hover:bg-surface-low shrink-0 bg-white"
style={{ border: '1px solid rgba(220,193,183,0.40)' }}
```

### TenancyTab — button bg + lease badge

- [ ] **Step 9: Fix action button backgrounds**

In `src/app/components/tenant/TenancyTab.tsx`, find the action buttons map (line ~95). Each button has:
```tsx
// Old
style={{ border: '1px solid rgba(220,193,183,0.40)', background: 'rgba(250,248,255,0.8)' }}

// New
style={{ border: '1px solid rgba(220,193,183,0.40)' }}
```
And add `bg-white` to `className`:
```tsx
className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-jet transition-colors hover:bg-surface-low bg-white"
```

- [ ] **Step 10: Fix Active Lease overlay badge**

Find the "Active Lease" badge in the property hero (line ~27):
```tsx
// Old
<span className="absolute top-4 right-4 text-xs font-bold uppercase tracking-[0.06em] px-3 py-1.5 rounded-full bg-green-500/90 text-white">

// New
<span className="absolute top-4 right-4 text-xs font-bold uppercase tracking-[0.06em] px-3 py-1.5 rounded-full bg-coral/90 text-white">
```

- [ ] **Step 11: Verify and commit**

```bash
npm run typecheck && npm run lint
git add \
  src/app/components/tenant/OverviewTab.tsx \
  src/app/components/tenant/WishlistTab.tsx \
  src/app/components/tenant/PaymentsTab.tsx \
  src/app/components/tenant/MaintenanceTab.tsx \
  src/app/components/tenant/SettingsTab.tsx \
  src/app/components/tenant/TenancyTab.tsx
git commit -m "style: fix tenant tab Apple design violations"
```

---

## Task 5: ChatInterface

**Files:**
- Modify: `src/app/components/shared/ChatInterface.tsx`

- [ ] **Step 1: Fix search input purple tint**

In `src/app/components/shared/ChatInterface.tsx`, find the search input (line ~291):
```tsx
// Old
style={{ background: '#f3f2ff' }}

// New
style={{ background: '#f5f5f7' }}
```

- [ ] **Step 2: Fix conversation hover state purple tint**

Find the `onMouseEnter` handler on conversation rows (line ~311):
```tsx
// Old
onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#faf8ff'; }}

// New
onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#fafafa'; }}
```

- [ ] **Step 3: Fix SuggestViewingPanel time slot inactive background**

Find the time slot button inactive style (line ~159):
```tsx
// Old
: { background: 'rgba(243,242,255,1)', color: '#4f5d75' }

// New
: { background: '#f5f5f7', color: '#4f5d75' }
```

- [ ] **Step 4: Fix chat message input purple tint**

Find the message input field (line ~476):
```tsx
// Old
style={{ background: '#f3f2ff', border: '1px solid transparent' }}

// New
style={{ background: '#f5f5f7', border: '1px solid transparent' }}
```

- [ ] **Step 5: Fix ViewingRequestCard calendar icon background**

Find the ViewingRequestCard icon div (line ~49):
```tsx
// Old
<div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">

// New
<div className="w-10 h-10 rounded-xl bg-surface-low flex items-center justify-center shrink-0">
```

- [ ] **Step 6: Verify and commit**

```bash
npm run typecheck && npm run lint
git add src/app/components/shared/ChatInterface.tsx
git commit -m "style: remove purple-tinted surfaces from ChatInterface"
```

---

## Task 6: Final Verification

- [ ] **Step 1: Full build check**

```bash
cd "/Users/jesvinjoseph/Desktop/Claude Ai/008"
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 2: Start dev server and spot-check**

```bash
npm run dev
```

Manually visit each route and confirm:
- `/` — HomePage unchanged
- `/listings` — FAB uses gradient, no flat coral
- `/property/1` — RPZ badge coral, body text darker, headings tighter tracking
- `/login` — Inputs have rounded borders
- `/landlord` — Landlord signup unchanged
- `/dashboard` — RTB banner has Info icon, no emoji
- `/tenant-dashboard` — All tabs, no card borders, no purple tints
- `/chat/c1` — Chat inputs use `#f5f5f7`

- [ ] **Step 3: Final commit if any stragglers**

```bash
git add -p   # review any remaining changes
git commit -m "style: final Apple design polish cleanup"
```
