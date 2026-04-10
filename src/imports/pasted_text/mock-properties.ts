# RoomNest — React + Tailwind + shadcn/ui Build Prompt

## System Role

You are a senior frontend engineer building **RoomNest**, a premium Irish rental management platform. The design language is "The Digital Curator" — a high-end editorial aesthetic inspired by luxury architecture magazines. You are building a pixel-perfect, production-grade React + TypeScript + Tailwind CSS + shadcn/ui application with mock data. The app is NOT yet connected to a backend.

**Do not use any other UI libraries.** Use only Tailwind CSS utility classes and shadcn/ui components. All icons are from `lucide-react`.

---

## Design System (Non-Negotiable Rules)

### Color Palette — use CSS variables in `globals.css` or Tailwind config

```css
--color-jet: #2d3142;          /* Navbar, Display headings */
--color-slate: #4f5d75;        /* Sidebar, secondary text */
--color-coral: #ef8354;        /* CTA buttons, active states, accents */
--color-coral-dark: #9c441a;   /* Hover state for coral */
--color-surface: #faf8ff;      /* Page background */
--color-surface-low: #f3f2ff;  /* Section backgrounds */
--color-surface-card: #ffffff; /* Card backgrounds */
--color-ink: #171b2b;          /* Body text */
--color-ghost: #dcc1b7;        /* Ghost border at 15% opacity only */
```

**Rules:**
- Never use `border` lines to section content — use background color shifts only
- Never use 100% black — always use `--color-jet` for deep tones
- Coral is used ONLY for CTAs, active states, price tags, and key highlights
- All cards are `#ffffff` on a `#f3f2ff` or `#faf8ff` background — no card borders

### Typography — use `next/font` or Google Fonts import for `Inter`

| Token | Size | Weight | Letter-spacing | Usage |
|---|---|---|---|---|
| display-lg | 3.5rem / 56px | 700 | -0.02em | Hero headings |
| headline-md | 1.75rem / 28px | 700 | -0.02em | Section titles |
| title-sm | 1rem / 16px | 500 | 0 | Card titles, sub-headers |
| body-lg | 1rem / 16px | 400 | 0 | Descriptions, line-height 1.6 |
| label-md | 0.75rem / 12px | 700 | 0.05em | Tags, specs — ALWAYS uppercase |

### Elevation — no heavy shadows, tonal only
- Hover cards: `shadow-[0_4px_40px_rgba(23,27,43,0.04)]`
- Floating nav: `backdrop-blur-md bg-[#2d3142]/90`
- No default Tailwind `shadow-md` or `shadow-lg`

### Components
- **Buttons — Primary:** `bg-[#ef8354] text-white rounded-lg px-6 py-3 font-semibold hover:bg-[#9c441a] transition-colors`
- **Buttons — Secondary:** `border border-[#dcc1b7]/20 text-[#2d3142] rounded-lg px-6 py-3 hover:bg-[#f3f2ff]`
- **Input fields:** Bottom-border only style — `border-0 border-b border-[#dcc1b7]/30 rounded-none bg-transparent focus:border-[#ef8354] focus:ring-0`
- **Tags/Badges:** `text-[0.75rem] font-bold tracking-[0.05em] uppercase bg-[#f3f2ff] text-[#4f5d75] px-3 py-1 rounded-full`
- **Cards:** `bg-white rounded-xl overflow-hidden hover:shadow-[0_4px_40px_rgba(23,27,43,0.08)] transition-shadow`

---

## Project Structure

```
src/
  components/
    layout/
      Navbar.tsx
      Footer.tsx
      Sidebar.tsx (landlord dashboard)
    ui/                  # shadcn/ui components
    shared/
      PropertyCard.tsx
      AmenityTag.tsx
      PriceTag.tsx
      StatusBadge.tsx
  pages/ (or app/ if Next.js)
    HomePage.tsx
    ListingsPage.tsx
    PropertyDetailPage.tsx
    TenantLoginPage.tsx
    LandlordSignupPage.tsx
    LandlordDashboard.tsx
    ChatPage.tsx
  data/
    mockProperties.ts
    mockTenants.ts
    mockMessages.ts
  hooks/
    useWishlist.ts
  lib/
    utils.ts
```

---

## Build Order — Follow This Exactly

---

### STEP 1 — Project Setup & Design Tokens

