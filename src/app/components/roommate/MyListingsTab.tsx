import { useState } from 'react';
import { Plus, MapPin, AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { Property } from '@/types';

const MODULE_NOW = new Date();
const MIN_EXTEND_DATE = new Date(MODULE_NOW.getTime() + 86400000).toISOString().split('T')[0];
const MAX_EXTEND_DATE = new Date(MODULE_NOW.getTime() + 365 * 86400000).toISOString().split('T')[0];

interface MyListingsTabProps {
  roommateListings: Property[];
  onListingsChange: (updated: Property[]) => void;
}

export function MyListingsTab({ roommateListings, onListingsChange }: MyListingsTabProps) {
  const navigate = useNavigate();
  const [extendingId, setExtendingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');
  const [savedId, setSavedId] = useState<string | null>(null);

  const atLimit = roommateListings.length >= 2;
  const now = MODULE_NOW;

  function isExpired(listing: Property) {
    return listing.listingType === 'temporary' && listing.availableUntil
      ? new Date(listing.availableUntil) <= now
      : false;
  }

  function daysRemaining(listing: Property) {
    if (!listing.availableUntil) return null;
    return Math.ceil((new Date(listing.availableUntil).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function handleSaveDate(id: string) {
    onListingsChange(
      roommateListings.map((l) => l.id === id ? { ...l, availableUntil: newDate } : l)
    );
    setExtendingId(null);
    setNewDate('');
    setSavedId(id);
    setTimeout(() => setSavedId(null), 3000);
  }

  function handleDelete(id: string) {
    onListingsChange(roommateListings.filter((l) => l.id !== id));
  }

  const expiringListing = roommateListings.find((l) => {
    const days = daysRemaining(l);
    return days !== null && days <= 3 && days > 0;
  });

  return (
    <>
      {expiringListing && (
        <div className="flex items-center gap-3 p-4 rounded-xl mb-5"
             style={{ background: '#fef3e2' }}>
          <AlertTriangle size={16} style={{ color: '#9c5a00' }} className="shrink-0" />
          <p className="text-sm flex-1" style={{ color: '#9c5a00' }}>
            Your listing <strong>"{expiringListing.title}"</strong> expires in {daysRemaining(expiringListing)} day{daysRemaining(expiringListing) === 1 ? '' : 's'}.{' '}
            <button
              type="button"
              className="font-bold underline"
              style={{ color: '#9c5a00' }}
              onClick={() => setExtendingId(expiringListing.id)}
            >
              Extend now →
            </button>
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-xl text-jet" style={{ letterSpacing: '-0.01em' }}>My Listings</h2>
        <div className="relative group">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            disabled={atLimit}
            onClick={() => !atLimit && navigate('/roommate/list-room')}
          >
            <Plus size={14} />
            Add room
          </button>
          {atLimit && (
            <div className="absolute right-0 top-full mt-1 px-3 py-1.5 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                 style={{ background: 'rgba(23,27,43,0.85)' }}>
              Maximum 2 listings
            </div>
          )}
        </div>
      </div>

      {roommateListings.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="w-12 h-12 rounded-2xl bg-surface-low flex items-center justify-center mx-auto mb-4">
            <Plus size={22} className="text-slate-brand" />
          </div>
          <p className="font-semibold text-jet mb-1">No listings yet</p>
          <p className="text-sm text-slate-brand mb-4">Add your spare room to start receiving enquiries.</p>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            onClick={() => navigate('/roommate/list-room')}
          >
            List a room →
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {roommateListings.map((listing) => {
          const expired = isExpired(listing);
          const days = daysRemaining(listing);

          return (
            <div
              key={listing.id}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              style={{ opacity: expired ? 0.5 : 1, position: 'relative' }}
            >
              {expired && (
                <div className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl"
                     style={{ background: 'rgba(250,250,250,0.75)' }}>
                  <div className="text-center">
                    <p className="font-bold text-jet mb-3">
                      This listing expired on {formatDate(listing.availableUntil!)}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                        style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                        onClick={() => { setExtendingId(listing.id); }}
                      >
                        <RefreshCw size={12} className="inline mr-1.5" />
                        Renew listing
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-xl text-sm font-semibold border border-ghost/40 hover:bg-red-50 transition-colors"
                        style={{ color: '#b91c1c' }}
                        onClick={() => handleDelete(listing.id)}
                      >
                        <Trash2 size={12} className="inline mr-1.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 p-4">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-24 h-24 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-sm text-jet truncate">{listing.title}</h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                          style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin size={11} className="text-slate-brand" />
                    <span className="text-xs text-slate-brand truncate">{listing.location}</span>
                  </div>
                  <p className="text-sm font-bold text-coral mb-1">€{listing.price}/mo</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.05em] text-slate-brand">
                      {listing.listingType === 'temporary' ? 'Temporary' : 'Permanent'}
                    </span>
                    {listing.listingType === 'temporary' && listing.availableUntil && !expired && (
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.05em]"
                            style={{ color: days !== null && days <= 7 ? '#9c5a00' : '#4f5d75' }}>
                        · Expires {formatDate(listing.availableUntil)}
                        {days !== null && ` (${days}d)`}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {extendingId === listing.id && (
                <div className="mx-4 mb-4 p-4 rounded-xl bg-surface-low">
                  <p className="text-xs font-bold uppercase tracking-[0.05em] text-slate-brand mb-2">New end date</p>
                  <input
                    type="date"
                    className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors mb-3"
                    min={MIN_EXTEND_DATE}
                    max={MAX_EXTEND_DATE}
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-40"
                      style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                      disabled={!newDate}
                      onClick={() => handleSaveDate(listing.id)}
                    >
                      Save new date
                    </button>
                    <button
                      type="button"
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-ghost/40 text-slate-brand hover:bg-surface transition-colors"
                      onClick={() => { setExtendingId(null); setNewDate(''); }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {savedId === listing.id && (
                <div className="mx-4 mb-4 p-3 rounded-xl text-xs font-medium" style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                  End date updated. Your listing will now be hidden after this date.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
