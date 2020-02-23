/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

const drawParams = {
    showGradient: true,
    showBars: true,
    showCircles: true,
    showNoise: true,
}

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    sound1: "media/New Adventure Theme.mp3"
});

audio.setupWebAudio(DEFAULTS.sound1);

function init() {
    console.log("init called");
    console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI(canvasElement);

    canvas.setupCanvas(canvasElement, audio.analyserNode);

    loop();
}

function setupUI(canvasElement) {
    // A - hookup fullscreen button
    const fsButton = document.querySelector("#fsButton");

    // add .onclick event to button
    fsButton.onclick = e => {
        console.log("init called");
        utils.goFullscreen(canvasElement);
    };

    // add .onclick event to button
    playButton.onclick = e => {
        console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

        // check if context is in suspended state (autoplay policy)
        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
        }
        console.log(`audioCtx.state after = ${audio.audioCtx.state}`);

        if (e.target.dataset.playing == "no") {
            // if track is paused, play it
            audio.playCurrentSound();
            e.target.dataset.playing = "yes";
        } else {
            // if track is playing, pause it
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no";
        }
    };

    // C - hookup volume slider & label
    let volumeSlider = document.querySelector("#volumeSlider");
    let volumeLabel = document.querySelector("#volumeLabel");

    // add .oninput event to slider
    volumeSlider.oninput = e => {
        // set the gain
        audio.setVolume(e.target.value);
        // update value of label to match value of slider
        volumeLabel.innerHTML = Math.round(e.target.value / 2 * 100);
    };

    // set value of label to match inital value of slider
    volumeSlider.dispatchEvent(new Event("input"));

    // D - hookup track <select>
    let trackSelect = document.querySelector("#trackSelect");
    // add .onchange event to <select>
    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);
        // pause the current track if it is playing
        if (playButton.dataset.playing == "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
    };


    // Checkboxes handling
    document.querySelector("#gradientCB").checked = drawParams.showGradient;
    document.querySelector("#gradientCB").onchange = e => {
        drawParams.showGradient = e.target.checked;
    }

    document.querySelector("#barsCB").checked = drawParams.showBars;
    document.querySelector("#barsCB").onchange = e => {
        drawParams.showBars = e.target.checked;
    }

    document.querySelector("#circlesCB").checked = drawParams.showCircles;
    document.querySelector("#circlesCB").onchange = e => {
        drawParams.showCircles = e.target.checked;
    }

    document.querySelector("#noiseCB").checked = drawParams.showNoise;
    document.querySelector("#noiseCB").onchange = e => {
        drawParams.showNoise = e.target.checked;
    }

} // end setupUI

function loop() {
    requestAnimationFrame(loop);
    
    canvas.draw(drawParams);
}

export { init };