1. Create Vite + React + TypeScript project: `npm create vite@latest roomnest -- --template react-ts`
2. Install: `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`
3. Install shadcn/ui: `npx shadcn-ui@latest init` — choose: TypeScript yes, style Default, base color Neutral, CSS variables yes
4. Install icons: `npm install lucide-react`
5. Install extras: `npm install react-router-dom date-fns`

In `tailwind.config.ts`, extend the theme:
```ts
theme: {
  extend: {
    colors: {
      jet: '#2d3142',
      slate: '#4f5d75',
      coral: { DEFAULT: '#ef8354', dark: '#9c441a' },
      surface: { DEFAULT: '#faf8ff', low: '#f3f2ff', card: '#ffffff', dim: '#d6d9ef' },
      ink: '#171b2b',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    letterSpacing: {
      display: '-0.02em',
      label: '0.05em',
    },
    borderRadius: {
      card: '12px',
    }
  }
}
```

In `globals.css` / `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
body { background-color: #faf8ff; color: #171b2b; font-family: 'Inter', sans-serif; }
```

---

### STEP 2 — Mock Data

Create `src/data/mockProperties.ts`:
```ts
export const mockProperties = [
  {
    id: '1',
    title: 'Double room in Ranelagh, D6',
    type: 'Double Room',
    location: 'Ranelagh Village, Dublin 6',
    eircode: 'D06 X1Y2',
    price: 950,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    ],
    amenities: ['WiFi', 'Bills Inc.', 'En-suite'],
    bedrooms: 1,
    bathrooms: 1,
    area: 22,
    available: true,
    wishlistCount: 128,
    isRPZ: true,
    landlord: { name: 'The Curator', verified: true, avatar: 'https://i.pravatar.cc/150?img=47' },
    description: 'A curated urban sanctuary nestled in the heart of Dublin\'s most vibrant neighbourhood.',
    houseRules: ['12-month minimum lease', 'No smoking within the property', 'Small pets considered'],
    transport: ['Ranelagh Village — 2 min walk', 'Green Line Luas — 5 min walk'],
  },
  {
    id: '2',
    title: 'Master Suite in Smithfield',
    type: 'En-Suite',
    location: 'Smithfield Square, Dublin 7',
    eircode: 'D07 A2B3',
    price: 1100,
    images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800'],
    amenities: ['Gym', 'Balcony', 'Concierge'],
    bedrooms: 1, bathrooms: 1, area: 30,
    available: true, wishlistCount: 84,
    isRPZ: true,
    landlord: { name: 'Marcus O\'Brien', verified: true, avatar: 'https://i.pravatar.cc/150?img=12' },
    description: 'Boutique en-suite room in a premium managed building with concierge service.',
    houseRules: ['6-month minimum lease', 'No smoking', 'No pets'],
    transport: ['Smithfield Luas — 3 min walk', 'Heuston Station — 10 min walk'],
  },
  {
    id: '3',
    title: 'Modern Studio in Grand Canal',
    type: 'Studio',
    location: 'Grand Canal Dock, Dublin 2',
    eircode: 'D02 C3D4',
    price: 1450,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
    amenities: ['City View', 'AC', 'WiFi'],
    bedrooms: 0, bathrooms: 1, area: 35,
    available: true, wishlistCount: 201,
    isRPZ: true,
    landlord: { name: 'Sophie Walsh', verified: false, avatar: 'https://i.pravatar.cc/150?img=25' },
    description: 'Self-contained studio with panoramic canal views in the heart of tech quarter.',
    houseRules: ['12-month minimum', 'Professional tenants preferred'],
    transport: ['Grand Canal Dock DART — 2 min walk', 'City Bikes station — adjacent'],
  },
  {
    id: '4',
    title: 'Single Room in Rathmines',
    type: 'Single Room',
    location: 'Upper Rathmines, Dublin 6',
    eircode: 'D06 E5F6',
    price: 750,
    images: ['https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800'],
    amenities: ['Parking', 'Garden', 'Bills Inc.'],
    bedrooms: 1, bathrooms: 1, area: 18,
    available: false, wishlistCount: 45,
    isRPZ: true,
    landlord: { name: 'Aoife Murphy', verified: true, avatar: 'https://i.pravatar.cc/150?img=33' },
    description: 'Cosy single room in a quiet residential house with private garden access.',
    houseRules: ['3-month minimum', 'No smoking', 'Quiet household'],
    transport: ['Rathmines bus stop — 5 min walk', 'City centre — 20 min by bus'],
  },
  {
    id: '5',
    title: 'The Georgian Penthouse',
    type: 'Penthouse',
    location: 'Merrion Square, Dublin 2',
    eircode: 'D02 G7H8',
    price: 3200,
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
    amenities: ['Terrace', 'Concierge', 'Gym', 'WiFi'],
    bedrooms: 3, bathrooms: 2, area: 140,
    available: true, wishlistCount: 312,
    isRPZ: false,
    landlord: { name: 'Heritage Estates', verified: true, avatar: 'https://i.pravatar.cc/150?img=55' },
    description: 'Exceptional top-floor apartment in a protected Georgian building on iconic Merrion Square.',
    houseRules: ['12-month minimum', 'References required', 'No smoking', 'No pets'],
    transport: ['Merrion Square — on doorstep', 'DART Pearse — 8 min walk'],
  },
  {
    id: '6',
    title: 'Docklands Loft',
    type: 'Studio',
    location: 'Grand Canal Dock, Dublin 4',
    eircode: 'D04 I9J0',
    price: 2850,
    images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'],
    amenities: ['City View', 'Concierge', 'Balcony', 'AC'],
    bedrooms: 2, bathrooms: 2, area: 95,
    available: true, wishlistCount: 178,
    isRPZ: false,
    landlord: { name: 'Docklands PM', verified: true, avatar: 'https://i.pravatar.cc/150?img=61' },
    description: 'Industrial-chic loft in the heart of the Docklands tech and finance district.',
    houseRules: ['12-month minimum', 'Professional tenants only'],
    transport: ['Grand Canal Dock — 3 min walk', 'Luas Red Line — 5 min walk'],
  },
];

export const mockMessages = [
  { id: '1', sender: 'tenant', text: 'Hi, is this room still available?', time: '10:32 AM', read: true },
  { id: '2', sender: 'landlord', text: 'Yes it is! Would you like to arrange a viewing?', time: '10:45 AM', read: true },
  { id: '3', sender: 'tenant', text: 'That would be great. What days work for you?', time: '11:02 AM', read: true },
  { id: '4', sender: 'landlord', text: 'I can do Saturday at 11am or Sunday at 2pm.', time: '11:15 AM', read: false },
];

export const mockTenants = [
  { id: 't1', name: 'Arun Kumar', avatar: 'https://i.pravatar.cc/150?img=3', property: 'Double room in Ranelagh', rentDue: '2024-02-01', status: 'active', tickets: 1 },
  { id: 't2', name: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=5', property: 'Master Suite in Smithfield', rentDue: '2024-02-05', status: 'active', tickets: 0 },
  { id: 't3', name: 'James O\'Connor', avatar: 'https://i.pravatar.cc/150?img=8', property: 'Single Room in Rathmines', rentDue: '2024-01-28', status: 'overdue', tickets: 2 },
];

export const mockTickets = [
  { id: 'tk1', tenantName: 'Arun Kumar', property: 'Double room in Ranelagh', issue: 'Heating not working', status: 'Open', date: '2024-01-25', priority: 'High' },
  { id: 'tk2', tenantName: 'James O\'Connor', property: 'Single Room in Rathmines', issue: 'Leaking tap in bathroom', status: 'In Progress', date: '2024-01-22', priority: 'Medium' },
  { id: 'tk3', tenantName: 'James O\'Connor', property: 'Single Room in Rathmines', issue: 'Window latch broken', status: 'Resolved', date: '2024-01-10', priority: 'Low' },
];
```

