import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Check, Shield, Lock, Lightbulb, ImagePlus, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../../components/layout/Navbar';
import { RoommateSidebar } from '../../components/roommate/RoommateSidebar';
import { type ListRoomForm, type Tab } from '../../components/roommate/types';

function navBack(navigate: ReturnType<typeof useNavigate>, to: string) {
  document.documentElement.dataset.navBack = '';
  navigate(to, { viewTransition: true });
  setTimeout(() => delete document.documentElement.dataset.navBack, 500);
}
import { mockProperties } from '@/data/mockProperties';
import type { Property } from '@/types';

/* ─── constants ─── */
const ROOM_TYPES: ListRoomForm['type'][] = ['Single Room', 'Double Room', 'En-Suite', 'Studio'];
const AMENITY_OPTIONS = ['WiFi', 'Bills Inc.', 'Parking', 'Garden', 'Washing Machine', 'Heating', 'Near bus routes'];

const STEPS = [
  { id: 1, label: 'Room Details'       },
  { id: 2, label: 'Amenities & Rules'  },
  { id: 3, label: 'Review & Publish'   },
];

const TIPS_IMAGE = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80';

const LISTING_TIPS = [
  'Clear photos attract genuine housemates',
  'Honest descriptions reduce no-shows',
  'Listing your house rules saves time for both parties',
];

const EMPTY_FORM: ListRoomForm = {
  listingType: 'permanent',
  availableFrom: '',
  availableUntil: '',
  title: '',
  type: 'Double Room',
  location: '',
  eircode: '',
  price: '',
  description: '',
  houseRules: '',
  amenities: [],
};

/* ─── helpers ─── */
const inputCls = 'w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40';
const labelCls = 'text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand block mb-1.5';

function formatIrishDate(iso: string) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

