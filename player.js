function Player(x, y, w, h, speed) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.speed = speed;

	this.canJump = true;
	this.jumping = false;

	this.health = 100;
}

Player.prototype.ableToJump = function() {
	this.canJump = true;
};

Player.prototype.update = function() {
	if (keys[LEFT_ARROW] && this.x >= this.speed) {
		this.x -= this.speed;
	} else if (keys[RIGHT_ARROW] && this.x <= (width - this.w - this.speed)) {
		this.x += this.speed;
	}

	if ((keys[32] || keys[UP_ARROW]) && this.canJump) {
		console.log("jump");
		this.jumping = true;
		this.canJump = false;
		setTimeout(this.ableToJump(), 1000);
	}
};

Player.prototype.collide = function(obj) {
	if (!(this.y > obj.y + obj.h || obj.y > this.y + this.h)) {
		if (!(this.x > obj.x + obj.w || obj.x > this.x + this.w)) {
			if (!this.jumping) {
				return true;
			}
		}
	}

	return false;
};

Player.prototype.draw = function() {
	//image(playerImg, this.x, this.y, 75, 75);
	fill(0);
	noStroke();
	rect(this.x, this.y, this.w, this.h);
};
