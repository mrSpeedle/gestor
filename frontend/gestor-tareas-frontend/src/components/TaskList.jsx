import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { getTasks, updateTaskStatus, deleteTask } from "../api";

const TaskList = forwardRef(({ filter = null, extraFilter }, ref) => {
  const [tasks, setTasks] = useState([]);

  const reload = () => {
    getTasks().then(setTasks).catch(console.error);
  };

  useImperativeHandle(ref, () => ({ reload }));
  useEffect(reload, []);

  const displayTasksRaw = filter === null ? tasks : filter;
  const displayTasks = extraFilter ? extraFilter(displayTasksRaw) : displayTasksRaw;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Lista de Tareas</h2>
      {displayTasks.length === 0 ? (
        <p className="text-gray-500">{filter ? "No hay tareas en esta fecha." : "No hay tareas todavía."}</p>
      ) : (
        <ul className="space-y-2">
          {displayTasks.map((task) => (
            <li key={task.id} className="bg-gray-100 p-3 rounded border flex justify-between items-center">
              <div>
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-gray-600">
                  Fecha: {task.due_date.split("T")[0]} · Prioridad: {task.priority} · Estado: {task.status}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-green-600 hover:underline"
                  onClick={async () => {
                    await updateTaskStatus(
                      task.id,
                      task.status === "pendiente" ? "completado" : "pendiente"
                    );
                    reload();
                  }}
                >
                  {task.status === "pendiente" ? "Marcar completado" : "Marcar pendiente"}
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={async () => {
                    if (window.confirm("¿Seguro que deseas eliminar esta tarea?")) {
                      await deleteTask(task.id);
                      reload();
                    }
                  }}
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
