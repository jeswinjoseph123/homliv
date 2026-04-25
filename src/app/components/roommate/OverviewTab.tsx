import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Home, MessageSquare, Clock, X, Info, Plus,
  Eye, Heart, ArrowUpRight, Zap, Star, CheckCircle2,
  TrendingUp, Edit3,
} from 'lucide-react';
import { type Tab } from './types';

const BANNER_KEY = 'homliv_roommate_banner_dismissed';
const NOW_MS = Date.now();

interface OverviewTabProps {
  onNav: (tab: Tab) => void;
  hasActiveListing: boolean;
  expiryDate: string | null;
  isVerified: boolean;
}

const MOCK_ENQUIRIES = [
  {
    id: 'e1',
    name: 'Ciarán Daly',
    avatar: 'https://i.pravatar.cc/150?img=12',
    time: '2h ago',
    text: "Hi Jane, I'm very interested in the room. Is it still available for viewing this week?",
    unread: true,
  },
  {
    id: 'e2',
    name: 'Fatima Al-Rashid',
    avatar: 'https://i.pravatar.cc/150?img=47',
    time: 'Yesterday',
    text: "Could you tell me more about the house rules and whether bills are included?",
    unread: false,
  },
];

const MOCK_LISTING = {
  title: 'Double Room in Ranelagh, D6',
  price: 950,
  img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400',
  location: 'Ranelagh Village, Dublin 6',
  type: 'Double Room',
};

