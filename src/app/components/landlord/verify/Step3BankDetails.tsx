interface Step3Form {
  accountHolder: string;
  iban: string;
  bic: string;
}

interface Step3Props {
  form: Step3Form;
  onChange: (form: Step3Form) => void;
}

const inputCls = 'w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40';

export function Step3BankDetails({ form, onChange }: Step3Props) {
  function set(field: keyof Step3Form, value: string) {
    onChange({ ...form, [field]: value });
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="text-sm font-semibold text-jet block mb-2">
          Account Holder Name
        </label>
        <input
          type="text"
          placeholder="e.g. Marcus O'Brien"
          className={inputCls}
          value={form.accountHolder}
          onChange={(e) => set('accountHolder', e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-jet block mb-2">
          IBAN
        </label>
        <input
          type="text"
          placeholder="IE29 AIBK 9311 5212 3456 78"
          className={`${inputCls} font-mono`}
          value={form.iban}
          onChange={(e) => set('iban', e.target.value.toUpperCase())}
        />
        <p className="text-[0.7rem] text-slate-brand/60 mt-1.5">
          Irish IBANs begin with IE and are 22 characters long.
        </p>
      </div>

      <div>
        <label className="text-sm font-semibold text-jet block mb-2">
          BIC / SWIFT Code
        </label>
        <input
          type="text"
          placeholder="e.g. AIBKIE2D"
          className={`${inputCls} font-mono`}
          value={form.bic}
          onChange={(e) => set('bic', e.target.value.toUpperCase())}
        />
      </div>

      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f0f1f3] mt-1">
        <span className="text-base shrink-0">🔒</span>
        <p className="text-xs text-slate-brand leading-relaxed">
          Your bank details are encrypted with AES-256 and stored securely. They are used solely for rent disbursement and are never shared with third parties.
        </p>
      </div>
    </div>
  );
}

export type { Step3Form };
