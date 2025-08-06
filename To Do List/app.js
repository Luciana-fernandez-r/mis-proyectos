const input = document.getElementById('inputTarea');
const botonAgregar = document.getElementById('botonAgregar');
const contenedor = document.getElementById('contenedorTareas');

// Clase para cada item
class Item {
  constructor(texto) {
    this.crearElemento(texto);
  }

  crearElemento(texto) {
    const inputItem = document.createElement('input');
    inputItem.type = 'text';
    inputItem.className = 'form-control bg-dark text-white';
    inputItem.value = texto;
    inputItem.disabled = true;

    const botonEditar = document.createElement('button');
    botonEditar.className = 'btn btn-outline-info';
    botonEditar.innerHTML = '<i class="fas fa-lock"></i>';

    const botonEliminar = document.createElement('button');
    botonEliminar.className = 'btn btn-danger';
    botonEliminar.innerHTML = '<i class="fas fa-trash"></i>';

    const botones = document.createElement('div');
    botones.className = 'btn-group';
    botones.appendChild(botonEditar);
    botones.appendChild(botonEliminar);

    const divItem = document.createElement('div');
    divItem.className = 'd-flex gap-2 align-items-center';
    divItem.appendChild(inputItem);
    divItem.appendChild(botones);

    contenedor.appendChild(divItem);

    // Botón editar
    botonEditar.addEventListener('click', () => {
      inputItem.disabled = !inputItem.disabled;
      botonEditar.innerHTML = inputItem.disabled
        ? '<i class="fas fa-lock"></i>'
        : '<i class="fas fa-lock-open"></i>';

      if (inputItem.disabled) guardarEnStorage();
    });

    // Botón eliminar
    botonEliminar.addEventListener('click', () => {
      contenedor.removeChild(divItem);
      guardarEnStorage();
    });
  }
}

// Verifica que el input no esté vacío
function chequearInput() {
  const texto = input.value.trim();
  if (texto !== '') {
    new Item(texto);
    input.value = '';
    guardarEnStorage();
  }
}

// Guarda todas las tareas en localStorage
function guardarEnStorage() {
  const tareas = [];
  document.querySelectorAll('.item-input, .form-control.bg-dark').forEach(input => {
    tareas.push(input.value);
  });
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Carga las tareas desde localStorage
window.addEventListener('DOMContentLoaded', () => {
  const guardadas = JSON.parse(localStorage.getItem('tareas')) || [];
  guardadas.forEach(tarea => new Item(tarea));
});

// Evento click en botón +
botonAgregar.addEventListener('click', chequearInput);

