
sounds.load([
  "sounds/click2.wav", 
  "sounds/music.wav",
  "sounds/bounce.mp3",
  "sounds/clang2.wav"
]);


sounds.whenLoaded = sound;

//++++++++++++++++++++++++

//Sounds and music can only be launched from within the setup function

//+++++++++++++++++++++++

function sound() {
  console.log("sounds loaded");
	
  //Create the sounds
  var shoot = sounds["sounds/click2.wav"],
      music = sounds["sounds/music.wav"],
      bounce = sounds["sounds/bounce.mp3"],
	  clang = sounds["sounds/clang2.wav"];


 
  shoot.volume = 0.4;
  shoot.playbackRate = 0.7; 

  music.loop = true;


  music.pan = -0.8;


  music.volume = 0.7;  


  bounce.setEcho(0.2, 0.3, 1000);


  var a = keyboard(65),
      b = keyboard(66),
      c = keyboard(67),
      d = keyboard(68),
      e = keyboard(69),
      f = keyboard(70);
      g = keyboard(71);
      h = keyboard(72);

  //Control the sounds based on which keys are pressed
	
/* 	if(sound){
		shoot.play();
		sound = false;
	} */
	
	if(soundindex == 1){
		
		shoot.play();
		soundindex = 0;
		
	}
	
	if(soundindex == 2){
		
		clang.play();
		soundindex = 0;
		
	}
	
  //Play the loaded shoot sound
  a.press = function() { shoot.play() };

  //Play the loaded music sound
  b.press = function() {
    if (!music.playing) {
      music.play();
    }
    console.log("music playing");
  };

  //Pause the music 
  c.press = function() {
    music.pause();
    console.log("music paused");
  };

  //Restart the music 
  d.press = function() {
    music.restart();
    console.log("music restarted");
  };

  //Play the music from the 10 second mark
  e.press = function() {
    music.playFrom(10);
    console.log("music start point changed");
  };
  
  //Play the bounce sound
  f.press = function() { bounce.play() };

  //Fade the music out over 3 seconds
  g.press = function() { 
    music.fadeOut(3);
  };

  //Fade the music in over 3 seconds
  h.press = function() { 
    music.fadeIn(3);
  };
  
  
}


var i = keyboard(73),
    j = keyboard(74),
    k = keyboard(75),
    l = keyboard(76);

	
i.press = function(){ shootSound() };
j.press = function(){ jumpSound() };
k.press = function(){ explosionSound() };
l.press = function(){ bonusSound() };

//The sound effect functions

//The shoot sound
function shootSound() {
  soundEffect(
    1046.5,           //frequency
    0,                //attack
    0.3,              //decay
    "sawtooth",       //waveform
    1,                //Volume
    -0.8,             //pan
    0,                //wait before playing
    1200,             //pitch bend amount
    false,            //reverse bend
    0,                //random pitch range
    25,               //dissonance
    [0.2, 0.2, 2000], //echo: [delay, feedback, filter]
    undefined         //reverb: [duration, decay, reverse?]
  );
}

//The jump sound
function jumpSound() {
  soundEffect(
    523.25,       //frequency
    0.05,         //attack
    0.2,          //decay
    "sine",       //waveform
    3,            //volume
    0.8,          //pan
    0,            //wait before playing
    600,          //pitch bend amount
    true,         //reverse
    100,          //random pitch range
    0,            //dissonance
    undefined,    //echo: [delay, feedback, filter]
    undefined     //reverb: [duration, decay, reverse?]
  );
}

//The explosion sound
function explosionSound() {
  soundEffect(
    16,          //frequency
    0,           //attack
    1,           //decay
    "sawtooth",  //waveform
    1,           //volume
    0,           //pan
    0,           //wait before playing
    0,           //pitch bend amount
    false,       //reverse
    0,           //random pitch range
    50,          //dissonance
    undefined,   //echo: [delay, feedback, filter]
    undefined    //reverb: [duration, decay, reverse?]
  );
}

//The bonus points sound
function bonusSound() {
  //D
  soundEffect(587.33, 0, 0.2, "square", 1, 0, 0);
  //A
  soundEffect(880, 0, 0.2, "square", 1, 0, 0.1);
  //High D
  soundEffect(1174.66, 0, 0.3, "square", 1, 0, 0.2);
}
      
	  
	
var soundindex = 0;
  
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var button_red=document.getElementById("button_red");
var button_blue=document.getElementById("button_blue");
var button_select=document.getElementById("button_select");
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
var taking = true;
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
	taking = true;
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
		
		if (i<16){
			
			if (box.state[i]){
			c.drawImage(button_blue, box.x[i], box.y[i]);
			
			} else {
				
			c.drawImage(button_red, box.x[i], box.y[i]);
				
			}
		
		}else if (i == 16){
			
			c.drawImage(button_select, box.x[i], box.y[i]);
		
		} else if (i == 67){
			
			c.fillStyle = 'rgba('+box.r[i]+','+box.g[i]+','+box.b[i]+','+box.a[i]+')';
		
			c.fillRect(box.x[i], box.y[i], box.width[i], box.height[i]);
		
		}
		
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
			
			
			
			soundindex = 1;
			sound();
			Select();
			currentpiece--;
			selected++;
			
			
		} else if (BoxID == (currentpiece +1) && selected != 0){
			
			soundindex = 1;
			sound();
			Select();
			currentpiece++;
			selected--;
			
		}
	
	} else if (selected == 3 && i < 16){
		
		if (BoxID == (currentpiece +1) && selected != 0){
			
			soundindex = 1;
			sound();
			Select();
			currentpiece++;
			selected--;
			
		}
	
	} else if (i>15) {
		
		soundindex = 1;
		sound();
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
			/* click.play(); */
			box.g[i] = 255;
			box.b[i] = 0;
			box.state[i] = false;
		} else{
			/* click.play(); */
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
		taking = false;
		
		setTimeout(button, 500);
			
		

	}
	
}

//turns off the turn button after the setTimeout function 
function button(){
			
			soundindex = 2;
			
			sound();
			
			turn = false;
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
  if (taking){
	
	PixelDetect();	
	  
  }
  
  
});

canvas.addEventListener('mousemove', function(e){
	imgData = c.getImageData(mouse.x,mouse.y,1,1);
	mouse.x = e.pageX;
	mouse.y = e.pageY;
});



Init();



	
