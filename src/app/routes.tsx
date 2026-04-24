import { createBrowserRouter, Navigate } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { TenantLoginPage } from './pages/TenantLoginPage';
import { LandlordSignupPage } from './pages/LandlordSignupPage';
import { ChatPage } from './pages/ChatPage';
import { LandlordDashboard } from './pages/LandlordDashboard';
import { TenantDashboard } from './pages/TenantDashboard';
import { LandlordVerifyPage } from './pages/LandlordVerifyPage';
import { LandlordListPropertyPage } from './pages/LandlordListPropertyPage';
import { RoommateSignupPage } from './pages/RoommateSignupPage';
import { RoommateVerifyPage } from './pages/RoommateVerifyPage';
import { RoommateDashboard } from './pages/RoommateDashboard';
import { ListRoomPage } from './pages/roommate/ListRoomPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';

export const router = createBrowserRouter([
  { path: '/',                  Component: HomePage },
  { path: '/listings',          Component: ListingsPage },
  { path: '/property/:id',      Component: PropertyDetailPage },
  { path: '/login',             Component: TenantLoginPage },
  { path: '/landlord',          Component: LandlordSignupPage },
  { path: '/dashboard',         Component: LandlordDashboard },
  { path: '/tenant-dashboard',  Component: TenantDashboard },
  { path: '/chat/:tenancyId',   Component: ChatPage },
  { path: '/landlord/verify',         Component: LandlordVerifyPage },
  { path: '/landlord/list-property',  Component: LandlordListPropertyPage },
  // Roommate routes
  { path: '/roommate',          Component: RoommateSignupPage },
  { path: '/roommate/verify',   Component: RoommateVerifyPage },
  // Roommate Phase 2 routes
  { path: '/roommate/dashboard', Component: RoommateDashboard },
  { path: '/roommate/listings',  element: <Navigate to="/roommate/dashboard" replace /> },
  { path: '/roommate/list-room', Component: ListRoomPage },
  { path: '/admin/login',     Component: AdminLoginPage },
  { path: '/admin/dashboard', Component: AdminDashboard },
  { path: '*',                  Component: HomePage },
]);
