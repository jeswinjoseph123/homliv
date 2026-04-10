# HomLiv Design Language

**"The Digital Curator"** — high-end editorial aesthetic. Premium, minimal, purposeful. Every element earns its place.

---

## Brand Identity

**Name:** HomLiv  
**Mark:** `•` coral dot + "HomLiv" in white bold — used in navbar and footer  
**Tagline:** Find your room in Ireland. Manage it from day one.

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `jet` | `#2d3142` | Display headings, dark surfaces, navbar bg base |
| `slate-brand` | `#4f5d75` | Secondary text, meta info, inactive labels |
| `coral` | `#ef8354` | CTAs, prices, active states, key accents |
| `coral-dark` | `#9c441a` | Coral hover only |
| `surface` | `#faf8ff` | Page background |
| `surface-low` | `#f3f2ff` | Section backgrounds, amenity tags |
| `ink` | `#171b2b` | Body text |
| `ghost` | `#dcc1b7` | Borders at low opacity only |

### Gradient — Primary CTA (Terracotta)
```css
background: linear-gradient(180deg, #d47550 0%, #b85530 100%);
```
Used on: Search button, Apply Filters, Newest/active sort, active pagination, Landlord navbar button (outline variant).

### Dark Hero Background
```css
background: #12141f;
```

### Section Backgrounds
- Hero: `#12141f` (near-black)
- How it Works: `#f2f2f4` (light grey — cards float above it)
- Featured Listings: `bg-surface-low` (`#f3f2ff`)
- Why Strip / CTA / Footer: `bg-white` / `bg-jet`

---

## Typography

All type is set in **Inter** (Google Fonts `<link>` in `index.html`).

| Role | Style |
|---|---|
| Display LG | `clamp(2.6rem, 5.5vw, 4rem)` · bold · tracking `-0.02em` · `text-white` (hero) |
| Display MD | `clamp(2rem, 4vw, 3rem)` · bold · tracking `-0.02em` · `text-jet` / `text-coral` |
| Headline MD | `1.75rem` · bold · tracking `-0.02em` · `text-jet` |
| Body | `text-sm` · `leading-relaxed` · `text-slate-brand` |
| Label | `text-xs` · `font-bold` · `tracking-[0.1em]` · `uppercase` · `text-coral` |
| Card Title | `text-base` · `font-bold` · `tracking-tight` · `text-jet` |
| Meta / Location | `text-sm` · `text-slate-brand` |
| Price | `text-xl` · `font-bold` · `text-coral` |

---

## Navbar

```
sticky top-0 z-50
backdrop-blur-xl
background: rgba(30,33,50,0.55)   ← glassmorphism
border-b: border-white/[0.07]
```

**Logo:** `• HomLiv` — coral dot + white bold text, left side  
**Listings link:** directly beside the logo on the left  
**Right side:** Login (text link) + Landlord (coral outline button)

**Active link:** `text-coral border-b-2 border-coral`  
**Inactive link:** `text-white/75 hover:text-white`

**Mobile menu bg:** `rgba(30,33,50,0.85)` with `backdrop-blur-xl`

---

## Buttons

### Primary — Terracotta Gradient
```css
background: linear-gradient(180deg, #d47550 0%, #b85530 100%);
color: white;
border-radius: rounded-xl (full-width) or rounded-full (pill);
padding: px-6 py-3.5;
font: font-semibold text-sm;
hover: opacity-90;
```

### Outline (Ghost)
```css
border: 1px solid rgba(220,193,183,0.5);
color: #4f5d75;
border-radius: rounded-full;
background: transparent;
```

### Text Link
```css
font-bold text-xs uppercase tracking-[0.08em] text-slate-brand;
hover: text-jet;
```

### Landlord Nav Button
```css
border: border-coral;
color: text-coral;
border-radius: rounded-lg;
hover: bg-coral text-white;
```

---

## Cards

### Property Card
```
bg-white
rounded-2xl
border: 1px solid rgba(220,193,183,0.18)
shadow: 0 2px 16px rgba(23,27,43,0.06)
hover shadow: 0 8px 40px rgba(23,27,43,0.10)
```

**Image:** inset with `m-3 rounded-xl overflow-hidden h-52` — image floats inside the card  
**Image overlays:** type badge (dark) top-left · heart button (white circle) top-right  
**Body:** `px-4 pb-4 pt-1`  
**Divider:** `border-top: 1px solid rgba(220,193,183,0.2)` between meta and price row  
**Price row:** coral price left · "View Details →" coral text-link right

