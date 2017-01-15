var graph;

//for storing sets of edges
var S;

var count;
//for storing MST so far
var MST;

function setup() {
	var canvas = createCanvas(600, 600);
	graph = new Graph(600);
	graph.initRandomVectors();
	//tegn punkter
	for (var i = 0; i < graph.vertices.length; i++) {
		ellipse(graph.vertices[i].x, graph.vertices[i].y, 7, 7);
	};

	graph.connectAll();
	for (var i = 0; i < graph.edges.length; i++) {
		
		var theEdge = graph.edges[i];
		//draw-a-line
		//line(theEdge.v1.x, theEdge.v1.y, theEdge.v2.x, theEdge.v2.y);
		//print length on line
		//text(round(theEdge.length), ((theEdge.v1.x+theEdge.v2.x)/2), ((theEdge.v1.y+theEdge.v2.y)/2));
	};

	graph.edges.sort(function(a, b){return b.length-a.length});

	//gem et array med 
	S = new Set(graph.vertices.slice());
	MST = [];
	count = 0;
}



//kører 60 gange/sekundet
function draw() {

	if(MST.length < graph.ammount-1){
		var edge = graph.edges.pop();  

		if(S.check(edge.v1, edge.v2)){
			MST.push(edge);
			strokeWeight(5);
			stroke('red');
			line(edge.v1.x, edge.v1.y, edge.v2.x, edge.v2.y);
		}
		count++;
	}

	text(count, width-50, height-20);
}


function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}