// triganle
import * as d3 from "d3";

import { main } from "../core/index.js"
import { rectangle } from "../graphics/rectangle"

var currentX = 0;
var rectX = 0;
var oldWidth = 0;
var combine = true;
var sub = null;

export function bindTriangle(tri){
	tri.element[0].call(d3.drag()
			.on("start",selectedTriangleLL.bind(tri))
		  	.on("drag",moveTriangleLL.bind(tri))
		  	.on("end",dropTriangleLL.bind(tri))
	)
	tri.element[1].call(d3.drag()
			.on("start",selectedTriangleRR.bind(tri))
		  	.on("drag",moveTriangleRR.bind(tri))
		  	.on("end",dropTriangleRR.bind(tri))
	)
	tri.element[2].call(d3.drag()
			.on("start",selectedTriangleLR.bind(tri))
		  	.on("drag",moveTriangleLR.bind(tri))
		  	.on("end",dropTriangleLR.bind(tri))
	)
	// tri.element[3].call(d3.drag()
	// 		.on("start",selectedTriangleRL.bind(tri))
	// 	  	.on("drag",moveTriangleRL.bind(tri))
	// 	  	// .on("end",dropTriangle.bind(tri))
	// )
}

function selectedTriangle(){
	var d = this.chart.bins.container[this.parent.i];
	currentX = d3.event.x;
	oldWidth = new rectangle(null,this.chart).getWidth(d)
	rectX = -(oldWidth/2)
}




// LL Triangle
function selectedTriangleLL(){
	var d = this.chart.bins.container[this.parent.i];
	currentX = d3.event.x;
	oldWidth = new rectangle(null,this.chart).getWidth(d)
	rectX = -(oldWidth/2)
	sub = this.chart.bins.addSub(d)
}

function moveTriangleLL(){

	// set up
	var selection = d3.select("#selection")
	var rect = d3.select("#selection rect")
	var leftTri = d3.select("#selection .ll")
	var rightTri = d3.select("#selection .lr")

	// calculate mouse move
	var dx = d3.event.x - currentX;
	if(dx > 0){
		dx = 0
	}
	var newWidth = oldWidth - dx 
	
	// change selection
	rect.attr("width",newWidth)
		.attr("x",rectX+dx)
	leftTri.attr("points",
		generatePoints(this.triangles[0],dx))
	rightTri.attr("points",
		generatePoints(this.triangles[2],dx))
	

	// change tooltip
	var x = this.chart.bins.container[this.parent.i]
	var x1 = calcLL(rect,this.parent)
	var x2 = x.rangeMax()
	var pos1 = sub.i
	var pos2 = x.next == null ? this.chart.bins.size() : x.next.i
	this.chart.tip.updateCombine(dx,x1,x2,pos1,pos2)
}


function calcLL(rect,selection){
	var chart = selection.chart
	var i = selection.i
	var d = chart.bins.container[i]
	var dx =  rectX - parseFloat(rect.attr('x'))


	// calculate number
	var x = d.rangeMin();
	while(d.pre != null){

		d = d.pre;

		// in Interval
		dx -= chart.rectInterval;
		if(dx < 0){
			break;
		}

		// in rectangle
		var width = d.size()/chart.bins.interval*chart.rectWidth
		// console.log(width)
		var ratio = dx/width;
		dx -= width;
		if(ratio < 1){
			x = (1-ratio)*d.size()+d.rangeMin()
			break;
		}
		x = d.rangeMin()
	}

	x = parseInt(x)
	// record change
	chart.bins.combineLeft(sub,x)

	return x;
}

function dropTriangleLL(){
	this.chart.bins.updateLL(sub);
	this.chart.clear();
	main(this.chart.bins)
}





// RR 
function selectedTriangleRR(){
	var d = this.chart.bins.container[this.parent.i];
	currentX = d3.event.x;
	oldWidth = new rectangle(null,this.chart).getWidth(d)
	rectX = -(oldWidth/2)
	if(d.next == null){
		return
	}
	sub = this.chart.bins.addSub(d.next)


	
}	

function moveTriangleRR(){

	// set up
	var selection = d3.select("#selection")
	var rect = d3.select("#selection rect")
	var leftTri = d3.select("#selection .rl")
	var rightTri = d3.select("#selection .rr")

	// calculate mouse move
	var dx = d3.event.x - currentX;
	if(dx < 0){
		dx = 0
	}
	var newWidth =  oldWidth + dx 
	
	// change selection
	rect.attr("x",rectX)
		.attr("width",newWidth)
	leftTri.attr("points",
		generatePoints(this.triangles[1],dx))
	rightTri.attr("points",
		generatePoints(this.triangles[3],dx))

	// change tooltip
	if(sub == null)
		return
	var x = this.chart.bins.container[this.parent.i]
	var x1 = x.rangeMin()
	var x2 = calcRR(rect,this.parent)
	var pos1 = x.i
	var pos2 = sub.i
	// console.log(pos1,pos2)
	this.chart.tip.updateCombine(dx,x1,x2,pos1,pos2)
}

