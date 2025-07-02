import { useState } from "react";

export default function Filters({ onFilterChange }) {
  const [status, setStatus] = useState("todos");
  const [priority, setPriority] = useState("todos");

  // Al cambiar estado o prioridad, avisamos al padre
  const notify = (newStatus, newPriority) => {
    onFilterChange({ status: newStatus, priority: newPriority });
  };

  return (
    <div className="flex gap-4 mb-4">
      <div>
        <label className="font-semibold mr-2">Estado:</label>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            notify(e.target.value, priority);
          }}
          className="border rounded p-1"
        >
          <option value="todos">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="completado">Completado</option>
        </select>
      </div>
      <div>
        <label className="font-semibold mr-2">Prioridad:</label>
        <select
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            notify(status, e.target.value);
          }}
          className="border rounded p-1"
        >
          <option value="todos">Todos</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>
    </div>
  );
}