---

### STEP 3 — Shared Components

#### `src/components/layout/Navbar.tsx`
- Background: `bg-[#2d3142]` (Jet), sticky top
- Logo: `RoomNest` in white, bold — with a small coral dot `•` before "RoomNest" (like the tenant login mockup)
- Nav links: `Listings`, `How it works` in white/70 opacity, active link underlined in coral
- Right side: `Login` (text button in white) + `Landlord` (coral outlined button `border border-[#ef8354] text-[#ef8354] rounded-lg px-4 py-2 text-sm`)
- On mobile: hamburger menu

#### `src/components/shared/PropertyCard.tsx`
Props: `{ property, onWishlist, isWishlisted }`
- Card: `bg-white rounded-xl overflow-hidden cursor-pointer`
- Image area: `relative h-56 overflow-hidden` — image fills, type badge top-left (`label-md` uppercase, `bg-[#2d3142]/80 text-white px-2 py-1 text-xs`), heart icon top-right
- Heart: filled coral if wishlisted, outline if not — clicking toggles
- Body: padding `p-4`
  - Title: `text-[#2d3142] font-bold text-base tracking-tight`
  - Location: `text-[#4f5d75] text-sm flex items-center gap-1` with `MapPin` icon
  - Amenity tags: row of small tags
  - Bottom row: price left (`text-[#ef8354] font-bold text-xl` + `/mo` in slate) + `VIEW DETAILS →` right in coral, uppercase, label-md size

