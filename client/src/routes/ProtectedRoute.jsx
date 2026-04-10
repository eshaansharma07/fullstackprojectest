import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "../components/ui/Loader.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export function ProtectedRoute({ roles }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <Loader label="Checking your session..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user?.role)) return <Navigate to="/" replace />;
  return <Outlet />;
}
