// Información que se presenta al seleccionar cada zona del plano.
const areas = {
    "zona-entrada": {
        title: "Entrada principal",
        description: "Acceso peatonal a la granja desde la vía ubicada en el costado sur.",
        image: "../../sources/mapa-granja.svg"
    },
    "zona-huertas": {
        title: "Huertas",
        description: "Área de cultivos y aprendizaje práctico situada hacia el centro-oriente del terreno.",
        image: "../../sources/mapa-granja.svg"
    },
    "zona-pecuaria": {
        title: "Zona pecuaria",
        description: "Espacio para actividades de formación relacionadas con la producción pecuaria, ubicado al noroeste.",
        image: "../../sources/mapa-granja.svg"
    },
    "zona-vivero": {
        title: "Vivero",
        description: "Área de propagación de plantas, localizada en el sector occidental de la granja.",
        image: "../../sources/mapa-granja.svg"
    },
    "zona-compostaje": {
        title: "Compostaje",
        description: "Zona para transformar residuos orgánicos en abono, ubicada cerca del centro del terreno.",
        image: "../../sources/mapa-granja.svg"
    },
    "zona-laboratorio": {
        title: "Laboratorio",
        description: "Instalación para apoyar la observación y el aprendizaje, en el sector suroccidental.",
        image: "../../sources/mapa-granja.svg"
    },
    "zona-senderos": {
        title: "Senderos",
        description: "Caminos que conectan las áreas de la granja y enlazan con la entrada principal.",
        image: "../../sources/mapa-granja.svg"
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

function openAreaDialog(area, trigger) {
    title.textContent = area.title;
    description.textContent = area.description;
    image.src = area.image;
    image.alt = `Mapa ilustrativo de la granja, zona: ${area.title.toLocaleLowerCase("es")}`;

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
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

