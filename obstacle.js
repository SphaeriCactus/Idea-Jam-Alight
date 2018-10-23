function Obstacle(img, x, y, speed) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.speed = speed;
}

Obstacle.prototype.update = function() {
	this.y += this.speed;
};

Obstacle.prototype.draw = function() {
	image(this.img, this.x, this.y);
};
