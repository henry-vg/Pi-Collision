let blockLeft,
  blockRight,
  counter = 0;
const steps = 1000000,
  digits = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);

  blockLeft = new blockObject(createVector(100, height / 2), 0 / steps, 1, 20);

  blockRight = new blockObject(createVector(blockLeft.pos.x + blockLeft.size + 10, height / 2), -1 / steps, pow(100, digits) * blockLeft.mass, 100);
}

function draw() {
  background(0);

  stroke(255, 100);
  strokeWeight(2);
  line(0, height / 2, width, height / 2);

  for (let i = 0; i < steps; i++) {
    if (blockLeft.collider()) {
      counter += 1;
      const leftNewV = (((blockLeft.mass - blockRight.mass) / (blockLeft.mass + blockRight.mass)) * blockLeft.vel) + ((2 * blockRight.mass) / (blockLeft.mass + blockRight.mass) * blockRight.vel),
        rightNewV = ((2 * blockLeft.mass) / (blockLeft.mass + blockRight.mass)) * blockLeft.vel + ((blockRight.mass - blockLeft.mass) / (blockLeft.mass + blockRight.mass)) * blockRight.vel;

      blockLeft.vel = leftNewV;
      blockRight.vel = rightNewV;
    }
    if (blockLeft.pos.x < 0) {
      counter += 1;
      blockLeft.vel *= -1;
    }
    blockLeft.update();
    blockRight.update();
  }

  noStroke();
  fill(255);
  textSize(20);
  text(counter, 0, textAscent());
  blockLeft.show();
  blockRight.show();
}

class blockObject {
  constructor(pos, vel, mass, size) {
    const sizeLimit = 80;
    this.pos = pos;
    this.vel = vel;
    this.mass = mass;
    this.size = size;
  }
  update() {
    this.pos.x += this.vel;
  }
  collider() {
    return blockRight.pos.x <= blockLeft.pos.x + blockLeft.size;
  }
  show() {
    noStroke();
    fill(255);
    rect(this.pos.x, this.pos.y - this.size, this.size);
  }
}