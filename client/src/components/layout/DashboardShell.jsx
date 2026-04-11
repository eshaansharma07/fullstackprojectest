import { CalendarRange, Heart, Home, LayoutDashboard, PlusSquare, ShieldCheck, UserCircle2 } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { BrandLogo } from "../common/BrandLogo.jsx";

const roleLinks = {
  participant: [
    { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
    { label: "My Registrations", to: "/my-registrations", icon: CalendarRange },
    { label: "Favorites", to: "/favorites", icon: Heart },
    { label: "Notifications", to: "/notifications", icon: Home },
    { label: "Profile", to: "/profile", icon: UserCircle2 }
  ],
  organizer: [
    { label: "Overview", to: "/organizer", icon: LayoutDashboard },
    { label: "Create Event", to: "/events/create", icon: PlusSquare },
    { label: "Notifications", to: "/notifications", icon: Home },
    { label: "Profile", to: "/profile", icon: UserCircle2 }
  ],
  admin: [
    { label: "Overview", to: "/admin", icon: ShieldCheck },
    { label: "Create Event", to: "/events/create", icon: PlusSquare },
    { label: "Notifications", to: "/notifications", icon: Home },
    { label: "Profile", to: "/profile", icon: UserCircle2 }
  ]
};

export function DashboardShell() {
  const { user } = useAuth();
  const links = roleLinks[user?.role] || [];

  return (
    <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 md:grid-cols-[280px_1fr] md:px-6">
      <aside className="glass h-fit rounded-[32px] p-5">
        <Link to="/" className="mb-8 block">
          <BrandLogo />
        </Link>
        <div className="mb-6 rounded-3xl border border-slate-200/70 bg-white/75 p-4">
          <div className="text-lg font-semibold text-slate-900">{user?.name}</div>
          <div className="text-sm capitalize text-slate-500">{user?.role}</div>
        </div>
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm ${
                    isActive
                      ? "bg-[linear-gradient(135deg,#8b5cf6,#3b82f6)] text-white shadow-[0_12px_30px_rgba(59,130,246,0.22)]"
                      : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={18} />
                {link.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <div className="space-y-6">
        <Outlet />
      </div>
    </div>
  );
}
