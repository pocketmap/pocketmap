import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { StyleSwitcherControl } from "map-gl-style-switcher";
import "map-gl-style-switcher/dist/map-gl-style-switcher.css";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import { Protocol } from "pmtiles";
import "./style.css";
import PocketBase from "pocketbase";

export const pb = new PocketBase();

let protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const mapStyles: any[] = await pb
  .collection("styles")
  .getFullList()
  .then((styles) => {
    return styles.map((style) => ({
      ...style,
      image: pb.files.getURL(style, style.image),
    }));
  });

console.log("Available map styles:", mapStyles[0].image);
let index = mapStyles?.findIndex(
  (i) => i.id === localStorage.getItem("mapStyle")
);

if (index === undefined || index < 0) {
  index = 0;
}

console.log("Initial map style index:", index);
const currentStyle = mapStyles?.[index];
const map = new maplibregl.Map({
  container: "map", // container id
  hash: true,
  style: currentStyle?.styleUrl || currentStyle?.style, // style URL
  attributionControl: false,
  renderWorldCopies: false,
});

const styleSwitcher = new StyleSwitcherControl({
  styles: mapStyles ?? [],
  theme: "auto",
  showLabels: true,
  showImages: true,
  activeStyleId: currentStyle?.id,
  onAfterStyleChange: (_from, to) => {
    if (to.styleUrl) map.setStyle(to.styleUrl);
    // @ts-ignore: Extra property added dynamically
    else map.setStyle(to.style);
    localStorage.setItem("mapStyle", to.id);
    console.log("Style changed to", to.name);
  },
});

map.on("load", () => {
  // Add controls to the map
  map.addControl(new maplibregl.NavigationControl(), "top-right");
  map.addControl(new maplibregl.FullscreenControl(), "top-right");
  map.addControl(
    new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    }),
    "top-right"
  );
  map.addControl(new maplibregl.GlobeControl(), "top-right");
  map.addControl(
    new maplibregl.ScaleControl({ unit: "imperial" }),
    "bottom-right"
  );
  map.addControl(styleSwitcher, "bottom-left");
  map.addControl(
    new maplibregl.TerrainControl({ source: "terrainSource", exaggeration: 1 })
  );
});
