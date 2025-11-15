import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import LoanCard from "../components/LoanCard";
import Loader from "../components/Loader";
import { catalogApi, loansApi } from "../services/api";

const normalizeArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.content)) return payload.content;
  return [];
};

export default function StudentDashboard() {
  const [books, setBooks] = useState([]);
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setMessage("");
    try {
      const [booksRes, loansRes] = await Promise.all([
        catalogApi.get("", { params: { size: 12 } }),
        loansApi.get("/my-loans"),
      ]);
      setBooks(normalizeArray(booksRes.data));
      setLoans(normalizeArray(loansRes.data?.prestamos_activos));
    } catch (error) {
      setMessage("No pudimos cargar el panel. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = useMemo(() => {
    return books.filter((b) =>
      (b?.titulo || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [books, search]);

  const handleReturn = async (loanId) => {
    try {
      await loansApi.put(`/${loanId}/return`);
      setMessage("Registro actualizado. ¡Gracias por devolver el libro!");
      loadData();
    } catch (error) {
      setMessage("No se pudo registrar la devolución.");
    }
  };

  const handleRenew = async (loanId) => {
    try {
      await loansApi.put(`/${loanId}/renew`);
      setMessage("Préstamo renovado. Disfruta tu lectura.");
      loadData();
    } catch (error) {
      setMessage("No fue posible renovar este préstamo.");
    }
  };

  const renderLoanActions = (loan) => {
    const estado = String(
      loan.estado || loan.estadoNombre || loan.status || ""
    ).toLowerCase();
    const id = loan.id || loan.id_prestamo;
    const canReturn =
      estado === "activo" || estado === "vencido" || estado === "solicitado";
    const canRenew = estado === "activo";
    if (!canReturn && !canRenew) return null;
    return (
      <>
        {canReturn && (
          <button onClick={() => handleReturn(id)} className="ghost">
            Marcar como devuelto
          </button>
        )}
        {canRenew && (
          <button onClick={() => handleRenew(id)}>Renovar 7 días</button>
        )}
      </>
    );
  };

  const quickStats = [
    {
      label: "Préstamos activos",
      value: loans.filter(
        (loan) =>
          String(loan.estado || loan.estadoNombre || "").toLowerCase() ===
          "activo"
      ).length,
    },
    {
      label: "Pendientes",
      value: loans.filter(
        (loan) =>
          String(loan.estado || loan.estadoNombre || "").toLowerCase() ===
          "solicitado"
      ).length,
    },
    {
      label: "Vencidos",
      value: loans.filter(
        (loan) =>
          String(loan.estado || loan.estadoNombre || "").toLowerCase() ===
          "vencido"
      ).length,
    },
  ];

  return (
    <DashboardLayout
      title="Panel del Estudiante"
      subtitle="Administra tus lecturas y controla tus solicitudes."
      actions={
        <button onClick={() => navigate("/catalog")}>
          Abrir catálogo completo
        </button>
      }
    >
      {message && <div className="alert">{message}</div>}

      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="card-grid">
            {quickStats.map((stat) => (
              <article key={stat.label} className="summary-card">
                <span className="muted">{stat.label}</span>
                <strong>{stat.value}</strong>
              </article>
            ))}
          </section>

          <section className="card">
            <div className="section-header">
              <div>
                <h3>Explorar libros rápidamente</h3>
                <p className="muted">
                  Busca títulos para solicitar un préstamo inmediato.
                </p>
              </div>
              <button onClick={() => navigate("/catalog")} className="ghost">
                Ver todo el catálogo
              </button>
            </div>
            <SearchBar value={search} onChange={setSearch} />
            <div className="grid">
              {filteredBooks.slice(0, 6).map((book) => (
                <BookCard key={book.id || book.id_libro || book.isbn} book={book} />
              ))}
            </div>
          </section>

          <section className="card">
            <div className="section-header">
              <div>
                <h3>Mis préstamos</h3>
                <p className="muted">
                  Revisa el estado y gestiona tus lecturas desde aquí.
                </p>
              </div>
              <button onClick={loadData} className="ghost">
                Actualizar lista
              </button>
            </div>
            {loans.length === 0 ? (
              <p className="muted">
                No tienes préstamos activos. Ve al catálogo y solicita uno.
              </p>
            ) : (
              loans.map((loan) => (
                <LoanCard
                  key={loan.id || loan.id_prestamo}
                  loan={loan}
                  actions={renderLoanActions(loan)}
                />
              ))
            )}
          </section>
        </>
      )}
    </DashboardLayout>
  );
}
