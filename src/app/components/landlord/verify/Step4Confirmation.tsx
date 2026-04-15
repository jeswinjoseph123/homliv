import { CheckCircle2 } from 'lucide-react';
import { type Step1Form } from './Step1PersonalInfo';
import { type Step2Form } from './Step2Ownership';
import { type Step3Form } from './Step3BankDetails';

interface Step4Props {
  step1: Step1Form;
  step2: Step2Form;
  step3: Step3Form;
  agreed: boolean;
  onAgreeChange: (v: boolean) => void;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-ghost/15 last:border-0">
      <span className="text-xs font-bold tracking-[0.05em] uppercase text-slate-brand">{label}</span>
      <span className="text-sm text-jet font-medium">{value || '—'}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-[0_2px_12px_rgba(23,27,43,0.06)]">
      <p className="text-[0.65rem] font-bold tracking-[0.08em] uppercase text-coral mb-3">{title}</p>
      {children}
    </div>
  );
}

export function Step4Confirmation({ step1, step2, step3, agreed, onAgreeChange }: Step4Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 p-4 rounded-xl bg-coral/8">
        <CheckCircle2 size={20} className="text-coral shrink-0" />
        <p className="text-sm text-jet">
          Please review your details before submitting. Once submitted, our team will verify your account within <strong>24 hours</strong>.
        </p>
      </div>

      <Section title="Personal Info">
        <Row label="Full Name"   value={step1.fullName} />
        <Row label="Phone"       value={step1.phone ? `+353 ${step1.phone}` : ''} />
        <Row label="Date of Birth" value={step1.dob} />
        <Row label="PPS Number"  value={step1.ppsNumber ? `${step1.ppsNumber.slice(0, 3)}****` : ''} />
      </Section>

      <Section title="Ownership">
        <Row label="Ownership Type" value={step2.ownershipType} />
        <Row label="Eircode"         value={step2.eircode} />
        <Row label="Document"        value={step2.fileName || 'Not uploaded'} />
      </Section>

      <Section title="Bank Details">
        <Row label="Account Holder" value={step3.accountHolder} />
        <Row label="IBAN"           value={step3.iban ? `${step3.iban.slice(0, 6)}••••••••••••••••` : ''} />
        <Row label="BIC"            value={step3.bic} />
      </Section>

      <label className="flex items-start gap-3 cursor-pointer mt-1">
        <input
          type="checkbox"
          className="mt-0.5 w-4 h-4 accent-coral shrink-0"
          checked={agreed}
          onChange={(e) => onAgreeChange(e.target.checked)}
        />
        <span className="text-xs text-slate-brand leading-relaxed">
          I confirm that all information provided is accurate and I agree to HomLiv's{' '}
          <span className="text-coral font-semibold cursor-pointer">Terms of Service</span> and{' '}
          <span className="text-coral font-semibold cursor-pointer">Privacy Policy</span>. I understand my details will be used for identity verification in accordance with GDPR.
        </span>
      </label>
    </div>
  );
}
