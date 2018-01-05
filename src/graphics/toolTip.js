import * as d3 from "d3"
import d3Tip from "d3-tip"

export class toolTip{

	constructor(parent,chart){
		this.parent = parent;
		this.chart = chart;
		this.left = 0;
	}

	draw(){
		d3.tip = d3Tip;
    	var tip = d3.tip()
	  		.attr('class', 'd3-tip')
	  		.offset([-10, 0])
	  		.html(function(d) {
	  			var html = "<strong># of people:</strong> <span style='color:red;'>" + d.value() + "</span><br> ";
	  			var rangeMin = d.rangeMin()
	  			var rangeMax = d.rangeMax()
	  			html += "<strong>range:</strong> <span style='colore:red;text-align:center'>" + rangeMin +" - "+ rangeMax + "</span>";
	  			return html
	  		})

		this.element = tip;
		this.parent.element.call(tip)
	}

	show(d){
		this.element.show(d)
		this.left = parseInt(d3.select(".d3-tip").style("left"))
	}

	hide(d){
		this.element.hide(d)
	}

	move(dx){
		this.element.style("left",(dx/2+this.left)+"px")
	}

	reset(){
		this.element.style("left",left+"px")
	}

	update(dx,x1,x2){
		this.move(dx)

		
		var container = this.chart.bins.container
		var value = 0;
		for(var i=x1;i<=x2;i++){
			value += container[i].value()
		}

		var html = "<strong># of people:</strong> <span style='color:red;'>" + value + "</span><br> ";
		var rangeMin = container[x1].rangeMin()
	  	var rangeMax = container[x2].rangeMax()
	  	html += "<strong>range:</strong> <span style='colore:red;text-align:center'>" + rangeMin +" - "+ rangeMax + "</span>";

		d3.select('.d3-tip').html(html)


	}

}