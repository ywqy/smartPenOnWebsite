/**
 * Created by anowl on 16/3/1.
 */
window.addEventListener("load",eventWindowLoaded,true);
var EventUtil = {
    getEvent:function(event){
        return event?event:window.event;
    }
};


function eventWindowLoaded(){
    canvasApp();
}

function canvasSupport(){
    return Modernizr.canvas;
}

function canvasApp(){
    if(!canvasSupport()){
        return;
    }
    //canvasAppSettingValue
    var canvasWrite = document.getElementById("canvas");
    var canvasDraw = document.getElementById("canvasDraw");
    var drawButton = document.getElementById("draw");
    var drawAllButton = document.getElementById("drawAll");

    canvasWrite.style.border = "red 1px solid";
    canvasDraw.style.border = "red 5px solid";

    var contextWrite = canvasWrite.getContext("2d");
    var contextDraw = canvasDraw.getContext("2d");

    var bookName = "walewalewa";
    var page = 1.0;
    var lines = new Lines(contextDraw);
    var color = "#000000";
    var thick = 2;
    var line = new Line(color,thick,null);
    var playSpeed = 1.0;
    var alpha = .1;


    //canvasAppSettingEventListener
    window.addEventListener("mousedown",function(){
        window.addEventListener("mousemove",drawLine,false);
    },false);
    window.addEventListener("mouseup",function(){
        lines.array.push(line);
        line = new Line(color,2,null);
        window.removeEventListener("mousemove",drawLine,false);
    },false);


    drawButton.onclick = play;
    drawAllButton.onclick = fullDisplay;



    function drawLine(event){
        line.addPath(canvasWrite,EventUtil.getEvent(event));
        line.drawLine(contextWrite);
    }

    function play(){

        playWithSpeed(playSpeed);
    }

    function pause(){

    }

    function stop(){

    

    function playWithSpeed(playSpeed){
        lines.hasTimeDuringInLines = true;
        lines.hasTimeDuringInPoints = true;
        lines.alpha = 1.0;
        lines.playSpeed = playSpeed;
        lines.drawLinesAuto();
    }

    function fullDisplay(){
        lines.hasTimeDuringInLines = false;
        lines.hasTimeDuringInPoints = false;
        lines.alpha = alpha;
        lines.drawLinesAuto();
    }

    function testBook(){

    }

    function testPage(){

    }


}




//

function AudioApp(){

}



//





function Line(color,thick,path){
    this.color=color;
    this.thick=thick;

    if(path==null){
        this.pathDuringX=[];
        this.pathDuringY=[];
        this.pathDuringTimes=[];
        this.path=[this.pathDuringX,this.pathDuringY,this.pathDuringTimes];
    }else{
        this.path=path;
        this.pathDuringX=path[0];
        this.pathDuringY=path[1];
        this.pathDuringTimes=path[2];
    }

}
Line.prototype={
    getAllDataString:function(){
        var string=" Color:"+this.color+" Thick:"+this.thick;
        //plotCurrent.textContent=this.pathDuringX.length;
        for(var i=0;i<this.pathDuringX.length;i++){
            string+="X:"+this.pathDuringX[i]+" Y:"+this.pathDuringY[i]+" Time:"+this.pathDuringTimes[i].getTime()+"   ";
        }

        return string;
    },
    addPath:function(canvas,event){
        var screenWidth = window.screen.width;
        var screenHeight = window.screen.height;

        var pageWidth = 5716;
        var pageHeight = 6460;
        var mouseScreenX = event.screenX;
        var mouseScreenY = event.screenY;
        var final_mouseX = mouseScreenX/screenWidth*pageWidth/10;
        var final_mouseY = mouseScreenY/screenHeight*pageHeight/10;
        this.pathDuringX.push(final_mouseX);
        this.pathDuringY.push(final_mouseY);
        this.pathDuringTimes.push(new Date());
    },
    drawLine:function(_context){
        var length=this.pathDuringX.length;
        if(length>1){
            _context.lineWidth=this.thick;
            _context.beginPath();
            _context.moveTo(this.pathDuringX[length-2],this.pathDuringY[length-2]);
            _context.lineTo(this.pathDuringX[length-1],this.pathDuringY[length-1]);
            _context.strokeStyle=this.color;
            _context.lineCap="round";
            _context.stroke();
        }
    }
};
function Lines(){
    this.array=[];
    this.hasTimeDuringInLines = false;
    this.hasTimeDuringInPoints = true;
    this.alpha = 1.0;
    this.playSpeed = 1.0;
}
Lines.prototype= {

    drawLinesAuto: function () {
        if (this.array != []) {
            var that = this;
            for (var lineCount = 0; lineCount < this.array.length; lineCount++) {
                Lines.prototype.lineInterval(lineCount, that);
            }
        }
    },
    lineInterval: function (lineCount, that) {
        var linesIntervalTime = 0;
        if(that.hasTimeDuringInPoints){
            if(that.hasTimeDuringInLines){
                linesIntervalTime = that.array[lineCount].pathDuringTimes[0] - that.array[0].pathDuringTimes[0];
            }else{
                var timeInterval = 0;
                for(var i=lineCount;i>0;i--){
                    var length = that.array[i-1].pathDuringTimes.length;
                    timeInterval += that.array[i].pathDuringTimes[0]-that.array[i-1].pathDuringTimes[length-1];
                }
                if(lineCount>0){
                    linesIntervalTime = (that.array[lineCount].pathDuringTimes[0] -timeInterval) - that.array[0].pathDuringTimes[0];
                }

            }
        }

        window.setTimeout(function () {
            Lines.prototype.drawLineAuto(lineCount, that);
        }, linesIntervalTime/that.playSpeed);
    },
    drawLineAuto: function (i, that) {
        if (that.array[i] != null) {
            var line = that.array[i];
            for (var pointCount = 0; pointCount < line.pathDuringX.length - 2; pointCount++) {
                Lines.prototype.pointInterval(pointCount, line, that);
            }
        }
    },
    pointInterval: function (pointCount, line, that) {
        var pointsIntervalTime = 0;
        if(that.hasTimeDuringInPoints){
            pointsIntervalTime = line.pathDuringTimes[pointCount + 1] - line.pathDuringTimes[0];
        }
        window.setTimeout(function () {
            Lines.prototype.drawLine(pointCount, line, that);
        }, pointsIntervalTime/that.playSpeed);
    },
    drawLine: function (pointCount, line , that) {
        var canvasDraw = document.getElementById("canvasDraw");
        var contextDraw = canvasDraw.getContext("2d");
        if (line.pathDuringX.length > 1) {
            contextDraw.lineWidth = line.thick;
            contextDraw.lineCap = "round";
            contextDraw.globalAlpha = that.alpha;
            contextDraw.strokeStyle = line.color;
            contextDraw.beginPath();
            contextDraw.moveTo(line.pathDuringX[pointCount], line.pathDuringY[pointCount]);
            contextDraw.lineTo(line.pathDuringX[pointCount + 1], line.pathDuringY[pointCount + 1]);
            contextDraw.stroke();
        }
    }

};





























