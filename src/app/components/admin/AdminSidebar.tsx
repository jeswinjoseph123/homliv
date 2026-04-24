import { LayoutDashboard, Building2, Users, Flag, BadgeCheck, CreditCard, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAdminStore } from '../../../hooks/useAdminStore';
import { type AdminTab } from './types';

const NAV_ITEMS: { id: AdminTab; icon: React.ReactNode; label: string }[] = [
  { id: 'overview',      icon: <LayoutDashboard size={18} />, label: 'Overview' },
  { id: 'users',         icon: <Users size={18} />,           label: 'Users' },
  { id: 'listings',      icon: <Building2 size={18} />,       label: 'Listings' },
  { id: 'reports',       icon: <Flag size={18} />,            label: 'Reports' },
  { id: 'verifications', icon: <BadgeCheck size={18} />,      label: 'Verifications' },
  { id: 'payments',      icon: <CreditCard size={18} />,      label: 'Payments' },
  { id: 'settings',      icon: <Settings size={18} />,        label: 'Settings' },
];

interface AdminSidebarProps {
  activeTab: AdminTab;
  onNav: (id: AdminTab) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ activeTab, onNav, isOpen, onClose }: AdminSidebarProps) {
  const navigate = useNavigate();
  const { logout } = useAdminStore();

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <>
      <aside
        className={`shrink-0 flex-col ${isOpen ? 'flex' : 'hidden'} lg:flex fixed lg:relative inset-y-16 lg:inset-y-0 left-0 z-40 w-[210px] bg-slate-brand h-[calc(100vh-4rem)] lg:h-full`}
        style={{ boxShadow: '6px 0 40px rgba(23,27,43,0.55), 2px 0 8px rgba(23,27,43,0.25)' }}
      >
        <div className="h-10 flex items-center px-4 shrink-0">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.07em] text-white/40">Admin Portal</span>
        </div>

        <div className="flex flex-col gap-1 px-0 py-2 flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={
                activeTab === item.id
                  ? 'flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-white font-semibold cursor-pointer w-[calc(100%-1rem)] text-left text-sm'
                  : 'flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.07] transition-colors cursor-pointer w-[calc(100%-1rem)] text-left text-sm'
              }
              style={activeTab === item.id ? { background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)', boxShadow: '0 4px 12px rgba(180,80,40,0.35)' } : {}}
              onClick={() => { onNav(item.id); onClose(); }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="px-0 py-3 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.07] transition-colors cursor-pointer w-[calc(100%-1rem)] text-left text-sm"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-ink/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
