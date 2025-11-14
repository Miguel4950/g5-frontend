import { useEffect, useState } from "react";

export default function BookFormModal({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState({
    isbn: "", titulo: "", autor: "", categoria: "",
    anio: "", cantidad_total: 1, portada_url: "", descripcion: ""
  });

  useEffect(() => { if (initial) setForm(initial); }, [initial]);
  if (!open) return null;

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validar = () => {
    if (!form.titulo || !form.autor || !form.isbn) return "ISBN, Título y Autor son obligatorios";
    if (String(form.isbn).length < 8) return "ISBN parece inválido";
    return null;
  };

  const submit = () => {
    const err = validar();
    if (err) return alert(err);
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 space-y-4">
        <h3 className="text-xl font-semibold">{initial ? "Editar libro" : "Agregar libro"}</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input className="input" name="isbn" placeholder="ISBN" value={form.isbn} onChange={handle}/>
          <input className="input" name="titulo" placeholder="Título" value={form.titulo} onChange={handle}/>
          <input className="input" name="autor" placeholder="Autor" value={form.autor} onChange={handle}/>
          <input className="input" name="categoria" placeholder="Categoría" value={form.categoria} onChange={handle}/>
          <input className="input" name="anio" placeholder="Año" value={form.anio} onChange={handle}/>
          <input className="input" type="number" name="cantidad_total" placeholder="Cantidad total" value={form.cantidad_total} onChange={handle}/>
          <input className="input md:col-span-2" name="portada_url" placeholder="URL portada" value={form.portada_url} onChange={handle}/>
        </div>

        <textarea className="input w-full" rows={3} name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handle}/>

        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 rounded-xl border" onClick={onClose}>Cancelar</button>
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white" onClick={submit}>
            {initial ? "Guardar cambios" : "Crear libro"}
          </button>
        </div>
      </div>
      <style>{`.input{ @apply border rounded-xl px-3 py-2 w-full; }`}</style>
    </div>
  );
}
