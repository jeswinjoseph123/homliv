import { useState } from 'react';
import { Users, Building2, Home } from 'lucide-react';
import { type MockAdminUser } from './types';

const MOCK_USERS: MockAdminUser[] = [
  { id: 'u1', name: 'Marcus O\'Brien',  avatar: 'https://i.pravatar.cc/150?img=12', role: 'landlord', status: 'active',    joined: '2026-01-15' },
  { id: 'u2', name: 'Heritage Estates', avatar: 'https://i.pravatar.cc/150?img=55', role: 'landlord', status: 'active',    joined: '2026-02-03' },
  { id: 'u3', name: 'The Curator',      avatar: 'https://i.pravatar.cc/150?img=47', role: 'landlord', status: 'unverified',joined: '2026-03-20' },
  { id: 'u4', name: 'Arun Kumar',       avatar: 'https://i.pravatar.cc/150?img=3',  role: 'tenant',   status: 'active',    joined: '2026-02-01' },
  { id: 'u5', name: 'Priya Nair',       avatar: 'https://i.pravatar.cc/150?img=5',  role: 'tenant',   status: 'active',    joined: '2026-02-05' },
  { id: 'u6', name: 'James O\'Connor',  avatar: 'https://i.pravatar.cc/150?img=8',  role: 'roommate', status: 'active',    joined: '2026-03-10' },
];

const ROLE_PILL: Record<MockAdminUser['role'], string> = {
  landlord: 'bg-jet text-white',
  tenant:   'bg-slate-brand text-white',
  roommate: 'text-white',
};

const STATUS_PILL: Record<MockAdminUser['status'], string> = {
  active:    'bg-emerald-50 text-emerald-700',
  unverified:'bg-amber-50 text-amber-700',
  banned:    'bg-red-50 text-red-600',
};

export function UsersTab() {
  const [userStatuses, setUserStatuses] = useState<Record<string, MockAdminUser['status']>>(
    Object.fromEntries(MOCK_USERS.map(u => [u.id, u.status]))
  );

  const landlords = MOCK_USERS.filter(u => u.role === 'landlord').length;
  const tenants   = MOCK_USERS.filter(u => u.role === 'tenant').length;
  const roommates = MOCK_USERS.filter(u => u.role === 'roommate').length;

  const [hovered, setHovered] = useState<number | null>(null);

  const STATS = [
    { label: 'Landlords', value: landlords, icon: <Building2 size={14} className="text-white/80" />, style: { background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)', boxShadow: '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)' }, hoverShadow: '0 16px 48px rgba(61,77,99,0.40)', iconBg: 'bg-white/10', labelColor: 'text-white/50', valueColor: 'text-white', subColor: 'text-white/50' },
    { label: 'Tenants',   value: tenants,   icon: <Users size={14} className="text-white/80" />,    style: { background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)' }, hoverShadow: '0 16px 48px rgba(180,80,40,0.45)', iconBg: 'bg-white/15', labelColor: 'text-white/70', valueColor: 'text-white', subColor: 'text-white/60' },
    { label: 'Roommates', value: roommates, icon: <Home size={14} className="text-slate-brand" />,  style: { background: '#ffffff', boxShadow: '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)' }, hoverShadow: '0 16px 48px rgba(23,27,43,0.12)', iconBg: 'bg-[#f0f1f3]', labelColor: 'text-slate-brand', valueColor: 'text-jet', subColor: 'text-slate-brand' },
  ];

  function toggleBan(id: string) {
    setUserStatuses(prev => ({
      ...prev,
      [id]: prev[id] === 'banned' ? 'active' : 'banned',
    }));
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-[1.35rem] text-jet" style={{ letterSpacing: '-0.02em' }}>User Management</h2>
        <p className="text-xs text-slate-brand mt-0.5">All users across all roles</p>
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
              boxShadow: hovered === i ? s.hoverShadow : s.style.boxShadow,
              transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'transform 200ms ease, box-shadow 200ms ease',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.iconBg}`}>{s.icon}</div>
              <span className={`text-[0.68rem] font-bold uppercase tracking-[0.06em] ${s.labelColor}`}>{s.label}</span>
            </div>
            <p className={`font-bold text-3xl ${s.valueColor}`} style={{ letterSpacing: '-0.03em' }}>{s.value}</p>
            <p className={`text-xs ${s.subColor}`}>registered</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="flex items-center justify-between px-5 py-4 bg-[#f5f5f7] rounded-t-xl">
          <h3 className="font-bold text-sm text-jet" style={{ letterSpacing: '-0.01em' }}>All Users</h3>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.05em] text-slate-brand">{MOCK_USERS.length} total</span>
        </div>

        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col style={{ width: '28%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '18%' }} />
          </colgroup>
          <thead>
            <tr>
              {(['User', 'Role', 'Status', 'Joined', 'Actions'] as const).map(h => (
                <th key={h} className="px-5 py-3 text-left text-[0.68rem] font-bold uppercase tracking-[0.06em] text-slate-brand bg-[#f5f5f7]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((u, i) => {
              const status = userStatuses[u.id];
              return (
                <tr key={u.id} className={i < MOCK_USERS.length - 1 ? 'border-b border-[#dcc1b7]/15' : ''}>
                  <td className="px-5 py-4 align-middle">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                      <p className="text-sm font-semibold text-jet truncate" style={{ letterSpacing: '-0.01em' }}>{u.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    {u.role === 'roommate' ? (
                      <span className="inline-flex px-2.5 py-1 rounded-full text-[0.7rem] font-bold text-white" style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}>
                        Roommate
                      </span>
                    ) : (
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[0.7rem] font-bold capitalize ${ROLE_PILL[u.role]}`}>
                        {u.role}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[0.7rem] font-bold capitalize ${STATUS_PILL[status]}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <p className="text-sm text-slate-brand">
                      {new Date(u.joined).toLocaleDateString('en-IE', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    {status === 'banned' ? (
                      <button
                        onClick={() => toggleBan(u.id)}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-colors"
                      >
                        Unban
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleBan(u.id)}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg border border-red-400 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Ban
                      </button>
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
