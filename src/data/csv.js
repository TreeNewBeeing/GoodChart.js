import * as d3 from "d3"
import { bin, bins } from "../model/bin"

export function readCSV(file,label,after){
	
	d3.csv(file, function(error, data) {
	  if (error) throw error;

	  data.forEach(function(d) {
	    d[label] = +d[label];
	  })

    var interval = 10;
	  var bins0 = new bins(data,label,interval)

    after(bins0)
	})

}
