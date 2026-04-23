import { MessageSquare, Users, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { StatusBadge } from '../shared/StatusBadge';
import { mockTenants } from '../../../data/mockProperties';
import { type Tab } from './types';

interface TenantsTabProps {
  onNav: (tab: Tab) => void;
}

export function TenantsTab({ onNav }: TenantsTabProps) {
  const total   = mockTenants.length;
  const active  = mockTenants.filter(t => t.status === 'active').length;
  const overdue = mockTenants.filter(t => t.status === 'overdue').length;

  const [card0Hovered, setCard0Hovered] = useState(false);
  const [card1Hovered, setCard1Hovered] = useState(false);
  const [card2Hovered, setCard2Hovered] = useState(false);

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div>
        <h2 className="font-bold text-[1.35rem] text-jet" style={{ letterSpacing: '-0.02em' }}>Tenants</h2>
        <p className="text-xs text-slate-brand mt-0.5">Manage your active tenancies and communications</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div
          className="bg-white rounded-xl p-4 flex flex-col gap-1.5"
          onMouseEnter={() => setCard0Hovered(true)}
          onMouseLeave={() => setCard0Hovered(false)}
          style={{
            boxShadow: card0Hovered ? '0 16px 48px rgba(23,27,43,0.12)' : '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)',
            transform: card0Hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#f0f1f3]">
              <Users size={14} className="text-slate-brand" />
            </div>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.06em] text-slate-brand">Total</span>
          </div>
          <p className="font-bold text-3xl text-jet" style={{ letterSpacing: '-0.03em' }}>{total}</p>
          <p className="text-xs text-slate-brand">tenants</p>
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
              <CheckCircle2 size={14} className="text-white/80" />
            </div>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.06em] text-white/50">Active</span>
          </div>
          <p className="font-bold text-3xl text-white" style={{ letterSpacing: '-0.03em' }}>{active}</p>
          <p className="text-xs text-white/50">on time</p>
        </div>

        <div
          className="rounded-xl p-4 flex flex-col gap-1.5"
          onMouseEnter={() => setCard2Hovered(true)}
          onMouseLeave={() => setCard2Hovered(false)}
          style={{
            background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)',
            boxShadow: card2Hovered ? '0 16px 48px rgba(180,80,40,0.45)' : '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)',
            transform: card2Hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/15">
              <AlertCircle size={14} className="text-white" />
            </div>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.06em] text-white/70">Overdue</span>
          </div>
          <p className="font-bold text-3xl text-white" style={{ letterSpacing: '-0.03em' }}>{overdue}</p>
          <p className="text-xs text-white/60">needs action</p>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="flex items-center justify-between px-5 py-4 bg-[#f5f5f7] rounded-t-xl">
          <h3 className="font-bold text-sm text-jet" style={{ letterSpacing: '-0.01em' }}>All Tenants</h3>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.05em] text-slate-brand">{total} total</span>
        </div>

        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col style={{ width: '24%' }} />
            <col style={{ width: '26%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '14%' }} />
          </colgroup>
          <thead>
            <tr className="bg-[#f5f5f7]">
              {(['Tenant', 'Property', 'Rent Due', 'Status', 'Tickets', 'Action'] as const).map((h, i) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-[0.68rem] font-bold uppercase tracking-[0.06em] text-slate-brand"
                  style={{
                    borderRadius: i === 0 ? '0 0 0 0' : undefined,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockTenants.map((t, i) => {
              const isOverdue = t.status === 'overdue';
              return (
                <tr
                  key={t.id}
                  className={`animate-fade-up ${i < mockTenants.length - 1 ? 'border-b border-[#dcc1b7]/15' : ''}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <td className="px-5 py-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                        {isOverdue && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
                        )}
                      </div>
                      <p className="text-sm font-semibold text-jet" style={{ letterSpacing: '-0.01em' }}>{t.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <p className="text-sm text-jet truncate">{t.property}</p>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <p className={`text-sm font-medium ${isOverdue ? 'text-red-500 font-bold' : 'text-slate-brand'}`}>
                      {new Date(t.rentDue).toLocaleDateString('en-IE', { day: '2-digit', month: 'short' })}
                    </p>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <StatusBadge status={isOverdue ? 'Overdue' : 'Active'} />
                  </td>
                  <td className="px-5 py-4 align-middle">
                    {t.tickets > 0 ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white" style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}>
                        {t.tickets}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-brand/40 font-medium">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      <button onClick={() => onNav('messages')} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-lg transition-opacity hover:opacity-90 active:scale-[0.97] transition-transform" style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}>
                        <MessageSquare size={11} />
                        Message
                      </button>
                      <button onClick={() => toast.success(`Calling ${t.name}…`)} className="w-7 h-7 inline-flex items-center justify-center rounded-lg bg-[#f5f5f7] hover:bg-[#ebebed] transition-colors active:scale-[0.97] transition-transform">
                        <Phone size={12} className="text-slate-brand" />
                      </button>
                    </div>
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
