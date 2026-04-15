import { Plus, CheckCircle, AlertTriangle, Wrench, MessageSquare } from 'lucide-react';
import { StatusBadge } from '@/app/components/shared/StatusBadge';
import { type LocalTicket, CATEGORY_STYLE, PRIORITY_STYLE } from './types';

interface MaintenanceTabProps {
  tickets: LocalTicket[];
  onRaiseTicket: () => void;
}

export function MaintenanceTab({ tickets, onRaiseTicket }: MaintenanceTabProps) {
  return (
    <div className="p-4 sm:p-6 flex flex-col gap-5 max-w-[1100px] mx-auto w-full">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-bold tracking-[-0.02em] text-[1.6rem] text-jet">Maintenance</h1>
          <p className="text-sm text-slate-brand mt-0.5">Track and manage all your repair requests.</p>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 shrink-0"
          style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
          onClick={onRaiseTicket}
        >
          <Plus size={14} /> Raise Ticket
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        <div className="bg-white rounded-xl p-4 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-surface-low flex items-center justify-center">
              <AlertTriangle size={15} className="text-coral" />
            </div>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.06em] text-slate-brand">Open</span>
          </div>
          <div>
            <p className="font-bold text-2xl text-jet tracking-[-0.02em]">
              {tickets.filter((t) => t.status === 'Open').length}
            </p>
            <p className="text-sm text-slate-brand mt-0.5">Open tickets</p>
          </div>
        </div>

        <div className="rounded-xl p-4 flex flex-col gap-3"
             style={{ background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)' }}>
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Wrench size={15} className="text-white" />
            </div>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.06em] text-white/70">Active</span>
          </div>
          <div>
            <p className="font-bold text-2xl text-white tracking-[-0.02em]">
              {tickets.filter((t) => t.status === 'In Progress').length}
            </p>
            <p className="text-sm text-white/70 mt-0.5">In progress</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-surface-low flex items-center justify-center">
              <CheckCircle size={15} className="text-slate-brand" />
            </div>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.06em] text-slate-brand">Done</span>
          </div>
          <div>
            <p className="font-bold text-2xl text-jet tracking-[-0.02em]">
              {tickets.filter((t) => t.status === 'Resolved').length}
            </p>
            <p className="text-sm text-slate-brand mt-0.5">Resolved tickets</p>
          </div>
        </div>

      </div>

      {/* Ticket cards */}
      <div className="flex flex-col gap-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]"
          >
            <div className="flex gap-0">
              <div
                className="w-1 shrink-0 rounded-l-2xl"
                style={{
                  background: ticket.priority === 'High' ? '#ef4444'
                    : ticket.priority === 'Medium' ? '#f59e0b'
                    : '#22c55e'
                }}
              />
              <div className="flex flex-1 gap-4 p-5">
                {ticket.image && (
                  <div className="shrink-0 w-20 h-16 rounded-xl overflow-hidden">
                    <img src={ticket.image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.07em] text-slate-brand mb-0.5">
                        #{ticket.id.replace('tk', '').padStart(4, '0')} · {ticket.date}
                      </p>
                      <p className="font-bold text-sm text-jet">{ticket.title}</p>
                    </div>
                    <StatusBadge status={ticket.status} />
                  </div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className={`text-[0.62rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-[0.04em] ${CATEGORY_STYLE[ticket.category] ?? 'bg-surface-low text-slate-brand'}`}>
                      {ticket.category}
                    </span>
                    <span className={`text-[0.62rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-[0.04em] ${PRIORITY_STYLE[ticket.priority] ?? ''}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-brand leading-relaxed line-clamp-2">{ticket.description}</p>
                  {ticket.response && (
                    <div className="mt-3 flex items-start gap-2.5 rounded-xl px-3 py-2.5 bg-surface-low">
                      <img
                        src="https://i.pravatar.cc/150?img=47"
                        alt="Landlord"
                        className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                      />
                      <div className="min-w-0">
                        <p className="text-[0.62rem] font-bold text-jet mb-0.5">Michael O'Connor</p>
                        <p className="text-xs text-slate-brand leading-relaxed line-clamp-2">{ticket.response}</p>
                      </div>
                    </div>
                  )}
                  {!ticket.response && (
                    <div className="mt-3 flex items-center gap-2">
                      <MessageSquare size={11} className="text-slate-brand/50" />
                      <p className="text-xs text-slate-brand/50 italic">Awaiting landlord response</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
