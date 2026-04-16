import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { RoommateSidebar } from '../components/roommate/RoommateSidebar';
import { OverviewTab } from '../components/roommate/OverviewTab';
import { MyListingsTab } from '../components/roommate/MyListingsTab';
import { MessagesTab } from '../components/roommate/MessagesTab';
import { SettingsTab } from '../components/roommate/SettingsTab';
import { type Tab } from '../components/roommate/types';
import { mockProperties } from '@/data/mockProperties';
import type { Property } from '@/types';

export function RoommateDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [listings, setListings] = useState<Property[]>(() =>
    mockProperties.filter((p) => p.postedBy === 'roommate')
  );

  const hasActiveListing = listings.length > 0;
  const temporaryListing = listings.find((l) => l.listingType === 'temporary');
  const expiryDate = temporaryListing?.availableUntil ?? null;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface-low">
      <Navbar
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{ name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=32' }}
      />

      <div className="flex flex-1 overflow-hidden min-h-0">
        <RoommateSidebar
          activeTab={activeTab}
          onNav={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          hasActiveListing={hasActiveListing}
        />

        <main className="flex-1 overflow-y-auto" style={{ viewTransitionName: 'main-content' }}>
          {activeTab === 'messages' ? (
            <div className="flex overflow-hidden h-full">
              <MessagesTab />
            </div>
          ) : (
            <div className="max-w-[1100px] mx-auto w-full p-4 sm:p-6">
              {activeTab === 'overview'  && (
                <OverviewTab
                  onNav={setActiveTab}
                  hasActiveListing={hasActiveListing}
                  expiryDate={expiryDate}
                />
              )}
              {activeTab === 'listings'  && (
                <MyListingsTab
                  roommateListings={listings}
                  onListingsChange={setListings}
                />
              )}
              {activeTab === 'settings'  && <SettingsTab />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
