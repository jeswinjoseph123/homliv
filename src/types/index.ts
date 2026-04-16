export interface Landlord {
  name: string;
  verified: boolean;
  avatar: string;
}

export interface Property {
  id: string;
  title: string;
  type: 'Single Room' | 'Double Room' | 'En-Suite' | 'Studio' | 'Penthouse';
  location: string;
  eircode: string;
  price: number;
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  available: boolean;
  wishlistCount: number;
  isRPZ: boolean;
  landlord: Landlord;
  description: string;
  houseRules: string[];
  transport: string[];
  // Roommate fields — optional so existing 14 properties need no changes
  postedBy?: 'landlord' | 'roommate';
  roommateVerified?: boolean;
  listingType?: 'permanent' | 'temporary';
  availableFrom?: string;       // ISO date string
  availableUntil?: string | null; // null = permanent
}

export interface Message {
  id: string;
  sender: 'tenant' | 'landlord';
  text: string;
  time: string;
  read: boolean;
}

export interface Tenant {
  id: string;
  name: string;
  avatar: string;
  property: string;
  rentDue: string;
  status: 'active' | 'overdue';
  tickets: number;
}

export interface MaintenanceTicket {
  id: string;
  tenantName: string;
  property: string;
  issue: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Report {
  id: string;
  listingId: string;
  reportedBy: string;
  reason: string;
  details?: string;
  timestamp: string;
}
