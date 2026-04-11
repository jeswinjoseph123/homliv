import { ChevronRight } from 'lucide-react';

const SETTINGS_ITEMS = ['Notification Preferences', 'Payment Methods', 'Security', 'Privacy'];

export function SettingsTab() {
  return (
    <>
      <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Settings</h2>
      <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="flex items-center gap-4 mb-6">
          <img src="https://i.pravatar.cc/150?img=55" alt="Marcus" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <p className="font-bold text-base text-jet">Marcus O'Brien</p>
            <p className="text-sm text-slate-brand">marcus@docklandspm.ie</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block bg-coral/10 text-coral">
              Premium Landlord
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {SETTINGS_ITEMS.map((item) => (
            <div key={item} className="flex items-center justify-between py-3 border-b border-ghost/15">
              <span className="text-sm font-medium text-jet">{item}</span>
              <ChevronRight size={16} className="text-slate-brand" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
