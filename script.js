const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth; // canvas size set as entire browser window
canvas.height = window.innerHeight;

let particleArray = [];

// handle mouse coordinates
const mouse = {
	x: null,
	y: null,
	radius: 150, // size of the circular area around the mouse which will react with the particles
};
window.addEventListener("mousemove", function (event) {
	mouse.x = event.x; // extracting x & y to the mouse object so that the coordinates are accessible globally
	mouse.y = event.y;
	// console.log(mouse.x, mouse.y);
});

ctx.fillStyle = "white"; // fill the drawing with selected colour
ctx.font = "30px Verdane";
ctx.fillText("A", 0, 30); // text, x, y, (max pixel in text)
// ctx.strokeStyle = "white";
// ctx.strokeRect(0, 0, 100, 100);
const data = ctx.getImageData(0, 0, 100, 100); // get object representing the underlying pixel data for a specified portion of the canvas

class Particle {
	// runs only once to create a blue print of particle
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = 3; // radius of each particle
		this.baseX = this.x; // hold initial coordinates of the particle
		this.baseY = this.y;
		this.density = Math.random() * 30 + 1; // 1 - 30, determines how heavy the particles are and how fast it moves away from mouse
	}

	// draw particles
	draw() {
		ctx.fillStyle = "red";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // add a circular arc (x, y, radius, startAngle, endAngle)
		ctx.closePath();
		ctx.fill();
	}

	// calculate distance between mouse and particles
	update() {
		let dx = mouse.x - this.x;
		let dy = mouse.y - this.y;
		let distance = Math.sqrt(dx * dx + dy * dy); // hypotenuse　直径三角形の斜辺
		// Math.sqrt calculates returns the square root of a number

		// when mouse is close to particles, particle size will increase
		if (distance < 100) {
			this.size = 10;
		} else {
			this.size = 3;
		}
	}
}

function init() {
	particleArray = [];
	for (let i = 0; i < 1000; i++) {
		let x = Math.random() * canvas.width; // 1 - max width of the canvas
		let y = Math.random() * canvas.height; // 1 - max height of the canvas
		particleArray.push(new Particle(x, y)); // call constructor of its associated class
	}
}

init();
console.log(particleArray);

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < particleArray.length; i++) {
		particleArray[i].draw();
		particleArray[i].update();
	}
	requestAnimationFrame(animate); // it tells browser to call the animate func before repaint and create a loop
}

animate();
