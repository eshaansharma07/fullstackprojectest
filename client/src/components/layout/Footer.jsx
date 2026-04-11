import { Link } from "react-router-dom";
import { BrandLogo } from "../common/BrandLogo.jsx";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div>
          <BrandLogo />
          <p className="mt-3 text-sm text-slate-500">
            Centralized event operations for colleges, clubs, RWAs, and local communities.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Navigate</h4>
          <div className="mt-3 space-y-2 text-sm text-slate-500">
            <Link to="/about" className="block hover:text-slate-900">About</Link>
            <Link to="/faq" className="block hover:text-slate-900">FAQ</Link>
            <Link to="/contact" className="block hover:text-slate-900">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Legal</h4>
          <div className="mt-3 space-y-2 text-sm text-slate-500">
            <Link to="/terms" className="block hover:text-slate-900">Terms</Link>
            <Link to="/privacy" className="block hover:text-slate-900">Privacy Policy</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Contact</h4>
          <div className="mt-3 space-y-2 text-sm text-slate-500">
            <p>eventsphere.team@gmail.com</p>
            <p>+91 98765 43210</p>
            <p>New Delhi, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
