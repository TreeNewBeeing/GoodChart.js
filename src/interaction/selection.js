import * as d3 from "d3";


export function bindSelection(selection){
	selection.element.on("click",removeSelection)
}
function removeSelection(){
	d3.select("#selection").remove()
}
