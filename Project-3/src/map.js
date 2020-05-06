// List of preset locations to use
let geojson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-122.414, 37.776]
            },
            properties: {
                title: 'Mapbox',
                description: 'San Francisco, California'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-73.998, 40.727]
            },
            properties: {
                title: 'Mapbox',
                description: 'New York, New York'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-43.198, -22.887]
            },
            properties: {
                title: 'Mapbox',
                description: 'Rio de Janeiro, Brazil'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-0.131, 51.515]
            },
            properties: {
                title: 'Mapbox',
                description: 'London, Great Britain'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [47.521, -18.908]
            },
            properties: {
                title: 'Mapbox',
                description: 'Antananarivo, Madagascar'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-245.825, 22.290]
            },
            properties: {
                title: 'Mapbox',
                description: 'Hong Kong, China'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [151.127, -33.847]
            },
            properties: {
                title: 'Mapbox',
                description: 'Sydney, Australia'
            }
        }]
};

let map = null;

function initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHhkOTMxOCIsImEiOiJjazlkdDdreDcwN2QwM2VzNnBiZmg2b3lvIn0.qTwsHK-3ZAStaKfTf-gamg';

    if (!mapboxgl.supported()) {
        alert('Sorry, your browser does not support Mapbox GL.');
    } else {
        // Startup default position and zoom level
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [-21.4453125,
                38.272688535980976],
            zoom: 1
        });
    }
}

function addMarkersToMap() {
    // Add markers to map for preset locations
    for (let feature of geojson.features) {
        // create a HTML element for each feature
        let el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>'))
            .addTo(map);
    }

    console.log(geojson.features[3].geometry.coordinates);
}

function trackUserLocation() {
    // add a checkbox for if the user would like to find their location
    // Locate user using their browser
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );
}

function flyTo(center = [0,0]){
    map.flyTo({center: center});
}

function setZoomLevel(value = 0){
    map.setZoom(value);
}

export {geojson, initMap, addMarkersToMap, trackUserLocation, flyTo, setZoomLevel};