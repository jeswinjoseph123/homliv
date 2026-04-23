import { useState } from 'react';
import { X, ShieldAlert, Info } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { Navbar } from '../components/layout/Navbar';
import { LandlordSidebar } from '../components/landlord/LandlordSidebar';
import { OverviewTab } from '../components/landlord/OverviewTab';
import { PropertiesTab } from '../components/landlord/PropertiesTab';
import { TenantsTab } from '../components/landlord/TenantsTab';
import { MessagesTab } from '../components/landlord/MessagesTab';
import { MaintenanceTab } from '../components/landlord/MaintenanceTab';
import { PaymentsTab } from '../components/landlord/PaymentsTab';
import { SettingsTab } from '../components/landlord/SettingsTab';
import { type Tab } from '../components/landlord/types';
import { useVerificationStore } from '../../hooks/useVerificationStore';

export function LandlordDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isVerified } = useVerificationStore();

  const [activeTab, setActiveTab] = useState<Tab>((location.state?.tab as Tab) ?? 'overview');
  const [rtbDismissed, setRtbDismissed]       = useState(false);
  const [verifyDismissed, setVerifyDismissed] = useState(false);
  const [sidebarOpen, setSidebarOpen]         = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface-low">
      <Navbar
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{ name: "Marcus O'Brien", avatar: 'https://i.pravatar.cc/150?img=55' }}
      />

      <div className="flex flex-1 overflow-hidden min-h-0">
        <LandlordSidebar
          activeTab={activeTab}
          onNav={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto" style={{ viewTransitionName: 'main-content' }}>
          {activeTab === 'messages' ? (
            <div className="flex overflow-hidden h-full">
              <MessagesTab />
            </div>
          ) : (
            <div className="p-4 sm:p-6 max-w-[1100px] mx-auto w-full">
              {!isVerified && !verifyDismissed && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border-l-4 border-amber-400 mb-5">
                  <ShieldAlert size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-jet">Your account is not verified</p>
                    <p className="text-xs text-slate-brand mt-0.5">
                      Verify your identity to list properties and unlock all landlord features.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => navigate('/landlord/verify')}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
                      style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                    >
                      Verify Now
                    </button>
                    <button onClick={() => setVerifyDismissed(true)}>
                      <X size={16} className="text-slate-brand" />
                    </button>
                  </div>
                </div>
              )}

              {!rtbDismissed && (
                <div className="flex items-start gap-3 p-4 rounded-xl mb-5" style={{ background: 'rgba(239,131,84,0.05)', borderLeft: '4px solid #ef8354' }}>
                  <Info size={16} className="text-coral shrink-0 mt-0.5" />
                  <p className="text-sm flex-1 text-jet">
                    <strong>Remember</strong> to register this tenancy with the RTB within 1 month of commencement.
                  </p>
                  <button onClick={() => setRtbDismissed(true)}>
                    <X size={16} className="text-slate-brand" />
                  </button>
                </div>
              )}

              {activeTab === 'overview'    && (
                <OverviewTab
                  isVerified={isVerified}
                  onListProperty={() => navigate('/landlord/list-property', { viewTransition: true })}
                  onNav={setActiveTab}
                />
              )}
              {activeTab === 'properties'  && (
                <PropertiesTab
                  isVerified={isVerified}
                  onListNew={() => navigate('/landlord/list-property', { viewTransition: true })}
                />
              )}
              {activeTab === 'tenants'     && <TenantsTab onNav={setActiveTab} />}
              {activeTab === 'maintenance' && <MaintenanceTab />}
              {activeTab === 'payments'    && <PaymentsTab />}
              {activeTab === 'settings'    && <SettingsTab />}
            </div>
          )}
        </main>
      </div>

    </div>
  );
}
