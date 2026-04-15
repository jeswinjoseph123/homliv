import { useState } from 'react';
import { SlidersHorizontal, X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PropertyCard } from '../components/shared/PropertyCard';
import { mockProperties } from '../../data/mockProperties';
import { useWishlist } from '../../hooks/useWishlist';

const LOCATIONS = ['Dublin', 'Cork', 'Galway', 'Limerick'];
const ROOM_TYPES = ['Single Room', 'Double Room', 'En-suite', 'Studio'];
const AMENITY_OPTIONS = ['WiFi Included', 'Bills Included', 'Washing Machine', 'Pet Friendly'];

interface SidebarContentProps {
  rentRange: [number, number];
  setRentRange: (range: [number, number]) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  selectedRoomTypes: string[];
  toggleRoomType: (type: string) => void;
  selectedAmenities: string[];
  toggleAmenity: (a: string) => void;
  clearAll: () => void;
}

function SidebarContent({
  rentRange,
  setRentRange,
  selectedLocation,
  setSelectedLocation,
  selectedRoomTypes,
  toggleRoomType,
  selectedAmenities,
  toggleAmenity,
  clearAll,
}: SidebarContentProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-base text-jet">Refine Search</h3>
        <SlidersHorizontal size={16} className="text-slate-brand" />
      </div>

      {/* Location */}
      <div className="mb-6">
        <p className="text-xs font-bold tracking-[0.06em] uppercase mb-2 text-slate-brand">Location</p>
        <div className="relative">
          <select
            className="w-full text-sm py-2 px-3 rounded-lg outline-none appearance-none pr-8 bg-surface text-jet border border-[#dcc1b7]/30"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-brand">▾</span>
        </div>
      </div>

      {/* Monthly Rent */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand">Monthly Rent</p>
          <span className="text-xs font-semibold text-coral">
            €{rentRange[0]} – €{rentRange[1]}
          </span>
        </div>
        <input
          type="range"
          min={300}
          max={3000}
          step={50}
          value={rentRange[1]}
          onChange={(e) => setRentRange([rentRange[0], Number(e.target.value)])}
          className="w-full accent-[#ef8354] cursor-pointer"
        />
      </div>

      {/* Room Type */}
      <div className="mb-6">
        <p className="text-xs font-bold tracking-[0.06em] uppercase mb-3 text-slate-brand">Room Type</p>
        <div className="flex flex-col gap-2.5">
          {ROOM_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer">
              <div
                className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                  selectedRoomTypes.includes(type)
                    ? 'bg-coral border border-coral'
                    : 'bg-white border border-[#dcc1b7]/50'
                }`}
                onClick={() => toggleRoomType(type)}
              >
                {selectedRoomTypes.includes(type) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-jet">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.06em] uppercase mb-3 text-slate-brand">Amenities</p>
        <div className="flex flex-col gap-2.5">
          {AMENITY_OPTIONS.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2.5 cursor-pointer">
              <div
                className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                  selectedAmenities.includes(amenity)
                    ? 'bg-coral border border-coral'
                    : 'bg-white border border-[#dcc1b7]/50'
                }`}
                onClick={() => toggleAmenity(amenity)}
              >
                {selectedAmenities.includes(amenity) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-jet">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
        style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
      >
        Apply Filters
      </button>
      <button
        className="w-full py-2 mt-2 text-xs font-bold tracking-[0.08em] uppercase transition-colors text-slate-brand hover:text-jet"
        onClick={clearAll}
      >
        Clear All
      </button>
    </div>
  );
}

