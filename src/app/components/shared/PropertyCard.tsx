import { MapPin, Heart, Bed, Bath, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  onWishlistToggle?: (id: string) => void;
  isWishlisted?: boolean;
}

export function PropertyCard({ property, onWishlistToggle, isWishlisted = false }: PropertyCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)')}
      onClick={() => navigate(`/property/${property.id}`)}
    >
      {/* Inset image with own rounded corners */}
      <div className="relative m-3 rounded-xl overflow-hidden h-52">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Type + RPZ + Roommate badges top-left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          <div className="px-2 py-1 rounded text-xs font-bold tracking-[0.05em] uppercase text-white bg-jet/85">
            {property.type}
          </div>
          {property.isRPZ && (
            <div className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase text-white bg-coral">
              RPZ AREA
            </div>
          )}
          {property.postedBy === 'roommate' && (
            <div
              className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase"
              style={{ background: '#fef3e2', color: '#9c5a00' }}
            >
              Roommate listing
            </div>
          )}
        </div>

        {/* Temporary listing badge — bottom-left of image */}
        {property.listingType === 'temporary' && property.availableUntil && (
          <div
            className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold"
            style={{ background: '#e8edf4', color: '#2c4a7c' }}
          >
            Until {new Date(property.availableUntil).toLocaleDateString('en-IE', { day: 'numeric', month: 'short' })}
          </div>
        )}

        {/* Heart toggle top-right */}
        <button
          type="button"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle?.(property.id);
          }}
        >
          <Heart
            size={16}
            fill={isWishlisted ? '#ef8354' : 'none'}
            stroke={isWishlisted ? '#ef8354' : '#4f5d75'}
          />
        </button>

        {/* Let Agreed overlay */}
        {!property.available && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-sm tracking-wider uppercase bg-black/60 px-3 py-1 rounded">
              Let Agreed
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="px-4 pb-4 pt-1">
        <h3 className="font-bold text-base tracking-tight text-jet">{property.title}</h3>

        <div className="flex items-center gap-1 mt-1 mb-3">
          <MapPin size={12} className="text-slate-brand" />
          <span className="text-sm text-slate-brand">{property.location}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {property.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="text-xs font-bold tracking-[0.04em] uppercase px-2.5 py-0.5 rounded-full bg-surface-low text-slate-brand"
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-3 text-xs text-slate-brand">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed size={12} />
              {property.bedrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath size={12} />
            {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 size={12} />
            {property.area}m²
          </span>
        </div>

        <div className="flex items-center justify-between pt-2.5" style={{ borderTop: '1px solid rgba(220,193,183,0.2)' }}>
          <div>
            <span className="text-xl font-bold text-coral">
              €{property.price.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-brand ml-1">/mo</span>
          </div>
          <button type="button" className="text-xs font-bold tracking-[0.05em] uppercase text-coral hover:text-coral-dark transition-colors">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
