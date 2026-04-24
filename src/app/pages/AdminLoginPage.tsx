import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Shield, BadgeCheck, BarChart2 } from 'lucide-react';
import { LogoMark } from '../components/shared/LogoMark';
import { useAdminStore } from '../../hooks/useAdminStore';

const ADMIN_EMAIL = 'admin@homliv.com';
const ADMIN_PASSWORD = '4104';

const BG_IMAGE = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAdminStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      login();
      navigate('/admin/dashboard', { viewTransition: true });
    } else {
      setError('Invalid admin credentials');
    }
  }

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
              Platform control.<br />
              Full visibility.<br />
              One dashboard.
            </h1>

            <div className="flex flex-col gap-5">
              {[
                {
                  icon: <Shield size={18} className="text-coral" />,
                  title: 'Platform oversight',
                  desc: 'Monitor all users, listings, and activity across HomLiv in real time.',
                },
                {
                  icon: <BadgeCheck size={18} className="text-coral" />,
                  title: 'Verification control',
                  desc: 'Approve or reject landlord and roommate verification requests.',
                },
                {
                  icon: <BarChart2 size={18} className="text-coral" />,
                  title: 'Reports & analytics',
                  desc: 'Review flagged content, resolve disputes, and track platform health.',
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
            <p className="text-xs font-bold tracking-[0.05em] uppercase text-white">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="bg-white flex flex-col justify-center items-center p-8 lg:p-12 lg:flex-1">
        <div className="w-full max-w-md">
          <h2
            className="font-bold text-[1.75rem] tracking-[-0.02em] text-jet mb-1"
          >
            Admin Sign In
          </h2>
          <p className="text-slate-brand text-sm mb-8">
            Restricted access — HomLiv administrators only.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@homliv.com"
                required
                className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
              />
            </div>

            <div className="mb-6">
              <label className="text-xs font-bold tracking-[0.06em] uppercase block mb-1.5 text-slate-brand">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-ghost/40 rounded-lg text-sm text-jet outline-none focus:border-coral transition-colors bg-white"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
              />
            </div>

            {error && (
              <p className="text-sm font-medium text-red-500 mb-4 px-1">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm hover:opacity-90 active:scale-[0.97] transition-all"
              style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            >
              Sign In to Admin →
            </button>

            <p className="text-xs text-slate-brand/60 text-center mt-8">© 2026 HomLiv. All rights reserved.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
