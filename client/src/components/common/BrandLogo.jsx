import { cn } from "../../lib/utils.js";

export function BrandLogo({ compact = false, className = "" }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/70 shadow-[0_14px_35px_rgba(139,92,246,0.16)] backdrop-blur-xl">
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.28),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.22),transparent_42%)]" />
        <svg viewBox="0 0 64 64" className="relative h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="eventsphereLogo" x1="6" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6" />
              <stop offset="0.5" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <path
            d="M18 16.5C18 13.4624 20.4624 11 23.5 11H45C47.2091 11 49 12.7909 49 15V18H27.5C25.567 18 24 19.567 24 21.5C24 23.433 25.567 25 27.5 25H43V28H27.5C25.567 28 24 29.567 24 31.5C24 33.433 25.567 35 27.5 35H41.5V38H27.5C25.567 38 24 39.567 24 41.5C24 43.433 25.567 45 27.5 45H49V49C49 51.2091 47.2091 53 45 53H23.5C20.4624 53 18 50.5376 18 47.5V16.5Z"
            fill="url(#eventsphereLogo)"
          />
          <path d="M16 15L10 22" stroke="url(#eventsphereLogo)" strokeWidth="4" strokeLinecap="round" />
          <path d="M16 49L10 42" stroke="url(#eventsphereLogo)" strokeWidth="4" strokeLinecap="round" />
          <path d="M14 31.5H48" stroke="white" strokeOpacity="0.8" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {!compact ? (
        <div>
          <div className="font-display text-xl font-semibold tracking-tight text-slate-900">EventSphere</div>
          <div className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">Smart Event OS</div>
        </div>
      ) : null}
    </div>
  );
}
