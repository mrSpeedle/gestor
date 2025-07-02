import Header from "./components/Header";
import FooterNav from "./components/FooterNav";
import TaskForm from "./components/TaskForm";
import CalendarView from "./components/CalendarView";
import Filters from "./components/Filters";
import TaskList from "./components/TaskList";
import { useRef, useState } from "react";

function App() {
  const listRef = useRef();
  const [filteredTasks, setFilteredTasks] = useState(null);
  const [filterParams, setFilterParams] = useState({
    status: "todos",
    priority: "todos",
  });

  const handleFilterChange = (params) => {
    setFilterParams(params);
    listRef.current?.reload();
  };

  const applyFilters = (tasks) =>
    tasks.filter(
      (t) =>
        (filterParams.status === "todos" || t.status === filterParams.status) &&
        (filterParams.priority === "todos" || t.priority === filterParams.priority)
    );

  return (
    <div className="min-h-screen pb-16 bg-gray-100"> {/* pb-16 da espacio al footer */}
      <Header />
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-4">
        <TaskForm onCreated={() => listRef.current?.reload()} />
        <CalendarView onDateSelect={(tasks) => setFilteredTasks(tasks)} />
        <Filters onFilterChange={handleFilterChange} />
        <TaskList ref={listRef} filter={filteredTasks} extraFilter={applyFilters} />
      </div>
      <FooterNav />
    </div>
  );
}

export default App;