#### `src/components/layout/Footer.tsx`
- Background: `bg-[#2d3142]`, white text
- 4-column grid: Logo + tagline + social icons | Platform links | Resources links | Contact
- Bottom bar: copyright left, legal links right
- Match the footer from the homepage mockup exactly

---

### STEP 4 — Page: HomePage (`/`)

Layout sections in order:

**4a. Hero Section**
- Full width, `bg-[#2d3142]` background
- Left half (60%): 
  - Above heading: no label
  - Heading: `Find your room in Ireland.` (white) + `Manage it from day one.` (coral `#ef8354`) — Display LG size (3.5rem), bold, tight tracking
  - Subtext: `Real listings. Real-time chat with landlords. Rent reminders and maintenance — all in one app.` in white/70
  - Search bar: white rounded pill input `placeholder="Dublin, Ireland"` + coral `Search Rooms` button — use `flex gap-2 mt-6`
  - Quick filter chips below: Dublin, Cork, Galway, Limerick, Student friendly, Couples welcome — `bg-white/10 text-white text-sm rounded-full px-4 py-1.5 cursor-pointer hover:bg-white/20`
- Right half (40%): 
  - Property preview card floating — white card, image of a bedroom, `Bright Studio, Ranelagh` title, location, `€950/mo` price badge in coral top-right of image, wishlist count bottom-right
  - Card has a slight rotation (`-rotate-1`) for editorial feel

**4b. Featured Listings Section**
- Background: `bg-[#f3f2ff]`
- Header: `PREMIUM SELECTION` label (label-md, coral, uppercase) above `Featured Listings` (headline-md, jet)
- `View All →` link top-right in coral
- 3-column grid of `PropertyCard` components using first 3 mock properties
- Bottom padding generous (80px)

**4c. How It Works Section**
- Background: `bg-white`
- Centered heading: `How it Works` (headline-md)
- Subtext centered
- Two-column cards below:
  - Left card `bg-white border border-[#dcc1b7]/20 rounded-xl p-8`: **For Tenants** — coral icon, 3 numbered steps (01, 02, 03) with title + description
  - Right card `bg-[#2d3142] rounded-xl p-8 text-white`: **For Landlords** — same structure but dark background, coral numbered step labels

**4d. CTA / Email Signup Section**
- `bg-[#ef8354]` coral background, full width
- Centered: `Start your Dublin journey.` in white, Display LG
- Subtext: `Join 5,000+ residents who found their perfect curated home through Roomnest.`
- Email input (white, rounded-lg) + `Join Now` dark button side by side

---

### STEP 5 — Page: ListingsPage (`/listings`)

**5a. Page Header**
- Background: `bg-[#faf8ff]`
- `CURATED SPACES` — label-md, coral, uppercase
- `Dublin City` — Display LG, coral
- Subtext + sort buttons top-right: `NEWEST` (active, coral filled) | `PRICE: LOW TO HIGH` (ghost)

**5b. Layout: Sidebar + Grid**
- `flex gap-8` layout
- Left sidebar (fixed width 240px):
  - `Refine Search` heading with filter icon
  - **LOCATION:** shadcn `Select` dropdown, styled with bottom-border only
  - **MONTHLY RENT:** shadcn `Slider` from €300–€3000, show current range in coral
  - **ROOM TYPE:** shadcn `Checkbox` list — Single Room, Double Room, En-suite, Studio — checked state uses coral
  - **AMENITIES:** Checkbox list — WiFi Included, Washing Machine, Pet Friendly
  - `Apply Filters` button — full width, coral primary
  - `CLEAR ALL` — tertiary text link, jet, centered

- Right content: 2-column grid of `PropertyCard` components
- Pagination: shadcn `Pagination` — active page coral, rounded

---

### STEP 6 — Page: PropertyDetailPage (`/property/:id`)

