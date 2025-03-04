const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

// Cargar tareas al iniciar
loadTasks();

// Función para agregar una tarea
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    alert("Por favor ingrese la tarea");
    return;
  }

  addTaskToList(taskText);
  taskInput.value = "";
  saveTasksToLocalStorage();
});

// Función para manejar eventos en la lista de tareas
taskList.addEventListener("click", (event) => {
  const clickedElement = event.target;

  // Eliminar tarea
  if (clickedElement.classList.contains("delete")) {
    clickedElement.closest("li").remove();
    saveTasksToLocalStorage();
  }
  
  // Editar tarea
  else if (clickedElement.classList.contains("edit")) {
    const li = clickedElement.closest("li");
    const span = li.querySelector("span");
    const newText = prompt("Editar tarea:", span.textContent);
    if (newText !== null) {
      span.textContent = newText;
      saveTasksToLocalStorage();
    }
  }
  // Marcar como completada
  else if (clickedElement.tagName === "SPAN") {
    clickedElement.classList.toggle("complete");
    saveTasksToLocalStorage();
  }
});

// Función para agregar una tarea a la lista
function addTaskToList(taskText, isCompleted = false) {
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <span class="${isCompleted ? "complete" : ""}">${taskText}</span>
    <div class="botones">
      <button class='edit'>Edit</button>
      <button class='delete'>X</button>
    </div>
  `;
  taskList.appendChild(taskItem);
}

// Función para guardar tareas en el localStorage
function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    const text = li.querySelector("span").textContent;
    const isCompleted = li.querySelector("span").classList.contains("complete");
    tasks.push({ text, isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Función para cargar tareas desde el localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTaskToList(task.text, task.isCompleted);
  });
}