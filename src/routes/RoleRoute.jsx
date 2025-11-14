// src/routes/RoleRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleRoute({ allowedRoles = [] }) {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to="/login" />;
  const roleMap = {
    1: "student",
    2: "librarian",
    3: "admin",
  };
  const role = roleMap[user.id_tipo_usuario] || user.rol || user.role;
  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/" />;
}
