var fs = require('fs');

var instructions = [];

calculate();


function calculate(){
	
	var fileName = 'input.txt';
	var file = fs.readFileSync(fileName);
	var lines = file.toString().split('\r\n');
	
	lines.forEach(function(line){
		var tokens = line.split("=>");
		var ingredients = tokens[0].split(',');
		var resultat = tokens[1].split(' ');
		var recette = new Recette();
		recette.result = parseIngredient(resultat);
		ingredients.forEach(function(ingr){
			recette.ingredients.push(parseIngredient(ingr.split(" ")));
		});
		instructions.push(recette);
	});
	//console.log(instructions);
	var recettesBase = [];
	instructions.forEach(function(el){
		var ingr = el.ingredients.forEach(function(e){
			if(e.nom=="ORE"){
				recettesBase.push(el);
			}
		});
	});
	//console.log(recettesBase);
	var recetteFinale = instructions.filter(function(el){
		return el.result.nom == "FUEL";
	});
	
	console.log(findPath(recetteFinale));
}

function findPath(recette){
	var viendage=[];
	console.log(recette);
	if(recette.ingredients.length>0){
		console.log(recette);
		recette.ingredients.forEach(function(ingr){
			var recettes = [];
			instructions.forEach(function(el){
				console.log(el);
				if(el.result.nom==ingr.nom){
					
					recettes.push(el);
				}
			});
			console.log(recettes);
			if(recettes!=null){
				recettes.forEach(function(rec){
					viendage.concat(findPath(rec));
				});
			}
		});
	}
	return viendage;
}

function Recette(){
	this.ingredients=[];
	this.result=null;
}

function Ingredient(nom){
	this.nom=nom;
	this.quantite=0;
}


function parseIngredient(tokens){
	tokens = tokens.filter(function (el) {
		return el != '';
	});
	var result=new Ingredient(null);
	result.quantite=parseInt(tokens[0],10);
	result.nom = tokens[1];

	return result;
}