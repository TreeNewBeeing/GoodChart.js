export class bar{
	
	constructor(parent,chart){
		this.parent = parent;
		this.chart = chart;
		this.element = null;
	}

	draw(){
		var bar = this.parent.element.selectAll("g")
	 		.data(this.parent.bins.container)
	  		.enter().append("g")
		    	.attr("class", "bar")
		    	.attr("transform", this.getTransform.bind(this));
		this.element = bar;
	}

	getTransform(d){

		var translateX = this.parent.rectX[d.index],
			translateY = this.parent.y(d.value());

		return "translate(" + translateX + "," + translateY + ")"; 
	}

}