import { useState } from 'react';
import { Building2, CheckCircle2, Flag } from 'lucide-react';
import { mockProperties } from '../../../data/mockProperties';

export function ListingsTab() {
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [removed, setRemoved] = useState<Set<string>>(new Set());

  const total   = mockProperties.length;
  const active  = total - flagged.size - removed.size;
  const flaggedCount = flagged.size;

  const [hovered, setHovered] = useState<number | null>(null);

  const STATS = [
    { label: 'Total',   value: total,        icon: <Building2 size={14} className="text-white/80" />, style: { background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)' }, hover: '0 16px 48px rgba(180,80,40,0.45)', iconBg: 'bg-white/15', lc: 'text-white/70', vc: 'text-white', sc: 'text-white/60' },
    { label: 'Active',  value: active,        icon: <CheckCircle2 size={14} className="text-white/80" />, style: { background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)', boxShadow: '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)' }, hover: '0 16px 48px rgba(61,77,99,0.40)', iconBg: 'bg-white/10', lc: 'text-white/50', vc: 'text-white', sc: 'text-white/50' },
    { label: 'Flagged', value: flaggedCount,  icon: <Flag size={14} className="text-slate-brand" />, style: { background: '#ffffff', boxShadow: '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)' }, hover: '0 16px 48px rgba(23,27,43,0.12)', iconBg: 'bg-[#f0f1f3]', lc: 'text-slate-brand', vc: 'text-jet', sc: 'text-slate-brand' },
  ];

  function toggleFlag(id: string) {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function removeListingById(id: string) {
    setRemoved(prev => new Set(prev).add(id));
    setFlagged(prev => { const next = new Set(prev); next.delete(id); return next; });
  }

  function getStatus(id: string) {
    if (removed.has(id)) return 'removed';
    if (flagged.has(id)) return 'flagged';
    return 'active';
  }

  const STATUS_PILL = {
    active:  'bg-emerald-50 text-emerald-700',
    flagged: 'bg-amber-50 text-amber-700',
    removed: 'bg-red-50 text-red-600',
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-[1.35rem] text-jet" style={{ letterSpacing: '-0.02em' }}>Listings Management</h2>
        <p className="text-xs text-slate-brand mt-0.5">All platform listings</p>
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
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.iconBg}`}>{s.icon}</div>
              <span className={`text-[0.68rem] font-bold uppercase tracking-[0.06em] ${s.lc}`}>{s.label}</span>
            </div>
            <p className={`font-bold text-3xl ${s.vc}`} style={{ letterSpacing: '-0.03em' }}>{s.value}</p>
            <p className={`text-xs ${s.sc}`}>listings</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="flex items-center justify-between px-5 py-4 bg-[#f5f5f7] rounded-t-xl">
          <h3 className="font-bold text-sm text-jet" style={{ letterSpacing: '-0.01em' }}>All Listings</h3>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.05em] text-slate-brand">{total} total</span>
        </div>

        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col style={{ width: '23%' }} />
            <col style={{ width: '13%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '9%' }} />
            <col style={{ width: '13%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '13%' }} />
          </colgroup>
          <thead>
            <tr>
              {(['Title', 'Type', 'Location', 'Price', 'Posted By', 'Status', ''] as const).map(h => (
                <th key={h} className="px-4 py-3 text-left text-[0.68rem] font-bold uppercase tracking-[0.06em] text-slate-brand bg-[#f5f5f7]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockProperties.map((p, i) => {
              const status = getStatus(p.id);
              return (
                <tr key={p.id} className={`${i < mockProperties.length - 1 ? 'border-b border-[#dcc1b7]/15' : ''} ${removed.has(p.id) ? 'opacity-40' : ''}`}>
                  <td className="px-4 py-3.5 align-middle">
                    <p className="text-sm font-semibold text-jet truncate" style={{ letterSpacing: '-0.01em' }}>{p.title}</p>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <p className="text-xs text-slate-brand truncate">{p.type}</p>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <p className="text-xs text-slate-brand truncate">{p.location}</p>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <p className="text-sm font-semibold text-coral">€{p.price}</p>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <p className="text-xs text-slate-brand">{p.postedBy === 'roommate' ? 'Roommate' : p.landlord.name}</p>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[0.7rem] font-bold capitalize ${STATUS_PILL[status]}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    {!removed.has(p.id) && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleFlag(p.id)}
                          className={`text-[0.65rem] font-bold px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                            flagged.has(p.id)
                              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                              : 'bg-[#f0f1f3] text-slate-brand hover:bg-[#e8e9ec]'
                          }`}
                        >
                          {flagged.has(p.id) ? 'Unflag' : 'Flag'}
                        </button>
                        <button
                          onClick={() => removeListingById(p.id)}
                          className="text-[0.65rem] font-bold px-2.5 py-1.5 rounded-md bg-red-50 text-red-500 hover:bg-red-100 transition-colors whitespace-nowrap"
                        >
                          Remove
                        </button>
                      </div>
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
