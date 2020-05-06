import * as map from "./map.js";

function init() {
    map.initMap();
    map.addMarkersToMap();
    //map.trackUserLocation();

    setupUI();
}

function setupUI() {
    SF.onclick = () => {
        map.setZoomLevel(12);
        //map.flyTo([-122.414, 37.776]);
        map.flyTo(map.geojson.features[0].geometry.coordinates);
    }
    NY.onclick = () => {
        map.setZoomLevel(12);
        //map.flyTo([-73.998, 40.727]);
        map.flyTo(map.geojson.features[1].geometry.coordinates);
    }
    RJ.onclick = () => {
        map.setZoomLevel(12);
        //map.flyTo([-43.198,  -22.887]);
        map.flyTo(map.geojson.features[2].geometry.coordinates);
    }
    LN.onclick = () => {
        map.setZoomLevel(12);
        //map.flyTo([-0.131, 51.515]);
        map.flyTo(map.geojson.features[3].geometry.coordinates);
    }
    AN.onclick = () => {
        map.setZoomLevel(12);
        //map.flyTo([47.521, -18.908]);
        map.flyTo(map.geojson.features[4].geometry.coordinates);
    }
    HK.onclick = () => {
        map.setZoomLevel(12);
        //map.flyTo([-245.825, 22.290]);
        map.flyTo(map.geojson.features[5].geometry.coordinates);
    }
    SD.onclick = () => {
        map.setZoomLevel(12);
        //map.flyTo([151.127, -33.847]);
        map.flyTo(map.geojson.features[6].geometry.coordinates);
    }


    resetMap.onclick = () => {
        map.setZoomLevel(1);
        map.flyTo([-21.4453125, 38.272688535980976]);
    }
}

export { init };