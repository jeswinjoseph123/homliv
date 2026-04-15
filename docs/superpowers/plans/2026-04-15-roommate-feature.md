# Roommate Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Roommate third-role to HomLiv — auth page, 2-step verification wizard, dashboard with 4 tabs, list-room wizard, and shared component updates for roommate listing badges and report flow.

**Architecture:** Mirror the existing landlord pattern exactly. `useRoommateStore` (localStorage) replaces `AuthContext` until the backend ships. New pages/components live under `src/app/pages/` and `src/app/components/roommate/`. Shared components (PropertyCard, PropertyDetailPage, ChatInterface) get minimal conditional additions in Phase 3.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, react-router v7, sonner (toasts), lucide-react (icons). No test framework — verification is `npm run typecheck` + `npm run lint` + visual browser check.

**Spec:** `docs/superpowers/specs/2026-04-15-roommate-feature-design.md`

---

## PHASE 1 — Auth + Verification

---

### Task 1: Extend types

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Add new optional fields to `Property` and add `Report` interface**

Open `src/types/index.ts` and replace the entire file with:

```ts
export interface Landlord {
  name: string;
  verified: boolean;
  avatar: string;
}

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
  // Roommate fields — optional so existing 14 properties need no changes
  postedBy?: 'landlord' | 'roommate';
  roommateVerified?: boolean;
  listingType?: 'permanent' | 'temporary';
  availableFrom?: string;       // ISO date string
  availableUntil?: string | null; // null = permanent
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

export interface Report {
  id: string;
  listingId: string;
  reportedBy: string;
  reason: string;
  timestamp: string;
}
```

- [ ] **Step 2: Verify types compile**

```bash
cd "/Users/jesvinjoseph/Desktop/Claude Ai/008" && npm run typecheck
```

Expected: no errors (existing `satisfies Property[]` in mockProperties.ts still passes — new fields are optional).

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add roommate + report types to Property interface"
```

---

### Task 2: Add roommate mock data

**Files:**
- Modify: `src/data/mockProperties.ts`

- [ ] **Step 1: Add import for Report type and two roommate properties**

At the top of `src/data/mockProperties.ts`, change the import line:

```ts
import type { Property, Tenant, MaintenanceTicket, Report } from '@/types';
```

- [ ] **Step 2: Append two roommate properties after property id `'14'`**

After the closing `] satisfies Property[];` of the `mockProperties` array, add a standalone `mockRoommateProperties` that gets spread in. Actually, simpler: just append to the existing array. Replace `] satisfies Property[];` with:

```ts
  {
    id: 'r1',
    title: 'Double room in shared 3-bed, Ranelagh',
    type: 'Double Room',
    location: 'Mountpleasant Ave, Ranelagh, Dublin 6',
    eircode: 'D06 F2X1',
    price: 750,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1657639754502-3c138cb24b4c?w=800',
    ],
    amenities: ['WiFi', 'Bills Inc.', 'Washing Machine'],
    bedrooms: 1,
    bathrooms: 1,
    area: 20,
    available: true,
    wishlistCount: 4,
    isRPZ: true,
    landlord: { name: 'Ciarán Murphy', verified: false, avatar: 'https://i.pravatar.cc/150?img=60' },
    description: 'One double room available in a friendly 3-bed apartment. Current tenant going abroad temporarily. Bills included. Non-smokers only.',
    houseRules: ['Non-smokers only', 'Bills included', 'No pets'],
    transport: ['Ranelagh Luas — 5 min walk', 'City centre bus — 10 min'],
    postedBy: 'roommate',
    roommateVerified: false,
    listingType: 'temporary',
    availableFrom: '2026-04-20',
    availableUntil: '2026-07-31',
  },
  {
    id: 'r2',
    title: 'Single room — housemate moved out',
    type: 'Single Room',
    location: 'South Circular Road, Dublin 8',
    eircode: 'D08 HK22',
    price: 620,
    images: [
      'https://images.unsplash.com/photo-1738748444676-113d30c9a25b?w=800',
      'https://images.unsplash.com/photo-1768487422639-7ba3900d0f02?w=800',
    ],
    amenities: ['WiFi', 'Garden', 'Parking'],
    bedrooms: 1,
    bathrooms: 1,
    area: 16,
    available: true,
    wishlistCount: 11,
    isRPZ: true,
    landlord: { name: 'Aoife Brennan', verified: false, avatar: 'https://i.pravatar.cc/150?img=32' },
    description: 'Room available in a 4-bed house. One housemate moved back to Cork. Looking for working professional or postgrad student.',
    houseRules: ['Professionals preferred', 'No smoking', 'Quiet household'],
    transport: ['South Circular Road bus — 2 min walk', 'Portobello — 8 min walk'],
    postedBy: 'roommate',
    roommateVerified: false,
    listingType: 'permanent',
    availableFrom: '2026-04-15',
    availableUntil: null,
  },
] satisfies Property[];
```

- [ ] **Step 3: Add mockReports export at the bottom of the file**

After the existing `mockTickets` export, append:

```ts
export const mockReports: Report[] = [];
```

- [ ] **Step 4: Verify**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/mockProperties.ts
git commit -m "feat: add roommate mock listings (r1, r2) and mockReports array"
```

---

### Task 3: Create `useRoommateStore`

**Files:**
- Create: `src/hooks/useRoommateStore.ts`

- [ ] **Step 1: Create the hook**

```ts
import { useState, useEffect } from 'react';

const ROLE_KEY = 'homliv_roommate_role';
const VERIFIED_KEY = 'homliv_roommate_verified';

export function useRoommateStore() {
  const [isRoommate, setIsRoommateState] = useState<boolean>(() => {
    return localStorage.getItem(ROLE_KEY) === 'true';
  });

  const [isVerified, setIsVerifiedState] = useState<boolean>(() => {
    return localStorage.getItem(VERIFIED_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(ROLE_KEY, String(isRoommate));
  }, [isRoommate]);

  useEffect(() => {
    localStorage.setItem(VERIFIED_KEY, String(isVerified));
  }, [isVerified]);

  function setRoommate(value: boolean) {
    setIsRoommateState(value);
  }

  function setVerified(value: boolean) {
    setIsVerifiedState(value);
  }

  return { isRoommate, setRoommate, isVerified, setVerified };
}
```

- [ ] **Step 2: Verify**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useRoommateStore.ts
git commit -m "feat: add useRoommateStore hook (localStorage, mirrors useVerificationStore)"
```

---

### Task 4: Create `RoommateSignupPage`

**Files:**
- Create: `src/app/pages/RoommateSignupPage.tsx`

- [ ] **Step 1: Create the page**

```tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Home, MessageSquare, UserCheck } from 'lucide-react';
import { LogoMark } from '../components/shared/LogoMark';
import { useRoommateStore } from '../../hooks/useRoommateStore';

const BG_IMAGE = 'https://images.unsplash.com/photo-1529408686214-b48b8532f72c?w=1200&q=80';

