import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess } from "../store/authSlice";
import { authApi } from "../services/api";
import { resolveRole } from "../utils/roleUtils";
import TopBar from "../components/TopBar";

export default function Login() {
  const [username, setUsername] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await authApi.post("/login", { username, contrasena });
      const payload = {
        token: res.data.token,
        user: res.data.usuario_info,
      };
      dispatch(loginSuccess(payload));
      const role = resolveRole(payload.user);
      const target =
        role === "librarian" || role === "admin"
          ? "/librarian/dashboard"
          : "/student/dashboard";
      navigate(target);
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  if (token) {
    navigate("/student/dashboard");
  }

  return (
    <>
      <TopBar />
      <section className="auth-shell">
        <div className="auth-card">
          <h2>Iniciar sesión</h2>
          <p className="muted">
            Gestiona tus préstamos y solicita nuevos libros desde aquí.
          </p>
          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Usuario
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="********"
              />
            </label>
            {error && <p className="error-text">{error}</p>}
            <button type="submit">Entrar</button>
          </form>
          <p className="muted">
            ¿No tienes cuenta? <Link to="/register">Crear una cuenta</Link>
          </p>
        </div>
      </section>
    </>
  );
}
