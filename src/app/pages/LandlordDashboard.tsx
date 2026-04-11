import { useState } from 'react';
import { X } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { LandlordSidebar } from '../components/landlord/LandlordSidebar';
import { OverviewTab } from '../components/landlord/OverviewTab';
import { PropertiesTab } from '../components/landlord/PropertiesTab';
import { TenantsTab } from '../components/landlord/TenantsTab';
import { MessagesTab } from '../components/landlord/MessagesTab';
import { MaintenanceTab } from '../components/landlord/MaintenanceTab';
import { PaymentsTab } from '../components/landlord/PaymentsTab';
import { SettingsTab } from '../components/landlord/SettingsTab';
import { ListPropertyModal } from '../components/landlord/ListPropertyModal';
import { type Tab } from '../components/landlord/types';

export function LandlordDashboard() {
  const [activeTab, setActiveTab]                       = useState<Tab>('overview');
  const [rtbDismissed, setRtbDismissed]                 = useState(false);
  const [sidebarOpen, setSidebarOpen]                   = useState(false);
  const [showNewPropertyModal, setShowNewPropertyModal] = useState(false);

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

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 max-w-[1100px] mx-auto w-full">
            {!rtbDismissed && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border-l-4 border-coral mb-5">
                <span className="text-coral shrink-0 mt-0.5">ℹ️</span>
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
                onListProperty={() => { setActiveTab('properties'); setShowNewPropertyModal(true); }}
              />
            )}
            {activeTab === 'properties'  && <PropertiesTab onListNew={() => setShowNewPropertyModal(true)} />}
            {activeTab === 'tenants'     && <TenantsTab />}
            {activeTab === 'messages'    && <MessagesTab />}
            {activeTab === 'maintenance' && <MaintenanceTab />}
            {activeTab === 'payments'    && <PaymentsTab />}
            {activeTab === 'settings'    && <SettingsTab />}
          </div>
        </main>
      </div>

      <ListPropertyModal
        open={showNewPropertyModal}
        onClose={() => setShowNewPropertyModal(false)}
      />
    </div>
  );
}
