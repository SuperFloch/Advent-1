var fs = require('fs');


var min = 146810;
var max = 612564;

var j = min;
var foundSum = 0;


while(j<max){
	if(check(j)){
		foundSum++;
		console.log(j);
	}
	j++;
}
console.log(foundSum);

function check(value){
	return checkGrow(value) && checkDoublon(value);
}

function checkGrow(value){
	var ret=true;
	var i = 0;
	while(i < value.toString().length-1 && ret){
		if(parseInt(value.toString().charAt(i))>parseInt(value.toString().charAt(i+1))){
			ret=false;
		}
		i++;
	}
	return ret;
}

function checkDoublon(value){
	var chiffres = value.toString().split("");
	var hasADouble=false;
	
	var x=0;
	while(x<chiffres.length && !hasADouble){
		var leChiffre = chiffres[x];
		var y=0;
		var occurencies = 0;
		while(y<chiffres.length && !hasADouble){
			if(leChiffre == chiffres[y]){
				occurencies++;
			}else{
				if(occurencies == 2){
					hasADouble = true;
				}
				occurencies=0;
			}
			y++;
		}
		if(occurencies == 2){
			hasADouble = true;
		}
		x++;
	}
	return hasADouble;
}