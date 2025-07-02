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
    <div className="mb-6">
      <Calendar
        onChange={(d) => {
          const dateStr = d.toDateString();
          setSelectedDate(d);
          onDateSelect(tasksByDate[dateStr] || []);
        }}
        value={selectedDate}
        tileContent={({ date, view }) =>
          view === "month" && tasksByDate[date.toDateString()] ? (
            <span className="block bg-blue-300 rounded-full text-white text-xs text-center">
              {tasksByDate[date.toDateString()].length}
            </span>
          ) : null
        }
      />
      <div className="mt-2 text-center text-gray-600">
        {selectedDate
          ? `Mostrando tareas del ${selectedDate.toLocaleDateString()}`
          : "Selecciona una fecha para filtrar"}
      </div>
    </div>
  );
}
