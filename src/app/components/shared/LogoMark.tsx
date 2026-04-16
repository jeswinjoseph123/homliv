interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 24, className = '' }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 180"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Roof — wide chevron band, extends beyond H columns */}
      <path d="M100 5 L200 72 L182 72 L100 23 L18 72 L0 72 Z" />

      {/* H — left pillar */}
      <rect x="28" y="68" width="36" height="112" />

      {/* H — right pillar with notch on inner-left face at crossbar height */}
      <path d="M136 68 L172 68 L172 180 L136 180 L136 126 L150 126 L150 105 L136 105 Z" />

      {/* H — crossbar: right face of left pillar → notch depth of right pillar */}
      <rect x="64" y="105" width="86" height="21" />
    </svg>
  );
}
