let player;
let clicked, mouse;
let keys = [];
let scene;
let buttons = [];
let scl;

let storyText;

let playerImg, playerImg2, flames;

let spawnPoints = [];
let obstacleTypes = [];
let obstacles = [];
let previousPoint;

let bursts = [];

let chair, flowers, laptop;
let fr, interval, counter, obstacleAmmount;
let score;

function preload() {
	playerImg = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/player.png");
	playerImg2 = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/player2.png");
	flames = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/flames.png");
	chair = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/chair.png");
	flowers = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/flowers.png");
	//laptop = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/laptop.png");
}

function setup() {
	createCanvas(800, 800);

	scl = 50;
	player = new Player(300, 600, scl, 5);

	storyText = "You leave your house to take a walk in the park, but when you come back it's on fire!\nYou vaguely recall leaving the iron on... You focus on the task at hand,\nbut before you can reach for your phone to dial 911, the flames swallow it up!\nYou start running away, but the front door is blocked. You run out a different way,\ntrying to avoid all the objects in your house as the flames trail behind you!";

	/* Buttons */
	// x, y, w, h, size, label, next
	buttons.push(new Button(width/2, height/2, 200, 100, 50, "PLAY", "game"));
	buttons.push(new Button(width/2, height/2 + height/6, 200, 100, 50, "HELP", "help"));
	buttons.push(new Button(width/2, height/2 + height/3, 200, 100, 50, "STORY", "story"));
	buttons.push(new Button(width/2, height - height/6, 150, 50, 40, "BACK", "menu"));

	/* Obstacle Types */
	// img, w, h, speed, damage
	obstacleTypes.push([chair, scl, 5, 5]);
	obstacleTypes.push([flowers, scl, 5, 10]);
	//obstacleTypes.push([laptop, scl, 5, 2]);

	/* Obstacles */
	previousPoint = 1000;

	for (let i = 0; i < width; i += scl) {
		spawnPoints.push(i);
	}

	fr = 60;
	interval = 0.5;
	counter = 0;
	obstacleAmmount = 5;

	obstacles.push(new Obstacle(flowers, 100, -100, scl, 5, 10)); // img, x, y, w, h, speed, damage

	score = 0;

	scene = "menu";

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
		let possiblePoints = spawnPoints;
		let previousIndex = previousPoint/scl;
		possiblePoints.splice((previousIndex > 0 ? previousPoint - 1 : 0), (previousIndex == 13 ? 2 : (previousIndex == 14 ? 1 : 3)));
		let x = random(possiblePoints);
		obstacles.push(new Obstacle(o[0], x, random(-400, (o[2] * -1)), o[1], o[2], o[3], o[4]));
		previousPoint = x;
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

function gameOver() {
	background(235);
}

function game() {
	background(235);

	fill(51, 10, 4);
	noStroke();
	textSize(30);
	textAlign(LEFT, CENTER);
	text("Health: " + player.health, 25, 50);
	text("Score: " + score, 25, 100);
	textAlign(CENTER, CENTER);

	for (let i = obstacles.length - 1; i >= 0; i --) {
		let o = obstacles[i];

		o.draw();
		o.update();

		if (player.collide(o)) {
			player.health -= o.damage;
			bursts.push(new Burst(o.x + o.s/2, o.y + o.s/2, color(222, 133, 49), color(179, 41, 0)));
			obstacles.splice(i, 1);
		}

		if (o.y > height + 20) {
			score ++;
			obstacles.splice(i, 1);
		}
	}

	player.draw();
	player.update();

	for (let i = bursts.length - 1; i >= 0; i --) {
		let b = bursts[i];
		b.draw();

		if (b.particles.length == 0) {
			bursts.splice(i, 0);
		}
	}

	if (frameCount % (fr * interval) === 0) {
		spawnObstacles(1);
	}

	if (counter >= 1000) {
		interval = 0.3;
	}
	if (counter >= 2000) {
		interval = 0.1;
	}

	if (player.health <= 0) {
		//scene = "game over";
	}

	counter ++;
}

function draw() {
	mouse = ARROW;

	switch (scene) {
		case "menu":
			menu();
			break;
		case "story":
			story();
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
