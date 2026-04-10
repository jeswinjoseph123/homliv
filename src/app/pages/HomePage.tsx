import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Users, Building2, ArrowRight, Shield, Zap, Clock, Star, Quote } from 'lucide-react';
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
    text: 'Every listing I looked at was genuine and up to date. No more fake ads or unanswered emails. HomLiv is the only platform I\'d recommend.',
    rating: 5,
  },
  {
    name: 'James O\'Connor',
    role: 'Medical Student, Dublin 6',
    avatar: 'https://i.pravatar.cc/150?img=8',
    text: 'The rent reminders and maintenance ticket system are brilliant. My landlord responded to my heating issue within hours — that\'s unheard of.',
    rating: 5,
  },
];

const STATS = [
  { value: '14,000+', label: 'Active Listings' },
  { value: '3,200+', label: 'Verified Landlords' },
  { value: '28,000+', label: 'Happy Tenants' },
  { value: '3', label: 'Cities Covered' },
];

export function HomePage() {
  const { isWishlisted, toggle } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const featuredProperties = mockProperties.slice(0, 3);
  const quickFilters = ['Dublin', 'Cork', 'Galway', 'Limerick', 'Student friendly', 'Couples welcome'];

  return (
    <div className="bg-surface text-ink" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: rotate(3deg) translateY(0px); }
          50% { transform: rotate(3deg) translateY(-14px); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-marquee { animation: marquee 28s linear infinite; }
      `}</style>
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: '#12141f' }}>
        {/* Ambient glow orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #ef8354 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #4f5d75 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Left: copy */}
            <div className="flex-1 min-w-0">
              <h1
                className="font-bold leading-[1.08] tracking-[-0.02em] text-white mb-5"
                style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4rem)' }}
              >
                Find your room in Ireland.{' '}
                <span className="text-coral">
                  Manage it{' '}
                  <br className="hidden sm:block" />
                  from day one.
                </span>
              </h1>

              <p className="text-sm leading-relaxed text-white/55 mb-8 max-w-sm">
                Real listings. Real-time chat with landlords. Rent reminders and maintenance — all in one app.
              </p>

              {/* Search bar */}
              <div className="flex items-stretch gap-0 max-w-[520px] rounded-xl overflow-hidden border border-white/[0.12] bg-white/[0.07] mb-5">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    className="w-full h-full pl-10 pr-4 py-3.5 text-sm font-medium outline-none bg-transparent text-white placeholder:text-white/30"
                    placeholder="Dublin, Ireland"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => navigate('/listings')}
                  className="px-6 py-3.5 font-semibold text-sm text-white whitespace-nowrap transition-opacity hover:opacity-90 shrink-0"
                  style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                >
                  Search Rooms
                </button>
              </div>

              {/* Quick filters */}
              <div className="flex flex-wrap gap-2">
                {quickFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => navigate('/listings')}
                    className="text-xs font-medium rounded-full px-3.5 py-1.5 border border-white/[0.14] text-white/55 hover:border-white/30 hover:text-white/80 transition-all"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: preview card */}
            <div className="hidden lg:block flex-shrink-0 w-[380px]">
              <div
                className="bg-white rounded-3xl overflow-hidden animate-float"
                style={{
                  boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.22)',
                }}
              >
                {/* Image */}
                <div className="relative m-4 rounded-2xl overflow-hidden">
                  <img
                    src={HERO_PREVIEW_IMAGE}
                    alt="Bright Studio Ranelagh"
                    className="w-full h-64 object-cover"
                  />
                  <div
                    className="absolute top-3 right-3 px-3.5 py-1.5 rounded-full text-white text-sm font-bold"
                    style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                  >
                    €950/mo
                  </div>
                </div>
                {/* Card body */}
                <div className="px-5 pb-6 pt-2">
                  <p className="font-bold text-base text-jet mb-1">Bright Studio, Ranelagh</p>
                  <p className="text-sm text-slate-brand mb-5">📍 Dublin 6, Ireland</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-slate-brand">
                      <span className="flex items-center gap-1">🛏 1</span>
                      <span className="px-3 py-1 rounded-full bg-surface-low font-semibold text-slate-brand text-xs uppercase tracking-wide">
                        Private
                      </span>
                    </div>
                    <span className="text-sm text-slate-brand/60">♥ 129</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Stats strip — inside hero at the bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
              {STATS.map((stat) => (
                <div key={stat.label} className="py-5 px-6 text-center">
                  <p className="font-bold text-white text-xl tracking-[-0.02em]">{stat.value}</p>
                  <p className="text-white/40 text-xs mt-0.5 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED LISTINGS ─── */}
      <section className="bg-surface-low pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-px bg-coral" />
                <p className="text-xs font-bold tracking-[0.1em] uppercase text-coral">
                  Premium Selection
                </p>
              </div>
              <h2 className="font-bold tracking-[-0.02em] text-[1.75rem] text-jet">
                Featured Listings
              </h2>
            </div>
            <button
              onClick={() => navigate('/listings')}
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-slate-brand hover:text-coral transition-colors group"
            >
              View All
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onWishlistToggle={toggle}
                isWishlisted={isWishlisted(prop.id)}
              />
            ))}
          </div>

          <div className="flex sm:hidden justify-center mt-8">
            <button
              onClick={() => navigate('/listings')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-ghost/30 text-sm font-semibold text-jet hover:bg-white transition-colors"
            >
              View All Listings <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── APP DOWNLOAD ─── */}
      <section className="bg-surface-low py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl px-8 py-12 md:px-14 flex flex-col md:flex-row items-center justify-between gap-10"
            style={{ background: 'linear-gradient(135deg, #2d3142 0%, #1e2235 100%)' }}
          >
            <div className="text-center md:text-left">
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-coral mb-3">Now on Mobile</p>
              <h2
                className="font-bold text-white leading-tight tracking-[-0.02em] mb-3"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}
              >
                Your home search,<br className="hidden sm:block" /> in your pocket.
              </h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                Browse, apply, pay rent and chat with landlords — all from the HomLiv app.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-5 shrink-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#" className="flex items-center gap-3 pl-4 pr-6 py-3 rounded-2xl transition-opacity hover:opacity-80" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <div>
                    <p className="text-white/45 text-[10px] leading-none mb-0.5">Download on the</p>
                    <p className="text-white font-bold text-sm leading-none">App Store</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 pl-4 pr-6 py-3 rounded-2xl transition-opacity hover:opacity-80" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M3.18 23.76c.3.17.64.24.99.2l12.6-7.27-2.83-2.83-10.76 9.9zM.5 1.4C.19 1.75 0 2.28 0 2.96v18.08c0 .68.19 1.21.5 1.56l.08.08 10.13-10.13v-.23L.58 1.32.5 1.4zM20.1 10.65l-2.87-1.66-3.18 3.18 3.18 3.18 2.9-1.67c.83-.48.83-1.26-.03-1.73zM4.17.24l12.6 7.27-2.83 2.83L3.18.44c.3-.38.69-.42.99-.2z"/></svg>
                  <div>
                    <p className="text-white/45 text-[10px] leading-none mb-0.5">Get it on</p>
                    <p className="text-white font-bold text-sm leading-none">Google Play</p>
                  </div>
                </a>
              </div>
              <div className="flex items-center gap-5 text-center">
                {[{ score: '4.8★', label: 'App Store' }, { score: '4.7★', label: 'Google Play' }, { score: '50k+', label: 'Downloads' }].map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-5">
                    {i > 0 && <div className="w-px h-6 bg-white/10" />}
                    <div>
                      <p className="text-white font-bold text-sm leading-none">{stat.score}</p>
                      <p className="text-white/35 text-[10px] mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY HOMLIV STRIP ─── */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Listings Only',
                desc: 'Every property is inspected and verified before it goes live on our platform.',
              },
              {
                icon: Zap,
                title: 'Instant Landlord Chat',
                desc: 'Message landlords in real-time. No waiting days for a callback.',
              },
              {
                icon: Clock,
                title: 'End-to-End Management',
                desc: 'From viewing to lease signing to rent reminders — one seamless flow.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-coral/10">
                  <Icon size={18} className="text-coral" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-jet mb-1">{title}</p>
                  <p className="text-sm leading-relaxed text-slate-brand">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="bg-surface-low py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-6 h-px bg-coral" />
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-coral">Real Stories</p>
              <div className="w-6 h-px bg-coral" />
            </div>
            <h2 className="font-bold tracking-[-0.02em] text-[1.75rem] text-jet">Loved by tenants across Ireland</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 flex flex-col gap-4 transition-shadow hover:shadow-[0_4px_40px_rgba(23,27,43,0.08)]"
              >
                <Quote size={20} className="text-coral/40" />
                <p className="text-sm leading-relaxed text-slate-brand flex-1">"{t.text}"</p>
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} className="text-coral fill-coral" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-jet">{t.name}</p>
                    <p className="text-xs text-slate-brand">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-20" style={{ background: '#f2f2f4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-6 h-px bg-coral" />
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-coral">Simple Process</p>
              <div className="w-6 h-px bg-coral" />
            </div>
            <h2 className="font-bold tracking-[-0.02em] mb-3 text-[1.75rem] text-jet">How it Works</h2>
            <p className="text-sm max-w-md mx-auto leading-relaxed text-slate-brand">
              Whether you are looking for your next home or managing a portfolio,
              HomLiv provides the tools for a seamless experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* For Tenants */}
            <div
              className="rounded-2xl p-8 bg-white"
              style={{ boxShadow: '0 4px 32px rgba(23,27,43,0.10)' }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #f09060 0%, #c85a28 100%)' }}
                >
                  <Users size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-lg text-jet">For Tenants</h3>
              </div>
              <div className="flex flex-col gap-7">
                {[
                  { n: '01', title: 'Curated Search', desc: 'Browse pre-vetted listings that meet high architectural and comfort standards.' },
                  { n: '02', title: 'Smart Viewings', desc: 'Schedule virtual or in-person tours directly through our integrated calendar system.' },
                  { n: '03', title: 'Seamless Onboarding', desc: 'Complete your application and digital lease signing in minutes, not days.' },
                ].map((step) => (
                  <div key={step.n} className="flex gap-4">
                    <span className="text-sm font-bold text-coral shrink-0 w-7 pt-0.5">{step.n}</span>
                    <div>
                      <p className="font-semibold text-sm text-jet mb-1">{step.title}</p>
                      <p className="text-sm leading-relaxed text-slate-brand">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Landlords */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #2d3142 0%, #232637 100%)', boxShadow: '0 4px 32px rgba(23,27,43,0.18)' }}
            >
              {/* Subtle glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(239,131,84,0.12) 0%, transparent 70%)',
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-coral/15 shrink-0">
                    <Building2 size={20} className="text-coral" />
                  </div>
                  <h3 className="font-bold text-lg text-white">For Landlords</h3>
                </div>
                <div className="flex flex-col gap-7">
                  {[
                    { n: '01', title: 'Premium Listing', desc: 'We showcase your property with professional photography and high-end descriptions.' },
                    { n: '02', title: 'Vetting & Compliance', desc: 'Advanced background checks and automated compliance monitoring for peace of mind.' },
                    { n: '03', title: 'Financial Suite', desc: 'Instant rent collection, automated tax reports, and maintenance budget tracking.' },
                  ].map((step) => (
                    <div key={step.n} className="flex gap-4">
                      <span className="text-sm font-bold text-coral shrink-0 w-7 pt-0.5">{step.n}</span>
                      <div>
                        <p className="font-semibold text-sm text-white mb-1">{step.title}</p>
                        <p className="text-sm leading-relaxed text-white/50">{step.desc}</p>
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
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(160deg, #d07050 0%, #be5830 60%, #a84420 100%)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 8px 40px rgba(190,88,48,0.3)',
          }}
        >
          <div className="px-8 py-14 text-center">
            <h2
              className="font-bold mb-3 leading-tight text-white tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
            >
              Start your Dublin journey.
            </h2>
            <p className="text-sm mb-8 text-white/70 max-w-sm mx-auto leading-relaxed">
              Join 5,000+ residents who found their perfect curated home through HomLiv.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                className="flex-1 px-5 py-3.5 rounded-xl text-sm font-medium outline-none text-jet placeholder:text-slate-brand/50 bg-white"
                placeholder="Your email address"
              />
              <button
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white whitespace-nowrap transition-all hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, rgba(45,49,66,0.95) 0%, rgba(35,38,55,1) 100%)',
                }}
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
