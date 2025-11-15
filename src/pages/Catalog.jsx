import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { catalogApi } from "../services/api";
import Loader from "../components/Loader";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import TopBar from "../components/TopBar";

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await catalogApi.get("", { params: { size: 120 } });
        setBooks(res.data.items || res.data || []);
      } catch (error) {
        console.error("Error cargando catálogo", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filtered = useMemo(() => {
    if (!term) return books;
    const t = term.toLowerCase();
    return books.filter(
      (b) =>
        (b.titulo || "").toLowerCase().includes(t) ||
        (b.autor || "").toLowerCase().includes(t)
    );
  }, [books, term]);

  if (loading) return <Loader />;

  const goToPanel = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.id_tipo_usuario === 2 || user.id_tipo_usuario === 3) {
      navigate("/librarian/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  };

  return (
    <>
      <TopBar />
      <section className="catalog-shell">
        <div className="catalog-hero">
          <div>
            <p className="badge">Catálogo en línea</p>
            <h2>Encuentra tu próxima lectura</h2>
            <p className="muted">
              Más de cien títulos disponibles para préstamo inmediato. Usa el
              buscador para localizar tu libro favorito.
            </p>
          </div>
          <button onClick={goToPanel}>
            {user ? "Ir a mi panel" : "Iniciar sesión"}
          </button>
        </div>

        <div className="card">
          <div className="section-header">
            <div>
              <h3>Catálogo de libros</h3>
              <p className="muted">
                Busca por título, autor o ISBN y abre el detalle para solicitar
                el préstamo.
              </p>
            </div>
            <button className="ghost" onClick={() => setTerm("")}>
              Limpiar búsqueda
            </button>
          </div>
          <SearchBar
            value={term}
            onChange={setTerm}
            placeholder="Buscar por título o autor..."
          />
          <div className="grid">
            {filtered.map((book) => (
              <BookCard
                key={book.id || book.id_libro || book.isbn}
                book={book}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