export function ListingsPage() {
  const { isWishlisted, toggle } = useWishlist();
  const [sortBy, setSortBy] = useState<'newest' | 'price'>('newest');
  const [selectedLocation, setSelectedLocation] = useState('Dublin');
  const [rentRange, setRentRange] = useState<[number, number]>([300, 3000]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>(['Double Room']);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const toggleRoomType = (type: string) => {
    setSelectedRoomTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (a: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const clearAll = () => {
    setSelectedRoomTypes([]);
    setSelectedAmenities([]);
    setRentRange([300, 3000]);
    setSelectedLocation('Dublin');
  };

  // Sort
  const sorted = [...mockProperties].sort((a, b) =>
    sortBy === 'price' ? a.price - b.price : Number(b.id) - Number(a.id)
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const sidebarProps: SidebarContentProps = {
    rentRange,
    setRentRange,
    selectedLocation,
    setSelectedLocation,
    selectedRoomTypes,
    toggleRoomType,
    selectedAmenities,
    toggleAmenity,
    clearAll,
  };

  return (
    <div className="bg-surface text-ink min-h-screen">
      <Navbar />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h1 className="font-bold leading-tight tracking-[-0.02em] text-jet" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Curated Spaces
            </h1>
            <h1 className="font-bold leading-none mb-3 tracking-[-0.02em] text-coral" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Dublin City
            </h1>
            <p className="text-sm text-slate-brand">
              Discover {sorted.length} premium rental listings in the heart of Dublin's most vibrant districts.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Mobile filter button */}
            <button
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-surface-low text-jet"
              onClick={() => setShowFilterModal(true)}
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
            <button
              className="px-5 py-2 rounded-full text-xs font-bold tracking-[0.06em] uppercase transition-opacity hover:opacity-90 text-white"
              style={sortBy === 'newest'
                ? { background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }
                : { background: 'transparent', border: '1px solid rgba(220,193,183,0.5)', color: '#4f5d75' }}
              onClick={() => setSortBy('newest')}
            >
              Newest
            </button>
            <button
              className="px-5 py-2 rounded-full text-xs font-bold tracking-[0.06em] uppercase transition-opacity hover:opacity-90 text-white"
              style={sortBy === 'price'
                ? { background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }
                : { background: 'transparent', border: '1px solid rgba(220,193,183,0.5)', color: '#4f5d75' }}
              onClick={() => setSortBy('price')}
            >
              Price: Low to High
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside
            className="hidden lg:block shrink-0 p-6 self-start sticky top-20 bg-white rounded-2xl"
            style={{ width: 240, boxShadow: '0 4px 20px rgba(23,27,43,0.08), 0 1px 4px rgba(23,27,43,0.04)' }}
          >
            <SidebarContent {...sidebarProps} />
          </aside>

          {/* Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {paginated.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  onWishlistToggle={toggle}
                  isWishlisted={isWishlisted(prop.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-surface-low text-jet disabled:opacity-40"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className="w-9 h-9 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 text-white"
                  style={page === currentPage
                    ? { background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }
                    : { background: 'transparent', color: '#4f5d75', border: '1px solid rgba(220,193,183,0.4)' }}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-surface-low text-jet disabled:opacity-40"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile filter modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilterModal(false)} />
          <div className="relative w-full bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto" style={{ boxShadow: '0 -8px 32px rgba(23,27,43,0.18)' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-base text-jet">Filters</span>
              <button onClick={() => setShowFilterModal(false)}>
                <X size={20} className="text-slate-brand" />
              </button>
            </div>
            <SidebarContent {...sidebarProps} />
          </div>
        </div>
      )}

      {/* Concierge Chat Button */}
      <button
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-full text-white text-sm font-semibold z-40 transition-opacity hover:opacity-90"
        style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)', boxShadow: '0 4px 20px rgba(180,80,40,0.40)' }}
        onClick={() => setChatOpen(!chatOpen)}
      >
        <MessageCircle size={16} />
        Concierge Chat
      </button>

      {chatOpen && (
        <div
          className="fixed bottom-20 right-6 w-72 bg-white rounded-xl z-40 overflow-hidden shadow-[0_8px_40px_rgba(23,27,43,0.15)]"
        >
          <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}>
            <span className="text-white font-semibold text-sm">Concierge Chat</span>
            <button onClick={() => setChatOpen(false)}>
              <X size={16} className="text-white" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-slate-brand">
              Hi! I'm your HomLiv concierge. How can I help you find your perfect space today?
            </p>
            <input
              className="w-full mt-4 px-3 py-2 rounded-lg text-sm outline-none bg-surface border border-[#dcc1b7]/30"
              placeholder="Type your message..."
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
