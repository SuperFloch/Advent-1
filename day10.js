var fs = require('fs');

var grille =[];
var asteroids = [];
calculate();


function calculate(){
	
	var fileName = 'input.txt';
	var file = fs.readFileSync(fileName);
	file = file.toString().split("\r\n");
	
	
	file.forEach(function(ligne){
		var grid=ligne.split("");
		grille.push(grid);
	});
	
	
	for(var y=0; y< grille.length;y++){
		for(var x=0; x < grille[0].length ; x++){
			if(grille[x][y]=="#"){
				asteroids.push(new Asteroid(x,y));
			}
		}
	}
	
	var count = [];
	asteroids.forEach(function(as){
		count.push({asteroid : as, count : countLineOfSight(as)});
	});
	console.log(count.sort(function(a,b){return b.count-a.count;}));
	
}


function countLineOfSight(asteroid){
	var angles = [];
	asteroids.forEach(function(as){
		var angle = Math.atan2(as.y-asteroid.y, as.x-asteroid.x) * 180 / Math.PI;
		if(!angles.includes(angle)){
			angles.push(angle)
		}
	});
	return angles.length;
}

function Asteroid(x,y,angle){
	this.x=x;
	this.y=y;
}