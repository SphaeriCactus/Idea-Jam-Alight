function Burst(x, y, colour1, colour2) {
	this.pos = createVector(x, y);
	this.colour1 = colour1;
	this.colour2 = colour2;

	this.particles = [];

	this.fadeSpeed = 1;

	for (let i = 1; i <= 36; i ++) {
		let v = createVector(this.pos.x - 5, this.pos.y + 5);
		let s = random(0.1, 0.9);
		let c = lerpColor(colour1, colour2, floor(random(3, 10)));
		this.particles.push(new Particle(this.pos, v, c, s, this.fadeSpeed));
	}
}

Burst.prototype.draw = function() {
	for (let i = this.particles.length - 1; i >= 0; i --) {
		let p = this.particles[i];
		p.draw();
		p.update();

		if (p.fade <= 0) {
			this.particles.splice(i, 0);
		}
	}
};
