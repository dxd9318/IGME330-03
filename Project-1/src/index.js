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
    }

})();   //IIFE END