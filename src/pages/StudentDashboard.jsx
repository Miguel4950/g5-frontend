import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { catalogApi, loansApi } from "../services/api";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";

export default function StudentDashboard() {
  const user = useSelector((state) => state.auth.user);
  const [books, setBooks] = useState([]);
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const normalizeArray = (payload) => {
      if (Array.isArray(payload)) return payload;
      if (Array.isArray(payload?.items)) return payload.items;
      if (Array.isArray(payload?.content)) return payload.content;
      return [];
    };

    catalogApi
      .get("", { params: { size: 8 } })
      .then((res) => setBooks(normalizeArray(res.data)))
      .catch((err) => console.error("Error cargando libros:", err));

    loansApi
      .get("/my-loans")
      .then((res) => setLoans(normalizeArray(res.data)))
      .catch((err) => console.error("Error cargando prǸstamos:", err));
  }, []);

  const filteredBooks = books.filter((b) =>
    (b?.titulo || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h2>Bienvenido, {user?.nombre}</h2>
      <p>Panel del Estudiante</p>

      <section>
        <h3>Buscar Libros</h3>
        <SearchBar value={search} onChange={setSearch} />
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id || book.id_libro || book.isbn} book={book} />
          ))}
        </div>
      </section>

      <section>
        <h3>Mis PrǸstamos</h3>
        {loans.length === 0 ? (
          <p>No tienes prǸstamos activos.</p>
        ) : (
          <ul>
            {loans.map((loan) => (
              <li key={loan.id || loan.id_prestamo}>
                {loan.libro?.titulo || loan.titulo} �?" Estado:{" "}
                {loan.estado || loan.estadoNombre}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