**Layout: Two-column split**

Left column (60%):
- **Photo gallery**: Main large image top-left (hero size), 2 stacked smaller images top-right — `grid grid-cols-[2fr_1fr] gap-2 h-[480px]`
- All images `object-cover rounded-xl`
- **"The Space"** — headline-md below images
- Editorial description — body-lg, line-height 1.6
- **Amenities** grid: 3 columns, each amenity in a ghost-bordered pill with icon + label
- **Location** section: 3 placeholder map tiles (use `bg-[#2d3142]/10` grey boxes) with transport labels below

Right column (40%):
- Sticky card (`sticky top-24`):
  - Price: `€950` coral, Display LG + `/mo` in slate + `AVAILABLE NOW` green label
  - `Request Viewing` — primary coral button, full width
  - `Save to Wishlist` — secondary ghost button, full width
  - Divider (background shift, no line)
  - Landlord block: avatar + name + `Verified Premium Host` badge (checkmark icon)
  - `Chat with Landlord` — secondary button, full width
  - Divider
  - **House Rules**: list with icons

---

### STEP 7 — Page: TenantLoginPage (`/login`)

- Centered layout, max-width 440px, `bg-[#faf8ff]`
- Logo centered top: `•RoomNest` — coral dot, Jet bold text
- Tagline: `Editorial Living Redefined` — body-lg, slate
- shadcn `Tabs` with `SIGN IN` | `CREATE ACCOUNT`
- **Sign In tab:**
  - `EMAIL ADDRESS` label (label-md), bottom-border input
  - `PASSWORD` label + `FORGOT PASSWORD?` coral link same row
  - Password input (bottom-border)
  - `Sign in` — coral primary button, full width
  - `OR CONTINUE WITH` — centered divider with lines
  - `Google` + `Apple` — two ghost buttons side by side with icons
- **Create Account tab:** same structure + name field
- Footer below: same Roomnest footer
- Background: subtle radial gradient `from-[#ef8354]/5 to-transparent` in corners

---

### STEP 8 — Page: LandlordSignupPage (`/landlord`)

- **Split layout:** Left 50% dark, Right 50% white form
- Left panel: `bg-[#2d3142]` with blurred property background image
  - Logo top-left: `RoomNest.` white bold
  - Center: `List your property.` / `Manage your tenants.` / `All in one place.` — Display LG, white, line-break between each
  - 3 feature bullets: verified network, integrated chat, automated maintenance — each with a slate-background icon badge
  - Bottom left: coral line + `PREMIUM LANDLORD SUITE` label-md, white
- Right panel: white, form centered vertically
  - `Create Account` — headline-md, jet
  - Subtitle in slate
  - Full Name, Email + Phone (2 cols), Password, Confirm Password — all with visible borders (standard input style here, NOT bottom-only, because this is a formal signup form)
  - `Create Landlord Account →` — coral full width button
  - OR divider + Google + Apple buttons
  - `Already have an account? Sign in` — coral link
  - Footer text: `© 2024 ROOMNEST INTERNATIONAL LTD. PRIVACY & TERMS.`

---

### STEP 9 — Page: ChatPage (`/chat/:tenancyId`)

Layout: full-height chat UI, `flex h-screen`

**Left sidebar (320px):** Conversation list
- Header: `Messages` + new message icon
- Search input (ghost style)
- List of conversations: avatar + name + property + last message preview + timestamp
- Active conversation: `bg-[#f3f2ff]` highlight, left border coral 2px

**Right chat area (flex-1):**
- Top bar: tenant name + property + status badge
- Message history: bubbles — tenant right `bg-[#ef8354] text-white rounded-2xl rounded-br-sm`, landlord left `bg-white text-[#2d3142] rounded-2xl rounded-bl-sm border border-[#dcc1b7]/20`
- Timestamps in label-md style
- **Viewing Request widget** (shown inline in chat):
  - White card with coral header: `📅 Schedule a Viewing`
  - Date picker (shadcn `Calendar`)
  - Time slots as selectable chips
  - `Confirm Viewing` coral button + `Decline` ghost button
  - When confirmed: green banner `Viewing confirmed — added to Google Calendar`
- Bottom input: text input (ghost bottom-border) + send button (coral)

---

### STEP 10 — Page: LandlordDashboard (`/dashboard`)

Layout: sidebar + main content area

