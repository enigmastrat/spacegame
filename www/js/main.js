/*
 * Copyright 2022 Robert Reed
 */

$(document).ready(init);

var canvas;
var ctx;

var dots = [];
var width;
var height;
var colorPicker;

var initTimer;

let worldRadius = 100;
let vehicleRadius = 20;
let gravityFactor = 20000;
let speedFactor = .02;



// Should be very close to, but below 1, like .9995
// Numbers above 1 would cause orbitalExpansion
let orbitalDecay = .9995;
let planet1;
let planet2;
let enemies = [];

let score = 0;


let levels = [];
let levelNum = 0;
let mousex = 0;
let mousey = 0;
let isMobile = false;
function init() {

  $("#demo-canvas").mousedown(handleCanvasClick);
  //$("#demo-canvas").mousemove(handleMouseMove);
  $("#demo-canvas").on("touchmove", handleTouchMove);

  // TODO figure out if I can use touch events
  //document.getElementById("demo-canvas").addEventListener('touchstart', handleCanvasTouch);


  setWindowSize();
  setPlanetLocations();

  //window.setInterval(drawCanvas, 15);
  window.requestAnimationFrame(drawCanvas);

  window.setInterval(cleanData, 100);
  window.setInterval(recalculateData, 15);

  window.addEventListener('resize', setWindowSize, true);
  window.addEventListener('resize', setPlanetLocations, true);

  // if mobile
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    isMobile = true;
    $("#demo-canvas").mousemove(handleMouseMove);
    //$("#demo-canvas").on("touchmove", handleMouseMove);
  }
  // else desktop
  else {
    $("#demo-canvas").mousemove(handleMouseMove);
    $(document).on("keydown", move);
    $(document).on("keyup", stop);
  }


  // TODO create enemy timeline
  //window.setInterval(addEnemy, 2000);
  //enemies = level1;

  // Level 1
  levels.push([
	  getEnemy(0,50,160,8,1,50),
	  getEnemy(0,50*24,160,8,1,50),
  ]);

  // Level 2
  levels.push([
    getEnemy(0,50,160,8,1,50),
    getEnemy(0,50*8,160,8,1,50),
    getEnemy(0,50*16,160,8,1,50),
    getEnemy(0,50*24,160,8,1,50),
  ]);

  // Level 3
  levels.push([
	  getEnemy(1,50,160,8,1,50),
	  getEnemy(1,50*20,80,8,1,50),
    ]);

  // Level 4
  levels.push([
	  getEnemy(0,50,160,8,1,50),
	  getEnemy(0,50*8,160,8,1,50),
	  getEnemy(0,50*16,160,8,1,50),
	  getEnemy(1,50*20,80,8,1,50),
	  getEnemy(0,50*24,160,8,1,50),
    ]);

  // Level 5
  levels.push([
	  getEnemy(0,50,160,8,1,50),
	  getEnemy(1,50*4,80,8,1,50),
	  getEnemy(0,50*8,160,8,1,50),
	  getEnemy(0,50*16,160,8,1,50),
	  getEnemy(1,50*20,80,8,1,50),
	  getEnemy(0,50*24,160,8,1,50),
    ]);

  // Level 6
  levels.push([
	getEnemy(0,50,160,8,1,50),
	getEnemy(1,50*4,80,8,1,50),
	getEnemy(0,50*8,160,8,1,50),
	getEnemy(1,50*12,80,8,1,50),
	getEnemy(0,50*16,160,8,1,50),
	getEnemy(1,50*20,80,8,1,50),
	getEnemy(0,50*24,160,8,1,50),

	getEnemy(0,50,240,8,1,50),
	getEnemy(1,50*4,320,8,1,50),
	getEnemy(0,50*8,240,8,1,50),
	getEnemy(1,50*12,320,8,1,50),
	getEnemy(0,50*16,240,8,1,50),
	getEnemy(1,50*20,320,8,1,50),
	getEnemy(0,50*24,240,8,1,50),
  ]);

  // Level 7
  levels.push([
	getEnemy(0,50,160,8,1,50),
	getEnemy(1,50*4,80,8,1,50),
	getEnemy(0,50*8,160,8,1,50),
	getEnemy(1,50*12,80,8,1,50),
	getEnemy(0,50*16,160,8,1,50),
	getEnemy(1,50*20,80,8,1,50),
	getEnemy(0,50*24,160,8,1,50),

	getEnemy(0,50,240,8,1,50),
	getEnemy(1,50*4,320,8,1,50),
	getEnemy(0,50*8,240,8,1,50),
	getEnemy(1,50*12,320,8,1,50),
	getEnemy(0,50*16,240,8,1,50),
	getEnemy(1,50*20,320,8,1,50),
	getEnemy(0,50*24,240,8,1,50),

	getEnemy(0,50,400,10,1,50),
	getEnemy(1,50*4,480,10,1,50),
	getEnemy(0,50*8,400,10,1,50),
	getEnemy(1,50*12,480,10,1,50),
	getEnemy(0,50*16,400,10,1,50),
	getEnemy(1,50*20,480,10,1,50),
	getEnemy(0,50*24,400,10,1,50),
  ]);

  // Level 8
  levels.push([
	  getEnemy(1,50,160,8,1,50),
	  getEnemy(1,50*4,80,8,1,50),
	  getEnemy(1,50*8,160,8,1,50),
	  getEnemy(1,50*16,160,8,1,50),
	  getEnemy(1,50*20,80,8,1,50),
	  getEnemy(1,50*24,160,8,1,50),
    ]);


    // Level 9
    levels.push([
    getEnemy(1,50,160,8,1,50),
    getEnemy(1,50*4,80,8,1,50),
    getEnemy(1,50*8,160,8,1,50),
    getEnemy(1,50*12,80,8,1,50),
    getEnemy(1,50*16,160,8,1,50),
    getEnemy(1,50*20,80,8,1,50),
    getEnemy(1,50*24,160,8,1,50),

    getEnemy(0,50,240,8,1,50),
    getEnemy(1,50*4,320,8,1,50),
    getEnemy(0,50*8,240,8,1,50),
    getEnemy(1,50*12,320,8,1,50),
    getEnemy(0,50*16,240,8,1,50),
    getEnemy(1,50*20,320,8,1,50),
    getEnemy(0,50*24,240,8,1,50),
    ]);

    // Level 10
    levels.push([
    getEnemy(1,50,160,8,1,50),
    getEnemy(1,50*4,80,8,1,50),
    getEnemy(1,50*8,160,8,1,50),
    getEnemy(1,50*12,80,8,1,50),
    getEnemy(1,50*16,160,8,1,50),
    getEnemy(1,50*20,80,8,1,50),
    getEnemy(1,50*24,160,8,1,50),

    getEnemy(1,50,240,8,1,50),
    getEnemy(1,50*4,320,8,1,50),
    getEnemy(1,50*8,240,8,1,50),
    getEnemy(1,50*12,320,8,1,50),
    getEnemy(1,50*16,240,8,1,50),
    getEnemy(1,50*20,320,8,1,50),
    getEnemy(1,50*24,240,8,1,50),
    ]);
  startLevel(levelNum++);
}

