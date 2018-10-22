let canvas = document.querySelector("canvas");
let btnGrid = document.querySelector(".draw");
let btnX = document.querySelector(".x");
let btnY = document.querySelector(".y");
let inputCircles = document.querySelector("#circles");

// this basically specifies that the variable references the previously selected canvas AS as a canvas, rather than just an HTML node. the argument 2d
// tells us which methods are open to the canvas.
let c = canvas.getContext("2d");

btnGrid.addEventListener("click", drawGrid(100, 100, 6, 6, 40));
btnX.addEventListener("click", clear);
btnY.addEventListener("click", userCircles);

canvas.width = 0.6 * window.innerWidth;
canvas.height = 0.6 * window.innerHeight;

// array to hold individual circle objects
let circleArray = [];
// this variable will be used to let us stop requesting animation frames
let animating = false;

function drawGrid(x, y, rows, columns, tileSize) {
  let width = columns * tileSize;
  let height = rows * tileSize; 

  let y2 = y;
  let x2 = x;
  posX = x;
  posY = y;

  c.beginPath();
  // draw a square border
  c.moveTo(x, y);
  posX = x + width;
  c.lineTo(posX, posY);
  posY = y + height;
  c.lineTo(posX, posY);
  posX = x;
  c.lineTo(posX, posY);
  posY = y;
  c.lineTo(posX, posY);
  c.stroke();

  // draw row lines
  posX = x + width;
  for (let i = 0; i < rows; i++) {
    c.moveTo(x, y2);

    c.lineTo(posX, y2);
    c.stroke();
    y2 += tileSize;
  }
  //draw column lines

  posY = y + height;
  for (let i = 0; i < columns; i++) {
    c.moveTo(x2, y);
    c.lineTo(x2, posY);
    c.stroke();
    x2 += tileSize;
  }
}

function clear() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  animating = false;
  circleArray = [];
}
function userCircles() {
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

      circleArray[index] = new Circle(x, y, dx, yx, radius, "green", "black");
    }
    animate();
  }
}

function pattern(x, y, x2, y2, changeBy, times) {
  var x3 = x,
    y3 = y,
    y4 = y2,
    x4 = x2;
  for (var i = 0; i <= times; i++) {
    x3 += changeBy;
    x4 += changeBy;
    y3 += changeBy;
    y4 += changeBy;
    if (i == times) {
      c.fillStyle = "gold";
    }
    c.fillRect(x3, y3, x4, y4);
  }
}

function randomSquares(occurences) {
  for (let i = 0; i <= occurences; i++) {
    x = Math.random() * window.innerWidth;
    y = Math.random() * window.innerHeight;
    times = Math.random() * 30;
    changeBy = Math.random() * 32;
    times = Math.random() * 112;
    pattern(x, y, 50, 50, changeBy, times);
    console.log("hi");
  }
}

//drawGrid(100, 100, 6, 6, 40);

///////////////////////////////////// circle stuff

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
