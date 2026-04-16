import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Search, Users, Building2, ArrowRight, Shield, Zap, Clock, Star, ChevronRight, ArrowUp } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PropertyCard } from '../components/shared/PropertyCard';
import { mockProperties } from '../../data/mockProperties';
import { useWishlist } from '../../hooks/useWishlist';

const HERO_PREVIEW_IMAGE = 'https://images.unsplash.com/photo-1657639754502-3c138cb24b4c?w=600&q=80';

const TESTIMONIALS = [
  {
    name: 'Arun Kumar',
    role: 'Software Engineer, Dublin 2',
    avatar: 'https://i.pravatar.cc/150?img=3',
    text: 'Found my room in Ranelagh within 48 hours. The landlord chat feature saved me so much back-and-forth — I had a viewing booked the same evening.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'UX Designer, Dublin 4',
    avatar: 'https://i.pravatar.cc/150?img=5',
    text: "Every listing I looked at was genuine and up to date. No more fake ads or unanswered emails. HomLiv is the only platform I'd recommend.",
    rating: 5,
  },
  {
    name: "James O'Connor",
    role: 'Medical Student, Dublin 6',
    avatar: 'https://i.pravatar.cc/150?img=8',
    text: "The rent reminders and maintenance ticket system are brilliant. My landlord responded to my heating issue within hours — that's unheard of.",
    rating: 5,
  },
];

const STATS = [
  { end: 14000, suffix: '+', label: 'Active Listings' },
  { end: 3200, suffix: '+', label: 'Verified Landlords' },
  { end: 28000, suffix: '+', label: 'Happy Tenants' },
  { end: 3, suffix: '', label: 'Cities Covered' },
];

function useCountUp(end: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);
  return count;
}

