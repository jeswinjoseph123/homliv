import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown, ChevronUp, MoreHorizontal, Calendar, TrendingUp, AlertCircle, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

const RENT_ROWS = [
  { id: '1', property: 'Double Room, Ranelagh', unit: 'D6', tenant: 'Sarah Connolly', avatar: 'https://i.pravatar.cc/150?img=5', amount: 950, dueDate: '01 May 2026', status: 'paid' as const },
  { id: '2', property: 'Master Suite, Smithfield', unit: 'D7', tenant: 'Liam O\'Brien', avatar: 'https://i.pravatar.cc/150?img=11', amount: 1100, dueDate: '01 May 2026', status: 'overdue' as const },
  { id: '3', property: 'Modern Studio, Grand Canal', unit: 'D2', tenant: 'Elena Russo', avatar: 'https://i.pravatar.cc/150?img=47', amount: 1450, dueDate: '03 May 2026', status: 'due-soon' as const },
  { id: '4', property: 'En-Suite, Ballsbridge', unit: 'D4', tenant: 'James Murphy', avatar: 'https://i.pravatar.cc/150?img=33', amount: 1300, dueDate: '10 May 2026', status: 'upcoming' as const },
];

const HISTORY_DATA = [
  {
    id: '1',
    property: 'Double Room, Ranelagh',
    unit: 'D6',
    tenant: 'Sarah Connolly',
    avatar: 'https://i.pravatar.cc/150?img=5',
    leaseInfo: '12 Month Lease',
    months: [
      { label: 'April 2026', amount: '€950', date: 'Paid Apr 01', paid: true },
      { label: 'March 2026', amount: '€950', date: 'Paid Mar 01', paid: true },
      { label: 'February 2026', amount: '€950', date: 'Paid Feb 01', paid: true },
    ],
  },
  {
    id: '2',
    property: 'Master Suite, Smithfield',
    unit: 'D7',
    tenant: 'Liam O\'Brien',
    avatar: 'https://i.pravatar.cc/150?img=11',
    leaseInfo: '6 Month Lease',
    months: [
      { label: 'April 2026', amount: '€1,100', date: 'Overdue', paid: false },
      { label: 'March 2026', amount: '€1,100', date: 'Paid Mar 01', paid: true },
      { label: 'February 2026', amount: '€1,100', date: 'Paid Feb 03', paid: true },
    ],
  },
  {
    id: '3',
    property: 'Modern Studio, Grand Canal',
    unit: 'D2',
    tenant: 'Elena Russo',
    avatar: 'https://i.pravatar.cc/150?img=47',
    leaseInfo: '12 Month Lease',
    months: [
      { label: 'April 2026', amount: '€1,450', date: 'Due May 03', paid: false },
      { label: 'March 2026', amount: '€1,450', date: 'Paid Mar 02', paid: true },
      { label: 'February 2026', amount: '€1,450', date: 'Paid Feb 02', paid: true },
    ],
  },
];

type Status = 'paid' | 'overdue' | 'due-soon' | 'upcoming';

const STATUS_CONFIG: Record<Status, { label: string; classes: string }> = {
  paid:     { label: 'Paid',     classes: 'bg-emerald-50 text-emerald-700' },
  overdue:  { label: 'Overdue',  classes: 'bg-red-50 text-red-600' },
  'due-soon': { label: 'Due Soon', classes: 'bg-amber-50 text-amber-700' },
  upcoming: { label: 'Upcoming', classes: 'bg-[#f0f1f3] text-slate-brand' },
};

