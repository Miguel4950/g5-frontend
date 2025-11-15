import TopBar from "../components/TopBar";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <TopBar />
      <section className="hero">
        <div className="hero-content">
          <p className="badge">Biblioteca inteligente</p>
          <h1>Explora, reserva y administra tus préstamos en minutos</h1>
          <p className="muted hero-text">
            Accede a más de 100 títulos, controla tu historial y gestiona las
            solicitudes desde cualquier dispositivo.
          </p>
          <div className="hero-actions">
            <button onClick={() => navigate("/login")}>Iniciar sesión</button>
            <button className="ghost" onClick={() => navigate("/catalog")}>
              Explorar catálogo
            </button>
          </div>
        </div>
        <div className="hero-panel">
          <ul>
            <li>Préstamos en línea aprobados por bibliotecarios</li>
            <li>Reservas automáticas y notificaciones</li>
            <li>Panel de control para estudiantes y staff</li>
          </ul>
        </div>
      </section>
    </>
  );
}
