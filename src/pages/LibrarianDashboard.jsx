import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import LoanCard from "../components/LoanCard";
import Loader from "../components/Loader";
import { loansApi } from "../services/api";

const normalizeArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.content)) return payload.content;
  return [];
};

export default function LibrarianDashboard() {
  const [pending, setPending] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [active, setActive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setMessage("");
    try {
      const [pendingRes, activeRes, overdueRes] = await Promise.all([
        loansApi.get("", { params: { estado: 1 } }),
        loansApi.get("", { params: { estado: 2 } }),
        loansApi.get("/overdue"),
      ]);
      setPending(normalizeArray(pendingRes.data));
      setActive(normalizeArray(activeRes.data));
      setOverdue(normalizeArray(overdueRes.data));
    } catch (error) {
      setMessage("No se pudo obtener la información del sistema.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (loanId) => {
    try {
      await loansApi.put(`/${loanId}/approve`);
      setMessage("Préstamo aprobado correctamente.");
      loadData();
    } catch (error) {
      setMessage("No fue posible aprobar el préstamo.");
    }
  };

  const handleForceReturn = async (loanId) => {
    try {
      await loansApi.put(`/${loanId}/return`);
      setMessage("Préstamo actualizado como devuelto.");
      loadData();
    } catch (error) {
      setMessage("No fue posible registrar la devolución.");
    }
  };

  const summary = useMemo(
    () => [
      { label: "Solicitudes pendientes", value: pending.length },
      { label: "Préstamos activos", value: active.length },
      { label: "Vencidos", value: overdue.length },
    ],
    [pending, active, overdue]
  );

  const renderPendingActions = (loan) => {
    const id = loan.id || loan.id_prestamo;
    return (
      <button onClick={() => handleApprove(id)}>Aprobar solicitud</button>
    );
  };

  const renderReturnAction = (loan) => {
    const id = loan.id || loan.id_prestamo;
    return (
      <button onClick={() => handleForceReturn(id)} className="ghost">
        Registrar devolución
      </button>
    );
  };

  return (
    <DashboardLayout
      title="Panel del Bibliotecario"
      subtitle="Supervisa préstamos, aprueba solicitudes y controla retrasos."
      actions={
        <button onClick={loadData} className="ghost">
          Actualizar datos
        </button>
      }
    >
      {message && <div className="alert">{message}</div>}

      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="card-grid">
            {summary.map((stat) => (
              <article key={stat.label} className="summary-card">
                <span className="muted">{stat.label}</span>
                <strong>{stat.value}</strong>
              </article>
            ))}
          </section>

          <section className="card">
            <div className="section-header">
              <div>
                <h3>Solicitudes pendientes</h3>
                <p className="muted">
                  Aprueba los préstamos solicitados por los estudiantes.
                </p>
              </div>
            </div>
            {pending.length === 0 ? (
              <p className="muted">No hay solicitudes por aprobar.</p>
            ) : (
              pending.map((loan) => {
                const prestamo = loan.prestamo || loan;
                return (
                  <LoanCard
                    key={prestamo.id || prestamo.id_prestamo}
                    loan={prestamo}
                    borrowerInfo={loan.usuario}
                    actions={renderPendingActions(prestamo)}
                  />
                );
              })
            )}
          </section>

          <section className="card">
            <div className="section-header">
              <div>
                <h3>Préstamos activos</h3>
                <p className="muted">
                  Puedes registrar devoluciones directamente desde aquí.
                </p>
              </div>
            </div>
            {active.length === 0 ? (
              <p className="muted">No hay préstamos activos actualmente.</p>
            ) : (
              active.map((loan) => {
                const prestamo = loan.prestamo || loan;
                return (
                  <LoanCard
                    key={prestamo.id || prestamo.id_prestamo}
                    loan={prestamo}
                    borrowerInfo={loan.usuario}
                    actions={renderReturnAction(prestamo)}
                  />
                );
              })
            )}
          </section>

          <section className="card warning">
            <div className="section-header">
              <div>
                <h3>Préstamos vencidos</h3>
                <p className="muted">
                  Envía recordatorios o registra devoluciones manuales.
                </p>
              </div>
            </div>
            {overdue.length === 0 ? (
              <p className="muted">No hay préstamos vencidos. ¡Excelente!</p>
            ) : (
              overdue.map((loan) => {
                const prestamo = loan.prestamo || loan;
                return (
                  <LoanCard
                    key={prestamo.id || prestamo.id_prestamo}
                    loan={prestamo}
                    borrowerInfo={loan.usuario}
                    actions={renderReturnAction(prestamo)}
                  />
                );
              })
            )}
          </section>
        </>
      )}
    </DashboardLayout>
  );
}
