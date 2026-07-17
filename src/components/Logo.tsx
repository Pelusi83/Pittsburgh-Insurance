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
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Pittsburgh Insurance Hub logo"
    >
      <path
        d="M20 2.5 34.5 7.9V19c0 9.5-6.5 15.7-14.5 18.6C12 34.7 5.5 28.5 5.5 19V7.9L20 2.5Z"
        fill="#1663f5"
      />
      <path
        d="M20 6.2 30.8 10.2V19c0 7.2-4.8 12.1-10.8 14.5C14 31.1 9.2 26.2 9.2 19v-8.8L20 6.2Z"
        fill="#0f4de1"
      />
      <path
        d="M13.2 20.4 17.8 25 27 14.6"
        stroke="#f5b301"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
