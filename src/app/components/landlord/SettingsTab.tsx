import { ChevronRight, FlaskConical } from 'lucide-react';
import { useVerificationStore } from '../../../hooks/useVerificationStore';

const SETTINGS_ITEMS = ['Notification Preferences', 'Payment Methods', 'Security', 'Privacy'];

export function SettingsTab() {
  const { isVerified, setVerified } = useVerificationStore();

  return (
    <>
      <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Settings</h2>
      <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="flex items-center gap-4 mb-6">
          <img src="https://i.pravatar.cc/150?img=55" alt="Marcus" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <p className="font-bold text-base text-jet">Marcus O'Brien</p>
            <p className="text-sm text-slate-brand">marcus@docklandspm.ie</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block bg-surface-low text-slate-brand">
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

      {/* Dev testing card */}
      <div className="mt-5 rounded-xl p-4 border border-dashed border-ghost/40 bg-surface-low">
        <div className="flex items-center gap-2 mb-3">
          <FlaskConical size={14} className="text-slate-brand/60" />
          <p className="text-xs font-bold tracking-[0.06em] uppercase text-slate-brand/60">Dev Tools</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-jet">Verification status</p>
            <p className="text-xs text-slate-brand mt-0.5">
              Currently:{' '}
              <span className={isVerified ? 'text-green-600 font-semibold' : 'text-amber-500 font-semibold'}>
                {isVerified ? 'Verified' : 'Unverified'}
              </span>
            </p>
          </div>
          <button
            onClick={() => setVerified(!isVerified)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-ghost/40 text-slate-brand hover:bg-white transition-colors"
          >
            {isVerified ? 'Reset to Unverified' : 'Set as Verified'}
          </button>
        </div>
      </div>
    </>
  );
}
