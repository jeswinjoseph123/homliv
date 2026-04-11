import { useState } from 'react';
import { toast } from 'sonner';
import { type NewPropertyForm } from './types';

interface ListPropertyModalProps {
  open: boolean;
  onClose: () => void;
}

const EMPTY_FORM: NewPropertyForm = {
  address: '',
  eircode: '',
  type: 'Double Room',
  rent: '',
  bedrooms: '1',
  bathrooms: '1',
  amenities: [],
  houseRules: '',
};

const ROOM_TYPES: NewPropertyForm['type'][] = [
  'Single Room', 'Double Room', 'En-Suite', 'Studio', 'Penthouse',
];

const AMENITY_OPTIONS = [
  'WiFi', 'Bills Inc.', 'Parking', 'Garden', 'Gym', 'Balcony', 'Concierge', 'En-suite', 'AC',
];

const STEP_LABELS = ['Property Details', 'Amenities & Rules', 'Photos'];

export function ListPropertyModal({ open, onClose }: ListPropertyModalProps) {
  const [modalStep, setModalStep] = useState(1);
  const [form, setForm] = useState<NewPropertyForm>(EMPTY_FORM);

  const isRPZ = form.eircode.trim().length > 0;

  function handleClose() {
    setModalStep(1);
    setForm(EMPTY_FORM);
    onClose();
  }

  function handleNext() {
    if (modalStep < 3) {
      setModalStep((s) => s + 1);
    } else {
      handleClose();
      toast.success('Property listed successfully!');
    }
  }

  function handleBack() {
    if (modalStep > 1) setModalStep((s) => s - 1);
    else handleClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(23,27,43,0.2)]">
        <div className="px-6 pt-6 pb-4">
          {/* Step indicator */}
          <div className="flex items-center gap-1 mb-5">
            {[1, 2, 3].map((step, i) => (
              <div key={step} className="flex items-center gap-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step <= modalStep ? 'bg-coral text-white' : 'bg-surface-low text-slate-brand'
                  }`}
                >
                  {step}
                </div>
                {i < 2 && (
                  <div className={`w-10 h-px ${step < modalStep ? 'bg-coral' : 'bg-ghost/30'}`} />
                )}
              </div>
            ))}
            <span className="ml-3 text-xs text-slate-brand font-medium">
              {STEP_LABELS[modalStep - 1]}
            </span>
          </div>
          <h2 className="font-bold text-xl text-jet tracking-[-0.01em]">List New Property</h2>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-4">
          {/* Step 1: Details */}
          {modalStep === 1 && (
            <>
              <div>
                <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                  Street Address
                </label>
                <input
                  className="w-full border-0 border-b border-ghost/30 bg-transparent px-0 py-2 text-sm text-jet outline-none focus:border-coral transition-colors placeholder:text-slate-brand/40"
                  placeholder="14 Fitzwilliam Square"
                  value={form.address}
                  onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                  Eircode
                </label>
                <div className="flex items-center gap-3">
                  <input
                    className="flex-1 border-0 border-b border-ghost/30 bg-transparent px-0 py-2 text-sm text-jet outline-none focus:border-coral transition-colors placeholder:text-slate-brand/40"
                    placeholder="D02 X285"
                    value={form.eircode}
                    onChange={(e) => setForm((p) => ({ ...p, eircode: e.target.value }))}
                  />
                  {isRPZ && (
                    <span className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-coral text-white shrink-0">
                      RPZ AREA
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                  Room Type
                </label>
                <select
                  className="w-full border-0 border-b border-ghost/30 bg-transparent px-0 py-2 text-sm text-jet outline-none focus:border-coral transition-colors"
                  value={form.type}
                  onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as NewPropertyForm['type'] }))}
                >
                  {ROOM_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {(
                  [
                    { label: 'Monthly Rent (€)', key: 'rent',      placeholder: '950' },
                    { label: 'Bedrooms',          key: 'bedrooms',  placeholder: '1' },
                    { label: 'Bathrooms',         key: 'bathrooms', placeholder: '1' },
                  ] as const
                ).map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                      {label}
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full border-0 border-b border-ghost/30 bg-transparent px-0 py-2 text-sm text-jet outline-none focus:border-coral transition-colors placeholder:text-slate-brand/40"
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 2: Amenities & Rules */}
          {modalStep === 2 && (
            <>
              <div>
                <p className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand mb-3">Amenities</p>
                <div className="grid grid-cols-2 gap-2">
                  {AMENITY_OPTIONS.map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-coral rounded"
                        checked={form.amenities.includes(amenity)}
                        onChange={() =>
                          setForm((p) => ({
                            ...p,
                            amenities: p.amenities.includes(amenity)
                              ? p.amenities.filter((a) => a !== amenity)
                              : [...p.amenities, amenity],
                          }))
                        }
                      />
                      <span className="text-sm text-jet">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                  House Rules
                </label>
                <textarea
                  className="w-full border border-ghost/30 rounded-lg px-3 py-2.5 text-sm text-jet outline-none focus:border-coral transition-colors resize-none"
                  rows={4}
                  placeholder="e.g. No smoking, 12-month minimum lease..."
                  value={form.houseRules}
                  onChange={(e) => setForm((p) => ({ ...p, houseRules: e.target.value }))}
                />
              </div>
            </>
          )}

          {/* Step 3: Photos */}
          {modalStep === 3 && (
            <div className="rounded-xl border-2 border-dashed border-ghost/40 flex flex-col items-center justify-center py-12 cursor-pointer hover:border-coral/40 transition-colors">
              <p className="text-sm text-slate-brand font-medium">Drag & drop photos here</p>
              <p className="text-xs text-slate-brand/60 mt-1">PNG, JPG — up to 10MB each</p>
              <button className="mt-4 px-4 py-2 rounded-lg border border-ghost/30 text-sm text-jet hover:bg-surface-low transition-colors">
                Browse files
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-ghost/20 mt-2">
            <button
              className="px-5 py-2.5 rounded-lg border border-ghost/20 text-jet text-sm font-medium hover:bg-surface-low transition-colors"
              onClick={handleBack}
            >
              {modalStep > 1 ? '← Back' : 'Cancel'}
            </button>
            <button
              className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
              onClick={handleNext}
            >
              {modalStep < 3 ? 'Next →' : 'Submit Listing'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
