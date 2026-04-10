interface PriceTagProps {
  price: number;
  size?: 'sm' | 'lg';
}

export function PriceTag({ price, size = 'sm' }: PriceTagProps) {
  return (
    <span>
      <span
        className={`font-bold text-coral ${
          size === 'lg' ? 'text-[3.5rem] tracking-[-0.02em]' : 'text-xl'
        }`}
      >
        €{price.toLocaleString()}
      </span>
      <span className="text-xs font-medium text-slate-brand ml-1">/mo</span>
    </span>
  );
}
