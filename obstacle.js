function Obstacle(img, x, y, w, h, speed, damage) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.speed = speed;
	this.damage = damage;
}

Obstacle.prototype.update = function() {
	this.y += this.speed;
};

Obstacle.prototype.draw = function() {
	image(this.img, this.x, this.y);
};
