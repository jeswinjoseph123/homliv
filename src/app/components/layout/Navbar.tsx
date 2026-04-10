import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { LogoMark } from '../shared/LogoMark';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/[0.07]" style={{ background: 'rgba(18,20,31,0.90)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <LogoMark size={22} className="text-coral" />
              <span className="text-white font-bold text-lg tracking-tight">HomLiv</span>
            </Link>
            <div className="hidden md:flex items-center">
              <Link
                to="/listings"
                className={`text-sm font-medium transition-colors pb-0.5 border-b-2 ${
                  isActive('/listings')
                    ? 'text-coral border-coral'
                    : 'text-white/75 border-transparent hover:text-white'
                }`}
              >
                Listings
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors px-3 py-2"
            >
              Login
            </Link>
            <Link
              to="/landlord"
              className="text-sm font-semibold rounded-lg px-4 py-2 border border-coral text-coral hover:bg-coral hover:text-white transition-colors"
            >
              Landlord
            </Link>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.07]" style={{ background: 'rgba(30,33,50,0.85)' }}>
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link
              to="/listings"
              onClick={() => setMobileOpen(false)}
              className="text-white/80 font-medium text-sm hover:text-white"
            >
              Listings
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="text-white/80 font-medium text-sm hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/landlord"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold rounded-lg px-4 py-2 w-fit border border-coral text-coral"
            >
              Landlord
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
