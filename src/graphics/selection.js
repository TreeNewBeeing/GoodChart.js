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
	      .attr("i",this.i)
	      .attr("width", this.width)
	      .attr("height", this.height)
	      .style("fill","red")
	      .style("opacity","0.8")

	    this.adapt()
	    var triangle0 = new triangle(this,this.chart)
	    triangle0.draw()

	    bindSelection(this)
	    // this.parent.element.appendChild(selection)

	}

	clone(rect,d,i){
		this.x = rect.getX(d)
		this.width = rect.getWidth(d)
		this.height = rect.getHeight(d)
		this.transform = rect.parent.getTransform(d,i)
		this.i = i;

	}

	adapt(){
		var rect = this.element.select("rect")
		var tri = this.element.selectAll(".draggable")
		var tooltip = this.chart.tip
		var height = parseInt(rect.attr("height"))
		if(height < 100){
			rect.attr("height",100)
				.style("fill","white")
				.attr("y",-100+height)
				.style("stroke","red")
				.style("opacity","0.5")
			tooltip.element.offset([-130+height,0])
		}
	}

	removeAdapt(){
		var tooltip = this.chart.tip;
		tooltip.offset([0,0])
	}

}