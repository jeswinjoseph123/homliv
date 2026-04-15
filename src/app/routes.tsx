import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { TenantLoginPage } from './pages/TenantLoginPage';
import { LandlordSignupPage } from './pages/LandlordSignupPage';
import { ChatPage } from './pages/ChatPage';
import { LandlordDashboard } from './pages/LandlordDashboard';
import { TenantDashboard } from './pages/TenantDashboard';
import { LandlordVerifyPage } from './pages/LandlordVerifyPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/listings',
    Component: ListingsPage,
  },
  {
    path: '/property/:id',
    Component: PropertyDetailPage,
  },
  {
    path: '/login',
    Component: TenantLoginPage,
  },
  {
    path: '/landlord',
    Component: LandlordSignupPage,
  },
  {
    path: '/dashboard',
    Component: LandlordDashboard,
  },
  {
    path: '/tenant-dashboard',
    Component: TenantDashboard,
  },
  {
    path: '/chat/:tenancyId',
    Component: ChatPage,
  },
  {
    path: '/landlord/verify',
    Component: LandlordVerifyPage,
  },
  {
    path: '*',
    Component: HomePage,
  },
]);