let levelText = "";
let levelTextColor = "#FA0";
let timerTextColor = "#5F0";
let timerBonusText = "";
let levelStarted = false;
let timer = 60;
let levelStartTime = 0;
let lastCalcTime = (new Date()).getTime();
let remainingTime = 0;

function startLevel(levelNum) {
	levelText = "Level " + (levelNum+1);
	window.setTimeout(setLevel(levelNum), 3000);
}

function checkTimerBonus() {
	if (remainingTime > 0) {
		timerBonusText = "Timer Bonus: " + remainingTime;
	} else {
		timerBonusText = "";
	}
}

function setLevel(levelNum) {
	return function() {
		levelText = "";
		timerBonusText = "";
		levelStarted = true;
		enemies = levels[levelNum];
	    levelStartTime = (new Date()).getTime();
	}
}


let alreadyLaunched = false;

function move(e) {
  console.log(e.which);

	// Space bar
	if (e.which == 32) {
    if (!alreadyLaunched) {
      launch(player1);
    }
    alreadyLaunched = true;
	}
	// w
	if (e.which == 87 || e.which == 38) {
		player1.yDirection = -1;
	}
	// a
	if (e.which == 65 || e.which == 37) {
		player1.xDirection = -1;
	}
	// s
	if (e.which == 83 || e.which == 40) {
		player1.yDirection = 1;
	}
	// d
	if (e.which == 68 || e.which == 39) {
		player1.xDirection = 1;
	}
}

