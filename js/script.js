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

/*Logica para abrir las fotos*/
const visorFotos = document.querySelector("#visorFotos");

if (visorFotos) {
  const imagenAmpliada = document.querySelector("#visorImagen");
  const tituloAmpliado = document.querySelector("#visorTitulo");
  const botonCerrar = document.querySelector("#cerrarvisor");
  const botonesAmpliar = document.querySelectorAll(".boton-ampliar");

  function cerrarVisor() {
    visorFotos.hidden = true;
    visorFotos.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  botonesAmpliar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const tarjeta = boton.closest(".foto-card");
      const foto = tarjeta.querySelector("img");
      const titulo = tarjeta.querySelector(".foto-pie p");

      imagenAmpliada.src = foto.src;
      imagenAmpliada.alt = foto.alt;
      tituloAmpliado.textContent = titulo.textContent;

      visorFotos.hidden = false;
      visorFotos.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  botonCerrar.addEventListener("click", cerrarVisor);

  visorFotos.addEventListener("click", function (evento) {
    if (evento.target === visorFotos) {
      cerrarVisor();
    }
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && !visorFotos.hidden) {
      cerrarVisor();
    }
  });
}
