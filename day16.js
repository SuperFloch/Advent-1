var fs = require('fs');

calculate();


function calculate(){
	
	var fileName = 'input.txt';
	var file = fs.readFileSync(fileName);
	var values = file.toString().split('');
	values = integerize(values);
	
	var finalPosition = 5976733%values.length;
	
	// Copie * 10 000
	console.log(values.length);
	var newArray=[];
	for(var i=0;i<10000;i++){
		newArray = newArray.concat(values);
		console.log(i+" Taille :"+newArray.length);
	}
	console.log(newArray.length);
	values=newArray;
	console.log("Etape calcul !");
	for(var i=0; i<100 ; i++){
		values=applyPattern(values);
		console.log(i);
	}
	console.log(values.slice(finalPosition,finalPosition+8));
}


function applyPattern(values){
	var basePattern = [0,1,0,-1];
	var ret = [];
	var index=0;
	values.forEach(function(value){
		
		var thisPattern=[];
		basePattern.forEach(function(pat){
			if(thisPattern.length<values.length){
				for(var i=0;i<=index;i++){
					thisPattern.push(pat);
				}
			}
		});
		
		var indexPattern=1;
		var total = 0;
		values.forEach(function(val){
			total+= val*thisPattern[indexPattern];
			indexPattern++;
			if(indexPattern>=thisPattern.length){
				indexPattern=0;
			}
		});
		
		ret.push(Math.abs(total)%10);
		index++;
	});
	
	return ret;
}

function integerize(array){
	var ret = [];
	array.forEach(function(chiffre){
		ret.push(parseInt(chiffre,10));
	});
	return ret;
}