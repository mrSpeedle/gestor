import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import CalendarView from "./components/CalendarView";
import { useRef, useState } from "react";
import Filters from "./components/Filters";
// ...

function App() {
  const listRef = useRef();
  const [filteredTasks, setFilteredTasks] = useState(null);
  const [filterParams, setFilterParams] = useState({
    status: "todos",
    priority: "todos",
  });

  const applyFilters = (tasks) => {
    return tasks.filter((t) => {
      const okStatus = filterParams.status === "todos" || t.status === filterParams.status;
      const okPriority = filterParams.priority === "todos" || t.priority === filterParams.priority;
      return okStatus && okPriority;
    });
  };

  const handleFilterChange = (params) => {
    setFilterParams(params);
    // recargamos la lista, luego ésta aplicará filtro
    listRef.current?.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Gestor de Tareas</h1>
        <TaskForm onCreated={() => listRef.current?.reload()} />
        <CalendarView onDateSelect={(tasks) => setFilteredTasks(tasks)} />
        <Filters onFilterChange={handleFilterChange} />
        <TaskList ref={listRef} filter={filteredTasks} extraFilter={applyFilters} />
      </div>
    </div>
  );
}
export default App;