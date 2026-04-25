import { MessageSquare, MapPin, AlertTriangle, CheckCircle, Wrench, Download } from 'lucide-react';
import { toast } from 'sonner';
import { type Tab } from './types';

interface TenancyTabProps {
  onNav: (id: Tab) => void;
  onRaiseTicket: () => void;
}

export function TenancyTab({ onNav, onRaiseTicket }: TenancyTabProps) {
  return (
    <div className="p-4 sm:p-6 max-w-[1100px] mx-auto w-full flex flex-col gap-5">

      <div>
        <h2 className="font-bold tracking-[-0.02em] text-[1.4rem] text-jet">My Tenancy</h2>
        <p className="text-sm text-slate-brand mt-0.5">Manage your current lease, rent payments, and property details.</p>
      </div>

      {/* Property hero */}
      <div className="relative rounded-2xl overflow-hidden h-52 shadow-[0_8px_32px_rgba(23,27,43,0.18)]">
        <img
          src="https://images.unsplash.com/photo-1657639754502-3c138cb24b4c?w=900&q=80"
          alt="Your property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,20,31,0.80) 0%, rgba(18,20,31,0.20) 60%, transparent 100%)' }} />
        <span className="absolute top-4 right-4 text-xs font-bold uppercase tracking-[0.06em] px-3 py-1.5 rounded-full bg-coral/90 text-white">
          Active Lease
        </span>
        <div className="absolute bottom-4 left-5">
          <p className="font-bold text-white text-lg tracking-tight leading-tight">Double room in Ranelagh</p>
          <p className="text-white/70 text-xs mt-0.5 flex items-center gap-1">
            <MapPin size={11} /> Dublin 6 · Eircode D06 X5R2
          </p>
        </div>
      </div>

      {/* Landlord row */}
      <div className="bg-white rounded-xl px-5 py-4 flex items-center gap-4 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <img src="https://i.pravatar.cc/150?img=47" alt="Landlord" className="w-11 h-11 rounded-full object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.07em] text-slate-brand">Landlord</p>
          <p className="font-semibold text-sm text-jet mt-0.5">Michael O'Connor</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 shrink-0"
          style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
          onClick={() => toast.success('Opening chat with your landlord…')}
        >
          <MessageSquare size={13} />
          Message landlord
        </button>
      </div>

      {/* Lease details strip */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <div className="flex flex-col sm:grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ghost/20">
          {[
            { label: 'Lease Dates',   value: '1 Feb 2024 – 31 Jan 2025', sub: null,          subColor: ''           },
            { label: 'Monthly Rent',  value: '€950',                      sub: 'per month',   subColor: ''           },
            { label: 'Next Rent Due', value: '1 May 2024',                sub: '3 days away', subColor: 'text-coral' },
          ].map((item) => (
            <div key={item.label} className="px-5 py-4">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.07em] text-slate-brand mb-1">{item.label}</p>
              <p className="font-bold text-base text-jet tracking-tight">{item.value}</p>
              {item.sub && (
                <p className={`text-xs mt-0.5 font-medium ${item.subColor || 'text-slate-brand'}`}>{item.sub}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RPZ Banner */}
      <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl"
           style={{ background: 'rgba(239,131,84,0.08)', border: '1px solid rgba(239,131,84,0.25)' }}>
        <AlertTriangle size={16} className="text-coral shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-jet">Rent Pressure Zone (RPZ)</p>
          <p className="text-xs text-slate-brand mt-0.5 leading-relaxed">
            This property is in a Rent Pressure Zone. Rent increases are capped at 2% per year. Ensure your landlord processes the RPZ calculation with any rent review.
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        {[
          { icon: <MessageSquare size={14} className="text-slate-brand" />, label: 'Go to group chat',         action: () => onNav('chats')                               },
          { icon: <Wrench size={14} className="text-slate-brand" />,        label: 'Raise maintenance ticket', action: onRaiseTicket                                       },
          { icon: <Download size={14} className="text-slate-brand" />,      label: 'Download Lease PDF',       action: () => toast.success('Downloading lease PDF…')       },
        ].map((btn) => (
          <button
            key={btn.label}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-jet transition-colors hover:bg-white bg-white"
            style={{ border: '1px solid rgba(220,193,183,0.40)' }}
            onClick={btn.action}
          >
            {btn.icon}
            {btn.label}
          </button>
        ))}
      </div>

      {/* Inventory + Map */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <h3 className="font-bold text-sm text-jet mb-4">Inventory Status</h3>
          <div className="flex flex-col gap-3">
            {[
              { item: 'Kitchen Appliances',    status: 'ok'        },
              { item: 'Living Room Furniture', status: 'ok'        },
              { item: 'Bedroom Blinds',        status: 'attention' },
              { item: 'Bathroom Fixtures',     status: 'ok'        },
            ].map(({ item, status }) => (
              <div key={item} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${status === 'ok' ? 'bg-surface-low' : 'bg-coral/10'}`}>
                    {status === 'ok'
                      ? <CheckCircle size={12} className="text-slate-brand" />
                      : <AlertTriangle size={11} className="text-coral" />
                    }
                  </div>
                  <span className="text-sm text-jet">{item}</span>
                </div>
                {status === 'attention' && (
                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.06em] px-2 py-0.5 rounded-full bg-coral/10 text-coral">
                    Needs attention
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
          <div className="px-5 pt-4 pb-2">
            <h3 className="font-bold text-sm text-jet">Property Map</h3>
          </div>
          <div className="h-48 overflow-hidden">
            <iframe
              title="Property location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-6.2900%2C53.3200%2C-6.2400%2C53.3500&layer=mapnik&marker=53.3350%2C-6.2650"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
          <div className="px-5 py-3">
            <p className="text-xs text-slate-brand leading-relaxed">
              Rathmines is a vibrant suburb south of Dublin city centre, known for its diverse food scene and historic architecture.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
