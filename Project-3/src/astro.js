const astroAccessToken = "85bf857892c9494d9ae67595e89c0b75";

function getAstroData(coord = [0,0]) {
    // REMEMBER TO SWITCH LNG AND LAT WHEN INPUTING!!!

    let url = "https://api.ipgeolocation.io/astronomy?apiKey=";
    url += astroAccessToken;
    url += "&lat=" + coord[1] + "&long=" + coord[0];

    console.log(url);
}

export {getAstroData};