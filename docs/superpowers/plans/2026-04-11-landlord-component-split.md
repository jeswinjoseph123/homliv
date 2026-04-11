# Landlord Component Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split `LandlordDashboard.tsx` into focused per-tab components under `src/app/components/landlord/`, mirroring the tenant component pattern exactly.

**Architecture:** `LandlordDashboard.tsx` becomes a thin shell owning only top-level UI state (`activeTab`, `rtbDismissed`, `sidebarOpen`, `showNewPropertyModal`). Each tab's UI is extracted to its own file in `src/app/components/landlord/`. The 3-step `ListPropertyModal` owns its own form state internally. Types and constants shared across tabs live in `types.ts`.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v4, lucide-react, sonner (toast), react-router v7, mock data from `src/data/mockProperties.ts`

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `src/app/components/landlord/types.ts` | `Tab` union, `NewPropertyForm` interface, `PRIORITY_CLASSES` map |
| Create | `src/app/components/landlord/LandlordSidebar.tsx` | Sidebar nav + mobile backdrop |
| Create | `src/app/components/landlord/OverviewTab.tsx` | KPI cards, Upcoming Rent Due, Recent Activity |
| Create | `src/app/components/landlord/PropertiesTab.tsx` | Property list rows + "List New Property" trigger |
| Create | `src/app/components/landlord/TenantsTab.tsx` | Tenants table |
| Create | `src/app/components/landlord/MessagesTab.tsx` | Link-to-chat placeholder |
| Create | `src/app/components/landlord/MaintenanceTab.tsx` | Maintenance tickets table |
| Create | `src/app/components/landlord/PaymentsTab.tsx` | Payment stat cards + payment history |
| Create | `src/app/components/landlord/SettingsTab.tsx` | Profile panel + settings list |
| Create | `src/app/components/landlord/ListPropertyModal.tsx` | 3-step listing wizard (self-contained state) |
| Modify | `src/app/pages/LandlordDashboard.tsx` | Thin shell — state + wiring only |

---

### Task 1: Create `types.ts`

**Files:**
- Create: `src/app/components/landlord/types.ts`

- [ ] **Step 1: Create the types file**

```ts
export type Tab =
  | 'overview'
  | 'properties'
  | 'tenants'
  | 'messages'
  | 'maintenance'
  | 'payments'
  | 'settings';

export interface NewPropertyForm {
  address: string;
  eircode: string;
  type: string;
  rent: string;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
  houseRules: string;
}

export const PRIORITY_CLASSES: Record<string, string> = {
  High: 'text-coral',
  Medium: 'text-amber-500',
  Low: 'text-slate-brand',
};
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run typecheck`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/components/landlord/types.ts
git commit -m "feat: add landlord component types"
```

---

### Task 2: Create `LandlordSidebar.tsx`

**Files:**
- Create: `src/app/components/landlord/LandlordSidebar.tsx`

- [ ] **Step 1: Create the sidebar component**

```tsx
import { LayoutDashboard, Building2, Users, MessageSquare, Wrench, CreditCard, Settings } from 'lucide-react';
import { type Tab } from './types';

const NAV_ITEMS: { id: Tab; icon: React.ReactNode; label: string }[] = [
  { id: 'overview',     icon: <LayoutDashboard size={18} />, label: 'Overview' },
  { id: 'properties',   icon: <Building2 size={18} />,       label: 'Properties' },
  { id: 'tenants',      icon: <Users size={18} />,           label: 'Tenants' },
  { id: 'messages',     icon: <MessageSquare size={18} />,   label: 'Messages' },
  { id: 'maintenance',  icon: <Wrench size={18} />,          label: 'Maintenance' },
  { id: 'payments',     icon: <CreditCard size={18} />,      label: 'Payments' },
  { id: 'settings',     icon: <Settings size={18} />,        label: 'Settings' },
];

