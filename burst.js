function Burst(x, y, colour1, colour2) {
	this.pos = createVector(x, y);
	this.colour1 = colour1;
	this.colour2 = colour2;

	this.particles = [];

	this.fadeSpeed = 0.02;

	for (let i = -18; i <= 18; i ++) {
		//let v = createVector(-1, -1);
		let a = degrees(asin((i * 10 / 360) * PI/180));
		let v = createVector(sin(a)/5, cos(a)/5);
		let s = floor(random(3, 10));
		let c = lerpColor(colour1, colour2, random(0.1, 0.9));
		this.particles.push(new Particle(this.pos, v, c, s, this.fadeSpeed));
	}
}

Burst.prototype.draw = function() {
	for (let i = this.particles.length - 1; i >= 0; i --) {
		let p = this.particles[i];
		p.draw();
		p.update();

		if (p.fade <= 0) {
			this.particles.splice(i, 1);
		}
	}
};
