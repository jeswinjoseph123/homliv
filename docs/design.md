# HomLiv Design Language

**"The Digital Curator"** — Apple-inspired premium aesthetic. Clean, generous whitespace, neutral surfaces, bold typography. Every element earns its place.

---

## Brand Identity

**Name:** HomLiv
**Mark:** `<LogoMark />` SVG (house + H) in coral + "HomLiv" in white bold — used in Navbar, Footer, TenantLoginPage, LandlordSignupPage
**Tagline:** Find your room in Ireland. Manage it from day one.
**Logo usage:** `<LogoMark size={22} className="text-coral" />` + `<span>HomLiv</span>`

---

## Font

**Apple system font stack — no Google Fonts, ever.**

```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
-webkit-font-smoothing: antialiased;
```

Resolves to SF Pro on macOS/iOS automatically. Set globally in `src/styles/theme.css` and `index.html`.

---

## Color Tokens

Use Tailwind classes exclusively. Never write raw hex for a token that has a class.

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| `jet` | `#2d3142` | `bg-jet` / `text-jet` | Navbar bg, display headings, dark surfaces |
| `slate-brand` | `#4f5d75` | `bg-slate-brand` / `text-slate-brand` | Sidebar bg, secondary text, meta info, inactive icons |
| `coral` | `#ef8354` | `text-coral` / `bg-coral` | CTAs (via gradient), prices, active states, key highlights only |
| `coral-dark` | `#9c441a` | `text-coral-dark` | Coral hover state only |
| `surface` | `#fafafa` | `bg-surface` | Page background — neutral, no tint |
| `surface-low` | `#f5f5f7` | `bg-surface-low` | Section backgrounds, input fields, icon containers — Apple's signature gray |
| `ink` | `#1d1d1f` | `text-ink` | Body copy — Apple's near-black |
| `ghost` | `#dcc1b7` | `border-ghost` | Borders at `/15` or `/40` opacity only |

### Primary CTA Gradient (Terracotta)

```css
background: linear-gradient(180deg, #d47550 0%, #b85530 100%);
```

Used on: all primary buttons, active sort/filter, active pagination, active sidebar nav pill.

### Gradient Text (Apple-style accent)

```tsx
const gradientText: React.CSSProperties = {
  background: 'linear-gradient(135deg, #ef8354 0%, #d47550 60%, #c05030 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};
// <span style={gradientText}>key phrase</span>
```

---

## The Rules — Violations Are Flagged in Every Review

1. **NO section border lines.** Boundaries = background color shifts only. Never `border-b`, `border-t`, or `divide-*` between sections.
2. **NO 100% black.** `text-jet` for headings, `text-ink` for body. Never `text-black` or `#000`.
3. **CORAL IS SCARCE.** Coral only for: CTA buttons, price tags, active nav states, key highlights. Never on decorative icons, background tints, or informational elements.
4. **NO default Tailwind shadows.** Never `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`. Always use explicit `boxShadow` values.
5. **NO card borders.** White card on `bg-surface-low` = sufficient contrast. No `border` on card wrappers.
6. **MINIMUM gap is `gap-6` (24px).** Never use `gap-4` or below in grid/flex layouts.
7. **NO purple-tinted surfaces.** Never `#f3f2ff`, `#faf8ff`, `rgba(243,242,255,...)`, `rgba(250,248,255,...)`. Use `bg-surface-low` (`#f5f5f7`) or `bg-surface` (`#fafafa`).
8. **Inline style only for values with no Tailwind equivalent.** Gradients, `clamp()` font sizes, explicit `boxShadow`, `letterSpacing` — valid. Colors with a registered token must use the Tailwind class, not a raw hex.
9. **No `prose` class** — all typography written manually.
10. **No `any` in TypeScript.**
11. **No `console.log` in component code.**

---

## Typography

```tsx
// Display LG — hero headings
className="font-bold"
style={{ fontSize: 'clamp(3rem, 6.5vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}

// Headline MD — section titles
className="font-bold text-jet"
style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.03em' }}

// Title SM — card titles, sub-headers
className="text-base font-bold text-jet"
style={{ letterSpacing: '-0.02em' }}

// Body LG — descriptions, detail text
className="text-base font-normal leading-relaxed text-ink"

// Label MD — tags, specs, micro-copy, table headers
className="text-[0.75rem] font-bold tracking-[0.05em] uppercase text-slate-brand"

// Price
className="text-xl font-bold text-coral"

// Meta / location
className="text-sm text-slate-brand"
```

---

## Buttons