export function RoommateSignupPage() {
  const navigate = useNavigate();
  const { setRoommate } = useRoommateStore();
  const [activeTab, setActiveTab] = useState<'signin' | 'create'>('signin');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel */}
      <div
        className="relative flex flex-col justify-between p-8 lg:p-12 bg-jet"
        style={{ flex: '0 0 50%', minHeight: '40vh' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${BG_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18,
          }}
        />
        <div className="relative z-10 flex flex-col h-full justify-between">
          <Link to="/" className="flex items-center gap-2">
            <LogoMark size={26} className="text-coral" />
            <span className="text-white font-bold text-xl tracking-tight">HomLiv</span>
          </Link>

          <div className="my-10 lg:my-auto">
            <h1
              className="text-white font-bold leading-tight mb-8"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}
            >
              List your spare room.<br />
              Find your next housemate.
            </h1>

            <div className="flex flex-col gap-5">
              {[
                {
                  icon: <Home size={18} className="text-coral" />,
                  title: 'No ownership required',
                  desc: 'You just need to be a current tenant with a spare room to fill.',
                },
                {
                  icon: <UserCheck size={18} className="text-coral" />,
                  title: 'Verified housemate network',
                  desc: 'Connect with verified tenants looking for shared living.',
                },
                {
                  icon: <MessageSquare size={18} className="text-coral" />,
                  title: 'Direct messaging with enquirers',
                  desc: 'Chat directly with potential housemates without leaving the platform.',
                },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-brand flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{feature.title}</p>
                    <p className="text-sm mt-0.5 text-white/60">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-coral" />
            <p className="text-xs font-bold tracking-[0.05em] uppercase text-white">Roommate Portal</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="bg-white flex flex-col justify-center items-center p-8 lg:p-12 lg:flex-1">
        <div className="w-full max-w-md">
          <h2 className="font-bold text-[1.75rem] tracking-[-0.02em] text-jet mb-1">
            {activeTab === 'signin' ? 'Welcome back' : 'Create Account'}
          </h2>
          <p className="text-slate-brand text-sm mb-6">
            {activeTab === 'signin'
              ? 'Sign in to manage your room listing.'
              : 'Start listing your spare room today.'}
          </p>

          {/* Tab switcher */}
          <div className="flex gap-1 mb-7 p-1 rounded-xl bg-surface-low">
            {(['signin', 'create'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`flex-1 py-2.5 text-xs font-bold tracking-[0.06em] uppercase rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-white text-jet shadow-[0_1px_8px_rgba(23,27,43,0.08)]'
                    : 'text-slate-brand hover:text-jet'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (activeTab === 'create') {
                setRoommate(true);
                navigate('/roommate/verify');
              } else {
                navigate('/roommate/dashboard');
              }
            }}
          >
            {activeTab === 'signin' && (
              <>
                <div className="mb-4">
                  <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand">
                      Password
                    </label>
                    <button type="button" className="text-xs font-bold tracking-[0.05em] uppercase text-coral hover:text-coral-dark transition-colors">
                      Forgot?
                    </button>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                    value={form.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                </div>
              </>
            )}

            {activeTab === 'create' && (
              <>
                <div className="mb-4">
                  <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                    value={form.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                      Phone
                    </label>
                    <div className="flex">
                      <span className="flex items-center px-3 text-sm shrink-0 border border-ghost/40 border-r-0 rounded-l-lg text-slate-brand bg-surface">
                        +353
                      </span>
                      <input
                        type="tel"
                        placeholder="00 000 0000"
                        className="w-full px-4 py-3 border border-ghost/40 rounded-r-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                    value={form.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                    value={form.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            >
              {activeTab === 'signin' ? 'Sign In →' : 'Create Roommate Account →'}
            </button>

            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-ghost/30" />
              <span className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand">or</span>
              <div className="flex-1 h-px bg-ghost/30" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button type="button" className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border border-ghost/40 text-jet hover:bg-surface-low transition-colors">
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.32-8.16 2.32-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border border-ghost/40 text-jet hover:bg-surface-low transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#171b2b">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple
              </button>
            </div>

            {/* Prominent landlord CTA — visible above copyright */}
            <div className="rounded-xl p-4 mb-4" style={{ background: '#fef3e2' }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#fde8c8' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9c5a00" strokeWidth="2">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: '#9c5a00' }}>Are you a property owner?</p>
                  <p className="text-xs mt-0.5" style={{ color: '#b87a20' }}>List and manage your properties with the full landlord suite.</p>
                </div>
              </div>
              <Link
                to="/landlord"
                className="mt-3 w-full flex items-center justify-center py-2.5 rounded-lg text-xs font-bold tracking-[0.05em] uppercase text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
              >
                Landlord Portal →
              </Link>
            </div>

            <p className="text-xs text-slate-brand/60 text-center">© 2026 HomLiv. Privacy & Terms.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/RoommateSignupPage.tsx
git commit -m "feat: add RoommateSignupPage (/roommate auth route)"
```

---

### Task 5: Add roommate CTA to `LandlordSignupPage`

**Files:**
- Modify: `src/app/pages/LandlordSignupPage.tsx`

- [ ] **Step 1: Add Link import and the prominent roommate CTA block**

At the top, `Link` is already imported from `react-router`. Find the copyright line:

```tsx
            <p className="text-xs text-slate-brand/60 text-center">
              © 2026 HomLiv. Privacy & Terms.
            </p>
```

Replace it with:

```tsx
            {/* Prominent roommate CTA */}
            <div className="rounded-xl p-4 mb-4" style={{ background: '#fef3e2' }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#fde8c8' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9c5a00" strokeWidth="2">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: '#9c5a00' }}>Looking to rent a spare room?</p>
                  <p className="text-xs mt-0.5" style={{ color: '#b87a20' }}>You don't need to own the property. List as a Roommate instead.</p>
                </div>
              </div>
              <Link
                to="/roommate"
                className="mt-3 w-full flex items-center justify-center py-2.5 rounded-lg text-xs font-bold tracking-[0.05em] uppercase text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
              >
                Roommate Portal →
              </Link>
            </div>

            <p className="text-xs text-slate-brand/60 text-center">© 2026 HomLiv. Privacy & Terms.</p>
```

- [ ] **Step 2: Verify**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/LandlordSignupPage.tsx
git commit -m "feat: add prominent roommate CTA to LandlordSignupPage"
```

---

### Task 6: Create `RoommateVerifyPage`

**Files:**
- Create: `src/app/pages/RoommateVerifyPage.tsx`

- [ ] **Step 1: Create the page**

```tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Check, AlertTriangle } from 'lucide-react';
import { LogoMark } from '../components/shared/LogoMark';
import { useRoommateStore } from '../../hooks/useRoommateStore';

const STEPS = [
  { id: 1, label: 'Email' },
  { id: 2, label: 'Phone' },
];

export function RoommateVerifyPage() {
  const navigate = useNavigate();
  const { setVerified } = useRoommateStore();

  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  // Step 1 state
  const [codeSent1, setCodeSent1] = useState(false);
  const [code1, setCode1] = useState('');

  // Step 2 state
  const [phone, setPhone] = useState('');
  const [codeSent2, setCodeSent2] = useState(false);
  const [code2, setCode2] = useState('');

  const progress = (step / STEPS.length) * 100;

  function handleNext() {
    if (step === 1 && code1.length === 6) {
      setStep(2);
    } else if (step === 2 && code2.length === 6) {
      setVerified(true);
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-surface-low flex flex-col items-center justify-center p-6">
        <Link to="/" className="flex items-center gap-2 mb-12">
          <LogoMark size={22} className="text-coral" />
          <span className="text-jet font-bold text-lg tracking-tight">HomLiv</span>
        </Link>

        <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center"
             style={{ boxShadow: '0 4px 24px rgba(23,27,43,0.08), 0 1px 4px rgba(23,27,43,0.04)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
               style={{ background: '#fef3e2' }}>
            <AlertTriangle size={26} style={{ color: '#9c5a00' }} />
          </div>
          <h2 className="font-bold text-xl text-jet mb-2" style={{ letterSpacing: '-0.02em' }}>
            You're almost verified
          </h2>
          <p className="text-sm text-slate-brand leading-relaxed mb-6">
            Your account is active. Your listings will show a roommate badge. Full verification usually completes within 2 hours.
          </p>
          <button
            className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 mb-3"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            onClick={() => navigate('/roommate/list-room')}
          >
            Set up my listing →
          </button>
          <button
            className="w-full py-3 text-sm font-medium text-slate-brand hover:text-jet transition-colors"
            onClick={() => {
              setVerified(false);
              navigate('/roommate/dashboard');
            }}
          >
            Do it later
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-low flex flex-col items-center justify-center p-6">
      <Link to="/" className="flex items-center gap-2 mb-12">
        <LogoMark size={22} className="text-coral" />
        <span className="text-jet font-bold text-lg tracking-tight">HomLiv</span>
      </Link>

      {/* Progress */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand">
            Step {step} of {STEPS.length}
          </span>
          <span className="text-xs text-slate-brand">{STEPS[step - 1].label}</span>
        </div>
        <div className="h-1.5 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #d47550, #b85530)' }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {STEPS.map((s) => (
            <div key={s.id} className="flex items-center gap-1.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                step > s.id
                  ? 'bg-coral text-white'
                  : step === s.id
                  ? 'bg-coral/15 text-coral border-2 border-coral'
                  : 'bg-surface-low text-slate-brand/50'
              }`}>
                {step > s.id ? <Check size={10} strokeWidth={3} /> : s.id}
              </div>
              <span className={`text-xs font-medium ${step >= s.id ? 'text-jet' : 'text-slate-brand/50'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl p-6 w-full max-w-md"
           style={{ boxShadow: '0 4px 24px rgba(23,27,43,0.08), 0 1px 4px rgba(23,27,43,0.04)' }}>

        {step === 1 && (
          <>
            <h2 className="font-bold text-lg text-jet mb-1" style={{ letterSpacing: '-0.02em' }}>
              Confirm your email address
            </h2>
            <p className="text-xs text-slate-brand mb-5">
              We use this to confirm you are a real person. Your details are never shared with tenants.
            </p>

            {/* Read-only email */}
            <div className="mb-4">
              <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                Email Address
              </label>
              <input
                type="email"
                readOnly
                value="jane.doe@example.com"
                className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-slate-brand outline-none"
              />
            </div>

            {!codeSent1 ? (
              <button
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 mb-4"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                onClick={() => setCodeSent1(true)}
              >
                Send confirmation code
              </button>
            ) : (
              <div className="mb-4">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                  6-Digit Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="••••••"
                  className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors tracking-[0.2em] text-center font-bold"
                  value={code1}
                  onChange={(e) => setCode1(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            )}

            {codeSent1 && (
              <button
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                disabled={code1.length < 6}
                onClick={handleNext}
              >
                Continue →
              </button>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-bold text-lg text-jet mb-1" style={{ letterSpacing: '-0.02em' }}>
              Verify your phone number
            </h2>
            <p className="text-xs text-slate-brand mb-5">
              We'll send a one-time code to confirm your Irish mobile number.
            </p>

            <div className="mb-4">
              <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                Phone Number
              </label>
              <div className="flex">
                <span className="flex items-center px-3 text-sm shrink-0 bg-[#f0f1f3] rounded-l-xl text-slate-brand">
                  +353
                </span>
                <input
                  type="tel"
                  placeholder="00 000 0000"
                  className="w-full bg-[#f0f1f3] rounded-r-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {!codeSent2 ? (
              <button
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 mb-4"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                onClick={() => setCodeSent2(true)}
              >
                Send SMS code
              </button>
            ) : (
              <div className="mb-4">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                  6-Digit Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="••••••"
                  className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors tracking-[0.2em] text-center font-bold"
                  value={code2}
                  onChange={(e) => setCode2(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            )}

            {/* Info banner */}
            <div className="rounded-xl p-3 mb-4" style={{ background: '#e8edf4' }}>
              <p className="text-xs leading-relaxed" style={{ color: '#2c4a7c' }}>
                Your listing will show an 'Unverified roommate' badge until our team reviews it. Tenants are advised to meet in person before agreeing to anything.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 py-3 rounded-xl text-sm font-medium text-slate-brand border border-ghost/40 hover:bg-surface-low transition-colors"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              {codeSent2 && (
                <button
                  className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-40"
                  style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                  disabled={code2.length < 6}
                  onClick={handleNext}
                >
                  Verify →
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/RoommateVerifyPage.tsx
git commit -m "feat: add RoommateVerifyPage (2-step email + phone, auto-advance)"
```

---

### Task 7: Register Phase 1 routes

**Files:**
- Modify: `src/app/routes.tsx`

- [ ] **Step 1: Add imports and routes**

Replace the entire file:

```tsx
import { createBrowserRouter, Navigate } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { TenantLoginPage } from './pages/TenantLoginPage';
import { LandlordSignupPage } from './pages/LandlordSignupPage';
import { ChatPage } from './pages/ChatPage';
import { LandlordDashboard } from './pages/LandlordDashboard';
import { TenantDashboard } from './pages/TenantDashboard';
import { LandlordVerifyPage } from './pages/LandlordVerifyPage';
import { RoommateSignupPage } from './pages/RoommateSignupPage';
import { RoommateVerifyPage } from './pages/RoommateVerifyPage';

export const router = createBrowserRouter([
  { path: '/',                  Component: HomePage },
  { path: '/listings',          Component: ListingsPage },
  { path: '/property/:id',      Component: PropertyDetailPage },
  { path: '/login',             Component: TenantLoginPage },
  { path: '/landlord',          Component: LandlordSignupPage },
  { path: '/dashboard',         Component: LandlordDashboard },
  { path: '/tenant-dashboard',  Component: TenantDashboard },
  { path: '/chat/:tenancyId',   Component: ChatPage },
  { path: '/landlord/verify',   Component: LandlordVerifyPage },
  // Roommate routes
  { path: '/roommate',          Component: RoommateSignupPage },
  { path: '/roommate/verify',   Component: RoommateVerifyPage },
  // Phase 2 stubs — redirect to signup until dashboard is built
  { path: '/roommate/dashboard', Component: () => <Navigate to="/roommate" replace /> },
  { path: '/roommate/listings',  Component: () => <Navigate to="/roommate" replace /> },
  { path: '/roommate/list-room', Component: () => <Navigate to="/roommate" replace /> },
  { path: '*',                  Component: HomePage },
]);
```

- [ ] **Step 2: Verify**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 3: Smoke test in browser**

```bash
npm run dev
```

Visit: `http://localhost:5173/roommate` — should show RoommateSignupPage.  
Visit: `http://localhost:5173/landlord` — should show the amber roommate CTA at the bottom.  
Click "Create Roommate Account →" → should land on `/roommate/verify`.  
Complete both OTP steps → should show the amber completion screen.

- [ ] **Step 4: Commit**

```bash
git add src/app/routes.tsx
git commit -m "feat: register roommate routes (Phase 1 complete)"
```

---

## PHASE 2 — Dashboard + Listing Wizard

---

### Task 8: Create roommate types

**Files:**
- Create: `src/app/components/roommate/types.ts`

- [ ] **Step 1: Create the types file**

```ts
export type Tab = 'overview' | 'listings' | 'messages' | 'settings';

export interface ListRoomForm {
  listingType: 'permanent' | 'temporary';
  availableFrom: string;
  availableUntil: string;
  title: string;
  type: 'Single Room' | 'Double Room' | 'En-Suite' | 'Studio';
  location: string;
  eircode: string;
  price: string;
  description: string;
  houseRules: string;
  amenities: string[];
}
```

- [ ] **Step 2: Verify**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/app/components/roommate/types.ts
git commit -m "feat: add roommate Tab union and ListRoomForm interface"
```

---

### Task 9: Create `RoommateSidebar`

**Files:**
- Create: `src/app/components/roommate/RoommateSidebar.tsx`

- [ ] **Step 1: Create the sidebar**

```tsx
import { LayoutDashboard, Home, MessageSquare, Settings } from 'lucide-react';
import { type Tab } from './types';

const NAV_ITEMS: { id: Tab; icon: React.ReactNode; label: string }[] = [
  { id: 'overview',  icon: <LayoutDashboard size={18} />, label: 'Overview' },
  { id: 'listings',  icon: <Home size={18} />,            label: 'My Listings' },
  { id: 'messages',  icon: <MessageSquare size={18} />,   label: 'Messages' },
  { id: 'settings',  icon: <Settings size={18} />,        label: 'Settings' },
];

interface RoommateSidebarProps {
  activeTab: Tab;
  onNav: (id: Tab) => void;
  isOpen: boolean;
  onClose: () => void;
  hasActiveListing: boolean;
}

export function RoommateSidebar({ activeTab, onNav, isOpen, onClose, hasActiveListing }: RoommateSidebarProps) {
  return (
    <>
      <aside
        className={`shrink-0 flex-col ${isOpen ? 'flex' : 'hidden'} lg:flex fixed lg:relative inset-y-16 lg:inset-y-0 left-0 z-40 w-[210px] bg-slate-brand h-[calc(100vh-4rem)] lg:h-full`}
        style={{ boxShadow: '6px 0 40px rgba(23,27,43,0.55), 2px 0 8px rgba(23,27,43,0.25)' }}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3 shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white">JD</span>
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">Jane Doe</p>
              <p className="text-white/50 text-[0.65rem]">Roommate Account</p>
            </div>
          </div>
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.6rem] font-bold uppercase tracking-[0.05em]"
            style={{ background: hasActiveListing ? '#fef3e2' : 'rgba(255,255,255,0.1)', color: hasActiveListing ? '#9c5a00' : 'rgba(255,255,255,0.5)' }}
          >
            {hasActiveListing ? 'Listing active' : 'No active listing'}
          </span>
        </div>

        <div className="flex flex-col gap-1 px-0 py-2 flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={
                activeTab === item.id
                  ? 'flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-white font-semibold cursor-pointer w-[calc(100%-1rem)] text-left text-sm'
                  : 'flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.07] transition-colors cursor-pointer w-[calc(100%-1rem)] text-left text-sm'
              }
              style={activeTab === item.id ? { background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)', boxShadow: '0 4px 12px rgba(180,80,40,0.35)' } : {}}
              onClick={() => { onNav(item.id); onClose(); }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 bg-ink/50 z-30 lg:hidden" onClick={onClose} />
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/app/components/roommate/RoommateSidebar.tsx
git commit -m "feat: add RoommateSidebar (4 nav items, amber listing badge)"
```

---

### Task 10: Create roommate `OverviewTab`

**Files:**
- Create: `src/app/components/roommate/OverviewTab.tsx`

- [ ] **Step 1: Create the tab**

```tsx
import { useState } from 'react';
import { Home, MessageSquare, Clock, X, Info } from 'lucide-react';
import { useNavigate } from 'react-router';
import { type Tab } from './types';

const BANNER_KEY = 'homliv_roommate_banner_dismissed';

interface OverviewTabProps {
  onNav: (tab: Tab) => void;
  hasActiveListing: boolean;
  expiryDate: string | null;
}

export function OverviewTab({ onNav, hasActiveListing, expiryDate }: OverviewTabProps) {
  const navigate = useNavigate();
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    return localStorage.getItem(BANNER_KEY) === 'true';
  });

  function dismissBanner() {
    localStorage.setItem(BANNER_KEY, 'true');
    setBannerDismissed(true);
  }

  const daysUntilExpiry = expiryDate
    ? Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  const expiryLabel = expiryDate
    ? new Date(expiryDate).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Permanent';

  return (
    <>
      {/* Amber info banner */}
      {!bannerDismissed && (
        <div className="flex items-start gap-3 p-4 rounded-xl mb-5"
             style={{ background: '#fef3e2' }}>
          <Info size={16} style={{ color: '#9c5a00' }} className="shrink-0 mt-0.5" />
          <p className="text-sm flex-1" style={{ color: '#9c5a00' }}>
            Your listings are shown with a <strong>Roommate badge</strong>. Tenants are advised this listing is not from a property owner.
          </p>
          <button onClick={dismissBanner}>
            <X size={16} style={{ color: '#9c5a00' }} />
          </button>
        </div>
      )}

      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-bold text-2xl text-jet" style={{ letterSpacing: '-0.01em' }}>
            Welcome back, Jane
          </h1>
          <p className="text-sm mt-0.5 text-slate-brand">
            {new Date().toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
          onClick={() => navigate('/roommate/list-room')}
        >
          <Home size={14} />
          List a Room
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* My Listings */}
        <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-surface-low flex items-center justify-center">
              <Home size={18} className="text-slate-brand" />
            </div>
          </div>
          <p className="text-2xl font-bold text-jet mb-0.5" style={{ letterSpacing: '-0.02em' }}>
            {hasActiveListing ? '1' : '0'}
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.05em] text-slate-brand mb-2">My Listings</p>
          <button
            className="text-xs font-bold tracking-[0.05em] uppercase text-coral hover:text-coral-dark transition-colors"
            onClick={() => onNav('listings')}
          >
            View listing →
          </button>
        </div>

        {/* Active Enquiries */}
        <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-surface-low flex items-center justify-center">
              <MessageSquare size={18} className="text-slate-brand" />
            </div>
          </div>
          <p className="text-2xl font-bold text-jet mb-0.5" style={{ letterSpacing: '-0.02em' }}>2</p>
          <p className="text-xs font-bold uppercase tracking-[0.05em] text-slate-brand mb-2">Active Enquiries</p>
          <button
            className="text-xs font-bold tracking-[0.05em] uppercase text-coral hover:text-coral-dark transition-colors"
            onClick={() => onNav('messages')}
          >
            View messages →
          </button>
        </div>

        {/* Listing Expires */}
        <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-surface-low flex items-center justify-center">
              <Clock size={18} className="text-slate-brand" />
            </div>
            {daysUntilExpiry !== null && daysUntilExpiry <= 7 && (
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-full"
                    style={{ background: '#fef3e2', color: '#9c5a00' }}>
                Expiring soon
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-jet mb-0.5" style={{ letterSpacing: '-0.02em' }}>
            {expiryLabel}
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.05em] text-slate-brand">Listing expires</p>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/app/components/roommate/OverviewTab.tsx
git commit -m "feat: add roommate OverviewTab (stats, amber banner, dismissible)"
```

---

### Task 11: Create roommate `MyListingsTab`

**Files:**
- Create: `src/app/components/roommate/MyListingsTab.tsx`

- [ ] **Step 1: Create the tab**

```tsx
import { useState } from 'react';
import { Plus, MapPin, AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { mockProperties } from '../../../data/mockProperties';
import type { Property } from '../../../types';

interface MyListingsTabProps {
  roommateListings: Property[];
  onListingsChange: (updated: Property[]) => void;
}

export function MyListingsTab({ roommateListings, onListingsChange }: MyListingsTabProps) {
  const navigate = useNavigate();
  const [extendingId, setExtendingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');
  const [savedId, setSavedId] = useState<string | null>(null);

  const atLimit = roommateListings.length >= 2;
  const now = new Date();

  function isExpired(listing: Property) {
    return listing.listingType === 'temporary' && listing.availableUntil
      ? new Date(listing.availableUntil) <= now
      : false;
  }

  function daysRemaining(listing: Property) {
    if (!listing.availableUntil) return null;
    return Math.ceil((new Date(listing.availableUntil).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function handleSaveDate(id: string) {
    onListingsChange(
      roommateListings.map((l) => l.id === id ? { ...l, availableUntil: newDate } : l)
    );
    setExtendingId(null);
    setNewDate('');
    setSavedId(id);
    setTimeout(() => setSavedId(null), 3000);
  }

  function handleDelete(id: string) {
    onListingsChange(roommateListings.filter((l) => l.id !== id));
  }

  // 3-day warning banner
  const expiringListing = roommateListings.find((l) => {
    const days = daysRemaining(l);
    return days !== null && days <= 3 && days > 0;
  });

  return (
    <>
      {expiringListing && (
        <div className="flex items-center gap-3 p-4 rounded-xl mb-5"
             style={{ background: '#fef3e2' }}>
          <AlertTriangle size={16} style={{ color: '#9c5a00' }} className="shrink-0" />
          <p className="text-sm flex-1" style={{ color: '#9c5a00' }}>
            Your listing <strong>"{expiringListing.title}"</strong> expires in {daysRemaining(expiringListing)} day{daysRemaining(expiringListing) === 1 ? '' : 's'}.{' '}
            <button
              className="font-bold underline"
              style={{ color: '#9c5a00' }}
              onClick={() => setExtendingId(expiringListing.id)}
            >
              Extend now →
            </button>
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-xl text-jet" style={{ letterSpacing: '-0.01em' }}>My Listings</h2>
        <div className="relative group">
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            disabled={atLimit}
            onClick={() => !atLimit && navigate('/roommate/list-room')}
          >
            <Plus size={14} />
            Add room
          </button>
          {atLimit && (
            <div className="absolute right-0 top-full mt-1 px-3 py-1.5 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                 style={{ background: 'rgba(23,27,43,0.85)' }}>
              Maximum 2 listings
            </div>
          )}
        </div>
      </div>

      {roommateListings.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="w-12 h-12 rounded-2xl bg-surface-low flex items-center justify-center mx-auto mb-4">
            <Plus size={22} className="text-slate-brand" />
          </div>
          <p className="font-semibold text-jet mb-1">No listings yet</p>
          <p className="text-sm text-slate-brand mb-4">Add your spare room to start receiving enquiries.</p>
          <button
            className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            onClick={() => navigate('/roommate/list-room')}
          >
            List a room →
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {roommateListings.map((listing) => {
          const expired = isExpired(listing);
          const days = daysRemaining(listing);

          return (
            <div
              key={listing.id}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              style={{ opacity: expired ? 0.5 : 1, position: 'relative' }}
            >
              {expired && (
                <div className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl"
                     style={{ background: 'rgba(250,250,250,0.75)' }}>
                  <div className="text-center">
                    <p className="font-bold text-jet mb-3">
                      This listing expired on {formatDate(listing.availableUntil!)}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <button
                        className="px-4 py-2 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                        style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                        onClick={() => { setExtendingId(listing.id); }}
                      >
                        <RefreshCw size={12} className="inline mr-1.5" />
                        Renew listing
                      </button>
                      <button
                        className="px-4 py-2 rounded-xl text-sm font-semibold border border-ghost/40 hover:bg-red-50 transition-colors"
                        style={{ color: '#b91c1c' }}
                        onClick={() => handleDelete(listing.id)}
                      >
                        <Trash2 size={12} className="inline mr-1.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 p-4">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-24 h-24 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-sm text-jet truncate">{listing.title}</h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                          style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin size={11} className="text-slate-brand" />
                    <span className="text-xs text-slate-brand truncate">{listing.location}</span>
                  </div>
                  <p className="text-sm font-bold text-coral mb-1">€{listing.price}/mo</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.05em] text-slate-brand">
                      {listing.listingType === 'temporary' ? 'Temporary' : 'Permanent'}
                    </span>
                    {listing.listingType === 'temporary' && listing.availableUntil && !expired && (
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.05em]"
                            style={{ color: days !== null && days <= 7 ? '#9c5a00' : '#4f5d75' }}>
                        · Expires {formatDate(listing.availableUntil)}
                        {days !== null && ` (${days}d)`}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Extend date picker */}
              {extendingId === listing.id && (
                <div className="mx-4 mb-4 p-4 rounded-xl bg-surface-low">
                  <p className="text-xs font-bold uppercase tracking-[0.05em] text-slate-brand mb-2">New end date</p>
                  <input
                    type="date"
                    className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors mb-3"
                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                    max={new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0]}
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-40"
                      style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                      disabled={!newDate}
                      onClick={() => handleSaveDate(listing.id)}
                    >
                      Save new date
                    </button>
                    <button
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-ghost/40 text-slate-brand hover:bg-surface transition-colors"
                      onClick={() => { setExtendingId(null); setNewDate(''); }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {savedId === listing.id && (
                <div className="mx-4 mb-4 p-3 rounded-xl text-xs font-medium" style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                  End date updated. Your listing will now be hidden after this date.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/app/components/roommate/MyListingsTab.tsx
git commit -m "feat: add roommate MyListingsTab (expiry management, extend/delete)"
```

---

### Task 12: Create roommate `MessagesTab` and `SettingsTab`

**Files:**
- Create: `src/app/components/roommate/MessagesTab.tsx`
- Create: `src/app/components/roommate/SettingsTab.tsx`

- [ ] **Step 1: Create MessagesTab**

```tsx
import { ChatInterface } from '../shared/ChatInterface';

export function MessagesTab() {
  return <ChatInterface />;
}
```

- [ ] **Step 2: Create SettingsTab**

```tsx
import { ChevronRight, FlaskConical } from 'lucide-react';
import { useRoommateStore } from '../../../hooks/useRoommateStore';

const SETTINGS_ITEMS = ['Notification Preferences', 'Security', 'Privacy'];

export function SettingsTab() {
  const { isVerified, setVerified } = useRoommateStore();

  return (
    <>
      <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Settings</h2>

      <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)] mb-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-surface-low flex items-center justify-center">
            <span className="font-bold text-xl text-slate-brand">JD</span>
          </div>
          <div>
            <p className="font-bold text-base text-jet">Jane Doe</p>
            <p className="text-sm text-slate-brand">jane.doe@example.com</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
                  style={{ background: '#fef3e2', color: '#9c5a00' }}>
              Roommate Account
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {SETTINGS_ITEMS.map((item) => (
            <div key={item} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(220,193,183,0.15)' }}>
              <span className="text-sm font-medium text-jet">{item}</span>
              <ChevronRight size={16} className="text-slate-brand" />
            </div>
          ))}
        </div>
      </div>

      {/* Dev Tools */}
      <div className="rounded-xl p-4 border border-dashed border-ghost/40 bg-surface-low">
        <div className="flex items-center gap-2 mb-3">
          <FlaskConical size={14} className="text-slate-brand/60" />
          <p className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand/60">Dev Tools</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-jet">Verification status</p>
            <p className="text-xs text-slate-brand mt-0.5">
              {isVerified ? 'Verified' : 'Unverified'}
            </p>
          </div>
          <button
            className="text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            onClick={() => setVerified(!isVerified)}
          >
            Toggle
          </button>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run typecheck
```

- [ ] **Step 4: Commit**

```bash
git add src/app/components/roommate/MessagesTab.tsx src/app/components/roommate/SettingsTab.tsx
git commit -m "feat: add roommate MessagesTab (ChatInterface) and SettingsTab (dev tools)"
```

---

### Task 13: Create `RoommateDashboard` shell

**Files:**
- Create: `src/app/pages/RoommateDashboard.tsx`

- [ ] **Step 1: Create the shell**

```tsx
import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { RoommateSidebar } from '../components/roommate/RoommateSidebar';
import { OverviewTab } from '../components/roommate/OverviewTab';
import { MyListingsTab } from '../components/roommate/MyListingsTab';
import { MessagesTab } from '../components/roommate/MessagesTab';
import { SettingsTab } from '../components/roommate/SettingsTab';
import { type Tab } from '../components/roommate/types';
import { mockProperties } from '../../data/mockProperties';
import type { Property } from '../../types';

// Seed with the two mock roommate listings
const INITIAL_LISTINGS = mockProperties.filter((p) => p.postedBy === 'roommate');

export function RoommateDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [listings, setListings] = useState<Property[]>(INITIAL_LISTINGS);

  const hasActiveListing = listings.length > 0;
  const temporaryListing = listings.find((l) => l.listingType === 'temporary');
  const expiryDate = temporaryListing?.availableUntil ?? null;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface-low">
      <Navbar
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{ name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=32' }}
      />

      <div className="flex flex-1 overflow-hidden min-h-0">
        <RoommateSidebar
          activeTab={activeTab}
          onNav={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          hasActiveListing={hasActiveListing}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 max-w-[1100px] mx-auto w-full">
            {activeTab === 'overview'  && (
              <OverviewTab
                onNav={setActiveTab}
                hasActiveListing={hasActiveListing}
                expiryDate={expiryDate}
              />
            )}
            {activeTab === 'listings'  && (
              <MyListingsTab
                roommateListings={listings}
                onListingsChange={setListings}
              />
            )}
            {activeTab === 'messages'  && <MessagesTab />}
            {activeTab === 'settings'  && <SettingsTab />}
          </div>
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run typecheck
```

- [ ] **Step 3: Update routes — replace the `/roommate/dashboard` stub**

In `src/app/routes.tsx`, add the import and replace the stub:

```tsx
import { RoommateDashboard } from './pages/RoommateDashboard';
```

Change:
```tsx
{ path: '/roommate/dashboard', Component: () => <Navigate to="/roommate" replace /> },
```
To:
```tsx
{ path: '/roommate/dashboard', Component: RoommateDashboard },
```

- [ ] **Step 4: Verify and smoke test**

```bash
npm run typecheck && npm run lint
npm run dev
```

Visit `http://localhost:5173/roommate` → Sign In → should reach `/roommate/dashboard`.  
Check all 4 sidebar tabs work. Confirm "My Listings" shows the 2 mock roommate properties.

- [ ] **Step 5: Commit**

```bash
git add src/app/pages/RoommateDashboard.tsx src/app/routes.tsx
git commit -m "feat: add RoommateDashboard shell (4 tabs wired, listings state)"
```

---

### Task 14: Create `ListRoomPage`

**Files:**
- Create: `src/app/pages/roommate/ListRoomPage.tsx`

- [ ] **Step 1: Create the page**

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Check, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../../components/layout/Navbar';
import { type ListRoomForm } from '../../components/roommate/types';
import { mockProperties } from '../../../data/mockProperties';

const EMPTY_FORM: ListRoomForm = {
  listingType: 'permanent',
  availableFrom: '',
  availableUntil: '',
  title: '',
  type: 'Double Room',
  location: '',
  eircode: '',
  price: '',
  description: '',
  houseRules: '',
  amenities: [],
};

const ROOM_TYPES: ListRoomForm['type'][] = ['Single Room', 'Double Room', 'En-Suite', 'Studio'];
const AMENITY_OPTIONS = ['WiFi', 'Bills Inc.', 'Parking', 'Garden', 'Washing Machine', 'Heating', 'Near bus routes'];
const STEP_LABELS = ['Room Details', 'Amenities & Rules', 'Review & Publish'];

function formatIrishDate(iso: string) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

export function ListRoomPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ListRoomForm>(EMPTY_FORM);

  const progress = (step / 3) * 100;

  function setField<K extends keyof ListRoomForm>(key: K, value: ListRoomForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleAmenity(amenity: string) {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  }

  function handlePublish() {
    const newListing = {
      id: `r${Date.now()}`,
      title: form.title || 'Spare room',
      type: form.type,
      location: form.location,
      eircode: form.eircode,
      price: Number(form.price) || 0,
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
      amenities: form.amenities,
      bedrooms: 1,
      bathrooms: 1,
      area: 18,
      available: true,
      wishlistCount: 0,
      isRPZ: form.eircode.startsWith('D0'),
      landlord: { name: 'Jane Doe', verified: false, avatar: 'https://i.pravatar.cc/150?img=32' },
      description: form.description,
      houseRules: form.houseRules.split('\n').filter(Boolean),
      transport: [],
      postedBy: 'roommate' as const,
      roommateVerified: false,
      listingType: form.listingType,
      availableFrom: form.availableFrom,
      availableUntil: form.listingType === 'temporary' ? form.availableUntil : null,
    };
    // Push to mock array (module-level mutation for mock purposes)
    (mockProperties as typeof mockProperties & { push: (p: typeof newListing) => void }).push(newListing);
    toast.success('Room listed successfully!');
    navigate('/roommate/dashboard');
  }

  return (
    <div className="min-h-screen bg-surface-low">
      <Navbar user={{ name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=32' }} />

      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand">
              Step {step} of 3
            </span>
            <span className="text-xs text-slate-brand">{STEP_LABELS[step - 1]}</span>
          </div>
          <div className="h-1.5 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #d47550, #b85530)' }}
            />
          </div>
          <div className="flex justify-between mt-3">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  step > s ? 'bg-coral text-white' : step === s ? 'bg-coral/15 text-coral border-2 border-coral' : 'bg-surface text-slate-brand/50'
                }`}>
                  {step > s ? <Check size={10} strokeWidth={3} /> : s}
                </div>
                <span className={`text-xs font-medium ${step >= s ? 'text-jet' : 'text-slate-brand/50'}`}>
                  {STEP_LABELS[s - 1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-6"
             style={{ boxShadow: '0 4px 24px rgba(23,27,43,0.08), 0 1px 4px rgba(23,27,43,0.04)' }}>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <>
              <h2 className="font-bold text-lg text-jet mb-5" style={{ letterSpacing: '-0.02em' }}>
                Room Details
              </h2>

              {/* Listing type selector */}
              <div className="mb-5">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-2 text-slate-brand">
                  Listing Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['permanent', 'temporary'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      className="p-4 rounded-xl text-left transition-all"
                      style={{
                        background: form.listingType === type ? 'rgba(239,131,84,0.05)' : '#fafafa',
                        borderLeft: form.listingType === type ? '4px solid #ef8354' : '4px solid transparent',
                        boxShadow: '0 1px 4px rgba(23,27,43,0.06)',
                      }}
                      onClick={() => setField('listingType', type)}
                    >
                      <p className="font-semibold text-sm text-jet mb-0.5">
                        {type === 'permanent' ? '🔄 Permanent' : '⏳ Temporary'}
                      </p>
                      <p className="text-xs text-slate-brand">
                        {type === 'permanent' ? 'Room available indefinitely' : 'Available for a limited period'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date range — only if temporary */}
              {form.listingType === 'temporary' && (
                <div className="mb-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                        Available from *
                      </label>
                      <input
                        type="date"
                        className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors"
                        value={form.availableFrom}
                        onChange={(e) => setField('availableFrom', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                        Available until *
                      </label>
                      <input
                        type="date"
                        className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors"
                        min={form.availableFrom || new Date().toISOString().split('T')[0]}
                        value={form.availableUntil}
                        onChange={(e) => setField('availableUntil', e.target.value)}
                      />
                    </div>
                  </div>
                  {form.availableUntil && (
                    <p className="text-xs text-slate-brand mt-2">
                      After {formatIrishDate(form.availableUntil)}, this listing will be automatically hidden from search results. You can extend this date at any time from your dashboard.
                    </p>
                  )}
                </div>
              )}

              <div className="mb-4">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                  Listing Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Double room in shared 3-bed, Ranelagh"
                  className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40"
                  value={form.title}
                  onChange={(e) => setField('title', e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                  Room Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ROOM_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="py-2.5 px-3 rounded-xl text-xs font-bold tracking-[0.04em] uppercase transition-all"
                      style={{
                        background: form.type === t ? 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' : '#f0f1f3',
                        color: form.type === t ? '#fff' : '#4f5d75',
                      }}
                      onClick={() => setField('type', t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ranelagh, Dublin 6"
                    className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40"
                    value={form.location}
                    onChange={(e) => setField('location', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                    Eircode
                  </label>
                  <input
                    type="text"
                    placeholder="D06 X1Y2"
                    className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40"
                    value={form.eircode}
                    onChange={(e) => setField('eircode', e.target.value.toUpperCase())}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                  Monthly Rent (€)
                </label>
                <input
                  type="number"
                  placeholder="750"
                  className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40"
                  value={form.price}
                  onChange={(e) => setField('price', e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the room and living situation..."
                  className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40 resize-none"
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                />
              </div>
            </>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <>
              <h2 className="font-bold text-lg text-jet mb-5" style={{ letterSpacing: '-0.02em' }}>
                Amenities & House Rules
              </h2>

              <div className="mb-5">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-2 text-slate-brand">
                  Amenities
                </label>
                <div className="flex flex-wrap gap-2">
                  {AMENITY_OPTIONS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      className="px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.04em] uppercase transition-all"
                      style={{
                        background: form.amenities.includes(a) ? 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' : '#f0f1f3',
                        color: form.amenities.includes(a) ? '#fff' : '#4f5d75',
                      }}
                      onClick={() => toggleAmenity(a)}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                  House Rules (one per line)
                </label>
                <textarea
                  rows={4}
                  placeholder={"No smoking\nNo pets\nQuiet household"}
                  className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40 resize-none"
                  value={form.houseRules}
                  onChange={(e) => setField('houseRules', e.target.value)}
                />
              </div>
            </>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <>
              <h2 className="font-bold text-lg text-jet mb-5" style={{ letterSpacing: '-0.02em' }}>
                Review & Publish
              </h2>

              {/* Listing summary */}
              <div className="bg-surface-low rounded-xl p-4 mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.05em] text-slate-brand mb-3">Listing Summary</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Listing type', value: form.listingType === 'permanent' ? 'Permanent' : 'Temporary' },
                    { label: 'Available from', value: formatIrishDate(form.availableFrom) },
                    { label: 'Available until', value: form.listingType === 'temporary' ? formatIrishDate(form.availableUntil) : 'No end date' },
                    { label: 'Room type', value: form.type },
                    { label: 'Location', value: form.location || '—' },
                    { label: 'Monthly rent', value: form.price ? `€${form.price}/mo` : '—' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs text-slate-brand">{label}</span>
                      <span className="text-xs font-semibold text-jet">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Temporary warning */}
              {form.listingType === 'temporary' && form.availableUntil && (
                <div className="rounded-xl p-4 mb-5" style={{ background: '#fef3e2' }}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} style={{ color: '#9c5a00' }} className="shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-jet mb-1">Temporary listing notice</p>
                      <p className="text-xs leading-relaxed" style={{ color: '#9c5a00' }}>
                        This listing will be hidden on {formatIrishDate(form.availableUntil)}. You will receive a notification 3 days before this happens. You can extend the date at any time from My Listings.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 pt-2">
            {step > 1 && (
              <button
                type="button"
                className="flex-1 py-3 rounded-xl text-sm font-medium border border-ghost/40 text-slate-brand hover:bg-surface-low transition-colors"
                onClick={() => setStep((s) => s - 1)}
              >
                ← Back
              </button>
            )}
            <button
              type="button"
              className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
              onClick={step < 3 ? () => setStep((s) => s + 1) : handlePublish}
            >
              {step < 3 ? 'Continue →' : 'Publish listing'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update route stub for `/roommate/list-room`**

In `src/app/routes.tsx`:

```tsx
import { ListRoomPage } from './pages/roommate/ListRoomPage';
```

Replace:
```tsx
{ path: '/roommate/list-room', Component: () => <Navigate to="/roommate" replace /> },
```
With:
```tsx
{ path: '/roommate/list-room', Component: ListRoomPage },
```

- [ ] **Step 3: Verify and smoke test**

```bash
npm run typecheck && npm run lint
npm run dev
```

Visit `/roommate/dashboard` → "List a Room" → should show 3-step wizard.  
Select "Temporary" → date pickers appear.  
Step through to Review → amber warning box visible for temporary listing.  
Publish → toast + redirect to dashboard.

- [ ] **Step 4: Commit**

```bash
git add src/app/pages/roommate/ListRoomPage.tsx src/app/routes.tsx
git commit -m "feat: add ListRoomPage (3-step wizard, permanent/temporary, Irish dates)"
```

---

## PHASE 3 — Shared Component Changes

---

### Task 15: Create `ReportModal`

**Files:**
- Create: `src/app/components/shared/ReportModal.tsx`

- [ ] **Step 1: Create the modal**

```tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { mockReports } from '../../../data/mockProperties';

const REASONS = [
  'Scam or fraud',
  'Misleading listing',
  'Inappropriate content',
  'Other',
];

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
  listingId: string;
}

export function ReportModal({ open, onClose, listingId }: ReportModalProps) {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  function handleSubmit() {
    mockReports.push({
      id: `rep-${Date.now()}`,
      listingId,
      reportedBy: 'tenant-mock',
      reason,
      timestamp: new Date().toISOString(),
    });
    toast.success('Report submitted. Our team will review this listing.');
    setReason('');
    setDetails('');
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-[0_20px_60px_rgba(23,27,43,0.2)]">
        <div className="flex items-center justify-between p-6 pb-4">
          <h3 className="font-bold text-base text-jet" style={{ letterSpacing: '-0.01em' }}>
            Report this listing
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-surface-low rounded-lg transition-colors">
            <X size={18} className="text-slate-brand" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <p className="text-xs text-slate-brand mb-4">
            Select a reason to help our team review this listing.
          </p>

          <div className="flex flex-col gap-2 mb-4">
            {REASONS.map((r) => (
              <label
                key={r}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-surface-low"
                style={{ background: reason === r ? '#fef3e2' : undefined }}
              >
                <input
                  type="radio"
                  name="report-reason"
                  value={r}
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="accent-coral"
                />
                <span className="text-sm font-medium text-jet">{r}</span>
              </label>
            ))}
          </div>

          <textarea
            rows={3}
            placeholder="Tell us more (optional)..."
            className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40 resize-none mb-5"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 py-3 rounded-xl text-sm font-medium border border-ghost/40 text-slate-brand hover:bg-surface-low transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-40"
              style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
              disabled={!reason}
              onClick={handleSubmit}
            >
              Submit report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/app/components/shared/ReportModal.tsx
git commit -m "feat: add ReportModal (4 reasons, pushes to mockReports, toast on submit)"
```

---

### Task 16: Update `PropertyCard` — roommate + temporary badges

**Files:**
- Modify: `src/app/components/shared/PropertyCard.tsx`

- [ ] **Step 1: Add roommate badge to top-left stack**

Find the top-left badge stack (after the type badge):

```tsx
        {/* Type + RPZ badges top-left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          <div className="px-2 py-1 rounded text-xs font-bold tracking-[0.05em] uppercase text-white bg-jet/85">
            {property.type}
          </div>
          {property.isRPZ && (
            <div className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase text-white bg-coral">
              RPZ AREA
            </div>
          )}
        </div>
```

Replace with:

```tsx
        {/* Type + RPZ + Roommate badges top-left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          <div className="px-2 py-1 rounded text-xs font-bold tracking-[0.05em] uppercase text-white bg-jet/85">
            {property.type}
          </div>
          {property.isRPZ && (
            <div className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase text-white bg-coral">
              RPZ AREA
            </div>
          )}
          {property.postedBy === 'roommate' && (
            <div
              className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase"
              style={{ background: '#fef3e2', color: '#9c5a00' }}
            >
              Roommate listing
            </div>
          )}
        </div>

        {/* Temporary listing badge — bottom-left */}
        {property.listingType === 'temporary' && property.availableUntil && (
          <div
            className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold"
            style={{ background: '#e8edf4', color: '#2c4a7c' }}
          >
            Until {new Date(property.availableUntil).toLocaleDateString('en-IE', { day: 'numeric', month: 'short' })}
          </div>
        )}
```

- [ ] **Step 2: Verify**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 3: Check in browser**

```bash
npm run dev
```

Visit `/listings` — properties r1 and r2 should show amber "Roommate listing" badge. r1 should also show the blue "Until" date badge at bottom-left.

- [ ] **Step 4: Commit**

```bash
git add src/app/components/shared/PropertyCard.tsx
git commit -m "feat: add roommate + temporary listing badges to PropertyCard"
```

---

### Task 17: Add expiry filter to `ListingsPage`

**Files:**
- Modify: `src/app/pages/ListingsPage.tsx`

- [ ] **Step 1: Find where mockProperties is used and add the filter**

In `ListingsPage.tsx`, find the line where `mockProperties` is referenced (likely assigned to a variable or used directly in JSX). Add the filter immediately after the import or before the first use.

Find:
```tsx
import { mockProperties } from '../../data/mockProperties';
```

After that import, add at the top of the component function body (before any use of `mockProperties`):

```tsx
  const activeListings = mockProperties.filter((l) => {
    if (l.listingType === 'temporary' && l.availableUntil) {
      return new Date(l.availableUntil) > new Date();
    }
    return true;
  });
```

Then replace every reference to `mockProperties` inside the component with `activeListings`.

- [ ] **Step 2: Verify**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/ListingsPage.tsx
git commit -m "feat: filter expired temporary listings from ListingsPage"
```

---

### Task 18: Update `PropertyDetailPage` — roommate card + report modal

**Files:**
- Modify: `src/app/pages/PropertyDetailPage.tsx`

- [ ] **Step 1: Add imports**

At the top of `PropertyDetailPage.tsx`, add:

```tsx
import { useState } from 'react'; // already there
import { AlertTriangle, Flag } from 'lucide-react'; // add Flag to existing import
import { ReportModal } from '../components/shared/ReportModal';
```

- [ ] **Step 2: Add state for report modal**

Inside the `PropertyDetailPage` function, after existing `useState` calls, add:

```tsx
  const [showReport, setShowReport] = useState(false);
```

- [ ] **Step 3: Find the landlord preview card in the right sticky panel and add conditional**

Locate the landlord card in the right column. It will be inside a `<div>` in the sticky CTA panel. Wrap it with a conditional and add the roommate card below. The pattern looks like:

```tsx
{/* Landlord / Roommate card */}
{property.postedBy === 'roommate' ? (
  <>
    {/* Temporary availability strip */}
    {property.listingType === 'temporary' && property.availableFrom && property.availableUntil && (
      <div className="rounded-xl p-3 mb-3" style={{ background: '#e8edf4' }}>
        <p className="text-xs font-medium" style={{ color: '#2c4a7c' }}>
          ⏳ Available {new Date(property.availableFrom).toLocaleDateString('en-IE', { day: 'numeric', month: 'short' })} → {new Date(property.availableUntil).toLocaleDateString('en-IE', { day: 'numeric', month: 'short' })}
          {' · '}{Math.ceil((new Date(property.availableUntil).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining
        </p>
      </div>
    )}

    {/* Roommate info card */}
    <div className="rounded-2xl p-4" style={{ background: '#fef3e2', border: '1px solid rgba(220,193,183,0.15)' }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
             style={{ background: '#fde8c8', color: '#9c5a00' }}>
          {property.landlord.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div>
          <p className="font-semibold text-sm text-jet">{property.landlord.name}</p>
          <p className="text-xs" style={{ color: '#9c5a00' }}>Roommate</p>
          <div className="flex items-center gap-1 mt-0.5">
            <AlertTriangle size={10} style={{ color: '#9c5a00' }} />
            <span className="text-[0.65rem] font-bold" style={{ color: '#9c5a00' }}>Unverified listing</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-brand mb-4 leading-relaxed">
        This room is listed by a current tenant, not the property owner.
      </p>
      <div className="flex gap-2">
        <button
          className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-ghost/40 text-jet hover:bg-surface-low transition-colors"
        >
          Chat with roommate
        </button>
        <button
          className="flex items-center gap-1.5 py-2.5 px-3 rounded-xl text-sm font-medium border border-ghost/40 transition-colors hover:bg-red-50"
          style={{ color: '#b91c1c' }}
          onClick={() => setShowReport(true)}
        >
          <Flag size={13} />
          Report
        </button>
      </div>
    </div>
  </>
) : (
  /* Existing landlord card — unchanged */
  <>
    <div className="flex items-center gap-3 mb-4">
      <img
        src={property.landlord.avatar}
        alt={property.landlord.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-sm text-jet">
            {property.landlord.name}
          </span>
          {property.landlord.verified && (
            <BadgeCheck size={14} className="text-coral" />
          )}
        </div>
        {property.landlord.verified && (
          <p className="text-xs text-slate-brand">Verified Premium Host</p>
        )}
      </div>
    </div>
    <button
      className="w-full px-6 py-3 rounded-lg border border-ghost/20 text-jet font-medium hover:bg-surface-low transition-colors flex items-center justify-center gap-2"
    >
      <MessageSquare size={14} />
      Chat with Landlord
    </button>
  </>
)}

<ReportModal open={showReport} onClose={() => setShowReport(false)} listingId={property.id} />
```

> **Important:** This block replaces the existing landlord card section (lines ~223–249, between the two `my-5` dividers). Delete those lines and substitute this conditional block in their place.

- [ ] **Step 4: Verify**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 5: Smoke test**

```bash
npm run dev
```

Visit `/property/r1` — should show roommate card (amber bg) with availability strip.  
Visit `/property/1` — should show landlord card unchanged.  
Click "Report" on r1 — modal opens, select reason, Submit → toast fires.

- [ ] **Step 6: Commit**

```bash
git add src/app/pages/PropertyDetailPage.tsx
git commit -m "feat: add roommate info card + report modal to PropertyDetailPage"
```

---

### Task 19: Add "Report user" link to `ChatInterface`

**Files:**
- Modify: `src/app/components/shared/ChatInterface.tsx`

- [ ] **Step 1: Add imports and state**

In `ChatInterface.tsx`, add:

```tsx
import { Flag } from 'lucide-react'; // add to existing lucide import
import { ReportModal } from './ReportModal';
```

Add `useState` for the report modal (if not already imported):

```tsx
const [showReport, setShowReport] = useState(false);
const [reportListingId, setReportListingId] = useState('');
```

- [ ] **Step 2: Find the chat top-bar and add the Report link**

Locate the chat header/top-bar section inside `ChatInterface.tsx`. It will contain the conversation name and possibly some icons. Find where the conversation header is rendered and add the report link on the right side, conditionally shown when the active conversation is with a roommate.

Since `ChatInterface` uses `mockConversations`, the current conversation won't have a `postedBy` field. Use a simple heuristic for now: show the report link on all chat headers with a comment that it should filter by role when real auth ships.

In the chat top-bar, add this button after the existing header content:

```tsx
{/* Report user — shown for roommate conversations */}
<button
  className="flex items-center gap-1 text-xs font-medium transition-colors hover:text-red-600"
  style={{ color: '#4f5d75' }}
  onClick={() => {
    setReportListingId('chat-report');
    setShowReport(true);
  }}
>
  <Flag size={12} />
  Report user
</button>
```

Add below the chat container (before the closing return):

```tsx
<ReportModal
  open={showReport}
  onClose={() => setShowReport(false)}
  listingId={reportListingId}
/>
```

- [ ] **Step 3: Verify**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 4: Final full smoke test**

```bash
npm run dev
```

Run through the complete flow:
1. `/roommate` → Create Account → verify page → complete both steps → "Set up my listing"
2. `/roommate/list-room` → fill all 3 steps → Publish → dashboard
3. `/roommate/dashboard` → My Listings tab → Extend date on r1 → save
4. `/listings` → confirm roommate badges on r1, r2
5. `/property/r1` → roommate card + Report → modal → submit
6. `/landlord` → amber CTA at bottom → links to `/roommate`
7. Dashboard chat tab → "Report user" link visible in chat header

- [ ] **Step 5: Commit**

```bash
git add src/app/components/shared/ChatInterface.tsx
git commit -m "feat: add Report user link to ChatInterface (Phase 3 complete)"
```

---

## Summary

| Phase | Tasks | Key deliverables |
|---|---|---|
| **1** | 1–7 | Types, mock data, useRoommateStore, auth page, verify wizard, routes |
| **2** | 8–14 | Dashboard shell, sidebar, 4 tabs, list-room wizard |
| **3** | 15–19 | ReportModal, PropertyCard badges, expiry filter, detail page roommate card, chat report link |