const gradientText: React.CSSProperties = {
  background: 'linear-gradient(135deg, #ef8354 0%, #d47550 60%, #c05030 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

function StatCounter({ end, suffix, label, started }: { end: number; suffix: string; label: string; started: boolean }) {
  const count = useCountUp(end, end > 10000 ? 2000 : 1400, started);
  const formatted = count >= 1000 ? count.toLocaleString('en-IE') : String(count);
  return (
    <div className="py-6 px-6 text-center">
      <p className="font-bold text-2xl text-white tracking-[-0.03em] tabular-nums">{formatted}{suffix}</p>
      <p className="text-xs mt-1 font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
    </div>
  );
}

export function HomePage() {
  const { isWishlisted, toggle } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [statsStarted, setStatsStarted] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const featuredProperties = mockProperties.slice(0, 3);
  const quickFilters = ['Dublin', 'Cork', 'Galway', 'Student friendly', 'Couples welcome', 'Bills included'];

  return (
    <div className="bg-white text-ink">
      <style>{`
        @keyframes float {
          0%, 100% { transform: rotate(3deg) translateY(0px); }
          50% { transform: rotate(3deg) translateY(-14px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: '#0a0a0f' }}>
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(ellipse, #ef8354 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full opacity-[0.04]"
            style={{ background: 'radial-gradient(ellipse, #4f5d75 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-0">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left: copy */}
            <div className="flex-1 min-w-0">
              {/* Pill tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-wide"
                style={{ background: 'rgba(239,131,84,0.12)', color: '#ef8354', border: '1px solid rgba(239,131,84,0.18)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
                Now live in Dublin, Cork &amp; Galway
              </div>

              <h1
                className="font-bold text-white mb-6"
                style={{ fontSize: 'clamp(3rem, 6.5vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
              >
                Find your room<br />
                in Ireland.{' '}
                <span style={gradientText}>Manage it<br />from day one.</span>
              </h1>

              <p className="text-base leading-relaxed mb-10 max-w-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Real listings. Real-time chat with landlords. Rent reminders and maintenance — all in one place.
              </p>

              {/* Search bar */}
              <div className="flex items-stretch max-w-[500px] rounded-2xl overflow-hidden mb-5"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                  <input
                    className="w-full h-full pl-11 pr-4 py-4 text-sm outline-none bg-transparent text-white placeholder:text-white/25"
                    placeholder="Search by area or Eircode…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => navigate('/listings')}
                  className="px-6 font-semibold text-sm text-white whitespace-nowrap transition-opacity hover:opacity-90 shrink-0 m-1.5 rounded-xl"
                  style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                >
                  Search
                </button>
              </div>

              {/* Quick filters */}
              <div className="flex flex-wrap gap-2">
                {quickFilters.map((f) => (
                  <button key={f} onClick={() => navigate('/listings')}
                    className="text-xs font-medium rounded-full px-3.5 py-1.5 transition-all"
                    style={{ border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.40)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.70)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.10)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.40)'; }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: floating preview card */}
            <div className="hidden lg:block flex-shrink-0 w-[360px] pb-0">
              <div
                className="bg-white rounded-3xl overflow-hidden animate-float"
                style={{ boxShadow: '0 60px 120px rgba(0,0,0,0.7), 0 20px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <div className="relative m-3 rounded-2xl overflow-hidden">
                  <img src={HERO_PREVIEW_IMAGE} alt="Bright Studio Ranelagh" className="w-full h-60 object-cover" />
                  <div
                    className="absolute top-3 right-3 px-3.5 py-1.5 rounded-full text-white text-sm font-bold"
                    style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                  >
                    €950/mo
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2">
                  <p className="font-bold text-base text-jet mb-0.5">Bright Studio, Ranelagh</p>
                  <p className="text-sm text-slate-brand mb-4">Dublin 6, Ireland</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-brand">
                      <span className="px-2.5 py-1 rounded-full bg-surface-low font-semibold uppercase tracking-wide">Private</span>
                      <span>1 bed</span>
                    </div>
                    <span className="text-xs text-slate-brand/60">♥ 129</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.05]">
              {STATS.map((stat) => (
                <StatCounter key={stat.label} end={stat.end} suffix={stat.suffix} label={stat.label} started={statsStarted} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED LISTINGS ─── */}
      <section className="py-24" style={{ background: '#f5f5f7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-coral mb-2">Featured</p>
              <h2 className="font-bold text-jet" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.03em' }}>
                Properties you'll love.
              </h2>
            </div>
            <button
              onClick={() => navigate('/listings')}
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-slate-brand hover:text-jet transition-colors group"
            >
              View All
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} onWishlistToggle={toggle} isWishlisted={isWishlisted(prop.id)} />
            ))}
          </div>

          <div className="flex sm:hidden justify-center mt-8">
            <button onClick={() => navigate('/listings')}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-ghost/30 text-sm font-semibold text-jet hover:bg-white transition-colors">
              View All Listings <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── APP DOWNLOAD ─── */}
      <section className="py-12" style={{ background: '#f5f5f7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl px-10 py-16 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10"
            style={{ background: 'linear-gradient(135deg, #1a1c2e 0%, #0f1018 100%)', boxShadow: '0 24px 64px rgba(0,0,0,0.30)' }}
          >
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-coral mb-4">Now on Mobile</p>
              <h2 className="font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Your home search,<br /> in your pocket.
              </h2>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.40)' }}>
                Browse, apply, pay rent and chat with landlords — all from the HomLiv app.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-5 shrink-0">
              <div className="flex flex-col sm:flex-row gap-3">
                {[
                  { label: 'Download on the', name: 'App Store', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> },
                  { label: 'Get it on', name: 'Google Play', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M3.18 23.76c.3.17.64.24.99.2l12.6-7.27-2.83-2.83-10.76 9.9zM.5 1.4C.19 1.75 0 2.28 0 2.96v18.08c0 .68.19 1.21.5 1.56l.08.08 10.13-10.13v-.23L.58 1.32.5 1.4zM20.1 10.65l-2.87-1.66-3.18 3.18 3.18 3.18 2.9-1.67c.83-.48.83-1.26-.03-1.73zM4.17.24l12.6 7.27-2.83 2.83L3.18.44c.3-.38.69-.42.99-.2z"/></svg> },
                ].map((btn) => (
                  <a key={btn.name} href="#"
                    className="flex items-center gap-3 pl-4 pr-6 py-3.5 rounded-2xl transition-opacity hover:opacity-80"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}>
                    {btn.icon}
                    <div>
                      <p className="text-[10px] leading-none mb-0.5" style={{ color: 'rgba(255,255,255,0.40)' }}>{btn.label}</p>
                      <p className="text-white font-bold text-sm leading-none">{btn.name}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-6 text-center">
                {[{ score: '4.8★', label: 'App Store' }, { score: '4.7★', label: 'Play Store' }, { score: '50k+', label: 'Downloads' }].map((s, i) => (
                  <div key={s.label} className="flex items-center gap-6">
                    {i > 0 && <div className="w-px h-5 bg-white/10" />}
                    <div>
                      <p className="text-white font-bold text-sm">{s.score}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.30)' }}>{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY HOMLIV ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-jet mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.03em' }}>
              Built for how Ireland rents.
            </h2>
            <p className="text-base text-slate-brand max-w-lg mx-auto leading-relaxed">
              Every feature designed around the real challenges of finding and managing a home in Ireland.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              { icon: Shield, title: 'Verified Listings Only', desc: 'Every property is inspected and verified before it goes live on our platform.' },
              { icon: Zap,    title: 'Instant Landlord Chat', desc: 'Message landlords in real-time. No waiting days for a callback.' },
              { icon: Clock,  title: 'End-to-End Management', desc: 'From viewing to lease signing to rent reminders — one seamless flow.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center gap-4 rounded-2xl p-8 transition-all duration-300 cursor-default group"
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(23,27,43,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-surface-low transition-colors duration-300 group-hover:bg-coral/10">
                  <Icon size={22} className="text-coral transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <p className="font-bold text-base text-jet mb-2">{title}</p>
                  <p className="text-sm leading-relaxed text-slate-brand">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24" style={{ background: '#f5f5f7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-jet mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.03em' }}>
              Loved by tenants across Ireland.
            </h2>
            <p className="text-base text-slate-brand">Real people. Real stories.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 cursor-default group"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: '2px solid transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)';
                  e.currentTarget.style.borderTop = '2px solid #ef8354';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                  e.currentTarget.style.borderTop = '2px solid transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="text-coral fill-coral" />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-ink flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent transition-all duration-300 group-hover:ring-coral/30" />
                  <div>
                    <p className="text-sm font-bold text-jet">{t.name}</p>
                    <p className="text-xs text-slate-brand">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-jet mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.03em' }}>
              Simple from start to finish.
            </h2>
            <p className="text-base text-slate-brand max-w-md mx-auto leading-relaxed">
              Whether you're finding a home or managing a portfolio, HomLiv gives you everything in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tenants */}
            <div className="rounded-3xl p-10 bg-white transition-all duration-300"
              style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.07)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 16px 48px rgba(23,27,43,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 24px rgba(0,0,0,0.07)'; e.currentTarget.style.transform = ''; }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #f09060 0%, #c85a28 100%)' }}>
                  <Users size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-xl text-jet" style={{ letterSpacing: '-0.02em' }}>For Tenants</h3>
              </div>
              <div className="flex flex-col gap-8">
                {[
                  { n: '01', title: 'Curated Search', desc: 'Browse pre-vetted listings that meet high comfort and safety standards.' },
                  { n: '02', title: 'Smart Viewings', desc: 'Schedule virtual or in-person tours directly through our integrated calendar.' },
                  { n: '03', title: 'Seamless Onboarding', desc: 'Complete your application and digital lease signing in minutes, not days.' },
                ].map((step) => (
                  <div key={step.n} className="flex gap-5">
                    <span className="text-sm font-bold text-coral shrink-0 w-8 pt-0.5 tabular-nums">{step.n}</span>
                    <div>
                      <p className="font-semibold text-base text-jet mb-1">{step.title}</p>
                      <p className="text-sm leading-relaxed text-slate-brand">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Landlords */}
            <div
              className="rounded-3xl p-10 relative overflow-hidden transition-all duration-300"
              style={{ background: 'linear-gradient(145deg, #1a1c2e 0%, #0f1018 100%)', boxShadow: '0 8px 40px rgba(0,0,0,0.22)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.22)'; e.currentTarget.style.transform = ''; }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(239,131,84,0.08) 0%, transparent 70%)' }} />
              <div className="relative">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-coral/15">
                    <Building2 size={20} className="text-coral" />
                  </div>
                  <h3 className="font-bold text-xl text-white" style={{ letterSpacing: '-0.02em' }}>For Landlords</h3>
                </div>
                <div className="flex flex-col gap-8">
                  {[
                    { n: '01', title: 'Premium Listing', desc: 'We showcase your property with professional photography and detailed descriptions.' },
                    { n: '02', title: 'Vetting & Compliance', desc: 'Advanced background checks and automated compliance monitoring for peace of mind.' },
                    { n: '03', title: 'Financial Suite', desc: 'Instant rent collection, automated tax reports, and maintenance budget tracking.' },
                  ].map((step) => (
                    <div key={step.n} className="flex gap-5">
                      <span className="text-sm font-bold text-coral shrink-0 w-8 pt-0.5 tabular-nums">{step.n}</span>
                      <div>
                        <p className="font-semibold text-base text-white mb-1">{step.title}</p>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24" style={{ background: '#f5f5f7' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold text-jet mb-5" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
            Start your Dublin journey.
          </h2>
          <p className="text-base text-slate-brand mb-10 max-w-md mx-auto leading-relaxed">
            Join 5,000+ residents who found their perfect home through HomLiv.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              className="flex-1 px-5 py-3.5 rounded-full text-sm font-medium outline-none text-jet placeholder:text-slate-brand/50 bg-white"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}
              placeholder="Your email address"
            />
            <button
              className="px-7 py-3.5 rounded-full font-semibold text-sm text-white whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            >
              Join Now
            </button>
          </div>
          <p className="text-xs text-slate-brand/50 mt-5">No credit card required. Free to sign up.</p>
        </div>
      </section>

      <Footer />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300"
        style={{
          background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)',
          boxShadow: '0 4px 20px rgba(180,80,40,0.45)',
          opacity: showTopBtn ? 1 : 0,
          transform: showTopBtn ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
          pointerEvents: showTopBtn ? 'auto' : 'none',
        }}
        aria-label="Back to top"
      >
        <ArrowUp size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