export function OverviewTab({ onNav, hasActiveListing, expiryDate, isVerified }: OverviewTabProps) {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  function handleListRoom() {
    if (!isVerified) {
      navigate('/roommate/verify', { viewTransition: true });
    } else {
      navigate('/roommate/list-room', { viewTransition: true });
    }
  }
  const [bannerDismissed, setBannerDismissed] = useState(() =>
    localStorage.getItem(BANNER_KEY) === 'true'
  );

  function dismissBanner() {
    localStorage.setItem(BANNER_KEY, 'true');
    setBannerDismissed(true);
  }

  const daysUntilExpiry = expiryDate
    ? Math.ceil((new Date(expiryDate).getTime() - NOW_MS) / (1000 * 60 * 60 * 24))
    : null;

  const expiryLabel = expiryDate
    ? new Date(expiryDate).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Permanent';

  const expiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 7;

  return (
    <div className="flex flex-col gap-5">

      {/* Amber banner */}
      {!bannerDismissed && (
        <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: '#fef3e2' }}>
          <Info size={15} style={{ color: '#9c5a00' }} className="shrink-0 mt-0.5" />
          <p className="text-sm flex-1" style={{ color: '#9c5a00' }}>
            Your listings are shown with a <strong>Roommate badge</strong>. Tenants are advised this listing is not from a property owner.
          </p>
          <button type="button" onClick={dismissBanner}>
            <X size={15} style={{ color: '#9c5a00' }} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-bold tracking-[-0.02em] text-[1.6rem] text-jet">Welcome back, Jane.</h1>
          <p className="text-sm text-slate-brand mt-0.5">
            {new Date().toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 shrink-0"
          style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
          onClick={handleListRoom}
        >
          <Plus size={14} />
          List a Room
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div
          className="animate-fade-up bg-white rounded-xl p-4 flex flex-col gap-1.5"
          style={{
            animationDelay: '80ms',
            transform: hoveredCard === 'listings' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoveredCard === 'listings' ? '0 16px 48px rgba(23,27,43,0.12)' : '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
          onMouseEnter={() => setHoveredCard('listings')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#f0f1f3]">
              <Home size={14} className="text-slate-brand" />
            </div>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.06em] text-slate-brand">Listings</span>
          </div>
          <p className="font-bold text-3xl text-jet" style={{ letterSpacing: '-0.03em' }}>
            {hasActiveListing ? '1' : '0'}
          </p>
          <button type="button" onClick={() => onNav('listings')}
            className="text-xs font-semibold text-coral flex items-center gap-1 hover:underline w-fit">
            View listing <ArrowUpRight size={10} />
          </button>
        </div>

        <div
          className="animate-fade-up rounded-xl p-4 flex flex-col gap-1.5"
          style={{
            animationDelay: '160ms',
            background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)',
            transform: hoveredCard === 'enquiries' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoveredCard === 'enquiries' ? '0 20px 56px rgba(61,77,99,0.40), 0 4px 12px rgba(61,77,99,0.20)' : '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
          onMouseEnter={() => setHoveredCard('enquiries')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10">
              <MessageSquare size={14} className="text-white/80" />
            </div>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.06em] text-white/50">Enquiries</span>
          </div>
          <p className="font-bold text-3xl text-white" style={{ letterSpacing: '-0.03em' }}>2</p>
          <button type="button" onClick={() => onNav('messages')}
            className="text-xs font-semibold text-white/70 flex items-center gap-1 hover:text-white transition-colors w-fit">
            View messages <ArrowUpRight size={10} />
          </button>
        </div>

        <div
          className={`animate-fade-up rounded-xl p-4 flex flex-col gap-1.5 ${expiringSoon ? '' : 'bg-white'}`}
          style={{
            animationDelay: '240ms',
            ...(expiringSoon
              ? {
                  background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)',
                  transform: hoveredCard === 'expiry' ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredCard === 'expiry' ? '0 20px 56px rgba(180,80,40,0.40), 0 4px 12px rgba(180,80,40,0.20)' : '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)',
                }
              : {
                  transform: hoveredCard === 'expiry' ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredCard === 'expiry' ? '0 16px 48px rgba(23,27,43,0.12)' : '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)',
                }),
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
          onMouseEnter={() => setHoveredCard('expiry')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center justify-between mb-1">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${expiringSoon ? 'bg-white/15' : 'bg-[#f0f1f3]'}`}>
              <Clock size={14} className={expiringSoon ? 'text-white' : 'text-slate-brand'} />
            </div>
            {expiringSoon && (
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.04em] px-2 py-0.5 rounded-full bg-white/20 text-white whitespace-nowrap">
                Expiring soon
              </span>
            )}
          </div>
          <p className={`font-bold text-lg leading-tight ${expiringSoon ? 'text-white' : 'text-jet'}`} style={{ letterSpacing: '-0.02em' }}>
            {expiryLabel}
          </p>
          <p className={`text-xs font-medium ${expiringSoon ? 'text-white/60' : 'text-slate-brand'}`}>Listing expires</p>
        </div>

      </div>

      {/* Row 2: Active Listing + Enquiries */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* Active listing preview */}
        <div
          className="animate-fade-up sm:col-span-2 bg-white rounded-xl"
          style={{
            animationDelay: '80ms',
            transform: hoveredCard === 'listing-card' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoveredCard === 'listing-card' ? '0 16px 48px rgba(23,27,43,0.12)' : '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
          onMouseEnter={() => setHoveredCard('listing-card')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center justify-between px-5 py-4 bg-[#f5f5f7] rounded-t-xl">
            <h3 className="font-bold text-sm text-jet" style={{ letterSpacing: '-0.01em' }}>My Active Listing</h3>
            {hasActiveListing && (
              <span className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.04em] px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 whitespace-nowrap">
                <CheckCircle2 size={10} /> Live
              </span>
            )}
          </div>

          {hasActiveListing ? (
            <div className="flex gap-4 p-5">
              <div className="w-28 h-20 rounded-xl overflow-hidden shrink-0">
                <img src={MOCK_LISTING.img} alt={MOCK_LISTING.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-jet truncate" style={{ letterSpacing: '-0.01em' }}>{MOCK_LISTING.title}</p>
                <p className="text-xs text-slate-brand mt-0.5">{MOCK_LISTING.location}</p>
                <div className="flex items-center gap-3 mt-2">
                  <p className="font-bold text-lg text-jet" style={{ letterSpacing: '-0.02em' }}>
                    €{MOCK_LISTING.price}<span className="text-xs font-medium text-slate-brand">/mo</span>
                  </p>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-full bg-[#f0f1f3] text-slate-brand">
                    {MOCK_LISTING.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1 text-xs text-slate-brand">
                    <Eye size={11} /> 142 views
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-brand">
                    <Heart size={11} /> 8 saves
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-brand">
                    <MessageSquare size={11} /> 2 enquiries
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => onNav('listings')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-2 rounded-lg transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                >
                  <Edit3 size={11} /> Edit
                </button>
                <button className="flex items-center gap-1.5 text-xs font-medium text-jet px-3 py-2 rounded-lg bg-[#f5f5f7] hover:bg-[#ebebed] transition-colors">
                  <Eye size={11} /> Preview
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 px-5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] flex items-center justify-center mb-3">
                <Home size={22} className="text-slate-brand/50" />
              </div>
              <p className="text-sm font-semibold text-jet mb-1">No active listing</p>
              <p className="text-xs text-slate-brand mb-4">Share your spare room and start receiving enquiries</p>
              <button
                onClick={handleListRoom}
                className="flex items-center gap-2 text-sm font-semibold text-white px-4 py-2.5 rounded-xl transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
              >
                <Plus size={14} /> List your room
              </button>
            </div>
          )}
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <div className="flex items-center justify-between px-5 py-4 bg-[#f5f5f7] rounded-t-xl">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-jet" style={{ letterSpacing: '-0.01em' }}>Enquiries</h3>
              <span className="w-5 h-5 rounded-full text-white text-[0.6rem] font-bold flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}>2</span>
            </div>
            <button type="button" onClick={() => onNav('messages')}
              className="text-xs font-semibold text-coral hover:underline">
              All →
            </button>
          </div>
          <div className="flex flex-col">
            {MOCK_ENQUIRIES.map((e, index) => (
              <div key={e.id} className="animate-fade-up flex items-start gap-3 px-5 py-4" style={{ animationDelay: `${index * 70}ms` }}>
                <div className="relative shrink-0">
                  <img src={e.avatar} alt={e.name} className="w-8 h-8 rounded-full object-cover" />
                  {e.unread && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-coral border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-xs font-bold text-jet truncate">{e.name}</p>
                    <p className="text-[0.65rem] text-slate-brand shrink-0">{e.time}</p>
                  </div>
                  <p className="text-xs text-slate-brand leading-relaxed line-clamp-2">{e.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 pb-4">
            <button
              type="button"
              onClick={() => onNav('messages')}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-jet bg-[#f5f5f7] hover:bg-[#ebebed] transition-colors"
            >
              Open Message Centre
            </button>
          </div>
        </div>

      </div>

      {/* Row 3: Performance + Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* Listing Performance */}
        <div className="sm:col-span-2 rounded-xl p-5"
             style={{ background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.07em] text-white/70">Listing Performance</p>
              <p className="font-bold text-3xl text-white mt-1" style={{ letterSpacing: '-0.03em' }}>
                142 <span className="text-base font-medium text-white/70">views this week</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20">
              <TrendingUp size={11} className="text-white" />
              <span className="text-[0.65rem] font-bold text-white">+18%</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <Eye size={13} />,          label: 'Total Views',    value: '142' },
              { icon: <Heart size={13} />,         label: 'Saves',         value: '8'   },
              { icon: <Zap size={13} />,           label: 'Response Rate', value: '100%' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <div className="flex items-center gap-1.5 mb-1.5 text-white/70">{stat.icon}
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.05em]">{stat.label}</span>
                </div>
                <p className="font-bold text-lg text-white" style={{ letterSpacing: '-0.02em' }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-xl p-5"
             style={{ background: 'linear-gradient(145deg, #2d3142 0%, #1e2235 100%)', boxShadow: '0 8px 32px rgba(23,27,43,0.40), 0 2px 8px rgba(23,27,43,0.15)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Star size={14} className="text-coral" />
            <h3 className="font-bold text-sm text-white" style={{ letterSpacing: '-0.01em' }}>Boost Your Listing</h3>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { tip: 'Add at least 4 photos', done: true  },
              { tip: 'Write a detailed description', done: true  },
              { tip: 'Respond within 2 hours',  done: false },
              { tip: 'Verify your profile',      done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.done ? 'bg-emerald-500' : 'bg-white/10'}`}>
                  {item.done && <CheckCircle2 size={10} className="text-white" />}
                </div>
                <p className={`text-xs ${item.done ? 'text-white/40 line-through' : 'text-white/80'}`}>{item.tip}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-[0.65rem] text-white/40 font-medium">2 of 4 completed — listings with all 4 get 3× more enquiries</p>
          </div>
        </div>

      </div>

    </div>
  );
}
