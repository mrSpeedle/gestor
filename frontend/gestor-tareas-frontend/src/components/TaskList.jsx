import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { getTasks, deleteTask , updateTask } from "../api";

const TaskList = forwardRef(({ filter = null, extraFilter }, ref) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ title: "", due_date: "", priority: "" });

  const reload = () => {
    getTasks().then(setTasks).catch(err => console.error("Error cargando tareas:", err));
  };

  useImperativeHandle(ref, () => ({ reload }));
  useEffect(reload, []);

  const displayTasksRaw = filter === null ? tasks : filter;
  const displayTasks = extraFilter ? extraFilter(displayTasksRaw) : displayTasksRaw;

  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === "pendiente" ? "completado" : "pendiente";
      await updateTask(task.id, {
  ...task,
  status: newStatus
});
      reload();
    } catch (e) {
      console.error("Error actualizando estado:", e);
      alert("No se pudo cambiar el estado de la tarea.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta tarea?")) return;
    try {
      await deleteTask(id);
      reload();
    } catch (e) {
      console.error("Error eliminando tarea:", e);
      alert("No se pudo eliminar la tarea.");
    }
  };

  // 🖊️ Función para abrir modal de edición
  const openEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      due_date: task.due_date.split("T")[0],
      priority: task.priority,
    });
  };

  // 📝 Guardar cambios en modal
  const saveEdit = async () => {
    try {
      await updateTask(editingTask.id, {
        ...editingTask,
        title: formData.title.trim(),
        due_date: formData.due_date,
        priority: formData.priority,
      });
      reload();
      setEditingTask(null);
    } catch (e) {
      console.error("Error editando tarea:", e);
      alert("No se pudo guardar los cambios.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Lista de Tareas</h2>

      {editingTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Editar Tarea</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm">Título</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Fecha</label>
                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={e => setFormData({ ...formData, due_date: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Prioridad</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={e => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full border p-2 rounded"
                >
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setEditingTask(null)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={saveEdit}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {displayTasks.length === 0 ? (
        <p className="text-gray-500">
          {filter ? "No hay tareas en esta fecha." : "No hay tareas todavía."}
        </p>
      ) : (
        <ul className="space-y-2">
          {displayTasks.map((task) => (
            <li
              key={task.id}
              className={`bg-gray-100 p-3 rounded border flex justify-between items-center ${
                task.status === "completado" ? "opacity-70" : ""
              }`}
            >
              <div>
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-gray-600">
                  Fecha: {task.due_date.split("T")[0]} · Prioridad: {task.priority} · Estado:{" "}
                  <span className={task.status === "completado" ? "text-green-600" : "text-gray-600"}>
                    {task.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => toggleStatus(task)}
                >
                  {task.status === "pendiente" ? "Marcar completado" : "Marcar pendiente"}
                </button>
                <button
                  className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={() => openEdit(task)}
                >
                  Editar
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(task.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default TaskList;
