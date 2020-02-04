let canvas, ctx;
const canvasWidth = 600, canvasHeight = 400;
const cellWidth = 10;
const fps = 12;
let lifeworld;

window.onload = init;

function init() {
    canvas = document.querySelector("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");
    // TODO: init lifeworld
    loop();
}

function loop() {
    setTimeout(loop, 1000 / fps);
    // TODO: update lifeworld
    drawBackground();
    drawWorld();
}

function drawBackground() {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = 4 / fps;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();
}

function drawWorld() {
    // TODO: implement
}

function drawCell(col, row, dimensions, alive) {
    // TODO: implement
}