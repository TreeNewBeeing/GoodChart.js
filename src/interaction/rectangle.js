// rectangle
import * as d3 from "d3";
import { selection } from "../graphics/selection"

export function bindRectangle(rect){
	
	rect.element.on('click', selectRectangle.bind(rect))
				.on('mouseover', reduceOpacity)
				.on('mouseout', fullOpacity)

}


function selectRectangle(d){

	var chart = this.chart
	
	// reset
	d3.select("#selection").remove()

	var selection0 = new selection(this.chart, this.chart)
	selection0.clone(this,d)
	selection0.draw()
	

	// show tooltip
	chart.tip.show(d)

}

function reduceOpacity(){
	d3.select(this).style("opacity","0.8")
}

function fullOpacity(){
	d3.select(this).style("opacity","1")
}
