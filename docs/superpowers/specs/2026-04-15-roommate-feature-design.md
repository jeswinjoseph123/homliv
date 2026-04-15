# Roommate Feature — Design Spec
**Date:** 2026-04-15  
**Project:** HomLiv (`008`)  
**Status:** Approved — ready for implementation planning

---

## Overview

Add a **Roommate** user role to HomLiv — a third role alongside Tenant and Landlord. Roommates are existing tenants filling a spare room. They are NOT property owners. They get a simplified listing and dashboard experience.

**Scope:** Frontend only, mock data. No backend. Full auth context migration deferred until backend ships — at that point, swap `useRoommateStore` for a real `AuthContext` (same interface shape, drop-in replacement).

---

## Architecture

**State pattern:** Mirror `useVerificationStore` exactly. New `useRoommateStore` hook with two localStorage keys:
- `homliv_roommate_role` — user is in roommate mode
- `homliv_roommate_verified` — user completed verification

Hook interface (designed for clean AuthContext migration later):
```ts
{ isRoommate, setRoommate, isVerified, setVerified }
```

**Folder structure:**
```
src/
  hooks/
    useRoommateStore.ts           — new
  app/
    pages/
      RoommateSignupPage.tsx      — new (Phase 1)
      RoommateVerifyPage.tsx      — new (Phase 1)
      RoommateDashboard.tsx       — new (Phase 2)
      roommate/
        ListRoomPage.tsx          — new (Phase 2)
    components/
      roommate/
        RoommateSidebar.tsx       — new (Phase 2)
        OverviewTab.tsx           — new (Phase 2)
        MyListingsTab.tsx         — new (Phase 2)
        MessagesTab.tsx           — new (Phase 2)
        SettingsTab.tsx           — new (Phase 2)
      shared/
        ReportModal.tsx           — new (Phase 3)
```

---

## Role Comparison

| Feature | Tenant | Roommate | Landlord |
|---|---|---|---|
| Browse listings | ✅ | ✅ | ✅ |
| Post a listing | ❌ | ✅ (max 2) | ✅ |
| Listing types | — | Permanent / Temporary | Permanent only |
| Verification | Email only | Email + phone OTP | Full ID + doc upload |
| Badge on listing | — | Amber "Roommate listing" | Green "Verified landlord" |
| Sidebar: Tenants | — | ❌ | ✅ |
| Sidebar: Maintenance | — | ❌ | ✅ |
| Sidebar: Messages | — | ✅ (direct only) | ✅ |
| Sidebar: My Listings | — | ✅ | ✅ |
| Report user button | ✅ | — | — |

---

## Phase 1 — Auth + Verification

### Types (`src/types/index.ts`)

New optional fields on `Property` (existing 14 properties satisfy without changes):

```ts
postedBy?: 'landlord' | 'roommate'       // absence = 'landlord'
roommateVerified?: boolean               // absence = false
listingType?: 'permanent' | 'temporary'  // absence = 'permanent'
availableFrom?: string                   // ISO date string
availableUntil?: string | null           // null = permanent
```

New `Report` interface:

```ts
export interface Report {
  id: string
  listingId: string
  reportedBy: string
  reason: string
  timestamp: string
}
```

### Mock Data (`src/data/mockProperties.ts`)

Two new roommate properties appended:

**`r1`** — Double room, Ranelagh, €750, temporary (available until ~3 months from now), `postedBy: 'roommate'`, `roommateVerified: false`  
**`r2`** — Single room, South Circular Road D8, €620, permanent, `postedBy: 'roommate'`, `roommateVerified: false`

`mockReports: Report[]` exported, starts empty.

### `useRoommateStore` (`src/hooks/useRoommateStore.ts`)

```ts
export function useRoommateStore() {
  // isRoommate — localStorage 'homliv_roommate_role'
  // isVerified — localStorage 'homliv_roommate_verified'
  return { isRoommate, setRoommate, isVerified, setVerified }
}
```

### `/roommate` — `RoommateSignupPage.tsx`

50/50 split layout, identical structure to `LandlordSignupPage`.

**Left panel:**
- Background image: `photo-1529408686214-b48b8532f72c` at 18% opacity
- Headline: "List your spare room. Find your next housemate."
- 3 feature items: "No ownership required" / "Verified housemate network" / "Direct messaging with enquirers"
- Bottom badge: "Roommate Portal"

**Right panel:**
- Sign In / Sign Up tabs (same tab switcher pattern)
- "Create Account" → `setRoommate(true)` → navigate `/roommate/verify`
- "Sign In" → navigate `/roommate/dashboard`

**`LandlordSignupPage` change:** Prominent amber-tinted CTA row above copyright line:
```
[🏠 icon]  Looking to rent a spare room?
           You don't need to own the property.
           [Roommate Portal →]  (links to /roommate)
```
Amber tinted box (`#fef3e2` bg), `#9c5a00` text, coral gradient button. Highly visible — not a footnote.

