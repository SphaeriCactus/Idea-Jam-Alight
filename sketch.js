let player;
let clicked, mouse;
let keys = [];
let scene;
let buttons = [];
let scl;

let storyText, helpText;

let opacity, opacityIncrement;

let playerImg, flames;
let jump, hit, soundOption, soundOn, soundOff;

let spawnPoints = [];
let obstacleTypes = [];
let obstacles = [];
let clouds = [];
let previousPoint;

let dust, longFlames, level, ground;
let bed, drawers, fridge, microwave, stove, table, tree, tv, laptop, flowers, chair, wardrobe, lamp;
let flameX, flameX2, flameSpeed, dissappearSpeed, appearSpeed;
let fr, interval, counter, obstacleAmmount;
let score, levels;

function preload() {
	playerImg = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/player.png");
	ground = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/ground.png");
	flames = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/flames.png"); // 100 px long, 30 px tall
	dust = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/cloud.png");
	level = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/lightning.png");

	chair = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/chair.png");
	flowers = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/flowers.png");
	laptop = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/laptop.png");
	bed = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/bed.png");
	drawers = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/drawers.png");
	fridge = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/fridge.png");
	microwave = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/microwave.png");
	stove = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/stove.png");
	table = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/table.png");
	tree = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/tree.png");
	tv = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/tv.png");
	wardrobe = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/wardrobe.png");
	lamp = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/lamp.png");

	jump = loadSound("https://sphaericactus.github.io/Idea-Jam-Alight/assets/jump.mp3");
	hit = loadSound("https://sphaericactus.github.io/Idea-Jam-Alight/assets/hit.mp3");
	soundOn = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/soundon.png");
	soundOff = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/soundoff.png");
}

function setup() {
	createCanvas(800, 800);

	scl = 50;
	player = new Player(300, 600, scl, 5);

	opacity = 0;
	opacityIncrement = 10;

	soundOption = true;

	flameX = 0;
	flameX2 = width;
	flameSpeed = 0.3;
	dissappearSpeed = 30;
	appearSpeed = 70;

	levels = 1;

	storyText = "You leave your house to take a walk in the park, but when you come\nback it's on fire! You vaguely recall leaving the iron on...\nYou focus on the task at hand, but before you can reach for your\nphone to dial 911, the flames swallow it up! You start running\naway, but the front door is blocked. You run out a different way,\ntrying to avoid all the objects in your house as the\nflames trail behind you!";
	helpText = "Use the left and right arrow keys or A and D to move left and right.\nPress the up arrow or W to jump."

	/* Buttons */
	// x, y, w, h, size, label, next
	buttons.push(new Button(width/2, height/2 + height/20, 200, 100, 50, "PLAY", "game"));
	buttons.push(new Button(width/4, height/2 + height/4, 200, 100, 50, "HELP", "help"));
	buttons.push(new Button(width/2 + width/4, height/2 + height/4, 200, 100, 50, "STORY", "story"));
	buttons.push(new Button(width/2, height - height/10, 150, 50, 40, "BACK", "menu"));

	/* Obstacle Types */
	// img, [x], [y], [s], speed, damage
	obstacleTypes.push([chair, 5, 2]);
	obstacleTypes.push([flowers, 5, 5]);
	obstacleTypes.push([laptop, 5, 1]);
	obstacleTypes.push([bed, 5, 10]);
	obstacleTypes.push([drawers, 5, 6]);
	obstacleTypes.push([fridge, 5, 10]);
	obstacleTypes.push([microwave, 5, 5]);
	obstacleTypes.push([stove, 5, 9]);
	obstacleTypes.push([table, 5, 7]);
	obstacleTypes.push([tree, 5, 5]);
	obstacleTypes.push([tv, 5, 8]);
	obstacleTypes.push([wardrobe, 5, 7]);
	obstacleTypes.push([lamp, 5, 2]);

	/* Obstacles */
	previousPoint = 1000;

	for (let i = 0; i < width; i += scl) {
		spawnPoints.push(i);
	}

	fr = 60;
	interval = 0.5;
	counter = 0;
	obstacleAmmount = 5;

	let o = random(obstacleTypes);
	obstacles.push(new Obstacle(o[0], 100, -100, scl, o[1], o[2])); // img, [x], [y], s, speed, damage

	score = 0;

	scene = "menu";

	background(0, 0, 0, 0);

	for (let x = 0; x < width; x += 100) {
		image(flames, x, 0);
	}

	longFlames = get(0, 0, width, 30);

	angleMode(DEGREES);
	textAlign(CENTER, CENTER);
}

