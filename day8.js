var fs = require('fs');

calculate(25,6);


function calculate(width,height){
	
	var fileName = 'input.txt';
	var file = fs.readFileSync(fileName);
	file = file.toString().split("");
	
	var imgLength = width * height;
	var layersOfImg = [];
	
	var x=0;
	var y=0;
	var currentLayer = [];
	var currentLine="";
	
	for(var i = 0; i<file.length ; i++){
		currentLine+=file[i];
		x++;
		if(x==width){
			x=0;
			y++;
			if(y==height){
				y=0;
				layersOfImg.push(currentLayer);
				currentLayer=[];
				currentLayer.push(currentLine);
				
			} else{
				currentLayer.push(currentLine);
			}
			currentLine="";
		}
	}
	
	// Analyse
	//console.log(layersOfImg);
	var finalImg=[];
	for(var y=0; y < height ; y++){
		var line="";
		for(var x=0; x < width ; x++){
			var found=false;
			var i=0;
			while(!found && i< layersOfImg.length-1){
				if(y<layersOfImg[i].length){
					if(layersOfImg[i][y].charAt(x)!="2"){
						if(layersOfImg[i][y].charAt(x)=="1"){
							line+="\u25A1";
						}else{
							line+="\u25A0";
						}
						found=true;
					}
				}
				i++;
			}
			if(!found){
				line+=" ";
			}
		}
		finalImg.push(line);
	}
	
	for(var i=0;i<finalImg.length ; i++){
		console.log(finalImg[finalImg.length-i-1]);
	}
	console.log(finalImg);
}


