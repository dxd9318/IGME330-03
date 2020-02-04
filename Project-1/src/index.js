(function (){   //IIFE START
    "use strict";

    // canvas setup variables
    const canvasWidth = 800, canvasHeight = 600;
    let canvas, ctx;

    // user-input variables
    let petalShape = "circle";
    let coloringOption = 1;
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
    // click on canvas to draw flower at click position

    // add this flower's center coords and radius to an array, for onclick collision detection later

    // draw flower
        // draw petals using shape user designated shape and coloring option (1, 2, 3, 4)
        // transform-rotate each petal to point towards flower's center 
        // limit petal rows to number of rows designated by user input (3, 5, 7, 10)
        // draw smiley at center, opposite color as the flower center
    */

    function setupUI(){
        canvas.onclick = canvasClicked;
    }

    // from modified first-canvas assignment
    function canvasClicked(e){
        // set location of click to a new flower's center
        let rect = e.target.getBoundingClientRect();
        currentFlowerCenterX = e.clientX - rect.x;
        currentFlowerCenterY = e.clientY - rect.y;
        //console.log(currentFlowerCenterX, currentFlowerCenterY);

        // call phyllotaxis flower drawing method
        n = 0;  // reset n to 0 so flower starts growing from new center
        phyllotaxisLoop();

        // draw smiley at flower center
        drawSmiley(currentFlowerCenterX, currentFlowerCenterY, 15);
    }

    // from phyllotaxis assignment
    // WILL NEED TO HEAVILY REPURPOSE THE FOLLOWING
    function phyllotaxisLoop(){
		setTimeout(phyllotaxisLoop,1000/30);
		// each frame draw a new dot
		// `a` is the angle
		// `r` is the radius from the center of the flower
		// `c` is the "padding" between the dots
		let a = n * dxdLIB.dtr(divergence);
		let r = c * Math.sqrt(n);
		//console.log(a,r);

		// now calculate the `x` and `y`
		// let x = r * Math.cos(a) + canvasWidth/2;
        // let y = r * Math.sin(a) + canvasHeight/2;
        let x = r * Math.cos(a) + currentFlowerCenterX;
		let y = r * Math.sin(a) + currentFlowerCenterY;
		console.log(x,y);

		//drawCircle(ctx,x,y,2,"white");

		// color enhancements
		// 1 - change RGB based on value of n
		//let color = `rgb(${n % 256},0,255)`;
		
		// 2 - change RGB based on angle of dot
		let aDegrees = n * divergence;
		let color = `rgb(${aDegrees % 256},0,255)`;

		// 3 - change HSL based on what quadrant the petal is in
		//let aDegrees = n * divergence;
		//let color = `hsl(${aDegrees % 360},100%,50%)`;

		// 4 - change HSL based on the value of n
		//let aDegrees = n * divergence;
        //let color = `hsl(${n/5 % 360},100%,50%)`;
        
        //drawCircle(ctx, x, y, radius, startAngle, endAngle, ccw = false, 
            //fillStyle = "black", alphaValue = 0.2, lineWidth = 0, strokeStyle = "black")
        dxdLIB.drawCircle(ctx, x, y, 2, 0, Math.PI*2, false, color);
        
        //drawCircle(ctx,x,y,2,color);
		//drawHeart(ctx,x,y,5,color);

		n++;
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