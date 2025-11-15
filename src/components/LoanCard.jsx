import { useEffect, useState } from "react";
import { catalogApi } from "../services/api";

const bookCache = new Map();

export default function LoanCard({ loan, actions }) {
  const [remoteBook, setRemoteBook] = useState(null);
  const normalizedLoan = loan.prestamo || loan;
  const libro = remoteBook || normalizedLoan.libro || normalizedLoan.book || {};
  const fechaSolicitud =
    normalizedLoan.fecha_prestamo ||
    normalizedLoan.fechaSolicitud ||
    normalizedLoan.createdAt;
  const fechaDevolucion =
    normalizedLoan.fecha_devolucion_esperada ||
    normalizedLoan.fechaDevolucion ||
    null;
  const estado =
    normalizedLoan.estado || normalizedLoan.estadoNombre || normalizedLoan.status || "pendiente";

  const bookId = normalizedLoan.id_libro || normalizedLoan.bookId || libro.id;

  useEffect(() => {
    if ((libro && libro.titulo) || !bookId) return;
    if (bookCache.has(bookId)) {
      setRemoteBook(bookCache.get(bookId));
      return;
    }
    let active = true;
    catalogApi
      .get(`/${bookId}`)
      .then((res) => {
        if (!active) return;
        bookCache.set(bookId, res.data);
        setRemoteBook(res.data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [bookId, libro?.titulo]);

  const borrower =
    loan?.usuario?.nombre ||
    normalizedLoan.usuario?.nombre ||
    loan?.usuarioNombre ||
    normalizedLoan.nombre_usuario ||
    (normalizedLoan.id_usuario ? `Usuario #${normalizedLoan.id_usuario}` : "Desconocido");

  return (
    <div className="loan-card">
      <h4>{libro.titulo || loan.titulo || "Título desconocido"}</h4>
      <p>
        <strong>Autor:</strong> {libro.autor || loan.autor || "Sin autor"}
      </p>
      <p>
        <strong>Solicitante:</strong> {borrower}
      </p>
      <p>
        <strong>Solicitado:</strong>{" "}
        {fechaSolicitud ? new Date(fechaSolicitud).toLocaleDateString() : "-"}
      </p>
      {fechaDevolucion && (
        <p>
          <strong>Fecha devolución:</strong>{" "}
          {new Date(fechaDevolucion).toLocaleDateString()}
        </p>
      )}
      <p className={`status status-${String(estado).toLowerCase()}`}>
        <strong>Estado:</strong> {estado}
      </p>
      {actions && <div className="loan-card-actions">{actions}</div>}
    </div>
  );
}
