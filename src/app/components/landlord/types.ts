export type Tab =
  | 'overview'
  | 'properties'
  | 'tenants'
  | 'messages'
  | 'maintenance'
  | 'payments'
  | 'settings';

export interface NewPropertyForm {
  address: string;
  eircode: string;
  type: string;
  rent: string;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
  houseRules: string;
}

export const PRIORITY_CLASSES: Record<string, string> = {
  High: 'text-coral',
  Medium: 'text-amber-500',
  Low: 'text-slate-brand',
};
