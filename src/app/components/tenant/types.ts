export type Tab =
  | 'overview'
  | 'wishlist'
  | 'chats'
  | 'tenancy'
  | 'maintenance'
  | 'payments'
  | 'settings';

export interface LocalTicket {
  id: string;
  title: string;
  category: string;
  priority: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
  image: string | null;
  response: string | null;
  description: string;
}

export interface TicketForm {
  title: string;
  category: string;
  description: string;
  priority: string;
}

export const CATEGORY_STYLE: Record<string, string> = {
  Heating:     'bg-orange-100 text-orange-700',
  Plumbing:    'bg-blue-100 text-blue-700',
  Electricity: 'bg-yellow-100 text-yellow-700',
  Other:       'bg-surface-low text-slate-brand',
};

export const PRIORITY_STYLE: Record<string, string> = {
  High:   'bg-red-100 text-red-600',
  Medium: 'bg-amber-100 text-amber-600',
  Low:    'bg-green-100 text-green-700',
};
