function Burst(pos, vel, c1, c2, s1, s2, fadeSpeed) {
	this.pos = pos;
	this.vel = vel;
	this.c1 = c1;
	this.c2 = c2;
	this.s1 = s1;
	this.s2 = s2;

	this.particles = [];

	this.fadeSpeed = fadeSpeed;

	for (let i = 1; i <= 20; i ++) {
		let s = floor(random(s1, s2));
		let c = lerpColor(c1, c2, random(0.1, 0.9));
		this.particles.push(new Particle(this.pos, this.vel, c, s, this.fadeSpeed));
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
