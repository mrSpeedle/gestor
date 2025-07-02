import { useState } from "react";
import { createTask } from "../api";

export default function TaskForm({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    due_date: "",
    priority: "media",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.title.trim()) {
      setError("Título requerido.");
      return;
    }
    if (new Date(form.due_date) <= new Date()) {
      setError("La fecha debe ser futura.");
      return;
    }
    try {
      await createTask({ ...form, status: "pendiente" });
      setForm({ title: "", due_date: "", priority: "media" });
      onCreated(); // avisar al padre de la nueva tarea
    } catch (err) {
      setError(err.message || "Error al crear tarea");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow mb-6">
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="mb-3">
        <label className="block font-semibold">Título</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block font-semibold">Fecha</label>
        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block font-semibold">Prioridad</label>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
        Crear tarea
      </button>
    </form>
  );
}
