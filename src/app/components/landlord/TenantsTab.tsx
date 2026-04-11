import { MessageSquare } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';
import { mockTenants } from '../../../data/mockProperties';

export function TenantsTab() {
  return (
    <>
      <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Tenants</h2>
      <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ghost/20">
                {['Tenant', 'Property', 'Rent Due', 'Status', 'Tickets', 'Action'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-[0.06em] text-slate-brand">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTenants.map((t) => (
                <tr key={t.id} className={`border-b border-ghost/10 ${t.status === 'overdue' ? 'bg-red-50' : ''}`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-sm font-medium text-jet">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-brand">{t.property}</td>
                  <td className="px-5 py-3.5 text-sm text-jet">{t.rentDue}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={t.status === 'overdue' ? 'Overdue' : 'Active'} />
                  </td>
                  <td className={`px-5 py-3.5 text-sm text-center ${t.tickets > 0 ? 'text-coral' : 'text-slate-brand'}`}>
                    {t.tickets}
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-xs font-semibold flex items-center gap-1 text-coral">
                      <MessageSquare size={12} /> Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