/* Input */
function mouseClicked() {
	clicked = true;
}
function keyPressed() {
	keys[keyCode] = true;
}
function keyReleased() {
	keys[keyCode] = false;
}

/* Functions */
function spawnObstacles(ammount) {
	for (let i = 1; i <= ammount; i ++) {
		let o = random(obstacleTypes);
		let previousIndex = spawnPoints.indexOf(previousPoint);
		let possiblePoints = spawnPoints.slice();
		possiblePoints.splice(previousIndex, 1);
		let x = random(possiblePoints);
		obstacles.push(new Obstacle(o[0], x, -scl, scl, o[1], o[2])); // img, [x], [y], [s], speed, damage
		previousPoint = x;
	}
}

function updateTypes(i, ammountToAdd) {
	for (let o = 0; o < obstacleTypes.length; o ++) {
		obstacleTypes[o][i] = obstacleTypes[o][i] + ammountToAdd;
	}
}

function keySymbol(letter, x, y, s) {
	stroke(0);
	strokeWeight(2);
	fill(23);
	rect(x, y, s, s, 10);

	fill(255);
	noStroke();
	textSize(s/2);
	text(letter, x + s/2, y + s/2);
}

function overlay() {
	fill(255, 255, 255, opacity);
	noStroke();
	rect(0, 0, width, height);
}

/* Scenes */
function menu() {
	background(235);

	strokeJoin(ROUND);

	strokeWeight(20);
	stroke(108, 19, 5);
	fill(179, 41, 0);
	textSize(200);
	text("ALIGHT", width/2, height/4);

	strokeWeight(10);
	stroke(222, 133, 49);
	fill(239, 172, 65);
	textSize(192);
	text("ALIGHT", width/2, height/4);

	strokeJoin(MITER);

	image(longFlames, flameX, height/4 + height/10);
	image(longFlames, flameX - width, height/4 + height/10);

	flameX += flameSpeed;

	if (flameX > width) {
		flameX = 0;
	}

	image(longFlames, flameX2, height - 30);
	image(longFlames, flameX2 - width, height - 30);

	flameX2 -= flameSpeed;

	if (flameX2 < 0) {
		flameX2 = width;
	}

	/* Buttons */
	for (let i = 0; i < 3; i ++) {
		buttons[i].draw();
		buttons[i].update();
	}

	imageMode(CENTER);
	image((soundOption ? soundOn : soundOff), width/2, height/2 + height/4);
	imageMode(CORNER);
}

function story() {
	background(235);

	strokeWeight(7);
	stroke(51, 10, 4);
	strokeJoin(ROUND);
	fill(108, 19, 5);
	textSize(80);
	text("STORY", width/2, height/6);

	stroke(108, 19, 5);
	fill(179, 41, 0);
	textSize(70);
	text("RUN!!!", width/2, height - height/3);
	strokeJoin(MITER);

	textSize(25);
	noStroke();
	fill(51, 10, 4);
	text(storyText, width/2, height/2 - height/15);

	image(longFlames, flameX2, height - 30);
	image(longFlames, flameX2 - width, height - 30);

	flameX2 -= flameSpeed;

	if (flameX2 < 0) {
		flameX2 = width;
	}

	buttons[3].draw();
	buttons[3].update();
}

function help() {
	background(235);

	strokeWeight(7);
	stroke(51, 10, 4);
	strokeJoin(ROUND);
	fill(108, 19, 5);
	textSize(80);
	text("HELP", width/2, height/6);
	strokeJoin(MITER);

	keySymbol("◀", 100, 220, 75);
	keySymbol("A", 270, 220, 75);

	keySymbol("▶", 100, 320, 75);
	keySymbol("D", 270, 320, 75);

	keySymbol("▲", 100, 420, 75);
	keySymbol("W", 270, 420, 75);

	noStroke();
	fill(51, 10, 4);
	textSize(40);
	text("OR", 220, 255);
	text("OR", 220, 355);
	text("OR", 220, 455);

	textAlign(LEFT, CENTER);
	text("to move left", 400, 255);
	text("to move right", 400, 355);
	text("to jump", 400, 455);

	text("The          's show how difficult it is.\nThe game gets harder and harder.", 100, 600);
	textAlign(CENTER, CENTER);

	image(level, 200, 530, 60, 60);

	image(longFlames, flameX2, height - 30);
	image(longFlames, flameX2 - width, height - 30);

	flameX2 -= flameSpeed;

	if (flameX2 < 0) {
		flameX2 = width;
	}

	buttons[3].draw();
	buttons[3].update();
}

