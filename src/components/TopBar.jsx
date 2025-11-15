import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { resolveRole } from "../utils/roleUtils";

export default function TopBar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = resolveRole(user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const goDashboard = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (role === "librarian" || role === "admin") {
      navigate("/librarian/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-logo" onClick={() => navigate("/catalog")}>
        <strong>Biblioteca PUJ</strong>
        <span>Gestión integral de préstamos</span>
      </div>
      <nav className="topbar-actions">
        <button onClick={() => navigate("/catalog")} className="ghost">
          Catálogo
        </button>
        {user ? (
          <>
            <button onClick={goDashboard}>
              {role === "librarian" || role === "admin"
                ? "Panel bibliotecario"
                : "Panel estudiante"}
            </button>
            <button onClick={handleLogout} className="ghost">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Iniciar sesión</button>
            <button onClick={() => navigate("/register")} className="ghost">
              Registrarse
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