interface LandlordSidebarProps {
  activeTab: Tab;
  onNav: (id: Tab) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function LandlordSidebar({ activeTab, onNav, isOpen, onClose }: LandlordSidebarProps) {
  return (
    <>
      <aside
        className={`shrink-0 flex-col ${isOpen ? 'flex' : 'hidden'} lg:flex fixed lg:relative inset-y-16 lg:inset-y-0 left-0 z-40 w-[210px] bg-slate-brand h-[calc(100vh-4rem)] lg:h-full`}
        style={{ boxShadow: '6px 0 40px rgba(23,27,43,0.55), 2px 0 8px rgba(23,27,43,0.25)' }}
      >
        <div className="h-10 flex items-center px-4 shrink-0">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.07em] text-white/40">Landlord Suite</span>
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
        <div
          className="fixed inset-0 bg-ink/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run typecheck`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/components/landlord/LandlordSidebar.tsx
git commit -m "feat: add LandlordSidebar component"
```

---

### Task 3: Create `OverviewTab.tsx`

**Files:**
- Create: `src/app/components/landlord/OverviewTab.tsx`

- [ ] **Step 1: Create the overview tab**

```tsx
import { Building2, Users, Wrench, TrendingUp, BarChart3, Calendar, Plus } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';
import { mockTenants } from '../../../data/mockProperties';

interface OverviewTabProps {
  onListProperty: () => void;
}

const kpis = [
  { label: 'Total Properties', value: '3', icon: <Building2 size={20} />, trend: '+1 this month' },
  { label: 'Active Tenants',   value: '3', icon: <Users size={20} />,     trend: 'All current' },
  { label: 'Open Tickets',     value: '2', icon: <Wrench size={20} />,    trend: '1 urgent' },
  { label: 'Revenue This Month', value: '€2,700', icon: <TrendingUp size={20} />, trend: '+€150 vs last month' },
];

const RECENT_ACTIVITY = [
  { text: 'New viewing request from Arun Kumar',     time: '10 min ago',    dot: 'bg-coral' },
  { text: 'Ticket #tk1 opened — Heating issue',      time: '1 hr ago',      dot: 'bg-amber-400' },
  { text: "Rent received from Priya Nair — €1,100",  time: 'Today 8:30 AM', dot: 'bg-green-600' },
  { text: "New message from James O'Connor",          time: 'Yesterday',     dot: 'bg-slate-brand' },
];

export function OverviewTab({ onListProperty }: OverviewTabProps) {
  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-bold text-2xl text-jet" style={{ letterSpacing: '-0.01em' }}>
            Good morning, Marcus
          </h1>
          <p className="text-sm mt-0.5 text-slate-brand">
            {new Date().toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
          onClick={onListProperty}
        >
          <Plus size={14} />
          List Property
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-coral/10 text-coral mb-3">
                {kpi.icon}
              </div>
              <BarChart3 size={14} className="text-coral" />
            </div>
            <p className="font-bold text-2xl text-coral" style={{ letterSpacing: '-0.02em' }}>{kpi.value}</p>
            <p className="text-xs font-medium mt-0.5 text-jet">{kpi.label}</p>
            <p className="text-xs mt-0.5 text-slate-brand">{kpi.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-jet">Upcoming Rent Due</h3>
            <Calendar size={16} className="text-coral" />
          </div>
          <div className="flex flex-col gap-3">
            {mockTenants.map((tenant) => (
              <div key={tenant.id} className={`flex items-center justify-between ${tenant.status === 'overdue' ? 'bg-red-50' : ''}`}>
                <div className="flex items-center gap-2.5">
                  <img src={tenant.avatar} alt={tenant.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-jet">{tenant.name}</p>
                    <p className="text-xs text-slate-brand">Due {tenant.rentDue}</p>
                  </div>
                </div>
                <StatusBadge status={tenant.status === 'overdue' ? 'Overdue' : 'Active'} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <h3 className="font-bold text-base mb-4 text-jet">Recent Activity</h3>
          <div className="flex flex-col gap-3">
            {RECENT_ACTIVITY.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${activity.dot}`} />
                <div>
                  <p className="text-sm text-jet">{activity.text}</p>
                  <p className="text-xs text-slate-brand">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run typecheck`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/components/landlord/OverviewTab.tsx
git commit -m "feat: add LandlordDashboard OverviewTab component"
```

---

### Task 4: Create `PropertiesTab.tsx`

**Files:**
- Create: `src/app/components/landlord/PropertiesTab.tsx`

- [ ] **Step 1: Create the properties tab**

```tsx
import { Plus, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';
import { mockProperties } from '../../../data/mockProperties';

interface PropertiesTabProps {
  onListNew: () => void;
}

const landlordProps = mockProperties.slice(0, 3);

export function PropertiesTab({ onListNew }: PropertiesTabProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-xl text-jet" style={{ letterSpacing: '-0.01em' }}>My Properties</h2>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
          onClick={onListNew}
        >
          <Plus size={14} />
          List New Property
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {landlordProps.map((prop) => (
          <div key={prop.id} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
            <img src={prop.images[0]} alt={prop.title} className="w-16 h-12 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate text-jet">{prop.title}</p>
              <p className="text-xs truncate text-slate-brand">{prop.location}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-sm text-coral">€{prop.price}/mo</p>
              <StatusBadge status={prop.available ? 'Active' : 'Resolved'} />
            </div>
            <button className="text-xs font-semibold shrink-0 ml-2 flex items-center gap-1 text-coral">
              Edit <ChevronRight size={12} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run typecheck`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/components/landlord/PropertiesTab.tsx
git commit -m "feat: add LandlordDashboard PropertiesTab component"
```

---

### Task 5: Create `TenantsTab.tsx`

**Files:**
- Create: `src/app/components/landlord/TenantsTab.tsx`

- [ ] **Step 1: Create the tenants tab**

```tsx
import { MessageSquare } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';
import { mockTenants } from '../../../data/mockProperties';

export function TenantsTab() {
  return (
    <>
      <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Tenants</h2>
      <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ghost/20">
                {['Tenant', 'Property', 'Rent Due', 'Status', 'Tickets', 'Action'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-[0.06em] text-slate-brand">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTenants.map((t) => (
                <tr key={t.id} className={`border-b border-ghost/10 ${t.status === 'overdue' ? 'bg-red-50' : ''}`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-sm font-medium text-jet">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-brand">{t.property}</td>
                  <td className="px-5 py-3.5 text-sm text-jet">{t.rentDue}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={t.status === 'overdue' ? 'Overdue' : 'Active'} />
                  </td>
                  <td className={`px-5 py-3.5 text-sm text-center ${t.tickets > 0 ? 'text-coral' : 'text-slate-brand'}`}>
                    {t.tickets}
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-xs font-semibold flex items-center gap-1 text-coral">
                      <MessageSquare size={12} /> Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run typecheck`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/components/landlord/TenantsTab.tsx
git commit -m "feat: add LandlordDashboard TenantsTab component"
```

---

### Task 6: Create `MessagesTab.tsx`

**Files:**
- Create: `src/app/components/landlord/MessagesTab.tsx`

- [ ] **Step 1: Create the messages tab**

```tsx
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router';

export function MessagesTab() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <MessageSquare size={40} className="text-coral" />
      <h3 className="font-bold text-lg mt-4 mb-2 text-jet">Go to Full Chat</h3>
      <p className="text-sm mb-6 text-slate-brand">Open the messaging centre to chat with your tenants.</p>
      <Link
        to="/chat/c1"
        className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
        style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
      >
        Open Messages
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run typecheck`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/components/landlord/MessagesTab.tsx
git commit -m "feat: add LandlordDashboard MessagesTab component"
```

---

### Task 7: Create `MaintenanceTab.tsx`

**Files:**
- Create: `src/app/components/landlord/MaintenanceTab.tsx`

- [ ] **Step 1: Create the maintenance tab**

```tsx
import { StatusBadge } from '../shared/StatusBadge';
import { mockTickets } from '../../../data/mockProperties';
import { PRIORITY_CLASSES } from './types';

export function MaintenanceTab() {
  return (
    <>
      <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Maintenance Tickets</h2>
      <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ghost/20">
                {['ID', 'Tenant', 'Property', 'Issue', 'Priority', 'Status', 'Date', 'Action'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-[0.06em] text-slate-brand">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-ghost/10">
                  <td className="px-4 py-3.5 text-xs font-mono text-slate-brand">{ticket.id}</td>
                  <td className="px-4 py-3.5 text-sm text-jet">{ticket.tenantName}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-brand">{ticket.property}</td>
                  <td className="px-4 py-3.5 text-sm text-jet">{ticket.issue}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-bold ${PRIORITY_CLASSES[ticket.priority]}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-brand">{ticket.date}</td>
                  <td className="px-4 py-3.5">
                    <button className="text-xs font-semibold text-coral">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run typecheck`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/components/landlord/MaintenanceTab.tsx
git commit -m "feat: add LandlordDashboard MaintenanceTab component"
```

---

### Task 8: Create `PaymentsTab.tsx`

**Files:**
- Create: `src/app/components/landlord/PaymentsTab.tsx`

- [ ] **Step 1: Create the payments tab**

```tsx
import { StatusBadge } from '../shared/StatusBadge';
import { mockTenants } from '../../../data/mockProperties';

const PAYMENT_STATS = [
  { label: 'Collected This Month', value: '€2,700', cls: 'text-green-600' },
  { label: 'Pending',              value: '€750',   cls: 'text-amber-500' },
  { label: 'Overdue',              value: '€950',   cls: 'text-red-600' },
];

export function PaymentsTab() {
  return (
    <>
      <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Payments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {PAYMENT_STATS.map((item) => (
          <div key={item.label} className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
            <p className={`font-bold text-2xl ${item.cls}`}>{item.value}</p>
            <p className="text-xs mt-1 text-slate-brand">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <h3 className="font-bold text-base mb-4 text-jet">Payment History</h3>
        {mockTenants.map((t) => (
          <div key={t.id} className="flex items-center justify-between py-3 border-b border-ghost/15">
            <div className="flex items-center gap-2.5">
              <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-jet">{t.name}</p>
                <p className="text-xs text-slate-brand">{t.property}</p>
              </div>
            </div>
            <StatusBadge status={t.status === 'overdue' ? 'Overdue' : 'Active'} />
          </div>
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run typecheck`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/components/landlord/PaymentsTab.tsx
git commit -m "feat: add LandlordDashboard PaymentsTab component"
```

---

### Task 9: Create `SettingsTab.tsx`

**Files:**
- Create: `src/app/components/landlord/SettingsTab.tsx`

- [ ] **Step 1: Create the settings tab**

```tsx
import { ChevronRight } from 'lucide-react';

const SETTINGS_ITEMS = ['Notification Preferences', 'Payment Methods', 'Security', 'Privacy'];

export function SettingsTab() {
  return (
    <>
      <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Settings</h2>
      <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="flex items-center gap-4 mb-6">
          <img src="https://i.pravatar.cc/150?img=55" alt="Marcus" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <p className="font-bold text-base text-jet">Marcus O'Brien</p>
            <p className="text-sm text-slate-brand">marcus@docklandspm.ie</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block bg-coral/10 text-coral">
              Premium Landlord
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {SETTINGS_ITEMS.map((item) => (
            <div key={item} className="flex items-center justify-between py-3 border-b border-ghost/15">
              <span className="text-sm font-medium text-jet">{item}</span>
              <ChevronRight size={16} className="text-slate-brand" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run typecheck`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/components/landlord/SettingsTab.tsx
git commit -m "feat: add LandlordDashboard SettingsTab component"
```

---

### Task 10: Create `ListPropertyModal.tsx`

**Files:**
- Create: `src/app/components/landlord/ListPropertyModal.tsx`

- [ ] **Step 1: Create the modal component (owns its own form state)**

```tsx
import { useState } from 'react';
import { toast } from 'sonner';
import { type NewPropertyForm } from './types';

interface ListPropertyModalProps {
  open: boolean;
  onClose: () => void;
}

const EMPTY_FORM: NewPropertyForm = {
  address: '',
  eircode: '',
  type: 'Double Room',
  rent: '',
  bedrooms: '1',
  bathrooms: '1',
  amenities: [],
  houseRules: '',
};

const ROOM_TYPES = ['Single Room', 'Double Room', 'En-Suite', 'Studio', 'Penthouse'];
const AMENITY_OPTIONS = ['WiFi', 'Bills Inc.', 'Parking', 'Garden', 'Gym', 'Balcony', 'Concierge', 'En-suite', 'AC'];

export function ListPropertyModal({ open, onClose }: ListPropertyModalProps) {
  const [modalStep, setModalStep] = useState(1);
  const [form, setForm] = useState<NewPropertyForm>(EMPTY_FORM);

  const isRPZ = form.eircode.trim().length > 0;

  function handleClose() {
    setModalStep(1);
    setForm(EMPTY_FORM);
    onClose();
  }

  function handleNext() {
    if (modalStep < 3) {
      setModalStep((s) => s + 1);
    } else {
      handleClose();
      toast.success('Property listed successfully!');
    }
  }

  function handleBack() {
    if (modalStep > 1) {
      setModalStep((s) => s - 1);
    } else {
      handleClose();
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/40"
        onClick={handleClose}
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
          {/* Step 1: Details */}
          {modalStep === 1 && (
            <>
              <div>
                <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                  Street Address
                </label>
                <input
                  className="w-full border-0 border-b border-ghost/30 bg-transparent px-0 py-2 text-sm text-jet outline-none focus:border-coral transition-colors placeholder:text-slate-brand/40"
                  placeholder="14 Fitzwilliam Square"
                  value={form.address}
                  onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
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
                    value={form.eircode}
                    onChange={(e) => setForm((p) => ({ ...p, eircode: e.target.value }))}
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
                  value={form.type}
                  onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                >
                  {ROOM_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Monthly Rent (€)', key: 'rent',      placeholder: '950' },
                  { label: 'Bedrooms',          key: 'bedrooms',  placeholder: '1' },
                  { label: 'Bathrooms',         key: 'bathrooms', placeholder: '1' },
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
                      value={form[key as keyof NewPropertyForm] as string}
                      onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 2: Amenities & Rules */}
          {modalStep === 2 && (
            <>
              <div>
                <p className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand mb-3">Amenities</p>
                <div className="grid grid-cols-2 gap-2">
                  {AMENITY_OPTIONS.map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-coral rounded"
                        checked={form.amenities.includes(amenity)}
                        onChange={() =>
                          setForm((p) => ({
                            ...p,
                            amenities: p.amenities.includes(amenity)
                              ? p.amenities.filter((a) => a !== amenity)
                              : [...p.amenities, amenity],
                          }))
                        }
                      />
                      <span className="text-sm text-jet">{amenity}</span>
                    </label>
                  ))}
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
                  value={form.houseRules}
                  onChange={(e) => setForm((p) => ({ ...p, houseRules: e.target.value }))}
                />
              </div>
            </>
          )}

          {/* Step 3: Photos */}
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
              onClick={handleBack}
            >
              {modalStep > 1 ? '← Back' : 'Cancel'}
            </button>
            <button
              className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
              onClick={handleNext}
            >
              {modalStep < 3 ? 'Next →' : 'Submit Listing'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run typecheck`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/components/landlord/ListPropertyModal.tsx
git commit -m "feat: add ListPropertyModal component"
```

---

### Task 11: Refactor `LandlordDashboard.tsx` to thin shell

**Files:**
- Modify: `src/app/pages/LandlordDashboard.tsx`

- [ ] **Step 1: Replace entire file with the thin shell**

```tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { LandlordSidebar } from '../components/landlord/LandlordSidebar';
import { OverviewTab } from '../components/landlord/OverviewTab';
import { PropertiesTab } from '../components/landlord/PropertiesTab';
import { TenantsTab } from '../components/landlord/TenantsTab';
import { MessagesTab } from '../components/landlord/MessagesTab';
import { MaintenanceTab } from '../components/landlord/MaintenanceTab';
import { PaymentsTab } from '../components/landlord/PaymentsTab';
import { SettingsTab } from '../components/landlord/SettingsTab';
import { ListPropertyModal } from '../components/landlord/ListPropertyModal';
import { type Tab } from '../components/landlord/types';

export function LandlordDashboard() {
  const [activeTab, setActiveTab]               = useState<Tab>('overview');
  const [rtbDismissed, setRtbDismissed]         = useState(false);
  const [sidebarOpen, setSidebarOpen]           = useState(false);
  const [showNewPropertyModal, setShowNewPropertyModal] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface-low">
      <Navbar
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{ name: "Marcus O'Brien", avatar: 'https://i.pravatar.cc/150?img=55' }}
      />

      <div className="flex flex-1 overflow-hidden min-h-0">
        <LandlordSidebar
          activeTab={activeTab}
          onNav={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 max-w-[1100px] mx-auto w-full">
            {!rtbDismissed && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border-l-4 border-coral mb-5">
                <span className="text-coral shrink-0 mt-0.5">ℹ️</span>
                <p className="text-sm flex-1 text-jet">
                  <strong>Remember</strong> to register this tenancy with the RTB within 1 month of commencement.
                </p>
                <button onClick={() => setRtbDismissed(true)}>
                  <X size={16} className="text-slate-brand" />
                </button>
              </div>
            )}

            {activeTab === 'overview'     && <OverviewTab onListProperty={() => { setActiveTab('properties'); setShowNewPropertyModal(true); }} />}
            {activeTab === 'properties'   && <PropertiesTab onListNew={() => setShowNewPropertyModal(true)} />}
            {activeTab === 'tenants'      && <TenantsTab />}
            {activeTab === 'messages'     && <MessagesTab />}
            {activeTab === 'maintenance'  && <MaintenanceTab />}
            {activeTab === 'payments'     && <PaymentsTab />}
            {activeTab === 'settings'     && <SettingsTab />}
          </div>
        </main>
      </div>

      <ListPropertyModal
        open={showNewPropertyModal}
        onClose={() => setShowNewPropertyModal(false)}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run typecheck`
Expected: no errors

- [ ] **Step 3: Run dev server and verify the dashboard works**

Run: `npm run dev`

Check:
- All 7 tabs render correctly
- "List Property" button in Overview opens the modal
- "List New Property" button in Properties tab opens the modal
- Modal steps 1 → 2 → 3 work and submit shows a toast
- Mobile sidebar toggle works
- RTB banner dismisses

- [ ] **Step 4: Commit**

```bash
git add src/app/pages/LandlordDashboard.tsx
git commit -m "refactor: split LandlordDashboard into landlord component files"
```

---

### Task 12: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Add the landlord component split documentation to CLAUDE.md**

Add a new section after the Tenant Dashboard section:

```markdown
## Landlord Dashboard — Component Split

`LandlordDashboard.tsx` is a **thin shell** — it owns state and wires components together only. All tab UI lives in `src/app/components/landlord/`.

\```
src/app/components/landlord/
  types.ts              — Tab union, NewPropertyForm interface + PRIORITY_CLASSES map
  LandlordSidebar.tsx   — sidebar nav + mobile backdrop (props: activeTab, onNav, isOpen, onClose)
  OverviewTab.tsx       — KPI cards, upcoming rent, recent activity (props: onListProperty)
  PropertiesTab.tsx     — property list rows (props: onListNew)
  TenantsTab.tsx        — tenants table (no special props)
  MessagesTab.tsx       — link to chat page (no special props)
  MaintenanceTab.tsx    — maintenance tickets table (no special props)
  PaymentsTab.tsx       — payment stats + history (no special props)
  SettingsTab.tsx       — profile, settings list (no special props)
  ListPropertyModal.tsx — 3-step listing wizard (props: open, onClose — owns form state internally)
\```

**State owned by LandlordDashboard.tsx:**
- `activeTab` — current visible tab
- `rtbDismissed` — RTB compliance banner toggle
- `sidebarOpen` — mobile sidebar toggle
- `showNewPropertyModal` — modal visibility

**Key difference from TenantDashboard:** `ListPropertyModal` owns its own `newProp` form state and `modalStep` internally (unlike `RaiseTicketModal` which receives form state as props), because no other tab needs access to the property form data.
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run typecheck`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "chore: update CLAUDE.md with landlord component split documentation"
```
