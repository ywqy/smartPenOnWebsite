/**
 * Created by anowl on 16/2/23.
 */
var canvas = document.getElementById("canvas");
var canvasDraw = document.getElementById("canvasDraw");
canvas.style.border = "red 1px solid";
canvasDraw.style.border = "red 5px solid";
var ctx = canvas.getContext("2d");
var ctxDraw = canvasDraw.getContext("2d");

var plotCurrent = document.getElementById("WHT");
var plotTotal = document.getElementById("Array");

var button=document.getElementById("draw");

function Line(color,thick,path){
    this.color=color;
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
    this.thick=thick;
}
Line.prototype={
    getAllDataString:function(){
        var string=" Color:"+this.color+" Thick:"+this.thick;
        plotCurrent.textContent=this.pathDuringX.length;
        for(var i=0;i<this.pathDuringX.length;i++){
            string+="X:"+this.pathDuringX[i]+" Y:"+this.pathDuringY[i]+" Time:"+this.pathDuringTimes[i].getTime()+"   ";
        }

        return string;
    },
    addPath:function(){
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
}
Lines.prototype={
    drawLinesAuto:function(){
        if(this.array!=[]){
            var that=this;
            for(var lineCount=0;lineCount<this.array.length;lineCount++){
                Lines.prototype.lineInterval(lineCount,that);
            }
        }
    },
    lineInterval:function(lineCount,that){
        window.setTimeout(function(){
            Lines.prototype.drawLineAuto(lineCount,that);
        },(that.array[lineCount].pathDuringTimes[0]-that.array[0].pathDuringTimes[0]));
    },
    drawLineAuto:function(i,that){
        if(that.array[i]!=null){
            var line=that.array[i];
            for(var pointCount=0;pointCount<line.pathDuringX.length-2;pointCount++){
                Lines.prototype.pointInterval(pointCount,line);
            }
        }
    },
    pointInterval:function(pointCount,line){
        window.setTimeout(function(){
            Lines.prototype.drawLine(pointCount,line);
        },(line.pathDuringTimes[pointCount+1]-line.pathDuringTimes[0]));
    },
    drawLine:function(pointCount,line){
        if(line.pathDuringX.length>1){
            ctxDraw.lineWidth=line.thick;
            ctxDraw.lineCap="round";
            ctxDraw.strokeStyle=line.color;
            ctxDraw.beginPath();
            ctxDraw.moveTo(line.pathDuringX[pointCount],line.pathDuringY[pointCount]);
            ctxDraw.lineTo(line.pathDuringX[pointCount+1],line.pathDuringY[pointCount+1]);
            ctxDraw.stroke();
        }
    }

};
var lines=new Lines();
var line=new Line("rgb(100,100,100)",2,null);
var movFuc=function(){
    line.addPath(canvas);
    line.drawLine(ctx);

};
button.onclick=function(){
    lines.drawLinesAuto();
};
window.addEventListener("mousedown",function(){
    window.addEventListener("mousemove",movFuc,false);
},false);
window.addEventListener("mouseup",function(){
    lines.array.push(line);
    line=new Line("rgb(100,100,100)",2,null);
    window.removeEventListener("mousemove",movFuc,false);
},false);


































