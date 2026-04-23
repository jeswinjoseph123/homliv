import { Link } from 'react-router';
import { Heart, MapPin, Bed, Bath, Maximize2, Eye, Calendar, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import { type Property } from '@/types';

interface WishlistTabProps {
  wishlistItems: Property[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function WishlistTab({ wishlistItems, onRemove, onClear }: WishlistTabProps) {
  return (
    <div className="p-4 sm:p-6 max-w-[1100px] mx-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold tracking-[-0.02em] text-[1.4rem] text-jet">Saved Properties</h2>
          <p className="text-sm text-slate-brand mt-0.5">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>
        {wishlistItems.length > 0 && (
          <button
            className="text-xs font-semibold text-slate-brand hover:text-coral transition-colors"
            onClick={onClear}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Empty state */}
      {wishlistItems.length === 0 && (
        <div className="animate-fade-up flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center">
            <Heart size={28} className="text-ghost" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-base text-jet">No saved properties yet</p>
            <p className="text-sm text-slate-brand mt-1">Browse listings and tap the heart to save them here.</p>
          </div>
          <Link
            to="/listings"
            className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
          >
            Browse Listings
          </Link>
        </div>
      )}

      {/* Grid */}
      {wishlistItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {wishlistItems.map((prop, index) => (
            <div
              key={prop.id}
              className="animate-fade-up bg-white rounded-2xl overflow-hidden group"
              style={{
                animationDelay: `${index * 70}ms`,
                boxShadow: '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)',
              }}
            >
              {/* Image */}
              <div className="relative m-3 rounded-xl overflow-hidden h-48">
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                  <span className="px-2 py-0.5 rounded text-[0.65rem] font-bold tracking-[0.05em] uppercase text-white bg-jet/80">
                    {prop.type}
                  </span>
                  {prop.isRPZ && (
                    <span className="px-2 py-0.5 rounded text-[0.6rem] font-bold tracking-widest uppercase text-white bg-coral">
                      RPZ
                    </span>
                  )}
                </div>
                <button
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
                  onClick={() => onRemove(prop.id)}
                >
                  <Heart size={15} fill="#ef8354" stroke="#ef8354" />
                </button>
                {!prop.available && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-bold text-xs tracking-wider uppercase bg-black/60 px-3 py-1 rounded">
                      Let Agreed
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="px-4 pb-4 pt-1">
                <h3 className="font-bold text-sm tracking-tight text-jet">{prop.title}</h3>
                <div className="flex items-center gap-1 mt-0.5 mb-3">
                  <MapPin size={11} className="text-slate-brand shrink-0" />
                  <span className="text-xs text-slate-brand truncate">{prop.location}</span>
                </div>
                <div className="flex items-center gap-3 mb-3 text-xs text-slate-brand">
                  {prop.bedrooms > 0 && <span className="flex items-center gap-1"><Bed size={11} />{prop.bedrooms}</span>}
                  <span className="flex items-center gap-1"><Bath size={11} />{prop.bathrooms}</span>
                  <span className="flex items-center gap-1"><Maximize2 size={11} />{prop.area}m²</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {prop.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="text-[0.65rem] font-bold tracking-[0.04em] uppercase px-2 py-0.5 rounded-full bg-surface-low text-slate-brand">
                      {a}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2.5" style={{ borderTop: '1px solid rgba(220,193,183,0.2)' }}>
                  <div>
                    <span className="text-lg font-bold text-coral">€{prop.price.toLocaleString()}</span>
                    <span className="text-xs text-slate-brand ml-1">/mo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/property/${prop.id}`}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-low text-jet hover:bg-surface transition-colors"
                    >
                      <Eye size={11} /> View
                    </Link>
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                      onClick={() => toast.success(`Viewing requested for ${prop.title}`)}
                    >
                      <Calendar size={11} /> Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Browse more */}
      {wishlistItems.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Link
            to="/listings"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold text-jet hover:bg-white transition-colors"
            style={{ borderColor: 'rgba(220,193,183,0.40)' }}
          >
            Browse more listings <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
