import {
  LayoutDashboard, Heart, MessageSquare, FileText, Wrench,
  CreditCard, Settings, LogOut,
} from 'lucide-react';
import { type Tab } from './types';

const NAV_ITEMS: { id: Tab; icon: React.ReactNode; label: string }[] = [
  { id: 'overview',    icon: <LayoutDashboard size={17} />, label: 'Overview'    },
  { id: 'wishlist',    icon: <Heart size={17} />,           label: 'Wishlist'    },
  { id: 'chats',       icon: <MessageSquare size={17} />,   label: 'Chats'       },
  { id: 'tenancy',     icon: <FileText size={17} />,        label: 'Tenancy'     },
  { id: 'maintenance', icon: <Wrench size={17} />,          label: 'Maintenance' },
  { id: 'payments',    icon: <CreditCard size={17} />,      label: 'Payments'    },
  { id: 'settings',    icon: <Settings size={17} />,        label: 'Settings'    },
];

interface TenantSidebarProps {
  activeTab: Tab;
  onNav: (id: Tab) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function TenantSidebar({ activeTab, onNav, isOpen, onClose }: TenantSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:relative inset-y-16 lg:inset-y-0 left-0 z-40 flex flex-col w-[210px] h-[calc(100vh-4rem)] lg:h-full bg-slate-brand shrink-0 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ boxShadow: '6px 0 40px rgba(23,27,43,0.55), 2px 0 8px rgba(23,27,43,0.25)' }}
      >
        {/* Section label */}
        <div className="h-10 flex items-center px-4 shrink-0">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.07em] text-white/40">Tenant Suite</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2 flex flex-col gap-1">
          {NAV_ITEMS.map((item) =>
            activeTab === item.id ? (
              <button
                key={item.id}
                className="flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-white font-semibold text-sm"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)', boxShadow: '0 4px 12px rgba(180,80,40,0.35)' }}
                onClick={() => onNav(item.id)}
              >
                {item.icon}
                {item.label}
              </button>
            ) : (
              <button
                key={item.id}
                className="flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.07] text-sm font-medium transition-colors"
                onClick={() => onNav(item.id)}
              >
                {item.icon}
                {item.label}
                {item.id === 'chats' && (
                  <span className="ml-auto w-4 h-4 rounded-full bg-coral text-white text-[0.6rem] font-bold flex items-center justify-center">3</span>
                )}
              </button>
            )
          )}
        </nav>

        {/* Log Out */}
        <div className="px-4 pb-4 shrink-0">
          <button className="w-full flex items-center gap-2 px-4 py-2 text-white/40 hover:text-white/70 text-sm transition-colors">
            <LogOut size={14} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
