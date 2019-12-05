var fs = require('fs');

var fileName = 'input.txt';
var file = fs.readFileSync(fileName);
var input = file.toString().split(',');
//console.log(input);

var i=0;
var stop=false;
while(i < input.length && !stop){
	var operator = parseInt(input[i],10);
	var val1 = parseInt(input[i+1],10);
	var val2 = parseInt(input[i+2],10);
	var result = 0;
	
	if(operator == 1){
		result = parseInt(input[val1],10) + parseInt(input[val2],10);
		input[parseInt(input[i+3],10)]=result;
	}else if(operator == 2){
		result = parseInt(input[val1],10)*parseInt(input[val2],10);
		input[parseInt(input[i+3],10)]=result;
	} else{
		stop = true;
	}
	console.log(input[val1] +" "+operator+" "+input[val2]+" = "+result);
	
	
	
	i+=4;
}

console.log(input[0]);