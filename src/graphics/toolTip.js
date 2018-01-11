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
		this.element.offset([-10,0])
	}

	move(dx){
		this.element.style("left",(dx/2+this.left)+"px")
	}

	reset(){
		this.element.style("left",left+"px")
	}

	updateCombine(dx,x1,x2,pos1,pos2){
		this.move(dx)

		// console.log(pos2)
		var html = "<strong># of people:</strong> <span style='color:red;'>" + (pos2-pos1) + "</span><br> ";
	  	html += "<strong>range:</strong> <span style='colore:red;text-align:center'>" + x1 +" - "+ x2 + "</span>";

		d3.select('.d3-tip').html(html)


	}

	updateSplit(dx, i, pos1, pos2){
		// this.move(dx)

		// var container = this.chart.bins.container
		// console.log(pos1)
		// var rangeMin = container[i].rangePos(pos1);
		// var rangeMax = container[i].rangePos(pos2);

		// var value = 0;
		// for(var x=pos1;x<=pos2;x++){
		// 	value += container[i][x].length;
		// }

		// var html = "<strong># of people:</strong> <span style='color:red;'>" + value + "</span><br> ";
		// html += "<strong>range:</strong> <span style='colore:red;text-align:center'>" + rangeMin +" - "+ rangeMax + "</span>";

		// d3.select('.d3-tip').html(html)
	}

}