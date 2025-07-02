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
      onCreated(); 
    } catch (err) {
      setError(err.message || "Error al crear tarea");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg px-6 py-4 mb-6"
    >
      {error && (
        <div className="text-red-600 bg-red-100 p-2 rounded mb-4">
          {error}
        </div>
      )}

      {/* Título */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Título</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          required
        />
      </div>

      {/* Fecha */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Fecha</label>
        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          required
        />
      </div>

      {/* Prioridad */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Prioridad
        </label>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow"
      >
        Crear tarea
      </button>
    </form>
  );
}