function stop(e) {
	// Space bar
	if (e.which == 32) {
    alreadyLaunched = false;
	}
	// w
	if (e.which == 87 || e.which == 38) {
		if (player1.yDirection < 0)
			player1.yDirection = 0;
	}
	// a
	if (e.which == 65 || e.which == 37) {
		if (player1.xDirection < 0)
			player1.xDirection = 0;
	}
	// s
	if (e.which == 83 || e.which == 40) {
		if (player1.yDirection > 0)
			player1.yDirection = 0;
	}
	// d
	if (e.which == 68 || e.which == 39) {
		if (player1.xDirection > 0)
			player1.xDirection = 0;
	}
}

function setWindowSize() {
  canvas = document.getElementById("demo-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = $("#demo-canvas").width();
  height = $("#demo-canvas").height();
  ctx = canvas.getContext("2d");
}

function setPlanetLocations() {
  let baseRadius = canvas.height/15;
  let p1Weight = 1+Math.random();
  let p2Weight = 1+Math.random();

  player1 = {
    color: "#08F",
    x: (canvas.width/2)-baseRadius,
    y: height-(height/5),
	xDirection: 0,
	yDirection: 0,
	speed: 8,
    radius: baseRadius,
    impacts: (planet1) ? planet1.impacts : 0,
    weight: 1,
    rocketImage: "img/cuteMarshmallow.png",
	img: "img/unicorn.png"
  };
}

function handleCanvasClick(event) {
  if (initTimer) {
    window.clearTimeout(initTimer);
    initTimer = undefined;
  }

  const x = event.offsetX;
  const y = event.offsetY;

  launch(player1);
}

function handleTouchMove(event) {
  // TODO find a better way to determine is mobile
  isMobile = true;
  var touchLocation = event.targetTouches[0];
  event.preventDefault();

  // assign player new position based on the touch
  player1.x = touchLocation.pageX;
  player1.y = touchLocation.pageY;
}

// TODO figure out if I can use touch events
function handleCanvasTouch(event) {
  for (let i in event.targetTouches) {
    let t = event.targetTouches[i];
    launch(player1);
  }
}
function handleMouseMove(event) {
  mousex = event.offsetX;
  mousey = event.offsetY;
}

function launch(object, direction, isEnemyFire, speed) {
  const width = "10";
  const height = "10";
  let x = object.x;
  let y = object.y;

  direction = (direction == undefined) ? 1 : direction;
  let color = object.color;
  let image = object.rocketImage;
  speed = (speed == undefined) ? 1 : speed;

  dots.push({
    x: object.x,
    y: object.y + object.radius * ((isEnemyFire) ? 1 : -1),
    xv: 0,//*((5+Math.random()*5)/speedFactor),
    v: -direction*1000*speed,//((Math.random()*2)-2)/speedFactor,
    bounciness: -((Math.random()*.10)+.8),
    width: width,
    height: height,
    radius: 40,
    color: color,
    time: (new Date()).getTime(),
    impacted: false,
    image: image,
	isEnemyFire: isEnemyFire
  });
}

function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
}

