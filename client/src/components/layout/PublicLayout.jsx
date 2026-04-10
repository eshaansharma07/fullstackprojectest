import { Outlet } from "react-router-dom";
import { Footer } from "./Footer.jsx";
import { Navbar } from "./Navbar.jsx";
import { useApp } from "../../context/AppContext.jsx";

export function PublicLayout() {
  const { meta } = useApp();

  return (
    <div className="min-h-screen">
      <Navbar />
      {meta.announcements?.length ? (
        <div className="border-b border-amber-400/20 bg-amber-400/10 px-4 py-3 text-center text-sm text-amber-200">
          {meta.announcements[0].message}
        </div>
      ) : null}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
