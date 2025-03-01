const input = document.getElementById("task");
const buttonAgr = document.getElementById("add_button");
const list = document.getElementById("list");

buttonAgr.addEventListener("click", añadirTarea);
list.addEventListener("click", administrarTarea);

function añadirTarea() {
  const texto = input.value.trim();
  if (texto === "") return alert("Escribe tú tarea");

  const li = document.createElement("li");
  li.textContent = texto;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "X";

  li.appendChild(btnEliminar);
  list.appendChild(li);
  input.value = "";

}

function administrarTarea(e) {
  console.log(e.target);
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  } else {
    e.target.classList.toggle("Finalizada");
  }
}