function drawCanvas() {
  clearCanvas();

  //drawPlanet(planet2);
  drawEnemies(enemies);

  for (let i in dots) {
    let dot = dots[i];


    if(dot.x > width || dot.x < 0 || dot.y > height || dot.y < 0) {
      continue;
    }

    // TODO figure out how to deal with image angles
    if (!dot.impacted) {
      let image = new Image(dot.radius, dot.radius);
      image.src = dot.image;
      ctx.drawImage(image, dot.x-(dot.radius/2), dot.y, dot.radius, dot.radius);
    } else {
      ctx.fillStyle = dot.color;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2, true);
      ctx.fill();
    }

  }

  drawSprite(player1);
  drawText("Score: "+score,250,50,"#FA0");

  remainingTime = Math.max(0,timer-Math.round((lastCalcTime-levelStartTime)/1000));
  drawText("Timer: "+remainingTime,50,50,timerTextColor);
  if (levelText != "") {
	  drawLevelText();
  }
  if (timerBonusText != "") {
	  drawTimerBonusText();
  }


  window.requestAnimationFrame(drawCanvas);
}

function drawText(score, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "30px Arial";
  ctx.fillText(score, x, y);
}
function drawTimerBonusText() {
  ctx.font = "62px Arial";
  textWidth = ctx.measureText(timerBonusText).width
  x = (width/2) - (textWidth/2);
  ctx.fillStyle = timerTextColor;
  ctx.fillText(timerBonusText, x, (height/2)-75);
}

function drawLevelText() {
  ctx.font = "62px Arial";
  textWidth = ctx.measureText(levelText).width
  x = (width/2) - (textWidth/2);
  ctx.fillStyle = levelTextColor;
  ctx.fillText(levelText, x, height/2);
}

function drawSprite(planet) {
  //ctx.fillStyle = planet.color;
  //ctx.beginPath();
  //ctx.arc(planet.x, planet.y, planet.radius/2, 0, Math.PI * 2, true);
  //ctx.fill();

  let image = new Image(planet.radius, planet.radius);
  image.src = planet.img;
  let px = planet.x-planet.radius;
  let py = planet.y-planet.radius;
  ctx.drawImage(image, px,py,planet.radius*2, planet.radius*2);
}

function cleanData() {
  let newDots = [];
  for (let i in dots) {
    let dot = dots[i];
    if (dot.radius < worldRadius) { // (dot.time > (new Date()).getTime()-20000 && dot.radius < worldRadius) {
      newDots.push(dot);
    }
  }

  dots = newDots;
}

function checkDots(dots, enemies) {
	let activeEnemyFire = 0;
	let liveEnemies = 0;

	for (let j=0; j<enemies.length; j++) {
		enemy = enemies[j];
		if (!enemy) {
			continue;
		}
		liveEnemies++;
	}

    for (let i=0; i<dots.length; i++) {

        dot = dots[i];
		if (dot == undefined) {
			continue;
		}

		if (dot && dot.y > height || dot.y < 0) {
			dot.offscreen = true;
		}
		if (!dot.isEnemyFire) {
			for (let j=0; j<enemies.length; j++) {
				enemy = enemies[j];
				if (!enemy) {
					continue;
				}
				if (dotDistance(dot, enemy) < (enemy.radius+dot.radius)/2) {
					impact(enemy, dot);
					delete dots[i];
				}
			}
		} else {
			if (dotDistance(dot, player1) < player1.radius) {
				death(player1, dot);
				delete dots[i];
			}
			activeEnemyFire++;
		}
    }

	if(levelStarted && activeEnemyFire == 0 && liveEnemies == 0) {
		levelStartTime = 0;
		levelStarted = false;
		checkTimerBonus();
		score += remainingTime;
		if(levels.length == levelNum) {
			levelText = "You Win! Final Score: " + score;
		} else {
			startLevel(levelNum++);
		}
	}
}

