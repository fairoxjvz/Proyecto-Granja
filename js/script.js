const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuButton && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  };

  menuButton.addEventListener('click', () => {
    const menuIsOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(menuIsOpen));
    menuButton.setAttribute('aria-label', menuIsOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  mainNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeMenu();
    }
  });

  document.addEventListener('click', (event) => {
    if (mainNav.classList.contains('open') && !menuButton.parentElement.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mainNav.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 850 && mainNav.classList.contains('open')) {
      closeMenu();
    }
  });
}

const tipButton = document.querySelector('#new-green-tip');
const tipOutput = document.querySelector('#green-tip');

if (tipButton && tipOutput) {
  const greenTips = [
    'Elige una planta de tu entorno y descubre qué necesita para crecer.',
    'Aprovecha la luz natural antes de encender una lámpara.',
    'Separa los residuos orgánicos: pueden convertirse en abono.',
    'Riega tus plantas temprano o al final de la tarde para reducir la evaporación.',
    'Observa los insectos de tu jardín: muchos ayudan a polinizar las plantas.',
    'Reutiliza un recipiente limpio como matera y dale una segunda vida.',
    'Comparte con alguien un dato nuevo que hayas aprendido sobre la naturaleza.'
  ];
  let currentTip = 0;

  tipButton.addEventListener('click', () => {
    currentTip = (currentTip + 1) % greenTips.length;
    tipOutput.textContent = greenTips[currentTip];
  });
}

/*Seccion que hace funcionar los filtros de categorias del modulo fotos*/
const botonesFiltro = document.querySelectorAll(".filtro");
const tarjetasFoto = document.querySelectorAll(".foto-card");

botonesFiltro.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const filtroElegido = boton.dataset.filtro;

    tarjetasFoto.forEach(function (tarjeta) {
      const categoriaFoto = tarjeta.dataset.categoria;
      const mostrarTodas = filtroElegido === "todos";
      const coincide = categoriaFoto === filtroElegido;

      if (mostrarTodas || coincide) {
        tarjeta.style.display = "block";
      } else {
        tarjeta.style.display = "none";
      }
    });

    botonesFiltro.forEach(function (otroBoton) {
      otroBoton.classList.remove("activo");
    });

    boton.classList.add("activo");
  });
});

// Busca las tarjetas y prepara la información de cada foto
const fotos = Array.from(document.querySelectorAll(".foto-card"))
    .map((tarjeta) => ({
        tarjeta: tarjeta,
        imagen: tarjeta.querySelector("img"),
        titulo: tarjeta.querySelector(".foto-pie p")?.textContent.trim()
    }))
    .filter((foto) => foto.imagen);

// Busca los elementos del visor en el HTML
const visor = document.getElementById("visorFotos");
const imagenAmpliada = document.getElementById("visorImagen");
const tituloAmpliado = document.getElementById("visorTitulo");
const contador = document.getElementById("contadorFotos");
const botonCerrar = document.getElementById("cerrarvisor");
const botonAnterior = document.getElementById("fotoAnterior");
const botonSiguiente = document.getElementById("fotoSiguiente");

let indiceActual = 0;

// Muestra una foto y actualiza el contador
function mostrarFoto(indice) {
    indiceActual = (indice + fotos.length) % fotos.length;

    const foto = fotos[indiceActual];

    imagenAmpliada.src = foto.imagen.src;
    imagenAmpliada.alt = foto.imagen.alt;
    tituloAmpliado.textContent = foto.titulo || foto.imagen.alt;
    contador.textContent = `${indiceActual + 1} / ${fotos.length}`;
}

// Abre el visor con la foto seleccionada
fotos.forEach((foto, indice) => {
    const botonAmpliar = foto.tarjeta.querySelector(".boton-ampliar");

    botonAmpliar.addEventListener("click", () => {
        mostrarFoto(indice);
        visor.hidden = false;
        visor.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });
});

// Cierra el visor
function cerrarVisor() {
    visor.hidden = true;
    visor.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

botonCerrar.addEventListener("click", cerrarVisor);

// Cambia a la foto anterior o siguiente
botonAnterior.addEventListener("click", () => {
    mostrarFoto(indiceActual - 1);
});

botonSiguiente.addEventListener("click", () => {
    mostrarFoto(indiceActual + 1);
});

// Cierra al pulsar fuera del panel
visor.addEventListener("click", (evento) => {
    if (evento.target === visor) {
        cerrarVisor();
    }
});

// También permite usar Escape y las flechas del teclado
document.addEventListener("keydown", (evento) => {
    if (visor.hidden) return;

    if (evento.key === "Escape") cerrarVisor();
    if (evento.key === "ArrowLeft") mostrarFoto(indiceActual - 1);
    if (evento.key === "ArrowRight") mostrarFoto(indiceActual + 1);
});
