import { Globe2 } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useApp } from "../../context/AppContext.jsx";
import { BrandLogo } from "../common/BrandLogo.jsx";

const links = [
  { label: "Home", to: "/" },
  { label: "Calendar", to: "/calendar" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
  { label: "About", to: "/about" }
];

export function Navbar() {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useApp();

  return (
    <header className="sticky top-4 z-50 px-4 md:px-6">
      <div className="glass-strong mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3">
        <Link to="/">
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-violet-600" : "text-slate-600 hover:text-slate-900"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="rounded-full border border-slate-200 bg-white/80 p-3 text-slate-600"
          >
            <Globe2 size={16} />
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