function death(player, dot) {
	dot.impacted = true;
	score -= 5;
	score = (score < 0) ? 0 : score;
}

function impact(enemy, dot) {
	enemy.hit = true;
	dot.impacted = true;
	score+=1;

	if (enemy.parent) {
		enemies.push(getEnemy(enemy.imageIndex, enemy.x, enemy.y, enemy.xv*1.25, 1, enemy.radius/2, false));
		enemies.push(getEnemy(enemy.imageIndex, enemy.x, enemy.y, enemy.xv*1.25, -1, enemy.radius/2, false));
	}
}

function recalculateData() {
  checkDots(dots, enemies);


  // TODO drop origV in favor of using "elapsedTimeSinceLastRecalculation" (rather than total elapsed time)
  for (let i in dots) {
    let dot = dots[i];
    let elapsedTime = ((new Date()).getTime() - lastCalcTime)*1.0/1000.0;

    // TODO remove launch dot somehow (offscreen maybe?)
    if (dot.offscreen) {
		delete dots[i];
	}


    if (!dot.impacted) {
      dot.y = dot.y + (dot.v*elapsedTime);
      dot.x = dot.x + (dot.xv*elapsedTime);
    }
  }

  // Mobile way may just be better in general
  if(!isMobile){
    newx = mousex;
    newy = mousey;
  }
  else {
    newx = player1.x + (player1.xDirection*player1.speed);
    newy = player1.y + (player1.yDirection*player1.speed);
  }
  if (newx >= player1.radius && newx <= (width-player1.radius)) {
    player1.x = newx;
  }

  // Keep player below half-way and above bottom
  if (newy >= (height/2+player1.radius) && newy <= (height-player1.radius)) {
    player1.y = newy;
  }


  calculateEnemyPosition(enemies, lastCalcTime);

  lastCalcTime = (new Date()).getTime();
}

function calculateEnemyPosition(enemies, lastCalcTime) {
	for (let i=0; i<enemies.length; i++){
		enemy = enemies[i];
		if (!enemy) {
			continue;
		}
		if (enemy.hit) {
			delete enemies[i]
		}
    	if (enemy.x < enemy.radius) {
			enemy.direction = 1;
		} else if (enemy.x > width-enemy.radius) {
			enemy.direction = -1;
		}

		let elapsedTime = ((new Date()).getTime() - lastCalcTime)*1.0/1000.0;

		enemy.x = enemy.x + (enemy.direction*enemy.xv*elapsedTime/speedFactor);

		if (Math.random()>.995) {
			launch(enemy, -1, true, .5);
		}
	}
}

function dotDistance(dot1, dot2) {
  return Math.sqrt( Math.pow(dot1.x-dot2.x,2)+Math.pow(dot1.y-dot2.y,2) )
}

function drawEnemies(enemies) {
	for (let i=0; i<enemies.length; i++){
		enemy = enemies[i];
		if (!enemy) {
			continue;
		}
		if (enemy.hit) {
			delete enemies[i]
		}
    	drawSprite(enemy);
	}
}

let enemyImageList = [
	"img/ogre.png",
	"img/goblin.png"
];

function getEnemy(imageIndex, x, y, xv, direction, radius, parent) {
	imageIndex = (imageIndex == undefined) ? Math.floor(Math.random()*2) : imageIndex;

	isParent = (parent == undefined) ? true : false;
	isParent = (imageIndex == 0) ? false : isParent;

	return {
		x: x || Math.random()*width,
		y: y || height/15+(Math.random()*height/3),
		xv: xv || 5+Math.random()*5,
		v: 0,
		radius: radius || height/20 + Math.random()*50,
		direction: direction || 1,
		hit: false,
		img: enemyImageList[imageIndex],
		imageIndex: imageIndex,
		parent: isParent,
        rocketImage: "img/fireball.png",
	};
}

function addEnemy() {
	enemies.push(getEnemy());
}
