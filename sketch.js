let player;
let clicked, mouse;
let keys = [];
let scene;
let buttons = [];

let playerImg;

let obstacleTypes = [];
let obstacles = [];

let chair;

function preload() {
	chair = loadImage("https://sphaericactus.github.io/Idea-Jam-Alight/assets/chair.png");
}

function setup() {
	createCanvas(800, 800);

	player = new Player(300, 600, 50, 50, 5);

	/* Buttons */
	buttons.push(new Button(width/2, height/2, 200, 100, 60, "PLAY", "game"));

	/* Obstacle Types */
	obstacleTypes.push([chair, random(width - 50), random(-400, -50), 50, 50, 5, 1]); // img, x, y, w, h, speed, damage

	/* Obstacles */
	for (let i = 0; i < 10; i ++) {
		let o = random(obstacleTypes);
		obstacles.push(new Obstacle(o[0], o[1], o[2], o[3], o[4], o[5], o[6]));
	}

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
	}
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
