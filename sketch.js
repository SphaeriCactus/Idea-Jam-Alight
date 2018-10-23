let player;
let clicked, mouse;
let keys = [];
let scene;
let buttons = [];

let playerImg;

function preload() {
	//playerImg = loadImage("assets/player.png");
}

function setup() {
	createCanvas(800, 800);

	player = new Player(300, 600, 3);

	/* Buttons */
	buttons.push(new Button(width/2, height/2, 200, 100, 60, "PLAY", "game"));

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

	player.draw();
	player.update();
}

function game() {
	background(235);
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
