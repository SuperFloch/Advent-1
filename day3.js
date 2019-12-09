var fs = require('fs');

calculate();


function calculate(){
	
	var fileName = 'input.txt';
	var file = fs.readFileSync(fileName);
	var path1 = file.toString().split('\r\n')[0];
	var path2 = file.toString().split('\r\n')[1];
	
	var intersections=[];
	
	var central=new Point(0,0);
	
	var path1Points=cutPath(path1);
	var path2Points=cutPath(path2);
	
	var commonPoints= getCommonPoints(path1Points,path2Points);
	
	var counter=0;
	path1Points.forEach(function(point){
		counter ++;
		commonPoints.forEach(function(cp){
			if(point.x == cp.x && point.y == cp.y){
				cp.score+=counter;
			}
		});
	});
	counter=0;
	path2Points.forEach(function(point){
		counter ++;
		commonPoints.forEach(function(cp){
			if(point.x == cp.x && point.y == cp.y){
				cp.score+=counter;
			}
		});
	});
	console.log(commonPoints);
	
	/*
	console.log(commonPoints);
	var dists = [];
	commonPoints.forEach(function(cp){
		var dist = Math.abs(cp.x)+ Math.abs(cp.y);
		dists.push(dist);
	});
	console.log(dists.sort());
	*/
	
}

function getCommonPoints(path1,path2){
	var ret = [];
	
	path1.forEach(function(point){
		path2.forEach(function(point2){
			if(point.x == point2.x && point.y == point2.y){
				ret.push(point);
			}
		});
	});
	return ret;
}

function cutPath(path){
	var instructions=path.split(',');
	var currentPoint=new Point(0,0);
	
	var pointPath=[];
	
	instructions.forEach(function(instr){
		var direction = instr.charAt(0);
		var value = parseInt(instr.substring(1,4),10);
		switch(direction){
			case 'U':
			for(var i=0;i<value;i++){
				currentPoint.y++;
				pointPath.push(new Point(currentPoint.x,currentPoint.y));
			}
			break;
			
			case 'R':
			for(var i=0;i<value;i++){
				currentPoint.x++;
				pointPath.push(new Point(currentPoint.x,currentPoint.y));
			}
			break;
			
			case 'L':
			for(var i=0;i<value;i++){
				currentPoint.x--;
				pointPath.push(new Point(currentPoint.x,currentPoint.y));
			}
			break;
			
			case 'D':
			for(var i=0;i<value;i++){
				currentPoint.y--;
				pointPath.push(new Point(currentPoint.x,currentPoint.y));
			}
			break;
		}
	});
	return pointPath;
}

function Point(x,y){
	this.x=x;
	this.y=y;
	this.score=0;
}