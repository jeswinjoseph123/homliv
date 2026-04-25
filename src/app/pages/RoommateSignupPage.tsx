import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Home, MessageSquare, UserCheck } from 'lucide-react';
import { toast } from 'sonner';
import { LogoMark } from '../components/shared/LogoMark';
import { useRoommateStore } from '../../hooks/useRoommateStore';

const BG_IMAGE = 'https://images.unsplash.com/photo-1529408686214-b48b8532f72c?w=1200&q=80';

export function RoommateSignupPage() {
  const navigate = useNavigate();
  const { setRoommate } = useRoommateStore();
  const [activeTab, setActiveTab] = useState<'signin' | 'create'>('signin');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel */}
      <div
        className="relative flex flex-col justify-between p-8 lg:p-12 bg-jet"
        style={{ flex: '0 0 50%', minHeight: '40vh' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${BG_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18,
          }}
        />
        <div className="relative z-10 flex flex-col h-full justify-between">
          <Link to="/" className="flex items-center gap-2">
            <LogoMark size={26} className="text-coral" />
            <span className="text-white font-bold text-xl tracking-tight">HomLiv</span>
          </Link>

          <div className="my-10 lg:my-auto">
            <h1
              className="text-white font-bold leading-tight mb-8"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}
            >
              List your spare room.<br />
              Find your next housemate.
            </h1>

            <div className="flex flex-col gap-5">
              {[
                {
                  icon: <Home size={18} className="text-coral" />,
                  title: 'No ownership required',
                  desc: 'You just need to be a current tenant with a spare room to fill.',
                },
                {
                  icon: <UserCheck size={18} className="text-coral" />,
                  title: 'Verified housemate network',
                  desc: 'Connect with verified tenants looking for shared living.',
                },
                {
                  icon: <MessageSquare size={18} className="text-coral" />,
                  title: 'Direct messaging with enquirers',
                  desc: 'Chat directly with potential housemates without leaving the platform.',
                },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-brand flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{feature.title}</p>
                    <p className="text-sm mt-0.5 text-white/60">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-coral" />
            <p className="text-xs font-bold tracking-[0.05em] uppercase text-white">Roommate Portal</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="bg-white flex flex-col justify-center items-center p-8 lg:p-12 lg:flex-1">
        <div className="w-full max-w-md animate-fade-up">
          <h2 className="font-bold text-[1.75rem] tracking-[-0.02em] text-jet mb-1">
            {activeTab === 'signin' ? 'Welcome back' : 'Create Account'}
          </h2>
          <p className="text-slate-brand text-sm mb-6">
            {activeTab === 'signin'
              ? 'Sign in to manage your room listing.'
              : 'Start listing your spare room today.'}
          </p>

          {/* Tab switcher */}
          <div className="flex gap-1 mb-7 p-1 rounded-xl bg-surface-low">
            {(['signin', 'create'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`flex-1 py-2.5 text-xs font-bold tracking-[0.06em] uppercase rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-white text-jet shadow-[0_1px_8px_rgba(23,27,43,0.08)]'
                    : 'text-slate-brand hover:text-jet'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (activeTab === 'create') {
                setRoommate(true);
                navigate('/roommate/verify', { viewTransition: true });
              } else {
                navigate('/roommate/dashboard', { viewTransition: true });
              }
            }}
          >
            {activeTab === 'signin' && (
              <>
                <div className="mb-4">
                  <label htmlFor="signin-email" className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                    Email Address
                  </label>
                  <input
                    id="signin-email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="signin-password" className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand">
                      Password
                    </label>
                    <button type="button" onClick={() => toast.info('Password reset coming soon')} className="text-xs font-bold tracking-[0.05em] uppercase text-coral hover:text-coral-dark transition-colors">
                      Forgot?
                    </button>
                  </div>
                  <input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                    value={form.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                </div>
              </>
            )}

            {activeTab === 'create' && (
              <>
                <div className="mb-4">
                  <label htmlFor="signup-name" className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                    Full Name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                    value={form.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label htmlFor="signup-email" className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                      Email
                    </label>
                    <input
                      id="signup-email"
                      type="email"
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="signup-phone" className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                      Phone
                    </label>
                    <div className="flex">
                      <span className="flex items-center px-3 text-sm shrink-0 border border-ghost/40 border-r-0 rounded-l-lg text-slate-brand bg-surface">
                        +353
                      </span>
                      <input
                        id="signup-phone"
                        type="tel"
                        placeholder="00 000 0000"
                        className="w-full px-4 py-3 border border-ghost/40 rounded-r-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="signup-password" className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                    value={form.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="signup-confirm-password" className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                    Confirm Password
                  </label>
                  <input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                    value={form.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 active:scale-[0.97] transition-transform"
              style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            >
              {activeTab === 'signin' ? 'Sign In →' : 'Create Roommate Account →'}
            </button>

            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-ghost/30" />
              <span className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand">or</span>
              <div className="flex-1 h-px bg-ghost/30" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button type="button" className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border border-ghost/40 text-jet hover:bg-surface-low transition-colors active:scale-[0.97] transition-transform">
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.32-8.16 2.32-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border border-ghost/40 text-jet hover:bg-surface-low transition-colors active:scale-[0.97] transition-transform">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#171b2b">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple
              </button>
            </div>

            {/* Prominent landlord CTA */}
            <div className="rounded-xl p-4 mb-4" style={{ background: '#fef3e2' }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#fde8c8' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9c5a00" strokeWidth="2">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: '#9c5a00' }}>Are you a property owner?</p>
                  <p className="text-xs mt-0.5" style={{ color: '#b87a20' }}>List and manage your properties with the full landlord suite.</p>
                </div>
              </div>
              <Link
                to="/landlord"
                className="mt-3 w-full flex items-center justify-center py-2.5 rounded-lg text-xs font-bold tracking-[0.05em] uppercase text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
              >
                Landlord Portal →
              </Link>
            </div>

            <p className="text-xs text-slate-brand/60 text-center">© 2026 HomLiv. Privacy & Terms.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
