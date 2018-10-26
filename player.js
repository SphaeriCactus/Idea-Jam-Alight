function Player(x, y, s, speed) {
	this.x = x;
	this.y = y;
	this.is = s; // Initial size
	this.s = s;
	this.speed = speed;

	this.canJump = true;
	this.jumping = false;
	this.gravity = 0;

	this.health = 100;
}

Player.prototype.ableToJump = function() {
	this.canJump = true;
};

Player.prototype.update = function() {
	if ((keys[LEFT_ARROW] || keys[65]) && this.x - this.s/2 >= this.speed) {
		this.x -= this.speed;
	} else if ((keys[RIGHT_ARROW] || keys[68]) && this.x + this.s/2 <= (width - this.speed)) {
		this.x += this.speed;
	}

	if ((keys[UP_ARROW] || keys[87]) && this.canJump) {
		this.jumping = true;
		this.gravity = 2;
	}

	this.canJump = false;

	if (this.s == this.is) {
		this.canJump = true;
		this.jumping = false;
	}

	this.s += this.gravity;
	this.s = constrain(this.s, this.is, Infinity);
	this.gravity -= 0.1;
	this.gravity = constrain(this.gravity, -1, Infinity);
};

Player.prototype.collide = function(obj) {
	if (!(this.y - this.s/2 > obj.y + obj.h || obj.y > this.y + this.s/2)) {
		if (!(this.x - this.s/2 > obj.x + obj.w || obj.x > this.x + this.s/2)) {
			if (!this.jumping) {
				return true;
			}
		}
	}

	return false;
};

Player.prototype.draw = function() {
	imageMode(CENTER);
	image((this.health > 50 ? playerImg : playerImg2), this.x, this.y, this.s, this.s);
	imageMode(CORNER);
};
