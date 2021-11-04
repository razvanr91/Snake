let snakeSize = 10;

let direction = "right";

let snakeStartX = 50;
let snakeStartY = 250;
let scale = 10;

let xSnake = [];
let ySnake = [];

let xFruit = 0;
let yFruit = 0;

function setup() {
  let canvas = createCanvas(500,500);
  canvas.position(width / 2 + 250, 150);
  background(0);
  stroke(255)
  strokeWeight(10);
  moveFood();

  for(let i = 0; i < snakeSize; i++) {
    xSnake.push(snakeStartX + i * scale);
    ySnake.push(snakeStartY);
  }
}

function draw() {
  for(let i = 0; i < snakeSize - 1; i++) {
    line(xSnake[i], ySnake[i], xSnake[i + 1], ySnake[i + 1]);
  }
  eatFood();
}

function eatFood() {
  line(xFruit, yFruit, xFruit, yFruit);
  if(xSnake[xSnake.length - 1] === xFruit && ySnake[ySnake.length - 1] === yFruit) {
    xSnake.unshift(xSnake[0]);
    ySnake.unshift(ySnake[0]);
    snakeSize++;
    moveFood();
  }
}

function moveFood() {
  xFruit = floor(random(499));
  yFruit = floor(random(499));
}