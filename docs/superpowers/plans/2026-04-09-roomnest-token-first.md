# RoomNest Token-First + Full Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Register RoomNest brand colors as Tailwind v4 utilities, eliminate all inline color `style={{}}`, create missing shared infrastructure (types, hooks, components), and fill three major spec gaps (ChatPage Viewing Widget, LandlordDashboard New Property Modal, TenantDashboard sonner toast).

**Architecture:** Brand tokens added to `theme.css` @theme block first → shared types/hooks/components created → layout components fully rewritten with tokens → all 8 pages swept and spec gaps filled. Token substitution pattern: all `style={{ color: '#ef8354' }}` → `className="text-coral"`, etc.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v4 (CSS-based config, no `tailwind.config.ts`), shadcn/ui (Radix-based), React Router v7 (`import from 'react-router'`), sonner (toasts), lucide-react

---

## File Map

**Create:**
- `src/types/index.ts`
- `src/hooks/useWishlist.ts`
- `src/app/components/shared/StatusBadge.tsx`
- `src/app/components/shared/AmenityTag.tsx`
- `src/app/components/shared/PriceTag.tsx`

**Modify:**
- `src/styles/theme.css` — add 9 brand color tokens to `@theme inline` block
- `src/app/App.tsx` — add `<Toaster />` from sonner
- `src/app/components/layout/Navbar.tsx` — full rewrite with tokens
- `src/app/components/layout/Footer.tsx` — full rewrite with tokens
- `src/app/components/shared/PropertyCard.tsx` — full rewrite with tokens + RPZ badge + corrected prop interface
- `src/app/pages/HomePage.tsx` — token sweep + useWishlist hook
- `src/app/pages/ListingsPage.tsx` — token sweep + useWishlist hook
- `src/app/pages/PropertyDetailPage.tsx` — token sweep
- `src/app/pages/TenantLoginPage.tsx` — token sweep + OR divider + Google/Apple buttons
- `src/app/pages/LandlordSignupPage.tsx` — token sweep
- `src/app/pages/ChatPage.tsx` — token sweep + Viewing Request widget
- `src/app/pages/LandlordDashboard.tsx` — token sweep + List New Property 3-step modal
- `src/app/pages/TenantDashboard.tsx` — token sweep + sonner toast on ticket submit

---

## Token Substitution Reference

Every task follows these substitutions. Use Tailwind classes, never `style={{}}` for colors.

| Old inline style | New Tailwind class |
|---|---|
| `style={{ background: '#2d3142' }}` | `className="bg-jet"` |
| `style={{ color: '#2d3142' }}` | `className="text-jet"` |
| `style={{ background: '#ef8354' }}` | `className="bg-coral"` |
| `style={{ color: '#ef8354' }}` | `className="text-coral"` |
| `style={{ background: '#9c441a' }}` | `className="bg-coral-dark"` |
| `style={{ color: '#4f5d75' }}` | `className="text-slate-brand"` |
| `style={{ background: '#4f5d75' }}` | `className="bg-slate-brand"` |
| `style={{ background: '#faf8ff' }}` | `className="bg-surface"` |
| `style={{ background: '#f3f2ff' }}` | `className="bg-surface-low"` |
| `style={{ color: '#171b2b' }}` | `className="text-ink"` |
| `border: '1px solid rgba(220,193,183,0.2)'` | `className="border border-ghost/20"` |
| `border: '1px solid rgba(220,193,183,0.3)'` | `className="border border-ghost/30"` |
| `onMouseEnter/Leave toggling coral bg` | Use `hover:bg-coral-dark` Tailwind variant |
| `boxShadow: '0 2px 8px rgba(23,27,43,0.04)'` | `className="shadow-[0_2px_8px_rgba(23,27,43,0.04)]"` |
| `boxShadow: '0 4px 40px rgba(23,27,43,0.08)'` | `className="shadow-[0_4px_40px_rgba(23,27,43,0.08)]"` |

Non-color inline styles (backgroundImage, specific dimensions, clamp font sizes) may remain as `style={{}}`.

---

## Task 1: Add brand color tokens to Tailwind v4 theme

**Files:**
- Modify: `src/styles/theme.css`

- [ ] **Step 1: Open `src/styles/theme.css`. Locate the `@theme inline {` block (around line 42). Add 9 brand color tokens at the very end of that block, before the closing `}`:**

```css
  --color-jet: #2d3142;
  --color-slate-brand: #4f5d75;
  --color-coral: #ef8354;
  --color-coral-dark: #9c441a;
  --color-surface: #faf8ff;
  --color-surface-low: #f3f2ff;
  --color-surface-card: #ffffff;
  --color-ink: #171b2b;
  --color-ghost: #dcc1b7;
```

The end of `@theme inline {` should now read:
```css
  --color-sidebar-ring: var(--sidebar-ring);
  --color-jet: #2d3142;
  --color-slate-brand: #4f5d75;
  --color-coral: #ef8354;
  --color-coral-dark: #9c441a;
  --color-surface: #faf8ff;
  --color-surface-low: #f3f2ff;
  --color-surface-card: #ffffff;
  --color-ink: #171b2b;
  --color-ghost: #dcc1b7;
}
```

- [ ] **Step 2: Verify the dev server starts without errors**

Run: `npm run dev`
Expected: Server starts on http://localhost:5173. App looks the same as before (tokens registered, not yet used).

- [ ] **Step 3: Commit**

```bash
git add src/styles/theme.css
git commit -m "style: add RoomNest brand color tokens to Tailwind v4 theme"
```

---

## Task 2: Create TypeScript interfaces

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Create `src/types/index.ts`:**

```typescript
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

- [ ] **Step 2: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add shared TypeScript interfaces to src/types/index.ts"
```

---

## Task 3: Create useWishlist hook

**Files:**
- Create: `src/hooks/useWishlist.ts`

- [ ] **Step 1: Create `src/hooks/useWishlist.ts`:**

```typescript
import { useState, useCallback } from 'react';

const STORAGE_KEY = 'roomnest_wishlist';

function loadFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(ids: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>(loadFromStorage);

  const toggle = useCallback((id: string) => {
    setWishlist((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      saveToStorage(next);
      return next;
    });
  }, []);

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  return { wishlist, toggle, isWishlisted };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useWishlist.ts
git commit -m "feat: add useWishlist hook with localStorage persistence"
```

---

## Task 4: Create shared UI components

**Files:**
- Create: `src/app/components/shared/StatusBadge.tsx`
- Create: `src/app/components/shared/AmenityTag.tsx`
- Create: `src/app/components/shared/PriceTag.tsx`

- [ ] **Step 1: Create `src/app/components/shared/StatusBadge.tsx`:**

