import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Check, Lock, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../components/layout/Navbar';
import { LandlordSidebar } from '../components/landlord/LandlordSidebar';
import { Step1PersonalInfo, type Step1Form } from '../components/landlord/verify/Step1PersonalInfo';
import { Step2Ownership, type Step2Form } from '../components/landlord/verify/Step2Ownership';
import { Step3BankDetails, type Step3Form } from '../components/landlord/verify/Step3BankDetails';
import { Step4Confirmation } from '../components/landlord/verify/Step4Confirmation';
import { useVerificationStore } from '../../hooks/useVerificationStore';
import { type Tab } from '../components/landlord/types';

function navBack(navigate: ReturnType<typeof useNavigate>, to: string) {
  document.documentElement.dataset.navBack = '';
  navigate(to, { viewTransition: true });
  setTimeout(() => delete document.documentElement.dataset.navBack, 500);
}

const TRUST_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80';

const STEPS = [
  { id: 1, label: 'Personal Info' },
  { id: 2, label: 'Ownership' },
  { id: 3, label: 'Bank Details' },
  { id: 4, label: 'Confirmation' },
];

const BENEFITS = [
  'Verified Badge on Listings',
  'Direct Messaging Priority',
  'Premium Support Access',
];

const EMPTY_STEP1: Step1Form = { fullName: '', phone: '', dob: '', ppsNumber: '' };
const EMPTY_STEP2: Step2Form = { ownershipType: 'Owner', eircode: '', fileName: '' };
const EMPTY_STEP3: Step3Form = { accountHolder: '', iban: '', bic: '' };

export function LandlordVerifyPage() {
  const navigate = useNavigate();
  const { setVerified } = useVerificationStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep]   = useState(1);
  const [step1, setStep1] = useState<Step1Form>(EMPTY_STEP1);
  const [step2, setStep2] = useState<Step2Form>(EMPTY_STEP2);
  const [step3, setStep3] = useState<Step3Form>(EMPTY_STEP3);
  const [agreed, setAgreed] = useState(false);
  const stepDir = useRef<'forward' | 'back'>('forward');

  const progress = Math.round((step / STEPS.length) * 100);

  function handleNext() {
    if (step < 4) {
      stepDir.current = 'forward';
      setStep((s) => s + 1);
    } else {
      if (!agreed) {
        toast.error('Please agree to the Terms of Service before submitting.');
        return;
      }
      setVerified(true);
      toast.success("Verification submitted — we'll review within 24 hours.");
      navigate('/dashboard', { viewTransition: true });
    }
  }

  function handleBack() {
    stepDir.current = 'back';
    setStep((s) => s - 1);
  }

  function handleDoLater() {
    setVerified(false);
    navBack(navigate, '/dashboard');
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
          activeTab={'settings' as Tab}
          onNav={() => navBack(navigate, '/dashboard')}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Cols 2-4 — entire verify content (slides as one unit) */}
        <div className="flex flex-1 overflow-hidden min-h-0" style={{ viewTransitionName: 'main-content' }}>

          {/* Col 2 — steps list, no bg card, blends into surface-low */}
          <div className="hidden lg:flex flex-col w-44 shrink-0 sticky top-0 h-screen pt-8 pb-6 px-3">
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.1em] text-slate-brand/50 mb-5 px-1">
              Verification Progress
            </p>
            <div className="flex flex-col gap-1">
              {STEPS.map((s) => {
                const done   = step > s.id;
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
                onClick={handleDoLater}
                className="text-xs text-slate-brand/60 hover:text-slate-brand transition-colors underline underline-offset-2"
              >
                Do it later
              </button>
            </div>
          </div>

          {/* Col 3 — form */}
          <main className="flex-1 overflow-hidden min-w-0">
            <div className="flex-1 flex justify-center items-start px-5 py-6 overflow-y-auto h-full">
            <div className="w-full max-w-lg">

              <h1 className="font-bold text-[1.6rem] tracking-[-0.02em] text-jet mb-1">
                Verify your identity as a landlord
              </h1>
              <p className="text-sm text-slate-brand mb-5">
                HomLiv verifies all landlords to protect tenants from scams. This takes 2 minutes.
              </p>

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

              {/* Form card — content slides directionally, card sizes to content */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(23,27,43,0.08),_0_1px_4px_rgba(23,27,43,0.04)]">
                <div
                  key={step}
                  className="p-6 pb-2"
                  style={{ animation: `420ms cubic-bezier(0.25,1,0.5,1) ${stepDir.current === 'forward' ? 'step-from-right' : 'step-from-left'} both` }}
                >
                  {step === 1 && <Step1PersonalInfo form={step1} onChange={setStep1} />}
                  {step === 2 && <Step2Ownership    form={step2} onChange={setStep2} />}
                  {step === 3 && <Step3BankDetails  form={step3} onChange={setStep3} />}
                  {step === 4 && (
                    <Step4Confirmation
                      step1={step1}
                      step2={step2}
                      step3={step3}
                      agreed={agreed}
                      onAgreeChange={setAgreed}
                    />
                  )}
                </div>

                <div className="px-6 pb-4 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(220,193,183,0.15)' }}>
                  <button
                    className="px-5 py-2.5 text-sm font-medium text-slate-brand hover:text-jet transition-colors disabled:opacity-40"
                    onClick={handleBack}
                    disabled={step === 1}
                  >
                    ← Back
                  </button>
                  <button
                    className="px-7 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                    style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                    onClick={handleNext}
                  >
                    {step < 4 ? 'Next step →' : 'Submit for Review'}
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleDoLater}
                  className="text-xs text-slate-brand/60 hover:text-slate-brand transition-colors"
                >
                  ← Back to Dashboard
                </button>
              </div>

            </div>
            </div>
          </main>

          {/* Col 4 — trust panel */}
          <aside className="flex flex-col w-52 shrink-0 p-4 overflow-y-auto bg-surface-low">
            <div
              className="rounded-2xl overflow-hidden relative shrink-0"
              style={{ boxShadow: '0 8px 32px rgba(23,27,43,0.14)' }}
            >
              <img src={TRUST_IMAGE} alt="Modern building" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-jet/90 via-jet/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <p className="text-white font-bold text-sm leading-tight" style={{ letterSpacing: '-0.01em' }}>
                  Trust is our foundation.
                </p>
                <p className="text-white/70 text-[0.7rem] mt-1 leading-relaxed">
                  Joining 15,000+ verified landlords in the HomLiv ecosystem.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 px-1 pt-5">
              {BENEFITS.map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <Check size={12} className="text-coral shrink-0" strokeWidth={3} />
                  <span className="text-xs text-jet">{b}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <Shield size={12} className="text-coral shrink-0 mt-0.5" />
                <p className="text-[0.65rem] text-slate-brand leading-relaxed">
                  <strong className="text-jet">Verified landlords</strong> receive{' '}
                  <strong className="text-coral">3x more</strong> tenant applications on average.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Lock size={12} className="text-slate-brand/50 shrink-0 mt-0.5" />
                <p className="text-[0.65rem] text-slate-brand/60 leading-relaxed">
                  Encrypted &amp; Secure. GDPR compliant.
                </p>
              </div>
            </div>
          </aside>

        </div>{/* end cols 2-4 wrapper */}
      </div>
    </div>
  );
}
