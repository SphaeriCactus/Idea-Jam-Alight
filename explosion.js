function Explosion(pos, c1, c2, s1, s2, fadeSpeed) {
	this.bursts = [];

	for (let i = -1; i <= 1; i ++) {
		for (let j = -1; j <= 1; j ++) {
			let v = createVector(i, j);
			this.bursts.push(new Burst(pos, v, c1, c2, s1, s2, fadeSpeed));
		}
	}
}

Explosion.prototype.draw = function() {
	for (let i = this.bursts.length - 1; i >= 0; i --) {
		let b = this.bursts[i];
		b.draw();
		b.update();

		if (b.particles.length === 0) {
			this.bursts.splice(i, 1);
		}
	}
};
