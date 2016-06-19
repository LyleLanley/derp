


var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var derp = true;
var boxcounter = 0;
var imgData;
var mouse = {
  x : 0, 
  y : 0,
  down: false
};
var BoxID = 0;
var pieces = 16;
var currentpiece = 16;
var gamesteps = (pieces/4);
var turns = 0;
var selected = 0;
var turn = true;
var ai = {
	
	taking : 0
	
};

var box = {
	
	id : [],
	x : [],
	y : [],
	height : [],
	width : [],
	r : [],
	g : [],
	b : [],
	a : [],
	state : [],
};





//-------------------------------------------------------------------------------------

function GameLoop(){
	
	//setInterval(BoxMove, 20);
	
	c.clearRect(0, 0, canvas.width, canvas.height);
	Draw();
	if (turn == false){
		
		computer_turn();
		
	}
	window.requestAnimationFrame(GameLoop);
	
	
}


//Initializes the game. Sets up the attributes for all the boxes

function Init(){
	BoxLocations();
	 window.requestAnimationFrame(GameLoop);
	
}

//--------------------------------------------------------------------------------------


//Main code for the computers turn

function computer_turn() {
	
	ai_select();
	
	for(d = 0; d <= ai.taking; d++){
		
		i = currentpiece;
		currentpiece--;
		box.g[i] = 0;
		box.b[i] = 255;
		box.state[i] = true;	
	}
	reset_turn();
	
}

//resets data when shifting turn back to player

function reset_turn(){
	
	ai.taking = 0;
	selected = 0;
	gamesteps - 4;
	currentpiece++;
	turns++;
	turn = true;
}

//determines how many pieces the ai should select based on how many the player has selected

function ai_select(){
	
	
	if (selected == 0){
		
		ai.taking = 0;
		
	} else if (selected == 1){
		
		ai.taking = 3;
		
		
	} else if (selected == 2){
		
		ai.taking = 2;
		
	} else if (selected == 3){
		
		ai.taking = 1;
	}
}

//Paints the board based on the attributes given

function Draw(){
	
	for (i = 0; i < boxcounter; i++) {
		
		
		c.fillStyle = 'rgba('+box.r[i]+','+box.g[i]+','+box.b[i]+','+box.a[i]+')';
		
		c.fillRect(box.x[i], box.y[i], box.width[i], box.height[i]);
		
	}
}

//Designates the attributes of all the boxes in the script

function BoxLocations() {
	
	for (i = 0; i < 16; i++) {
		
		box.id[i] = (i + 1);
		box.x[i] = 30;
		box.x[i] = 30 * (i + 1);
		box.y[i] = 100;
		box.height[i] = 15;
		box.width[i] = 15;
		box.r[i] = 0;
		box.g[i] = 255;
		box.b[i] = 0;
		box.a[i] = 1;
		box.state[i] = false;
		boxcounter++;
		
	}
	box.x[16] = 200;
	box.y[16] = 200;
	box.width[16] = 60;
	box.height[16] = 20;
	box.r[16] = 0;
	box.g[16] = 255;
	box.b[16] = 0;
	box.a[16] = 1;
	box.state[16] = false;
	boxcounter ++;
	
}


//Calls the ID check if the mouse is down, also uses imgdata to check for colour of pixel under mouse
	
function PixelDetect(){
	 if (mouse.down){
		 
		 BoxIdCheck();
		 
		 //alert(derp);
		 
		for (var d = 0; d < imgData.data.length; d += 4)
		{
			if (imgData.data[d] == 255){
				//alert("red");
				break;
				
			} else if (imgData.data[d + 1] == 255){
				//alert("green");
				break;
				
			} else {
				//alert("white");
				break;
			}
		}
	 }
		 
	
}


//Checks where the mouse is, and if it's within the X and Y coordinates of any of the boxes

function BoxIdCheck() {
	
	for (i = 0; i < boxcounter; i++) {
		
		if (mouse.x > box.x[i] && mouse.x < (box.x[i] + box.width[i])){
			
			//alert("Hello");
			if (mouse.y > box.y[i] && mouse.y < (box.y[i] + box.height[i])){
			
			BoxID = (i+1);
			
			takeboxes();
			
			
			
			
			}
			
		}
		
	}
		
}


//Selects or deselects individual boxes based on the value of 'i'
function takeboxes (){
	
	
	if (selected <3 && i < 16){
		
		if (BoxID == currentpiece){
			
			Select();
			currentpiece--;
			selected++;
			
			
		} else if (BoxID == (currentpiece +1) && selected != 0){
			
			Select();
			currentpiece++;
			selected--;
			
		}
	
	} else if (selected == 3 && i < 16){
		
		if (BoxID == (currentpiece +1) && selected != 0){
			
			Select();
			currentpiece++;
			selected--;
			
		}
	
	} else if (i>15) {
		
		Select();
		
	} 
		
		
	
	
}

//+++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++



//Contains the functions of all individual buttons
//i = 0 to i = 15 are the gameboxes, 
//i = 16 is the turn button. Will restart the game if the current piece is at 0.

function Select(){
	
	if (i < 16){
	
		if (box.state[i]){
			
			box.g[i] = 255;
			box.b[i] = 0;
			box.state[i] = false;
		} else{
			
			box.g[i] = 0;
			box.b[i] = 255;
			box.state[i] = true;
		}
	} else if (i == 16){
		
		if (currentpiece == 0){
			
			 location.reload();
			
		}
		
		box.g[16] = 0;
		box.b[16] = 255;
		box.state[16] = true;
		turn = false;
		setTimeout(button, 70);
			
		

	}
	
}

//turns off the turn button after the setTimeout function 
function button(){
	
			box.g[16] = 255;
			box.b[16] = 0;
			box.state[16] = false;
	
}
	

function BoxMove(){
	
	box.x[2] += 1;
	
}

//--------------------------------------------------------------------------

canvas.addEventListener('mouseup', function(e){
  mouse.down = false;
});

canvas.addEventListener('mousedown',function(e){
	
  mouse.down = true;
  if (turn){
	
	PixelDetect();	
	  
  }
  
  
});

canvas.addEventListener('mousemove', function(e){
	imgData = c.getImageData(mouse.x,mouse.y,1,1);
	mouse.x = e.pageX;
	mouse.y = e.pageY;
});



Init();



	
