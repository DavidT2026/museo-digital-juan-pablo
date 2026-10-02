const relatosComunitarios = [
  {
    id: 1,
    titulo: "Relato 1: Memoria e Identidad Barrial",
    sector: "Barrio Compartir",
    descripcion: "Testimonio sobre los espacios de encuentro y vivencias cotidianas.",
    lat: 4.5512,
    lng: -74.1620,
    archivoAudio: "audio1.mp3"
  },
  {
    id: 2,
    titulo: "Relato 2: Percepción Juvenil y Espacio Público",
    sector: "Barrio Juan Pablo II",
    descripcion: "Narrativa místico-metafórica sobre la apropiación del territorio.",
    lat: 4.5583,
    lng: -74.1565,
    archivoAudio: "audio2.mp3"
  },
  {
    id: 3,
    titulo: "Relato 3: Voces en los Bordes",
    sector: "Juan Pablo II (Parte Alta)",
    descripcion: "Voces de la tercera generación tardía en los límites del barrio.",
    lat: 4.5601,
    lng: -74.1540,
    archivoAudio: "audio3.mp3"
  }
];

const mapa = L.map("mapa", {
  zoomControl: true
}).setView([4.5550, -74.1580], 15);

L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 19,
    attribution: "Tiles © Esri"
  }
).addTo(mapa);

relatosComunitarios.forEach((punto) => {
  const marcador = L.marker([punto.lat, punto.lng]).addTo(mapa);

  const popup = `
    <div class="popup-memoria">
      <h3>${punto.titulo}</h3>
      <div class="sector">${punto.sector}</div>
      <p>${punto.descripcion}</p>
      <audio controls preload="metadata">
        <source src="${punto.archivoAudio}" type="audio/mpeg">
        Tu navegador no puede reproducir este archivo.
      </audio>
      <div class="audio-ayuda">🎧 Escuchar testimonio</div>
    </div>
  `;

  marcador.bindPopup(popup, {
    maxWidth: 300,
    minWidth: 260
  });
});

window.addEventListener("load", () => {
  setTimeout(() => mapa.invalidateSize(), 300);
});

/* ============================================================
   LUGARES SIGNIFICATIVOS DEL TERRITORIO
   Fuentes de referencia:
   - TransMiCable / TransMilenio
   - IDRD
   - Arquidiócesis de Bogotá
   - fuentes cartográficas de OpenStreetMap
   ============================================================ */

const lugaresSignificativos = [
  {
    nombre: "Estación TransMiCable Juan Pablo II",
    categoria: "Movilidad",
    icono: "🚡",
    lat: 4.55572,
    lng: -74.14748,
    descripcion: "Estación Juan Pablo II del sistema TransMiCable de Ciudad Bolívar. Está ubicada en el entorno de la Calle 67C Sur con Carrera 18R.",
    direccion: "Cl. 67A/67C Sur con Cra. 18R",
    clase: "movilidad"
  },
  {
    nombre: "Parque Juan Pablo II",
    categoria: "Parque",
    icono: "🌳",
    lat: 4.55439,
    lng: -74.14809,
    descripcion: "Espacio público del barrio Juan Pablo II, utilizado para actividades recreativas y comunitarias.",
    direccion: "Cl. 67B Sur #18N-12",
    clase: "parque"
  },
  {
    nombre: "Plazoleta del Sapo",
    categoria: "Memoria y cultura",
    icono: "🐸",
    lat: 4.55445,
    lng: -74.14855,
    descripcion: "Espacio emblemático del barrio Juan Pablo II, asociado a la memoria colectiva, la vida comunitaria y las expresiones culturales del territorio.",
    direccion: "Cra. 18Q #68B-18 Sur",
    clase: "cultura"
  },
  {
    nombre: "Parroquia María Reina de los Apóstoles",
    categoria: "Iglesia",
    icono: "⛪",
    lat: 4.55555,
    lng: -74.14820,
    descripcion: "Parroquia ubicada en el sector de Juan Pablo II y vinculada a la vida comunitaria del territorio.",
    direccion: "Cra. 18Q Bis B #67C-48 Sur",
    clase: "iglesia"
  },
  {
    nombre: "IED Santa Bárbara",
    categoria: "Educación",
    icono: "🏫",
    lat: 4.55305,
    lng: -74.14699,
    descripcion: "Institución educativa ubicada en el entorno inmediato del barrio Juan Pablo II.",
    direccion: "Ciudad Bolívar, Bogotá",
    clase: "educacion"
  },
  {
    nombre: "CAI Compartir",
    categoria: "Equipamiento comunitario",
    icono: "🛡️",
    lat: 4.55725,
    lng: -74.14646,
    descripcion: "Equipamiento de seguridad ubicado en el entorno de Compartir y Juan Pablo II.",
    direccion: "Sector Compartir, Ciudad Bolívar",
    clase: "equipamiento"
  }
];


/* ============================================================
   ICONOS DE LOS LUGARES
   ============================================================ */

function crearIconoLugar(icono, clase) {
  return L.divIcon({
    className: "icono-lugar-contenedor",
    html: `
      <div class="icono-lugar ${clase}">
        <span>${icono}</span>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20]
  });
}


/* ============================================================
   MARCADORES DE LUGARES SIGNIFICATIVOS
   ============================================================ */

lugaresSignificativos.forEach((lugar) => {

  const marcadorLugar = L.marker(
    [lugar.lat, lugar.lng],
    {
      icon: crearIconoLugar(lugar.icono, lugar.clase),
      zIndexOffset: 500
    }
  ).addTo(mapa);

  const popupLugar = `
    <div class="popup-lugar">
      <div class="categoria-lugar">${lugar.categoria}</div>
      <h3>${lugar.icono} ${lugar.nombre}</h3>
      <p>${lugar.descripcion}</p>
      <div class="direccion-lugar">
        <strong>Ubicación:</strong> ${lugar.direccion}
      </div>
    </div>
  `;

  marcadorLugar.bindPopup(popupLugar, {
    maxWidth: 320,
    minWidth: 270
  });

});
