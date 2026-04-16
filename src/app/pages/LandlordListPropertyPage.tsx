import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Check, Shield, Lock, Lightbulb, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../components/layout/Navbar';
import { LandlordSidebar } from '../components/landlord/LandlordSidebar';
import { type Tab } from '../components/landlord/types';

function navBack(navigate: ReturnType<typeof useNavigate>, to: string, state?: object) {
  document.documentElement.dataset.navBack = '';
  navigate(to, { state, viewTransition: true });
  setTimeout(() => delete document.documentElement.dataset.navBack, 500);
}

/* ─── constants ─── */
const ROOM_TYPES = ['Single Room', 'Double Room', 'En-Suite', 'Studio', 'Penthouse'] as const;
const AMENITY_OPTIONS = ['WiFi', 'Bills Inc.', 'Parking', 'Garden', 'Gym', 'Balcony', 'Concierge', 'En-suite', 'AC'];
const BER_RATINGS = ['A1','A2','A3','B1','B2','B3','C1','C2','C3','D1','D2','E1','E2','F','G'];
const FURNISHED_OPTIONS = [
  { value: 'yes',     label: 'Furnished'   },
  { value: 'partial', label: 'Part Furnished' },
  { value: 'no',      label: 'Unfurnished' },
] as const;

const STEPS = [
  { id: 1, label: 'Property Basics' },
  { id: 2, label: 'Key Features'    },
  { id: 3, label: 'Media & Photos'  },
];

const TIPS_IMAGE = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80';

const LISTING_TIPS = [
  'Accurate photos attract 40% more enquiries',
  'Detailed BER ratings build tenant trust',
  'Clear house rules reduce disputes later',
];

type Furnished = 'yes' | 'partial' | 'no';
type Form = {
  type: (typeof ROOM_TYPES)[number];
  address: string;
  eircode: string;
  rent: string;
  bedrooms: string;
  bathrooms: string;
  availableFrom: string;
  amenities: string[];
  furnished: Furnished;
  berRating: string;
  houseRules: string;
};

const EMPTY: Form = {
  type: 'Double Room',
  address: '',
  eircode: '',
  rent: '',
  bedrooms: '1',
  bathrooms: '1',
  availableFrom: '',
  amenities: [],
  furnished: 'yes',
  berRating: '',
  houseRules: '',
};

/* ─── shared input style ─── */
const inputCls = 'w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40';
const labelCls = 'text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand block mb-1.5';

