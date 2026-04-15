import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Check, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../../components/layout/Navbar';
import { type ListRoomForm } from '../../components/roommate/types';
import { mockProperties } from '../../../data/mockProperties';
import type { Property } from '../../../types';

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

const ROOM_TYPES: ListRoomForm['type'][] = ['Single Room', 'Double Room', 'En-Suite', 'Studio'];
const AMENITY_OPTIONS = ['WiFi', 'Bills Inc.', 'Parking', 'Garden', 'Washing Machine', 'Heating', 'Near bus routes'];
const STEP_LABELS = ['Room Details', 'Amenities & Rules', 'Review & Publish'];

function formatIrishDate(iso: string) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

export function ListRoomPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ListRoomForm>(EMPTY_FORM);

  const progress = (step / 3) * 100;

  function setField<K extends keyof ListRoomForm>(key: K, value: ListRoomForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleAmenity(amenity: string) {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
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
    navigate('/roommate/dashboard');
  }

  return (
    <div className="min-h-screen bg-surface-low">
      <Navbar user={{ name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=32' }} />

      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand">
              Step {step} of 3
            </span>
            <span className="text-xs text-slate-brand">{STEP_LABELS[step - 1]}</span>
          </div>
          <div className="h-1.5 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #d47550, #b85530)' }}
            />
          </div>
          <div className="flex justify-between mt-3">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  step > s ? 'bg-coral text-white' : step === s ? 'bg-coral/15 text-coral border-2 border-coral' : 'bg-surface text-slate-brand/50'
                }`}>
                  {step > s ? <Check size={10} strokeWidth={3} /> : s}
                </div>
                <span className={`text-xs font-medium ${step >= s ? 'text-jet' : 'text-slate-brand/50'}`}>
                  {STEP_LABELS[s - 1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-6"
             style={{ boxShadow: '0 4px 24px rgba(23,27,43,0.08), 0 1px 4px rgba(23,27,43,0.04)' }}>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h2 className="font-bold text-lg text-jet mb-5" style={{ letterSpacing: '-0.02em' }}>
                Room Details
              </h2>

              <div className="mb-5">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-2 text-slate-brand">
                  Listing Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['permanent', 'temporary'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      className="p-4 rounded-xl text-left transition-all"
                      style={{
                        background: form.listingType === type ? 'rgba(239,131,84,0.05)' : '#fafafa',
                        borderLeft: form.listingType === type ? '4px solid #ef8354' : '4px solid transparent',
                        boxShadow: '0 1px 4px rgba(23,27,43,0.06)',
                      }}
                      onClick={() => setField('listingType', type)}
                    >
                      <p className="font-semibold text-sm text-jet mb-0.5">
                        {type === 'permanent' ? 'Permanent' : 'Temporary'}
                      </p>
                      <p className="text-xs text-slate-brand">
                        {type === 'permanent' ? 'Room available indefinitely' : 'Available for a limited period'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {form.listingType === 'temporary' && (
                <div className="mb-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                        Available from *
                      </label>
                      <input
                        type="date"
                        className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors"
                        value={form.availableFrom}
                        onChange={(e) => setField('availableFrom', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                        Available until *
                      </label>
                      <input
                        type="date"
                        className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors"
                        min={form.availableFrom || new Date().toISOString().split('T')[0]}
                        value={form.availableUntil}
                        onChange={(e) => setField('availableUntil', e.target.value)}
                      />
                    </div>
                  </div>
                  {form.availableUntil && (
                    <p className="text-xs text-slate-brand mt-2">
                      After {formatIrishDate(form.availableUntil)}, this listing will be automatically hidden.
                    </p>
                  )}
                </div>
              )}

              <div className="mb-4">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                  Listing Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Double room in shared 3-bed, Ranelagh"
                  className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40"
                  value={form.title}
                  onChange={(e) => setField('title', e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                  Room Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ROOM_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="py-2.5 px-3 rounded-xl text-xs font-bold tracking-[0.04em] uppercase transition-all"
                      style={{
                        background: form.type === t ? 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' : '#f0f1f3',
                        color: form.type === t ? '#fff' : '#4f5d75',
                      }}
                      onClick={() => setField('type', t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ranelagh, Dublin 6"
                    className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40"
                    value={form.location}
                    onChange={(e) => setField('location', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                    Eircode
                  </label>
                  <input
                    type="text"
                    placeholder="D06 X1Y2"
                    className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40"
                    value={form.eircode}
                    onChange={(e) => setField('eircode', e.target.value.toUpperCase())}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                  Monthly Rent (€)
                </label>
                <input
                  type="number"
                  placeholder="750"
                  className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40"
                  value={form.price}
                  onChange={(e) => setField('price', e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the room and living situation..."
                  className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40 resize-none"
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                />
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <h2 className="font-bold text-lg text-jet mb-5" style={{ letterSpacing: '-0.02em' }}>
                Amenities & House Rules
              </h2>

              <div className="mb-5">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-2 text-slate-brand">
                  Amenities
                </label>
                <div className="flex flex-wrap gap-2">
                  {AMENITY_OPTIONS.map((a) => (
                    <button
                      key={a}
                      type="button"
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

              <div className="mb-6">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                  House Rules (one per line)
                </label>
                <textarea
                  rows={4}
                  placeholder={"No smoking\nNo pets\nQuiet household"}
                  className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40 resize-none"
                  value={form.houseRules}
                  onChange={(e) => setField('houseRules', e.target.value)}
                />
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <h2 className="font-bold text-lg text-jet mb-5" style={{ letterSpacing: '-0.02em' }}>
                Review & Publish
              </h2>

              <div className="bg-surface-low rounded-xl p-4 mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.05em] text-slate-brand mb-3">Listing Summary</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Listing type', value: form.listingType === 'permanent' ? 'Permanent' : 'Temporary' },
                    { label: 'Available from', value: formatIrishDate(form.availableFrom) },
                    { label: 'Available until', value: form.listingType === 'temporary' ? formatIrishDate(form.availableUntil) : 'No end date' },
                    { label: 'Room type', value: form.type },
                    { label: 'Location', value: form.location || '—' },
                    { label: 'Monthly rent', value: form.price ? `€${form.price}/mo` : '—' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs text-slate-brand">{label}</span>
                      <span className="text-xs font-semibold text-jet">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {form.listingType === 'temporary' && form.availableUntil && (
                <div className="rounded-xl p-4 mb-5" style={{ background: '#fef3e2' }}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} style={{ color: '#9c5a00' }} className="shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-jet mb-1">Temporary listing notice</p>
                      <p className="text-xs leading-relaxed" style={{ color: '#9c5a00' }}>
                        This listing will be hidden on {formatIrishDate(form.availableUntil)}. You will receive a notification 3 days before. You can extend the date at any time from My Listings.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-2">
            {step > 1 && (
              <button
                type="button"
                className="flex-1 py-3 rounded-xl text-sm font-medium border border-ghost/40 text-slate-brand hover:bg-surface-low transition-colors"
                onClick={() => setStep((s) => s - 1)}
              >
                ← Back
              </button>
            )}
            <button
              type="button"
              className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
              onClick={step < 3 ? () => setStep((s) => s + 1) : handlePublish}
            >
              {step < 3 ? 'Continue →' : 'Publish listing'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
