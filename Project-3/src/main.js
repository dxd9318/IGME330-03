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
    let arrayPos = null;
    
    SF.onclick = () => {
        coords = map.geojson.features[0].geometry.coordinates;
        arrayPos = 0;

        map.setZoomLevel(12);
        map.flyTo(coords);
        astro.composeAPICall(coords, arrayPos);
    }
    NY.onclick = () => {
        coords = map.geojson.features[1].geometry.coordinates;
        arrayPos = 1;

        map.setZoomLevel(12);
        map.flyTo(coords);
        astro.composeAPICall(coords, arrayPos);
    }
    RJ.onclick = () => {
        coords = map.geojson.features[2].geometry.coordinates;
        arrayPos = 2;

        map.setZoomLevel(12);
        map.flyTo(coords);
        astro.composeAPICall(coords, arrayPos);
    }
    LN.onclick = () => {
        coords = map.geojson.features[3].geometry.coordinates;
        arrayPos = 3;

        map.setZoomLevel(12);
        map.flyTo(coords);
        astro.composeAPICall(coords, arrayPos);
    }
    AN.onclick = () => {
        coords = map.geojson.features[4].geometry.coordinates;
        arrayPos = 4;

        map.setZoomLevel(12);
        map.flyTo(coords);
        astro.composeAPICall(coords, arrayPos);
    }
    HK.onclick = () => {
        coords = map.geojson.features[5].geometry.coordinates;
        arrayPos = 5;

        map.setZoomLevel(12);
        map.flyTo(coords);
        astro.composeAPICall(coords, arrayPos);
    }
    SD.onclick = () => {
        coords = map.geojson.features[6].geometry.coordinates;
        arrayPos = 6;

        map.setZoomLevel(12);
        map.flyTo(coords);
        astro.composeAPICall(coords, arrayPos);
    }

    resetMap.onclick = () => {
        coords = [-21.4453125, 38.272688535980976];
        arrayPos = null;
        
        map.setZoomLevel(1);
        map.flyTo(coords);
    }
}

export { init };