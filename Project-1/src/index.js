(function (){   //IIFE START
    "use strict";

    const canvasWidth = 800, canvasHeight = 600;
    let canvas, ctx;

    window.onload = init;

    function init(){
        canvas = document.querySelector('canvas');
        ctx = canvas.getContext("2d");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        setupUI();
    }

    /* TODO:
    // click on canvas to draw flower at click position

    // add this flower's center coords and radius to an array, for onclick collision detection later

    // draw flower
        // draw petals using shape user designated shape and color
        // have each petal rotate to point towards flower's center 
        // limit petal rows to rows designated by user input
        // draw smiley at center, opposite color as the flower center
    */

    function setupUI(){
        canvas.onclick = canvasClicked;
    }


    function canvasClicked(e){
        let rect = e.target.getBoundingClientRect();
        let mouseX = e.clientX - rect.x;
        let mouseY = e.clientY - rect.y;
        console.log(mouseX,mouseY);

        // call phyllotaxis flower drawing method

        /*
            for(let i = 0; i < 10; i++){
                let x = mouseX + dxdLIB.getRandomInt(-100, 100);
                let y = mouseY + dxdLIB.getRandomInt(-100, 100);
                let width = dxdLIB.getRandomInt(20, 50);
                let height = dxdLIB.getRandomInt(20, 50);
                let color = dxdLIB.getRandomColor();

                dxdLIB.drawRectangle(ctx, x, y, width, height, color);
            }
        */
    }

})();   //IIFE END