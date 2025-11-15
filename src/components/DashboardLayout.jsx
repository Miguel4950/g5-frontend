import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

const roleLabels = {
  1: "Estudiante",
  2: "Bibliotecario",
  3: "Administrador",
};

export default function DashboardLayout({ title, subtitle, actions, children }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roleName =
    roleLabels[user?.id_tipo_usuario] ||
    user?.rol ||
    user?.role ||
    "Invitado";
  const isStaff =
    roleName === "Bibliotecario" || roleName === "Administrador";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-back">
            <button onClick={() => navigate(-1)}>← Volver</button>
          </p>
          <h1>{title}</h1>
          {subtitle && <p className="muted">{subtitle}</p>}
        </div>
        <div className="dashboard-user">
          <div>
            <span className="muted">Sesión</span>
            <strong>{user?.nombre}</strong>
            <span className="badge">{roleName}</span>
          </div>
          <button className="ghost" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button onClick={() => navigate("/catalog")}>Catálogo</button>
        {!isStaff && (
          <button onClick={() => navigate("/student/dashboard")}>
            Panel estudiante
          </button>
        )}
        {isStaff && (
          <button onClick={() => navigate("/librarian/dashboard")}>
            Panel bibliotecario
          </button>
        )}
      </nav>

      {actions && <div className="dashboard-actions">{actions}</div>}

      <main className="dashboard-content">{children}</main>
    </div>
  );
}
