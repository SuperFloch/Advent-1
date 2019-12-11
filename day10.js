var fs = require('fs');

var grille =[];
var asteroids = [];
calculate();

// Station en X=17 , Y = 14

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
	
	var station = asteroids.find(el => el.x == 17 && el.y == 14);
	
	var angles = countLineOfSight(station);
	angles.sort(function(a,b){return a.as.x-b.as.x});
	angles.sort(function(a,b){return a.as.y-b.as.y});
	angles.sort(function(a,b){return b.angle-a.angle});

	var startingAngle=90;
	
	var j = angles.findIndex(el => el.angle == startingAngle);
	var previousAngle = 360;
	var i=0;
	while(i<200){
		var boom = false;
		while(!boom){
			var as = angles[j];
			if(as.angle!=previousAngle && !as.exploded){
				as.exploded = true;
				boom=true;
				previousAngle=as.angle;
				console.log(i+" Et boum ! Angle "+as.angle+" explosé !"+ (as.as.x+17) +":"+(as.as.y+14));
			}
			j++;
			if(j==angles.length){
				j=0;
			}
		}
		i++;
	}
	console.log(j);
	console.log(angles[j-1]);
	
}


function countLineOfSight(asteroid){
	var angles = [];
	asteroids.forEach(function(as){
		if(as!=asteroid){
			var angle = Math.atan2(as.y-asteroid.y, as.x-asteroid.x) * 180 / Math.PI;
			as.y = as.y-asteroid.y;
			as.x = as.x - asteroid.x;
			angles.push({ as : as, angle : angle, exploded:false});
		}
	});
	return angles;
}

function Asteroid(x,y,angle){
	this.x=x;
	this.y=y;
}