import { useEffect, useState } from "react";
import { catalogApi } from "../services/api";
import Loader from "../components/Loader";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await catalogApi.get("", { params: { size: 100 } });
      const items = res.data.items || res.data || [];
      setBooks(items);
      setFiltered(items);
    } catch (err) {
      console.error("Error fetching books", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  function handleSearch(term) {
    if (!term) return setFiltered(books);
    const t = term.toLowerCase();
    setFiltered(
      books.filter(
        (b) =>
          (b.titulo || "").toLowerCase().includes(t) ||
          (b.autor || "").toLowerCase().includes(t)
      )
    );
  }

  if (loading) return <Loader />;

  return (
    <div className="page">
      <h2>Catálogo de Libros</h2>

      <SearchBar
        placeholder="Buscar por título o autor..."
        onSearch={handleSearch}
      />

      <div className="grid">
        {filtered.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </div>
  );
}
