import { CheckCircle, Camera, User, Bell, Lock, Shield, ChevronRight, X } from 'lucide-react';
import { toast } from 'sonner';

export function SettingsTab() {
  return (
    <div className="p-4 sm:p-6 flex flex-col gap-5 max-w-[1100px] mx-auto w-full">

      <div>
        <h1 className="font-bold tracking-[-0.02em] text-[1.6rem] text-jet">Account Settings</h1>
        <p className="text-sm text-slate-brand mt-0.5">Manage your profile, notifications and security preferences.</p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)] flex items-center gap-5">
        <div className="relative shrink-0">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Arun Kumar"
            className="w-16 h-16 rounded-2xl object-cover"
          />
          <button className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(23,27,43,0.18)]">
            <Camera size={11} className="text-slate-brand" />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base text-jet">Arun Kumar</p>
          <p className="text-sm text-slate-brand mt-0.5">arun.kumar@email.com</p>
          <span className="inline-flex items-center gap-1 mt-1.5 text-[0.62rem] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-full bg-green-50 text-green-600">
            <CheckCircle size={9} /> Verified Tenant
          </span>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-jet transition-colors hover:bg-surface-low shrink-0 bg-white"
          style={{ border: '1px solid rgba(220,193,183,0.40)' }}
        >
          <Camera size={13} className="text-slate-brand" />
          Change Photo
        </button>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">

        {/* Profile Details */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)] flex flex-col gap-5 self-start">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-surface-low flex items-center justify-center">
              <User size={14} className="text-slate-brand" />
            </div>
            <h3 className="font-bold text-sm text-jet">Profile Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Full Name', value: 'Arun Kumar',           type: 'text'  },
              { label: 'Email',     value: 'arun.kumar@email.com', type: 'email' },
              { label: 'Phone',     value: '+353 87 123 4567',     type: 'tel'   },
              { label: 'Eircode',   value: 'D06 X1Y2',            type: 'text'  },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand block mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full px-4 py-2.5 rounded-lg text-sm text-jet outline-none transition-colors bg-surface-low"
                  style={{ border: '1px solid rgba(220,193,183,0.40)' }}
                  onFocus={(e) => (e.target.style.borderColor = '#ef8354')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(220,193,183,0.40)')}
                />
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(220,193,183,0.20)' }} className="pt-4">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand mb-3">Emergency Contact</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Name',  value: 'Priya Kumar'       },
                { label: 'Phone', value: '+353 87 987 6543'  },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand block mb-1.5">{field.label}</label>
                  <input
                    defaultValue={field.value}
                    className="w-full px-4 py-2.5 rounded-lg text-sm text-jet outline-none transition-colors bg-surface-low"
                    style={{ border: '1px solid rgba(220,193,183,0.40)' }}
                    onFocus={(e) => (e.target.style.borderColor = '#ef8354')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(220,193,183,0.40)')}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 mt-1"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            onClick={() => toast.success('Profile updated successfully.')}
          >
            Save Changes
          </button>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">

          {/* Notifications */}
          <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-surface-low flex items-center justify-center">
                <Bell size={14} className="text-slate-brand" />
              </div>
              <h3 className="font-bold text-sm text-jet">Notifications</h3>
            </div>
            <div className="flex flex-col gap-0">
              {[
                { label: 'Rent reminders',        sub: '3 days before due date', on: true  },
                { label: 'Maintenance updates',   sub: 'When landlord responds',  on: true  },
                { label: 'Viewing confirmations', sub: 'Email + push',            on: false },
                { label: 'HomLiv announcements',  sub: 'Platform news',           on: false },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3"
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(220,193,183,0.14)' : 'none' }}
                >
                  <div>
                    <p className="text-sm font-medium text-jet">{item.label}</p>
                    <p className="text-xs text-slate-brand mt-0.5">{item.sub}</p>
                  </div>
                  <div
                    className="w-10 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors shrink-0"
                    style={{ background: item.on ? 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' : 'rgba(220,193,183,0.40)' }}
                  >
                    <div
                      className="w-4 h-4 rounded-full bg-white shadow-sm transition-transform"
                      style={{ transform: item.on ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-surface-low flex items-center justify-center">
                <Lock size={14} className="text-slate-brand" />
              </div>
              <h3 className="font-bold text-sm text-jet">Security</h3>
            </div>
            <div className="flex flex-col gap-0">
              {[
                { icon: <Lock size={13} />,           label: 'Change Password',          sub: 'Last changed 3 months ago' },
                { icon: <Shield size={13} />,         label: 'Two-Factor Authentication', sub: 'Not enabled'              },
                { icon: <ChevronRight size={13} />,   label: 'Active Sessions',           sub: '1 active session'         },
              ].map((item, i, arr) => (
                <button
                  key={item.label}
                  className="flex items-center gap-3 py-3 w-full text-left hover:bg-surface-low/50 rounded-lg px-1 -mx-1 transition-colors"
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(220,193,183,0.14)' : 'none' }}
                  onClick={() => toast.success(`Opening ${item.label}…`)}
                >
                  <div className="w-7 h-7 rounded-lg bg-surface-low flex items-center justify-center shrink-0 text-slate-brand">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-jet">{item.label}</p>
                    <p className="text-xs text-slate-brand">{item.sub}</p>
                  </div>
                  <ChevronRight size={14} className="text-slate-brand/50 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Account / danger zone */}
          <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand mb-3">Account</p>
            <button
              className="w-full flex items-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              onClick={() => toast.error('Contact support to delete your account.')}
            >
              <X size={14} />
              Delete Account
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
