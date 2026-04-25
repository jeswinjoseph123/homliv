import { useState } from 'react';
import { Link } from 'react-router';
import {
  Heart, MessageSquare, Calendar, CheckCircle, Wrench,
  Share2, Hammer, ArrowUpRight, MapPin, Home,
} from 'lucide-react';
import { toast } from 'sonner';
import { StatusBadge } from '@/app/components/shared/StatusBadge';
import { type Tab, type LocalTicket } from './types';
import { type Property } from '@/types';

interface OverviewTabProps {
  wishlistItems: Property[];
  tickets: LocalTicket[];
  onNav: (id: Tab) => void;
  onRaiseTicket: () => void;
}

export function OverviewTab({ wishlistItems, tickets, onNav, onRaiseTicket }: OverviewTabProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-5 max-w-[1100px] mx-auto w-full">

      {/* Header */}
      <div className="animate-fade-up flex items-start justify-between gap-4 flex-wrap" style={{ animationDelay: '0ms' }}>
        <div>
          <h1 className="font-bold tracking-[-0.02em] text-[1.6rem] text-jet">Good morning, Arun.</h1>
          <p className="text-sm text-slate-brand mt-0.5">
            Your residence at <span className="text-jet font-medium">Double room in Ranelagh</span> is looking great this month.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => toast.info('Share access coming soon')} className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border text-jet transition-colors hover:bg-surface-low"
                  style={{ borderColor: 'rgba(220,193,183,0.40)' }}>
            <Share2 size={13} />
            Share Access
          </button>
          <button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90 active:scale-[0.97] transition-transform"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            onClick={onRaiseTicket}
          >
            <Hammer size={13} />
            Request Repair
          </button>
        </div>
      </div>

      {/* 3-col grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* Wishlisted */}
        <div
          className="animate-fade-up bg-white rounded-xl p-4 flex flex-col gap-3"
          style={{
            animationDelay: '80ms',
            transform: hoveredCard === 'wishlist' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoveredCard === 'wishlist' ? '0 16px 48px rgba(23,27,43,0.12)' : '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
          onMouseEnter={() => setHoveredCard('wishlist')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-surface-low flex items-center justify-center">
              <Heart size={15} className="text-coral" />
            </div>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.06em] text-slate-brand">Saved</span>
          </div>
          <div>
            <p className="font-bold text-2xl text-jet tracking-[-0.02em]">{wishlistItems.length}</p>
            <p className="text-sm text-slate-brand mt-0.5">Wishlisted properties</p>
          </div>
          <button className="text-xs font-semibold text-coral flex items-center gap-1 hover:underline"
                  onClick={() => onNav('wishlist')}>
            View wishlist <ArrowUpRight size={11} />
          </button>
        </div>

        {/* Active Chats */}
        <div
          className="animate-fade-up bg-white rounded-xl p-4 flex flex-col gap-3"
          style={{
            animationDelay: '160ms',
            transform: hoveredCard === 'chats' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoveredCard === 'chats' ? '0 16px 48px rgba(23,27,43,0.12)' : '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
          onMouseEnter={() => setHoveredCard('chats')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-surface-low flex items-center justify-center">
              <MessageSquare size={15} className="text-slate-brand" />
            </div>
            <span className="w-5 h-5 rounded-full bg-coral text-white text-[0.6rem] font-bold flex items-center justify-center">3</span>
          </div>
          <div>
            <p className="font-bold text-2xl text-jet tracking-[-0.02em]">2</p>
            <p className="text-sm text-slate-brand mt-0.5">Active chats with landlords</p>
          </div>
          <button className="text-xs font-semibold text-coral flex items-center gap-1 hover:underline"
                  onClick={() => onNav('chats')}>
            Go to chats <ArrowUpRight size={11} />
          </button>
        </div>

        {/* Next Viewing — coral gradient */}
        <div
          className="animate-fade-up rounded-xl p-4 flex flex-col gap-3"
          style={{
            animationDelay: '240ms',
            background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)',
            transform: hoveredCard === 'viewing' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoveredCard === 'viewing' ? '0 20px 56px rgba(180,80,40,0.40), 0 4px 12px rgba(180,80,40,0.20)' : '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
          onMouseEnter={() => setHoveredCard('viewing')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/20">
              <Calendar size={15} className="text-white" />
            </div>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.06em] text-white/70">Upcoming</span>
          </div>
          <div>
            <p className="font-bold text-sm text-white/80 leading-snug">Next Viewing:</p>
            <p className="font-bold text-base text-white mt-0.5">Thursday 10 Apr</p>
            <p className="text-xs text-white/70">Scheduled for 2:00pm</p>
          </div>
          <button onClick={() => onNav('tenancy')} className="text-xs font-semibold text-white flex items-center gap-1 hover:underline opacity-90">
            View details <ArrowUpRight size={11} />
          </button>
        </div>

        {/* Rent Status */}
        <div className="sm:col-span-2 bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <div className="flex items-start justify-between mb-4">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.07em] text-slate-brand">Current Rent Status</p>
            <span className="flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-[0.06em] px-2 py-0.5 rounded-full bg-green-100 text-green-700">
              <CheckCircle size={9} /> Paid for Feb
            </span>
          </div>
          <p className="font-bold text-4xl text-coral tracking-[-0.03em]">€950<span className="text-base font-medium text-slate-brand">/mo</span></p>
          <div className="flex gap-6 mt-4">
            {[
              { label: 'Rent Start', value: '1 Feb 2024' },
              { label: 'Lease End',  value: 'June 2025'  },
              { label: 'Status',     value: 'Enabled'    },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand/60">{item.label}</p>
                <p className="text-sm font-semibold text-jet mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 text-xs font-semibold text-coral hover:underline flex items-center gap-1"
                  onClick={() => onNav('payments')}>
            View Ledger History <ArrowUpRight size={11} />
          </button>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-jet">Recent Messages</h3>
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-full bg-coral text-white">2 NEW</span>
            </div>
            <Link to="/chat/c1" className="text-xs font-semibold text-coral hover:underline">Open →</Link>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { sender: 'Property Manager', time: '11:30 AM', text: '"Hi Arun, we\'ve scheduled the HVAC inspection for Tuesday at 2 PM. Can you confirm?"' },
              { sender: 'Maintenance Desk', time: 'Yesterday', text: '"Your request regarding the balcony lighting has been assigned to a technician..."' },
            ].map((msg) => (
              <div key={msg.sender} className="rounded-xl p-3 bg-surface-low">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-coral">{msg.sender}</p>
                  <p className="text-[0.65rem] text-slate-brand">{msg.time}</p>
                </div>
                <p className="text-xs text-slate-brand leading-relaxed line-clamp-2 italic">{msg.text}</p>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full py-2 rounded-lg text-xs font-semibold text-jet bg-surface-low hover:bg-surface transition-colors">
            Open Message Centre
          </button>
        </div>

        {/* Upcoming Viewings */}
        <div className="sm:col-span-2 bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-jet">Upcoming Viewings</h3>
            <button className="text-xs font-semibold text-coral hover:underline">See all schedule</button>
          </div>
          <div className="rounded-xl overflow-hidden">
            <div className="flex gap-3 p-3">
              <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1657639754502-3c138cb24b4c?w=200" alt="Property" className="w-full h-full object-cover" />
                <span className="absolute top-1 left-1 text-[0.55rem] font-bold uppercase tracking-[0.06em] px-1.5 py-0.5 rounded bg-green-600 text-white">Confirmed</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-brand uppercase tracking-[0.05em] mb-0.5">Meeting in 3 days</p>
                <p className="font-semibold text-sm text-jet truncate">Double room in Ranelagh, D6</p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                  <span className="flex items-center gap-1 text-xs text-slate-brand">
                    <Calendar size={10} /> Thursday 10 Apr, 2:00pm
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-brand">
                    <Home size={10} /> Landlord: Michael O'Connor
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0">
                <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-low text-jet hover:bg-surface transition-colors">Inquire</button>
                <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-low text-jet hover:bg-surface transition-colors">Apply</button>
                <button className="text-xs text-coral font-semibold hover:underline">View chat →</button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Maintenance */}
        <div className="rounded-xl p-5"
             style={{ background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)', boxShadow: '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-white">Active Maintenance</h3>
            <button className="text-xs font-semibold text-white/60 hover:text-white transition-colors" onClick={() => onNav('maintenance')}>
              View History →
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {tickets.filter((t) => t.status !== 'Resolved').map((ticket) => (
              <div key={ticket.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.09)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white/15">
                  <Wrench size={13} className="text-white/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{ticket.title}</p>
                  <p className="text-[0.65rem] text-white/50 mt-0.5">{ticket.category} · {ticket.date}</p>
                </div>
                <StatusBadge status={ticket.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Saved Properties */}
        <div className="sm:col-span-2 bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-jet">Your Saved Properties</h3>
            <div className="flex items-center gap-2">
              <button className="w-6 h-6 rounded-full bg-surface-low flex items-center justify-center text-jet hover:bg-surface transition-colors text-xs font-bold">‹</button>
              <button className="w-6 h-6 rounded-full bg-surface-low flex items-center justify-center text-jet hover:bg-surface transition-colors text-xs font-bold">›</button>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {wishlistItems.map((prop) => (
              <Link
                key={prop.id}
                to={`/property/${prop.id}`}
                className="shrink-0 w-40 rounded-xl overflow-hidden bg-surface-low cursor-pointer hover:opacity-90 transition-opacity"
              >
                <div className="relative h-24 overflow-hidden">
                  <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full text-white"
                        style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}>
                    €{prop.price}/mo
                  </span>
                </div>
                <div className="p-2">
                  <p className="text-xs font-semibold text-jet leading-tight line-clamp-2">{prop.title}</p>
                  <p className="text-[0.65rem] text-slate-brand mt-0.5 flex items-center gap-0.5">
                    <MapPin size={8} /> {prop.location.split(',')[0]}
                  </p>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.05em] mt-1 text-slate-brand/70">{prop.type}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-xl p-5"
             style={{ background: 'linear-gradient(145deg, #2d3142 0%, #232637 100%)', boxShadow: '0 8px 32px rgba(23,27,43,0.40), 0 2px 8px rgba(23,27,43,0.15)' }}>
          <h3 className="font-bold text-sm text-white mb-3">Upcoming</h3>
          <div className="flex flex-col gap-2">
            {[
              { day: '22', month: 'Apr', label: 'HVAC System Check',      sub: '2:00pm — Confirmed',        highlight: true  },
              { day: '24', month: 'Apr', label: 'Leaking Radiator Event',  sub: 'Maintenance Visit',         highlight: false },
              { day: '30', month: 'Apr', label: 'Community Notice',        sub: 'New rooftop yoga sessions', highlight: false },
            ].map((event, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 text-center shrink-0">
                  <p className={`font-bold text-base leading-none ${event.highlight ? 'text-coral' : 'text-white/50'}`}>{event.day}</p>
                  <p className="text-[0.6rem] uppercase font-bold tracking-[0.06em] text-white/30">{event.month}</p>
                </div>
                <div className="flex-1 border-l pl-3" style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
                  <p className="text-xs font-semibold text-white/90">{event.label}</p>
                  <p className="text-[0.65rem] text-white/40 mt-0.5">{event.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="sm:col-span-3 rounded-xl p-5"
             style={{ background: 'linear-gradient(135deg, #d47550 0%, #b85530 60%, #9c441a 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.12)' }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { value: '2.4 Years', label: 'Tenancy Duration' },
              { value: '1,240 pts', label: 'Loyalty Points'   },
              { value: '3 Active',  label: 'Open Tickets'     },
              { value: 'Unit 8-12', label: 'Your Unit'        },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <p className="font-bold text-xl text-white tracking-[-0.01em]">{stat.value}</p>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
