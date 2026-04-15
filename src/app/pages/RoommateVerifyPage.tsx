import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Check, AlertTriangle } from 'lucide-react';
import { LogoMark } from '../components/shared/LogoMark';
import { useRoommateStore } from '../../hooks/useRoommateStore';

const STEPS = [
  { id: 1, label: 'Email' },
  { id: 2, label: 'Phone' },
];

export function RoommateVerifyPage() {
  const navigate = useNavigate();
  const { setVerified } = useRoommateStore();

  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  // Step 1 state
  const [codeSent1, setCodeSent1] = useState(false);
  const [code1, setCode1] = useState('');

  // Step 2 state
  const [phone, setPhone] = useState('');
  const [codeSent2, setCodeSent2] = useState(false);
  const [code2, setCode2] = useState('');

  const progress = (step / STEPS.length) * 100;

  function handleNext() {
    if (step === 1 && code1.length === 6) {
      setStep(2);
    } else if (step === 2 && code2.length === 6) {
      setVerified(true);
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-surface-low flex flex-col items-center justify-center p-6">
        <Link to="/" className="flex items-center gap-2 mb-12">
          <LogoMark size={22} className="text-coral" />
          <span className="text-jet font-bold text-lg tracking-tight">HomLiv</span>
        </Link>

        <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center"
             style={{ boxShadow: '0 4px 24px rgba(23,27,43,0.08), 0 1px 4px rgba(23,27,43,0.04)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
               style={{ background: '#fef3e2' }}>
            <AlertTriangle size={26} style={{ color: '#9c5a00' }} />
          </div>
          <h2 className="font-bold text-xl text-jet mb-2" style={{ letterSpacing: '-0.02em' }}>
            You're almost verified
          </h2>
          <p className="text-sm text-slate-brand leading-relaxed mb-6">
            Your account is active. Your listings will show a roommate badge. Full verification usually completes within 2 hours.
          </p>
          <button
            className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 mb-3"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            onClick={() => navigate('/roommate/list-room')}
          >
            Set up my listing →
          </button>
          <button
            className="w-full py-3 text-sm font-medium text-slate-brand hover:text-jet transition-colors"
            onClick={() => {
              setVerified(false);
              navigate('/roommate/dashboard');
            }}
          >
            Do it later
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-low flex flex-col items-center justify-center p-6">
      <Link to="/" className="flex items-center gap-2 mb-12">
        <LogoMark size={22} className="text-coral" />
        <span className="text-jet font-bold text-lg tracking-tight">HomLiv</span>
      </Link>

      {/* Progress */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand">
            Step {step} of {STEPS.length}
          </span>
          <span className="text-xs text-slate-brand">{STEPS[step - 1].label}</span>
        </div>
        <div className="h-1.5 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #d47550, #b85530)' }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {STEPS.map((s) => (
            <div key={s.id} className="flex items-center gap-1.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                step > s.id
                  ? 'bg-coral text-white'
                  : step === s.id
                  ? 'bg-coral/15 text-coral border-2 border-coral'
                  : 'bg-surface-low text-slate-brand/50'
              }`}>
                {step > s.id ? <Check size={10} strokeWidth={3} /> : s.id}
              </div>
              <span className={`text-xs font-medium ${step >= s.id ? 'text-jet' : 'text-slate-brand/50'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl p-6 w-full max-w-md"
           style={{ boxShadow: '0 4px 24px rgba(23,27,43,0.08), 0 1px 4px rgba(23,27,43,0.04)' }}>

        {step === 1 && (
          <>
            <h2 className="font-bold text-lg text-jet mb-1" style={{ letterSpacing: '-0.02em' }}>
              Confirm your email address
            </h2>
            <p className="text-xs text-slate-brand mb-5">
              We use this to confirm you are a real person. Your details are never shared with tenants.
            </p>

            <div className="mb-4">
              <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                Email Address
              </label>
              <input
                type="email"
                readOnly
                value="jane.doe@example.com"
                className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-slate-brand outline-none"
              />
            </div>

            {!codeSent1 ? (
              <button
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 mb-4"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                onClick={() => setCodeSent1(true)}
              >
                Send confirmation code
              </button>
            ) : (
              <div className="mb-4">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                  6-Digit Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="••••••"
                  className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors tracking-[0.2em] text-center font-bold"
                  value={code1}
                  onChange={(e) => setCode1(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            )}

            {codeSent1 && (
              <button
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                disabled={code1.length < 6}
                onClick={handleNext}
              >
                Continue →
              </button>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-bold text-lg text-jet mb-1" style={{ letterSpacing: '-0.02em' }}>
              Verify your phone number
            </h2>
            <p className="text-xs text-slate-brand mb-5">
              We'll send a one-time code to confirm your Irish mobile number.
            </p>

            <div className="mb-4">
              <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                Phone Number
              </label>
              <div className="flex">
                <span className="flex items-center px-3 text-sm shrink-0 bg-[#f0f1f3] rounded-l-xl text-slate-brand">
                  +353
                </span>
                <input
                  type="tel"
                  placeholder="00 000 0000"
                  className="w-full bg-[#f0f1f3] rounded-r-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {!codeSent2 ? (
              <button
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 mb-4"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                onClick={() => setCodeSent2(true)}
              >
                Send SMS code
              </button>
            ) : (
              <div className="mb-4">
                <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                  6-Digit Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="••••••"
                  className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors tracking-[0.2em] text-center font-bold"
                  value={code2}
                  onChange={(e) => setCode2(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            )}

            {/* Info banner */}
            <div className="rounded-xl p-3 mb-4" style={{ background: '#e8edf4' }}>
              <p className="text-xs leading-relaxed" style={{ color: '#2c4a7c' }}>
                Your listing will show an 'Unverified roommate' badge until our team reviews it. Tenants are advised to meet in person before agreeing to anything.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 py-3 rounded-xl text-sm font-medium text-slate-brand border border-ghost/40 hover:bg-surface-low transition-colors"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              {codeSent2 && (
                <button
                  className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-40"
                  style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                  disabled={code2.length < 6}
                  onClick={handleNext}
                >
                  Verify →
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
