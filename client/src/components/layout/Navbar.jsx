import { Bell, Globe2, MoonStar, SunMedium } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useApp } from "../../context/AppContext.jsx";

const links = [
  { label: "Home", to: "/" },
  { label: "Calendar", to: "/calendar" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
  { label: "About", to: "/about" }
];

export function Navbar() {
  const { user, logout } = useAuth();
  const { theme, setTheme, language, setLanguage } = useApp();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#170f12]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-[#e23744] to-[#ff6b57] p-2 text-white shadow-lg shadow-[#e23744]/30">
            <Bell size={18} />
          </div>
          <div>
            <div className="font-display text-lg font-semibold text-white">EventSphere</div>
            <div className="text-xs text-[#d3b8b8]">Discover. Register. Host.</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm ${isActive ? "text-[#ff8c7d]" : "text-[#f7d8d3] hover:text-white"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="rounded-full border border-white/10 bg-white/5 p-3 text-[#fff2ef]"
          >
            <Globe2 size={16} />
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full border border-white/10 bg-white/5 p-3 text-[#fff2ef]"
          >
            {theme === "dark" ? <SunMedium size={16} /> : <MoonStar size={16} />}
          </button>
          {user ? (
            <>
              <Link to={user.role === "admin" ? "/admin" : user.role === "organizer" ? "/organizer" : "/dashboard"} className="btn-primary">
                Dashboard
              </Link>
              <button onClick={logout} className="btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
