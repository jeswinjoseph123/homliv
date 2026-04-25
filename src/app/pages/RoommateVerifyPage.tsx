import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Check, Lock, Shield, Mail, Phone, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../components/layout/Navbar';
import { RoommateSidebar } from '../components/roommate/RoommateSidebar';
import { useRoommateStore } from '../../hooks/useRoommateStore';
import { type Tab } from '../components/roommate/types';

function navBack(navigate: ReturnType<typeof useNavigate>, to: string) {
  document.documentElement.dataset.navBack = '';
  navigate(to, { viewTransition: true });
  setTimeout(() => delete document.documentElement.dataset.navBack, 500);
}

const TRUST_IMAGE = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80';

const STEPS = [
  { id: 1, label: 'Email', sublabel: 'Confirm your address', icon: <Mail size={12} /> },
  { id: 2, label: 'Phone', sublabel: 'Verify mobile number', icon: <Phone size={12} /> },
];

const BENEFITS = [
  'Roommate Badge on your listing',
  'Priority in search results',
  'Direct tenant messaging',
];

export function RoommateVerifyPage() {
  const navigate = useNavigate();
  const { isVerified, setVerified } = useRoommateStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);
  const stepDir = useRef<'forward' | 'back'>('forward');

  // Step 1 state
  const [codeSent1, setCodeSent1] = useState(false);
  const [code1, setCode1] = useState('');

  // Step 2 state
  const [phone, setPhone] = useState('');
  const [codeSent2, setCodeSent2] = useState(false);
  const [code2, setCode2] = useState('');

  const progress = Math.round((step / STEPS.length) * 100);

  function goNext() {
    if (step === 1 && code1.length === 6) {
      stepDir.current = 'forward';
      setStep(2);
    } else if (step === 2 && code2.length === 6) {
      setVerified(true);
      toast.success("You're verified — your listing is now live.");
      navigate('/roommate/list-room', { viewTransition: true });
    }
  }

  function goBack() {
    stepDir.current = 'back';
    setStep((s) => s - 1);
  }

  function handleDoLater() {
    if (!isVerified) setVerified(false);
    navBack(navigate, '/roommate/dashboard');
  }

  const canContinue = step === 1 ? code1.length === 6 : code2.length === 6;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface-low">
      <Navbar
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{ name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=32' }}
      />

      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Col 1 — roommate nav sidebar */}
        <RoommateSidebar
          activeTab={'settings' as Tab}
          onNav={() => navBack(navigate, '/roommate/dashboard')}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          hasActiveListing={false}
        />

        {/* Cols 2-4 — verify content (slides as one unit) */}
        <div className="flex flex-1 overflow-hidden min-h-0" style={{ viewTransitionName: 'main-content' }}>

          {/* Col 2 — steps list */}
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
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                      done    ? 'bg-coral text-white'
                      : active ? 'bg-coral/15 text-coral border-2 border-coral'
                      : 'bg-white/60 text-slate-brand/50'
                    }`}>
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
                  Verify your identity
                </h1>
                <p className="text-sm text-slate-brand mb-5">
                  A quick 2-step check so tenants know you're a real person sharing a room.
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

                {/* Form card */}
                <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(23,27,43,0.08),_0_1px_4px_rgba(23,27,43,0.04)]">
                  <div
                    key={step}
                    className="p-6 pb-2"
                    style={{ animation: `420ms cubic-bezier(0.25,1,0.5,1) ${stepDir.current === 'forward' ? 'step-from-right' : 'step-from-left'} both` }}
                  >

                    {step === 1 && (
                      <>
                        <h2 className="font-bold text-base text-jet mb-1" style={{ letterSpacing: '-0.01em' }}>
                          Confirm your email address
                        </h2>
                        <p className="text-xs text-slate-brand mb-5 leading-relaxed">
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
                            type="button"
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
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setCode1(val);
                              }}
                            />
                            <p className="text-[0.68rem] text-slate-brand mt-1.5">
                              Didn't receive it?{' '}
                              <button type="button" className="text-coral font-semibold hover:underline" onClick={() => toast.success('Code resent to your email')}>
                                Resend code
                              </button>
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <h2 className="font-bold text-base text-jet mb-1" style={{ letterSpacing: '-0.01em' }}>
                          Verify your phone number
                        </h2>
                        <p className="text-xs text-slate-brand mb-5 leading-relaxed">
                          We'll send a one-time code to confirm your Irish mobile number.
                        </p>

                        <div className="mb-4">
                          <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                            Phone Number
                          </label>
                          <div className="flex">
                            <span className="flex items-center px-3 text-sm shrink-0 bg-[#f0f1f3] rounded-l-xl text-slate-brand border-r border-[#dcc1b7]/20">
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
                            type="button"
                            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 mb-4 disabled:opacity-40"
                            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                            disabled={phone.replace(/\s/g, '').length < 8}
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
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setCode2(val);
                              }}
                            />
                            <p className="text-[0.68rem] text-slate-brand mt-1.5">
                              Didn't receive it?{' '}
                              <button type="button" className="text-coral font-semibold hover:underline" onClick={() => toast.success('SMS resent to your phone')}>
                                Resend SMS
                              </button>
                            </p>
                          </div>
                        )}

                        <div className="rounded-xl p-3 mb-4" style={{ background: '#e8edf4' }}>
                          <p className="text-xs leading-relaxed" style={{ color: '#2c4a7c' }}>
                            Your listing will show a <strong>Roommate badge</strong>. Tenants are advised to meet in person before agreeing to anything.
                          </p>
                        </div>
                      </>
                    )}

                  </div>

                  {/* Footer buttons */}
                  <div className="px-6 pb-4 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(220,193,183,0.15)' }}>
                    <button
                      className="px-5 py-2.5 text-sm font-medium text-slate-brand hover:text-jet transition-colors disabled:opacity-40"
                      onClick={goBack}
                      disabled={step === 1}
                    >
                      ← Back
                    </button>
                    <button
                      className="px-7 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-40"
                      style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                      disabled={!canContinue}
                      onClick={goNext}
                    >
                      {step < 2 ? 'Next step →' : 'Complete Verification'}
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
              <img src={TRUST_IMAGE} alt="Modern room" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-jet/90 via-jet/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <p className="text-white font-bold text-sm leading-tight" style={{ letterSpacing: '-0.01em' }}>
                  Real people. Real rooms.
                </p>
                <p className="text-white/70 text-[0.7rem] mt-1 leading-relaxed">
                  Join 4,000+ verified roommates on HomLiv.
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
                <Users size={12} className="text-coral shrink-0 mt-0.5" />
                <p className="text-[0.65rem] text-slate-brand leading-relaxed">
                  <strong className="text-jet">Verified roommates</strong> get{' '}
                  <strong className="text-coral">2× more</strong> enquiries than unverified listings.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Lock size={12} className="text-slate-brand/50 shrink-0 mt-0.5" />
                <p className="text-[0.65rem] text-slate-brand/60 leading-relaxed">
                  Encrypted &amp; Secure. GDPR compliant.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Shield size={12} className="text-slate-brand/50 shrink-0 mt-0.5" />
                <p className="text-[0.65rem] text-slate-brand/60 leading-relaxed">
                  Takes less than 2 minutes to complete.
                </p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
