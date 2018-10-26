function Obstacle(img, x, y, s, speed, damage) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.s = s;
	this.speed = speed;
	this.damage = damage;
}

Obstacle.prototype.update = function() {
	this.y += this.speed;
};

Obstacle.prototype.draw = function() {
	image(this.img, this.x, this.y);
};
