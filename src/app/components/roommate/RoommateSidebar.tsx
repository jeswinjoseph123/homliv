import { LayoutDashboard, Home, MessageSquare, Settings } from 'lucide-react';
import { type ReactNode } from 'react';
import { type Tab } from './types';

const NAV_ITEMS: { id: Tab; icon: ReactNode; label: string }[] = [
  { id: 'overview',  icon: <LayoutDashboard size={18} />, label: 'Overview' },
  { id: 'listings',  icon: <Home size={18} />,            label: 'My Listings' },
  { id: 'messages',  icon: <MessageSquare size={18} />,   label: 'Messages' },
  { id: 'settings',  icon: <Settings size={18} />,        label: 'Settings' },
];

interface RoommateSidebarProps {
  activeTab: Tab;
  onNav: (id: Tab) => void;
  isOpen: boolean;
  onClose: () => void;
  hasActiveListing: boolean;
}

export function RoommateSidebar({ activeTab, onNav, isOpen, onClose, hasActiveListing }: RoommateSidebarProps) {
  return (
    <>
      <aside
        className={`shrink-0 flex-col ${isOpen ? 'flex' : 'hidden'} lg:flex fixed lg:relative inset-y-16 lg:inset-y-0 left-0 z-40 w-[210px] bg-slate-brand h-[calc(100vh-4rem)] lg:h-full`}
        style={{ boxShadow: '6px 0 40px rgba(23,27,43,0.55), 2px 0 8px rgba(23,27,43,0.25)' }}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3 shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white">JD</span>
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">Jane Doe</p>
              <p className="text-white/50 text-[0.65rem]">Roommate Account</p>
            </div>
          </div>
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.6rem] font-bold uppercase tracking-[0.05em]"
            style={{ background: hasActiveListing ? '#fef3e2' : 'rgba(255,255,255,0.1)', color: hasActiveListing ? '#9c5a00' : 'rgba(255,255,255,0.5)' }}
          >
            {hasActiveListing ? 'Listing active' : 'No active listing'}
          </span>
        </div>

        <div className="flex flex-col gap-1 px-0 py-2 flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
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
      </aside>

      {isOpen && (
        <div className="fixed inset-0 bg-ink/50 z-30 lg:hidden" onClick={onClose} />
      )}
    </>
  );
}
