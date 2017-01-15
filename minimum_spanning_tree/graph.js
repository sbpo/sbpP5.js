class Graph{

 constructor(ammount){
	this.ammount = ammount;
	}

 	initRandomVectors(){
		this.vertices = [];
		for (var i = 0; i < this.ammount; i++) {
			var x = randomIntFromInterval(10, width-10);
			var y = randomIntFromInterval(10, height-10);
			var vector = createVector(x, y);
			this.vertices.push(vector);
		}
	}

	connectAll(){
		this.edges = [];

		for (var i = 0; i < this.vertices.length; i++) {
			for (var k = i; k < this.vertices.length; k++) {
				if(k != i){
					var edge = new Edge(this.vertices[i], this.vertices[k])
					this.edges.push(edge);
				}
			};
		}
	}

};



class Edge{
 	constructor(v1, v2){
		this.v1 = v1;
		this.v2 = v2;
		this.length = dist(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
	}
};




//functions til Minimum spanning tree.
function Set(startarray)
{
	this.Set =[];
	for (var i = 0; i < startarray.length; i++) {
		var set = new Array(startarray[i]);
		this.Set.push(set);
	};



	this.check = function(a, b){

		//Find ud af hvilket set de to vektorer er del af.
		var j = this.pointIndex(a);
		var x = this.pointIndex(b);
		
		if(j != x)
		{
			this.union(a, b, j, x);
			return true;
		}
		else
		{ 
			return false; 
		}
		
	}


	this.union = function(a, b, j, x){
		//var newSet = this.Set[j];
		var newSet = this.Set[j].concat(this.Set[x]);
		this.Set[j] = newSet;
		this.Set.splice(x, 1);
	}	

	this.pointIndex = function(p){
		for (var i = 0; i < this.Set.length; i++) {
			//tjek needle i sæt 1
			if(findNeedle(this.Set[i], p)){ 
				//stop:
				return i;
			}
		};
	}

}

function findNeedle(array, needle){
	for (var i = 0; i < array.length; i++) {
		if(needle.x == array[i].x && needle.y == array[i].y)
			{ return true; }
	};
	return false;
}

