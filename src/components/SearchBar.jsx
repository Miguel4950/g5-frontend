// src/components/SearchBar.jsx
import { useEffect, useState } from "react";

export default function SearchBar({
  onSearch,
  placeholder = "Buscar...",
  value,
  onChange,
}) {
  const [term, setTerm] = useState(value || "");

  useEffect(() => {
    if (value !== undefined) {
      setTerm(value);
    }
  }, [value]);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(term.trim());
  }

  const handleChange = (e) => {
    setTerm(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 12 }}>
      <input
        type="text"
        placeholder={placeholder}
        value={term}
        onChange={handleChange}
        style={{ padding: 8, width: "70%", marginRight: 8 }}
      />
      <button type="submit">Buscar</button>
      <button type="button" onClick={() => { setTerm(""); onSearch(""); }} style={{ marginLeft: 8 }}>
        Limpiar
      </button>
    </form>
  );
}
