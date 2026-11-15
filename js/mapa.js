// Información que se presenta al seleccionar cada zona del plano.
const areas = {
    "zona-entrada": {
        title: "Entrada principal",
        description: "Acceso peatonal a la granja desde la vía ubicada en el costado sur.",
        images: [
            {
                src: "fotos%20espacios/Entrada%20principal/Entrada%20principal.jpg",
                alt: "Entrada principal de la granja"
            }
        ]
    },
    "zona-huertas": {
        title: "Huertas",
        description: "Área de cultivos y aprendizaje práctico situada hacia el centro-oriente del terreno.",
        images: [
            { src: "fotos%20espacios/Huertas/Huerta1.jpg", alt: "Huerta de la granja" },
            { src: "fotos%20espacios/Huertas/huerta2.jpg", alt: "Otra vista de las huertas" }
        ]
    },
    "zona-pecuaria": {
        title: "Zona pecuaria",
        description: "Espacio para actividades de formación relacionadas con la producción pecuaria, ubicado al noroeste.",
        images: [
            { src: "fotos%20espacios/Zona%20pecuaria/Cerdos.jpg", alt: "Cerdos de la zona pecuaria" },
            { src: "fotos%20espacios/Zona%20pecuaria/colibris.jpeg", alt: "Colibríes en la granja" },
            { src: "fotos%20espacios/Zona%20pecuaria/duerme.jpeg", alt: "Animal descansando en la granja" },
            { src: "fotos%20espacios/Zona%20pecuaria/hamster.jpeg", alt: "Hámster de la granja" },
            { src: "fotos%20espacios/Zona%20pecuaria/pollos.jpeg", alt: "Pollos de la zona pecuaria" }
        ]
    },
    "zona-vivero": {
        title: "Vivero",
        description: "Área de propagación de plantas, localizada en el sector occidental de la granja.",
        images: [
            { src: "fotos%20espacios/Invernadero/Invernadero.jpg", alt: "Invernadero de la granja" }
        ]
    },
    "zona-compostaje": {
        title: "Compostaje",
        description: "Zona para transformar residuos orgánicos en abono, ubicada cerca del centro del terreno.",
        images: [
            { src: "fotos%20espacios/Compostaje/Compostaje.jpg", alt: "Área de compostaje" },
            { src: "fotos%20espacios/Compostaje/compostaje1.jpg", alt: "Otra vista del compostaje" }
        ]
    },
    "zona-laboratorio": {
        title: "Laboratorio",
        description: "Instalación para apoyar la observación y el aprendizaje, en el sector suroccidental.",
        images: [
            { src: "fotos%20espacios/Laboratorio/Laboratorio.png", alt: "Laboratorio de la granja" }
        ]
    },
    "zona-senderos": {
        title: "Senderos",
        description: "Caminos que conectan las áreas de la granja y enlazan con la entrada principal.",
        images: [
            { src: "fotos%20espacios/Senderos/verde.jpeg", alt: "Sendero verde de la granja" }
        ]
    }
};

const mapElement = document.querySelector(".illustrated-map-frame svg");
const dialog = document.getElementById("area-dialog");
const closeButton = document.getElementById("area-dialog-close");
const image = document.getElementById("area-dialog-image");
const title = document.getElementById("area-dialog-title");
const description = document.getElementById("area-dialog-description");

if (
    !(mapElement instanceof SVGSVGElement) ||
    !(dialog instanceof HTMLDialogElement) ||
    !(closeButton instanceof HTMLButtonElement) ||
    !(image instanceof HTMLImageElement) ||
    !(title instanceof HTMLHeadingElement) ||
    !(description instanceof HTMLParagraphElement)
) {
    throw new Error("No se encontró el contenido requerido para el mapa interactivo.");
}

let gallery = image.closest(".area-dialog-gallery");

if (!(gallery instanceof HTMLElement)) {
    gallery = document.createElement("div");
    gallery.className = "area-dialog-gallery";
    image.parentElement.insertBefore(gallery, image);
    gallery.appendChild(image);
}

let galleryControls = gallery.querySelector("#area-gallery-controls");
let previousButton = gallery.querySelector("#area-photo-previous");
let nextButton = gallery.querySelector("#area-photo-next");
let photoCount = gallery.querySelector("#area-photo-count");

if (
    !(galleryControls instanceof HTMLElement) ||
    !(previousButton instanceof HTMLButtonElement) ||
    !(nextButton instanceof HTMLButtonElement) ||
    !(photoCount instanceof HTMLElement)
) {
    galleryControls = document.createElement("div");
    galleryControls.className = "area-gallery-controls";
    galleryControls.id = "area-gallery-controls";
    galleryControls.hidden = true;

    previousButton = document.createElement("button");
    previousButton.className = "area-gallery-button";
    previousButton.id = "area-photo-previous";
    previousButton.type = "button";
    previousButton.setAttribute("aria-label", "Ver fotografía anterior");
    previousButton.textContent = "←";

    photoCount = document.createElement("span");
    photoCount.className = "area-photo-count";
    photoCount.id = "area-photo-count";
    photoCount.setAttribute("aria-live", "polite");

    nextButton = document.createElement("button");
    nextButton.className = "area-gallery-button";
    nextButton.id = "area-photo-next";
    nextButton.type = "button";
    nextButton.setAttribute("aria-label", "Ver fotografía siguiente");
    nextButton.textContent = "→";

    galleryControls.append(previousButton, photoCount, nextButton);
    gallery.appendChild(galleryControls);
}

let currentPhotos = [];
let currentPhotoIndex = 0;

function showPhoto(index) {
    currentPhotoIndex = (index + currentPhotos.length) % currentPhotos.length;
    const photo = currentPhotos[currentPhotoIndex];

    image.src = photo.src;
    image.alt = photo.alt;
    photoCount.textContent = `${currentPhotoIndex + 1} de ${currentPhotos.length}`;
}

function openAreaDialog(area, trigger) {
    title.textContent = area.title;
    description.textContent = area.description;
    currentPhotos = area.images;
    galleryControls.hidden = currentPhotos.length < 2;
    showPhoto(0);

    dialog.showModal();
    closeButton.focus();
    dialog.addEventListener("close", () => trigger.focus(), { once: true });
}

// El SVG se mantiene en el documento HTML para que los eventos funcionen
// también al abrir el sitio localmente, sin depender de un documento externo.
function initializeMapZones() {
    Object.entries(areas).forEach(([id, area]) => {
        const zone = document.getElementById(id);

        if (!(zone instanceof SVGGElement) || !mapElement.contains(zone)) {
            throw new Error(`No se encontró la zona "${id}" en el SVG.`);
        }

        zone.setAttribute("role", "button");
        zone.setAttribute("tabindex", "0");
        zone.setAttribute("aria-label", `Ver información: ${area.title}`);
        zone.setAttribute("aria-haspopup", "dialog");
        zone.setAttribute("aria-controls", dialog.id);
        zone.style.cursor = "pointer";

        zone.addEventListener("click", () => openAreaDialog(area, zone));
        zone.addEventListener("focus", () => {
            zone.style.filter = "drop-shadow(0 0 5px #17345c)";
        });
        zone.addEventListener("blur", () => zone.style.removeProperty("filter"));
        zone.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openAreaDialog(area, zone);
            }
        });
    });
}

initializeMapZones();

closeButton.addEventListener("click", () => dialog.close());
previousButton.addEventListener("click", () => showPhoto(currentPhotoIndex - 1));
nextButton.addEventListener("click", () => showPhoto(currentPhotoIndex + 1));
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

