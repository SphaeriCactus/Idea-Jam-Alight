let player;
let clicked, mouse;
let keys = [];
let scene;
let buttons = [];

let playerImg;

let obstacleTypes = [];
let obstacles = [];

let chair;
let fr, interval, counter, obstacleAmmount;
let score;

function preload() {
	chair = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/chair.png");
}

function setup() {
	createCanvas(800, 800);

	player = new Player(300, 600, 50, 50, 5);

	/* Buttons */
	buttons.push(new Button(width/2, height/2, 200, 100, 60, "PLAY", "game"));
	buttons.push(new Button(width/2, height/2 + height/4, 200, 100, 50, "STORY", "story"));

	/* Obstacle Types */
	obstacleTypes.push([chair, 50, 50, 5, 5]); // img, w, h, speed, damage

	/* Obstacles */
	spawnObstacles(5);

	fr = 60;
	interval = 1.5;
	counter = 0;
	obstacleAmmount = 5;

	score = 0;

	scene = "menu";

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
		obstacles.push(new Obstacle(o[0], random(width - o[1]), random(-400, (o[2] * -1)), o[1], o[2], o[3], o[4]));
	}
}

/* Scenes */
function menu() {
	background(235);

	buttons[0].draw();
	buttons[0].update();

	buttons[1].draw();
	buttons[1].update();
}

function story() {
	background(235);
}

function gameOver() {
	background(235);
}

function game() {
	background(235);

	player.draw();
	player.update();

	fill(51, 10, 4);
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
			obstacles.splice(i, 1);
		}

		if (o.y > height) {
			obstacles.splice(i, 1);
			score ++;
		}
	}

	if (frameCount % (fr * interval) === 0) {
		spawnObstacles(obstacleAmmount);
	}

	if (counter >= 1000) {
		interval = 1;
		obstacleAmmount = 6;
	}
	if (counter >= 2000) {
		interval = 0.75;
		console.log("Level 3");
	}

	if (player.health <= 0) {
		scene = "game over";
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
