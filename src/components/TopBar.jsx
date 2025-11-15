import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { resolveRole } from "../utils/roleUtils";

export default function TopBar({ showBack = false }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const role = resolveRole(user);

  const isStaff = role === "librarian" || role === "admin";

  const navItems = [
    { label: "Catálogo", path: "/catalog" },
    !user
      ? null
      : isStaff
        ? { label: "Panel bibliotecario", path: "/librarian/dashboard" }
        : { label: "Panel estudiante", path: "/student/dashboard" },
  ].filter(Boolean);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        {showBack && (
          <button className="ghost back-button" onClick={handleBack}>
            ← Regresar
          </button>
        )}
        <div className="topbar-logo" onClick={() => navigate("/catalog")}>
          <strong>Biblioteca PUJ</strong>
          <span>Gestión integral de préstamos</span>
        </div>
      </div>
      <nav className="topbar-nav">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={
              location.pathname.startsWith(item.path) ? "active" : ""
            }
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
        {user ? (
          <button className="ghost" onClick={handleLogout}>
            Cerrar sesión
          </button>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Iniciar sesión</button>
            <button className="ghost" onClick={() => navigate("/register")}>
              Registrarse
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
