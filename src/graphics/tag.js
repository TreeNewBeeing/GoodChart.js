import * as d3 from 'd3'
import { bindTag } from '../interaction/tag'

export class tag{
	constructor(parent,chart){
		this.parent = parent;
		this.chart = chart;
	}

	draw(){
		var tag = this.parent.element.append("text")
			.text(this.getTag)
			.attr("dy",this.getDy.bind(this))
			.style("text-anchor", "middle")
			.style("fill","black")

		this.element = tag
		bindTag(this)
	}

	getTag(d){
		return d.rangeMin() + " - " + d.rangeMax();
	}

	getDy(d){
		var dy = this.chart.height-this.chart.y(d.value()) + this.chart.tagPadding
		return dy;
	}
}
