export type Tab = 'overview' | 'listings' | 'messages' | 'settings';

export interface ListRoomForm {
  listingType: 'permanent' | 'temporary';
  availableFrom: string;
  availableUntil: string;
  title: string;
  type: 'Single Room' | 'Double Room' | 'En-Suite' | 'Studio';
  location: string;
  eircode: string;
  price: string;
  description: string;
  houseRules: string;
  amenities: string[];
}
