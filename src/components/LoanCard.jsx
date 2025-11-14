export default function LoanCard({ loan }) {
  const libro = loan.libro || loan.book || {};
  const fechaSolicitud =
    loan.fecha_prestamo || loan.fechaSolicitud || loan.createdAt;
  const fechaDevolucion =
    loan.fecha_devolucion_esperada || loan.fechaDevolucion || null;
  const estado = loan.estado || loan.estadoNombre || loan.status || "pendiente";

  return (
    <div
      className="loan-card"
      style={{ border: "1px solid #ddd", padding: 12, borderRadius: 6, marginBottom: 8 }}
    >
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
      <p>
        <strong>Estado:</strong> {estado}
      </p>
    </div>
  );
}
