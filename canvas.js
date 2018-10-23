let canvas = document.querySelector("canvas");
let btnX = document.querySelector(".x");
let btnY = document.querySelector(".y");
let inputCircles = document.querySelector("#circles");
let color1 = document.querySelector("#color1");
let color2 = document.querySelector("#color2");
let color3 = document.querySelector("#color3");

// this basically specifies that the variable references the previously selected canvas AS as a canvas, rather than just an HTML node. the argument 2d
// tells us which methods are open to the canvas.
let c = canvas.getContext("2d");

btnX.addEventListener("click", clear);
btnY.addEventListener("click", userCircles);

canvas.width = 0.6 * window.innerWidth;
canvas.height = 0.6 * window.innerHeight;

// array to hold individual circle objects
let circleArray = [];
// this variable will be used to let us stop requesting animation frames
let animating = false;
// holds user selectable color values
let colors = [
  "black",
  "blue",
  "teal",
  "red",
  "yellow",
  "green",
  "navy",
  "white",
  "gray",
  "orange"
];
let colorSelects = [color1, color2, color3];
let userColors = []; // to hold user-selected color choices

function init() {
  populateSelects();
}
function populateSelects() {
  let templateStart = "<option>";
  let templateEnd = "</option>\n";
  let tempColors = [];

  for (let index = 0; index < colors.length; index++) {
    tempColors[index] = templateStart + colors[index] + templateEnd;
  }

  colorSelects.forEach(item => (item.innerHTML = tempColors));
}

function clear() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  animating = false;
  circleArray = [];
}
function userCircles() {
  let fillColor = "";
  if (inputCircles.value <= 0 || inputCircles.value > 100) {
    alert("Please enter a positive value up to 100");
  } else {
    circleArray = [];
    animating = true;
    for (let index = 0; index < Math.floor(inputCircles.value); index++) {
      let radius = Math.random() * 30;

      let x = Math.random() * (canvas.width - radius * 2) + radius;
      let dx = (Math.random() - 0.5) * 7; // this variable represents velocity. minus 0.5 will determine if the result is negative (up) or positive (down)

      let y = Math.random() * (canvas.height - radius * 2) + radius;
      let yx = (Math.random() - 0.5) * 7;

      // set fill color based on user selections
      let thirds = Math.floor(inputCircles.value) / 3;
      if (index < thirds) {
        fillColor = color1.value;
      } else if (index > thirds * 2) {
        fillColor = color3.value;
      } else {
        fillColor = color2.value;
      }

      // generate
      circleArray[index] = new Circle(x, y, dx, yx, radius, "green", fillColor);
    }
    animate();
  }
}

function Circle(x, y, dx, yx, radius, color, fill) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.yx = yx;
  this.radius = radius;
  this.color = color;
  this.fill = fill;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.fillStyle = this.fill;
    c.stroke();
    c.fill();
  };

  this.update = function() {
    // reverse directions at screen edges
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.yx = -this.yx;
    }

    this.x += this.dx;
    this.y += this.yx;

    this.draw();
  };
}

function animate() {
  if (animating) {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    circleArray.forEach(item => item.update());
  }
}

init();