function gameOver() {
	background(235);

	strokeWeight(7);
	stroke(51, 10, 4);
	strokeJoin(ROUND);
	fill(108, 19, 5);
	textSize(80);
	text("GAME OVER", width/2, height/4);

	fill(179, 41, 0);
	stroke(108, 19, 5);
	text(score, width/2, height/2 + height/3 - height/30);
	strokeJoin(MITER);

	noStroke();
	fill(51, 10, 4);
	textSize(30);
	text("Good job! (although your house still burnt down...)", width/2, height/2 - height/10);
	textSize(35);
	text("You got to a difficulty level of " + levels + ",\nwith a score of " + score + "!", width/2, height/2);

	for (let x = 0; x < levels; x ++) {
		image(level, x * 70 + 60, 500, 60, 60);
	}

	image(longFlames, flameX, height - 30);
	image(longFlames, flameX - width, height - 30);

	flameX += flameSpeed;

	if (flameX > width) {
		flameX = 0;
	}
}

function game() {
	image(ground, 0, 0);

	for (let i = obstacles.length - 1; i >= 0; i --) {
		let o = obstacles[i];

		o.draw();
		o.update();

		if (player.collide(o)) {
			if (soundOption) {
				hit.play();
			}
			player.health -= o.damage;
			clouds.push([1, o.x, o.y, true]);
			obstacles.splice(i, 1);
		}

		if (o.y > height + 20) {
			score ++;
			obstacles.splice(i, 1);
		}
	}

	player.draw();
	player.update();

	if (frameCount % (fr * interval) === 0) {
		spawnObstacles(1);
	}

	if (counter >= 1000) {
		if (levels == 1) {
			interval = 0.25;
		} else if (levels == 2) {
			updateTypes(1, 2); // index, ammountToAdd
		} else if (levels == 3) {
			updateTypes(2, 3); // index, ammountToAdd
		} else if (levels == 4) {
			interval = 0.2;
		} else if (levels == 5) {
			updateTypes(1, 2); // index, ammountToAdd
		} else if (levels == 6) {
			interval = 0.1;
		} else if (levels == 7) {
			updateTypes(2, 2); // index, ammountToAdd
		} else if (levels == 8) {
			interval = 0.5;
		} else if (levels == 9) {
			updateTypes(2, 3); // index, ammountToAdd
		}

		if (levels <= 9) {
			levels ++;
		}
		counter = 0;
	}

	fill(51, 10, 4);
	noStroke();
	textSize(30);
	textAlign(LEFT, CENTER);
	text("Health: ", 25, 50);
	text("Score: " + score, 25, 100);
	textAlign(CENTER, CENTER);

	strokeWeight(3);
	stroke(0);
	noFill();
	rect(125, 35, 150, 30);

	fill(255, 0, 0);
	rect(125, 35, player.health * 1.5, 30);

	for (let x = 0; x < levels; x ++) {
		image(level, x * 30 + 10, 120);
	}

	for (let i = clouds.length - 1; i >= 0; i --) {
		image(dust, clouds[i][1], clouds[i][2], scl, scl);

		if (clouds[i][3]) {
			clouds[i][0] += appearSpeed;
		} else {
			clouds[i][0] -= dissappearSpeed;
		}

		if (clouds[i][0] <= 0) {
			clouds.splice(i, 1);
		} else if (clouds[i][0] >= 255) {
			clouds[i][3] = false;
		}
	}

	image(longFlames, flameX, height - 30);
	image(longFlames, flameX - width, height - 30);

	flameX += flameSpeed;

	if (player.health <= 0) {
		opacity = 255;
		scene = "game over";
	}

	if (flameX > width) {
		flameX = 0;
	}

	counter ++;
}

/* Loop */
function draw() {
	mouse = ARROW;

	switch (scene) {
		case "menu":
			menu();
			break;
		case "story":
			story();
			break;
		case "help":
			help();
			break;
		case "game":
			game();
			break;
		case "game over":
			gameOver();
			break;
	}

	overlay();
	if (opacity > 0) {
		opacity -= opacityIncrement;
	}

	cursor(mouse);
	clicked = false;
}
