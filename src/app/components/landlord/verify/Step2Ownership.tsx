import { useState } from 'react';
import { Upload, FileText, ChevronDown } from 'lucide-react';

interface Step2Form {
  ownershipType: 'Owner' | 'Agent' | 'Property Manager';
  eircode: string;
  fileName: string;
}

interface Step2Props {
  form: Step2Form;
  onChange: (form: Step2Form) => void;
}

const OWNERSHIP_TYPES: Step2Form['ownershipType'][] = ['Owner', 'Agent', 'Property Manager'];

const inputCls = 'w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40';

export function Step2Ownership({ form, onChange }: Step2Props) {
  const [dragging, setDragging] = useState(false);

  function set<K extends keyof Step2Form>(field: K, value: Step2Form[K]) {
    onChange({ ...form, [field]: value });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) set('fileName', file.name);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) set('fileName', file.name);
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="text-sm font-semibold text-jet block mb-2">
          How do you own this property?
        </label>
        <div className="relative">
          <select
            className={`${inputCls} appearance-none pr-10 cursor-pointer`}
            value={form.ownershipType}
            onChange={(e) => set('ownershipType', e.target.value as Step2Form['ownershipType'])}
          >
            {OWNERSHIP_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-brand pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-jet block mb-2">
          Eircode of first property
        </label>
        <input
          type="text"
          placeholder="e.g. D02 X285"
          className={inputCls}
          value={form.eircode}
          onChange={(e) => set('eircode', e.target.value.toUpperCase())}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-jet block mb-2">
          Proof of Ownership
        </label>
        <label
          className={`block rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
            dragging ? 'border-coral bg-coral/5' : 'border-ghost/50 bg-[#f9f9fb] hover:border-coral/40'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
          <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
            {form.fileName ? (
              <>
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3"
                  style={{ boxShadow: '0 2px 8px rgba(23,27,43,0.10)' }}>
                  <FileText size={22} className="text-coral" />
                </div>
                <p className="text-sm font-semibold text-jet">{form.fileName}</p>
                <p className="text-xs text-slate-brand mt-1">Click to replace</p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3"
                  style={{ boxShadow: '0 2px 8px rgba(23,27,43,0.10)' }}>
                  <Upload size={20} className="text-coral" />
                </div>
                <p className="text-sm font-medium text-jet">Drag document here or click to upload</p>
                <p className="text-xs text-slate-brand/60 mt-1">Utility bill, lease, or Land Registry folio (PDF, JPG, PNG)</p>
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
}

export type { Step2Form };
