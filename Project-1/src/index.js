(function (){   //IIFE START
    "use strict";

    // canvas setup variables
    const canvasWidth = 800, canvasHeight = 600;
    let canvas, ctx;

    // user-input variables
    let petalRowLimit = 5;
    let petalShape, coloringOption = "rgbN";
    let currentFlowerCenterX, currentFlowerCenterY;

    // other flower drawing values
    let n = 0;
	const c = 9; // `c` is the "padding" between the petals
	const divergence = 129.9;


    // Execution start point -----------------------------------------------------------------
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
        // draw petals using shape user designated shape and coloring option (1, 2, 3, 4)
        // transform-rotate each petal to point towards flower's center 
        // limit petal rows to number of rows designated by user input (3, 5, 7, 10)
        // draw smiley at center, opposite color as the flower center
    */

    function setupUI(){
        //document.querySelector("#")

        document.querySelector("#petalShapeChooser").onchange = function(e){
            petalShape = e.target.value;
        }

        document.querySelector("#petalColorChooser").onchange = function(e){
            coloringOption = e.target.value;
        }

        document.querySelector("#gradientCB").onchange = function(e){
            // /*petal coloring gradient*/ = e.target.checked;
        };

        canvas.onclick = canvasClicked;
    }

    // from modified first-canvas assignment
    function canvasClicked(e){
        // set location of click to a new flower's center
        let rect = e.target.getBoundingClientRect();
        currentFlowerCenterX = e.clientX - rect.x;
        currentFlowerCenterY = e.clientY - rect.y;
        //console.log(currentFlowerCenterX, currentFlowerCenterY);

        // reset n to 0 so flower starts growing from new center
        n = 0;
        // call phyllotaxis flower drawing method
        phyllotaxisLoop();  // ITS GETTING FASTER AFTER EVERY CLICK NOT SURE WHY <<<<<<<<<<<<<<<<<<<<

        // // draw smiley at flower center  // it's getting covered by the petals here
        // drawSmiley(currentFlowerCenterX, currentFlowerCenterY, 15);
    }

    // from phyllotaxis assignment
    function phyllotaxisLoop(){
		setTimeout(phyllotaxisLoop,1000/30);
		// each frame draw a new petal
		// `a` is the angle (of petal from center??)
		// `r` is the radius from the center of the flower
		// `c` is the "padding" between the petals
		let a = n * dxdLIB.dtr(divergence);
		let r = c * Math.sqrt(n);

		// now calculate the `x` and `y` position of current petal
        let x = r * Math.cos(a) + currentFlowerCenterX;
		let y = r * Math.sin(a) + currentFlowerCenterY;
		//console.log(x,y);

        // color enhancements
        /*let color;
        let aDegrees = n * divergence;
        if (coloringOption == "rgbN"){
            // 1 - change RGB based on value of n
		    color = `rgb(${n % 256},0,255)`;
        } else if(coloringOption == "rgbA"){
            // 2 - change RGB based on angle of dot
            color = `rgb(${aDegrees % 256},0,255)`;
        } else if(coloringOption == "hslN"){
            // 3 - change HSL based on what quadrant the petal is in
            color = `hsl(${n/5 % 360},100%,50%)`;
        } else if(coloringOption == "hslQ"){
            // 4 - change HSL based on the value of n
            color = `hsl(${aDegrees % 360},100%,50%)`;
        }*/
		
        // 2 - change RGB based on angle of dot
		let aDegrees = n * divergence;
        let color = `rgb(${aDegrees % 256},0,255)`;
        

        //drawCircle(ctx, x, y, radius, startAngle, endAngle, ccw = false, 
            //fillStyle = "black", alphaValue = 0.2, lineWidth = 0, strokeStyle = "black")
        dxdLIB.drawCircle(ctx, x, y, 10, 0, Math.PI*2, false, color, 1);
        
        //drawCircle(ctx,x,y,2,color);
		//drawHeart(ctx,x,y,5,color);

        n++;
        
        // draw smiley at flower center
        drawSmiley(currentFlowerCenterX, currentFlowerCenterY, 15);
    }

    
    // my face drawing code from first-canvas-modded assignment
    function drawSmiley(x, y, faceRadius){
        // face base
        dxdLIB.drawCircle(ctx, x, y, faceRadius, 0, Math.PI*2, false, "yellow", 1.0);

        // left eye
        dxdLIB.drawCircle(ctx, x - faceRadius/4, y - faceRadius/6, faceRadius/5, 0, Math.PI*2, false, "white", 1.0);

        // right eye
        dxdLIB.drawCircle(ctx, x + faceRadius/4, y - faceRadius/6, faceRadius/5, 0, Math.PI*2, false, "white", 1.0);

        // smile    // semi-circle
        dxdLIB.drawCircle(ctx, x, y + faceRadius/6, faceRadius/2, 0, Math.PI, false, "white", 1.0);


        // had to scrap SG-1 smiley because making it as small as i wanted would've eliminated some details in it.
        // Will re-look at it using transform-scale later.
    }
    

})();   //IIFE END