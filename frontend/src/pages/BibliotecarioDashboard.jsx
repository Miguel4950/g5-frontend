import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import BookTable from "../components/BookTable";
import BookFormModal from "../components/BookFormModal";

export default function GestionLibros() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchBooks = async () => {
    try {
      const { data } = await axiosClient.get("/books"); // json-server
      setBooks(data);
    } catch (e) {
      console.error("Error cargando libros", e);
      setBooks([]);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleCreate = async (data) => {
    try {
      if (editing) {
        await axiosClient.put(`/books/${editing.id}`, { ...editing, ...data });
      } else {
        await axiosClient.post("/books", data);
      }
      setOpen(false); setEditing(null);
      fetchBooks();
    } catch (e) {
      alert("Error guardando libro");
    }
  };

  const handleEdit = (book) => { setEditing(book); setOpen(true); };

  const handleDelete = async (book) => {
    const ok = confirm(`Eliminar "${book.titulo}"?`);
    if (!ok) return;
    try {
      await axiosClient.delete(`/books/${book.id}`);
      fetchBooks();
    } catch (e) {
      alert("No se pudo eliminar");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gestión de Libros</h1>
        <button className="px-4 py-2 rounded-xl bg-blue-600 text-white"
                onClick={() => { setEditing(null); setOpen(true); }}>
          Agregar libro
        </button>
      </div>

      <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
      <BookFormModal open={open} initial={editing}
                     onClose={() => { setOpen(false); setEditing(null); }}
                     onSubmit={handleCreate}/>
    </div>
  );
}