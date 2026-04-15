import { useState } from 'react';
import { toast } from 'sonner';
import { Navbar } from '../components/layout/Navbar';
import { ChatInterface } from '../components/shared/ChatInterface';
import { mockProperties } from '../../data/mockProperties';
import { TenantSidebar } from '../components/tenant/TenantSidebar';
import { OverviewTab } from '../components/tenant/OverviewTab';
import { WishlistTab } from '../components/tenant/WishlistTab';
import { TenancyTab } from '../components/tenant/TenancyTab';
import { MaintenanceTab } from '../components/tenant/MaintenanceTab';
import { PaymentsTab } from '../components/tenant/PaymentsTab';
import { SettingsTab } from '../components/tenant/SettingsTab';
import { RaiseTicketModal } from '../components/tenant/RaiseTicketModal';
import { type Tab, type LocalTicket, type TicketForm } from '../components/tenant/types';

const INITIAL_WISHLIST = mockProperties.slice(0, 4).map((p) => p.id);

const LOCAL_TICKETS: LocalTicket[] = [
  {
    id: 'tk1',
    title: 'Heating not working',
    category: 'Heating',
    priority: 'High',
    status: 'Open',
    date: '25 Jan 2024',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600',
    response: null,
    description: 'The central heating has not been working for 3 days. The radiators are completely cold and the boiler is displaying error code E4. Cannot get hot water either.',
  },
  {
    id: 'tk2',
    title: 'Leaking tap in bathroom',
    category: 'Plumbing',
    priority: 'Medium',
    status: 'In Progress',
    date: '22 Jan 2024',
    image: null,
    response: 'Engineer scheduled for Thursday 29 Jan between 9am–12pm. Please ensure access to the property.',
    description: 'The hot water tap in the main bathroom has a persistent drip. Water is pooling under the sink cabinet. Has been ongoing for about a week.',
  },
  {
    id: 'tk3',
    title: 'Window latch broken',
    category: 'Other',
    priority: 'Low',
    status: 'Resolved',
    date: '10 Jan 2024',
    image: null,
    response: 'Repaired on 14 Jan 2024. New latch fitted and tested. Issue closed.',
    description: 'The latch mechanism on the bedroom window is broken and cannot be secured properly. This is a security concern as the window will not lock.',
  },
];

const EMPTY_FORM: TicketForm = { title: '', category: 'Heating', description: '', priority: 'Medium' };

export function TenantDashboard() {
  const [activeTab, setActiveTab]           = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen]       = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketForm, setTicketForm]         = useState<TicketForm>(EMPTY_FORM);
  const [wishlisted, setWishlisted]         = useState<string[]>(INITIAL_WISHLIST);

  const wishlistItems = mockProperties.filter((p) => wishlisted.includes(p.id));

  const handleNav = (id: Tab) => { setActiveTab(id); setSidebarOpen(false); };

  const removeWishlist = (id: string) => {
    setWishlisted((prev) => prev.filter((w) => w !== id));
    toast.success('Removed from wishlist');
  };

  const clearWishlist = () => {
    setWishlisted([]);
    toast.success('Wishlist cleared');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface-low">

      <Navbar
        onSidebarToggle={() => setSidebarOpen(true)}
        user={{ name: 'Arun Kumar', avatar: 'https://i.pravatar.cc/150?img=3' }}
      />

      <div className="flex flex-1 overflow-hidden min-h-0">

        <TenantSidebar
          activeTab={activeTab}
          onNav={handleNav}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className={`flex-1 min-h-0 w-full ${activeTab === 'chats' ? 'flex overflow-hidden' : 'overflow-y-auto'}`}>

            {activeTab === 'overview' && (
              <OverviewTab
                wishlistItems={wishlistItems}
                tickets={LOCAL_TICKETS}
                onNav={handleNav}
                onRaiseTicket={() => setShowTicketModal(true)}
              />
            )}

            {activeTab === 'wishlist' && (
              <WishlistTab
                wishlistItems={wishlistItems}
                onRemove={removeWishlist}
                onClear={clearWishlist}
              />
            )}

            {activeTab === 'chats' && <ChatInterface />}

            {activeTab === 'tenancy' && (
              <TenancyTab
                onNav={handleNav}
                onRaiseTicket={() => setShowTicketModal(true)}
              />
            )}

            {activeTab === 'maintenance' && (
              <MaintenanceTab
                tickets={LOCAL_TICKETS}
                onRaiseTicket={() => setShowTicketModal(true)}
              />
            )}

            {activeTab === 'payments' && <PaymentsTab />}

            {activeTab === 'settings' && <SettingsTab />}

          </div>
        </div>
      </div>

      <RaiseTicketModal
        open={showTicketModal}
        onClose={() => setShowTicketModal(false)}
        form={ticketForm}
        onFormChange={setTicketForm}
      />

    </div>
  );
}
