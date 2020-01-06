var fs = require('fs');

calculate();

function calculate(){
	var grid = buildGrid();
	var bonom = new Walker(grid.spawn.x,grid.spawn.y);
	var reachCells = grid.getNearCells(bonom);
	console.log(reachCells);
	walk(bonom,reachCells[0]);
	console.log(bonom);
}



function buildGrid(){
	var grid = [];
	var fileName = 'input.txt';
	var file = fs.readFileSync(fileName);
	var lines = file.toString().split('\r\n');
	var spawn = null;
	var keys = [];
	var doors = [];
	var y =0;
	lines.forEach(function(line){
		var tab = [];
		var cells = line.split('');
		var x=0;
		cells.forEach(function(cell){
			var theCell = new Cell(x,y);
			if(cell=="#"){
				theCell.walkable=false;
			} else if(cell=="."){
				//OK
			} else if(cell=="@"){
				theCell.spawnPoint=true;
				spawn = theCell;
			} else{
				if(cell == cell.toUpperCase()){
					theCell.content=new Door(cell);
					theCell.walkable=false;
					doors.push(theCell);
				}else{
					theCell.content=new Key(cell);
					keys.push(theCell);
				}
			}
			tab.push(theCell);
			x++;
		});
		grid.push(tab);
		y++;
	});
	return new Grid(grid, keys, doors, spawn);
}

function Cell(x,y){
	this.x=x;
	this.y=y;
	this.walkable=true;
	this.content=null;
	this.clone=function(){
		var cellCopy=new Cell(this.x,this.y);
		cellCopy.walkable=this.walkable;
		if(this.content!=null){
			if(this.content.constructor.name=="Key"){
				var copyKey = new Key(this.content.nom);
				copyKey.ramassed = this.content.ramassed;
				cellCopy.content=copyKey;
			}else{
				var copyDoor = new Door(this.content.nom);
				copyDoor.opened = this.content.opened;
				cellCopy.content=copyDoor;
			}
		}
		return cellCopy;
	}
}

function Key(nom){
	this.nom=nom;
	this.ramassed=false;
}

function Door(nom){
	this.nom=nom;
	this.opened=false;
}

function Walker(x,y){
	this.inventory = [];
	this.x=x;
	this.y=y;
}

function Grid(grid,keys,doors,spawn){
	this.grid=grid;
	this.keys=keys;
	this.doors=doors;
	this.spawn=spawn;
	this.getNearCells = function(bonom){
		var x=bonom.x;
		var y = bonom.y;
		var cells=[];
		var retCells=[];
		if(x-1>=0){
			cells.push(this.grid[x-1][y]);
		}
		if(x+1<this.grid[0].length){
			cells.push(this.grid[x+1][y]);
		}
		if(y-1>=0){
			cells.push(this.grid[x][y-1]);
		}
		if(y+1<this.grid.length){
			cells.push(this.grid[x][y+1]);
		}
		cells.forEach(function(cell){
			if(cell.walkable){
				retCells.push(cell);
			}
		});
		return retCells;
	}
	this.clone = function(){
		var gridCopy=[];
		var keysCopy=[];
		var doorsCopy=[];
		var spawnCopy=[];
		for(var y=0;y<this.grid.length;y++){
			var lineCopy=[];
			for(var x=0;x<this.grid[0].length;x++){
				var cellCopy = this.grid[y][x].clone();
				if(cellCopy.content!=null){
					if(cellCopy.content.constructor.name=="Key"){
						keysCopy.push(cellCopy.content);
					}else{
						doorsCopy.push(cellCopy.content);
					}
				}
				lineCopy.push(cellCopy);
			}
			gridCopy.push(lineCopy);
		}
		spawnCopy = this.spawn.clone();
		
		return new Grid(gridCopy,keysCopy,doorsCopy,spawnCopy);
	}
	
}

function walk(bonom,cell){
	var success=false;
	if(cell.content==null){
		if(cell.walkable){
			bonom.x=cell.x;
			bonom.y=cell.y;
			success=true;
		}else{
			success=false;
		}
	}else{
		if(cell.content.constructor.name=="Key"){
			if(!cell.content.ramassed){
				bonom.inventory.push(cell.content);
				cell.content.ramassed=true;
			}
			bonom.x=cell.x;
			bonom.y=cell.y;
			success=true;
		}else{
			var found=false;
			var i=0;
			while(i<bonom.inventory){
				// Si on a la clé, on ouvre la porte
				if(cell.content.nom.toLowerCase() == bonom.inventory[i].nom){
					found=true;
					bonom.x=cell.x;
					bonom.y=cell.y;
					cell.content.opened=true;
					cell.walkable=true;
				}
				i++;
			}
			success=found;
		}
	}
	return success;
}