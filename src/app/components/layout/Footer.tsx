import { Globe, AtSign, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { LogoMark } from '../shared/LogoMark';

export function Footer() {
  return (
    <footer className="bg-jet" style={{ boxShadow: '0 -8px 32px rgba(23,27,43,0.12)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LogoMark size={20} className="text-coral" />
              <span className="text-white font-bold text-base tracking-tight">HomLiv</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Redefining urban living through curated properties and intelligent management.
            </p>
            <div className="flex gap-3 mt-5">
              <button onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.08] hover:bg-white/15 transition-colors">
                <Globe size={14} className="text-white/60" />
              </button>
              <button onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.08] hover:bg-white/15 transition-colors">
                <AtSign size={14} className="text-white/60" />
              </button>
            </div>
          </div>

          <div>
            <p className="text-white text-xs font-bold tracking-[0.08em] uppercase mb-4">Platform</p>
            <div className="flex flex-col gap-3">
              {['Listings', 'How it works', 'Pricing', 'Case Studies'].map((item) => (
                <Link key={item} to={item === 'Listings' ? '/listings' : '#'} className="text-white/60 text-sm hover:text-white/90 transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white text-xs font-bold tracking-[0.08em] uppercase mb-4">Resources</p>
            <div className="flex flex-col gap-3">
              {['Dublin Guide', 'Tenant Rights', 'Property Management', 'Help Center'].map((item) => (
                <Link key={item} to="/" className="text-white/60 text-sm hover:text-white/90 transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white text-xs font-bold tracking-[0.08em] uppercase mb-4">Contact</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Phone size={13} />
                <span>+353 1 234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Mail size={13} />
                <span>hello@homliv.ie</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin size={13} />
                <span>St. Stephen's Green, Dublin 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">© 2026 HomLiv. All rights reserved.</p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
              <Link key={item} to="/" className="text-white/40 text-xs hover:text-white/70 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
