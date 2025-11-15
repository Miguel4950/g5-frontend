// src/routes/RoleRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { resolveRole } from "../utils/roleUtils";

export default function RoleRoute({ allowedRoles = [] }) {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to="/login" />;
  const role = resolveRole(user);
  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/" />;
}
