import { geojson } from "./map.js";

const astroAccessToken = "85bf857892c9494d9ae67595e89c0b75";
let locationRef = null;

function composeAPICall(coord = [0, 0], arrayPos) {
    locationRef = geojson.features[arrayPos].properties.description;

    let url = "https://api.ipgeolocation.io/astronomy?apiKey=";
    url += astroAccessToken;
    url += "&lat=" + coord[1] + "&long=" + coord[0];    // have to switch lat and long

    //console.log(url);
    document.querySelector("#astralResults p").innerHTML = "Fetching sun and moon position data relative to " + locationRef + "...";

    getData(url);
}

function getData(url) {
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;

    xhr.open("GET", url);
    xhr.send();
}

function dataLoaded(e) {
    let xhr = e.target;

    let obj = JSON.parse(xhr.responseText);
    if (!obj || obj.length == 0) {
        document.querySelector("#astralResults p").innerHTML = "Sorry, no results found for " + locationRef;
        return;
    }

    let bigString = `Success! Relative to ${locationRef} on ${obj.date}:
        <br>The Sun:<br>
        The sun rises at ${obj.sunrise} and sets at ${obj.sunset}.<br> 
        Solar noon is at ${obj.solar_noon}, providing ${obj.day_length} hours of sunlight.<br>
        The sun is ${obj.sun_distance} km away from this point on Earth.<br><br>

        The Moon:<br>
        The moon rises at ${obj.moonrise} and sets at ${obj.moonset}.<br>
        The moon is ${obj.moon_distance} km away from this point on Earth.<br>`;

    document.querySelector("#astralResults p").innerHTML = bigString;
}

function dataError(e) {
    console.log("An error occured");
}

export { composeAPICall };