import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RequireRole({ role, children }) {
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user?.rol !== role) return <Navigate to="/" replace />;
  return children;
}
