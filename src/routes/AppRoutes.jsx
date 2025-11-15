import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

// Páginas públicas
import Catalog from "../pages/Catalog";
import BookDetail from "../pages/BookDetail";

// Páginas de autenticación (las agregarás luego)
import Login from "../pages/Login";
import Register from "../pages/Register";

// Dashboards
import StudentDashboard from "../pages/StudentDashboard";
import LibrarianDashboard from "../pages/LibrarianDashboard";

// Componentes comunes
import Loader from "../components/Loader";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------------------------------- */}
        {/*  RUTAS PÚBLICAS                  */}
        {/* ---------------------------------- */}

        <Route path="/" element={<Catalog />} />

        <Route path="/catalog" element={<Catalog />} />

        <Route path="/book/:id" element={<BookDetail />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* ---------------------------------- */}
        {/*  RUTAS PROTEGIDAS POR LOGIN      */}
        {/* ---------------------------------- */}
        <Route element={<ProtectedRoute />}>
          
          {/* Dashboard del estudiante */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />

          {/* Dashboard del bibliotecario */}
          <Route element={<RoleRoute allowedRoles={['librarian','admin']}/>}>
            <Route path="/librarian/dashboard" element={<LibrarianDashboard />} />
          </Route>

        </Route>


        {/* ---------------------------------- */}
        {/*  RUTA PARA PÁGINAS NO ENCONTRADAS */}
        {/* ---------------------------------- */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
