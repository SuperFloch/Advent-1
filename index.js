var fs = require('fs');

calculate();


function calculate(){
	
	var fileName = 'input.txt';
	var file = fs.readFileSync(fileName);
	var input = file.toString().split(',');
	input = integerize(input);
	
	
	function getVal(value,mode){
		if(mode==0){
			return input[value];
		}else{
			return value;
		}
	}
	
	var i=0;
	var stop=false;
	while(i < input.length && !stop){
		var jump = 4;
		
		var operator = input[i]%10;
		var val1Mode = (input[i]-operator)%100;
		var val2Mode = (input[i]-operator-val1Mode)%1000;
		var result = 0;
		console.log("operator: "+operator);
		switch(operator){
			case 1:
				//Add
				result = getVal(input[i+1],val1Mode)+getVal(input[i+2],val2Mode);
				input[input[i+3]]=result;
				console.log("result: "+result);
				break;
			case 2:
				//Multiply
				result = getVal(input[i+1],val1Mode)*getVal(input[i+2],val2Mode);
				input[input[i+3]]=result;
				console.log("result: "+result);
				break;
			case 3:
				jump = 2;
				break;
			case 4:
				jump = 2;
				break;
			case 99:
				//End
				stop=true;
				break;
			default :
				console.log("erreur");
		}
		
		i+=jump;
	}

	console.log(input[0]);
	return input[0];
}

function integerize(array){
	var ret = [];
	array.forEach(function(chiffre){
		ret.push(parseInt(chiffre,10));
	});
	return ret;
}