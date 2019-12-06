var fs = require('fs');

calculate();


function calculate(){
	
	var fileName = 'input.txt';
	var file = fs.readFileSync(fileName);
	var input = file.toString().split(',');
	input = integerize(input);
	
	function getVal(value,mode){
		var ret=0;
		if(mode==1){
			ret = parseInt(input[value],10);
		}else{
			ret = value;
		}
		if(isNaN(ret)){
			console.log(value+" "+mode);
			//console.log(input[value]);
		}
		
		
		return ret;
	}
	
	var i=0;
	var stop=false;
	while(i < input.length && !stop){
		var jump = 4;
		
		var operator = input[i]%10;
		var val1Mode = (input[i]-operator)%100;
		var val2Mode = (input[i]-operator-val1Mode)%1000;
		var result = 0;
		switch(operator){
			case 1:
				//Add
				result = getVal(input[i+1],val1Mode)+getVal(input[i+2],val2Mode);
				input[input[i+3]]=result;
				break;
			case 2:
				//Multiply
				result = getVal(input[i+1],val1Mode)*getVal(input[i+2],val2Mode);
				input[input[i+3]]=result;
				break;
			case 3:
				input[input[i+1]]=1;
				jump = 2;
				break;
			case 4:
				console.log("out : "+getVal(input[i+1],0));
				jump = 2;
				break;
			case 9:
				//End
				stop=true;
				break;
			default :
				console.log("erreur");
				//console.log(input[i]+","+input[i+1]+","+input[i+2]+","+input[i+3]+" ")
		}
		
		i+=jump;
	}
	return input[0];
}

function integerize(array){
	var ret = [];
	array.forEach(function(chiffre){
		var prased = parseInt(chiffre,10);
		ret.push(prased);
	});
	return ret;
}