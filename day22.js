var fs = require('fs');

var cards = [];
for(var i =0; i< 10007; i++){
	cards.push(i);
}

calculate();


function calculate(){
	
	var fileName = 'input.txt';
	var file = fs.readFileSync(fileName);
	var lines = file.toString().split('\r\n');

	lines.forEach(function(line){
		console.log(line);
		var tokens = line.split(' ');
		if(tokens[0] == "cut"){
			cards = cut(cards,parseInt(tokens[1],10));
		}else{
			if(tokens[1]=="into"){
				console.log("wesh");
				cards = dealIntoNewStack(cards);
			}else{
				cards = dealWithIndex(cards,parseInt(tokens[3],10));
			}
		}
		console.log(cards);
	});
	
	
	
	console.log(cards.indexOf(2020));
	
	
}

function dealIntoNewStack(stack){
	var newStack = stack.slice().reverse();
	return newStack;
}

function cut(stack,index){
	var firstPart = stack.slice(0,index);
	var secondPart = stack.slice(index);
	return secondPart.concat(firstPart);
}

function dealWithIndex(stack,index){
	var newStack = [];
	var i =0;
	var j=0;
	while(i<stack.length){
		
		newStack[j]=stack[i];
		var k=0;
		while(k<index){
			j++;
			if(j>=stack.length){
				j=0;
			}
			k++;
		}
		i++;
		//console.log(newStack);
	}
	return newStack;
}