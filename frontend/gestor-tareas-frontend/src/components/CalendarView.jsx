import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getTasks } from "../api";

export default function CalendarView({ onDateSelect }) {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    getTasks().then(setTasks).catch(console.error);
  }, []);

  const tasksByDate = tasks.reduce((acc, t) => {
    const d = new Date(t.due_date).toDateString();
    if (!acc[d]) acc[d] = [];
    acc[d].push(t);
    return acc;
  }, {});

  return (
    <div className="mb-6 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-4">
        <Calendar
          onChange={(d) => {
            const dateStr = d.toDateString();
            setSelectedDate(d);
            onDateSelect(tasksByDate[dateStr] || []);
          }}
          value={selectedDate}
          tileContent={({ date, view }) => {
            const tasksOnDate = tasksByDate[date.toDateString()] || [];
            if (view === "month" && tasksOnDate.length) {
              const max = tasksOnDate.reduce((a, b) =>
                a.priority > b.priority ? a : b
              );
              const cls = {
                alta: "tile-high",
                media: "tile-medium",
                baja: "tile-low",
              }[max.priority];
              return <span className={`${cls} block text-center`}>{tasksOnDate.length}</span>;
            }
            return null;
          }}
        />
      </div>
      <div className="mt-2 text-center text-gray-600 max-w-xl">
        {selectedDate
          ? `Mostrando tareas del ${selectedDate.toLocaleDateString()}`
          : "Selecciona una fecha para filtrar"}
      </div>
    </div>
  );
}
