function Button(x, y, w, h, size, label, next) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.size = size;
	this.label = label;
	this.next = next;
}

Button.prototype.draw = function () {
	/* Button */
	rectMode(CENTER);
	strokeWeight(5);
	stroke(222, 133, 49);
	fill(239, 172, 65);
	rect(this.x, this.y, this.w, this.h, 8);
	rectMode(CORNER);

	/* Text */
	strokeWeight(this.size/12);
	stroke(51, 10, 4);
	strokeJoin(ROUND);
	fill(108, 19, 5);
	textSize(this.size);;
	text(this.label, this.x, this.y);
	strokeJoin(MITER);
};

Button.prototype.update = function () {
	if (mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2) {
		mouse = HAND;

		if (clicked) {
			scene = this.next;
		}
	}
};
