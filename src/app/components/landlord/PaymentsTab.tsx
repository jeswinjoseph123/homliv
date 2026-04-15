import { StatusBadge } from '../shared/StatusBadge';
import { mockTenants } from '../../../data/mockProperties';

const PAYMENT_STATS = [
  { label: 'Collected This Month', value: '€2,700', cls: 'text-jet' },
  { label: 'Pending',              value: '€750',   cls: 'text-coral' },
  { label: 'Overdue',              value: '€950',   cls: 'text-coral' },
];

export function PaymentsTab() {
  return (
    <>
      <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Payments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {PAYMENT_STATS.map((item) => (
          <div key={item.label} className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
            <p className={`font-bold text-2xl ${item.cls}`}>{item.value}</p>
            <p className="text-xs mt-1 text-slate-brand">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <h3 className="font-bold text-base mb-4 text-jet">Payment History</h3>
        {mockTenants.map((t) => (
          <div key={t.id} className="flex items-center justify-between py-3 border-b border-ghost/15">
            <div className="flex items-center gap-2.5">
              <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-jet">{t.name}</p>
                <p className="text-xs text-slate-brand">{t.property}</p>
              </div>
            </div>
            <StatusBadge status={t.status === 'overdue' ? 'Overdue' : 'Active'} />
          </div>
        ))}
      </div>
    </>
  );
}
