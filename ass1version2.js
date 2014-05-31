window.onload = function (){

	var paper;
	var ballBackground;
	var hipsterBackground
	var turkeyBackground
	var startPage;
	var startButton;
	var startText;
	var shapeArray = [];
	var mouse_x = 0;
	var mouse_y = 0;
	var playing = false
 	var chosenShape = "ball"
 	var option1, option2, option3
 	var choiceText;
 	var weight;
 	var back;
 	var playInterval;
 	var pointer

	init();

	// intialialises the paper and set the ball rolling
	function init(){
		paper = new Raphael( 0, 0, 800, 600);
		startScreen();
	};

	// sets up the start screens and preloads image background
	function startScreen(){
		loadBackgrounds();
		startPage = paper.rect(0, 0, 800, 600);
		startPage.attr({fill:"45-" + randomColour() + "-" + randomColour()});
		setupButton();
		setupOptions();
	}

	// loads all images backgrounds
	function loadBackgrounds(){
		turkeyBackground = paper.image("anim_images/turkey.jpg",0,0,50,37.5);
		hipsterBackground = paper.image("anim_images/hipsterCafe.png",0,0,50,37.5);
		ballBackground = paper.image("anim_images/beach.png",0,0,50,37.5);
	}

	// sets up the back button 
	function backButton(){
		backText = paper.text(660, 530, "MENU").attr({fill: 'white'});
		backText.attr({ "font-size": 25, "font-family": "Arial, Helvetica, sans-serif", 'opacity': "0.3"  });
		back = paper.rect(600, 500, 120, 60, 25);
		back.attr({fill:randomColour(),"stroke": "#fff",
    		"stroke-width": "10", 'opacity': "0.3" });

		back.mouseover(function(){
			this.animate({'transform':"s1.5 1.5", "fill":randomColour(), 'opacity': "0.6"  }, 200);
			backText.animate({'transform':"s1.5 1.5", 'opacity': "1"}, 200);
		});

		back.mouseout(function(){
			this.animate({'transform':"s1 1", "fill":randomColour(), 'opacity': "0.3"  }, 200);
			backText.animate({'transform':"s1 1", 'opacity': "0.3"}, 200);
		});

		back.click(function(){
			startAgain();
		});

	};

	// function called from clicking the back button
	// clear eveything and sets up the start menu
	function startAgain(){
		playing = false;
		clearArray();
		clearBackground();
		stopMusic();
		clearInterval(playInterval);
		init();
	};

	// empties the shapeArray
	function clearArray(){
		for (var i = shapeArray.length - 1; i >= 0; i--) {
			kill = shapeArray[i];
			kill.remove()
		};
		shapeArray = [];
	};

	// clears the backgrounds - part of the back events
	function clearBackground(){
		turkeyBackground.remove();
		hipsterBackground.remove();		
		ballBackground.remove();
		back.remove();
	}

	// setup GO button
	function setupButton(){
		startButton = paper.rect(300, 450, 200, 100, 20);
		startButton.attr({
			fill:"blue", 
			"stroke": "#fff",
    		"stroke-width": "10", 
    		'opacity': "0.7"  
    	});

		startText = paper.text(400, 500, "GO!!").attr({fill: 'white'});
		startText.attr({ "font-size": 25, "font-family": "Arial, Helvetica, sans-serif" });

		chooseText = paper.text(400, 100, "CHOOSE A THING!!").attr({fill: 'white'});
		chooseText.attr({ "font-size": 30, "font-family": "Arial, Helvetica, sans-serif" });

		startButton.mouseover(function(){
			this.animate({
			'transform':"s1.3 1.3",
        	fill: randomColour()
        	}, 300);
		});
		startButton.mouseout(function(){
			this.animate({
			'transform':"s1 1",
        	fill: randomColour()
        	}, 300);
        });
        startButton.click(function(){
        	play();
        });
	}

	// setup the point object that follows the mouse
	function setup_pointer(){
		pointer = paper.circle(mouse_x, mouse_x, 20);
		pointer.attr({
			fill:randomColour(), 
			"stroke": "#fff",
    		"stroke-width": "5", 
    		'opacity': "0.7" 
		})
	}

	// changes the ball pointer colour 
	function pointerColour(){
		setInterval(function(){
			pointer.attr({fill:randomColour()});
		}, 50);
	}

	// sets up the option buttons on the menu screen
	function setupOptions(){

		option1 = paper.rect(100, 200, 100, 100, 0);
		option1.attr({fill:randomColour(), "stroke": "#fff",
    		"stroke-width": "10", 
    		'opacity': "0.7"});

		option2 = paper.circle(400, 250, 50);
		option2.attr({fill:randomColour(), "stroke": "#fff",
    		"stroke-width": "10", 
    		'opacity': "0.7"});

		option3 = paper.image("anim_images/hipsterMatt.png",580,180,120,145)
		option3.attr({rotation: '0'});

		choiceText = paper.text(400, 350, "").attr({fill: 'white'});
		choiceText.attr({ "font-size": 30, "font-family": "Arial, Helvetica, sans-serif" });

		option1.click(function(){
			chosenShape = "box";
			choiceText.attr({text: 'BOX' });
			this.attr({transform: "r0"}).animate({ "transform":"r360" },500);
		});

		option1.mouseover(function(){
			this.animate({'transform':"s1.5 1.5", "fill":randomColour()}, 200);
		});

		option1.mouseout(function(){
			this.animate({'transform':"s1 1", "fill":randomColour()}, 200);
		});

		option2.click(function(){
			chosenShape = "ball";
			choiceText.attr({text: 'BALL' });
		});

		option2.mouseover(function(){
			this.animate({'transform':"s1.5 1.5", "fill":randomColour()}, 200);
		});

		option2.mouseout(function(){
			this.animate({'transform':"s1 1", "fill":randomColour()}, 200);
		});

		option3.click(function(){
			chosenShape = "hipsterMatt";
			choiceText.attr({text: 'HIPSTER MATT' });
			this.attr({transform: "r0"}).animate({ "transform":"r720" },200); // http://www.programmingrelief.com/1000502/Why-Wont-My-Raphael-Js-Animation-Loop%3F
		});

		option3.mouseover(function(){
			this.animate({'transform':"s1.5 1.5", "fill":randomColour()}, 200);
		});

		option3.mouseout(function(){
			this.animate({'transform':"s1 1", "fill":randomColour()}, 200);
		});

	}

	// sets the the conditions to play animation
	function play() {
		playing = true;
		clearStart()
		startAction();
		scaleBG();
		startMusic();
		backButton();
		setup_pointer();
		pointerColour();
	}

	// function to start music 
	function startMusic(){
		document.getElementById("annoying_music").play();
	}

	// function to stop music
	function stopMusic(){
		document.getElementById("annoying_music").pause();
		document.getElementById("annoying_music").currentTime = 0;
	}

	// clear the start screen - part of the play actions
	function clearStart(){
		startButton.remove();
		startText.remove();
		option1.remove();
		option2.remove();
		option3.remove();
		choiceText.remove();
		chooseText.remove();
	}

	// generate random colour based on RGB values 
	function randomColour(){
		var r = Math.floor((Math.random()*255)+0);
		var g = Math.floor((Math.random()*255)+0);
		var b = Math.floor((Math.random()*255)+0);
		var colour = "rgb(" + r + "," + g + "," + b + ")";
		return colour;
	};
	
	// Gets the mouse X, Y position
	// This function was written followiing instructions found at - http://stackoverflow.com/questions/7790725/javascript-track-mouse-position
	window.onmousemove = handleMouseMove
	
	function handleMouseMove(event){
		if (event.clientX != null) {
			mouse_x = event.clientX;
		}
		if (event.clientY != null) {
			mouse_y = event.clientY;
		}
	};

	// starts the action
	function startAction(){
			 playInterval = setInterval(function(){
				if(playing == true){
					switch(chosenShape)
					{
					case "ball":
					  turkeyBackground.remove();
					  hipsterBackground.remove();
					  startPage.remove();
					  ball();
					  break;
					case "box":
					  hipsterBackground.remove();
					  ballBackground.remove();
					  startPage.remove();
					  box()
					  break;
					case "hipsterMatt":
					  turkeyBackground.remove();
					  ballBackground.remove();
					  startPage.remove();
					  hipster();
					  break
					}
				}
				pointer.toFront();
				back.toFront();
			}, 395);
	}

	function scaleBG(){
			 playInterval = setInterval(function(){
				if(playing == true){
					switch(chosenShape)
					{
					case "ball":
					  changeBG(ballBackground);
					  break;
					case "box":
					  changeBG(turkeyBackground);
					  break;
					case "hipsterMatt":
					  changeBG(hipsterBackground);
					  break
					}
				}
			}, 790);
	}

	// interval to change the position of elements in the scene
	setInterval(function(){
		if(playing){
			floating_things();
			pointer.attr({cx:mouse_x, cy:mouse_y});
		};
	}, 10);

	// interval to animate the menu bg colour change
	setInterval(function(){
		startPage.animate({fill:randomColour()},1500);
	}, 1500);

	// changes the elements colour every 2 beats
	setInterval(function(){
		if(playing){
			shapeArray.forEach(function(thing){
				if(chosenShape == "ball"){
					colour = randomColour();
					thing.attr({fill:'45-' + colour + '-white'});
				}
				if(chosenShape == "box"){
					colour = randomColour();
					thing.attr({fill:'45-' + colour + '-white'});
				}
			});
		};
	}, 800);

	// creates a ball
	// pushes onto shapeArray
	// shifts and removes element when shapeArray.length == 20
	function ball() {
		colour = randomColour()
		if (shapeArray.length == 20){
			kill = shapeArray.shift()
			kill.remove();
			var ball = paper.circle(Math.floor((Math.random()*750)+25), Math.floor((Math.random()*550)+25), Math.floor((Math.random()*90)+25));
			ball.attr({ 
				"fill": "45-" + randomColour() + "-" + randomColour(), 
				'opacity': "0.7",
				"stroke": "#fff",
	    		"stroke-width": "10"
			});
			shapeArray.push(ball);
		} else { 
			var ball = paper.circle(Math.floor((Math.random()*750)+25), Math.floor((Math.random()*550)+25), Math.floor((Math.random()*90)+25));
			ball.attr({ 
				"fill": "45-" + randomColour() + "-" + randomColour(), 
				'opacity': "0.7",
				"stroke": "#fff",
	    		"stroke-width": "10"
			});			
			shapeArray.push(ball);
		}
	};

	// creates a box
	// pushes onto shapeArray
	// shifts and removes element when shapeArray.length == 20
	function box() {
		if (shapeArray.length == 20){
			kill = shapeArray.shift()
			kill.remove();
			var size = Math.floor((Math.random()*180)+25);
			var square = paper.rect(Math.floor((Math.random()*750)+25), Math.floor((Math.random()*550)+25), size, size)
			square.attr({ 
				"fill": "45-" + randomColour() + "-" + randomColour(), 
				'opacity': "0.7",
				"stroke": "#fff",
	    		"stroke-width": "10"
			});
			shapeArray.push(square);
		} else {
			var size = Math.floor((Math.random()*180)+25);
			var square = paper.rect(Math.floor((Math.random()*750)+25), Math.floor((Math.random()*550)+25), size, size)
			square.attr({ 
				"fill": "45-" + randomColour() + "-" + randomColour(),  
				'opacity': "0.7",
				"stroke": "#fff",
	    		"stroke-width": "10"
			});
			shapeArray.push(square);
		}	
	}

	// creates a hipster
	// pushes onto shapeArray
	// shifts and removes element when shapeArray.length == 20
	function hipster(){
		var scaler = Math.floor((Math.random()*4)+1)
		var width = 267 / scaler;
		var height = 322 / scaler;
		if (shapeArray.length == 60){
			kill = shapeArray.shift()
			kill.remove();
			var hipster = paper.image("anim_images/hipsterMatt.png",Math.floor((Math.random()*700)+0),Math.floor((Math.random()*500)+0),width,height);
			shapeArray.push(hipster);
		} else {
			var hipster = paper.image("anim_images/hipsterMatt.png",Math.floor((Math.random()*700)+0),Math.floor((Math.random()*500)+0),width,height);
			shapeArray.push(hipster);
		}
	}

	// Move the elements in shapeArray around the screen like they are floating
	function floating_things(){
		shapeArray.forEach(function(thing){

			if(chosenShape == 'ball'){
				var thing_x = thing.attr("cx");
				var thing_y = thing.attr("cy");
				var width = thing.attr("r");
			} else {
				var thing_x = thing.attr("x");
				var thing_y = thing.attr("y");
				var width = thing.attr("width");
			};

			new_mouse_x = mouse_x - 400;
			new_mouse_y = mouse_y - 300;


			vel_x = new_mouse_x * 0.01;
			vel_y = new_mouse_y * 0.01;	

			if(thing_x > 800 + (width + 10)){
				thing_x = -20;
			};

			if(thing_x < 0 - (width - 10)){
				thing_x = 800 + width;
			};

			if(thing_y < 0 - (width - 10)){
				thing_y = 600 + width;
			};

			if(thing_y > 600 + (width + 10)){
				thing_y = -20;
			};	
	
			if(chosenShape == 'hipsterMatt'){
				weight = (width/2) * 0.005;
			} ;

			if (chosenShape == 'box'){
				weight = (width/2) * 0.01;
			};

			if(chosenShape == 'ball'){
				weight = width * 0.01;
			};

			thing_x += vel_x + weight;
			thing_y += vel_y + weight;

			if(chosenShape == 'ball'){
				thing.attr({cx:thing_x ,cy:thing_y});
			} else {
				thing.attr({x:thing_x ,y:thing_y});
			};
		});  
	}

	// Changes the bg scale until it is certain size.
	function changeBG(background){
		var bg_width = background.attr("width") * 2;
		var bg_height = background.attr("height") * 2;

		if(bg_width == 1600){

		}else{
			background.attr({width:bg_width, height:bg_height})
		}
	}
};

