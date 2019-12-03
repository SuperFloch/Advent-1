var fs = require('fs');

var fileName = 'input.txt';
var file = fs.readFileSync(fileName);
var input = file.toString().split('\r\n');
//console.log(input);

var total = 0;
input.forEach(function(chiffre){
	var value = parseInt(chiffre,10);
	if(!isNaN(value)){
		value = calculate(value);
		while(value>0){
			total+=value;
			value=calculate(value);
		}
		console.log(value);
		
	}
});
console.log(total);

function calculate(mass){
	return Math.floor(mass / 3) -2;
}