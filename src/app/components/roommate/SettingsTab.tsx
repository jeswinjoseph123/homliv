import { ChevronRight, FlaskConical } from 'lucide-react';
import { useRoommateStore } from '@/hooks/useRoommateStore';

const SETTINGS_ITEMS = ['Notification Preferences', 'Security', 'Privacy'];

export function SettingsTab() {
  const { isVerified, setVerified } = useRoommateStore();

  return (
    <>
      <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Settings</h2>

      <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)] mb-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-surface-low flex items-center justify-center">
            <span className="font-bold text-xl text-slate-brand">JD</span>
          </div>
          <div>
            <p className="font-bold text-base text-jet">Jane Doe</p>
            <p className="text-sm text-slate-brand">jane.doe@example.com</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
                  style={{ background: '#fef3e2', color: '#9c5a00' }}>
              Roommate Account
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {SETTINGS_ITEMS.map((item) => (
            <div key={item} className="flex items-center justify-between py-3 hover:bg-surface-low rounded-lg px-2 transition-colors">
              <span className="text-sm font-medium text-jet">{item}</span>
              <ChevronRight size={16} className="text-slate-brand" />
            </div>
          ))}
        </div>
      </div>

      {/* Dev Tools */}
      <div className="rounded-xl p-4 border border-dashed border-ghost/40 bg-surface-low">
        <div className="flex items-center gap-2 mb-3">
          <FlaskConical size={14} className="text-slate-brand/60" />
          <p className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand/60">Dev Tools</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-jet">Verification status</p>
            <p className="text-xs text-slate-brand mt-0.5">
              {isVerified ? 'Verified' : 'Unverified'}
            </p>
          </div>
          <button
            type="button"
            className="text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            onClick={() => setVerified(!isVerified)}
          >
            Toggle
          </button>
        </div>
      </div>
    </>
  );
}
