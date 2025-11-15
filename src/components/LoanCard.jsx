import { useEffect, useState } from "react";
import { catalogApi } from "../services/api";

const bookCache = new Map();

export default function LoanCard({ loan, borrowerInfo, actions }) {
  const [remoteBook, setRemoteBook] = useState(null);
  const libro = remoteBook || loan.libro || loan.book || {};
  const fechaSolicitud =
    loan.fecha_prestamo || loan.fechaSolicitud || loan.createdAt;
  const fechaDevolucion =
    loan.fecha_devolucion_esperada || loan.fechaDevolucion || null;
  const estado = loan.estado || loan.estadoNombre || loan.status || "pendiente";

  const bookId = loan.id_libro || loan.bookId || libro.id;

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
    borrowerInfo?.nombre ||
    loan.usuario?.nombre ||
    loan.nombre_usuario ||
    (loan.id_usuario ? `Usuario #${loan.id_usuario}` : "Desconocido");

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
