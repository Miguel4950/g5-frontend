import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { authApi } from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

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

      const roleMap = {
        1: "student",
        2: "librarian",
        3: "admin",
      };
      const role =
        roleMap[payload.user?.id_tipo_usuario] ||
        payload.user?.rol ||
        payload.user?.role ||
        "student";
      const target =
        role === "librarian" || role === "admin"
          ? "/librarian/dashboard"
          : "/student/dashboard";
      window.location.href = target;
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="page">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tienes cuenta? <a href="/register">Registrarse</a>
      </p>
    </div>
  );
}
