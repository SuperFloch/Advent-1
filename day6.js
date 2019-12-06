var fs = require('fs');

var planets = [];
var totalOrbit = 0;
fillPlanets();
planets.forEach(function(p){
	totalOrbit+=countOrbits(p);
});
console.log(totalOrbit);

function fillPlanets(){
	
	var fileName = 'input.txt';
	var file = fs.readFileSync(fileName);
	var input = file.toString().split('\r\n');
	//input = integerize(input);
	
	input.forEach(function(planet){
		var expr = planet.split(")");
		var papa = expr[0];
		var pla = expr[1];
		
		var papaExists=arrayIncludesKey(planets, "name",papa);
		var plaExists = arrayIncludesKey(planets, "name",pla);
		
		var plaPlanet=null;
		var papaPlanet = null;
		if(!papaExists.found){
			papaPlanet = new Planet(papa);
			planets.push(papaPlanet);
		}else{
			papaPlanet = planets[papaExists.index];
		}
		if(!plaExists.found){
			plaPlanet = new Planet(pla);
			planets.push(plaPlanet);
		}else{
			plaPlanet = planets[plaExists.index];
		}
		papaPlanet.enfants.push(plaPlanet);
	});
	//console.log(planets.length);
}

function countOrbits(planet){
	var ret=0;
	for(var i =0; i<planet.enfants.length;i++){
		ret ++;
		ret+=countOrbits(planet.enfants[i]);
	}
	return ret;
}

function Planet(name){
	this.name=name;
	this.enfants = [];
}

function arrayIncludesKey(array,keyName, value){
	var found = false;
	var i = 0;
	while(i<array.length && !found){
		if(array[i][keyName] == value){
			found=true;
		}
		i++;
	}
	return {found : found, index : i-1};
}

function integerize(array){
	var ret = [];
	array.forEach(function(chiffre){
		ret.push(parseInt(chiffre,10));
	});
	return ret;
}