(function (){   //IIFE START
    "use strict";

    // Canvas setup variables
    const canvasWidth = 800, canvasHeight = 600;
    let canvas, ctx;

    // Flower drawing values and handling variables
    let n = 0;
	const c = 9; // "padding" between petals
    const divergence = 129.9;
    let interval = null;
    let alreadyRunning = false;

    // User-input variables
    let currentMaxN = 50, nextMaxN = 50; // BPB = ~20, JB = ~50 , FB = ~85, QF = ~130
    let currentPetalShape = "circle", nextPetalShape = "circle", currentColorOption = "rgbN", nextColorOption = "rgbN";
    let currentFlowerCenterX, currentFlowerCenterY;


    // Begin execution -----------------------------------------------------------------
    window.onload = init;

    function init(){
        canvas = document.querySelector('canvas');
        ctx = canvas.getContext("2d");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.fillRect(0,0,canvasWidth,canvasHeight);

        setupUI();
    }

    /* TODO:
    //COMPLETED // click on canvas to draw flower at click position

    // draw flower
        // draw petals using shape user designated shape 
        //COMPLETED // and coloring option
        // transform-rotate each petal to point towards flower's center 
        //COMPLETED // limit petal rows to number of rows designated by user input
        //COMPLETED // draw smiley at center
    */

    function setupUI(){
        // From sprites-and-radio-button demo
        let radioButtons = document.querySelectorAll("input[type=radio][name=petalRows]");
        for (let r of radioButtons){
            r.onchange = function (e){
                // Need to cast value from string to int value, or else get NaN.
                nextMaxN = Number(e.target.value);
            }
        }  

        document.querySelector("#petalShapeChooser").onchange = function(e){
            nextPetalShape = e.target.value;
        }

        document.querySelector("#petalColorChooser").onchange = function(e){
            nextColorOption = e.target.value;
        }

        canvas.onclick = canvasClicked;
    }

    // From modified first-canvas assignment
    function canvasClicked(e){
        // Set location of click to a new flower's center
        let rect = e.target.getBoundingClientRect();
        currentFlowerCenterX = e.clientX - rect.x;
        currentFlowerCenterY = e.clientY - rect.y;

        // User control changes will only occur after the next canvas click
        currentMaxN = nextMaxN;
        currentColorOption = nextColorOption;
        currentPetalShape = nextPetalShape;

        n = 0; // reset n to 0 so flower starts growing from new center
        phyllotaxisLoop(); // call phyllotaxis flower drawing method

        // Draw Smiley at center after a quarter of a second, to prevent inner petals overlapping it
        setTimeout(drawSmiley, 250, currentFlowerCenterX, currentFlowerCenterY, 15);
    }

    // From phyllotaxis assignment
    function phyllotaxisLoop(){ 
        if(!alreadyRunning){
            interval = setInterval(phyllotaxisLoop, 1000/30);  //setInterval calls every designated amount of milliseconds
            alreadyRunning= true; // prevents setInterval from getting called on top of another already running setInterval
        }

        // Flower stops drawing petals when reaching max petals
        if (n == currentMaxN) {
            clearInterval(interval);
            alreadyRunning = false;
            return;
        }

		// each frame draw a new petal
		// `a` is the angle of the petal from center
		// `r` is the radius from the center of the flower
		// `c` is the "padding" between the petals
		let a = n * dxdLIB.dtr(divergence);
		let r = c * Math.sqrt(n);

		// now calculate the `x` and `y` position of current petal
        let x = r * Math.cos(a) + currentFlowerCenterX;
		let y = r * Math.sin(a) + currentFlowerCenterY;

        // color enhancements
        let color;
        let aDegrees = n * divergence;
        if (currentColorOption == "rgbN"){
            //1 - change RGB based on value of n
		    color = `rgb(${n % 256},0,255)`;
        } else if(currentColorOption == "rgbA"){
            //2 - change RGB based on angle of dot
            color = `rgb(${aDegrees % 256},0,255)`;
        } else if(currentColorOption == "hslN"){
            //3 - change HSL based on what quadrant the petal is in
            color = `hsl(${n/5 % 360},100%,50%)`;
        } else if(currentColorOption == "hslQ"){
            //4 - change HSL based on the value of n
            color = `hsl(${aDegrees % 360},100%,50%)`;
        }

        // Finally, draw the petal        
        if(currentPetalShape == "heart"){
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(a + 90); // have hearts point in towards flower center
            dxdLIB.drawHeart(ctx, 0, 0, 10, color);

            ctx.restore();
        }
        else{
            dxdLIB.drawCircle(ctx, x, y, 10, 0, Math.PI*2, false, color, 1);
        }

        n++;
    }
    
    // my face drawing code from first-canvas-modded assignment
    function drawSmiley(x, y, faceRadius){
        // face base
        dxdLIB.drawCircle(ctx, x, y, faceRadius, 0, Math.PI*2, false, "yellow", 1.0);

        // left eye
        dxdLIB.drawCircle(ctx, x - faceRadius/4, y - faceRadius/6, faceRadius/5, 0, Math.PI*2, false, "gray", 1.0);

        // right eye
        dxdLIB.drawCircle(ctx, x + faceRadius/4, y - faceRadius/6, faceRadius/5, 0, Math.PI*2, false, "gray", 1.0);

        // smile    // semi-circle
        dxdLIB.drawCircle(ctx, x, y + faceRadius/6, faceRadius/2, 0, Math.PI, false, "pink", 1.0);
    }
    
})();   //IIFE END