var graph;

//for storing sets of edges
var S;
var diameter = 30;
var count;
var texts =[];
var treeFood = [];
var tree = [];
var levels = [];
var treeEdges = [];

function setup() {
	var canvas = createCanvas(900, 700);
	graph = new Graph(25);
	graph.initRandomVectors();

		

	graph.connectAll();


	// Choose startpoint.
	var start = graph.pickStart();

	//slowdown
	frameRate(2);

	count = 0;
}



//kører 60 gange/sekundet
function draw() {
	//clear hvert loop
	background(255, 255, 255);


	if(count < 3){
		drawgraph();
	}else if(graph.vertices.length > 0){

	drawgraph();

	nextStep();
	}
	else{
		drawgraph();
		drawSolved();
	}
	

    count = count+1;

}




function nextStep(){

	//Tag mindste vertex.d
	var min = Infinity;
	var index = -1;
	for (var i = 0; i < graph.vertices.length; i++) {
		if(min > graph.vertices[i].d){
			min = graph.vertices[i].d;
			index = i;
		}
	};

	//relax den
	graph.relax(index);

	//Tilføj til done
	graph.vertices[index].done = true;
	graph.solved.push(graph.vertices[index]);
    graph.vertices.splice(index, 1);

}

function drawgraph(){
	//draw edges:
	for (var i = 0; i < graph.edges.length; i++) {
		graph.edges[i].show();
	};
	//tegn punkter
		for (var i = 0; i < graph.vertices.length; i++) {
			if(graph.vertices[i].d == Infinity){
				fill('none');
			}else if(graph.vertices[i].d == 0){
				fill('green');
			}
			else{
				fill('grey');
			}
			ellipse(graph.vertices[i].vector.x, graph.vertices[i].vector.y, diameter, diameter);
			graph.vertices[i].show();
		};
		//tegn alle solved!
		for (var i = 0; i < graph.solved.length; i++) {
			if(graph.solved[i].d == 0){
				fill('green');
			}else{
				fill('blue');
			}

			//tegn elipse og text.
			ellipse(graph.solved[i].vector.x, graph.solved[i].vector.y, diameter, diameter);
			graph.solved[i].show();
		};
}

function drawSolved(){
	
	//Grap first and add to tree
	if(tree.length == 0){
		treeFood = graph.solved.slice(0, graph.solved.length);

		var vector = createVector(width-15, 40);

		var treetop = new Verticle(vector, 0);
		treetop.name = treeFood[0].name;
		treeFood.shift();

		tree[0] = treetop;

		console.log(getLevel(graph.solved[10].parent, 0));
	}else if(treeFood.length > 0){
		
		//get parrent position & level
		var parrentPos = getParent(treeFood[0].parent);
		var level = getLevel(treeFood[0].parent, 0);
		if(levels[level] == null){
			levels[level] = 0;
		}else{
			levels[level] = levels[level] - 35;
		}

		//Create next in line
		var x = tree[0].vector.x + levels[level];
		var y = tree[0].vector.y + (level*80);
		var vector = createVector(x, y);

		var next = new Verticle(vector, 0);
		next.name = treeFood[0].name;


		//create edge
		var parent = new Verticle(parrentPos, 0);
		var edge = new Edge(parent, next);
		treeEdges.push(edge);

		treeFood.shift();

		tree.push(next);
	
	}


	//draw tree edges
	for (var i = 0; i < treeEdges.length; i++) {
		treeEdges[i].show();
	};

	//draw tree
	for (var i = 0; i < tree.length; i++) {
		fill('grey');
		ellipse(tree[i].vector.x, tree[i].vector.y, diameter/1.5, diameter/1.5);
		fill(255);
		text(tree[i].name, tree[i].vector.x-2, tree[i].vector.y+2);
	};


}

function getParent(name){
	for (var i = 0; i < tree.length; i++) {
		if(tree[i].name == name){
			return tree[i].vector;
		}
	};
}

function getLevel(Pname, level){
	if(Pname == null){
		return level;
	}else{
		for (var i = 0; i < graph.solved.length; i++) {
		if(graph.solved[i].name == Pname)
			return getLevel(graph.solved[i].parent, level+1);
	};
	return false;
	}

}


function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}