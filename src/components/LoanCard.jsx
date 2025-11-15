export default function LoanCard({ loan, actions }) {
  const libro = loan.libro || loan.book || {};
  const fechaSolicitud =
    loan.fecha_prestamo || loan.fechaSolicitud || loan.createdAt;
  const fechaDevolucion =
    loan.fecha_devolucion_esperada || loan.fechaDevolucion || null;
  const estado = loan.estado || loan.estadoNombre || loan.status || "pendiente";

  return (
    <div className="loan-card">
      <h4>{libro.titulo || loan.titulo || "Título desconocido"}</h4>
      <p>
        <strong>Autor:</strong> {libro.autor || loan.autor || "Sin autor"}
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
