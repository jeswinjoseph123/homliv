import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Bell } from 'lucide-react';
import { LogoMark } from '../shared/LogoMark';

interface NavbarUser {
  name: string;
  avatar: string;
}

interface NavbarProps {
  onSidebarToggle?: () => void;
  user?: NavbarUser;
}

export function Navbar({ onSidebarToggle, user }: NavbarProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const handleMobileToggle = () => {
    if (onSidebarToggle) {
      onSidebarToggle();
    } else {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/[0.07] shrink-0" style={{ background: 'rgba(18,20,31,0.90)', boxShadow: '0 4px 24px rgba(18,20,31,0.50), 0 1px 4px rgba(18,20,31,0.30)' }}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Right side: user info (dashboard) or auth links (public) */}
          {user ? (
            <div className="flex items-center gap-3">
              <button className="relative w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                <Bell size={15} className="text-white" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-coral" />
              </button>
              <div className="flex items-center gap-2">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="hidden sm:block text-sm font-medium text-white/90">{user.name}</span>
              </div>
            </div>
          ) : (
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
          )}

          <button
            className="md:hidden text-white p-2"
            onClick={handleMobileToggle}
          >
            {(!onSidebarToggle && mobileOpen) ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {(!onSidebarToggle && mobileOpen) && (
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
