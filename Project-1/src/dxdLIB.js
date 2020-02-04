(function(){

    let dxdLIB = {

        // shape-drawing helper functions
        drawLine(ctx, startX, startY, endX, endY, lineWidth=2, strokeStyle="black"){
            ctx.save();

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.closePath();

            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = strokeStyle;
            ctx.stroke();
            
            ctx.restore();
        },

        drawTriangle(ctx, topX, topY, width, height, fillStyle="black", lineWidth=0, strokeStyle="black"){
            ctx.save();

            ctx.beginPath();
            ctx.moveTo(topX, topY);
            ctx.lineTo(topX - (width / 2), topY + height);
            ctx.lineTo(topX + (width / 2), topY + height);
            ctx.closePath();
            ctx.fillStyle = fillStyle;
            ctx.fill();

            if (lineWidth > 0){
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = strokeStyle;
                ctx.stroke();
            }
            
            ctx.restore();
        },

        drawRectangle(ctx, x, y, width, height, fillStyle="black", lineWidth=0, strokeStyle="black"){
            ctx.save();

            ctx.fillStyle = fillStyle;
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.closePath();
            ctx.fill();

            if (lineWidth > 0){
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = strokeStyle;
                ctx.stroke();
            }

            ctx.restore();
        },

        drawCircle(ctx, x, y, radius, startAngle, endAngle, ccw=false, fillStyle="black", alphaValue=0.2, lineWidth=0, strokeStyle="black"){
            ctx.save();

            ctx.fillStyle = fillStyle;
            ctx.globalAlpha = alphaValue;
            ctx.beginPath();
            ctx.arc(x, y, radius, startAngle, endAngle, ccw);
            ctx.closePath();
            ctx.fill();

            if (lineWidth > 0){
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = strokeStyle;
                ctx.stroke();
            }

            ctx.restore();
        },

        drawRing(ctx, x, y, innerRadius, outerRadius, fillStyle="black"){
            ctx.save();

            ctx.fillStyle = fillStyle;
            ctx.beginPath();
            ctx.arc(x, y, outerRadius, 0, Math.PI*2, false);
            ctx.arc(x, y, innerRadius, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        },


        // get random values
        getRandomColor(){
            const getByte = _ => 55 + Math.round(Math.random() * 200); // ES6 VERSION

            return `rgba(${getByte()}, ${getByte()}, ${getByte()}, .8)`; // ES6 VERSION
        },

        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    };

    if (window){
        window["dxdLIB"] = dxdLIB;
    } else {
        throw "'window' is not defined";
    }

})();