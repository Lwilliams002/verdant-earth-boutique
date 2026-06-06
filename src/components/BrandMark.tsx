type Props = { className?: string };

export function BrandMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 80 110"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* sprout */}
      <path d="M40 18 V62" />
      <path d="M40 28 C 30 26, 24 20, 22 14" />
      <path d="M40 28 C 50 26, 56 20, 58 14" />
      <path d="M40 38 C 28 36, 20 30, 17 22" />
      <path d="M40 38 C 52 36, 60 30, 63 22" />
      <path d="M40 48 C 32 47, 26 43, 24 38" />
      <path d="M40 48 C 48 47, 54 43, 56 38" />
      {/* seed */}
      <path d="M40 60 C 36 64, 36 70, 40 72 C 44 70, 44 64, 40 60 Z" fill="currentColor" fillOpacity="0.9" />
      {/* roots */}
      <path d="M40 72 C 36 80, 30 84, 24 90" />
      <path d="M40 72 C 44 80, 50 84, 56 90" />
      <path d="M40 72 V94" />
      <path d="M30 86 C 28 90, 26 92, 22 94" />
      <path d="M50 86 C 52 90, 54 92, 58 94" />
    </svg>
  );
}
