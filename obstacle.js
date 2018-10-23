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
	fill(0);
	noStroke();
	rect(this.x, this.y, 75, 75);
};
