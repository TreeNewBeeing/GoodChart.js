import * as d3 from 'd3'
import { triangle } from "./triangle"
import { bindSelection } from "../interaction/selection"

export class selection{
	
	constructor(parent,chart){
		this.parent = parent;
		this.chart = chart;
	}

	draw(){
		var selection = this.parent.element.append('g')
							.attr("id","selection")
							.attr("transform",this.transform)

		this.element = selection
		
		selection.append("rect")
	      .attr("class", "rect")
	      .attr("x", this.x)
	      .attr("width", this.width)
	      .attr("height", this.height)
	      .style("fill","red")


	    var triangle0 = new triangle(this,this.chart)
	    triangle0.draw()

	    bindSelection(this)
	    // this.parent.element.appendChild(selection)

	}

	clone(rect,d){
		this.x = rect.getX(d)
		this.width = rect.getWidth(d)
		this.height = rect.getHeight(d)
		this.transform = rect.parent.getTransform(d)
		this.i = d.index;

	}

}