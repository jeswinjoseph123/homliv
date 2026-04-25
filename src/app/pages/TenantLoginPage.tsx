import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Search, Heart, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { LogoMark } from '../components/shared/LogoMark';
import { useSessionStore } from '../../hooks/useSessionStore';

const BG_IMAGE = 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80';

export function TenantLoginPage() {
  const [activeTab, setActiveTab] = useState<'signin' | 'create'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { setRole } = useSessionStore();

  const handleSubmit = () => { setRole('tenant'); navigate('/tenant-dashboard'); };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── Left panel ── */}
      <div
        className="relative flex flex-col justify-between p-8 lg:p-12 bg-jet"
        style={{ flex: '0 0 50%', minHeight: '40vh' }}
      >
        {/* Subtle background image */}
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
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <LogoMark size={26} className="text-coral" />
            <span className="text-white font-bold text-xl tracking-tight">HomLiv</span>
          </Link>

          {/* Main copy */}
          <div className="my-10 lg:my-auto">
            <h1
              className="text-white font-bold leading-tight mb-8"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}
            >
              Find your room.<br />
              Manage your home.<br />
              All in one place.
            </h1>

            <div className="flex flex-col gap-5">
              {[
                {
                  icon: <Search size={18} className="text-coral" />,
                  title: 'Curated verified listings',
                  desc: 'Browse pre-vetted rooms across Dublin, Cork and Galway.',
                },
                {
                  icon: <MessageCircle size={18} className="text-coral" />,
                  title: 'Real-time landlord chat',
                  desc: 'Message landlords directly and schedule viewings instantly.',
                },
                {
                  icon: <Heart size={18} className="text-coral" />,
                  title: 'Wishlist & rent reminders',
                  desc: 'Save favourites and never miss a payment deadline.',
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

          {/* Bottom badge */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-coral" />
            <p className="text-xs font-bold tracking-[0.05em] uppercase text-white">Tenant Portal</p>
          </div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="bg-white flex flex-col justify-center items-center p-8 lg:p-12 lg:flex-1">
        <div className="w-full max-w-md animate-fade-up">

          <h2 className="font-bold text-[1.75rem] tracking-[-0.02em] text-jet mb-1">
            {activeTab === 'signin' ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-slate-brand text-sm mb-6">
            {activeTab === 'signin'
              ? 'Sign in to manage your tenancy.'
              : 'Join HomLiv and find your space.'}
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

          <div className="flex flex-col gap-5">
            {activeTab === 'create' && (
              <div>
                <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full border border-ghost/40 rounded-lg px-4 py-3 text-sm text-jet outline-none focus:border-coral transition-colors bg-white placeholder:text-slate-brand/40"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-ghost/40 rounded-lg px-4 py-3 text-sm text-jet outline-none focus:border-coral transition-colors bg-white placeholder:text-slate-brand/40"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand">
                  Password
                </label>
                {activeTab === 'signin' ? (
                  <button type="button" onClick={() => toast.info('Password reset coming soon')} className="text-xs font-bold tracking-[0.05em] uppercase text-coral hover:text-coral-dark transition-colors">
                    Forgot?
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-slate-brand hover:text-jet transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                )}
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full border border-ghost/40 rounded-lg px-4 py-3 text-sm text-jet outline-none focus:border-coral transition-colors bg-white placeholder:text-slate-brand/40"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 active:scale-[0.97] transition-transform mt-1"
              style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
              onClick={handleSubmit}
            >
              {activeTab === 'signin' ? 'Sign In →' : 'Create Account →'}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-ghost/30" />
              <span className="text-xs font-bold tracking-[0.05em] uppercase text-slate-brand">or</span>
              <div className="flex-1 h-px bg-ghost/30" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => toast.info('OAuth available after launch')} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-ghost/40 text-jet text-sm font-medium hover:bg-surface-low transition-colors active:scale-[0.97] transition-transform">
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.32-8.16 2.32-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Google
              </button>
              <button type="button" onClick={() => toast.info('OAuth available after launch')} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-ghost/40 text-jet text-sm font-medium hover:bg-surface-low transition-colors active:scale-[0.97] transition-transform">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#171b2b">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple
              </button>
            </div>

            <p className="text-xs text-slate-brand/60 text-center mt-2">
              © 2026 HomLiv. Privacy & Terms.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
