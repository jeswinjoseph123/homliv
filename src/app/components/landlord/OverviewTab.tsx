import { Building2, Users, Wrench, TrendingUp, BarChart3, Calendar, Plus } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';
import { mockTenants } from '../../../data/mockProperties';

interface OverviewTabProps {
  onListProperty: () => void;
}

const kpis = [
  { label: 'Total Properties', value: '3', icon: <Building2 size={20} />, trend: '+1 this month' },
  { label: 'Active Tenants',   value: '3', icon: <Users size={20} />,     trend: 'All current' },
  { label: 'Open Tickets',     value: '2', icon: <Wrench size={20} />,    trend: '1 urgent' },
  { label: 'Revenue This Month', value: '€2,700', icon: <TrendingUp size={20} />, trend: '+€150 vs last month' },
];

const RECENT_ACTIVITY = [
  { text: 'New viewing request from Arun Kumar',     time: '10 min ago',    dot: 'bg-coral' },
  { text: 'Ticket #tk1 opened — Heating issue',      time: '1 hr ago',      dot: 'bg-amber-400' },
  { text: "Rent received from Priya Nair — €1,100",  time: 'Today 8:30 AM', dot: 'bg-green-600' },
  { text: "New message from James O'Connor",          time: 'Yesterday',     dot: 'bg-slate-brand' },
];

export function OverviewTab({ onListProperty }: OverviewTabProps) {
  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-bold text-2xl text-jet" style={{ letterSpacing: '-0.01em' }}>
            Good morning, Marcus
          </h1>
          <p className="text-sm mt-0.5 text-slate-brand">
            {new Date().toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
          onClick={onListProperty}
        >
          <Plus size={14} />
          List Property
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-coral/10 text-coral mb-3">
                {kpi.icon}
              </div>
              <BarChart3 size={14} className="text-coral" />
            </div>
            <p className="font-bold text-2xl text-coral" style={{ letterSpacing: '-0.02em' }}>{kpi.value}</p>
            <p className="text-xs font-medium mt-0.5 text-jet">{kpi.label}</p>
            <p className="text-xs mt-0.5 text-slate-brand">{kpi.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-jet">Upcoming Rent Due</h3>
            <Calendar size={16} className="text-coral" />
          </div>
          <div className="flex flex-col gap-3">
            {mockTenants.map((tenant) => (
              <div key={tenant.id} className={`flex items-center justify-between ${tenant.status === 'overdue' ? 'bg-red-50' : ''}`}>
                <div className="flex items-center gap-2.5">
                  <img src={tenant.avatar} alt={tenant.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-jet">{tenant.name}</p>
                    <p className="text-xs text-slate-brand">Due {tenant.rentDue}</p>
                  </div>
                </div>
                <StatusBadge status={tenant.status === 'overdue' ? 'Overdue' : 'Active'} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <h3 className="font-bold text-base mb-4 text-jet">Recent Activity</h3>
          <div className="flex flex-col gap-3">
            {RECENT_ACTIVITY.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${activity.dot}`} />
                <div>
                  <p className="text-sm text-jet">{activity.text}</p>
                  <p className="text-xs text-slate-brand">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
