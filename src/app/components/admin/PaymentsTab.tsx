import { useState } from 'react';
import { CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';
import { mockTenants } from '../../../data/mockProperties';

const PAYMENT_DATA = [
  { tenantId: 't1', amount: 950,  dueDate: '2026-05-01', status: 'active'  as const },
  { tenantId: 't2', amount: 1100, dueDate: '2026-05-05', status: 'active'  as const },
  { tenantId: 't3', amount: 750,  dueDate: '2026-04-28', status: 'overdue' as const },
];

type PaymentStatus = 'paid' | 'pending' | 'overdue';

const STATUS_PILL: Record<PaymentStatus, string> = {
  paid:    'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700',
  overdue: 'bg-red-50 text-red-600',
};

export function PaymentsTab() {
  const [payStatuses, setPayStatuses] = useState<Record<string, PaymentStatus>>({
    't1': 'pending',
    't2': 'pending',
    't3': 'overdue',
  });

  const collected = PAYMENT_DATA.filter(p => payStatuses[p.tenantId] === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pending   = PAYMENT_DATA.filter(p => payStatuses[p.tenantId] === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const overdue   = PAYMENT_DATA.filter(p => payStatuses[p.tenantId] === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  const [hovered, setHovered] = useState<number | null>(null);

  const STATS = [
    { label: 'Collected', value: `€${collected.toLocaleString('en-IE')}`, icon: <CheckCircle2 size={14} className="text-white/80" />, style: { background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)' }, hover: '0 16px 48px rgba(180,80,40,0.45)', ib: 'bg-white/15', lc: 'text-white/70', vc: 'text-white', sc: 'text-white/60' },
    { label: 'Pending',   value: `€${pending.toLocaleString('en-IE')}`,   icon: <CreditCard size={14} className="text-white/80" />,   style: { background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)', boxShadow: '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)' }, hover: '0 16px 48px rgba(61,77,99,0.40)', ib: 'bg-white/10', lc: 'text-white/50', vc: 'text-white', sc: 'text-white/50' },
    { label: 'Overdue',   value: `€${overdue.toLocaleString('en-IE')}`,   icon: <AlertCircle size={14} className="text-slate-brand" />, style: { background: '#ffffff', boxShadow: '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)' }, hover: '0 16px 48px rgba(23,27,43,0.12)', ib: 'bg-[#f0f1f3]', lc: 'text-slate-brand', vc: 'text-jet', sc: 'text-slate-brand' },
  ];

  function markPaid(tenantId: string) {
    setPayStatuses(prev => ({ ...prev, [tenantId]: 'paid' }));
  }

  function markChased(tenantId: string) {
    setPayStatuses(prev => ({ ...prev, [tenantId]: 'pending' }));
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-[1.35rem] text-jet" style={{ letterSpacing: '-0.02em' }}>Payments</h2>
        <p className="text-xs text-slate-brand mt-0.5">Platform-wide rent tracker</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="rounded-xl p-4 flex flex-col gap-1.5 cursor-default"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              ...s.style,
              boxShadow: hovered === i ? s.hover : s.style.boxShadow,
              transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'transform 200ms ease, box-shadow 200ms ease',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.ib}`}>{s.icon}</div>
              <span className={`text-[0.68rem] font-bold uppercase tracking-[0.06em] ${s.lc}`}>{s.label}</span>
            </div>
            <p className={`font-bold text-2xl ${s.vc}`} style={{ letterSpacing: '-0.03em' }}>{s.value}</p>
            <p className={`text-xs ${s.sc}`}>this month</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="flex items-center justify-between px-5 py-4 bg-[#f5f5f7] rounded-t-xl">
          <h3 className="font-bold text-sm text-jet" style={{ letterSpacing: '-0.01em' }}>Rent Tracker</h3>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.05em] text-slate-brand">{mockTenants.length} tenants</span>
        </div>

        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col style={{ width: '22%' }} />
            <col style={{ width: '24%' }} />
            <col style={{ width: '13%' }} />
            <col style={{ width: '13%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '16%' }} />
          </colgroup>
          <thead>
            <tr>
              {(['Tenant', 'Property', 'Amount', 'Due Date', 'Status', 'Actions'] as const).map(h => (
                <th key={h} className="px-5 py-3 text-left text-[0.68rem] font-bold uppercase tracking-[0.06em] text-slate-brand bg-[#f5f5f7]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockTenants.map((t, i) => {
              const payment = PAYMENT_DATA.find(p => p.tenantId === t.id);
              if (!payment) return null;
              const status = payStatuses[t.id];
              return (
                <tr key={t.id} className={i < mockTenants.length - 1 ? 'border-b border-[#dcc1b7]/15' : ''}>
                  <td className="px-5 py-4 align-middle">
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                      <p className="text-sm font-semibold text-jet truncate" style={{ letterSpacing: '-0.01em' }}>{t.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <p className="text-sm text-jet truncate">{t.property}</p>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <p className="text-sm font-semibold text-coral">€{payment.amount}/mo</p>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <p className={`text-sm font-medium ${status === 'overdue' ? 'text-red-500 font-bold' : 'text-slate-brand'}`}>
                      {new Date(payment.dueDate).toLocaleDateString('en-IE', { day: '2-digit', month: 'short' })}
                    </p>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[0.7rem] font-bold capitalize ${STATUS_PILL[status]}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    {status !== 'paid' ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => markPaid(t.id)}
                          className="text-[0.65rem] font-bold px-2.5 py-1.5 rounded-md text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                          style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                        >
                          Mark Paid
                        </button>
                        {status === 'overdue' && (
                          <button
                            onClick={() => markChased(t.id)}
                            className="text-[0.65rem] font-bold px-2.5 py-1.5 rounded-md bg-[#f0f1f3] text-slate-brand hover:bg-[#e8e9ec] transition-colors whitespace-nowrap"
                          >
                            Chase
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-brand/40 font-medium">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
