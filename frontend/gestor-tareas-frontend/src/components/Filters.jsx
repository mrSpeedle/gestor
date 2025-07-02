export default function Filters({ onFilterChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="flex justify-center gap-4 my-4">
      <select
        name="status"
        onChange={handleChange}
        className="border rounded p-2"
      >
        <option value="todos">Estado: Todos</option>
        <option value="pendiente">Pendientes</option>
        <option value="completado">Completados</option>
      </select>
      <select
        name="priority"
        onChange={handleChange}
        className="border rounded p-2"
      >
        <option value="todos">Prioridad: Todas</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
    </div>
  );
}