### `/roommate/verify` — `RoommateVerifyPage.tsx`

Standalone page (no sidebar, no Navbar — isolated like a signup flow).

2-step coral progress bar (same style as `LandlordVerifyPage`).

**Step 1 — Email confirmation:**
- Read-only email display (greyed)
- "Send confirmation code" coral button → immediately reveals 6-digit input (auto-advance, no magic code)
- Any 6 digits → Step 2
- Helper text: "We use this to confirm you are a real person. Your details are never shared with tenants."

**Step 2 — Phone verification:**
- `+353` prefixed phone input
- "Send SMS code" → immediately reveals 6-digit input
- Any 6 digits → completion screen
- Info banner: "Your listing will show an 'Unverified roommate' badge until our team reviews it."

**Completion screen:**
- Amber checkmark icon (NOT green — distinct from full landlord verification)
- Heading: "You're almost verified"
- Body: "Your account is active. Your listings will show a roommate badge. Full verification usually completes within 2 hours."
- Primary button: "Set up my listing →" → `/roommate/list-room`
- Secondary link: "Do it later" → `setVerified(false)` → `/roommate/dashboard`

### Routes (`src/app/routes.tsx`)

```
/roommate              → RoommateSignupPage
/roommate/verify       → RoommateVerifyPage
/roommate/dashboard    → RoommateDashboard     (stub → Phase 2)
/roommate/listings     → RoommateListings      (stub → Phase 2)
/roommate/list-room    → ListRoomPage          (stub → Phase 2)
```

Phase 2 stub routes redirect to `/roommate` (signup page) until implemented — avoids circular redirect since the dashboard is also Phase 2.

---

## Phase 2 — Dashboard + Listing Wizard

### `RoommateDashboard.tsx` (`src/app/pages/`)

Thin shell — exact same structure as `LandlordDashboard.tsx`. Owns state: `activeTab`, `sidebarOpen`. Reads `isVerified` from `useRoommateStore`.

### `RoommateSidebar` (`src/app/components/roommate/RoommateSidebar.tsx`)

Same visual as `LandlordSidebar`: `bg-slate-brand`, coral active pill, right-side depth shadow.

Nav items (4 only):
```
Overview · My Listings · Messages · Settings
```

Header: avatar initials + name + "Roommate Account" label + amber badge ("Listing active" or "No active listing").

### Tab Components (`src/app/components/roommate/`)

**`OverviewTab.tsx`**
- Greeting: "Welcome back, [name]"
- Amber info banner (dismissible, `homliv_roommate_banner_dismissed`):
  > "Your listings are shown with a Roommate badge. Tenants are advised this listing is not from a property owner."
- 3 stat cards (same card pattern as landlord dashboard):
  - "My Listings" — count + "View listing" link
  - "Active Enquiries" — unread chat count
  - "Listing expires" — date or "Permanent" + amber badge if within 7 days
- No RTB banner

**`MyListingsTab.tsx`**
- "Add room" button top-right → `/roommate/list-room`
- Disabled if 2 active listings (tooltip: "Maximum 2 listings")
- Each card shows listing details + expiry management inline
- Expiry management per card:
  - "Extend end date" → inline date picker (min: +1 day, max: +12 months)
  - Save updates `availableUntil` in mock state
  - Success message inline
- Expired listing: `opacity-50`, "Listing expired on [date]" overlay, "Renew" (coral) + "Delete" (ghost danger)
- 3-day warning banner at page top: amber, "Your listing expires in X days. [Extend now →]"

**`MessagesTab.tsx`**
- Reuses `ChatInterface` directly
- Direct messages only — no group chat

**`SettingsTab.tsx`**
- Reuses tenant settings pattern (profile, notifications, security sections)
- Dev Tools card: shows verification status + toggle button (same as landlord SettingsTab)

### `ListRoomPage.tsx` (`src/app/pages/roommate/`)

3-step wizard, same step card pattern as `LandlordVerifyPage` (white card, soft shadow, coral progress bar).

**Step 1 — Room details:**

Listing type selector at top (2 cards):
- "Permanent" — room available indefinitely
- "Temporary" — available for a limited period
- Selected state: `border-l-4 border-l-coral` + `bg-coral/5` tint (valid as selected state per design rules)

If "Temporary" selected, reveal date range inputs below:
- "Available from" + "Available until" (DD/MM/YYYY Irish format)
- Warning text: "After [end date], this listing will be automatically hidden from search results."

Remaining fields: same as `ListPropertyModal.tsx` Step 1 (title, type, location, eircode, price, description, house rules).

**Step 2 — Photos + features:**
Identical to `ListPropertyModal.tsx` Step 2.

**Step 3 — Review + publish:**
- Listing summary at top: type, available from, available until (or "No end date")
- If temporary: amber warning box about auto-hide on end date + extension note
- "Publish listing" → push to mock array with roommate fields → navigate `/roommate/listings`

