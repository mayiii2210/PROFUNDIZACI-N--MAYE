import { useState } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const añadirTarea = () => {
    const texto = inputValue.trim();
    if (texto === "") {
      alert("Escribe tú tarea");
      return;
    }
    const nuevaTarea = { id: Date.now(), texto, finalizada: false };
    setTasks([...tasks, nuevaTarea]);
    setInputValue(""); 
  };

  const administrarTarea = (id, accion) => {
    if (accion === "eliminar") {
      setTasks(tasks.filter((task) => task.id !== id));
    } else if (accion === "toggle") {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, finalizada: !task.finalizada } : task
        )
      );
    }
  };

  return (
    <div className="app">
      <div className="container_class">
        <h1>¡Agrega tu tarea!</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Escribe tú tarea..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={añadirTarea}>Agregar</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={task.finalizada ? "Finalizada" : ""}
              onClick={() => administrarTarea(task.id, "toggle")}
            >
              {task.texto}
              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  administrarTarea(task.id, "eliminar");
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
