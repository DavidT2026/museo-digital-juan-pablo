const relatosComunitarios=[
{id:1,titulo:"Relato 1: Memoria e Identidad Barrial",sector:"Barrio Compartir",descripcion:"Testimonio sobre los espacios de encuentro y vivencias cotidianas.",lat:4.5512,lng:-74.1620,archivoAudio:"audio1.mp3"},
{id:2,titulo:"Relato 2: Percepción Juvenil y Espacio Público",sector:"Barrio Juan Pablo II",descripcion:"Narrativa místico-metafórica sobre la apropiación del territorio.",lat:4.5583,lng:-74.1565,archivoAudio:"audio2.mp3"},
{id:3,titulo:"Relato 3: Voces en los Bordes",sector:"Juan Pablo II (Parte Alta)",descripcion:"Voces de la tercera generación tardía en los límites del barrio.",lat:4.5601,lng:-74.1540,archivoAudio:"audio3.mp3"}];

const lugaresSignificativos=[
{nombre:"Estación TransMiCable Juan Pablo II",categoria:"Movilidad",icono:"🚡",lat:4.55572,lng:-74.14748,descripcion:"Estación Juan Pablo II del sistema TransMiCable de Ciudad Bolívar.",direccion:"Cl. 67A/67C Sur con Cra. 18R",clase:"movilidad"},
{nombre:"Parque Juan Pablo II",categoria:"Parque",icono:"🌳",lat:4.55439,lng:-74.14809,descripcion:"Espacio público utilizado para actividades recreativas y comunitarias.",direccion:"Cl. 67B Sur #18N-12",clase:"parque"},
{nombre:"Plazoleta del Sapo",categoria:"Memoria y cultura",icono:"🐸",lat:4.55445,lng:-74.14855,descripcion:"Espacio emblemático asociado a la memoria colectiva y la vida comunitaria.",direccion:"Cra. 18Q #68B-18 Sur",clase:"cultura"},
{nombre:"Parroquia María Reina de los Apóstoles",categoria:"Iglesia",icono:"⛪",lat:4.55555,lng:-74.14820,descripcion:"Parroquia vinculada a la vida comunitaria del territorio.",direccion:"Cra. 18Q Bis B #67C-48 Sur",clase:"iglesia"},
{nombre:"IED Santa Bárbara",categoria:"Educación",icono:"🏫",lat:4.55305,lng:-74.14699,descripcion:"Institución educativa ubicada en el entorno inmediato de Juan Pablo II.",direccion:"Ciudad Bolívar, Bogotá",clase:"educacion"},
{nombre:"CAI Compartir",categoria:"Equipamiento comunitario",icono:"🛡️",lat:4.55725,lng:-74.14646,descripcion:"Equipamiento de seguridad ubicado en el entorno de Compartir y Juan Pablo II.",direccion:"Sector Compartir, Ciudad Bolívar",clase:"equipamiento"}];

const mapa=new maplibregl.Map({
container:"mapa",
center:[-74.1535,4.5555],
zoom:14.8,
pitch:58,
bearing:-18,
maxPitch:85,
style:{
version:8,
sources:{
osm:{type:"raster",tiles:["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],tileSize:256,maxzoom:19,attribution:"© OpenStreetMap contributors"},
terreno:{type:"raster-dem",tiles:["https://tiles.mapterhorn.com/{z}/{x}/{y}.webp"],tileSize:512,maxzoom:17,encoding:"terrarium",attribution:"© AWS Open Data / Mapzen"},
relieve:{type:"raster-dem",tiles:["https://tiles.mapterhorn.com/{z}/{x}/{y}.webp"],tileSize:512,maxzoom:17,encoding:"terrarium"}},
layers:[
{id:"fondo",type:"background",paint:{"background-color":"#dbeafe"}},
{id:"osm",type:"raster",source:"osm",paint:{"raster-saturation":-0.15,"raster-contrast":0.05}},
{id:"hillshade",type:"hillshade",source:"relieve",paint:{"hillshade-exaggeration":0.35}}],
terrain:{source:"terreno",exaggeration:1.35}}});

mapa.addControl(new maplibregl.NavigationControl({visualizePitch:true}),"top-right");
mapa.addControl(new maplibregl.ScaleControl({maxWidth:120,unit:"metric"}),"bottom-left");

function popupMemoria(p){
const d=document.createElement("div");d.className="mapa-popup";
d.innerHTML="<h3>"+p.titulo+"</h3><div class='sector'>"+p.sector+"</div><p>"+p.descripcion+"</p><audio controls preload='metadata'><source src='"+p.archivoAudio+"' type='audio/mpeg'></audio><div class='audio-ayuda'>🎧 Escuchar testimonio</div>";
return d}

function popupLugar(p){
const d=document.createElement("div");d.className="mapa-popup";
d.innerHTML="<div class='categoria-lugar'>"+p.categoria+"</div><h3>"+p.icono+" "+p.nombre+"</h3><p>"+p.descripcion+"</p><div class='direccion-lugar'><strong>Ubicación:</strong> "+p.direccion+"</div>";
return d}

mapa.on("load",()=>{
relatosComunitarios.forEach(p=>{
const e=document.createElement("div");e.className="marker-memoria-3d";e.textContent="🎧";
new maplibregl.Marker({element:e}).setLngLat([p.lng,p.lat]).setPopup(new maplibregl.Popup({offset:18,maxWidth:"300px"}).setDOMContent(popupMemoria(p))).addTo(mapa);
});
lugaresSignificativos.forEach(p=>{
const e=document.createElement("div");e.className="icono-lugar-3d "+p.clase;e.textContent=p.icono;
new maplibregl.Marker({element:e}).setLngLat([p.lng,p.lat]).setPopup(new maplibregl.Popup({offset:22,maxWidth:"320px"}).setDOMContent(popupLugar(p))).addTo(mapa);
});
setTimeout(()=>mapa.resize(),300);
});

window.mostrarVista3D=()=>mapa.easeTo({pitch:58,bearing:-18,duration:1000});
window.mostrarVista2D=()=>mapa.easeTo({pitch:0,bearing:0,duration:1000});
window.recentrarTerritorio=()=>mapa.flyTo({center:[-74.1535,4.5555],zoom:14.8,pitch:58,bearing:-18,duration:1400});
window.addEventListener("resize",()=>mapa.resize());