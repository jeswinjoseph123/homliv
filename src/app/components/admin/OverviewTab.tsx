import { useState } from 'react';
import { Building2, ShieldCheck, Users, Flag, ArrowRight, CheckCircle2, UserPlus, AlertTriangle, BadgeCheck } from 'lucide-react';
import { mockProperties, mockReports } from '../../../data/mockProperties';
import { type AdminTab } from './types';

interface OverviewTabProps {
  onNav: (tab: AdminTab) => void;
}

const ACTIVITY = [
  { icon: <UserPlus size={14} className="text-coral" />, text: 'Marcus O\'Brien registered as landlord', time: '2 hours ago' },
  { icon: <AlertTriangle size={14} className="text-amber-500" />, text: 'New report filed on listing #3 — Misleading photos', time: '5 hours ago' },
  { icon: <BadgeCheck size={14} className="text-emerald-500" />, text: 'Verification approved — Priya Nair (Roommate)', time: '1 day ago' },
  { icon: <Building2 size={14} className="text-slate-brand" />, text: 'New listing published — Georgian Penthouse, D2', time: '1 day ago' },
  { icon: <CheckCircle2 size={14} className="text-emerald-500" />, text: 'Report resolved — Unresponsive landlord (#1)', time: '2 days ago' },
];

export function OverviewTab({ onNav }: OverviewTabProps) {
  const totalListings = mockProperties.length;
  const openReports = mockReports.filter(r => r.reason !== '').length;

  const [hovered, setHovered] = useState<number | null>(null);

  const STATS = [
    {
      label: 'Total Listings',
      value: totalListings,
      sub: 'across all properties',
      icon: <Building2 size={14} className="text-white/80" />,
      style: { background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)' },
      hoverShadow: '0 16px 48px rgba(180,80,40,0.45)',
      iconBg: 'bg-white/15',
      labelColor: 'text-white/70',
      valueColor: 'text-white',
      subColor: 'text-white/60',
    },
    {
      label: 'Verified Landlords',
      value: 3,
      sub: 'identity confirmed',
      icon: <ShieldCheck size={14} className="text-white/80" />,
      style: { background: 'linear-gradient(145deg, #4f5d75 0%, #3d4d63 100%)', boxShadow: '0 8px 32px rgba(61,77,99,0.30), 0 2px 8px rgba(61,77,99,0.15)' },
      hoverShadow: '0 16px 48px rgba(61,77,99,0.40)',
      iconBg: 'bg-white/10',
      labelColor: 'text-white/50',
      valueColor: 'text-white',
      subColor: 'text-white/50',
    },
    {
      label: 'Active Tenants',
      value: 3,
      sub: 'with active tenancies',
      icon: <Users size={14} className="text-slate-brand" />,
      style: { background: '#ffffff', boxShadow: '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)' },
      hoverShadow: '0 16px 48px rgba(23,27,43,0.12)',
      iconBg: 'bg-[#f0f1f3]',
      labelColor: 'text-slate-brand',
      valueColor: 'text-jet',
      subColor: 'text-slate-brand',
    },
    {
      label: 'Open Reports',
      value: openReports,
      sub: 'awaiting review',
      icon: <Flag size={14} className="text-slate-brand" />,
      style: { background: '#ffffff', boxShadow: '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)' },
      hoverShadow: '0 16px 48px rgba(23,27,43,0.12)',
      iconBg: 'bg-[#f0f1f3]',
      labelColor: 'text-slate-brand',
      valueColor: 'text-jet',
      subColor: 'text-slate-brand',
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-[1.35rem] text-jet" style={{ letterSpacing: '-0.02em' }}>Platform Overview</h2>
        <p className="text-xs text-slate-brand mt-0.5">HomLiv platform at a glance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.iconBg}`}>
                {s.icon}
              </div>
              <span className={`text-[0.68rem] font-bold uppercase tracking-[0.06em] ${s.labelColor}`}>{s.label}</span>
            </div>
            <p className={`font-bold text-3xl ${s.valueColor}`} style={{ letterSpacing: '-0.03em' }}>{s.value}</p>
            <p className={`text-xs ${s.subColor}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <div className="px-5 py-4 bg-[#f5f5f7] rounded-t-xl flex items-center justify-between">
            <h3 className="font-bold text-sm text-jet" style={{ letterSpacing: '-0.01em' }}>Recent Activity</h3>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.05em] text-slate-brand">Last 48 hours</span>
          </div>
          <div className="divide-y divide-[#dcc1b7]/15">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                <div className="w-6 h-6 rounded-lg bg-[#f0f1f3] flex items-center justify-center shrink-0 mt-0.5">
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-jet">{a.text}</p>
                  <p className="text-xs text-slate-brand/60 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
            <h3 className="font-bold text-sm text-jet mb-3" style={{ letterSpacing: '-0.01em' }}>Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onNav('verifications')}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 active:scale-[0.97] transition-all"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
              >
                Verifications
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => onNav('reports')}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold text-jet border border-[#dcc1b7]/30 hover:bg-surface-low transition-colors active:scale-[0.97]"
              >
                Reports
                <ArrowRight size={14} className="text-slate-brand" />
              </button>
              <button
                onClick={() => onNav('users')}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold text-jet border border-[#dcc1b7]/30 hover:bg-surface-low transition-colors active:scale-[0.97]"
              >
                Manage Users
                <ArrowRight size={14} className="text-slate-brand" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
