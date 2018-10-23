function Player(x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;

	this.canJump = true;
	this.jumping = false;
}

Player.prototype.ableToJump = function() {
	this.canJump = true;
};

Player.prototype.update = function() {
	if (keys[LEFT_ARROW]) {
		this.x -= this.speed;
	} else if (keys[RIGHT_ARROW]) {
		this.x += this.speed;
	}

	if (keys[32] && this.canJump) {
		console.log("jump");
		this.canJump = false;
		setTimeout(this.ableToJump(), 1000);
	}
};

Player.prototype.collide = function() {

};

Player.prototype.draw = function() {
	//image(playerImg, this.x, this.y, 75, 75);
	fill(0);
	noStroke();
	rect(this.x, this.y, 75, 75);
};
