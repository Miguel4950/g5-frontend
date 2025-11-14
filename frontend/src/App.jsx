import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import BibliotecarioDashboard from "./pages/BibliotecarioDashboard";
import GestionLibros from "./pages/GestionLibros";
import RequireRole from "./auth/RequireRole";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b p-4 flex gap-4">
        <Link to="/">Dashboard</Link>
        <Link to="/libros">Gestión de Libros</Link>
      </nav>
      <main className="max-w-6xl mx-auto">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<RequireRole role="bibliotecario"><BibliotecarioDashboard/></RequireRole>} />
            <Route path="/libros" element={<RequireRole role="bibliotecario"><GestionLibros/></RequireRole>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}
