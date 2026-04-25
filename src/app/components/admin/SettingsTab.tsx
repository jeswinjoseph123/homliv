import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Switch } from '../../components/ui/switch';
import { useAdminStore } from '../../../hooks/useAdminStore';

export function SettingsTab() {
  const navigate = useNavigate();
  const { logout } = useAdminStore();
  const [maintenance, setMaintenance] = useState(false);
  const [registrations, setRegistrations] = useState(true);

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-[1.35rem] text-jet" style={{ letterSpacing: '-0.02em' }}>Settings</h2>
        <p className="text-xs text-slate-brand mt-0.5">Admin account and platform configuration</p>
      </div>

      {/* Admin profile card */}
      <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <h3 className="font-bold text-sm text-jet mb-4" style={{ letterSpacing: '-0.01em' }}>Admin Profile</h3>
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/150?img=50"
            alt="Admin"
            className="w-16 h-16 rounded-full object-cover"
            style={{ boxShadow: '0 4px 12px rgba(23,27,43,0.12)' }}
          />
          <div>
            <p className="font-bold text-base text-jet" style={{ letterSpacing: '-0.01em' }}>HomLiv Admin</p>
            <p className="text-sm text-slate-brand mt-0.5">admin@homliv.com</p>
            <span className="inline-flex mt-2 px-2.5 py-1 rounded-full text-[0.7rem] font-bold text-white" style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}>
              Super Admin
            </span>
          </div>
        </div>
      </div>

      {/* Platform config */}
      <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <h3 className="font-bold text-sm text-jet mb-4" style={{ letterSpacing: '-0.01em' }}>Platform Configuration</h3>
        <div className="flex flex-col divide-y divide-[#dcc1b7]/15">
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-semibold text-jet">Maintenance Mode</p>
              <p className="text-xs text-slate-brand mt-0.5">Take the platform offline for updates</p>
            </div>
            <Switch checked={maintenance} onCheckedChange={setMaintenance} />
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-semibold text-jet">New Registrations Open</p>
              <p className="text-xs text-slate-brand mt-0.5">Allow new landlords, tenants, and roommates to sign up</p>
            </div>
            <Switch checked={registrations} onCheckedChange={setRegistrations} />
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
        <h3 className="font-bold text-sm text-jet mb-1" style={{ letterSpacing: '-0.01em' }}>Danger Zone</h3>
        <p className="text-xs text-slate-brand mb-4">Actions here are irreversible. Proceed with caution.</p>
        <button
          onClick={handleLogout}
          className="px-6 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 active:scale-[0.97] transition-all"
          style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
        >
          Sign Out of Admin Portal
        </button>
      </div>
    </div>
  );
}
