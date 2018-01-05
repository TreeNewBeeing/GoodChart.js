// triganle
import * as d3 from "d3";

import { main } from "../core/index.js"

var currentX = 0;
var rectX = 0;
var oldWidth = 0;

export function bindTriangle(tri){
	tri.element[0].call(d3.drag()
			.on("start",selectedTriangle)
		  	.on("drag",moveTriangleLL.bind(tri))
		  	.on("end",dropTriangle.bind(tri))
	)
	tri.element[1].call(d3.drag()
			.on("start",selectedTriangle)
		  	.on("drag",moveTriangleRR.bind(tri))
		  	.on("end",dropTriangle.bind(tri))
	)
	tri.element[2].call(d3.drag()
			.on("start",selectedTriangle)
		  	.on("drag",moveTriangleLR.bind(tri))
		  	.on("end",dropTriangle.bind(tri))
	)
	// tri[3].element.call(d3.drag()
	// 		.on("start",selectedTriangle)
	// 	  	.on("drag",moveTriangleRL)
	// 	  	.on("end",dropTriangle)
	// )
}

function selectedTriangle(){
	currentX = d3.event.x;
	oldWidth = parseInt(d3.select(this.parentNode).select("rect").attr("width"))
	rectX = -(oldWidth/2)
}

function moveTriangleLL(){

	var selection = d3.select("#selection")
	var rect = d3.select("#selection rect")
	var leftTri = d3.select("#selection .ll")
	var rightTri = d3.select("#selection .lr")

	var dx = d3.event.x - currentX;
	if(dx > 0){
		dx = 0
	}
	var newWidth = oldWidth - dx 
	
	rect.attr("width",newWidth)
		.attr("x",rectX+dx)

	leftTri.attr("points",
		generatePoints(this.triangles[0],dx))
	rightTri.attr("points",
		generatePoints(this.triangles[2],dx))
	

	this.leftI = calcIofLL(rect,this.parent)
	this.rightI = this.parent.i

	this.chart.tip.update(dx,this.leftI,this.rightI)
}

function moveTriangleRR(){

	var selection = d3.select("#selection")
	var rect = d3.select("#selection rect")
	var leftTri = d3.select("#selection .rl")
	var rightTri = d3.select("#selection .rr")

	var dx = d3.event.x - currentX;
	if(dx < 0){
		dx = 0
	}
	var newWidth =  oldWidth + dx 
	
	rect.attr("x",rectX)
		.attr("width",newWidth)
	leftTri.attr("points",
		generatePoints(this.triangles[1],dx))
	rightTri.attr("points",
		generatePoints(this.triangles[3],dx))

	this.leftI = this.parent.i
	this.rightI = calcIofRR(rect,this.parent)

	this.chart.tip.update(dx,this.leftI,this.rightI)
}

function moveTriangleLR(){

	var selection = d3.select("#selection")
	var rect = d3.select("#selection rect")
	var leftTri = d3.select("#selection .ll")
	var rightTri = d3.select("#selection .lr")

	var dx = d3.event.x - currentX;
	if(dx < 0 ){
		dx = 0
	}
	if(dx > oldWidth-1){
		dx = oldWidth-1
	}
	var newWidth =  oldWidth - dx 

	rect.attr("width",newWidth)
		.attr("x",rectX+dx)

	leftTri.attr("points",
		generatePoints(this.triangles[2],dx))
	rightTri.attr("points",
		generatePoints(this.triangles[0],dx))

	this.leftI = this.parent.i
	this.I = calcIofLR(rect,this.parent)

	this.chart.tip.update(dx,this.leftI,this.rightI)
}

function moveTriangleRL(){
	var dx = d3.event.x - currentX;
	if(dx > 0){
		dx = 0
	}
	if(dx < -oldWidth+1){
		dx = -oldWidth+1
	}
	var newWidth =  oldWidth + dx 
	d3.select("#selection")
			.attr("x",rectX)
			.attr("width",newWidth)

	d3.select(selectedElement).attr("points",
		generatePoints(triangles[3][selectedI],dx))

	d3.select(selectedElement.parentNode).select(".rr").attr("points",
		generatePoints(triangles[1][selectedI],dx))

	moveToolTip(dx)
}


function dropTriangle(){

	this.chart.bins.combine(this.leftI,this.rightI)
	this.chart.clear();
	main(this.chart.bins)

	// d3.select("#selection rect")
	// 		.attr("width",oldWidth)
	// 		.attr("x",rectX)

	// d3.select(selectedElement.parentNode).select(".ll")
	// 	.attr("points",generatePoints(this.triangles[0],0))
	// d3.select(selectedElement.parentNode).select(".rr")
	// 	.attr("points",generatePoints(this.triangles[1],0))
	// d3.select(selectedElement.parentNode).select(".lr")
	// 	.attr("points",generatePoints(this.triangles[2],0))
	// d3.select(selectedElement.parentNode).select(".rl")
	// 	.attr("points",generatePoints(this.triangles[3],0))

	// resetToolTip()
}


// helper function

function generatePoints(points,dx){
	return (points[0]+dx)+","+points[1]+" "+(points[2]+dx)+","+points[3]+" "+(points[4]+dx)+","+points[5]
}

function calcIofLL(rect,selection){
	var chart = selection.chart
	var x1 = parseInt(rect.attr('x'))+chart.rectX[selection.i]
	var result = selection.i;
	for(var i=selection.i;i>=0;i--){
		if(x1<chart.rectX[i]){
			result = i;
		}
	}

	return result;
}

function calcIofRR(rect,selection){
	var chart = selection.chart
	var x1 = parseInt(rect.attr('x'))+chart.rectX[selection.i]
	var x2 = x1+parseInt(rect.attr('width'))
	var result = selection.i;
	for(var i=selection.i;i<chart.rectX.length;i++){
		if(x2>chart.rectX[i]){
			result = i
		}
	}
	return result;
}

function calcIofLR(rect,selection){
	var x = parseInt(selection.element.attr("x"))

}

