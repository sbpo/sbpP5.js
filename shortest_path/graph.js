//Vælg et punkt, tilføj det til listen
//relax alle punkter 

class Graph{

 constructor(ammount){
	this.ammount = ammount;
	this.edges = [];
	this.solved = [];
	this.blackedges = [];
	}

 	initRandomVectors(){
		this.vertices = [];
		for (var i = 0; i < this.ammount; i++) {
			var x = randomIntFromInterval(10, width-300);
			var y = randomIntFromInterval(10, height-10);
			var vector = createVector(x, y);
			var vert = new Verticle(vector, i);
			this.vertices.push(vert);
		}
	}

	connectAll(){

		for (var i = 0; i < this.vertices.length; i++) {
			for (var k = i; k < this.vertices.length; k++) {
				if(k != i && random(0, 15) < 5){
					var edge = new Edge(this.vertices[i], this.vertices[k])
					this.edges.push(edge);
				}
			};
		};
	}

	relax(v){
		for (var i = 0; i < this.vertices.length; i++) {
			var newlenght = this.weight(this.vertices[v], this.vertices[i]) + this.vertices[v].d;
			if(this.vertices[i].d > newlenght){
				this.vertices[i].d = newlenght;
				this.vertices[i].parent = this.vertices[v].name;
			}
		};
	}

	//return vægten fra v til u.(bruges hver gang man relax'er). (hvis der er en edge.)
	weight(v, u){
		for (var i = 0; i < this.edges.length; i++) {
			if( (this.edges[i].v1.vector.x == v.vector.x && this.edges[i].v1.vector.y == v.vector.y) && (this.edges[i].v2.vector.x == u.vector.x && this.edges[i].v2.vector.y == u.vector.y) )
			{
				return this.edges[i].length;
			} 
			if( (this.edges[i].v1.vector.x == u.vector.x && this.edges[i].v1.vector.y == u.vector.y) && (this.edges[i].v2.vector.x == v.vector.x && this.edges[i].v2.vector.y == v.vector.y) )
			{
				return this.edges[i].length;
			} 
		};
		//hvis loopet kører uden at finde en.
		return Infinity;
	}

	pickStart(){
		var nr = Math.floor(random(0, this.ammount-1));
		this.vertices[nr].d = 0;
		return this.vertices[nr].name;
	}


};

function Verticle(vector, nr){
	this.vector = vector;
	this.name = String.fromCharCode(97 + nr);
	this.done = false;

	//Best distance so far:
	this.d = Infinity;
	this.parent = null;

	this.show = function(){
		fill(0);
		if(isFinite(this.d)){
			if(this.done == true){
				fill("white");
			}
			text(Math.floor(this.d), this.vector.x-10, this.vector.y+8);
		}else{
			text("Inf", this.vector.x-10, this.vector.y+6);
		}

		text(this.name, this.vector.x-3, this.vector.y-3);
		
	}
}



class Edge{
 	constructor(v1, v2){
		this.v1 = v1;
		this.v2 = v2;
		this.length = dist(this.v1.vector.x, this.v1.vector.y, this.v2.vector.x, this.v2.vector.y);
	}

	show(){
		if(this.v1.done == true && this.v2.done == true && (this.v1.parent == this.v2.name || this.v2.parent == this.v1.name)){
			stroke(1);
		}else{
			stroke(220);	
		}

		line(this.v1.vector.x, this.v1.vector.y, this.v2.vector.x, this.v2.vector.y);
		stroke(1);
	}

};



function findNeedle(array, needle){
	for (var i = 0; i < array.length; i++) {
		if(needle.x == array[i].x && needle.y == array[i].y)
			{ return true; }
	};
	return false;
}