New property object shape:
```ts
{
  ...formData,
  id: `r${Date.now()}`,
  postedBy: 'roommate',
  roommateVerified: false,
  listingType: 'permanent' | 'temporary',
  availableFrom: string,
  availableUntil: string | null,
}
```

---

## Phase 3 — Shared Component Changes

### `PropertyCard` badges (`src/app/components/shared/PropertyCard.tsx`)

Added to existing top-left badge stack:

```tsx
// Roommate badge — amber
{property.postedBy === 'roommate' && (
  <div style={{ background: '#fef3e2', color: '#9c5a00' }}
       className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">
    Roommate listing
  </div>
)}
```

Bottom-left of image, temporary listing badge:
```tsx
{property.listingType === 'temporary' && property.availableUntil && (
  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold"
       style={{ background: '#e8edf4', color: '#2c4a7c' }}>
    Until {formattedDate}
  </div>
)}
```

### Listings page filter (`src/app/pages/ListingsPage.tsx`)

```tsx
const activeListings = mockProperties.filter(l => {
  if (l.listingType === 'temporary' && l.availableUntil) {
    return new Date(l.availableUntil) > new Date()
  }
  return true
})
```

### `PropertyDetailPage` roommate card (`src/app/pages/PropertyDetailPage.tsx`)

If `property.postedBy === 'roommate'`, replace landlord preview card in right sticky panel with:

- Card bg: `#fef3e2`, no border, `border-ghost/15` ghost border
- Avatar initials + name + "Roommate" label + "⚠ Unverified listing" amber text
- Body: "This room is listed by a current tenant, not the property owner."
- Buttons: "Chat with roommate" (secondary style) + "Report this listing" (ghost, `#b91c1c` on hover)

If temporary: availability strip above the card (`#e8edf4` bg):
```
⏳  Available [from] → [until]  ·  X days remaining
```

### `ReportModal` (`src/app/components/shared/ReportModal.tsx`)

Props: `{ open, onClose, listingId }`.

Contents:
- 4 radio options: "Scam or fraud" / "Misleading listing" / "Inappropriate content" / "Other"
- Optional textarea placeholder "Tell us more (optional)..."
- "Cancel" (ghost) + "Submit report" (coral gradient)
- On submit: push to `mockReports` + `toast.success("Report submitted. Our team will review this listing.")`

Used in:
- `PropertyDetailPage` — "Report this listing" button
- `ChatInterface` — "⚑ Report user" link in chat top-bar, visible only when `sender === 'roommate'`

---

## Design Rules Applied

All new components follow existing HomLiv design system:
- No `bg-coral` for decorative fills — amber (`#fef3e2` / `#9c5a00`) used for roommate-specific states
- No Tailwind shadow presets — explicit `boxShadow` values only
- No section borders — background colour shifts only
- Coral used only for CTAs and active/selected states
- `bg-coral/5` on listing type selector cards is valid as a selected state indicator
- Ghost border (`border border-[#dcc1b7]/15`) only on form containers and modal wrappers
- All new inputs use the gray rounded box style: `bg-[#f0f1f3] rounded-xl px-4 py-3`

---

## Future Migration Path (Approach 3)

When backend ships:
1. Build `AuthContext` with `{ role, isVerified, login, logout }` — same shape as `useRoommateStore` + `useVerificationStore` combined
2. Replace both hooks with `useAuth()` calls in consuming components
3. Replace localStorage with real JWT/session state
4. Add `ProtectedRoute` wrapper around `/roommate/*` and `/dashboard` routes

No component logic changes needed — only the data source swaps.

---

## Implementation Order

**Phase 1:**
1. `src/types/index.ts` — add new fields + `Report` interface
2. `src/data/mockProperties.ts` — add `r1`, `r2` properties + `mockReports`
3. `src/hooks/useRoommateStore.ts` — new hook
4. `src/app/pages/RoommateSignupPage.tsx` — new page
5. `src/app/pages/LandlordSignupPage.tsx` — add roommate CTA row
6. `src/app/pages/RoommateVerifyPage.tsx` — new page
7. `src/app/routes.tsx` — add new routes

**Phase 2:**
8. `src/app/components/roommate/RoommateSidebar.tsx`
9. `src/app/components/roommate/OverviewTab.tsx`
10. `src/app/components/roommate/MyListingsTab.tsx`
11. `src/app/components/roommate/MessagesTab.tsx`
12. `src/app/components/roommate/SettingsTab.tsx`
13. `src/app/pages/RoommateDashboard.tsx`
14. `src/app/pages/roommate/ListRoomPage.tsx`

**Phase 3:**
15. `src/app/components/shared/ReportModal.tsx`
16. `src/app/components/shared/PropertyCard.tsx` — add roommate + temporary badges
17. `src/app/pages/ListingsPage.tsx` — add expiry filter
18. `src/app/pages/PropertyDetailPage.tsx` — roommate card + report trigger
19. `src/app/components/shared/ChatInterface.tsx` — report user link
