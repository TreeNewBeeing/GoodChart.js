import * as d3 from 'd3'
import { bindTriangle } from "../interaction/triangle"

export class triangle{

	constructor(parent,chart){
		this.parent = parent;
		this.chart = chart;
		this.triangles = []
		this.rightI = 0;
		this.leftI = 0;
	}

	draw(){

		// left-left triangle
		var tri0 = this.parent.element.append("polygon")
		.attr("class","draggable ll")
		.attr("fill","black")
		.style("display","true")

		// right-right triangle
		var tri1 = this.parent.element.append("polygon")
		.attr("class","draggable rr")
		.attr("fill","black")
		.style("display","true") 

		// left-right triangle
		var tri2 = this.parent.element.append("polygon")
		.attr("class","draggable lr")
		.attr("fill","black")
		.style("display","true") 

		// right-left triangle
		var tri3 = this.parent.element.append("polygon")
		.attr("class","draggable rl")
		.attr("fill","black")
		.style("display","true") 

		this.triangles = this.getTriPos()

		tri0.attr('points',this.getTriPosString(this.triangles[0]))
		tri1.attr('points',this.getTriPosString(this.triangles[1]))
		tri2.attr('points',this.getTriPosString(this.triangles[2]))
		tri3.attr('points',this.getTriPosString(this.triangles[3]))

		this.element = [tri0,tri1,tri2,tri3]

		bindTriangle(this)


	}

	clear(){
		this.element.forEach(function(d){
			d.remove()
		})
	}

	getTriPos(){

		var rect = this.parent.element.select("rect")

		var triangles = []
		var triLength = this.chart.triLength
		var triHeight = this.chart.triPadding
		
		var leftX = parseInt(rect.attr("x"))
		var rightX = leftX + parseInt(rect.attr("width"))
		
		var rectHeight = parseInt(rect.attr("height"))
		
		if( triHeight > rectHeight){
			triHeight = rectHeight
		}

		triangles.push([])
		triangles[0] = [leftX,triHeight,leftX,(triHeight-(2*triLength)),(leftX-(1.73*triLength)),(triHeight-triLength)]
		triangles.push([])
		triangles[1] = [rightX,triHeight,rightX,(triHeight-(2*triLength)),(rightX+(1.73*triLength)),(triHeight-triLength)]
		triangles.push([])
		triangles[2] = [leftX+1,triHeight,leftX+1,(triHeight-(2*triLength)),(leftX+(1.73*triLength)+1),(triHeight-triLength)]
		triangles.push([])
		triangles[3] = [rightX-1,triHeight,rightX-1,(triHeight-(2*triLength)),(rightX-1-(1.73*triLength)),(triHeight-triLength)]

		return triangles;
	}

	getTriPosString(tri){
		return tri[0]+","+tri[1]+" "+tri[2]+","+tri[3]+" "+tri[4]+","+tri[5]
	}
}