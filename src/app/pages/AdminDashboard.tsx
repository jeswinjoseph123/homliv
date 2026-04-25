import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/layout/Navbar';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { OverviewTab } from '../components/admin/OverviewTab';
import { UsersTab } from '../components/admin/UsersTab';
import { ListingsTab } from '../components/admin/ListingsTab';
import { ReportsTab } from '../components/admin/ReportsTab';
import { VerificationsTab } from '../components/admin/VerificationsTab';
import { PaymentsTab } from '../components/admin/PaymentsTab';
import { SettingsTab } from '../components/admin/SettingsTab';
import { type AdminTab } from '../components/admin/types';
import { useAdminStore } from '../../hooks/useAdminStore';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin } = useAdminStore();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface-low">
      <Navbar
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{ name: 'HomLiv Admin', avatar: 'https://i.pravatar.cc/150?img=50' }}
      />

      <div className="flex flex-1 overflow-hidden min-h-0">
        <AdminSidebar
          activeTab={activeTab}
          onNav={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto" style={{ viewTransitionName: 'main-content' }}>
          <div className="p-4 sm:p-6 max-w-[1100px] mx-auto w-full">
            {activeTab === 'overview'      && <OverviewTab onNav={setActiveTab} />}
            {activeTab === 'users'         && <UsersTab />}
            {activeTab === 'listings'      && <ListingsTab />}
            {activeTab === 'reports'       && <ReportsTab />}
            {activeTab === 'verifications' && <VerificationsTab />}
            {activeTab === 'payments'      && <PaymentsTab />}
            {activeTab === 'settings'      && <SettingsTab />}
          </div>
        </main>
      </div>
    </div>
  );
}
