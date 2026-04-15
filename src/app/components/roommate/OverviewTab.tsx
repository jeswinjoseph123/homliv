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
          <button type="button" onClick={dismissBanner}>
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
          type="button"
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
            type="button"
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
            type="button"
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
