export default function BookTable({ books, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="th">Título</th>
            <th className="th">Autor</th>
            <th className="th">Categoría</th>
            <th className="th">Año</th>
            <th className="th">Disp.</th>
            <th className="th"></th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="td">{b.titulo}</td>
              <td className="td">{b.autor}</td>
              <td className="td">{b.categoria}</td>
              <td className="td">{b.anio}</td>
              <td className="td">{(b.cantidad_disponible ?? b.cantidad_total)}/{b.cantidad_total}</td>
              <td className="td text-right">
                <button className="btn" onClick={() => onEdit(b)}>Editar</button>
                <button className="btn danger ml-2" onClick={() => onDelete(b)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`
        .th{ @apply text-left px-4 py-3 font-medium text-gray-600;}
        .td{ @apply px-4 py-3;}
        .btn{ @apply px-3 py-1.5 rounded-xl border;}
        .btn.danger{ @apply border-red-600 text-red-600;}
      `}</style>
    </div>
  );
}
