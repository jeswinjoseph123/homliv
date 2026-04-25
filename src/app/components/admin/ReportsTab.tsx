import { useState } from 'react';
import { Flag, CheckCircle2, Clock } from 'lucide-react';
import { mockReports, mockProperties } from '../../../data/mockProperties';

export function ReportsTab() {
  const [resolved, setResolved] = useState<Set<string>>(new Set());

  const total    = mockReports.length;
  const pending  = total - resolved.size;
  const resolvedCount = resolved.size;

  const [hovered, setHovered] = useState<number | null>(null);

  const STATS = [
    { label: 'Total',    value: total,         icon: <Flag size={14} className="text-white/80" />,       style: { background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)' }, hover: '0 16px 48px rgba(180,80,40,0.45)', ib: 'bg-white/15', lc: 'text-white/70', vc: 'text-white', sc: 'text-white/60' },
    { label: 'Pending',  value: pending,        icon: <Clock size={14} className="text-white/80" />,       style: { background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)', boxShadow: '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)' }, hover: '0 16px 48px rgba(61,77,99,0.40)', ib: 'bg-white/10', lc: 'text-white/50', vc: 'text-white', sc: 'text-white/50' },
    { label: 'Resolved', value: resolvedCount,  icon: <CheckCircle2 size={14} className="text-slate-brand" />, style: { background: '#ffffff', boxShadow: '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)' }, hover: '0 16px 48px rgba(23,27,43,0.12)', ib: 'bg-[#f0f1f3]', lc: 'text-slate-brand', vc: 'text-jet', sc: 'text-slate-brand' },
  ];

  function getListingTitle(listingId: string) {
    return mockProperties.find(p => p.id === listingId)?.title ?? `Listing #${listingId}`;
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-[1.35rem] text-jet" style={{ letterSpacing: '-0.02em' }}>Reports</h2>
        <p className="text-xs text-slate-brand mt-0.5">Flagged content and user complaints</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <p className={`font-bold text-3xl ${s.vc}`} style={{ letterSpacing: '-0.03em' }}>{s.value}</p>
            <p className={`text-xs ${s.sc}`}>reports</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="flex items-center justify-between px-5 py-4 bg-[#f5f5f7] rounded-t-xl">
          <h3 className="font-bold text-sm text-jet" style={{ letterSpacing: '-0.01em' }}>All Reports</h3>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.05em] text-slate-brand">{total} total</span>
        </div>

        {mockReports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-brand/50">
            <CheckCircle2 size={32} className="mb-3" />
            <p className="text-sm font-medium">No reports filed</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-b-xl">
          <table className="w-full table-fixed border-collapse">
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '16%' }} />
              <col style={{ width: '18%' }} />
              <col style={{ width: '14%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
            </colgroup>
            <thead className="sticky top-0 z-10">
              <tr>
                {(['Report ID', 'Listing', 'Reported By', 'Reason', 'Date', 'Status', 'Actions'] as const).map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[0.68rem] font-bold uppercase tracking-[0.06em] text-slate-brand bg-[#f5f5f7]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockReports.map((r, i) => {
                const isResolved = resolved.has(r.id);
                return (
                  <tr key={r.id} className={i < mockReports.length - 1 ? 'border-b border-[#dcc1b7]/15' : ''}>
                    <td className="px-4 py-4 align-middle">
                      <span className="font-mono text-[0.7rem] bg-[#f0f1f3] px-2 py-1 rounded-md text-jet">{r.id}</span>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <p className="text-sm text-jet truncate">{getListingTitle(r.listingId)}</p>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <p className="text-sm text-slate-brand">{r.reportedBy}</p>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <p className="text-sm text-jet truncate" title={r.details}>{r.reason}</p>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <p className="text-xs text-slate-brand">
                        {new Date(r.timestamp).toLocaleDateString('en-IE', { day: '2-digit', month: 'short' })}
                      </p>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[0.7rem] font-bold ${isResolved ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {isResolved ? 'Resolved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      {!isResolved && (
                        <button
                          onClick={() => setResolved(prev => new Set(prev).add(r.id))}
                          className="text-xs font-bold px-3 py-1.5 rounded-lg text-white hover:opacity-90 transition-opacity"
                          style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}