```typescript
interface StatusBadgeProps {
  status: 'Open' | 'In Progress' | 'Resolved' | 'Active' | 'Overdue' | 'active' | 'overdue';
}

const STATUS_MAP: Record<string, { bg: string; text: string; label: string }> = {
  Open: { bg: 'bg-[#fef3ee]', text: 'text-coral', label: 'Open' },
  'In Progress': { bg: 'bg-[#fffbeb]', text: 'text-amber-500', label: 'In Progress' },
  Resolved: { bg: 'bg-green-50', text: 'text-green-600', label: 'Resolved' },
  Active: { bg: 'bg-green-50', text: 'text-green-600', label: 'Active' },
  active: { bg: 'bg-green-50', text: 'text-green-600', label: 'Active' },
  Overdue: { bg: 'bg-red-50', text: 'text-red-600', label: 'Overdue' },
  overdue: { bg: 'bg-red-50', text: 'text-red-600', label: 'Overdue' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_MAP[status] ?? {
    bg: 'bg-surface-low',
    text: 'text-slate-brand',
    label: status,
  };
  return (
    <span
      className={`text-xs font-bold tracking-[0.04em] uppercase px-2.5 py-0.5 rounded-full ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
```

- [ ] **Step 2: Create `src/app/components/shared/AmenityTag.tsx`:**

```typescript
interface AmenityTagProps {
  label: string;
}

export function AmenityTag({ label }: AmenityTagProps) {
  return (
    <span className="text-xs font-bold tracking-[0.05em] uppercase bg-surface-low text-slate-brand px-3 py-1 rounded-full">
      {label}
    </span>
  );
}
```

- [ ] **Step 3: Create `src/app/components/shared/PriceTag.tsx`:**

```typescript
interface PriceTagProps {
  price: number;
  size?: 'sm' | 'lg';
}

