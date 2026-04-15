interface Step1Form {
  fullName: string;
  phone: string;
  dob: string;
  ppsNumber: string;
}

interface Step1Props {
  form: Step1Form;
  onChange: (form: Step1Form) => void;
}

const inputCls = 'w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40';

export function Step1PersonalInfo({ form, onChange }: Step1Props) {
  function set(field: keyof Step1Form, value: string) {
    onChange({ ...form, [field]: value });
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="text-sm font-semibold text-jet block mb-2">
          Full Legal Name
        </label>
        <input
          type="text"
          placeholder="e.g. Marcus O'Brien"
          className={inputCls}
          value={form.fullName}
          onChange={(e) => set('fullName', e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-jet block mb-2">
          Phone Number
        </label>
        <div className="flex items-center gap-0">
          <span className="text-sm text-slate-brand bg-[#f0f1f3] rounded-l-xl py-3 pl-4 pr-2 shrink-0 border-r border-white/60">+353</span>
          <input
            type="tel"
            placeholder="87 123 4567"
            className="flex-1 bg-[#f0f1f3] rounded-r-xl px-3 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-jet block mb-2">
          Date of Birth
        </label>
        <input
          type="date"
          className={inputCls}
          value={form.dob}
          onChange={(e) => set('dob', e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-jet block mb-2">
          PPS Number
        </label>
        <input
          type="text"
          placeholder="e.g. 1234567T"
          className={inputCls}
          value={form.ppsNumber}
          onChange={(e) => set('ppsNumber', e.target.value.toUpperCase())}
        />
        <p className="text-[0.7rem] text-slate-brand/60 mt-1.5">
          Your PPS number is used for identity verification only and is never shared.
        </p>
      </div>
    </div>
  );
}

export type { Step1Form };