**Left sidebar (260px):** `bg-[#4f5d75]`
- Logo top
- Nav items: Overview, Properties, Tenants, Messages, Maintenance, Payments, Settings
- Active state: "cut-out" effect — active item `bg-[#faf8ff] text-[#2d3142] rounded-l-xl ml-2`
- Inactive: white/70 text

**Main area:** `bg-[#f3f2ff]`

**10a. Overview (default view)**
- Header: `Good morning, Marcus` + date
- Stats row: 4 KPI cards on `bg-white` — Total Properties, Active Tenants, Open Tickets, Revenue This Month — with coral accent numbers
- Recent activity feed
- Upcoming rent due list

**10b. Properties tab**
- List of landlord's properties with edit/view buttons
- `+ List New Property` coral button top right
- Each row: property image thumbnail + title + location + price + tenant count + status badge

**10c. Tenants tab**
- Table: tenant avatar + name + property + rent status (paid/overdue) + open tickets + `Message` action
- Overdue rent: row background `bg-red-50`, status badge `bg-red-100 text-red-700`

**10d. Maintenance tab**
- Tickets table: ID + tenant + property + issue + priority badge + status badge + date
- Priority: High=coral, Medium=amber, Low=slate
- Status: Open=coral, In Progress=amber, Resolved=green
- `View Details` link on each row

**10e. List New Property modal (shadcn Dialog):**
- Multi-step form (3 steps): 
  - Step 1: Property details (address, Eircode, type, rent, bedrooms, bathrooms)
  - Step 2: Amenities checkboxes + house rules
  - Step 3: Photo upload (drag & drop area) + preview
- Step indicator at top: coral active circle, grey future
- RPZ indicator: auto-badge when Eircode entered

---

### STEP 11 — Page: TenantDashboard (`/tenant-dashboard`)

Simplified layout (no sidebar — top nav only):

- **Tab navigation** (horizontal): Overview | My Property | Messages | Tickets | Payments

**Overview tab:**
- Welcome card: property address + landlord name + lease start date
- Rent reminder card (coral): `Rent Due in 3 Days — €950 due on 1 Feb` with `Mark as Paid` button
- Recent messages preview + `Open Chat` button
- Open tickets summary

**My Property tab:**
- Property photos gallery (read-only)
- Lease details: start/end date, rent, notice period
- Lease document download (placeholder)
- Upcoming viewings (appointment list with Google Calendar link)

**Tickets tab:**
- `Raise New Ticket` coral button
- Ticket list: title + status badge + date + image thumbnail
- Ticket detail modal: full description + landlord response + status timeline

**Raise Ticket modal:**
- Title input
- Category select: Heating / Plumbing / Electricity / Other
- Description textarea
- Image upload (Cloudinary placeholder — just UI, not connected)
- `Submit Ticket` coral button

---

## Routing

Set up `react-router-dom` with these routes:
```
/                         → HomePage
/listings                 → ListingsPage
/property/:id             → PropertyDetailPage
/login                    → TenantLoginPage
/landlord                 → LandlordSignupPage
/dashboard                → LandlordDashboard (mock-protected)
/tenant-dashboard         → TenantDashboard (mock-protected)
/chat/:tenancyId          → ChatPage
```

---

## Ireland-Specific Requirements

- All money formatted as `€950/mo` (Euro sign, no space)
- Address fields use `Eircode` label, never "zip code"
- Energy label uses `BER Rating` not "energy rating"
- RTB banner in landlord dashboard: `ℹ️ Remember to register this tenancy with the RTB within 1 month of commencement.` — info banner, coral left border, dismissible
- RPZ badge on listings in RPZ Eircodes: `RPZ AREA` — small red badge on property card

---

## Responsiveness

- All pages must be mobile-first
- Navbar collapses to hamburger at `md` breakpoint
- Listings sidebar hides at `lg` and becomes a filter modal triggered by a button
- Property detail switches to single column at `md`
- Chat sidebar collapses at `md`
- Dashboard sidebar collapses to bottom tab bar at `md`

---

## Notes for Implementation

- All images use Unsplash URLs from mock data — never placeholder.com
- All forms are local state only — no API calls
- Wishlist state managed by `useWishlist` custom hook with `localStorage`
- Chat messages simulated with `setTimeout` for auto-reply
- Viewing confirmation shows a success toast using shadcn `toast`
- `date-fns` used for all date formatting
- No `console.log` statements in final code
- TypeScript strict mode — all props typed