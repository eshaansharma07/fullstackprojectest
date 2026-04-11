import { CalendarRange, Heart, Home, LayoutDashboard, PlusSquare, ShieldCheck, UserCircle2 } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

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
      <aside className="glass h-fit rounded-[28px] border border-white/5 p-5">
        <Link to="/" className="mb-8 block font-display text-2xl font-semibold text-white">
          EventSphere
        </Link>
        <div className="mb-6 rounded-3xl bg-white/5 p-4">
          <div className="text-lg font-semibold text-white">{user?.name}</div>
          <div className="text-sm capitalize text-[#d1b3af]">{user?.role}</div>
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
                    isActive ? "bg-[#e23744] text-white shadow-lg shadow-[#e23744]/20" : "text-[#efd7d3] hover:bg-white/5"
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
