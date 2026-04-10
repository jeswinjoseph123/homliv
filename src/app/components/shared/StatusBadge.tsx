interface StatusBadgeProps {
  status: 'Open' | 'In Progress' | 'Resolved' | 'Active' | 'Overdue' | 'active' | 'overdue';
}

const STATUS_MAP: Record<string, { bg: string; text: string; label: string }> = {
  Open: { bg: 'bg-[#fef3ee]', text: 'text-coral', label: 'Open' },
  'In Progress': { bg: 'bg-[#fffbeb]', text: 'text-amber-500', label: 'In Progress' },
  Resolved: { bg: 'bg-green-50', text: 'text-green-600', label: 'Resolved' },
  Active: { bg: 'bg-green-50', text: 'text-green-600', label: 'Active' },
  active: { bg: 'bg-green-50', text: 'text-green-600', label: 'Active' },
  Overdue: { bg: 'bg-red-50', text: 'text-red-600', label: 'Overdue' },
  overdue: { bg: 'bg-red-50', text: 'text-red-600', label: 'Overdue' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_MAP[status] ?? {
    bg: 'bg-surface-low',
    text: 'text-slate-brand',
    label: status,
  };
  return (
    <span
      className={`text-xs font-bold tracking-[0.04em] uppercase px-2.5 py-0.5 rounded-full ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
