import { StatusBadge } from '../shared/StatusBadge';
import { mockTickets } from '../../../data/mockProperties';
import { PRIORITY_CLASSES } from './types';

export function MaintenanceTab() {
  return (
    <>
      <h2 className="font-bold text-xl mb-5 text-jet" style={{ letterSpacing: '-0.01em' }}>Maintenance Tickets</h2>
      <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ghost/20">
                {['ID', 'Tenant', 'Property', 'Issue', 'Priority', 'Status', 'Date', 'Action'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-[0.06em] text-slate-brand">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-ghost/10">
                  <td className="px-4 py-3.5 text-xs font-mono text-slate-brand">{ticket.id}</td>
                  <td className="px-4 py-3.5 text-sm text-jet">{ticket.tenantName}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-brand">{ticket.property}</td>
                  <td className="px-4 py-3.5 text-sm text-jet">{ticket.issue}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-bold ${PRIORITY_CLASSES[ticket.priority]}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-brand">{ticket.date}</td>
                  <td className="px-4 py-3.5">
                    <button className="text-xs font-semibold text-coral">View →</button>
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
