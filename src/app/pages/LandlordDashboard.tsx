import { useState } from 'react';
import { Link } from 'react-router';
import {
  LayoutDashboard, Building2, Users, MessageSquare, Wrench,
  CreditCard, Settings, X, Plus, TrendingUp,
  Bell, ChevronRight, BarChart3, Calendar
} from 'lucide-react';
import { LogoMark } from '../components/shared/LogoMark';
import { toast } from 'sonner';
import { StatusBadge } from '../components/shared/StatusBadge';
import { mockProperties, mockTenants, mockTickets } from '../../data/mockProperties';

type Tab = 'overview' | 'properties' | 'tenants' | 'messages' | 'maintenance' | 'payments' | 'settings';

const NAV_ITEMS: { id: Tab; icon: React.ReactNode; label: string }[] = [
  { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Overview' },
  { id: 'properties', icon: <Building2 size={18} />, label: 'Properties' },
  { id: 'tenants', icon: <Users size={18} />, label: 'Tenants' },
  { id: 'messages', icon: <MessageSquare size={18} />, label: 'Messages' },
  { id: 'maintenance', icon: <Wrench size={18} />, label: 'Maintenance' },
  { id: 'payments', icon: <CreditCard size={18} />, label: 'Payments' },
  { id: 'settings', icon: <Settings size={18} />, label: 'Settings' },
];

const PRIORITY_CLASSES: Record<string, string> = {
  High: 'text-coral',
  Medium: 'text-amber-500',
  Low: 'text-slate-brand',
};

export function LandlordDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [rtbDismissed, setRtbDismissed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const landlordProps = mockProperties.slice(0, 3);
  const kpis = [
    { label: 'Total Properties', value: '3', icon: <Building2 size={20} />, trend: '+1 this month' },
    { label: 'Active Tenants', value: '3', icon: <Users size={20} />, trend: 'All current' },
    { label: 'Open Tickets', value: '2', icon: <Wrench size={20} />, trend: '1 urgent' },
    { label: 'Revenue This Month', value: '€2,700', icon: <TrendingUp size={20} />, trend: '+€150 vs last month' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface-low">
      {/* Top bar */}
      <div className="h-14 flex items-center justify-between px-4 sm:px-6 shrink-0 z-30 sticky top-0 bg-jet">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <LayoutDashboard size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <LogoMark size={20} className="text-coral" />
            <span className="text-white font-bold text-base tracking-tight">HomLiv</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10">
            <Bell size={15} className="text-white" />
          </button>
          <img src="https://i.pravatar.cc/150?img=55" alt="Marcus" className="w-8 h-8 rounded-full object-cover" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`shrink-0 flex-col ${sidebarOpen ? 'flex' : 'hidden'} lg:flex fixed lg:static inset-y-14 lg:inset-auto z-20 hidden lg:flex w-[260px] bg-slate-brand h-screen sticky top-0`}
        >
          <div className="flex flex-col gap-1 p-3 pt-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={
                  activeTab === item.id
                    ? 'flex items-center gap-3 px-4 py-3 rounded-l-xl ml-2 font-semibold text-jet bg-surface cursor-pointer w-full text-left text-sm'
                    : 'flex items-center gap-3 px-4 py-3 rounded-l-xl ml-2 text-white/70 hover:text-white transition-colors cursor-pointer w-full text-left text-sm'
                }
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* RTB Banner */}
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

          {/* ── OVERVIEW ── */}
          {activeTab === 'overview' && (
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
                  onClick={() => setActiveTab('properties')}
                >
                  <Plus size={14} />
                  List Property
                </button>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {kpis.map((kpi) => (
                  <div key={kpi.label} className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
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
                {/* Upcoming Rent */}
                <div className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
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

                {/* Recent Activity */}
                <div className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
                  <h3 className="font-bold text-base mb-4 text-jet">Recent Activity</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { text: 'New viewing request from Arun Kumar', time: '10 min ago', dot: 'bg-coral' },
                      { text: 'Ticket #tk1 opened — Heating issue', time: '1 hr ago', dot: 'bg-amber-400' },
                      { text: 'Rent received from Priya Nair — €1,100', time: 'Today 8:30 AM', dot: 'bg-green-600' },
                      { text: 'New message from James O\'Connor', time: 'Yesterday', dot: 'bg-slate-brand' },
                    ].map((activity, i) => (
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
          )}

          {/* ── PROPERTIES ── */}
          {activeTab === 'properties' && (
            <>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-xl text-jet" style={{ letterSpacing: '-0.01em' }}>My Properties</h2>
                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                  onClick={() => setShowNewPropertyModal(true)}
                >
                  <Plus size={14} />
                  List New Property
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {landlordProps.map((prop) => (
                  <div key={prop.id} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
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
          )}

          {/* ── TENANTS ── */}
          {activeTab === 'tenants' && (
            <>
              <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Tenants</h2>
              <div className="bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
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
                        <tr
                          key={t.id}
                          className={`border-b border-ghost/10 ${t.status === 'overdue' ? 'bg-red-50' : ''}`}
                        >
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
          )}

          {/* ── MAINTENANCE ── */}
          {activeTab === 'maintenance' && (
            <>
              <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Maintenance Tickets</h2>
              <div className="bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
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
          )}

          {/* ── MESSAGES ── */}
          {activeTab === 'messages' && (
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
          )}

          {/* ── PAYMENTS ── */}
          {activeTab === 'payments' && (
            <>
              <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Payments</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Collected This Month', value: '€2,700', cls: 'text-green-600' },
                  { label: 'Pending', value: '€750', cls: 'text-amber-500' },
                  { label: 'Overdue', value: '€950', cls: 'text-red-600' },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
                    <p className={`font-bold text-2xl ${item.cls}`}>{item.value}</p>
                    <p className="text-xs mt-1 text-slate-brand">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
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
          )}

          {/* ── SETTINGS ── */}
          {activeTab === 'settings' && (
            <>
              <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Settings</h2>
              <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
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
                  {['Notification Preferences', 'Payment Methods', 'Security', 'Privacy'].map((item) => (
                    <div key={item} className="flex items-center justify-between py-3 border-b border-ghost/15">
                      <span className="text-sm font-medium text-jet">{item}</span>
                      <ChevronRight size={16} className="text-slate-brand" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>

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
                  className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
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
    </div>
  );
}
