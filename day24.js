var fs = require('fs');

calculate();


function calculate(){
	
	var fileName = 'input.txt';
	var file = fs.readFileSync(fileName);
	var lines = file.toString().split('\r\n');
	
	var grid = [];
	var y=0;
	lines.forEach(function(line){
		var x=0;
		var cells = line.split('');
		var gridLine=[];
		cells.forEach(function(cell){
			gridLine.push(new Case(x,y,cell));
			x++;
		});
		y++;
		grid.push(gridLine);
	});
	
	var found=false;
	var historique=[];
	historique.push(grid);
	while(!found){
		grid = copulate(grid);
		historique.push(grid);
		var indexH=0;
		historique.forEach(function(gridH){
			var indexS=0;
			historique.forEach(function(gridS){
				if(indexH!=indexS){
					if(equals(gridH,gridS)){
						found=true;
						console.log(indexS+" "+indexH);
						console.log(show(gridH));
						console.log(show(gridS));
						console.log(biodiversityRating(gridH));
					}
				}
				indexS++;
			});
			indexH++;
		});
	}
	
	//console.log(show());
	
}

function show(grid){
	var string = "";
	grid.forEach(function(line){
		
		line.forEach(function(cell){
			string+=cell.content;
		});
		string+="\n";
	});
	return(string);
}

function copulate(grid){
	var copy = [];
	var y=0;
	grid.forEach(function(line){
		var x=0;
		var gridLine=[];
		line.forEach(function(cell){
			var adjacells = getAdjacells(grid,x,y);
			var countBugs = 0;
			adjacells.forEach(function(c){
				if(c.content=='#'){
					countBugs++;
				}
			});
			if(cell.content=='#' && countBugs != 1){
				//console.log(adjacells);
				//console.log(x+" "+y+" "+countBugs);
				gridLine.push(new Case(x,y,'.'));
			}else if(cell.content == '.' && (countBugs == 1 || countBugs == 2) ){
				gridLine.push(new Case(x,y,'#'));
			}else{
				gridLine.push(new Case(x,y,cell.content));
			}
			
			x++;
		});
		y++;
		copy.push(gridLine);
	});
	return copy;
}

function getAdjacells(grid,x,y){
	var ret=[];
	if(x+1<grid[0].length){
		ret.push(grid[y][x+1]);
	}
	if(y+1<grid.length){
		ret.push(grid[y+1][x]);
	}
	if(x-1>=0){
		ret.push(grid[y][x-1]);
	}
	if(y-1>=0){
		ret.push(grid[y-1][x]);
	}
	return ret;
}

function Case(x,y,content){
	this.x=x;
	this.y=y;
	this.content=content;
}

function equals(grid1,grid2){
	var equals=true;
	var y=0;
	while(y<grid1.length && equals){
		var x=0;
		while(x<grid1[0].length && equals){
			if(grid1[y][x].content!=grid2[y][x].content){
				equals=false;
			}
			x++;
		}
		y++;
	}
	return equals;
}

function biodiversityRating(grid){
	var chiffre=1;
	var total = 0;
	grid.forEach(function(line){
		line.forEach(function(cell){
			if(cell.content=='#'){
				total+=chiffre;
			}
			chiffre*=2;
		});
	});
	return total;
}

