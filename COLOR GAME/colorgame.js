// VARIABLES GLOBALES
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("message");
const h1 = document.getElementById("h1");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");

let numberOfSquares = 6;
let colors = [];
let pickedColor;

// INICIALIZADOR
init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

// CONFIGURA LOS BOTONES EASY / HARD
function setupModeButtons() {
  modeButtons.forEach(button => {
    button.addEventListener("click", function () {
      modeButtons.forEach(btn => btn.classList.remove("selected"));
      this.classList.add("selected");
      numberOfSquares = this.textContent === "Easy" ? 3 : 6;
      reset();
    });
  });
}

// CONFIGURA LOS CUADRADOS
function setupSquares() {
  squares.forEach(square => {
    square.addEventListener("click", function () {
      const clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "¡Correcto!";
        resetButton.textContent = "Jugar otra vez";
        changeColors(pickedColor);
        h1.style.backgroundColor = pickedColor;
      } else {
        this.style.opacity = "0";
        messageDisplay.textContent = "¡Inténtalo nuevamente!";
      }
    });
  });
}

// REINICIA EL JUEGO
function reset() {
  colors = generateRandomColors(numberOfSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  resetButton.textContent = "Nuevos Colores";
  h1.style.backgroundColor = "steelblue";

  squares.forEach((square, i) => {
    if (colors[i]) {
      square.style.display = "block";
      square.style.backgroundColor = colors[i];
      square.style.opacity = "1";
    } else {
      square.style.display = "none";
    }
  });
}

// CAMBIA TODOS LOS CUADRADOS AL COLOR CORRECTO
function changeColors(color) {
  squares.forEach(square => {
    square.style.backgroundColor = color;
    square.style.opacity = "1";
  });
}

// SELECCIONA COLOR GANADOR
function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// GENERA ARREGLO DE COLORES ALEATORIOS
function generateRandomColors(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(randomColor());
  }
  return arr;
}

// GENERA UN COLOR RGB ALEATORIO
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// BOTÓN "NUEVOS COLORES"
resetButton.addEventListener("click", reset);

