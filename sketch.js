let player;
let clicked, mouse;
let keys = [];
let scene;
let buttons = [];

let playerImg;

let obstacleTypes = [];
let obstacles = [];

let chair;
let fr, interval, counter;

function preload() {
	chair = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/chair.png");
}

function setup() {
	createCanvas(800, 800);

	player = new Player(300, 600, 50, 50, 5);

	/* Buttons */
	buttons.push(new Button(width/2, height/2, 200, 100, 60, "PLAY", "game"));

	/* Obstacle Types */
	obstacleTypes.push([chair, 50, 50, 5, 5]); // img, w, h, speed, damage

	/* Obstacles */
	spawnObstacles(5);

	fr = 60;
	interval = 1.5;
	counter = 0;

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
}

function game() {
	background(235);

	player.draw();
	player.update();

	fill(51, 10, 4);
	textSize(30);
	text("Health: " + player.health, 150, 50);

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
		}
	}

	if (frameCount % (fr * interval) === 0) {
		spawnObstacles(5);
	}

	if (counter >= 1000) {
		interval = 1;
	} else if (counter >= 2000) {
		interval = 0.5;
	}

	counter ++;
}

function draw() {
	mouse = ARROW;

	switch (scene) {
		case "menu":
			menu();
			break;
		case "game":
			game();
			break;
	}

	cursor(mouse);
	clicked = false;
}
