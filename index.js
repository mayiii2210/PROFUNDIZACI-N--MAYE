// VARIABLES EN JAVASCRIPT 📍📍

// Var: Se puede reasignar y redeclarar
// Let: Se puede reasignar pero no redeclarar
// Const: No se puede reasignar ni redeclarar


// TIPOS DE DATOS EN JAVASCRIPT 📍📍

// String: Cadena de texto
// Number: Número
// Boolean: Verdadero o falso
// Null: Valor nulo
// Undefined: Valor indefinido
// Object: Objeto
// Symbol: Valor único

let nombres = "Maye Salas";
var edades = 18;
const cualquiercosa = 19;
let activo = true;
let variablenula = null;
let indefinido;
// cualquiercosa = "Salas";

//MOSTRAR EN CONSOLA 📋📋
console.log(nombres);
console.log(edades);
console.log(cualquiercosa);

console.log(typeof activo);
console.log(typeof variablenula);
console.log(typeof indefinido);

console.log(10 + 5);

console.log(10 == "10");
console.log(10 === "10");

// OPERADORES DE COMPARACIÓN (TERNARIOS) 🧐🧐
let mensaje = edades >= 18 ? "Mayor de edad" : "Menor de edad";
console.log(mensaje);

// FUNCIONES EN JAVASCRIPT 📝📝
function saludar(nombres, edades) {
  return "Hola " + nombres + " tienes " + edades + " años";
}

console.log(saludar(nombres, edades));

// CONSTANTES EN JAVASCRIPT ⛓️⛓️
const PI = 3.1416;
const sumar = (a, b) => a + b;

console.log(sumar(11, 5));

// ARREGLOS EN JAVASCRIPT 📦📦
let frutas = ["Mango", "Fresa", "Piña"];

console.log(frutas);

// AGREGAR ELEMENTOS AL ARREGLO 🧾🧾
frutas.push("Mandarina");

console.log(frutas);

// ELIMINAR ELEMENTOS DEL ARREGLO 📥📥
frutas.pop();

console.log(frutas);

// OBTENER EL TAMAÑO DE UN ARREGLO 📏📏
console.log(frutas.length);

// RECORRER UN ARREGLO 🔄🔄
frutas.push("Sandía");

// FILTRAR UN ARREGLO 📤📤
let filtrar = frutas.filter((f) => f.startsWith("M"));
console.log(filtrar);

// MAP EN JAVASCRIPT 🗺️🗺️
let persona = {
  nombre: "Mayii",
  edad: 18,
  saludar: function () {
    console.log(`Hola ${this.nombre}, edad ${this.edad}`);
  },
};

persona.saludar();

persona.nombre = "Mayii Salas";

console.log(persona);

const { nombre, edad } = persona;

console.log(persona.nombre);
console.log(nombre);

// FUNCIÓN: Simula una tarea asíncrona con un retraso
function esperar() {
  return new Promise((resolver) => {
    setTimeout(() => {
      resolver("Hecho");
    }, 2000);
  });
}

// FUNCIÓN ASÍNCRONA: Ejecuta la espera y muestra un mensaje 🔒🔒
async function ejecutar() {
  console.log("Esperando...");
  let resultado = await esperar();
  console.log(resultado);
}

ejecutar(); 

// BOTÓN EN JAVASCRIPT 🖲️🖲️
let elemento = document.getElementById("boton");
console.log(elemento);

elemento.addEventListener("click", () => {
  alert("¡Haz hecho clic en el botón!");
});

// FETCH: Obtener datos de una API 🌐🌐
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    console.log("Datos obtenidos de la API:", data);
  });

// FUNCIÓN ASÍNCRONA CON FETCH 
async function llamarapi() {
  try {
    let respuesta = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    ).then((response) => response.json());
    console.log("Datos obtenidos con async/await:", respuesta);
  } catch (error) {
    console.log("Error al obtener los datos: " + error);
  }
}

llamarapi(); 

// CLASE: Ejemplo de clase Animal
class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hacerSonido() {
    console.log(`${this.nombre} hace sonido`);
  }
}

let perro = new Animal("Gato");
perro.hacerSonido();

// LOCALSTORAGE: Almacenando y obteniendo un dato
localStorage.setItem("usuario", "Maye");
console.log("Usuario almacenado:", localStorage.getItem("usuario"));




// CALCULADORA EN JAVASCRIPT TAREA 🧮🧮
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const operacion = document.getElementById("operacion");
const resultado = document.getElementById("resultado");

function calcular() {
  const numero1 = parseFloat(num1.value);
  const numero2 = parseFloat(num2.value); 
  const tipoOperacion = operacion.value;

  if (isNaN(numero1) || isNaN(numero2)) {
    resultado.textContent = "Por favor ingresa números válidos.";
    return;
  }

  let resultadoOperacion;

 // REALIZAR OPERACIONES MATEMÁTICAS
  switch (tipoOperacion) {
    case "sumar":
      resultadoOperacion = numero1 + numero2;
      break;
    case "restar":
      resultadoOperacion = numero1 - numero2;
      break;
    case "multiplicar":
      resultadoOperacion = numero1 * numero2;
      break;
    case "dividir":
      if (numero2 === 0) {
        resultado.textContent = "Error: División entre 0 no permitida.";
        return;
      }
      resultadoOperacion = numero1 / numero2;
      break;
    case "potencia":
      resultadoOperacion = Math.pow(numero1, numero2);
      break;
    default:
      resultadoOperacion = "Operación no válida.";
  }

  resultado.textContent = resultadoOperacion;
}

document.getElementById("calcular").addEventListener("click", calcular);
