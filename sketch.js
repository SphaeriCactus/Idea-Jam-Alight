let player;
let clicked, mouse;
let keys = [];
let scene;
let buttons = [];
let scl;

let storyText, helpText;

let playerImg, playerImg2, flames;

let spawnPoints = [];
let obstacleTypes = [];
let obstacles = [];
let clouds = [];
let previousPoint;

let chair, flowers, laptop, dust, longFlames;
let flameX, flameSpeed, dissappearSpeed, appearSpeed;
let fr, interval, counter, obstacleAmmount;
let score;

function preload() {
	playerImg = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/player.png");
	playerImg2 = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/player2.png");
	flames = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/flames.png"); // 100 px long, 30 px tall
	dust = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/dust.png");

	chair = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/chair.png");
	flowers = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/flowers.png");
	laptop = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/laptop.png");
}

function setup() {
	createCanvas(800, 800);

	scl = 50;
	player = new Player(300, 600, scl, 5);

	flameX = 0;
	flameSpeed = 0.3;
	dissappearSpeed = 30;
	appearSpeed = 70;

	storyText = "You leave your house to take a walk in the park, but when you come back it's on fire!\nYou vaguely recall leaving the iron on... You focus on the task at hand,\nbut before you can reach for your phone to dial 911, the flames swallow it up!\nYou start running away, but the front door is blocked. You run out a different way,\ntrying to avoid all the objects in your house as the flames trail behind you!";
	helpText = "Use the left and right arrow keys or A and D to move left and right.\nPress the up arrow or W to jump."

	/* Buttons */
	// x, y, w, h, size, label, next
	buttons.push(new Button(width/2, height/2 + height/20, 200, 100, 50, "PLAY", "game"));
	buttons.push(new Button(width/4, height/2 + height/4, 200, 100, 50, "HELP", "help"));
	buttons.push(new Button(width/2 + width/4, height/2 + height/4, 200, 100, 50, "STORY", "story"));
	buttons.push(new Button(width/2, height - height/6, 150, 50, 40, "BACK", "menu"));

	/* Obstacle Types */
	// img, [x], [y], s, speed, damage
	obstacleTypes.push([chair, scl, 5, 5]);
	obstacleTypes.push([flowers, scl, 5, 10]);
	obstacleTypes.push([laptop, scl, 5, 2]);

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
	obstacles.push(new Obstacle(o[0], 100, -100, o[1], o[2], o[3])); // img, [x], [y], s, speed, damage

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
		obstacles.push(new Obstacle(o[0], x, -scl, o[1], o[2], o[3])); // img, [x], [y], s, speed, damage
		previousPoint = x;
	}
}

function updateTypes(i, ammountToAdd) {
	for (let o = 0; o < obstacleTypes.length; o ++) {
		o[i] = o[i] + ammountToAdd;
	}
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

	image(longFlames, 0, height/4 + height/10);

	for (let i = 0; i < 3; i ++) {
		buttons[i].draw();
		buttons[i].update();
	}
}

function story() {
	background(235);

	strokeWeight(7);
	stroke(51, 10, 4);
	strokeJoin(ROUND);
	fill(108, 19, 5);
	textSize(80);
	text("STORY", width/2, height/4);

	stroke(108, 19, 5);
	fill(179, 41, 0);
	textSize(70);
	text("RUN!!!", width/2, height - height/3);
	strokeJoin(MITER);

	textSize(20);
	noStroke();
	fill(51, 10, 4);
	text(storyText, width/2, height/2);

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
	text("HELP", width/2, height/4);
	strokeJoin(MITER);

	textSize(20);
	noStroke();
	fill(51, 10, 4);
	text(helpText, width/2, height/2);

	buttons[3].draw();
	buttons[3].update();
}

function gameOver() {
	background(235);
}

function game() {
	background(235);

	fill(51, 10, 4);
	noStroke();
	textSize(30);
	textAlign(LEFT, CENTER);
	text("Health: ", 25, 50);
	text("Score: " + score, 25, 100);
	textAlign(CENTER, CENTER);

	strokeWeight(5);
	stroke(0);
	noFill();
	rect(125, 30, 100, 30);

	for (let i = obstacles.length - 1; i >= 0; i --) {
		let o = obstacles[i];

		o.draw();
		o.update();

		if (player.collide(o)) {
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
		interval = 0.25;
	}
	if (counter >= 2000) {
		speed = 7;
		updateTypes(2, 2); // index, ammountToAdd
	}
	if (counter >= 3000) {
		updateTypes(3, 5); // index, ammountToAdd
	}

	if (player.health <= 0) {
		//scene = "game over";
	}

	for (let i = clouds.length - 1; i >= 0; i --) {
		tint(255, clouds[i][0]);
		image(dust, clouds[i][1], clouds[i][2]);
		tint(255, 255);

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

	cursor(mouse);
	clicked = false;
}