/* ─── Step 1 ─── */
function Step1({ form, set }: { form: Form; set: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  const isRPZ = form.eircode.trim().length > 0;
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-[1.4rem] tracking-[-0.02em] text-jet mb-1">Property Basics</h2>
        <p className="text-sm text-slate-brand">Tell us the fundamentals of your property.</p>
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

      <div>
        <label className={labelCls}>Street Address</label>
        <input
          type="text"
          className={inputCls}
          placeholder="e.g. 14 Fitzwilliam Square"
          value={form.address}
          onChange={(e) => set('address', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Eircode</label>
          <div className="relative">
            <input
              type="text"
              className={inputCls}
              placeholder="D02 X285"
              value={form.eircode}
              onChange={(e) => set('eircode', e.target.value.toUpperCase())}
            />
            {isRPZ && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.6rem] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-coral text-white">
                RPZ
              </span>
            )}
          </div>
        </div>
        <div>
          <label className={labelCls}>Available From</label>
          <input
            type="date"
            className={inputCls}
            value={form.availableFrom}
            onChange={(e) => set('availableFrom', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>Monthly Rent (€)</label>
          <input
            type="number"
            className={inputCls}
            placeholder="950"
            value={form.rent}
            onChange={(e) => set('rent', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Bedrooms</label>
          <input
            type="number"
            min="0"
            className={inputCls}
            placeholder="1"
            value={form.bedrooms}
            onChange={(e) => set('bedrooms', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Bathrooms</label>
          <input
            type="number"
            min="1"
            className={inputCls}
            placeholder="1"
            value={form.bathrooms}
            onChange={(e) => set('bathrooms', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2 ─── */
function Step2({ form, set }: { form: Form; set: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  function toggleAmenity(a: string) {
    set('amenities', form.amenities.includes(a) ? form.amenities.filter((x) => x !== a) : [...form.amenities, a]);
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-[1.4rem] tracking-[-0.02em] text-jet mb-1">Key Features</h2>
        <p className="text-sm text-slate-brand">Highlight what makes your property stand out.</p>
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
        <p className={labelCls}>Furnished Status</p>
        <div className="grid grid-cols-3 gap-3">
          {FURNISHED_OPTIONS.map(({ value, label }) => (
            <button
              key={value} type="button"
              className="py-3 px-2 rounded-xl text-xs font-bold tracking-[0.04em] uppercase text-center transition-all"
              style={{
                background: form.furnished === value ? 'rgba(239,131,84,0.08)' : '#f0f1f3',
                borderLeft: form.furnished === value ? '3px solid #ef8354' : '3px solid transparent',
                color: form.furnished === value ? '#ef8354' : '#4f5d75',
              }}
              onClick={() => set('furnished', value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>BER Rating</label>
          <select
            className={inputCls}
            value={form.berRating}
            onChange={(e) => set('berRating', e.target.value)}
          >
            <option value="">Select Rating</option>
            {BER_RATINGS.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>House Rules</label>
        <textarea
          rows={4}
          className={`${inputCls} resize-none`}
          placeholder="e.g. No smoking, 12-month minimum lease, no pets..."
          value={form.houseRules}
          onChange={(e) => set('houseRules', e.target.value)}
        />
      </div>
    </div>
  );
}

/* ─── Step 3 ─── */
function Step3() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-[1.4rem] tracking-[-0.02em] text-jet mb-1">Media & Photos</h2>
        <p className="text-sm text-slate-brand">Great photos get 3× more enquiries.</p>
      </div>

      <div
        className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-14 cursor-pointer transition-colors"
        style={{ borderColor: 'rgba(220,193,183,0.40)' }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#ef8354')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(220,193,183,0.40)')}
      >
        <div className="w-12 h-12 rounded-2xl bg-surface-low flex items-center justify-center mb-3">
          <ImagePlus size={22} className="text-slate-brand" />
        </div>
        <p className="text-sm font-semibold text-jet">Drag & drop photos here</p>
        <p className="text-xs text-slate-brand/60 mt-1">PNG, JPG — up to 10MB each, max 10 photos</p>
        <button
          type="button"
          className="mt-4 px-5 py-2 rounded-xl text-sm font-medium text-jet hover:bg-surface-low transition-colors"
          style={{ border: '1px solid rgba(220,193,183,0.40)' }}
        >
          Browse files
        </button>
      </div>

      <div className="p-4 rounded-xl" style={{ background: 'rgba(239,131,84,0.05)', borderLeft: '3px solid #ef8354' }}>
        <p className="text-xs font-semibold text-jet mb-1">Photo tips</p>
        <ul className="text-xs text-slate-brand space-y-1">
          <li>· Shoot in natural daylight for best results</li>
          <li>· Include bedroom, bathroom, kitchen and living areas</li>
          <li>· Landscape orientation works best on listings</li>
        </ul>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════ */
export function LandlordListPropertyPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>(EMPTY);
  const stepDir = useRef<'forward' | 'back'>('forward');
  const progress = Math.round((step / STEPS.length) * 100);

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleNext() {
    if (step < 3) {
      stepDir.current = 'forward';
      setStep((s) => s + 1);
    } else {
      toast.success('Property listed successfully!');
      navigate('/dashboard', { state: { tab: 'properties' }, viewTransition: true });
    }
  }

  function handleBack() {
    stepDir.current = 'back';
    setStep((s) => s - 1);
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface-low">
      <Navbar
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{ name: "Marcus O'Brien", avatar: 'https://i.pravatar.cc/150?img=55' }}
      />

      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Col 1 — dashboard nav sidebar */}
        <LandlordSidebar
          activeTab={'properties' as Tab}
          onNav={() => navBack(navigate, '/dashboard', { tab: 'properties' })}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
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
                  onClick={() => navBack(navigate, '/dashboard', { tab: 'properties' })}
                  className="text-xs text-slate-brand/60 hover:text-slate-brand transition-colors underline underline-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>

          <div className="flex-1 flex justify-center items-start px-5 py-6 overflow-y-auto">
          <div className="w-full max-w-lg">

            {/* Step label + progress */}
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

            {/* Form card — elastic: sizes to content, animates on step change */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(23,27,43,0.08),_0_1px_4px_rgba(23,27,43,0.04)]">
              <div key={step} className="p-6 pb-2" style={{ animation: `420ms cubic-bezier(0.25,1,0.5,1) ${stepDir.current === 'forward' ? 'step-from-right' : 'step-from-left'} both` }}>
                {step === 1 && <Step1 form={form} set={set} />}
                {step === 2 && <Step2 form={form} set={set} />}
                {step === 3 && <Step3 />}
              </div>

              <div className="px-6 pb-4 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(220,193,183,0.15)' }}>
                <button
                  className="px-5 py-2.5 text-sm font-medium text-slate-brand hover:text-jet transition-colors disabled:opacity-40"
                  onClick={() => step > 1 ? handleBack() : navBack(navigate, '/dashboard', { tab: 'properties' })}
                >
                  {step > 1 ? '← Back' : 'Cancel'}
                </button>
                <button
                  className="px-7 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                  onClick={handleNext}
                >
                  {step < 3 ? 'Continue →' : 'Publish Listing'}
                </button>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => navBack(navigate, '/dashboard', { tab: 'properties' })}
                className="text-xs text-slate-brand/60 hover:text-slate-brand transition-colors"
              >
                ← Back to Properties
              </button>
            </div>

          </div>{/* end max-w-lg */}
          </div>{/* end form div */}
          </div>{/* end flex wrapper */}
        </main>

        {/* Col 4 — tips panel */}
        <aside className="flex flex-col w-52 shrink-0 p-4 overflow-y-auto bg-surface-low">
          {/* Property image */}
          <div
            className="rounded-2xl overflow-hidden relative shrink-0"
            style={{ boxShadow: '0 8px 32px rgba(23,27,43,0.14)' }}
          >
            <img src={TIPS_IMAGE} alt="Property interior" className="w-full h-44 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-jet/80 via-jet/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3.5">
              <p className="text-white font-bold text-sm leading-tight" style={{ letterSpacing: '-0.01em' }}>
                Great listings let faster.
              </p>
              <p className="text-white/70 text-[0.68rem] mt-1 leading-relaxed">
                Complete all steps for maximum visibility.
              </p>
            </div>
          </div>

          {/* Tips */}
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

          {/* Premium trust */}
          <div
            className="mt-4 p-3.5 rounded-xl"
            style={{ background: 'rgba(239,131,84,0.06)', border: '1px solid rgba(239,131,84,0.15)' }}
          >
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.07em] text-coral mb-1.5">Premium Trust</p>
            <p className="text-[0.65rem] text-slate-brand leading-relaxed">
              All properties listed on HomLiv undergo a verification process to ensure market integrity.
            </p>
          </div>

          {/* Security note */}
          <div className="mt-auto pt-5 flex flex-col gap-2.5">
            <div className="flex items-start gap-2">
              <Shield size={11} className="text-coral shrink-0 mt-0.5" />
              <p className="text-[0.65rem] text-slate-brand leading-relaxed">
                <strong className="text-jet">Verified listings</strong> receive{' '}
                <strong className="text-coral">3× more</strong> enquiries on average.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Lock size={11} className="text-slate-brand/50 shrink-0 mt-0.5" />
              <p className="text-[0.65rem] text-slate-brand/60 leading-relaxed">
                Encrypted &amp; GDPR compliant.
              </p>
            </div>
          </div>
        </aside>

        </div>{/* end cols 2-4 wrapper */}
      </div>
    </div>
  );
}
