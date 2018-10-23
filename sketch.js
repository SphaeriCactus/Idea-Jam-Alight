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
	chair = loadImage("assets/chair.png");
}

function setup() {
	createCanvas(800, 800);

	player = new Player(300, 600, 3);

	/* Buttons */
	buttons.push(new Button(width/2, height/2, 200, 100, 60, "PLAY", "game"));

	/* Obstacle Types */
	obstacleTypes.push([chair, random(width - 50), random(0, height-50), 5]);

	/* Obstacles */
	for (let i = 0; i < 10; i ++) {
		let oType = random(obstacleTypes);
		obstacles.push(new Obstacle(oType[0], oType[1], oType[2], oType[3]));
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

	for (let i = 0; i < obstacles.length; i ++) {
		let o = obstacles[i];

		o.draw();
		o.update();
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
