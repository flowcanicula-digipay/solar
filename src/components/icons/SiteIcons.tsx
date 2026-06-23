/**
 * Custom hand-drawn SVG icons — use currentColor, swap in anywhere Lucide
 * icons appear. Each 24×24 viewBox, stroke-based, strokeWidth 1.7.
 */

type IconProps = { size?: number; className?: string };

export function MailIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      {/* Envelope body */}
      <rect x="2" y="5" width="20" height="14" rx="2" />
      {/* Angled flap — meets below center (pointed, not V-arch) */}
      <path d="M2 5 L10 13 L12 12 L14 13 L22 5" />
      {/* Wax-seal accent dot */}
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PhoneIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      {/* Classic handset outline */}
      <path d="M6.2 3.8C5.6 3.2 4.6 3.2 4 3.8L2.8 5C1.6 6.2 1.9 8.1 3 9.6 5.4 13 8 15.6 11.4 18c1.5 1.1 3.4 1.4 4.6.2l1.2-1.2c.6-.6.6-1.6 0-2.2l-1.8-1.8c-.6-.6-1.6-.6-2.2 0l-.5.5C11 12.2 9.7 11 8.5 9.7l.5-.5c.6-.6.6-1.6 0-2.2L6.2 3.8Z" />
      {/* Subtle arc — phone wire/cord hint */}
      <path d="M15 3.5C17.5 4.5 19.5 6.5 20.5 9" strokeWidth="1.4" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

export function LocationIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      {/* Teardrop body */}
      <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7Z" />
      {/* Inner lotus-cross (not a plain circle) */}
      <path d="M12 7 L12.6 8.8 L14.5 8.8 L13 9.9 L13.6 11.7 L12 10.6 L10.4 11.7 L11 9.9 L9.5 8.8 L11.4 8.8 Z"
        fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="currentColor"
      className={className} aria-hidden="true"
    >
      {/* Rounded square */}
      <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Facebook F */}
      <path d="M13.5 8H15V5.5H13C11.3 5.5 10 6.8 10 8.5V10H8.5V12.5H10V19H12.5V12.5H14.5L15 10H12.5V8.5C12.5 8.2 12.8 8 13.5 8Z" />
    </svg>
  );
}

export function GlobeUSIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      {/* Globe circle */}
      <circle cx="12" cy="12" r="9" />
      {/* Latitude bands */}
      <path d="M3 12 H21" />
      <path d="M3.5 8 Q12 6.5 20.5 8" />
      <path d="M3.5 16 Q12 17.5 20.5 16" />
      {/* Longitude meridian */}
      <path d="M12 3 Q9 8 9 12 Q9 16 12 21" />
      <path d="M12 3 Q15 8 15 12 Q15 16 12 21" />
      {/* Star accent — upper-left quadrant (Americas) */}
      <path d="M7.5 8 L7.9 9.2 L9.2 9.2 L8.2 9.9 L8.6 11.1 L7.5 10.4 L6.4 11.1 L6.8 9.9 L5.8 9.2 L7.1 9.2 Z"
        fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GlobeSEAIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      {/* Globe circle */}
      <circle cx="12" cy="12" r="9" />
      {/* Latitude bands */}
      <path d="M3 12 H21" />
      <path d="M3.5 8 Q12 6.5 20.5 8" />
      <path d="M3.5 16 Q12 17.5 20.5 16" />
      {/* Longitude meridian */}
      <path d="M12 3 Q9 8 9 12 Q9 16 12 21" />
      <path d="M12 3 Q15 8 15 12 Q15 16 12 21" />
      {/* Compass cross — center-right quadrant (Southeast Asia) */}
      <circle cx="15.5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <path d="M15.5 9.5 L15.5 10.5 M15.5 13.5 L15.5 14.5 M13 12 L14 12 M17 12 L18 12"
        strokeWidth="1.2" />
    </svg>
  );
}

export function JunkBoatIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      {/* Hull */}
      <path d="M3 16 Q5 20 12 20 Q19 20 21 16 L19 14 H5 Z" />
      {/* Mast */}
      <line x1="12" y1="14" x2="12" y2="5" />
      {/* Main sail — junk-style ribbed */}
      <path d="M12 6 L18 9 L18 13 L12 13 Z" />
      <line x1="12" y1="7.5" x2="17.5" y2="9.5" strokeWidth="0.9" />
      <line x1="12" y1="9.5" x2="18" y2="11" strokeWidth="0.9" />
      <line x1="12" y1="11.5" x2="18" y2="12.5" strokeWidth="0.9" />
      {/* Flag at top */}
      <path d="M12 5 L15.5 5.8 L12 6.5" fill="currentColor" stroke="none" />
      {/* Wave line */}
      <path d="M1 18.5 Q4 17.5 7 18.5 Q10 19.5 12 18.5" strokeWidth="1.1" />
    </svg>
  );
}
