import * as d3 from 'd3'
import { toolTip } from "./toolTip"

export class chart{

	constructor(bins){

		// bins config
		this.bins = bins

		// svg config
		this.margin = {top: 80, right: 20, bottom: 30, left: 40}
		this.width = 600 - this.margin.left - this.margin.right
		this.height = 500 - this.margin.top - this.margin.bottom

		// rectangle config
		this.rectWidth = 50
		this.rectInterval = 30

		// bar config
		this.rectX = this.getRectX()

		// triangle config
		this.triLength = 5;
		this.triPadding = 40;
		
		// tag config
		this.tagPadding = 20;

		// axis config
		this.x = d3.scaleLinear()
		          .range([0, this.width])
		          .domain([0, this.bins.maxX]);
		this.y = d3.scaleLinear()
		          .range([this.height, 0])
		          .domain([0, this.bins.maxY]);  

		// toolTip
		this.tip = new toolTip(this,this);


		// toolTip config
		// this.tip = createToolTip(bar,config);


	}

	draw(){
		var svg = d3.select("body")
	      .append("svg")
	      .attr("width", this.width + this.margin.left + this.margin.right)
	      .attr("height", this.height + this.margin.top + this.margin.bottom)
	      .append("g")
	      .attr("transform", 
	            "translate(" + this.margin.left + "," + this.margin.top + ")");
	    
	    this.element = svg;
	}

	clear(){
		d3.selectAll("svg").remove();
		d3.selectAll(".d3-tip").remove();
	}


	// return an array of x positions of bars
	getRectX(){

		var arr = []

		var bins = this.bins;
		var start = this.rectInterval;

		for(var i=0; i<bins.container.length;i++){
			var length = bins.container[i].size() / bins.interval;
			start = start + (this.rectWidth*length)
			arr.push(start - (this.rectWidth*length/2))
		}
		// console.log(arr)
		return arr;

	}
}


