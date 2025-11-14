import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { catalogApi } from "../services/api";
import Loader from "../components/Loader";
import { requestLoan } from "../store/loansSlice";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const loansLoading = useSelector((state) => state.loans.loading);

  useEffect(() => {
    catalogApi
      .get(`/${id}`)
      .then((res) => setBook(res.data))
      .catch(console.error);
  }, [id]);

  if (!book) return <Loader />;

  const handleRequestLoan = () => {
    if (!authUser) {
      window.location.href = "/login";
      return;
    }
    dispatch(requestLoan({ libroId: book.id }))
      .unwrap()
      .then(() => alert("Solicitud enviada"))
      .catch((err) =>
        alert("Error solicitando préstamo: " + (err?.message || ""))
      );
  };

  return (
    <div className="page">
      <h2>{book.titulo}</h2>
      <p>
        <strong>Autor:</strong> {book.autor}
      </p>
      <p>
        <strong>Descripción:</strong> {book.descripcion}
      </p>
      <p>
        <strong>Disponibles:</strong> {book.cantidadDisponible}
      </p>

      <button onClick={handleRequestLoan} disabled={loansLoading}>
        {loansLoading ? "Enviando..." : "Solicitar Préstamo"}
      </button>
    </div>
  );
}
