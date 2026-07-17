/**
 * Brand logo — a clean shield + checkmark mark (protection + trust) that stays
 * consistent with the favicon and social share image. Crisp at any size (SVG).
 */

export function LogoMark({
  className = "h-11 w-11",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Pittsburgh Insurance Hub logo"
    >
      {/* Navy emblem — circular so it crops cleanly for Google/social avatars */}
      <circle cx="24" cy="24" r="24" fill="#122457" />
      {/* Golden Pittsburgh suspension bridge */}
      <g
        stroke="#f5b301"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* deck */}
        <path d="M7.5 33h33" />
        {/* towers */}
        <path d="M17 33V12.5" />
        <path d="M31 33V12.5" />
        {/* main span cable dipping between the towers */}
        <path d="M17 12.5Q24 27 31 12.5" />
        {/* side cables sweeping down to the deck ends */}
        <path d="M17 12.5Q10 21.5 7.5 32" />
        <path d="M31 12.5Q38 21.5 40.5 32" />
        {/* a few suspender cables for that signature bridge look */}
        <path d="M20.5 15.2V33" strokeWidth="1.3" />
        <path d="M27.5 15.2V33" strokeWidth="1.3" />
      </g>
      {/* water */}
      <g stroke="#59a6ff" strokeWidth="1.8" strokeLinecap="round">
        <path d="M13 39h7" />
        <path d="M28 39h7" />
      </g>
    </svg>
  );
}

export function Logo({
  className = "",
  subtitle = true,
}: {
  className?: string;
  subtitle?: boolean;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="h-11 w-11 shrink-0" />
      <span className="leading-tight">
        <span className="block text-lg font-extrabold tracking-tight text-slate-900">
          Pittsburgh <span className="text-brand-700">Insurance Hub</span>
        </span>
        {subtitle && (
          <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Licensed · Local · Free
          </span>
        )}
      </span>
    </span>
  );
}
