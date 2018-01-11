import * as d3 from "d3"

export class gradBins {

	constructor(data,label,interval){
		this.container = [];
		this.label = label;
		this.interval = interval;

		// Sort
		data.sort(function(a,b){
			return a[label] - b[label]
		})

		// Find valid points and add to data
		var index = 0;
		for(var i=0;i<data.length;i++){
			if(data[i][label] != 0){
				index = i;
				break;
			}
		}
		this.data = data.slice(index)

		// arrange into parts
		this.creataArrange();

	}	

	creataArrange(){

		// generate arrange with evenly interval
		var arrange = [];
		var min = this.getMinX();
		var max = this.getMaxX();
		for(var i=min;i<=max;i+=this.interval){
			arrange.push(i);
		}

		// generate container
		this.container = [];

		var maxX = arrange[arrange.length-1];
		var maxY = 0;
		
		var a = 0;
		var pre = null;
	
		for(var i=0;i<arrange.length-1;i++){

			// get bin.i
			while(this.data[a][this.label] < arrange[i]){
				a++;
				if(a >= this.data.length){
					a = this.data.length;
					break
				}
			}
			// push bin to container
			var min = arrange[i]
			var max = arrange[i+1]
			var bin0 = new bin(this,a,min,max,pre,null);
			this.container.push(bin0);

			// if not the first element
			if(pre){
				pre.next = bin0;
				var y = bin0.i - pre.i;
				maxY = y > maxY ? y : maxY;
			}

			// normal incrementing
			pre = bin0;
			
		}

		// update maxX, maxY
		this.maxX = maxX;
		this.maxY = maxY;

	}

	addSub(d){
		var n = new bin(d.data,d.i,d.min,d.max,d.pre,d.next);
		return n;
	}


	// LL
	combineLeft(d,num){
		d.min= num;

		for(var i=0;i<this.data.length;i++){
			if(this.data[i][this.label] >= num){
				d.i = i;
				break;
			}
		}

		for(var i=0;i<this.container.length;i++){
			if(this.container[i].i >= d.i){ 
				d.pre = this.container[i].pre;
				break;
			}
		}

		// console.log(d)
	}

	updateLL(d){

		// next
		if(d.next != null){
			d.next.pre = d;
		}
		// pre 
		if(d.pre != null){
			d.pre.next = d
			d.pre.max = d.min
		}

		var start = this.container[this.container.length-1]
		if(d.next == null){
			start = d;
		}

		var high = 0;
		var container = [];
		while(start!=null){
			container.unshift(start);
			var value = start.value()
			if( value > high){
				high = value;
			}
			start = start.pre;
			
		}

		console.log(container)
		this.maxY = high
		this.container = container

	}


	// RR

	combineRight(d,num){

		// last element
		if(d == null){
			return;
		}

		for(var i=this.data.length-1;i>=0;i--){
			if(this.data[i][this.label] < num){
				d.i = i+1;
				break;
			}
		}
		console.log(i)
		// console.log(d.i)
		for(var i=this.container.length-1;i>=0;i--){
			if(this.container[i].i <= d.i){ 
				d.min = num;
				d.next = this.container[i].next
				
				break;
			}
		}

		// console.log(d)
	}

	updateRR(d){

		// last element
		if(d == null){
			return;
		}


		console.log(d)

		// pre
		if(d.pre != null){
			d.pre.max = d.min;
			d.pre.next = d;
		}

		if(d.i == this.data.length){
			d.pre.next = null
		}

		// next
		if(d.next != null){
			d.next.pre = d
			d.max = d.next.min
		}else{
			d.max = this.container[this.container.length-1].max
		}


		var start = this.container[0]
		if(d.pre == null){
			start = d;
		}
		
		var high = 0;
		var container = [];
		while(start!=null){
			container.push(start);
			var value = start.value()
			if( value > high){
				high = value
			}
			start = start.next;
			// console.log(start)
			
		}

		
		this.maxY = high
		this.container = container

	}

	splitLeft(d,num){
		for(var i=d.pre.i;i<this.data.length;i++){
			if(this.data[i][this.label] >= num){
				d.i = i;
				break;
			}
		}
		d.min = num;
		
	}

	updateLR(d){
		if(d.i == d.pre.i || d.i == d.next.i){
			return;
		}


		// pre
		d.pre.max = d.min;
		d.pre.next = d;


		// nxt
		if(d.next != null){
			d.next.pre = d;
		}

		// console.log(this.container)
		var start = this.container[0]
		if(d.pre == null){
			start = d;
		}
		
		var high = 0;
		var container = [];
		while(start!=null){
			container.push(start);
			var value = start.value()
			if( value > high){
				high = value
			}
			start = start.next;
			// console.log(start)
			
		}

		this.maxY = high
		this.container = container
	}


	find(x){
		for(var i=d.i;i>=0;i--){
			if(this.data[i][this.label] < num){
				d.i = i;
				break;
			}
		}
	}
	getMinX(){
		return parseInt(this.data[0][this.label]/this.interval)*this.interval;
	}
	getMaxX(){
		return parseInt(this.data[this.data.length-1][this.label]/this.interval)*this.interval+this.interval;
	}

	size(){
		return this.data.length;
	}
}

class bin{


	constructor(data,i,min,max,pre,next){
		this.data = data;
		this.i = i;
		this.pre = pre;
		this.min = min;
		this.max = max;
		this.next = next
	}

	value(){
		var next = this.next
		if(next == null){
			next = this.data.data.length;
		}else{
			next = next.i
		}

		return next - this.i;

	}

	size(){
		return this.max - this.min;
	}

	rangeMin(){
		return this.min;
	}

	rangeMax(){
		return this.max;
	}


}
