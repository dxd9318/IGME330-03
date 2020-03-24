/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';

let ctx, canvasWidth, canvasHeight, gradient, analyserNode, freqAudioData, waveAudioData;


function setupCanvas(canvasElement, analyserNodeRef) {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    // create a gradient that runs top to bottom
    // color palette from https://digitalsynopsis.com/design/beautiful-color-gradient-palettes/
    gradient = utils.getLinearGradient(ctx, 0, 0, canvasWidth, 0, [{ percent: 0, color: "#240E8B" }, { percent: .25, color: "#3c4cad" }, { percent: .5, color: "#f04393" }, { percent: .75, color: "#f9c449" }, { percent: 1, color: "#E8A49C" }]);
    // keep a reference to the analyser node
    analyserNode = analyserNodeRef;
    // this is the array where the analyser data will be stored
    freqAudioData = new Uint8Array(analyserNode.fftSize / 2);
    waveAudioData = new Uint8Array(analyserNode.fftSize / 2);
}

function draw(params = {}) {
    // 1 - populate the freqAudioData array with the frequency data from the analyserNode
    // notice these arrays are passed "by reference" 
    analyserNode.getByteFrequencyData(freqAudioData);
    // OR
    analyserNode.getByteTimeDomainData(waveAudioData); // waveform data

    // 2 - draw background
    ctx.save();
    ctx.fillStyle = "#240E8B";
    ctx.globalAlpha = .1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // 3 - draw gradient
    if (params.showGradient) {
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = .3;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();
    }

    // Draw godzilla
    ctx.save();
    ctx.fillStyle = "green";
    // head
    ctx.beginPath();
    ctx.arc(150, 150, 75, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
    // eye
    ctx.save();
    ctx.fillStyle = "red";
    ctx.globalAlpha = 1.0;
    ctx.translate(160, 120);
    ctx.rotate(Math.PI/6);
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    
    // mouth top
    ctx.beginPath();
    ctx.moveTo(175, 120);
    ctx.lineTo(330, 85);
    ctx.lineTo(355, 130);
    ctx.fill();
    // mouth bottom
    ctx.moveTo(175, 180);
    ctx.lineTo(315, 230);
    ctx.lineTo(290, 260);
    ctx.closePath();
    ctx.fill();

    // body
    ctx.beginPath();
    ctx.moveTo(180, 180);
    ctx.lineTo(200, canvasHeight);
    ctx.lineTo(0, canvasHeight);
    ctx.lineTo(130, 180);
    ctx.closePath();
    ctx.fill();
    ctx.restore();


    // 4 - draw beams -- waveform data
    if (params.showBars) {
        let beamSpacing = 4;    // space between each bar
        let margin = 5;         // space on either end of whole set of bars
        let screenWidthForBars = canvasWidth - (waveAudioData.length * beamSpacing) - margin * 2;
        let barWidth = screenWidthForBars / waveAudioData.length;
        let barHeight = 75;

        ctx.save();
        ctx.fillStyle = `rgba(255,255,255,0.50)`;
        ctx.strokeStyle = `rgba(0,0,0,0.50)`;
        ctx.translate(355, 10);
        ctx.rotate(Math.PI/8);

        // loop through the data and draw!
        for (let i = 0; i < waveAudioData.length; i++) {
            ctx.save();
            ctx.translate(margin + i * (barWidth + beamSpacing), 256 - waveAudioData[i]);
            ctx.fillRect(0, 0, barWidth, barHeight);
            ctx.strokeRect(0, 0, barWidth, barHeight);
            ctx.restore();
        
            // ctx.moveTo(waveAudioData[i], waveAudioData[i]);
            // ctx.quadraticCurveTo(273, 248, 390, 166);
            // ctx.stroke();
        }
        ctx.restore();
    }
    // 5 - draw circles -- frequency data
    if (params.showCircles) {
        let maxRadius = canvasHeight / 4;
        ctx.save();
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < freqAudioData.length; i++) {
            // red-ish circles
            let percent = freqAudioData[i] / 255;
            let circleRadius = percent * maxRadius;
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(255, 111, 111, .34 - percent / 3.0);
            ctx.arc(canvasWidth / 2 - 120, canvasHeight / 2 - 20, circleRadius * 0.5, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            // blue-ish circles
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(0, 0, 255, .10 - percent / 10.0);
            ctx.arc(canvasWidth / 2 - 120, canvasHeight / 2 - 20, circleRadius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            // yellow-ish circles
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(200, 200, 0, .5 - percent / 5.0);
            ctx.arc(canvasWidth / 2 - 120, canvasHeight / 2 - 20, circleRadius * 0.25, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
        ctx.restore();
    }

    // 6 - bitmap manipulation

    // A) grab all of the pixels on the canvas and put them in the `data` array
    // `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
    // the variable `data` below is a reference to that array 
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width;    // not using here

    // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for (let i = 0; i < length; i += 4) {
        // C) randomly change every 20th pixel to red
        if (params.showNoise && Math.random() < .01) {
            // data[i] is the red channel
            // data[i+1] is the green channel
            // data[i+2] is the blue channel
            // data[i+3] is the alpha channel

            if(Math.random() < 0.5){
                // 50% teal noise
                data[i] = 103;
                data[i + 1] = 196;
                data[i + 2] = 200;
            } else {
                // 50% pink noise
                data[i] = 255;
                data[i + 1] = 192;
                data[i + 2] = 203;
            }
            
        } // end if

        if (params.showInvert) {
            let red = data[i], green = data[i + 1], blue = data[i + 2];
            data[i] = 255 - red;
            data[i + 1] = 255 - green;
            data[i + 2] = 255 - blue;
        }

        if (params.showTint) {
            if(params.tintColor == "darkred"){
                // decrease all channels to make it blacker, then increase red channel
                data[i] = data[i] + 50;
                data[i+1] = data[i+1] - 70;
                data[i+2] = data[i+2] - 70;
            } else if(params.tintColor == "blue"){
                //increase blue channel
                data[i+2] = data[i+2] + 50;
            } else if(params.tintColor == "pink"){
                // increase all channels to make it whiter, then increase red channel
                data[i] = data[i] + 100;
                data[i+1] = data[i+1] + 50;
                data[i+2] = data[i+2] + 50;
            } else { //yellow
                // increase red and green channels
                data[i] = data[i] + 50;
                data[i+1] = data[i+1] + 50;
            }
        }

        if(params.changeBrightness){
            data[i] = data[i] + params.brightnessValue;
            data[i+1] = data[i+1] + params.brightnessValue;
            data[i+2] = data[i+2] + params.brightnessValue;
        }
    } // end for

    // embossing effect
    if (params.showEmboss) {
        // note we are stepping through *each sub-pixel*
        for (let i = 0; i < length; i++) {
            if (i % 4 == 3) continue; // skip alpha channel
            data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
        }
    }
    // D) copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);
}

export { setupCanvas, draw };