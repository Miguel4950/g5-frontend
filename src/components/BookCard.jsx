import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="book-card">
      <h3>{book.titulo}</h3>
      <p>{book.autor}</p>

      <Link to={`/book/${book.id}`}>
        <button>Ver detalle</button>
      </Link>
    </div>
  );
}