export function PriceTag({ price, size = 'sm' }: PriceTagProps) {
  return (
    <span>
      <span
        className={`font-bold text-coral ${
          size === 'lg' ? 'text-[3.5rem] tracking-[-0.02em]' : 'text-xl'
        }`}
      >
        €{price.toLocaleString()}
      </span>
      <span className="text-xs font-medium text-slate-brand ml-1">/mo</span>
    </span>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/components/shared/StatusBadge.tsx src/app/components/shared/AmenityTag.tsx src/app/components/shared/PriceTag.tsx
git commit -m "feat: add StatusBadge, AmenityTag, PriceTag shared components"
```

---

## Task 5: Wire Sonner Toaster in App.tsx

**Files:**
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Replace `src/app/App.tsx` with:**

```typescript
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/App.tsx
git commit -m "feat: wire Sonner Toaster in App.tsx"
```

---

## Task 6: Rewrite Navbar.tsx with brand tokens

**Files:**
- Modify: `src/app/components/layout/Navbar.tsx`

- [ ] **Step 1: Replace `src/app/components/layout/Navbar.tsx` with:**

```typescript
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-jet/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-1">
            <span className="text-coral text-xl leading-none">•</span>
            <span className="text-white font-bold text-lg tracking-tight">RoomNest</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/listings"
              className={`text-sm font-medium transition-colors pb-0.5 border-b-2 ${
                isActive('/listings')
                  ? 'text-coral border-coral'
                  : 'text-white/75 border-transparent hover:text-white'
              }`}
            >
              Listings
            </Link>
            <Link
              to="/#how-it-works"
              className="text-sm font-medium text-white/75 hover:text-white transition-colors"
            >
              How it works
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors px-3 py-2"
            >
              Login
            </Link>
            <Link
              to="/landlord"
              className="text-sm font-semibold rounded-lg px-4 py-2 border border-coral text-coral hover:bg-coral hover:text-white transition-colors"
            >
              Landlord
            </Link>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-jet">
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link
              to="/listings"
              onClick={() => setMobileOpen(false)}
              className="text-white/80 font-medium text-sm hover:text-white"
            >
              Listings
            </Link>
            <Link
              to="/#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="text-white/80 font-medium text-sm hover:text-white"
            >
              How it works
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="text-white/80 font-medium text-sm hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/landlord"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold rounded-lg px-4 py-2 w-fit border border-coral text-coral"
            >
              Landlord
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Verify: open http://localhost:5173. Navbar has jet bg, coral dot, coral-outlined Landlord button. No `style={{}}` for colors.**

- [ ] **Step 3: Commit**

```bash
git add src/app/components/layout/Navbar.tsx
git commit -m "style: rewrite Navbar with brand token Tailwind classes"
```

---

## Task 7: Rewrite Footer.tsx with brand tokens

**Files:**
- Modify: `src/app/components/layout/Footer.tsx`

- [ ] **Step 1: Replace `src/app/components/layout/Footer.tsx` with:**

```typescript
import { Globe, AtSign, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-jet">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-coral text-xl leading-none">•</span>
              <span className="text-white font-bold text-base tracking-tight">RoomNest</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Redefining urban living through curated properties and intelligent management.
            </p>
            <div className="flex gap-3 mt-5">
              <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.08] hover:bg-white/15 transition-colors">
                <Globe size={14} className="text-white/60" />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.08] hover:bg-white/15 transition-colors">
                <AtSign size={14} className="text-white/60" />
              </button>
            </div>
          </div>

          <div>
            <p className="text-white text-xs font-bold tracking-[0.08em] uppercase mb-4">Platform</p>
            <div className="flex flex-col gap-3">
              {['Listings', 'How it works', 'Pricing', 'Case Studies'].map((item) => (
                <Link key={item} to="/" className="text-white/60 text-sm hover:text-white/90 transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white text-xs font-bold tracking-[0.08em] uppercase mb-4">Resources</p>
            <div className="flex flex-col gap-3">
              {['Dublin Guide', 'Tenant Rights', 'Property Management', 'Help Center'].map((item) => (
                <Link key={item} to="/" className="text-white/60 text-sm hover:text-white/90 transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white text-xs font-bold tracking-[0.08em] uppercase mb-4">Contact</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Phone size={13} />
                <span>+353 1 234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Mail size={13} />
                <span>hello@roomnest.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin size={13} />
                <span>St. Stephen's Green, Dublin 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">© 2024 Roomnest Technologies. All rights reserved.</p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
              <Link key={item} to="/" className="text-white/40 text-xs hover:text-white/70 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/layout/Footer.tsx
git commit -m "style: rewrite Footer with brand token Tailwind classes"
```

---

## Task 8: Rewrite PropertyCard with tokens, RPZ badge, corrected props

**Files:**
- Modify: `src/app/components/shared/PropertyCard.tsx`

- [ ] **Step 1: Replace `src/app/components/shared/PropertyCard.tsx` with:**

```typescript
import { MapPin, Heart, Bed, Bath, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { Property } from '../../../types';

interface PropertyCardProps {
  property: Property;
  onWishlistToggle?: (id: string) => void;
  isWishlisted?: boolean;
}

export function PropertyCard({ property, onWishlistToggle, isWishlisted = false }: PropertyCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl overflow-hidden cursor-pointer transition-shadow shadow-[0_2px_16px_rgba(23,27,43,0.04)] hover:shadow-[0_4px_40px_rgba(23,27,43,0.08)]"
      onClick={() => navigate(`/property/${property.id}`)}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Type + RPZ badges stacked top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <div className="px-2 py-1 rounded text-xs font-bold tracking-[0.05em] uppercase text-white bg-jet/85">
            {property.type}
          </div>
          {property.isRPZ && (
            <div className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase text-white bg-coral">
              RPZ AREA
            </div>
          )}
        </div>

        {/* Heart toggle top-right */}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle?.(property.id);
          }}
        >
          <Heart
            size={16}
            fill={isWishlisted ? '#ef8354' : 'none'}
            stroke={isWishlisted ? '#ef8354' : '#4f5d75'}
          />
        </button>

        {/* Let Agreed overlay */}
        {!property.available && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-sm tracking-wider uppercase bg-black/60 px-3 py-1 rounded">
              Let Agreed
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-base tracking-tight text-jet">{property.title}</h3>

        <div className="flex items-center gap-1 mt-1 mb-3">
          <MapPin size={12} className="text-slate-brand" />
          <span className="text-sm text-slate-brand">{property.location}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {property.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="text-xs font-bold tracking-[0.04em] uppercase px-2.5 py-0.5 rounded-full bg-surface-low text-slate-brand"
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-3 text-xs text-slate-brand">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed size={12} />
              {property.bedrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath size={12} />
            {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 size={12} />
            {property.area}m²
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-ghost/20">
          <div>
            <span className="text-xl font-bold text-coral">
              €{property.price.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-brand ml-1">/mo</span>
          </div>
          <button className="text-xs font-bold tracking-[0.05em] uppercase text-coral hover:text-coral-dark transition-colors">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify: open http://localhost:5173. Featured listings render correctly. Property 1, 2, 3 show RPZ AREA badge (all have `isRPZ: true`). Heart toggle works.**

- [ ] **Step 3: Commit**

```bash
git add src/app/components/shared/PropertyCard.tsx
git commit -m "style: rewrite PropertyCard with tokens, RPZ AREA badge, corrected prop interface"
```

---

## Task 9: Token sweep HomePage + useWishlist hook

**Files:**
- Modify: `src/app/pages/HomePage.tsx`

- [ ] **Step 1: Replace `src/app/pages/HomePage.tsx` with:**

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Users, Building2 } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PropertyCard } from '../components/shared/PropertyCard';
import { mockProperties } from '../../data/mockProperties';
import { useWishlist } from '../../hooks/useWishlist';

const HERO_PREVIEW_IMAGE = 'https://images.unsplash.com/photo-1658997302557-afce9c5c3e24?w=600&q=80';

export function HomePage() {
  const { isWishlisted, toggle } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const featuredProperties = mockProperties.slice(0, 3);
  const quickFilters = ['Dublin', 'Cork', 'Galway', 'Limerick', 'Student friendly', 'Couples welcome'];

  return (
    <div className="bg-surface text-ink" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="bg-jet relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
            <div className="flex-1">
              <h1
                className="font-bold leading-none tracking-[-0.02em] text-white mb-4"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
              >
                Find your room in Ireland.{' '}
                <span className="text-coral">Manage it from day one.</span>
              </h1>
              <p className="text-base mb-6 leading-relaxed text-white/70">
                Real listings. Real-time chat with landlords. Rent reminders and maintenance — all in one app.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 max-w-lg">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-sm font-medium outline-none bg-white/[0.12] border border-white/15 text-white placeholder:text-white/40"
                    placeholder="Dublin, Ireland"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => navigate('/listings')}
                  className="px-6 py-3 rounded-lg font-semibold text-sm text-white bg-coral hover:bg-coral-dark transition-colors whitespace-nowrap"
                >
                  Search Rooms
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {quickFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => navigate('/listings')}
                    className="text-sm rounded-full px-4 py-1.5 bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero preview card */}
            <div className="hidden lg:block flex-shrink-0 w-72 -rotate-1">
              <div className="bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <div className="relative">
                  <img src={HERO_PREVIEW_IMAGE} alt="Bright Studio Ranelagh" className="w-full h-44 object-cover" />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-bold bg-coral">
                    €950/mo
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-bold text-sm text-jet">Bright Studio, Ranelagh</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-slate-brand">📍 Dublin 6, Ireland</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-surface-low text-slate-brand">
                      Private
                    </span>
                    <span className="text-xs text-coral">♥ 129</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED LISTINGS ─── */}
      <section className="bg-surface-low py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold tracking-[0.08em] uppercase mb-1 text-coral">
                Premium Selection
              </p>
              <h2 className="font-bold tracking-[-0.02em] text-[1.75rem] text-jet">
                Featured Listings
              </h2>
            </div>
            <button
              onClick={() => navigate('/listings')}
              className="text-sm font-semibold text-coral hover:text-coral-dark transition-colors"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onWishlistToggle={toggle}
                isWishlisted={isWishlisted(prop.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold tracking-[-0.02em] mb-3 text-[1.75rem] text-jet">How it Works</h2>
            <p className="text-base max-w-md mx-auto leading-relaxed text-slate-brand">
              Whether you are looking for your next home or managing a portfolio,
              Roomnest provides the tools for a seamless experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* For Tenants */}
            <div className="rounded-xl p-8 border border-ghost/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-coral">
                  <Users size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-lg text-jet">For Tenants</h3>
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { n: '01', title: 'Curated Search', desc: 'Browse pre-vetted listings that meet high architectural and comfort standards.' },
                  { n: '02', title: 'Smart Viewings', desc: 'Schedule virtual or in-person tours directly through our integrated calendar system.' },
                  { n: '03', title: 'Seamless Onboarding', desc: 'Complete your application and digital lease signing in minutes, not days.' },
                ].map((step) => (
                  <div key={step.n} className="flex gap-4">
                    <span className="text-sm font-bold shrink-0 w-6 text-coral">{step.n}</span>
                    <div>
                      <p className="font-semibold text-sm text-jet">{step.title}</p>
                      <p className="text-sm leading-relaxed mt-0.5 text-slate-brand">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Landlords */}
            <div className="rounded-xl p-8 bg-jet">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-coral/20">
                  <Building2 size={20} className="text-coral" />
                </div>
                <h3 className="font-bold text-lg text-white">For Landlords</h3>
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { n: '01', title: 'Premium Listing', desc: 'We showcase your property with professional photography and high-end descriptions.' },
                  { n: '02', title: 'Vetting & Compliance', desc: 'Advanced background checks and automated compliance monitoring for peace of mind.' },
                  { n: '03', title: 'Financial Suite', desc: 'Instant rent collection, automated tax reports, and maintenance budget tracking.' },
                ].map((step) => (
                  <div key={step.n} className="flex gap-4">
                    <span className="text-sm font-bold shrink-0 w-6 text-coral">{step.n}</span>
                    <div>
                      <p className="font-semibold text-sm text-white">{step.title}</p>
                      <p className="text-sm leading-relaxed mt-0.5 text-white/60">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-coral">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="font-bold mb-3 leading-tight text-white tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
          >
            Start your Dublin journey.
          </h2>
          <p className="text-base mb-8 text-white/85">
            Join 5,000+ residents who found their perfect curated home through Roomnest.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              className="flex-1 px-5 py-3 rounded-lg text-sm font-medium outline-none bg-white text-jet placeholder:text-slate-brand/50"
              placeholder="Your email address"
            />
            <button className="px-6 py-3 rounded-lg font-semibold text-sm text-white bg-jet hover:bg-jet/90 transition-colors whitespace-nowrap">
              Join Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify: http://localhost:5173. Jet hero, coral CTA section, featured listings on surface-low. Heart toggle persists across page navigation (localStorage). Zero `style={{color/background}}` in this file.**

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/HomePage.tsx
git commit -m "style: token sweep HomePage + useWishlist hook integration"
```

---

## Task 10: Token sweep ListingsPage + useWishlist hook

**Files:**
- Modify: `src/app/pages/ListingsPage.tsx`

- [ ] **Step 1: Read current `src/app/pages/ListingsPage.tsx`. Apply the token substitution table throughout the file. The specific changes are:**

  **Imports — add:**
  ```typescript
  import { useWishlist } from '../../hooks/useWishlist';
  ```

  **State — replace local wishlist state:**
  ```typescript
  // Remove:
  const [wishlist, setWishlist] = useState<string[]>([]);
  const toggleWishlist = (id: string) => { ... };

  // Add:
  const { isWishlisted, toggle } = useWishlist();
  ```

  **PropertyCard usage — update prop names:**
  ```typescript
  // Before:
  onWishlist={toggleWishlist}
  isWishlisted={wishlist.includes(prop.id)}

  // After:
  onWishlistToggle={toggle}
  isWishlisted={isWishlisted(prop.id)}
  ```

  **Root div:** Remove `style={{ fontFamily, background, color }}`. Add `className="bg-surface text-ink min-h-screen"`.

  **Sort buttons — replace inline style conditional:**
  ```typescript
  className={`px-5 py-2 rounded-lg text-xs font-bold tracking-[0.06em] uppercase transition-colors ${
    sortBy === 'newest'
      ? 'bg-coral text-white'
      : 'border border-ghost/40 text-slate-brand hover:bg-surface-low'
  }`}
  ```

  **Apply Filters button:**
  ```typescript
  className="w-full py-3 rounded-lg font-semibold text-sm text-white bg-coral hover:bg-coral-dark transition-colors"
  ```
  Remove the `onMouseEnter`/`onMouseLeave` handlers on this button.

  **Pagination active/inactive:**
  ```typescript
  className={`w-9 h-9 rounded-lg font-semibold text-sm transition-colors ${
    page === currentPage ? 'bg-coral text-white' : 'bg-surface-low text-jet hover:bg-surface-low/70'
  }`}
  ```

  **Sidebar aside:**
  ```typescript
  className="hidden lg:block shrink-0 rounded-xl p-6 bg-white shadow-[0_2px_16px_rgba(23,27,43,0.04)] self-start sticky top-20"
  style={{ width: 240 }}
  ```
  (Keep `style={{ width: 240 }}` — this is a dimension, not a color.)

  **Concierge Chat button:**
  ```typescript
  className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-full text-white text-sm font-semibold z-40 bg-coral shadow-[0_4px_20px_rgba(239,131,84,0.4)]"
  ```
  Remove `onMouseEnter`/`onMouseLeave` handlers.

  **Concierge Chat popup header:**
  ```typescript
  className="px-4 py-3 flex items-center justify-between bg-coral"
  ```

  **All remaining `style={{ color/background }}` patterns:** apply the token reference table.

- [ ] **Step 2: Verify: http://localhost:5173/listings. Filter sidebar shows. Sort buttons switch between coral-filled and ghost. Pagination uses coral for active page. Heart toggle works and persists.**

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/ListingsPage.tsx
git commit -m "style: token sweep ListingsPage + useWishlist hook integration"
```

---

## Task 11: Token sweep PropertyDetailPage

**Files:**
- Modify: `src/app/pages/PropertyDetailPage.tsx`

- [ ] **Step 1: Read current `src/app/pages/PropertyDetailPage.tsx`. Apply the token substitution table. Specific changes:**

  **Root div:** `className="bg-surface text-ink"` — remove `style={{ fontFamily, background, color }}`.

  **Not-found fallback button:** `className="mt-4 px-6 py-3 rounded-lg text-white font-semibold bg-coral hover:bg-coral-dark transition-colors"` — remove `onMouseEnter`/`onMouseLeave`.

  **RPZ badge (currently `style={{ background: '#d4183d' }}`):**
  ```typescript
  className="absolute top-4 left-4 px-2 py-0.5 text-xs font-bold tracking-widest uppercase text-white rounded bg-red-600"
  ```

  **Right column sticky card** — confirm it has `sticky top-24` on the wrapping div.

  **Request Viewing button:**
  ```typescript
  className="w-full px-6 py-3 rounded-lg bg-coral hover:bg-coral-dark text-white font-semibold transition-colors"
  ```

  **Save to Wishlist button:**
  ```typescript
  className="w-full px-6 py-3 rounded-lg border border-ghost/20 text-jet font-medium hover:bg-surface-low transition-colors"
  ```

  **Chat with Landlord button:**
  ```typescript
  className="w-full px-6 py-3 rounded-lg border border-ghost/20 text-jet font-medium hover:bg-surface-low transition-colors"
  ```

  **Available badge:**
  ```typescript
  className="text-xs font-bold tracking-[0.05em] uppercase px-2.5 py-1 rounded-full bg-green-50 text-green-600"
  ```

  **Amenity pills:**
  ```typescript
  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-ghost/20 text-sm text-jet"
  ```

  **Transport section — add placeholder tiles before each transport label:**
  ```typescript
  {property.transport.map((t) => (
    <div key={t}>
      <div className="h-20 rounded-lg bg-jet/10 mb-2" />
      <p className="text-sm text-slate-brand">{t}</p>
    </div>
  ))}
  ```

  **Back button:** `className="flex items-center gap-1 text-sm font-medium mb-6 transition-colors text-slate-brand hover:text-jet"`

  **All remaining `style={{ color/background }}` patterns:** apply the token reference table.

- [ ] **Step 2: Verify: http://localhost:5173/property/1. 2-col layout on desktop. Sticky right card. RPZ red badge. Amenity ghost-border pills. Transport placeholder tiles. No `style={{color/background}}`.**

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/PropertyDetailPage.tsx
git commit -m "style: token sweep PropertyDetailPage + sticky card + transport tiles + amenity pills"
```

---

## Task 12: Token sweep TenantLoginPage + OR divider + social buttons

**Files:**
- Modify: `src/app/pages/TenantLoginPage.tsx`

- [ ] **Step 1: Replace `src/app/pages/TenantLoginPage.tsx` with:**

```typescript
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

export function TenantLoginPage() {
  const [activeTab, setActiveTab] = useState<'signin' | 'create'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => navigate('/tenant-dashboard');

  return (
    <div className="min-h-screen bg-surface flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Radial gradient corners */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(239,131,84,0.08) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(239,131,84,0.06) 0%, transparent 60%)',
        }}
      />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1">
            <span className="text-coral text-2xl leading-none">•</span>
            <span className="font-bold text-2xl tracking-tight text-jet">RoomNest</span>
          </Link>
          <p className="mt-1 text-sm text-slate-brand">Editorial Living Redefined</p>
        </div>

        <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(23,27,43,0.08)]">
          {/* Tabs */}
          <div className="flex border-b border-ghost/20">
            {(['signin', 'create'] as const).map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-4 text-xs font-bold tracking-[0.08em] uppercase transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'text-jet border-jet'
                    : 'text-slate-brand border-transparent hover:text-jet'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <div className="p-8 flex flex-col gap-5">
            {activeTab === 'create' && (
              <div>
                <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full border-0 border-b border-ghost/30 rounded-none bg-transparent px-0 py-2 text-sm text-jet outline-none focus:border-coral transition-colors placeholder:text-slate-brand/40"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border-0 border-b border-ghost/30 rounded-none bg-transparent px-0 py-2 text-sm text-jet outline-none focus:border-coral transition-colors placeholder:text-slate-brand/40"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand">
                  Password
                </label>
                {activeTab === 'signin' ? (
                  <button className="text-xs font-bold tracking-[0.05em] uppercase text-coral hover:text-coral-dark transition-colors">
                    Forgot Password?
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-slate-brand hover:text-jet transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                )}
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full border-0 border-b border-ghost/30 rounded-none bg-transparent px-0 py-2 text-sm text-jet outline-none focus:border-coral transition-colors placeholder:text-slate-brand/40"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full py-3 rounded-lg bg-coral hover:bg-coral-dark text-white font-semibold text-sm transition-colors"
              onClick={handleSubmit}
            >
              {activeTab === 'signin' ? 'Sign in' : 'Create Account'}
            </button>

            {/* OR divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-ghost/30" />
              <span className="text-xs font-bold tracking-[0.05em] uppercase text-slate-brand">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-ghost/30" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-ghost/20 text-jet text-sm font-medium hover:bg-surface-low transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-ghost/20 text-jet text-sm font-medium hover:bg-surface-low transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.35.73 3.15.78 1.2-.24 2.35-.93 3.62-.84 1.55.12 2.72.72 3.47 1.84-3.17 1.9-2.42 5.77.76 6.88-.58 1.58-1.33 3.14-3 4.22zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Apple
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify: http://localhost:5173/login. Tabs switch. Bottom-border inputs. OR divider with ghost lines. Google/Apple buttons side by side. Sign in navigates to /tenant-dashboard.**

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/TenantLoginPage.tsx
git commit -m "style: token sweep TenantLoginPage + OR divider + Google/Apple social buttons"
```

---

## Task 13: Token sweep LandlordSignupPage

**Files:**
- Modify: `src/app/pages/LandlordSignupPage.tsx`

- [ ] **Step 1: Read current `src/app/pages/LandlordSignupPage.tsx`. Apply the token substitution table. Specific changes:**

  **Left panel div:** `className="relative flex flex-col justify-between p-8 lg:p-12 bg-jet"` — remove `style={{ background: '#2d3142', flex: '0 0 50%', minHeight: '40vh' }}`, keep `style={{ flex: '0 0 50%', minHeight: '40vh' }}` (dimension, not color).

  **Background image overlay:** Keep `style={{ backgroundImage, backgroundSize, backgroundPosition, opacity }}` — these are not color tokens.

  **Logo:** `<span className="text-coral text-xl leading-none">•</span>` and `<span className="text-white font-bold text-xl tracking-tight">RoomNest.</span>`

  **Main heading lines:** Each `<p>` gets `className="text-white font-bold ..."` with display-lg size via `style={{ fontSize: ... }}`.

  **Feature bullets icon wrapper:** `className="w-10 h-10 rounded-lg bg-slate-brand flex items-center justify-center shrink-0"` with icon `className="text-coral"`.

  **Coral divider line at bottom left:** `<div className="flex items-center gap-3"><div className="w-8 h-px bg-coral" /><p className="text-xs font-bold tracking-[0.05em] uppercase text-white">Premium Landlord Suite</p></div>`

  **Right panel:** `className="bg-white flex flex-col justify-center p-8 lg:p-12 lg:flex-1"`

  **Heading:** `className="font-bold text-[1.75rem] tracking-[-0.02em] text-jet mb-1"`

  **Subtitle:** `className="text-slate-brand text-sm mb-6"`

  **Remove `inputStyle` const.** Replace every `style={inputStyle}` with:
  ```typescript
  className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
  ```

  **Submit button:**
  ```typescript
  className="w-full py-3.5 rounded-lg bg-coral hover:bg-coral-dark text-white font-semibold text-sm transition-colors"
  ```
  Remove `onMouseEnter`/`onMouseLeave` handlers.

  **Footer text:** `className="text-xs text-slate-brand/60 text-center mt-4"`

  **OR divider + Google/Apple buttons** (already in the existing file — apply same token classes as Task 12).

- [ ] **Step 2: Verify: http://localhost:5173/landlord. Dark left panel with blurred bg image, right white form. Input borders show. Submit button coral.**

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/LandlordSignupPage.tsx
git commit -m "style: token sweep LandlordSignupPage"
```

---

## Task 14: Token sweep ChatPage + add Viewing Request Widget

**Files:**
- Modify: `src/app/pages/ChatPage.tsx`

- [ ] **Step 1: Replace `src/app/pages/ChatPage.tsx` with:**

```typescript
import { useState, useRef, useEffect } from 'react';
import { Search, Send, Plus, ChevronLeft, CheckCheck, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../components/layout/Navbar';
import { Calendar } from '../components/ui/calendar';
import { mockConversations } from '../../data/mockProperties';

type Message = { id: string; sender: string; text: string; time: string; read: boolean };
type Conversation = (typeof mockConversations)[0];

const TIME_SLOTS = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];

function ViewingRequestWidget({
  onConfirm,
  onDecline,
}: {
  onConfirm: () => void;
  onDecline: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <div className="my-3 mx-auto max-w-xs w-full bg-white rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(23,27,43,0.08)] border border-ghost/20">
      <div className="px-4 py-3 bg-coral flex items-center gap-2">
        <CalendarIcon size={14} className="text-white" />
        <span className="text-white font-semibold text-sm">Schedule a Viewing</span>
      </div>
      <div className="p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={{ before: new Date() }}
          className="rounded-md"
        />
        <div className="mt-4">
          <p className="text-xs font-bold tracking-[0.05em] uppercase text-slate-brand mb-2">
            Select Time
          </p>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                className={`py-2 rounded-lg text-xs font-semibold transition-colors ${
                  selectedSlot === slot
                    ? 'bg-coral text-white'
                    : 'bg-surface-low text-jet hover:bg-surface-low/70'
                }`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 py-2.5 rounded-lg bg-coral hover:bg-coral-dark text-white text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!selectedDate || !selectedSlot}
            onClick={onConfirm}
          >
            Confirm Viewing
          </button>
          <button
            className="px-4 py-2.5 rounded-lg border border-ghost/20 text-jet text-sm font-medium hover:bg-surface-low transition-colors"
            onClick={onDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConv, setActiveConv] = useState<Conversation>(mockConversations[0]);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);
  const [showViewingWidget, setShowViewingWidget] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv.messages, showViewingWidget]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'landlord',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };

    const updatedConvs = conversations.map((c) => {
      if (c.id === activeConv.id) {
        const updated = {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessage: newMsg.text,
          time: newMsg.time,
        };
        setActiveConv(updated);
        return updated;
      }
      return c;
    });
    setConversations(updatedConvs);
    setInputText('');

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'tenant',
        text: 'Thanks for getting back to me! That works great.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConv.id) {
            const updated = {
              ...c,
              messages: [...c.messages, newMsg, reply],
              lastMessage: reply.text,
              time: reply.time,
            };
            setActiveConv(updated);
            return updated;
          }
          return c;
        })
      );
    }, 1500);
  };

  const filteredConvs = conversations.filter(
    (c) =>
      c.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.property.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div className="flex-1 flex overflow-hidden bg-surface">
        {/* Conversation list */}
        <aside
          className={`shrink-0 flex flex-col border-r border-ghost/20 bg-white ${
            isMobileListVisible ? 'flex' : 'hidden'
          } md:flex`}
          style={{ width: 300 }}
        >
          <div className="p-4 border-b border-ghost/20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-base text-jet">Messages</h2>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-low hover:bg-surface-low/70 transition-colors">
                <Plus size={14} className="text-jet" />
              </button>
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-brand" />
              <input
                className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none bg-surface-low text-jet placeholder:text-slate-brand/60"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConvs.map((conv) => (
              <div
                key={conv.id}
                className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border-l-2 ${
                  conv.id === activeConv.id
                    ? 'bg-surface-low border-coral'
                    : 'border-transparent hover:bg-surface'
                }`}
                onClick={() => {
                  setActiveConv(conv);
                  setIsMobileListVisible(false);
                }}
              >
                <img
                  src={conv.tenantAvatar}
                  alt={conv.tenantName}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm truncate text-jet">{conv.tenantName}</span>
                    <span className="text-xs shrink-0 ml-2 text-slate-brand">{conv.time}</span>
                  </div>
                  <p className="text-xs truncate mt-0.5 text-slate-brand">{conv.property}</p>
                  <p className="text-xs truncate mt-0.5 text-slate-brand">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 bg-coral">
                    {conv.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Chat area */}
        <main className={`flex-1 flex flex-col ${!isMobileListVisible ? 'flex' : 'hidden'} md:flex`}>
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3.5 shrink-0 bg-white border-b border-ghost/20">
            <button className="md:hidden mr-1" onClick={() => setIsMobileListVisible(true)}>
              <ChevronLeft size={20} className="text-slate-brand" />
            </button>
            <img
              src={activeConv.tenantAvatar}
              alt={activeConv.tenantName}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm text-jet">{activeConv.tenantName}</p>
              <p className="text-xs text-slate-brand">{activeConv.property}</p>
            </div>
            <div className="ml-auto">
              <span className="text-xs font-bold tracking-[0.04em] uppercase px-2.5 py-1 rounded-full bg-surface-low text-slate-brand">
                Active Tenant
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
            {activeConv.messages.map((msg) => {
              const isLandlord = msg.sender === 'landlord';
              return (
                <div key={msg.id} className={`flex ${isLandlord ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs px-4 py-2.5 text-sm shadow-[0_1px_4px_rgba(23,27,43,0.04)] ${
                      isLandlord
                        ? 'bg-coral text-white rounded-[16px_16px_4px_16px]'
                        : 'bg-white text-jet border border-ghost/25 rounded-[16px_16px_16px_4px]'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <div
                      className={`flex items-center gap-1 mt-1 ${
                        isLandlord ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <span className="text-[10px] font-medium opacity-70">{msg.time}</span>
                      {isLandlord && <CheckCheck size={12} className="opacity-70" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Viewing Request Widget — inline in message stream */}
            {showViewingWidget && (
              <ViewingRequestWidget
                onConfirm={() => {
                  setShowViewingWidget(false);
                  toast.success('Viewing confirmed — added to Google Calendar');
                }}
                onDecline={() => setShowViewingWidget(false)}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-5 py-4 shrink-0 bg-white border-t border-ghost/20">
            <div className="flex items-center gap-3">
              <input
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none bg-surface-low text-jet border border-transparent focus:border-coral transition-colors placeholder:text-slate-brand/60"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-coral hover:bg-coral-dark transition-colors"
                onClick={sendMessage}
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify: http://localhost:5173/chat/c1. Message list on left, active conversation highlighted with coral left border. Viewing Request Widget shows in the message stream with Calendar, time slot chips. Selecting a date + slot enables Confirm button. Clicking Confirm fires toast and hides the widget.**

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/ChatPage.tsx
git commit -m "feat: token sweep ChatPage + add Viewing Request Widget with Calendar and sonner toast"
```

---

## Task 15: Token sweep LandlordDashboard + add List New Property 3-step modal

**Files:**
- Modify: `src/app/pages/LandlordDashboard.tsx`

- [ ] **Step 1: Add these imports to the top of `src/app/pages/LandlordDashboard.tsx`:**

```typescript
import { toast } from 'sonner';
import { StatusBadge } from '../components/shared/StatusBadge';
```

- [ ] **Step 2: Add modal state variables after the existing state declarations in `LandlordDashboard`:**

```typescript
const [showNewPropertyModal, setShowNewPropertyModal] = useState(false);
const [modalStep, setModalStep] = useState(1);
const [newProp, setNewProp] = useState({
  address: '',
  eircode: '',
  type: 'Double Room',
  rent: '',
  bedrooms: '1',
  bathrooms: '1',
  amenities: [] as string[],
  houseRules: '',
});
const isRPZ = newProp.eircode.trim().length > 0;
```

- [ ] **Step 3: Apply the token substitution table throughout the entire file. Key structural changes:**

  **Root div:** `className="min-h-screen flex flex-col bg-surface-low"`

  **Top bar:** `className="h-14 flex items-center justify-between px-4 sm:px-6 shrink-0 z-30 sticky top-0 bg-jet"`

  **Sidebar (left panel):** `className="hidden lg:flex w-[260px] shrink-0 flex-col bg-slate-brand h-screen sticky top-0"`

  **Active sidebar item:**
  ```typescript
  className="flex items-center gap-3 px-4 py-3 rounded-l-xl ml-2 font-semibold text-jet bg-surface cursor-pointer"
  ```

  **Inactive sidebar item:**
  ```typescript
  className="flex items-center gap-3 px-4 py-3 rounded-l-xl ml-2 text-white/70 hover:text-white transition-colors cursor-pointer"
  ```

  **RTB banner (not dismissed):**
  ```typescript
  <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border-l-4 border-coral mb-5">
    <span className="text-coral shrink-0 mt-0.5">ℹ️</span>
    <p className="text-sm text-jet flex-1">
      Remember to register this tenancy with the RTB within 1 month of commencement.
    </p>
    <button onClick={() => setRtbDismissed(true)} className="text-slate-brand hover:text-jet transition-colors shrink-0">
      <X size={16} />
    </button>
  </div>
  ```

  **KPI cards:**
  ```typescript
  className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(23,27,43,0.04)]"
  ```

  **KPI icon wrapper:**
  ```typescript
  className="w-10 h-10 rounded-lg flex items-center justify-center bg-coral/10 text-coral mb-3"
  ```

  **Replace all local status badge `style={{}}` patterns** with `<StatusBadge status={...} />`. Remove the local `STATUS_COLORS` object.

  **Overdue tenant row:**
  ```typescript
  className={`${t.status === 'overdue' ? 'bg-red-50' : ''}`}
  ```

  **"List New Property" button:**
  ```typescript
  <button
    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold bg-coral hover:bg-coral-dark transition-colors"
    onClick={() => setShowNewPropertyModal(true)}
  >
    <Plus size={14} />
    List New Property
  </button>
  ```

  **All remaining `style={{ color/background }}` patterns:** apply the token reference table.

- [ ] **Step 4: Add the List New Property modal JSX at the end of the component's return, inside the outermost `<div>`, before the closing tag:**

```typescript
{/* ── List New Property Modal ── */}
{showNewPropertyModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      className="absolute inset-0 bg-ink/40"
      onClick={() => { setShowNewPropertyModal(false); setModalStep(1); }}
    />
    <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(23,27,43,0.2)]">
      <div className="px-6 pt-6 pb-4">
        {/* Step indicator */}
        <div className="flex items-center gap-1 mb-5">
          {[1, 2, 3].map((step, i) => (
            <div key={step} className="flex items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step <= modalStep ? 'bg-coral text-white' : 'bg-surface-low text-slate-brand'
                }`}
              >
                {step}
              </div>
              {i < 2 && (
                <div className={`w-10 h-px ${step < modalStep ? 'bg-coral' : 'bg-ghost/30'}`} />
              )}
            </div>
          ))}
          <span className="ml-3 text-xs text-slate-brand font-medium">
            {['Property Details', 'Amenities & Rules', 'Photos'][modalStep - 1]}
          </span>
        </div>
        <h2 className="font-bold text-xl text-jet tracking-[-0.01em]">List New Property</h2>
      </div>

      <div className="px-6 pb-6 flex flex-col gap-4">
        {/* ── Step 1: Details ── */}
        {modalStep === 1 && (
          <>
            <div>
              <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                Street Address
              </label>
              <input
                className="w-full border-0 border-b border-ghost/30 bg-transparent px-0 py-2 text-sm text-jet outline-none focus:border-coral transition-colors placeholder:text-slate-brand/40"
                placeholder="14 Fitzwilliam Square"
                value={newProp.address}
                onChange={(e) => setNewProp((p) => ({ ...p, address: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                Eircode
              </label>
              <div className="flex items-center gap-3">
                <input
                  className="flex-1 border-0 border-b border-ghost/30 bg-transparent px-0 py-2 text-sm text-jet outline-none focus:border-coral transition-colors placeholder:text-slate-brand/40"
                  placeholder="D02 X285"
                  value={newProp.eircode}
                  onChange={(e) => setNewProp((p) => ({ ...p, eircode: e.target.value }))}
                />
                {isRPZ && (
                  <span className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-coral text-white shrink-0">
                    RPZ AREA
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                Room Type
              </label>
              <select
                className="w-full border-0 border-b border-ghost/30 bg-transparent px-0 py-2 text-sm text-jet outline-none focus:border-coral transition-colors"
                value={newProp.type}
                onChange={(e) => setNewProp((p) => ({ ...p, type: e.target.value }))}
              >
                {['Single Room', 'Double Room', 'En-Suite', 'Studio', 'Penthouse'].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Monthly Rent (€)', key: 'rent', placeholder: '950' },
                { label: 'Bedrooms', key: 'bedrooms', placeholder: '1' },
                { label: 'Bathrooms', key: 'bathrooms', placeholder: '1' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                    {label}
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full border-0 border-b border-ghost/30 bg-transparent px-0 py-2 text-sm text-jet outline-none focus:border-coral transition-colors placeholder:text-slate-brand/40"
                    placeholder={placeholder}
                    value={newProp[key as keyof typeof newProp] as string}
                    onChange={(e) => setNewProp((p) => ({ ...p, [key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Step 2: Amenities & Rules ── */}
        {modalStep === 2 && (
          <>
            <div>
              <p className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand mb-3">
                Amenities
              </p>
              <div className="grid grid-cols-2 gap-2">
                {['WiFi', 'Bills Inc.', 'Parking', 'Garden', 'Gym', 'Balcony', 'Concierge', 'En-suite', 'AC'].map(
                  (amenity) => (
                    <label key={amenity} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-coral rounded"
                        checked={newProp.amenities.includes(amenity)}
                        onChange={() =>
                          setNewProp((p) => ({
                            ...p,
                            amenities: p.amenities.includes(amenity)
                              ? p.amenities.filter((a) => a !== amenity)
                              : [...p.amenities, amenity],
                          }))
                        }
                      />
                      <span className="text-sm text-jet">{amenity}</span>
                    </label>
                  )
                )}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                House Rules
              </label>
              <textarea
                className="w-full border border-ghost/30 rounded-lg px-3 py-2.5 text-sm text-jet outline-none focus:border-coral transition-colors resize-none"
                rows={4}
                placeholder="e.g. No smoking, 12-month minimum lease..."
                value={newProp.houseRules}
                onChange={(e) => setNewProp((p) => ({ ...p, houseRules: e.target.value }))}
              />
            </div>
          </>
        )}

        {/* ── Step 3: Photos ── */}
        {modalStep === 3 && (
          <div className="rounded-xl border-2 border-dashed border-ghost/40 flex flex-col items-center justify-center py-12 cursor-pointer hover:border-coral/40 transition-colors">
            <p className="text-sm text-slate-brand font-medium">Drag & drop photos here</p>
            <p className="text-xs text-slate-brand/60 mt-1">PNG, JPG — up to 10MB each</p>
            <button className="mt-4 px-4 py-2 rounded-lg border border-ghost/30 text-sm text-jet hover:bg-surface-low transition-colors">
              Browse files
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-ghost/20 mt-2">
          <button
            className="px-5 py-2.5 rounded-lg border border-ghost/20 text-jet text-sm font-medium hover:bg-surface-low transition-colors"
            onClick={() => {
              if (modalStep > 1) setModalStep((s) => s - 1);
              else {
                setShowNewPropertyModal(false);
                setModalStep(1);
              }
            }}
          >
            {modalStep > 1 ? '← Back' : 'Cancel'}
          </button>
          <button
            className="px-6 py-2.5 rounded-lg bg-coral hover:bg-coral-dark text-white text-sm font-semibold transition-colors"
            onClick={() => {
              if (modalStep < 3) {
                setModalStep((s) => s + 1);
              } else {
                setShowNewPropertyModal(false);
                setModalStep(1);
                setNewProp({
                  address: '', eircode: '', type: 'Double Room', rent: '',
                  bedrooms: '1', bathrooms: '1', amenities: [], houseRules: '',
                });
                toast.success('Property listed successfully!');
              }
            }}
          >
            {modalStep < 3 ? 'Next →' : 'Submit Listing'}
          </button>
        </div>
      </div>
    </div>
  </div>
)}
```

- [ ] **Step 5: Verify: http://localhost:5173/dashboard. Sidebar has slate-brand bg with cut-out active effect. RTB banner shows with coral left border. "List New Property" button opens 3-step modal. Steps 1→2→3 navigate. Typing an Eircode shows RPZ AREA badge in Step 1. Submit Listing fires toast. StatusBadge renders correctly in Tenants and Maintenance tables.**

- [ ] **Step 6: Commit**

```bash
git add src/app/pages/LandlordDashboard.tsx
git commit -m "feat: token sweep LandlordDashboard + 3-step List New Property modal with RPZ badge and toast"
```

---

## Task 16: Token sweep TenantDashboard + sonner toast on ticket submit

**Files:**
- Modify: `src/app/pages/TenantDashboard.tsx`

- [ ] **Step 1: Add these imports to `src/app/pages/TenantDashboard.tsx`:**

```typescript
import { toast } from 'sonner';
import { StatusBadge } from '../components/shared/StatusBadge';
```

- [ ] **Step 2: Remove the local `STATUS_COLORS` constant from the file (it is now replaced by `<StatusBadge />`).** Delete:

```typescript
const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Open: { bg: '#fef3ee', color: '#ef8354' },
  'In Progress': { bg: '#fffbeb', color: '#f59e0b' },
  Resolved: { bg: '#f0fdf4', color: '#16a34a' },
};
```

- [ ] **Step 3: Apply the token substitution table throughout the entire file. Key changes:**

  **Root div:** `className="bg-surface min-h-screen"` — remove `style={{ fontFamily, background, minHeight }}`

  **Tab nav wrapper:** `className="sticky top-16 z-10 overflow-x-auto bg-white border-b border-ghost/20"`

  **Active tab button:**
  ```typescript
  className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
    activeTab === tab.id
      ? 'text-jet border-coral'
      : 'text-slate-brand border-transparent hover:text-jet'
  }`}
  ```

  **Welcome card:** `className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(23,27,43,0.04)]"`

  **Rent reminder:** `className="rounded-xl p-5 flex items-center justify-between gap-4 bg-coral"` — Mark as Paid button: `className="px-4 py-2 rounded-lg text-sm font-semibold bg-white/20 text-white shrink-0 hover:bg-white/30 transition-colors"`

  **Quick grid cards:** `className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(23,27,43,0.04)]"`

  **All remaining `style={{ color/background }}` patterns:** apply the token reference table.

  **Replace all status badge inline styles** with `<StatusBadge status={...} />`:
  ```typescript
  // Before:
  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: STATUS_COLORS[ticket.status]?.bg, color: STATUS_COLORS[ticket.status]?.color }}>
    {ticket.status}
  </span>

  // After:
  <StatusBadge status={ticket.status} />
  ```

  **Modal — Submit button onClick:** Replace `onClick={() => setShowRaiseTicket(false)}` with:
  ```typescript
  onClick={() => {
    setShowRaiseTicket(false);
    setTicketForm({ title: '', category: 'Heating', description: '' });
    toast.success('Ticket submitted — your landlord will respond shortly.');
  }}
  ```

  **Modal backdrop overlay:** `className="absolute inset-0 bg-ink/40"`

  **Modal card:** `className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-[0_20px_60px_rgba(23,27,43,0.2)]"`

  **Modal inputs:**
  ```typescript
  className="w-full px-4 py-2.5 rounded-lg text-sm text-jet outline-none border border-ghost/40 focus:border-coral transition-colors"
  ```

  **Photo upload zone:**
  ```typescript
  className="rounded-lg flex flex-col items-center justify-center py-6 cursor-pointer border-2 border-dashed border-ghost/40 hover:border-coral/40 transition-colors"
  ```

  **Submit ticket button:**
  ```typescript
  className="w-full py-3 rounded-xl text-white font-semibold text-sm bg-coral hover:bg-coral-dark transition-colors"
  ```

  **Next payment card:** `className="rounded-xl p-5 bg-coral"` — payment history rows: remove inline border styles, use `className="... border-b border-ghost/15"`

- [ ] **Step 4: Verify: http://localhost:5173/tenant-dashboard. Tabs switch. Rent reminder is coral. Ticket status badges use `<StatusBadge />`. Raise New Ticket modal opens. Submit fires sonner toast and clears form.**

- [ ] **Step 5: Commit**

```bash
git add src/app/pages/TenantDashboard.tsx
git commit -m "feat: token sweep TenantDashboard + sonner toast on ticket submit + StatusBadge"
```

---

## Task 17: Build check and fix any TypeScript errors

**Files:** All modified files

- [ ] **Step 1: Run the TypeScript/Vite build:**

```bash
npm run build
```

Expected: Build completes with 0 errors. Common issues to watch for:

- **`onWishlist` vs `onWishlistToggle` mismatch** — any remaining `onWishlist={...}` in pages must be updated to `onWishlistToggle={...}`
- **Local `Property` interface conflicts** — if any page still defines its own `interface Property { ... }`, remove it and import from `../../types` or `../../../types`
- **Missing `useState` import** — if new state was added in Task 15 (modal state) but `useState` wasn't already imported for that variable
- **`StatusBadge` receiving wrong status type** — ensure the `status` prop values passed to `<StatusBadge />` match the union type in `StatusBadge.tsx`

- [ ] **Step 2: Fix any reported errors**

- [ ] **Step 3: Commit fixes**

```bash
git add -u
git commit -m "fix: resolve TypeScript errors from token sweep and new features"
```

---

## Task 18: Final verification — all 8 routes

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Visit all 8 routes and confirm the checklist**

| Route | Check |
|---|---|
| `/` | Jet hero, coral CTA, featured listings on `bg-surface-low`, `RPZ AREA` badge on cards, heart persists across navigation |
| `/listings` | Filter sidebar visible desktop, sort buttons coral/ghost, pagination coral active, Concierge Chat button |
| `/property/1` | 2-col desktop layout, sticky right card (`sticky top-24`), transport placeholder tiles, amenity ghost-border pills, RPZ red badge |
| `/login` | Bottom-border inputs, OR divider with ghost lines, Google/Apple buttons, Sign in navigates to /tenant-dashboard |
| `/landlord` | Dark left panel, blurred bg image, white form panel |
| `/chat/c1` | Conversation list left border coral on active, Viewing Widget inline in stream, Calendar + time slots, Confirm fires toast |
| `/dashboard` | Slate-brand sidebar, cut-out active item, RTB coral-border banner, 3-step modal, RPZ badge on Eircode input, StatusBadge in tables |
| `/tenant-dashboard` | Coral-border active tab, coral rent reminder, Raise Ticket modal, sonner toast on submit, StatusBadge on tickets |

- [ ] **Step 3: Confirm zero `style={{ color: '#...' }}` or `style={{ background: '#...' }}` patterns remain**

```bash
grep -rn "style={{ color: '#\|style={{ background: '#" src/app/pages/ src/app/components/layout/ src/app/components/shared/
```

Expected: No matches. If any appear, apply the token substitution table to fix them.

- [ ] **Step 4: Final commit**

```bash
git add -u
git commit -m "chore: final verification pass — RoomNest token-first + full pass complete"
```
