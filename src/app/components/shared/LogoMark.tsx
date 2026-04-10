interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 24, className = '' }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 90"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Roof chevron — wide, extends beyond H columns */}
      <path d="M50 6 L98 44 L88 44 L50 18 L12 44 L2 44 Z" />
      {/* H — left pillar */}
      <rect x="17" y="41" width="20" height="49" />
      {/* H — right pillar */}
      <rect x="63" y="41" width="20" height="49" />
      {/* H — crossbar: inner edge to inner edge, upper third of pillars */}
      <rect x="37" y="53" width="26" height="14" />
    </svg>
  );
}
