import * as map from "./map.js";
import * as astro from "./astro.js";

function init() {
    map.initMap();
    //map.addMarkersToMap();
    //map.trackUserLocation();

    setupUI();
}

function setupUI() {
    let coords = [-21.4453125, 38.272688535980976];
    
    SF.onclick = () => {
        coords = map.geojson.features[0].geometry.coordinates;

        map.setZoomLevel(12);
        map.flyTo(coords);
        astro.getAstroData(coords);
    }
    NY.onclick = () => {
        coords = map.geojson.features[1].geometry.coordinates;

        map.setZoomLevel(12);
        map.flyTo(coords);
        astro.getAstroData(coords);
    }
    RJ.onclick = () => {
        coords = map.geojson.features[2].geometry.coordinates;

        map.setZoomLevel(12);
        map.flyTo(coords);
        astro.getAstroData(coords);
    }
    LN.onclick = () => {
        coords = map.geojson.features[3].geometry.coordinates;

        map.setZoomLevel(12);
        map.flyTo(coords);
        astro.getAstroData(coords);
    }
    AN.onclick = () => {
        coords = map.geojson.features[4].geometry.coordinates;

        map.setZoomLevel(12);
        map.flyTo(coords);
        astro.getAstroData(coords);
    }
    HK.onclick = () => {
        coords = map.geojson.features[5].geometry.coordinates;

        map.setZoomLevel(12);
        map.flyTo(coords);
        astro.getAstroData(coords);
    }
    SD.onclick = () => {
        coords = map.geojson.features[6].geometry.coordinates;

        map.setZoomLevel(12);
        map.flyTo(coords);
        astro.getAstroData(coords);
    }

    resetMap.onclick = () => {
        coords = [-21.4453125, 38.272688535980976];
        map.setZoomLevel(1);
        map.flyTo(coords);
    }
}

export { init };