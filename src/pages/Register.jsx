import { useState } from "react";
import { authApi } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    username: "",
    email: "",
    contrasena: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authApi.post("/register", { ...form, id_tipo_usuario: 1 });
    setSuccess(true);
  };

  return (
    <div className="page">
      <h2>Registro</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre completo"
          onChange={handleChange}
          value={form.nombre}
        />
        <input
          name="username"
          placeholder="Usuario"
          onChange={handleChange}
          value={form.username}
        />
        <input
          name="email"
          placeholder="Correo"
          type="email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          name="contrasena"
          placeholder="Contraseña"
          type="password"
          onChange={handleChange}
          value={form.contrasena}
        />
        <button type="submit">Crear cuenta</button>
      </form>

      {success && <p>Registro exitoso. Ahora puedes iniciar sesión.</p>}
    </div>
  );
}