```tsx
// Primary — terracotta gradient (ALWAYS — never flat bg-coral)
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

// Outline (Landlord nav)
<button className="border border-coral text-coral rounded-lg px-4 py-2 text-sm font-medium hover:bg-coral hover:text-white transition-colors">
  For Landlords
</button>
```

---

## Input Fields

```tsx
// Standard form input (login / signup panels)
className="w-full border border-ghost/40 rounded-lg px-4 py-3 text-sm text-jet outline-none focus:border-coral transition-colors bg-white placeholder:text-slate-brand/40"

// Apple-style gray box (verification wizard, chat search, message compose)
className="w-full bg-surface-low rounded-xl px-4 py-3 text-sm text-jet outline-none transition-colors placeholder:text-slate-brand/40"
// Wizard fields also get: focus:bg-[#e8e9ec]
```

---

## Cards

```tsx
// Standard white card (dashboard stat, content card)
className="bg-white rounded-xl p-5"
style={{ boxShadow: '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)' }}

// Property card — lift on hover, no border
className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
// onMouseEnter → boxShadow: '0 16px 48px rgba(0,0,0,0.12)'
// onMouseLeave → boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
// Image: className="relative m-3 rounded-xl overflow-hidden h-52"

// Coral gradient stat card
style={{ background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)' }}

// Slate/dark gradient stat card
style={{ background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)', boxShadow: '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)' }}

// Dark card (hero sections, app download, How-It-Works landlord side)
style={{ background: 'linear-gradient(145deg, #1a1c2e 0%, #0f1018 100%)', boxShadow: '0 8px 40px rgba(0,0,0,0.22)' }}

// Form card (verification wizard)
className="bg-white rounded-2xl p-6"
style={{ boxShadow: '0 4px 24px rgba(23,27,43,0.08), 0 1px 4px rgba(23,27,43,0.04)' }}

// Hero preview card
className="bg-white rounded-3xl"
style={{ border: '1px solid rgba(255,255,255,0.22)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', transform: 'rotate(3deg)', width: '380px' }}
// Image: className="m-4 rounded-2xl overflow-hidden h-64"
```

---

## Icon Containers

```tsx
// Standard — always bg-surface-low, never bg-coral/10
<div className="w-10 h-10 rounded-xl bg-surface-low flex items-center justify-center shrink-0">
  <Icon size={18} className="text-coral" />        {/* coral: primary/CTA-adjacent only */}
  <Icon size={18} className="text-slate-brand" />  {/* slate: neutral/informational */}
</div>
```

`bg-coral/10` is only valid as an **active/selected state indicator** (e.g. active toggle button while panel is open). Never use it as a static decorative background.

---

## Semantic Status Colors — Do Not Replace

These convey meaning. Exempt from coral-is-scarce and no-green rules.

| Status | Classes |
|---|---|
| Verified / Paid / Active / Resolved | `bg-green-50 text-green-600` |
| Overdue (StatusBadge) | `bg-red-50 text-red-600` |
| Pending / In Progress | `bg-amber-50 text-amber-500` |
| Danger actions ("Delete Account") | `text-red-500` |
| Accept / Confirm action buttons | `bg-green-600` |
| Priority accent bars — high / medium / low | `#ef4444` / `#f59e0b` / `#22c55e` |

---

## Shadow System

| Context | Value |
|---|---|
| White card (default) | `0 2px 12px rgba(0,0,0,0.06)` |
| White card (hover) | `0 16px 48px rgba(0,0,0,0.12)` |
| Dashboard white card | `0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)` |
| Form card (wizard) | `0 4px 24px rgba(23,27,43,0.08), 0 1px 4px rgba(23,27,43,0.04)` |
| Coral gradient card | `0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)` |
| Slate gradient card | `0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)` |
| Dark card | `0 8px 40px rgba(0,0,0,0.22)` |
| Navbar | `0 4px 24px rgba(18,20,31,0.50), 0 1px 4px rgba(18,20,31,0.30)` |
| Sidebar | `6px 0 40px rgba(23,27,43,0.55), 2px 0 8px rgba(23,27,43,0.25)` |
| Active sidebar pill | `0 4px 12px rgba(180,80,40,0.35)` |

---

## Navigation

