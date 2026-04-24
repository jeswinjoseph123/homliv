import { useState } from 'react';
import { BadgeCheck, Clock } from 'lucide-react';
import { useVerificationStore } from '../../../hooks/useVerificationStore';
import { useRoommateStore } from '../../../hooks/useRoommateStore';
import { type MockVerificationRequest } from './types';

const MOCK_VERIFICATIONS: MockVerificationRequest[] = [
  {
    id: 'v1',
    name: 'Marcus O\'Brien',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'landlord',
    submitted: '2026-04-20',
    documents: ['Proof of Ownership', 'PPS Document', 'Bank Details'],
    status: 'pending',
  },
  {
    id: 'v2',
    name: 'Heritage Estates',
    avatar: 'https://i.pravatar.cc/150?img=55',
    role: 'landlord',
    submitted: '2026-04-18',
    documents: ['Company Cert', 'Eircode Proof', 'IBAN Verified'],
    status: 'approved',
  },
  {
    id: 'v3',
    name: 'James O\'Connor',
    avatar: 'https://i.pravatar.cc/150?img=8',
    role: 'roommate',
    submitted: '2026-04-22',
    documents: ['Email Verified', 'Phone Verified'],
    status: 'pending',
  },
  {
    id: 'v4',
    name: 'Priya Nair',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'roommate',
    submitted: '2026-04-15',
    documents: ['Email Verified', 'Phone Verified'],
    status: 'approved',
  },
];

const STATUS_PILL: Record<MockVerificationRequest['status'], string> = {
  pending:  'bg-amber-50 text-amber-700',
  approved: 'bg-emerald-50 text-emerald-700',
  rejected: 'bg-red-50 text-red-600',
};

export function VerificationsTab() {
  const { setVerified: setLandlordVerified } = useVerificationStore();
  const { setVerified: setRoommateVerified } = useRoommateStore();

  const [statuses, setStatuses] = useState<Record<string, MockVerificationRequest['status']>>(
    Object.fromEntries(MOCK_VERIFICATIONS.map(v => [v.id, v.status]))
  );

  const pendingLandlord = MOCK_VERIFICATIONS.filter(v => v.role === 'landlord' && statuses[v.id] === 'pending').length;
  const pendingRoommate = MOCK_VERIFICATIONS.filter(v => v.role === 'roommate' && statuses[v.id] === 'pending').length;

  const [hovered, setHovered] = useState<number | null>(null);

  const STATS = [
    { label: 'Pending Landlord', value: pendingLandlord, icon: <BadgeCheck size={14} className="text-white/80" />, style: { background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)' }, hover: '0 16px 48px rgba(180,80,40,0.45)', ib: 'bg-white/15', lc: 'text-white/70', vc: 'text-white', sc: 'text-white/60' },
    { label: 'Pending Roommate', value: pendingRoommate, icon: <Clock size={14} className="text-white/80" />, style: { background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)', boxShadow: '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)' }, hover: '0 16px 48px rgba(61,77,99,0.40)', ib: 'bg-white/10', lc: 'text-white/50', vc: 'text-white', sc: 'text-white/50' },
  ];

  function approve(v: MockVerificationRequest) {
    setStatuses(prev => ({ ...prev, [v.id]: 'approved' }));
    if (v.role === 'landlord') setLandlordVerified(true);
    if (v.role === 'roommate') setRoommateVerified(true);
  }

  function reject(id: string) {
    setStatuses(prev => ({ ...prev, [id]: 'rejected' }));
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-[1.35rem] text-jet" style={{ letterSpacing: '-0.02em' }}>Verifications</h2>
        <p className="text-xs text-slate-brand mt-0.5">Pending identity and ownership requests</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
            <p className={`text-xs ${s.sc}`}>awaiting review</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="flex items-center justify-between px-5 py-4 bg-[#f5f5f7] rounded-t-xl">
          <h3 className="font-bold text-sm text-jet" style={{ letterSpacing: '-0.01em' }}>Verification Requests</h3>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.05em] text-slate-brand">{MOCK_VERIFICATIONS.length} total</span>
        </div>

        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col style={{ width: '22%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '26%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '14%' }} />
          </colgroup>
          <thead>
            <tr>
              {(['Applicant', 'Role', 'Submitted', 'Documents', 'Status', 'Actions'] as const).map(h => (
                <th key={h} className="px-5 py-3 text-left text-[0.68rem] font-bold uppercase tracking-[0.06em] text-slate-brand bg-[#f5f5f7]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_VERIFICATIONS.map((v, i) => {
              const status = statuses[v.id];
              return (
                <tr key={v.id} className={i < MOCK_VERIFICATIONS.length - 1 ? 'border-b border-[#dcc1b7]/15' : ''}>
                  <td className="px-5 py-4 align-middle">
                    <div className="flex items-center gap-3">
                      <img src={v.avatar} alt={v.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                      <p className="text-sm font-semibold text-jet truncate" style={{ letterSpacing: '-0.01em' }}>{v.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[0.7rem] font-bold capitalize ${v.role === 'landlord' ? 'bg-jet text-white' : 'text-white'}`}
                      style={v.role === 'roommate' ? { background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' } : {}}>
                      {v.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <p className="text-xs text-slate-brand">
                      {new Date(v.submitted).toLocaleDateString('en-IE', { day: '2-digit', month: 'short' })}
                    </p>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <p className="text-xs text-slate-brand truncate">{v.documents.join(', ')}</p>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[0.7rem] font-bold capitalize ${STATUS_PILL[status]}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    {status === 'pending' && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => approve(v)}
                          className="text-xs font-bold px-2.5 py-1.5 rounded-lg border border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => reject(v.id)}
                          className="text-xs font-bold px-2.5 py-1.5 rounded-lg border border-red-400 text-red-500 hover:bg-red-50 transition-colors"
                        >
                          Reject
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
