var fs = require('fs');

var moons=[];
calculate();

var states = [];
var found=false;

console.log(moons);
var index=0;
while(!found){
	found=false;
	states.forEach(function(state){
		if(equals(state,moons)){
			found=true;
			console.log(state);
			console.log(moons);
		}
	});
	states.push(copy(moons));
	oneTime();
	index++;
	console.log(index);
}

console.log(index);

function getEnergy(){
	var total=0;
	moons.forEach(function(moon){
		var potentialEnergy=Math.abs(moon.x)+Math.abs(moon.y)+Math.abs(moon.z);
		var kineticEnergy=Math.abs(moon.velX)+Math.abs(moon.velY)+Math.abs(moon.velZ);
		total+=potentialEnergy*kineticEnergy;
	});
	return total;
}


function oneTime(){
	moons.forEach(function(moon){
		moons.forEach(function(otherMoon){
			// X
			if(moon.x<otherMoon.x){
				moon.velX++;
			}else if(moon.x>otherMoon.x){
				moon.velX--;
			}else{
				// Kedall
			}
			
			// Y
			if(moon.y<otherMoon.y){
				moon.velY++;
			}else if(moon.y>otherMoon.y){
				moon.velY--;
			}else{
				// Kedall
			}
			
			// Z
			if(moon.z<otherMoon.z){
				moon.velZ++;
			}else if(moon.z>otherMoon.z){
				moon.velZ--;
			}else{
				// Kedall
			}
		});
	});
		
	// Apply velocity
	moons.forEach(function(moon){
		moon.x+=moon.velX;
		moon.y+=moon.velY;
		moon.z+=moon.velZ;
	});
}

function calculate(){
	
	var fileName = 'input.txt';
	var file = fs.readFileSync(fileName);
	file = file.toString().split("\r\n");
	
	file.forEach(function(moon){
		var theMoon=new Moon(0,0,0);
		moon=moon.replace("<","");
		moon=moon.replace(">","");
		var tokens = moon.split(',');
		tokens.forEach(function(t){
			var parts = t.split('=');
			theMoon[parts[0].replace(' ','')]=parseInt(parts[1],10);
		});
		moons.push(theMoon);
	});
}

function Moon(x,y,z){
	this.x=x;
	this.y=y;
	this.z=z;
	this.velX=0;
	this.velY=0;
	this.velZ=0;
}

function copy(arrayOfMoons){
	var ret = [];
	arrayOfMoons.forEach(function(moon){
		var newMoon=new Moon(moon.x,moon.y,moon.z);
		newMoon.velX=moon.velX;
		newMoon.velY=moon.velY;
		newMoon.velZ=moon.velZ;
		ret.push(newMoon);
	});
	return ret;
}

function equals(array1,array2){
	var equal=true;
	for(var i=0 ; i< array1.length ; i++){
		if(array1[i].x == array2[i].x && array1[i].y == array2[i].y && array1[i].z == array2[i].z && array1[i].velX == array2[i].velX && array1[i].velY == array2[i].velY && array1[i].velZ == array2[i].velZ){
			//cool
		}else{
			equal=false;
			break;
		}
	}
	return equal;
}