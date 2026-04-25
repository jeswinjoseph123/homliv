import { Wrench, AlertTriangle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { StatusBadge } from '../shared/StatusBadge';
import { mockTickets } from '../../../data/mockProperties';

const PRIORITY_STYLE: Record<string, { pill: string; dot: string }> = {
  High:   { pill: 'bg-red-50 text-red-600',    dot: 'bg-red-500'   },
  Medium: { pill: 'bg-amber-50 text-amber-700', dot: 'bg-amber-400' },
  Low:    { pill: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
};

export function MaintenanceTab() {
  const open       = mockTickets.filter(t => t.status === 'Open').length;
  const inProgress = mockTickets.filter(t => t.status === 'In Progress').length;
  const resolved   = mockTickets.filter(t => t.status === 'Resolved').length;

  const [card0Hovered, setCard0Hovered] = useState(false);
  const [card1Hovered, setCard1Hovered] = useState(false);
  const [card2Hovered, setCard2Hovered] = useState(false);

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div>
        <h2 className="font-bold text-[1.35rem] text-jet" style={{ letterSpacing: '-0.02em' }}>Maintenance</h2>
        <p className="text-xs text-slate-brand mt-0.5">Track and resolve tenant maintenance requests</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="rounded-xl p-4 flex flex-col gap-1.5"
          onMouseEnter={() => setCard0Hovered(true)}
          onMouseLeave={() => setCard0Hovered(false)}
          style={{
            background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)',
            boxShadow: card0Hovered ? '0 16px 48px rgba(180,80,40,0.45)' : '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)',
            transform: card0Hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/15">
              <AlertTriangle size={13} className="text-white" />
            </div>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.06em] text-white/70">Open</span>
          </div>
          <p className="font-bold text-3xl text-white" style={{ letterSpacing: '-0.03em' }}>{open}</p>
          <p className="text-xs text-white/60">requires action</p>
        </div>

        <div
          className="rounded-xl p-4 flex flex-col gap-1.5"
          onMouseEnter={() => setCard1Hovered(true)}
          onMouseLeave={() => setCard1Hovered(false)}
          style={{
            background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)',
            boxShadow: card1Hovered ? '0 16px 48px rgba(61,77,99,0.40)' : '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)',
            transform: card1Hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10">
              <Clock size={13} className="text-white/80" />
            </div>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.06em] text-white/50">In Progress</span>
          </div>
          <p className="font-bold text-3xl text-white" style={{ letterSpacing: '-0.03em' }}>{inProgress}</p>
          <p className="text-xs text-white/50">being handled</p>
        </div>

        <div
          className="bg-white rounded-xl p-4 flex flex-col gap-1.5"
          onMouseEnter={() => setCard2Hovered(true)}
          onMouseLeave={() => setCard2Hovered(false)}
          style={{
            boxShadow: card2Hovered ? '0 16px 48px rgba(23,27,43,0.12)' : '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)',
            transform: card2Hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-50">
              <CheckCircle2 size={13} className="text-emerald-600" />
            </div>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.06em] text-slate-brand">Resolved</span>
          </div>
          <p className="font-bold text-3xl text-jet" style={{ letterSpacing: '-0.03em' }}>{resolved}</p>
          <p className="text-xs text-slate-brand">completed</p>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="flex items-center justify-between px-5 py-4 bg-[#f5f5f7] rounded-t-xl">
          <div className="flex items-center gap-2">
            <Wrench size={14} className="text-slate-brand" />
            <h3 className="font-bold text-sm text-jet" style={{ letterSpacing: '-0.01em' }}>All Tickets</h3>
          </div>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.05em] text-slate-brand">{mockTickets.length} total</span>
        </div>

        <div className="overflow-auto rounded-b-xl max-h-[480px]">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col style={{ width: '9%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '19%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '11%' }} />
          </colgroup>
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#f5f5f7]">
              {(['ID', 'Tenant', 'Property', 'Issue', 'Priority', 'Status', 'Action'] as const).map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[0.68rem] font-bold uppercase tracking-[0.06em] text-slate-brand">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockTickets.map((ticket, i) => {
              const pStyle = PRIORITY_STYLE[ticket.priority] ?? PRIORITY_STYLE.Low;
              return (
                <tr
                  key={ticket.id}
                  className={`animate-fade-up ${i < mockTickets.length - 1 ? 'border-b border-[#dcc1b7]/15' : ''}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <td className="px-4 py-4 align-middle">
                    <span className="inline-block text-[0.68rem] font-bold font-mono px-2 py-0.5 rounded-md bg-[#f0f1f3] text-slate-brand">
                      {ticket.id}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <p className="text-sm font-medium text-jet truncate">{ticket.tenantName}</p>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <p className="text-xs text-slate-brand truncate">{ticket.property}</p>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${pStyle.dot}`} />
                      <p className="text-sm text-jet truncate">{ticket.issue}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${pStyle.pill}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <StatusBadge status={ticket.status as 'Open' | 'In Progress' | 'Resolved'} />
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <button onClick={() => toast.info(`Ticket ${ticket.id}: ${ticket.issue}`)} className="inline-flex items-center gap-1 text-xs font-semibold text-white px-3 py-1.5 rounded-lg transition-opacity hover:opacity-90 active:scale-[0.97] transition-transform whitespace-nowrap" style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}>
                      View <ArrowRight size={10} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>

    </div>
  );
}
