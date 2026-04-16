import { useState } from 'react';
import { Plus, MapPin, Bed, Bath, Maximize2, AlertTriangle, RefreshCw, Trash2, Pencil, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import type { Property } from '@/types';

const MODULE_NOW = new Date();
const MIN_EXTEND_DATE = new Date(MODULE_NOW.getTime() + 86400000).toISOString().split('T')[0];
const MAX_EXTEND_DATE = new Date(MODULE_NOW.getTime() + 365 * 86400000).toISOString().split('T')[0];

interface MyListingsTabProps {
  roommateListings: Property[];
  onListingsChange: (updated: Property[]) => void;
}

type PanelState = { type: 'extend' | 'edit' } | null;
type EditForm = { price: string };

export function MyListingsTab({ roommateListings, onListingsChange }: MyListingsTabProps) {
  const navigate = useNavigate();
  const [panel, setPanel] = useState<Record<string, PanelState>>({});
  const [newDate, setNewDate] = useState<Record<string, string>>({});
  const [editForm, setEditForm] = useState<Record<string, EditForm>>({});
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

  function openPanel(id: string, type: 'extend' | 'edit', listing: Property) {
    setPanel((p) => ({ ...p, [id]: p[id]?.type === type ? null : { type } }));
    if (type === 'edit') setEditForm((f) => ({ ...f, [id]: { price: String(listing.price) } }));
  }

  function closePanel(id: string) {
    setPanel((p) => ({ ...p, [id]: null }));
  }

  function handleSaveDate(id: string) {
    onListingsChange(
      roommateListings.map((l) => l.id === id ? { ...l, availableUntil: newDate[id] } : l)
    );
    closePanel(id);
    setNewDate((d) => ({ ...d, [id]: '' }));
    setSavedId(id);
    setTimeout(() => setSavedId(null), 3000);
  }

  function handleSaveEdit(id: string) {
    onListingsChange(
      roommateListings.map((l) =>
        l.id === id ? { ...l, price: Number(editForm[id]?.price) || l.price } : l
      )
    );
    closePanel(id);
    toast.success('Listing updated.');
  }

  function handleDelete(id: string) {
    onListingsChange(roommateListings.filter((l) => l.id !== id));
  }

  const expiringListing = roommateListings.find((l) => {
    const days = daysRemaining(l);
    return days !== null && days <= 3 && days > 0;
  });

  return (
    <div className="flex flex-col gap-5">

      {/* Expiry banner */}
      {expiringListing && (
        <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#fef3e2' }}>
          <AlertTriangle size={16} style={{ color: '#9c5a00' }} className="shrink-0" />
          <p className="text-sm flex-1" style={{ color: '#9c5a00' }}>
            Your listing <strong>"{expiringListing.title}"</strong> expires in {daysRemaining(expiringListing)} day{daysRemaining(expiringListing) === 1 ? '' : 's'}.{' '}
            <button
              type="button"
              className="font-bold underline"
              style={{ color: '#9c5a00' }}
              onClick={() => openPanel(expiringListing.id, 'extend', expiringListing)}
            >
              Extend now →
            </button>
          </p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold tracking-[-0.02em] text-[1.4rem] text-jet">My Listings</h2>
          <p className="text-sm text-slate-brand mt-0.5">
            {roommateListings.length} of 2 listings used
          </p>
        </div>
        <div className="relative group">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            disabled={atLimit}
            onClick={() => !atLimit && navigate('/roommate/list-room', { viewTransition: true })}
          >
            <Plus size={14} />
            Add room
          </button>
          {atLimit && (
            <div
              className="absolute right-0 top-full mt-1 px-3 py-1.5 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ background: 'rgba(23,27,43,0.85)' }}
            >
              Maximum 2 listings
            </div>
          )}
        </div>
      </div>

      {/* Empty state */}
      {roommateListings.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div className="w-12 h-12 rounded-2xl bg-surface-low flex items-center justify-center mx-auto mb-4">
            <Plus size={22} className="text-slate-brand" />
          </div>
          <p className="font-semibold text-jet mb-1">No listings yet</p>
          <p className="text-sm text-slate-brand mb-4">Add your spare room to start receiving enquiries.</p>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            onClick={() => navigate('/roommate/list-room', { viewTransition: true })}
          >
            List a room →
          </button>
        </div>
      )}

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {roommateListings.map((listing) => {
          const expired = isExpired(listing);
          const days = daysRemaining(listing);
          const activePanel = panel[listing.id];

          return (
            <div
              key={listing.id}
              className="bg-white rounded-2xl overflow-hidden group"
              style={{
                boxShadow: '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)',
                opacity: expired ? 0.65 : 1,
              }}
            >
              {/* Image */}
              <div className="relative m-3 rounded-xl overflow-hidden h-48">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                  <span className="px-2 py-0.5 rounded text-[0.65rem] font-bold tracking-[0.05em] uppercase text-white bg-jet/80">
                    {listing.type}
                  </span>
                  {listing.listingType === 'temporary' && (
                    <span className="px-2 py-0.5 rounded text-[0.6rem] font-bold tracking-widest uppercase text-white"
                          style={{ background: days !== null && days <= 7 ? '#9c5a00' : '#4f5d75' }}>
                      {expired ? 'Expired' : 'Temp'}
                    </span>
                  )}
                </div>
                {expired && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-bold text-xs tracking-wider uppercase bg-black/60 px-3 py-1 rounded">
                      Expired
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="px-4 pb-4 pt-1">
                <h3 className="font-bold text-sm tracking-tight text-jet">{listing.title}</h3>
                <div className="flex items-center gap-1 mt-0.5 mb-3">
                  <MapPin size={11} className="text-slate-brand shrink-0" />
                  <span className="text-xs text-slate-brand truncate">{listing.location}</span>
                </div>
                <div className="flex items-center gap-3 mb-3 text-xs text-slate-brand">
                  {listing.bedrooms > 0 && (
                    <span className="flex items-center gap-1"><Bed size={11} />{listing.bedrooms}</span>
                  )}
                  <span className="flex items-center gap-1"><Bath size={11} />{listing.bathrooms}</span>
                  <span className="flex items-center gap-1"><Maximize2 size={11} />{listing.area}m²</span>
                </div>

                {listing.listingType === 'temporary' && listing.availableUntil && !expired && (
                  <div className="mb-3">
                    <span
                      className="text-[0.65rem] font-bold uppercase tracking-[0.05em]"
                      style={{ color: days !== null && days <= 7 ? '#9c5a00' : '#4f5d75' }}
                    >
                      Expires {formatDate(listing.availableUntil)}{days !== null && ` · ${days}d left`}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2.5" style={{ borderTop: '1px solid rgba(220,193,183,0.2)' }}>
                  <div>
                    <span className="text-lg font-bold text-coral">€{listing.price.toLocaleString()}</span>
                    <span className="text-xs text-slate-brand ml-1">/mo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {listing.listingType === 'temporary' && (
                      <button
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-low text-jet hover:bg-surface transition-colors"
                        onClick={() => openPanel(listing.id, 'extend', listing)}
                      >
                        <RefreshCw size={11} />
                        {expired ? 'Renew' : 'Extend'}
                      </button>
                    )}
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ background: activePanel?.type === 'edit' ? 'rgba(220,193,183,0.40)' : 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                      onClick={() => openPanel(listing.id, 'edit', listing)}
                    >
                      {activePanel?.type === 'edit' ? <X size={11} /> : <Pencil size={11} />}
                      {activePanel?.type === 'edit' ? 'Close' : 'Edit'}
                    </button>
                    <button
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors"
                      onClick={() => handleDelete(listing.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Extend date panel */}
              {activePanel?.type === 'extend' && (
                <div className="mx-4 mb-4 p-4 rounded-xl bg-surface-low flex flex-col gap-3">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand">
                    {expired ? 'Renew Listing' : 'Extend Listing'}
                  </p>
                  <div>
                    <label className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand block mb-1.5">
                      New end date
                    </label>
                    <input
                      type="date"
                      className="w-full bg-white rounded-lg px-3 py-2 text-sm text-jet outline-none transition-colors"
                      style={{ border: '1px solid rgba(220,193,183,0.40)' }}
                      onFocus={(e) => (e.target.style.borderColor = '#ef8354')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(220,193,183,0.40)')}
                      min={MIN_EXTEND_DATE}
                      max={MAX_EXTEND_DATE}
                      value={newDate[listing.id] ?? ''}
                      onChange={(e) => setNewDate((d) => ({ ...d, [listing.id]: e.target.value }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-40"
                      style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                      disabled={!newDate[listing.id]}
                      onClick={() => handleSaveDate(listing.id)}
                    >
                      <Check size={13} /> Save date
                    </button>
                    <button
                      type="button"
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-brand hover:bg-surface transition-colors"
                      style={{ border: '1px solid rgba(220,193,183,0.40)' }}
                      onClick={() => closePanel(listing.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Edit panel */}
              {activePanel?.type === 'edit' && (
                <div className="mx-4 mb-4 p-4 rounded-xl bg-surface-low flex flex-col gap-3">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand">Edit Listing</p>
                  <div>
                    <label className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand block mb-1.5">
                      Monthly Rent (€)
                    </label>
                    <input
                      type="number"
                      value={editForm[listing.id]?.price ?? ''}
                      onChange={(e) => setEditForm((f) => ({ ...f, [listing.id]: { price: e.target.value } }))}
                      className="w-full bg-white rounded-lg px-3 py-2 text-sm text-jet outline-none transition-colors"
                      style={{ border: '1px solid rgba(220,193,183,0.40)' }}
                      onFocus={(e) => (e.target.style.borderColor = '#ef8354')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(220,193,183,0.40)')}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                      style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                      onClick={() => handleSaveEdit(listing.id)}
                    >
                      <Check size={13} /> Save changes
                    </button>
                    <button
                      type="button"
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-brand hover:bg-surface transition-colors"
                      style={{ border: '1px solid rgba(220,193,183,0.40)' }}
                      onClick={() => closePanel(listing.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Saved confirmation */}
              {savedId === listing.id && (
                <div className="mx-4 mb-4 p-3 rounded-xl text-xs font-medium" style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                  End date updated. Listing will expire after this date.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
