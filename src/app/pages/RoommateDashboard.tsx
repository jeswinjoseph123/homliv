import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { RoommateSidebar } from '../components/roommate/RoommateSidebar';
import { OverviewTab } from '../components/roommate/OverviewTab';
import { MyListingsTab } from '../components/roommate/MyListingsTab';
import { MessagesTab } from '../components/roommate/MessagesTab';
import { SettingsTab } from '../components/roommate/SettingsTab';
import { type Tab } from '../components/roommate/types';
import { useRoommateStore } from '../../hooks/useRoommateStore';
import { mockProperties } from '@/data/mockProperties';
import type { Property } from '@/types';

export function RoommateDashboard() {
  const navigate = useNavigate();
  const { isVerified } = useRoommateStore();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [verifyBannerDismissed, setVerifyBannerDismissed] = useState(false);
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

          {/* Verification banner */}
          {!isVerified && !verifyBannerDismissed && (
            <div className="mx-4 sm:mx-6 mt-4 sm:mt-6 flex items-center gap-3 px-4 py-3 rounded-xl"
                 style={{ background: '#fef3e2' }}>
              <AlertTriangle size={15} style={{ color: '#9c5a00' }} className="shrink-0" />
              <p className="text-sm flex-1" style={{ color: '#9c5a00' }}>
                <strong>Identity not verified.</strong> You need to verify before listing a room.
              </p>
              <button
                onClick={() => navigate('/roommate/verify', { viewTransition: true })}
                className="text-xs font-bold uppercase tracking-[0.05em] px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90 shrink-0"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={12} /> Verify Now
                </span>
              </button>
              <button
                onClick={() => setVerifyBannerDismissed(true)}
                className="text-xs font-medium shrink-0 hover:underline"
                style={{ color: '#9c5a00' }}
              >
                Dismiss
              </button>
            </div>
          )}

          {activeTab === 'messages' ? (
            <div className="flex overflow-hidden h-full">
              <MessagesTab />
            </div>
          ) : (
            <div className="max-w-[1100px] mx-auto w-full p-4 sm:p-6">
              {activeTab === 'overview' && (
                <OverviewTab
                  onNav={setActiveTab}
                  hasActiveListing={hasActiveListing}
                  expiryDate={expiryDate}
                  isVerified={isVerified}
                />
              )}
              {activeTab === 'listings' && (
                <MyListingsTab
                  roommateListings={listings}
                  onListingsChange={setListings}
                />
              )}
              {activeTab === 'settings' && <SettingsTab />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
