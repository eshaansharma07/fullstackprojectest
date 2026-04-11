import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#130d10]/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div>
          <h3 className="font-display text-xl font-semibold text-white">EventSphere</h3>
          <p className="mt-3 text-sm text-[#d0b6b3]">
            Centralized event operations for colleges, clubs, RWAs, and local communities.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Navigate</h4>
          <div className="mt-3 space-y-2 text-sm text-[#d0b6b3]">
            <Link to="/about" className="block hover:text-white">About</Link>
            <Link to="/faq" className="block hover:text-white">FAQ</Link>
            <Link to="/contact" className="block hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Legal</h4>
          <div className="mt-3 space-y-2 text-sm text-[#d0b6b3]">
            <Link to="/terms" className="block hover:text-white">Terms</Link>
            <Link to="/privacy" className="block hover:text-white">Privacy Policy</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Contact</h4>
          <div className="mt-3 space-y-2 text-sm text-[#d0b6b3]">
            <p>eventsphere.team@gmail.com</p>
            <p>+91 98765 43210</p>
            <p>New Delhi, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