function StatusPill({ status }: { status: Status }) {
  const { label, classes } = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${classes}`}>
      {label}
    </span>
  );
}

const STATUS_ACTIONS: Record<Status, { label: string; next: Status; icon: ReactNode; color: string }[]> = {
  paid:       [
    { label: 'Mark as Overdue',  next: 'overdue',  icon: <AlertTriangle size={13} />, color: 'text-red-500' },
    { label: 'Mark as Due Soon', next: 'due-soon', icon: <Clock size={13} />,         color: 'text-amber-600' },
  ],
  overdue:    [
    { label: 'Mark as Paid',     next: 'paid',     icon: <CheckCircle2 size={13} />,  color: 'text-emerald-600' },
    { label: 'Mark as Due Soon', next: 'due-soon', icon: <Clock size={13} />,         color: 'text-amber-600' },
  ],
  'due-soon': [
    { label: 'Mark as Paid',     next: 'paid',     icon: <CheckCircle2 size={13} />,  color: 'text-emerald-600' },
    { label: 'Mark as Overdue',  next: 'overdue',  icon: <AlertTriangle size={13} />, color: 'text-red-500' },
  ],
  upcoming:   [
    { label: 'Mark as Paid',     next: 'paid',     icon: <CheckCircle2 size={13} />,  color: 'text-emerald-600' },
    { label: 'Mark as Due Soon', next: 'due-soon', icon: <Clock size={13} />,         color: 'text-amber-600' },
    { label: 'Mark as Overdue',  next: 'overdue',  icon: <AlertTriangle size={13} />, color: 'text-red-500' },
  ],
};

function ActionsDropdown({ rowId, status, onStatusChange }: { rowId: string; status: Status; onStatusChange: (id: string, s: Status) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const actions = STATUS_ACTIONS[status];

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-7 h-7 inline-flex items-center justify-center rounded-lg hover:bg-[#f5f5f7] transition-colors"
      >
        <MoreHorizontal size={15} className="text-slate-brand" />
      </button>
      {open && (
        <div
          className="absolute right-0 z-50 mt-1 w-44 bg-white rounded-xl py-1.5 border border-[#dcc1b7]/20"
          style={{ boxShadow: '0 8px 24px rgba(23,27,43,0.14), 0 2px 6px rgba(23,27,43,0.08)', top: '100%' }}
        >
          {actions.map(a => (
            <button
              key={a.next}
              onClick={() => { onStatusChange(rowId, a.next); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-[#f5f5f7] transition-colors ${a.color}`}
            >
              {a.icon}
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function PaymentsTab() {
  const [expanded, setExpanded] = useState<string | null>('1');
  const [statuses, setStatuses] = useState<Record<string, Status>>({});

  const toggle = (id: string) => setExpanded(prev => prev === id ? null : id);
  const changeStatus = (id: string, s: Status) => setStatuses(prev => ({ ...prev, [id]: s }));

  const getStatus = (row: typeof RENT_ROWS[0]): Status => statuses[row.id] ?? row.status;

  const collected = RENT_ROWS.filter(r => getStatus(r) === 'paid').reduce((a, r) => a + r.amount, 0);
  const overdue   = RENT_ROWS.filter(r => getStatus(r) === 'overdue').reduce((a, r) => a + r.amount, 0);
  const pending   = RENT_ROWS.filter(r => getStatus(r) === 'due-soon' || getStatus(r) === 'upcoming').reduce((a, r) => a + r.amount, 0);

  // Stat card hover states
  const [sc0Hovered, setSc0Hovered] = useState(false);
  const [sc1Hovered, setSc1Hovered] = useState(false);
  const [sc2Hovered, setSc2Hovered] = useState(false);

  // Count-up for stat cards (approximations that count up on mount)
  const collectedCount = useCountUp(14500, 1400, true);
  const pendingCount   = useCountUp(3200,  1400, true);
  const overdueCount   = useCountUp(850,   1400, true);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-bold text-xl text-jet" style={{ letterSpacing: '-0.02em' }}>Rent Tracker</h2>
          <p className="text-xs text-slate-brand mt-0.5">Real-time oversight of your portfolio cashflow</p>
        </div>
        <button
          className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-opacity hover:opacity-90 active:scale-[0.97] transition-transform"
          style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
        >
          <Calendar size={14} />
          Set up Rent Schedule
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="bg-white rounded-xl p-5"
          onMouseEnter={() => setSc0Hovered(true)}
          onMouseLeave={() => setSc0Hovered(false)}
          style={{
            boxShadow: sc0Hovered ? '0 16px 48px rgba(23,27,43,0.12)' : '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)',
            transform: sc0Hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50">
              <TrendingUp size={15} className="text-emerald-600" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.05em] text-slate-brand">Collected</span>
          </div>
          <p className="font-bold text-2xl text-jet" style={{ letterSpacing: '-0.02em' }}>€{collectedCount.toLocaleString()}</p>
          <p className="text-xs mt-1 text-slate-brand">This month</p>
        </div>

        <div
          className="rounded-xl p-5"
          onMouseEnter={() => setSc1Hovered(true)}
          onMouseLeave={() => setSc1Hovered(false)}
          style={{
            background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)',
            boxShadow: sc1Hovered ? '0 16px 48px rgba(61,77,99,0.40)' : '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)',
            transform: sc1Hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10">
              <Calendar size={15} className="text-white/80" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.05em] text-white/60">Pending</span>
          </div>
          <p className="font-bold text-2xl text-white" style={{ letterSpacing: '-0.02em' }}>€{pendingCount.toLocaleString()}</p>
          <p className="text-xs mt-1 text-white/50">Upcoming payments</p>
        </div>

        <div
          className="rounded-xl p-5"
          onMouseEnter={() => setSc2Hovered(true)}
          onMouseLeave={() => setSc2Hovered(false)}
          style={{
            background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)',
            boxShadow: sc2Hovered ? '0 16px 48px rgba(180,80,40,0.45)' : '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)',
            transform: sc2Hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/15">
              <AlertCircle size={15} className="text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.05em] text-white/70">Overdue</span>
          </div>
          <p className="font-bold text-2xl text-white" style={{ letterSpacing: '-0.02em' }}>€{overdueCount.toLocaleString()}</p>
          <p className="text-xs mt-1 text-white/60">Requires action</p>
        </div>
      </div>

      {/* Rent Tracker Table */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col style={{ width: '26%' }} />
            <col style={{ width: '24%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr className="bg-[#f5f5f7]">
              {(['Property', 'Tenant', 'Amount', 'Due Date', 'Status', 'Actions'] as const).map((h, idx) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-[0.7rem] font-bold uppercase tracking-[0.06em] text-slate-brand"
                  style={{
                    textAlign: idx === 5 ? 'right' : 'left',
                    borderRadius: idx === 0 ? '0.75rem 0 0 0' : idx === 5 ? '0 0.75rem 0 0' : undefined,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RENT_ROWS.map((row, i) => {
              const effectiveStatus = getStatus(row);
              return (
                <tr key={row.id} className={i < RENT_ROWS.length - 1 ? 'border-b border-[#dcc1b7]/15' : ''}>
                  <td className="px-5 py-3.5 align-middle">
                    <p className="text-sm font-semibold text-jet truncate" style={{ letterSpacing: '-0.01em' }}>{row.property}</p>
                    <p className="text-xs text-slate-brand">{row.unit}</p>
                  </td>
                  <td className="px-5 py-3.5 align-middle">
                    <div className="flex items-center gap-2.5">
                      <img src={row.avatar} alt={row.tenant} className="w-7 h-7 rounded-full object-cover shrink-0" />
                      <span className="text-sm text-jet truncate">{row.tenant}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 align-middle">
                    <p className="text-sm font-bold text-jet">€{row.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-5 py-3.5 align-middle">
                    <p className="text-sm text-slate-brand">{row.dueDate}</p>
                  </td>
                  <td className="px-5 py-3.5 align-middle">
                    <StatusPill status={effectiveStatus} />
                  </td>
                  <td className="px-5 py-3.5 align-middle text-right">
                    <ActionsDropdown rowId={row.id} status={effectiveStatus} onStatusChange={changeStatus} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Property Payment History */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="px-5 py-4 bg-[#f5f5f7] rounded-t-xl">
          <h3 className="font-bold text-sm text-jet" style={{ letterSpacing: '-0.01em' }}>Property Payment History</h3>
        </div>

        {HISTORY_DATA.map((prop, i) => {
          const isOpen = expanded === prop.id;
          return (
            <div key={prop.id} className={i < HISTORY_DATA.length - 1 ? 'border-b border-[#dcc1b7]/15' : ''}>
              {/* Accordion Header */}
              <button
                onClick={() => toggle(prop.id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#fafafa] transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <img src={prop.avatar} alt={prop.tenant} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-jet" style={{ letterSpacing: '-0.01em' }}>{prop.property}</p>
                    <p className="text-xs text-slate-brand">{prop.tenant} · {prop.leaseInfo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-jet">€{prop.months[0].amount.replace('€', '')}/mo</span>
                  {isOpen
                    ? <ChevronUp size={16} className="text-slate-brand" />
                    : <ChevronDown size={16} className="text-slate-brand" />
                  }
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-5 pb-4 bg-[#fafafa]">
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    {prop.months.map((m) => (
                      <div
                        key={m.label}
                        className="bg-white rounded-xl p-4"
                        style={{ boxShadow: '0 2px 8px rgba(23,27,43,0.06)' }}
                      >
                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.05em] text-slate-brand mb-2">{m.label}</p>
                        <p className="text-base font-bold text-jet" style={{ letterSpacing: '-0.02em' }}>{m.amount}</p>
                        <p className={`text-xs mt-1 font-medium ${m.paid ? 'text-emerald-600' : 'text-coral'}`}>{m.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
