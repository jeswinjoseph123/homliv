import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import {
  MapPin, Heart, CheckCircle, Wifi, WashingMachine, Wind,
  Thermometer, DoorOpen, Utensils, Shield, ChevronLeft,
  BadgeCheck, MessageSquare, Calendar, AlignLeft, ParkingSquare, TreePine,
  AlertTriangle, Flag
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { mockProperties } from '../../data/mockProperties';
import { ReportModal } from '../components/shared/ReportModal';

const PAGE_LOAD_MS = Date.now();

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  'WiFi': <Wifi size={16} />,
  'Washing Machine': <WashingMachine size={16} />,
  'Dishwasher': <Utensils size={16} />,
  'Smart Heating': <Thermometer size={16} />,
  'Private Balcony': <DoorOpen size={16} />,
  'Balcony': <DoorOpen size={16} />,
  'Concierge': <Shield size={16} />,
  'AC': <Wind size={16} />,
  'Gym': <AlignLeft size={16} />,
  'City View': <MapPin size={16} />,
  'Bills Inc.': <CheckCircle size={16} />,
  'En-suite': <DoorOpen size={16} />,
  'Terrace': <TreePine size={16} />,
  'Parking': <ParkingSquare size={16} />,
  'Garden': <TreePine size={16} />,
  'Heating': <Thermometer size={16} />,
};

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState(false);
  const [viewingRequested, setViewingRequested] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const { ref: galleryRef, visible: galleryVisible } = useScrollReveal();
  const { ref: asideRef, visible: asideVisible } = useScrollReveal();
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="bg-surface text-ink">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-lg font-semibold text-jet">Property not found.</p>
          <button
            className="mt-4 px-6 py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            onClick={() => navigate('/listings')}
          >
            Back to Listings
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-surface text-ink">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button
          className="flex items-center gap-1 text-sm font-medium mb-6 transition-colors text-slate-brand hover:text-jet"
          onClick={() => navigate('/listings')}
        >
          <ChevronLeft size={16} />
          Back to Listings
        </button>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left column */}
          <div className="flex-1 min-w-0">
            {/* Gallery */}
            <div ref={galleryRef as React.RefObject<HTMLDivElement>} className={`grid grid-cols-[2fr_1fr] gap-2 h-[380px] md:h-[480px] rounded-xl overflow-hidden ${galleryVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ boxShadow: '0 8px 32px rgba(23,27,43,0.12)' }}>
              <div className="relative">
                <img
                  src={property.images[activeImage] || property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.isRPZ && (
                  <div className="absolute top-4 left-4 px-2 py-0.5 text-xs font-bold tracking-widest uppercase text-white rounded bg-coral">
                    RPZ Area
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {property.images.slice(1, 3).map((img, i) => (
                  <div
                    key={i}
                    className="flex-1 cursor-pointer overflow-hidden"
                    onClick={() => setActiveImage(i + 1)}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                  </div>
                ))}
                {property.images.length < 3 && (
                  <div className="flex-1 bg-surface-low" />
                )}
              </div>
            </div>

            {/* Thumbnail row */}
            {property.images.length > 1 && (
              <div className="flex gap-2 mt-2">
                {property.images.map((img, i) => (
                  <div
                    key={i}
                    className={`w-14 h-10 rounded overflow-hidden cursor-pointer ${i === activeImage ? 'ring-2 ring-coral' : 'ring-2 ring-transparent'}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* The Space */}
            <div className="mt-8">
              <h2 className="text-[1.5rem] font-bold mb-3 text-jet" style={{ letterSpacing: '-0.02em' }}>
                The Space
              </h2>
              <p className="text-base leading-relaxed text-ink" style={{ lineHeight: 1.7 }}>
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mt-8">
              <h2 className="text-[1.5rem] font-bold mb-4 text-jet" style={{ letterSpacing: '-0.02em' }}>
                Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-ghost/20 text-sm text-jet animate-fade-up"
                  style={{ boxShadow: '0 1px 4px rgba(23,27,43,0.05)', animationDelay: `${index * 40}ms` }}
                  >
                    <span className="text-coral">
                      {AMENITY_ICONS[amenity] || <CheckCircle size={16} />}
                    </span>
                    <span className="text-sm font-medium text-jet">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mt-8">
              <h2 className="text-[1.5rem] font-bold mb-4 text-jet" style={{ letterSpacing: '-0.02em' }}>
                Location
              </h2>

              {/* Map embed */}
              <div className="rounded-xl overflow-hidden mb-4" style={{ height: 280 }}>
                <iframe
                  title="Property location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-6.3100%2C53.3200%2C-6.2100%2C53.3800&layer=mapnik"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              {/* Transport links */}
              <div className="flex flex-col gap-2.5">
                {property.transport.map((t, index) => (
                  <div key={t} className="flex items-center gap-2.5 text-sm text-slate-brand animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <MapPin size={13} className="text-coral shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sticky column */}
          <aside ref={asideRef as React.RefObject<HTMLElement>} className={`lg:w-80 shrink-0 ${asideVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            <div
              className="rounded-2xl p-6 bg-white sticky top-24"
              style={{ boxShadow: '0 4px 40px rgba(23,27,43,0.08)' }}
            >
              {/* Price */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[2.2rem] font-bold text-coral" style={{ letterSpacing: '-0.02em' }}>
                  €{property.price.toLocaleString()}
                </span>
                <span className="text-sm text-slate-brand">/mo</span>
              </div>
              {property.available ? (
                <span className="text-xs font-bold tracking-[0.05em] uppercase px-2.5 py-1 rounded-full bg-green-50 text-green-600">
                  ● Available Now
                </span>
              ) : (
                <span className="text-xs font-bold tracking-[0.06em] uppercase text-red-600">
                  ● Let Agreed
                </span>
              )}

              <div className="mt-5 flex flex-col gap-3">
                <button
                  className="w-full px-6 py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90 active:scale-[0.97] transition-transform"
                  style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                  onClick={() => setViewingRequested(true)}
                >
                  {viewingRequested ? '✓ Viewing Requested' : 'Request Viewing'}
                </button>
                <button
                  className="w-full px-6 py-3 rounded-lg border border-ghost/20 text-jet font-medium hover:bg-surface-low transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
                  onClick={() => setWishlisted(!wishlisted)}
                >
                  <Heart size={15} fill={wishlisted ? '#ef8354' : 'none'} stroke={wishlisted ? '#ef8354' : '#2d3142'} />
                  {wishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
                </button>
              </div>

              {/* Divider */}
              <div className="my-5" style={{ borderTop: '1px solid rgba(220,193,183,0.2)' }} />

              {/* Landlord / Roommate card */}
              {property.postedBy === 'roommate' ? (
                <>
                  {property.listingType === 'temporary' && property.availableFrom && property.availableUntil && (
                    <div className="rounded-xl p-3 mb-3" style={{ background: '#e8edf4' }}>
                      <p className="text-xs font-medium" style={{ color: '#2c4a7c' }}>
                        ⏳ Available {new Date(property.availableFrom).toLocaleDateString('en-IE', { day: 'numeric', month: 'short' })} → {new Date(property.availableUntil).toLocaleDateString('en-IE', { day: 'numeric', month: 'short' })}
                        {' · '}{Math.ceil((new Date(property.availableUntil).getTime() - PAGE_LOAD_MS) / (1000 * 60 * 60 * 24))} days remaining
                      </p>
                    </div>
                  )}
                  <div className="rounded-2xl p-4 mb-4" style={{ background: '#fef3e2', border: '1px solid rgba(220,193,183,0.15)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                           style={{ background: '#fde8c8', color: '#9c5a00' }}>
                        {property.landlord.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-jet">{property.landlord.name}</p>
                        <p className="text-xs" style={{ color: '#9c5a00' }}>Roommate</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <AlertTriangle size={10} style={{ color: '#9c5a00' }} />
                          <span className="text-[0.65rem] font-bold" style={{ color: '#9c5a00' }}>Unverified listing</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-brand mb-4 leading-relaxed">
                      This room is listed by a current tenant, not the property owner.
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => navigate('/chat/c1', { viewTransition: true })}
                        className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-ghost/40 text-jet hover:bg-surface-low transition-colors"
                      >
                        Chat with roommate
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 py-2.5 px-3 rounded-xl text-sm font-medium border border-ghost/40 transition-colors hover:bg-red-50"
                        style={{ color: '#b91c1c' }}
                        onClick={() => setShowReport(true)}
                      >
                        <Flag size={13} />
                        Report
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={property.landlord.avatar}
                      alt={property.landlord.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-sm text-jet">
                          {property.landlord.name}
                        </span>
                        {property.landlord.verified && (
                          <BadgeCheck size={14} className="text-coral" />
                        )}
                      </div>
                      {property.landlord.verified && (
                        <p className="text-xs text-slate-brand">Verified Premium Host</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/chat/c1', { viewTransition: true })}
                    className="w-full px-6 py-3 rounded-lg border border-ghost/20 text-jet font-medium hover:bg-surface-low transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={14} />
                    Chat with Landlord
                  </button>
                </>
              )}

              <ReportModal open={showReport} onClose={() => setShowReport(false)} listingId={property.id} />

              {/* Divider */}
              <div className="my-5" style={{ borderTop: '1px solid rgba(220,193,183,0.2)' }} />

              {/* House Rules */}
              <div>
                <h4 className="font-bold text-sm mb-3 text-jet">House Rules</h4>
                <div className="flex flex-col gap-2">
                  {property.houseRules.map((rule) => (
                    <div key={rule} className="flex items-center gap-2 text-sm text-slate-brand">
                      <Calendar size={13} className="text-coral shrink-0" />
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
