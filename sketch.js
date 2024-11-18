let bg;
let starFill;
const breather = {
  t: 0, // Time variable for breathing
  speed: 0.03, // Breathing speed
  rangeIR: [40, 60], // Inner radius range
  rangeOR: [80, 120], // Outer radius range

  // Function to get the current inner radius
  getIR() {
    const [min, max] = this.rangeIR;
    return min + (max - min) / 2 + ((max - min) / 2) * sin(this.t);
  },

  // Function to get the current outer radius
  getOR() {
    const [min, max] = this.rangeOR;
    return min + (max - min) / 2 + ((max - min) / 2) * cos(this.t);
  },

  // Update time
  update() {
    this.t += this.speed;
  }
};

function setup() {
  createCanvas(400, 400);
  changeBGColor();
  starFill = randomColor();
  fill(starFill);
  noStroke();
}

function draw() {
  background(bg);

  // Update breathing effect
  breather.update();

  // Task 2: Use the breather object for fluctuating inner and outer radii
  let ir = breather.getIR();
  let or = breather.getOR();

  // Task 1: Parameterize drawStar function for dynamic inner/outer radii and sides
  drawStar(width / 2, height / 2, ir, or, 7);
}

// Task 1: Parameterized drawStar function
function drawStar(mx, my, ir, or, numberOfSides) {
  let numberOfPoints = numberOfSides * 2;
  let dt = TWO_PI / numberOfPoints;

  beginShape();
  for (let i = 0; i < numberOfPoints; i++) {
    let r = (i % 2 === 0) ? ir : or;
    let angle = dt * i;
    vertex(mx + r * cos(angle), my + r * sin(angle));
  }
  endShape(CLOSE);
}

function randomColor(avenues = true) {
  if (avenues) {
    return color(randomAvenuesColor());
  } else {
    return color(random(255), random(255), random(255));
  }
}

function changeBGColor(avenues = true) {
  bg = randomColor(avenues);
}

function keyPressed() {
  if (key === 'b') {
    changeBGColor();
  }
}

// Hex Codes for the Official Avenues Colors
const colors = {
  white: "#ffffff",
  black: "#000000",
  ash: "#B7B09C",
  ochre: "#D3AE6F",
  indigo: "#3D68B2",
  moss: "#267355",
  pristineBlue: "#44C3D4",
  violet: "#9796C9",
  nimbus: "#CAC3BC",
  pistachio: "#C5D982",
  olive: "#8A916A",
  terracotta: "#C17E60",
  gold: "#F5CD64",
  clay: "#C3411E",
  grass: "#0D9A48",
  navy: "#273879"
};

function randomAvenuesColor() {
  return random(Object.values(colors));
}