function calcRR(rect,selection){
	var chart = selection.chart
	var i = selection.i
	var d = chart.bins.container[i]
	var dx =  parseFloat(rect.attr('width')) - oldWidth;

	// console.log(dx)
	// calculate number
	var x = d.rangeMax();
	while(d.next != null){

		d = d.next;

		// in Interval
		dx -= chart.rectInterval;
		if(dx < 0){
			break;
		}

		// in rectangle
		var width = d.size()/chart.bins.interval*chart.rectWidth
		// console.log(width)
		var ratio = dx/width;
		dx -= width;
		if(ratio < 1){
			x = ratio*d.size()+d.rangeMin()
			break;
		}
		x = d.rangeMax()
	}

	x = parseInt(x)

	// record change
	chart.bins.combineRight(sub,parseInt(x))
	return x;
}

function dropTriangleRR(){
	this.chart.bins.updateRR(sub);
	this.chart.clear();
	main(this.chart.bins)
}








// LR

function selectedTriangleLR(){
	var d = this.chart.bins.container[this.parent.i];
	currentX = d3.event.x;
	oldWidth = new rectangle(null,this.chart).getWidth(d)
	rectX = -(oldWidth/2)
	sub = this.chart.bins.addSub(d)
	sub.pre = d;
	sub.next = d.next;

	
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

	var x = this.chart.bins.container[this.parent.i]
	var x1 = calcLR(rect,this.parent)
	var x2 = x.rangeMax()
	var pos1 = sub.i
	var pos2 = x.next == null ? this.chart.bins.data.length : x.next.i 
	this.chart.tip.updateCombine(dx,x1,x2,pos1,pos2)
}

function calcLR(rect,selection){
	var chart = selection.chart
	var i = selection.i
	var d = chart.bins.container[i]
	var length = chart.bins.container[selection.i].size()

	var dx =  parseInt(rect.attr("x")) - rectX + 1;
	var pos = parseInt(dx / oldWidth * chart.bins.container[selection.i].size())  + d.rangeMin();
	console.log(pos)

	chart.bins.splitLeft(sub,pos);
	return pos;

}

function dropTriangleLR(){
	this.chart.bins.updateLR(sub);
	this.chart.clear();
	main(this.chart.bins)
}







// RL
function selectedTriangleRL(){
	var d = this.chart.bins.container[this.parent.i];
	currentX = d3.event.x;
	oldWidth = new rectangle(null,this.chart).getWidth(d)
	rectX = -(oldWidth/2)
	sub = this.chart.bins.addSub(d)
	sub.pre = d;
	sub.next = d.next;
}	
function moveTriangleRL(){

	var selection = d3.select("#selection")
	var rect = d3.select("#selection rect")
	var leftTri = d3.select("#selection .rl")
	var rightTri = d3.select("#selection .rr")

	var dx = d3.event.x - currentX;
	if(dx > 0){
		dx = 0
	}
	if(dx < -oldWidth+1){
		dx = -oldWidth+1
	}
	var newWidth =  oldWidth + dx 
	rect.attr("x",rectX)
		.attr("width",newWidth)

	leftTri.attr("points",
		generatePoints(this.triangles[3],dx))

	rightTri.attr("points",
		generatePoints(this.triangles[1],dx))

	var x = this.chart.bins.container[this.parent.i]
	var x1 = x.rangeMin() 
	var x2 = calcRL(rect,this.parent)
	console.log(sub)
	var pos1 = x.pre == null ? 0 : x.pre.i 
	var pos2 = sub.i
	this.chart.tip.updateCombine(dx,x1,x2,pos1,pos2)
}

function calcRL(rect,selection){
	var chart = selection.chart;
	var i = selection.i
	var d = chart.bins.container[i]
	var length = chart.bins.container[selection.i].size()

	var dx =  oldWidth - parseFloat(rect.attr("width")) + 1;
	var pos = d.rangeMax() -  parseInt(dx / oldWidth * chart.bins.container[selection.i].size()) ;
	console.log(pos)

	 chart.bins.splitLeft(sub,pos);
	return pos;
}


function dropTriangle(){

	if(combine){
		this.chart.bins.combine(this.leftI,this.rightI)
	}else{
		this.chart.bins.split(this.I,this.pos)
	}
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



