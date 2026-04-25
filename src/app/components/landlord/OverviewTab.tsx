import {
  Wrench, Plus, MoreVertical, ArrowUpRight, CheckCircle,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { StatusBadge } from '../shared/StatusBadge';
import { type Tab } from './types';
import { useCountUp } from '@/hooks/useCountUp';

interface OverviewTabProps {
  onListProperty: () => void;
  isVerified: boolean;
  onNav: (tab: Tab) => void;
}

const PROPERTIES_TABLE = [
  {
    img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=200',
    title: 'FitzWilliam Square 48',
    location: 'D2, Dublin City',
    tenant: { name: 'Alex Thompson', email: 'alexthompson@gmail.com' },
    rent: 2450,
    nextDue: 'Oct 01, 2023',
    status: 'Active' as const,
  },
  {
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200',
    title: 'Merrion Row Studio 12',
    location: 'D2, Dublin City',
    tenant: { name: 'Sarah Jenkins', email: 'sarahjenkins@gmail.com' },
    rent: 1800,
    nextDue: 'Sep 01, 2023',
    status: 'Overdue' as const,
  },
  {
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200',
    title: 'The Crescent House',
    location: 'D4, Ballsbridge',
    tenant: null,
    rent: 3200,
    nextDue: '—',
    status: null,
  },
];

const RECENT_MESSAGES = [
  {
    sender: 'Sarah Jenkins',
    time: '2h ago',
    text: "Hi Liam, I've sent over the proof of payment for th...",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80',
  },
  {
    sender: 'Elena Rossi',
    time: '4h ago',
    text: 'Can we schedule the viewing for next Tuesday at 3 P...',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80',
  },
];

const RECENT_ACTIVITY = [
  { text: 'New viewing request from Arun Kumar',    time: '10 min ago',    dot: 'bg-coral' },
  { text: 'Ticket #tk1 opened — Heating issue',     time: '1 hr ago',      dot: 'bg-amber-400' },
  { text: "Rent received from Priya Nair — €1,100", time: 'Today 8:30 AM', dot: 'bg-green-600' },
  { text: "New message from James O'Connor",        time: 'Yesterday',     dot: 'bg-slate-brand' },
];

const PROPERTIES_PREVIEW = [
  { title: 'Double room in Ranelagh',   location: 'Ranelagh, D6',    price: 950,  status: 'Occupied', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=200' },
  { title: 'Master Suite Smithfield',   location: 'Smithfield, D7',  price: 1100, status: 'Occupied', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200' },
  { title: 'Modern Studio Grand Canal', location: 'Grand Canal, D2', price: 1450, status: 'Vacant',   img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200' },
];

const TABLE_COLS = ['PROPERTY', 'TENANT', 'RENT', 'NEXT DUE', 'STATUS', 'ACTIONS'];

export function OverviewTab({ onListProperty, isVerified, onNav }: OverviewTabProps) {
  const navigate = useNavigate();
  const [carouselIdx, setCarouselIdx] = useState(0);

  // KPI stat card hover states
  const [kpi0Hovered, setKpi0Hovered] = useState(false);
  const [kpi1Hovered, setKpi1Hovered] = useState(false);
  const [kpi2Hovered, setKpi2Hovered] = useState(false);
  const [kpi3Hovered, setKpi3Hovered] = useState(false);

  // Count-up values for KPI cards (started=true → fires on mount)
  const portfolioCount  = useCountUp(3,    800, true);
  const occupancyCount  = useCountUp(2,    800, true);
  const ticketsCount    = useCountUp(2,    800, true);
  const messagesCount   = useCountUp(3,    800, true);

  function handleListProperty() {
    if (!isVerified) {
      navigate('/landlord/verify', { viewTransition: true });
    } else {
      onListProperty();
    }
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div>
        <h1 className="font-bold tracking-[-0.02em] text-[1.6rem] text-jet">Good morning, Liam.</h1>
        <p className="text-sm text-slate-brand mt-0.5">
          {new Date().toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* ── Row 1: 4-col KPI strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

        <div
          className="bg-white rounded-xl p-4 flex flex-col gap-1.5"
          onMouseEnter={() => setKpi0Hovered(true)}
          onMouseLeave={() => setKpi0Hovered(false)}
          style={{
            boxShadow: kpi0Hovered ? '0 16px 48px rgba(23,27,43,0.12)' : '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)',
            transform: kpi0Hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
        >
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.07em] text-slate-brand">Portfolio</span>
          <p className="font-bold text-3xl text-jet tracking-[-0.02em]">{portfolioCount}</p>
          <p className="text-sm text-slate-brand">properties listed</p>
        </div>

        <div
          className="rounded-xl p-4 flex flex-col gap-1.5"
          onMouseEnter={() => setKpi1Hovered(true)}
          onMouseLeave={() => setKpi1Hovered(false)}
          style={{
            background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)',
            boxShadow: kpi1Hovered ? '0 16px 48px rgba(61,77,99,0.40)' : '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)',
            transform: kpi1Hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
        >
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.07em] text-white/50">Occupancy</span>
          <p className="font-bold text-3xl text-white tracking-[-0.02em]">{occupancyCount}</p>
          <p className="text-sm text-white/60">active tenancies</p>
        </div>

        <div
          className="rounded-xl p-4 flex flex-col gap-1.5"
          onMouseEnter={() => setKpi2Hovered(true)}
          onMouseLeave={() => setKpi2Hovered(false)}
          style={{
            background: 'linear-gradient(145deg, #fffbf0 0%, #fff3d6 100%)',
            boxShadow: kpi2Hovered ? '0 16px 48px rgba(23,27,43,0.12)' : '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)',
            border: '1px solid rgba(251,191,36,0.25)',
            transform: kpi2Hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.07em] text-amber-700/80">Maintenance</span>
            <span className="text-[0.58rem] font-bold uppercase tracking-[0.04em] px-1.5 py-0.5 rounded-full bg-red-500 text-white">urgent</span>
          </div>
          <p className="font-bold text-3xl text-jet tracking-[-0.02em]">{ticketsCount}</p>
          <p className="text-sm text-amber-700/70">open tickets</p>
        </div>

        <div
          className="rounded-xl p-4 flex flex-col gap-1.5"
          onMouseEnter={() => setKpi3Hovered(true)}
          onMouseLeave={() => setKpi3Hovered(false)}
          style={{
            background: 'linear-gradient(145deg, #2d3142 0%, #1e2235 100%)',
            boxShadow: kpi3Hovered ? '0 16px 48px rgba(45,49,66,0.55)' : '0 8px 32px rgba(45,49,66,0.40), 0 2px 8px rgba(45,49,66,0.20)',
            transform: kpi3Hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.07em] text-white/50">Messages</span>
            <span className="text-[0.58rem] font-bold uppercase tracking-[0.04em] px-1.5 py-0.5 rounded-full bg-white/15 text-white">new</span>
          </div>
          <p className="font-bold text-3xl text-white tracking-[-0.02em]">{messagesCount}</p>
          <p className="text-sm text-white/60">unread messages</p>
        </div>

      </div>

      {/* ── Row 2: Properties Overview table (full width) ── */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">

        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h2 className="font-bold text-sm text-jet">Properties Overview</h2>
            <p className="text-xs text-slate-brand mt-0.5">Real-time status of your portfolio assets</p>
          </div>
          <button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90 active:scale-[0.97] transition-transform"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            onClick={handleListProperty}
          >
            <Plus size={13} />
            List New Property
          </button>
        </div>

        <div className="overflow-auto rounded-b-xl max-h-[480px]">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col style={{ width: '28%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '14%' }} />
          </colgroup>
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#f5f5f7]">
              {TABLE_COLS.map((col, idx) => (
                <th
                  key={col}
                  className="px-5 py-2.5 text-left text-[0.63rem] font-bold uppercase tracking-[0.07em] text-slate-brand/55"
                  style={{
                    borderRadius: idx === 0 ? '0' : idx === TABLE_COLS.length - 1 ? '0' : undefined,
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROPERTIES_TABLE.map((prop, i) => (
              <tr
                key={prop.title}
                className={`hover:bg-surface-low transition-colors animate-fade-up ${i < PROPERTIES_TABLE.length - 1 ? 'border-b border-[#dcc1b7]/10' : ''}`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <td className="px-5 py-3.5 align-middle">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                      <img src={prop.img} alt={prop.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-jet truncate">{prop.title}</p>
                      <p className="text-xs text-slate-brand truncate">{prop.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 align-middle">
                  {prop.tenant ? (
                    <>
                      <p className="text-sm font-medium text-jet truncate">{prop.tenant.name}</p>
                      <p className="text-xs text-slate-brand truncate">{prop.tenant.email}</p>
                    </>
                  ) : (
                    <p className="text-sm text-slate-brand/50 italic">Unoccupied</p>
                  )}
                </td>
                <td className="px-5 py-3.5 align-middle">
                  <p className="text-sm font-semibold text-jet">€{prop.rent.toLocaleString()}</p>
                </td>
                <td className="px-5 py-3.5 align-middle">
                  <p className={`text-xs font-medium ${prop.status === 'Overdue' ? 'text-red-500 font-bold' : 'text-slate-brand'}`}>
                    {prop.nextDue}
                  </p>
                </td>
                <td className="px-5 py-3.5 align-middle">
                  {prop.status ? (
                    <StatusBadge status={prop.status} />
                  ) : (
                    <span className="text-xs font-bold tracking-[0.04em] uppercase px-2.5 py-0.5 rounded-full bg-surface-low text-slate-brand">
                      Vacant
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 align-middle">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-brand hover:bg-surface-low transition-colors">
                    <MoreVertical size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      </div>

      {/* ── Row 3: Revenue Breakdown + Recent Messages + Recent Activity ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* Revenue Breakdown — coral gradient */}
        <div className="rounded-xl p-5 flex flex-col"
             style={{ background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)' }}>
          <div className="flex items-start justify-between mb-4">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.07em] text-white/70">Monthly Revenue Breakdown</p>
            <span className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.04em] px-3 py-1 rounded-full bg-white/20 text-white whitespace-nowrap">
              <CheckCircle size={10} /> 2 of 3 paid
            </span>
          </div>
          <p className="font-bold text-4xl text-white tracking-[-0.03em]">€6,250<span className="text-base font-medium text-white/70">/mo</span></p>
          <div className="flex gap-6 mt-4">
            {[
              { label: 'Collected', value: '€4,250' },
              { label: 'Pending',   value: '€2,000' },
              { label: 'Occupancy', value: '67%'    },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-white/50">{item.label}</p>
                <p className="text-sm font-semibold text-white mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
          <button onClick={() => onNav('payments')} className="mt-auto pt-4 text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1 transition-colors">
            View Payment Ledger <ArrowUpRight size={11} />
          </button>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-jet">Recent Messages</h3>
            <button onClick={() => onNav('messages')} className="text-[0.68rem] font-bold uppercase tracking-[0.06em] text-coral hover:underline">View All</button>
          </div>
          <div className="flex flex-col gap-4">
            {RECENT_MESSAGES.map((msg, i) => (
              <div key={msg.sender} className="flex items-start gap-3 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-xs font-bold text-jet truncate">{msg.sender}</p>
                    <p className="text-[0.65rem] text-slate-brand shrink-0">{msg.time}</p>
                  </div>
                  <p className="text-xs text-slate-brand leading-relaxed line-clamp-2">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <h3 className="font-bold text-sm text-jet mb-4">Recent Activity</h3>
          <div className="flex flex-col gap-3">
            {RECENT_ACTIVITY.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${activity.dot}`} />
                <div>
                  <p className="text-xs text-jet leading-snug">{activity.text}</p>
                  <p className="text-[0.65rem] text-slate-brand mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Row 5: Properties carousel (2/3) + Maintenance slate gradient (1/3) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        <div className="sm:col-span-2 bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-jet">Your Properties</h3>
            <div className="flex items-center gap-2">
              <button onClick={() => setCarouselIdx(i => Math.max(0, i - 1))} className="w-6 h-6 rounded-full bg-surface-low flex items-center justify-center text-jet hover:bg-surface transition-colors text-xs font-bold">‹</button>
              <button onClick={() => setCarouselIdx(i => Math.min(PROPERTIES_PREVIEW.length - 1, i + 1))} className="w-6 h-6 rounded-full bg-surface-low flex items-center justify-center text-jet hover:bg-surface transition-colors text-xs font-bold">›</button>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', transform: `translateX(-${carouselIdx * 188}px)`, transition: 'transform 300ms ease' }}>
            {PROPERTIES_PREVIEW.map((prop) => (
              <div
                key={prop.title}
                className="shrink-0 w-44 rounded-xl overflow-hidden bg-surface-low cursor-pointer hover:opacity-90 transition-opacity"
              >
                <div className="relative h-24 overflow-hidden">
                  <img src={prop.img} alt={prop.title} className="w-full h-full object-cover" />
                  <span
                    className="absolute top-2 left-2 text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full text-white"
                    style={{ background: prop.status === 'Vacant' ? '#4f5d75' : 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                  >
                    {prop.status}
                  </span>
                </div>
                <div className="p-2">
                  <p className="text-xs font-semibold text-jet leading-tight line-clamp-2">{prop.title}</p>
                  <p className="text-[0.65rem] text-slate-brand mt-0.5">€{prop.price}/mo</p>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.05em] mt-1 text-slate-brand/70">{prop.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-5"
             style={{ background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)', boxShadow: '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-white">Maintenance</h3>
            <button className="text-xs font-semibold text-white/60 hover:text-white transition-colors">View All →</button>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { title: 'Heating issue',      property: 'FitzWilliam', status: 'In Progress' as const },
              { title: 'Leaking tap',         property: 'Merrion Row', status: 'Open' as const        },
              { title: 'Window latch broken', property: 'FitzWilliam', status: 'Open' as const        },
            ].map((ticket, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.09)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white/15">
                  <Wrench size={13} className="text-white/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{ticket.title}</p>
                  <p className="text-[0.65rem] text-white/50 mt-0.5">{ticket.property}</p>
                </div>
                <StatusBadge status={ticket.status} />
              </div>
            ))}
          </div>
        </div>

      </div>


    </div>
  );
}
