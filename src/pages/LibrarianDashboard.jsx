import { useSelector } from "react-redux";

export default function LibrarianDashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="page">
      <h2>Panel del Bibliotecario</h2>
      <p>Usuario: {user?.nombre}</p>

      <ul>
        <li>
          <a href="/manage-books">Gestión de Libros</a>
        </li>
        <li>
          <a href="/manage-loans">Gestión de Préstamos</a>
        </li>
        <li>
          <a href="/reports">Reportes</a>
        </li>
      </ul>
    </div>
  );
}