```tsx
// Navbar — glassmorphism, sticky
style={{ background: 'rgba(18,20,31,0.90)', boxShadow: '0 4px 24px rgba(18,20,31,0.50), 0 1px 4px rgba(18,20,31,0.30)' }}
className="backdrop-blur-xl sticky top-0 z-50"
// "Listings" link lives LEFT beside logo — not in right nav
// Active link: text-coral | Inactive: text-white/75 hover:text-white

// Dashboard sidebar background (both dashboards)
className="bg-slate-brand"
style={{ boxShadow: '6px 0 40px rgba(23,27,43,0.55), 2px 0 8px rgba(23,27,43,0.25)' }}

// Sidebar active item — coral gradient pill
className="flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-white font-semibold text-sm"
style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)', boxShadow: '0 4px 12px rgba(180,80,40,0.35)' }}

// Sidebar inactive item
className="text-white/60 hover:text-white hover:bg-white/[0.07] px-4 py-3 mx-2 rounded-xl text-sm font-medium transition-colors"
```

---

## Page / Section Backgrounds

| Layer | Token / Value |
|---|---|
| App shell | `bg-surface-low` |
| Dark hero | `bg-[#0a0a0f]` + coral ambient glow |
| Alternating light sections | `bg-white` then `bg-surface-low` — never add a border between |
| Main content area | `bg-surface` |
| Card / panel | `bg-white` |
| Input field / icon container | `bg-surface-low` |
| Dashboard shell | `bg-surface-low` |

---

## Auth Pages Layout (50/50 Split)

Both `TenantLoginPage` and `LandlordSignupPage` use identical structure:

```tsx
<div className="min-h-screen flex flex-col lg:flex-row">
  {/* Left — dark panel */}
  <div className="relative flex flex-col justify-between p-8 lg:p-12 bg-jet"
       style={{ flex: '0 0 50%', minHeight: '40vh' }}>
    {/* Background image at 18% opacity */}
    {/* Logo · Headline · 3 feature items · Bottom badge */}
  </div>

  {/* Right — form panel */}
  <div className="bg-white flex flex-col justify-center items-center p-8 lg:p-12 lg:flex-1">
    {/* Tab switcher (Sign In / Sign Up) · Form · Social auth */}
  </div>
</div>
```

---

## Dashboard Shell (Both Dashboards)

```tsx
<div className="h-screen flex flex-col overflow-hidden bg-surface-low">
  <Navbar />
  <div className="flex flex-1 overflow-hidden min-h-0">
    <Sidebar />  {/* bg-slate-brand */}
    <main className="flex-1 overflow-y-auto">
      <div className="p-4 sm:p-6 max-w-[1100px] mx-auto w-full">
        {/* Tab content */}
      </div>
    </main>
  </div>
</div>
```

Panel-based tabs (e.g. chats) use `flex overflow-hidden` on the content wrapper instead of `overflow-y-auto`.

---

## Filter Sidebar (Listings)

- No card background — blends with page `bg-surface`
- Width: `240px`, `sticky top-20`
- Section labels: `text-xs font-bold tracking-[0.06em] uppercase text-slate-brand`
- Checkboxes: custom — coral fill active, `border border-ghost/50` inactive
- Range slider: `accent-[#ef8354]`
- Apply Filters: terracotta gradient, `rounded-xl`, full-width
- Sort buttons — active: terracotta gradient + `rounded-full` | inactive: `border border-ghost/50 text-slate-brand rounded-full`

---

## Pagination

```
Prev / Next:    w-9 h-9 rounded-lg bg-surface-low text-jet
Active page:    w-9 h-9 rounded-lg — terracotta gradient, text-white
Inactive page:  transparent, border: 1px solid rgba(220,193,183,0.4), text-slate-brand
```

---

## Hero Search Bar

```tsx
// Container
className="rounded-xl overflow-hidden"
style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.07)' }}

// Input
className="pl-10 pr-4 py-3.5 text-sm font-medium bg-transparent text-white placeholder:text-white/30 outline-none flex-1"

// Button — terracotta gradient, no border-radius (inherits from container)
style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
className="px-6 py-3.5 font-semibold text-white text-sm"
```

---

## Section Anatomy

### Hero
- Background: `#0a0a0f` (deep near-black)
- Pill tag at top: coral-tinted with pulse dot
- Headline: Display LG with gradient text on accent phrase
- Floating preview card: `rotate(3deg)`, animated float `translateY(-14px)` over 6s
- Stats strip at bottom of hero section

### Featured Listings
- Background: `bg-surface-low`
- Heading stands alone — no coral line + badge combos before it
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`

### Why HomLiv
- Background: `bg-white`
- Icon container: `bg-surface-low` (not `bg-coral/10`)
- Grid: `grid-cols-1 sm:grid-cols-3 gap-8`

### How It Works
- Background: `bg-white`
- Two cards side by side: Tenant (white card) · Landlord (dark gradient card)
- Steps: coral number `01/02/03` · bold title · `text-slate-brand` description

### CTA Section
- Background: `bg-surface-low`
- Centered layout, pill email input + terracotta gradient Join button