/* ─── Step 1 ─── */
function Step1({ form, set }: { form: ListRoomForm; set: <K extends keyof ListRoomForm>(k: K, v: ListRoomForm[K]) => void }) {
  const TODAY = new Date().toISOString().split('T')[0];
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-[1.4rem] tracking-[-0.02em] text-jet mb-1">Room Details</h2>
        <p className="text-sm text-slate-brand">Tell us about the room you're listing.</p>
      </div>

      <div>
        <p className={labelCls}>Listing Type</p>
        <div className="grid grid-cols-2 gap-3">
          {(['permanent', 'temporary'] as const).map((type) => (
            <button
              key={type} type="button"
              className="p-4 rounded-xl text-left transition-all"
              style={{
                background: form.listingType === type ? 'rgba(239,131,84,0.05)' : '#f0f1f3',
                borderLeft: form.listingType === type ? '3px solid #ef8354' : '3px solid transparent',
              }}
              onClick={() => set('listingType', type)}
            >
              <p className="font-semibold text-sm text-jet mb-0.5">
                {type === 'permanent' ? 'Permanent' : 'Temporary'}
              </p>
              <p className="text-xs text-slate-brand">
                {type === 'permanent' ? 'Available indefinitely' : 'Available for a limited period'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {form.listingType === 'temporary' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Available From</label>
            <input
              type="date"
              className={inputCls}
              value={form.availableFrom}
              onChange={(e) => set('availableFrom', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Available Until</label>
            <input
              type="date"
              className={inputCls}
              min={form.availableFrom || TODAY}
              value={form.availableUntil}
              onChange={(e) => set('availableUntil', e.target.value)}
            />
          </div>
          {form.availableUntil && (
            <p className="col-span-2 text-xs text-slate-brand -mt-2">
              Listing auto-hides after {formatIrishDate(form.availableUntil)}.
            </p>
          )}
        </div>
      )}

      <div>
        <label className={labelCls}>Listing Title</label>
        <input
          type="text"
          className={inputCls}
          placeholder="e.g. Double room in shared 3-bed, Ranelagh"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
        />
      </div>

      <div>
        <p className={labelCls}>Room Type</p>
        <div className="flex flex-wrap gap-2">
          {ROOM_TYPES.map((t) => (
            <button
              key={t} type="button"
              className="px-4 py-2 rounded-full text-xs font-bold tracking-[0.04em] uppercase transition-all"
              style={{
                background: form.type === t ? 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' : '#f0f1f3',
                color: form.type === t ? '#fff' : '#4f5d75',
              }}
              onClick={() => set('type', t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Location</label>
          <input
            type="text"
            className={inputCls}
            placeholder="e.g. Ranelagh, Dublin 6"
            value={form.location}
            onChange={(e) => set('location', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Eircode</label>
          <input
            type="text"
            className={inputCls}
            placeholder="D06 X1Y2"
            value={form.eircode}
            onChange={(e) => set('eircode', e.target.value.toUpperCase())}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Monthly Rent (€)</label>
        <input
          type="number"
          className={inputCls}
          placeholder="750"
          value={form.price}
          onChange={(e) => set('price', e.target.value)}
        />
      </div>

      <div>
        <label className={labelCls}>Description</label>
        <textarea
          rows={3}
          className={`${inputCls} resize-none`}
          placeholder="Describe the room and living situation..."
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
        />
      </div>
    </div>
  );
}

/* ─── Step 2 ─── */
function Step2({ form, set }: { form: ListRoomForm; set: <K extends keyof ListRoomForm>(k: K, v: ListRoomForm[K]) => void }) {
  function toggleAmenity(a: string) {
    set('amenities', form.amenities.includes(a) ? form.amenities.filter((x) => x !== a) : [...form.amenities, a]);
  }
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-[1.4rem] tracking-[-0.02em] text-jet mb-1">Amenities & Rules</h2>
        <p className="text-sm text-slate-brand">Help potential housemates understand what's included.</p>
      </div>

      <div>
        <p className={labelCls}>Amenities</p>
        <div className="flex flex-wrap gap-2">
          {AMENITY_OPTIONS.map((a) => (
            <button
              key={a} type="button"
              className="px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.04em] uppercase transition-all"
              style={{
                background: form.amenities.includes(a) ? 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' : '#f0f1f3',
                color: form.amenities.includes(a) ? '#fff' : '#4f5d75',
              }}
              onClick={() => toggleAmenity(a)}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>House Rules (one per line)</label>
        <textarea
          rows={4}
          className={`${inputCls} resize-none`}
          placeholder={'No smoking\nNo pets\nQuiet household'}
          value={form.houseRules}
          onChange={(e) => set('houseRules', e.target.value)}
        />
      </div>

      {/* Photo upload on step 2 for roommate */}
      <div>
        <p className={labelCls}>Photos (optional)</p>
        <div
          className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-10 cursor-pointer transition-colors"
          style={{ borderColor: 'rgba(220,193,183,0.40)' }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#ef8354')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(220,193,183,0.40)')}
        >
          <ImagePlus size={20} className="text-slate-brand mb-2" />
          <p className="text-sm font-medium text-slate-brand">Drag & drop or browse</p>
          <p className="text-xs text-slate-brand/50 mt-0.5">PNG, JPG up to 10MB</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3 ─── */
function Step3({ form }: { form: ListRoomForm }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-[1.4rem] tracking-[-0.02em] text-jet mb-1">Review & Publish</h2>
        <p className="text-sm text-slate-brand">Check your listing before it goes live.</p>
      </div>

      <div className="bg-surface-low rounded-xl p-4">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand mb-3">Listing Summary</p>
        <div className="flex flex-col gap-2.5">
          {([
            { label: 'Listing type',   value: form.listingType === 'permanent' ? 'Permanent' : 'Temporary' },
            { label: 'Room type',      value: form.type },
            { label: 'Title',          value: form.title || '—' },
            { label: 'Location',       value: form.location || '—' },
            { label: 'Monthly rent',   value: form.price ? `€${form.price}/mo` : '—' },
            ...(form.listingType === 'temporary' ? [
              { label: 'Available from',  value: formatIrishDate(form.availableFrom) },
              { label: 'Available until', value: formatIrishDate(form.availableUntil) },
            ] : []),
          ]).map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-xs text-slate-brand">{label}</span>
              <span className="text-xs font-semibold text-jet">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {form.amenities.length > 0 && (
        <div>
          <p className={labelCls}>Amenities included</p>
          <div className="flex flex-wrap gap-1.5">
            {form.amenities.map((a) => (
              <span key={a} className="text-[0.65rem] font-bold tracking-[0.04em] uppercase px-2 py-0.5 rounded-full bg-surface-low text-slate-brand">
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {form.listingType === 'temporary' && form.availableUntil && (
        <div className="rounded-xl p-4" style={{ background: '#fef3e2' }}>
          <div className="flex items-start gap-2">
            <AlertTriangle size={14} style={{ color: '#9c5a00' }} className="shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-jet mb-1">Temporary listing notice</p>
              <p className="text-xs leading-relaxed" style={{ color: '#9c5a00' }}>
                This listing will be hidden on {formatIrishDate(form.availableUntil)}. You'll receive a notification 3 days before. Extend anytime from My Listings.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════ */
export function ListRoomPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ListRoomForm>(EMPTY_FORM);
  const stepDir = useRef<'forward' | 'back'>('forward');
  const progress = Math.round((step / STEPS.length) * 100);

  function set<K extends keyof ListRoomForm>(key: K, value: ListRoomForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleBack() {
    stepDir.current = 'back';
    setStep((s) => s - 1);
  }

  function handlePublish() {
    const newListing: Property = {
      id: `r${Date.now()}`,
      title: form.title || 'Spare room',
      type: form.type,
      location: form.location,
      eircode: form.eircode,
      price: Number(form.price) || 0,
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
      amenities: form.amenities,
      bedrooms: 1,
      bathrooms: 1,
      area: 18,
      available: true,
      wishlistCount: 0,
      isRPZ: form.eircode.startsWith('D0'),
      landlord: { name: 'Jane Doe', verified: false, avatar: 'https://i.pravatar.cc/150?img=32' },
      description: form.description,
      houseRules: form.houseRules.split('\n').filter(Boolean),
      transport: [],
      postedBy: 'roommate',
      roommateVerified: false,
      listingType: form.listingType,
      availableFrom: form.availableFrom,
      availableUntil: form.listingType === 'temporary' ? form.availableUntil : null,
    };
    (mockProperties as Property[]).push(newListing);
    toast.success('Room listed successfully!');
    navigate('/roommate/dashboard', { viewTransition: true });
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface-low">
      <Navbar
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{ name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=32' }}
      />

      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Col 1 — roommate sidebar */}
        <RoommateSidebar
          activeTab={'listings' as Tab}
          onNav={() => navBack(navigate, '/roommate/dashboard')}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          hasActiveListing={false}
        />

        {/* Cols 2-4 — entire listing page content (slides as one unit) */}
        <div className="flex flex-1 overflow-hidden min-h-0" style={{ viewTransitionName: 'main-content' }}>

        {/* Col 2+3 — steps + form (no sidebar card, steps blend into bg) */}
        <main className="flex-1 overflow-hidden min-w-0">
          <div className="flex h-full">

            {/* Steps list — no bg, sits on surface-low */}
            <div className="hidden lg:flex flex-col w-44 shrink-0 sticky top-0 h-screen pt-8 pb-6 px-3">
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.1em] text-slate-brand/50 mb-5 px-1">
                New Listing
              </p>
              <div className="flex flex-col gap-1">
                {STEPS.map((s) => {
                  const done = step > s.id;
                  const active = step === s.id;
                  return (
                    <div key={s.id} className="flex items-center gap-2.5 px-2 py-2.5 rounded-xl">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                          done    ? 'bg-coral text-white'
                          : active ? 'bg-coral/15 text-coral border-2 border-coral'
                          : 'bg-white/60 text-slate-brand/50'
                        }`}
                      >
                        {done ? <Check size={11} strokeWidth={3} /> : s.id}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs font-medium leading-tight truncate ${active || done ? 'text-jet' : 'text-slate-brand/50'}`}>
                          {s.label}
                        </p>
                        <p className={`text-[0.6rem] mt-0.5 ${done ? 'text-coral' : active ? 'text-slate-brand' : 'text-slate-brand/40'}`}>
                          {done ? 'Completed' : active ? 'In Progress' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-auto pt-6">
                <button
                  onClick={() => navBack(navigate, '/roommate/dashboard')}
                  className="text-xs text-slate-brand/60 hover:text-slate-brand transition-colors underline underline-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>

          <div className="flex-1 flex justify-center items-start px-5 py-6 overflow-y-auto">
          <div className="w-full max-w-lg">

            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[0.7rem] font-bold tracking-[0.07em] uppercase text-slate-brand">
                Step {step} of {STEPS.length}
              </span>
              <span className="text-[0.7rem] font-bold text-coral">{progress}% Complete</span>
            </div>
            <div className="h-1.5 rounded-full bg-ghost/20 mb-5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #d47550, #b85530)' }}
              />
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(23,27,43,0.08),_0_1px_4px_rgba(23,27,43,0.04)]">
              <div key={step} className="p-6 pb-2" style={{ animation: `420ms cubic-bezier(0.25,1,0.5,1) ${stepDir.current === 'forward' ? 'step-from-right' : 'step-from-left'} both` }}>
                {step === 1 && <Step1 form={form} set={set} />}
                {step === 2 && <Step2 form={form} set={set} />}
                {step === 3 && <Step3 form={form} />}
              </div>

              <div className="px-6 pb-4 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(220,193,183,0.15)' }}>
                <button
                  className="px-5 py-2.5 text-sm font-medium text-slate-brand hover:text-jet transition-colors disabled:opacity-40"
                  onClick={() => step > 1 ? handleBack() : navBack(navigate, '/roommate/dashboard')}
                >
                  {step > 1 ? '← Back' : 'Cancel'}
                </button>
                <button
                  className="px-7 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                  onClick={step < 3 ? () => { stepDir.current = 'forward'; setStep((s) => s + 1); } : handlePublish}
                >
                  {step < 3 ? 'Continue →' : 'Publish Listing'}
                </button>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => navBack(navigate, '/roommate/dashboard')}
                className="text-xs text-slate-brand/60 hover:text-slate-brand transition-colors"
              >
                ← Back to Listings
              </button>
            </div>

          </div>{/* end max-w-lg */}
          </div>{/* end form div */}
          </div>{/* end flex wrapper */}
        </main>

        {/* Col 4 — tips panel */}
        <aside className="flex flex-col w-52 shrink-0 p-4 overflow-y-auto bg-surface-low">
          <div
            className="rounded-2xl overflow-hidden relative shrink-0"
            style={{ boxShadow: '0 8px 32px rgba(23,27,43,0.14)' }}
          >
            <img src={TIPS_IMAGE} alt="Room interior" className="w-full h-44 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-jet/80 via-jet/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3.5">
              <p className="text-white font-bold text-sm leading-tight" style={{ letterSpacing: '-0.01em' }}>
                Find your perfect housemate.
              </p>
              <p className="text-white/70 text-[0.68rem] mt-1 leading-relaxed">
                1,200+ active room-seekers in Dublin.
              </p>
            </div>
          </div>

          <div className="pt-5 pb-2 px-1">
            <div className="flex items-center gap-1.5 mb-3">
              <Lightbulb size={12} className="text-coral shrink-0" />
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.08em] text-slate-brand">Listing Tips</p>
            </div>
            <div className="flex flex-col gap-2.5">
              {LISTING_TIPS.map((tip) => (
                <div key={tip} className="flex items-start gap-2">
                  <Check size={11} className="text-coral shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-xs text-jet leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-4 p-3.5 rounded-xl"
            style={{ background: 'rgba(239,131,84,0.06)', border: '1px solid rgba(239,131,84,0.15)' }}
          >
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.07em] text-coral mb-1.5">Safe Listing</p>
            <p className="text-[0.65rem] text-slate-brand leading-relaxed">
              All roommate profiles are verified before they can message you.
            </p>
          </div>

          <div className="mt-auto pt-5 flex flex-col gap-2.5">
            <div className="flex items-start gap-2">
              <Shield size={11} className="text-coral shrink-0 mt-0.5" />
              <p className="text-[0.65rem] text-slate-brand leading-relaxed">
                <strong className="text-jet">Verified listings</strong> fill{' '}
                <strong className="text-coral">2× faster</strong> on HomLiv.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Lock size={11} className="text-slate-brand/50 shrink-0 mt-0.5" />
              <p className="text-[0.65rem] text-slate-brand/60 leading-relaxed">
                Your contact details stay private until you match.
              </p>
            </div>
          </div>
        </aside>

        </div>{/* end cols 2-4 wrapper */}
      </div>
    </div>
  );
}