### Hero Preview Card
```
bg-white
rounded-3xl
border: 1px solid rgba(255,255,255,0.22)
shadow: 0 40px 100px rgba(0,0,0,0.6)
transform: rotate(3deg)
width: 380px
```

Image: `m-4 rounded-2xl overflow-hidden h-64`  
Price tag: coral gradient pill, absolute top-right on image

### How it Works — Tenant Card
```
bg-white
rounded-2xl p-8
shadow: 0 4px 32px rgba(23,27,43,0.10)
```
Section background: `#f2f2f4` (light grey) so white card floats visibly.

### How it Works — Landlord Card
```
background: linear-gradient(145deg, #2d3142 0%, #232637 100%)
rounded-2xl p-8
shadow: 0 4px 32px rgba(23,27,43,0.18)
```

### CTA Card
```
background: linear-gradient(160deg, #d07050 0%, #be5830 60%, #a84420 100%)
border: 1px solid rgba(255,255,255,0.12)
shadow: 0 8px 40px rgba(190,88,48,0.3)
rounded-3xl
```
Sits inside a `bg-white` section with `py-16 px-4`.

---

## Filter Sidebar (Listings)

- **No card background** — blends with page `bg-surface`
- Width: `240px`, `sticky top-20`
- Section labels: `text-xs font-bold tracking-[0.06em] uppercase text-slate-brand`
- Checkboxes: custom — coral fill when active, `border border-[#dcc1b7]/50` when inactive
- Range slider: `accent-[#ef8354]`
- Apply Filters: terracotta gradient, `rounded-xl`, full-width
- Clear All: `text-xs uppercase tracking-[0.08em] text-slate-brand`

---

## Pagination

```
Prev / Next: w-9 h-9 rounded-lg bg-surface-low text-jet
Active page: w-9 h-9 rounded-lg — terracotta gradient, white text
Inactive page: transparent bg, border: 1px solid rgba(220,193,183,0.4), text-slate-brand
```

---

## Sort Buttons

```
Active:   terracotta gradient · text-white · rounded-full · px-5 py-2
Inactive: transparent · border rgba(220,193,183,0.5) · text-slate-brand · rounded-full
```

---

## Search Bar (Hero)

```
Container: rounded-xl overflow-hidden border border-white/[0.12] bg-white/[0.07]
Input: pl-10 pr-4 py-3.5 text-sm font-medium bg-transparent text-white placeholder:text-white/30
Button: terracotta gradient · px-6 py-3.5 · font-semibold · no border-radius (inherits from container)
```

---

## Section Anatomy

### Hero
- Background: `#12141f`
- Left: headline + subtext + search bar + quick filter pills
- Right (desktop only): rotated preview card `rotate(3deg)`, `w-[380px]`
- Quick filter pills: `rounded-full px-3.5 py-1.5 border border-white/[0.14] text-white/55`

### Featured Listings
- Background: `bg-surface-low`
- Header: section label (coral line + uppercase label) + title left · "View All" link right
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`

### Why Strip
- Background: `bg-white`
- Grid: `grid-cols-1 sm:grid-cols-3 gap-8`
- Icon container: `w-10 h-10 rounded-xl bg-coral/10` with coral icon

### How it Works
- Background: `#f2f2f4`
- Two-column grid: Tenant card (white) · Landlord card (dark)
- Steps: coral number `01/02/03` · bold title · grey description

### CTA Banner
- Outer section: `bg-white py-16`
- Inner card: coral gradient `rounded-3xl`, centred, email input + Join Now button

---

## Rules — Never Break These

1. No border lines between sections — use background color shifts only
2. No 100% black — always `text-jet` (`#2d3142`) for deep tones
3. Coral is scarce — CTAs, prices, active states only
4. No default Tailwind shadows (`shadow-md`, `shadow-lg`) — write shadow values manually
5. No card borders using Tailwind `border` classes on section containers
6. Minimum grid gap is 24px (`gap-6`)
7. No `prose` class — all typography is written manually
8. No `any` in TypeScript
9. No `console.log` in component code
10. No inline `style={{}}` for colors — Tailwind tokens only (except gradients and rgba shadows)
