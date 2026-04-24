export type AdminTab = 'overview' | 'users' | 'listings' | 'reports' | 'verifications' | 'payments' | 'settings';

export interface MockAdminUser {
  id: string;
  name: string;
  avatar: string;
  role: 'landlord' | 'tenant' | 'roommate';
  status: 'active' | 'unverified' | 'banned';
  joined: string;
}

export interface MockVerificationRequest {
  id: string;
  name: string;
  avatar: string;
  role: 'landlord' | 'roommate';
  submitted: string;
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
}
