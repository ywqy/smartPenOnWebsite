var canvas = document.getElementById("canvas");
var canvasDraw = document.getElementById("canvasDraw");
canvas.style.border = "red 1px solid";
canvasDraw.style.border = "red 5px solid";
var ctx = canvas.getContext("2d");
var ctxDraw = canvasDraw.getContext("2d");

var plotCurrent = document.getElementById("WHT");
var plotTotal = document.getElementById("Array");

var xyTimeArray=[];
xyTimeArray[0]=[];
xyTimeArray[1]=[];
xyTimeArray[2]=[];

var button=document.getElementById("draw");
button.onclick=function(){
    drawLineWithTime(ctxDraw);
};

canvas.addEventListener("click",function(){

    for(var i=0;i<xyTimeArray[0].length;i++){
        plotTotal.textContent+="(";
        for(var j=0;j<3;j++){
            if(j==2){
                plotTotal.textContent+=xyTimeArray[2][i].getTime();
            }else{
                plotTotal.textContent+=(xyTimeArray[j][i]+" , ");
            }
        }
        plotTotal.textContent+="), \n";
    }
},false);
canvas.addEventListener("mousemove",function(){
    plotCurrent.textContent=movePosition();
    drawLine(ctx);
},false);

function movePosition() {
    var canvasOriginPointX=canvas.getBoundingClientRect().left;
    var canvasOriginPointY=canvas.getBoundingClientRect().top;
    xyTimeArray[0].push(event.pageX-canvasOriginPointX);
    xyTimeArray[1].push(event.pageY-canvasOriginPointY);
    xyTimeArray[2].push(new Date());
    return (event.pageX-canvasOriginPointX) + ',' + (event.pageY-canvasOriginPointY)+','+new Date().getTime();
}

function drawLine(_context){
    if(xyTimeArray[0].length>1){
        _context.lineWidth=1;
        _context.beginPath();
        _context.moveTo(xyTimeArray[0][xyTimeArray[0].length-2],xyTimeArray[1][xyTimeArray[0].length-2]);
        _context.lineTo(xyTimeArray[0][xyTimeArray[0].length-1],xyTimeArray[1][xyTimeArray[0].length-1]);
        _context.stroke();
    }
}
function drawLineWithTime(_context){
    var i=0;
    var t;
    if(i<xyTimeArray[2].length-2){
        t=window.setInterval(function(){drawLineAuto(i++);},(xyTimeArray[2][i+1]-xyTimeArray[2][i]));
    }else{
        window.clearInterval(t);
    }
}
function drawLineAuto(i){
    if(xyTimeArray[0].length>1) {
        ctxDraw.lineWidth = 1;
        ctxDraw.beginPath();
        ctxDraw.moveTo(xyTimeArray[0][i], xyTimeArray[1][i]);
        ctxDraw.lineTo(xyTimeArray[0][i + 1], xyTimeArray[1][i + 1]);
        ctxDraw.stroke();
    }

}