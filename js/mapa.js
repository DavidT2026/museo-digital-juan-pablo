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