function Particle(pos, vel, colour, s, fadeSpeed) {
	this.pos = pos;
	this.vel = vel;

	this.colour = colour;
	this.s = s;

	this.fade = 255;
	this.fadeSpeed = fadeSpeed;
}

Particle.prototype.update = function() {
	this.pos.add(this.vel);
	this.fade -= this.fadeSpeed;
};

Particle.prototype.draw = function() {
	(fill) (this.colour, this.fade);
	//fill(red(this.colour), green(this.colour), blue(this.colour), this.fade);
	//noStroke();
	ellipse(this.pos.x, this.pos.y, this.s, this.s);
};
