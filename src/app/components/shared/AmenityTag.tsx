interface AmenityTagProps {
  label: string;
}

export function AmenityTag({ label }: AmenityTagProps) {
  return (
    <span className="text-xs font-bold tracking-[0.05em] uppercase bg-surface-low text-slate-brand px-3 py-1 rounded-full">
      {label}
    </span>
  );
}
