export default function SunIcon({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="7" fill="#F59E0B" />
      <g stroke="#F59E0B" strokeWidth="2">
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="16" y1="26" x2="16" y2="30" />
        <line x1="2" y1="16" x2="6" y2="16" />
        <line x1="26" y1="16" x2="30" y2="16" />
        <line x1="5.5" y1="5.5" x2="8.3" y2="8.3" />
        <line x1="23.7" y1="23.7" x2="26.5" y2="26.5" />
        <line x1="5.5" y1="26.5" x2="8.3" y2="23.7" />
        <line x1="23.7" y1="8.3" x2="26.5" y2="5.5" />
      </g>
    </svg>
  );
}
