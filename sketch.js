let snakeLength = 5;
let direction = 'right';
let snakeStartX = 200;
let snakeStartY = 250;

let snakeX = [];
let snakeY = [];

let fruitX = 0;
let fruitY = 0;
let score = 0;

function setup() {
    let canvas = createCanvas(500, 500);
    frameRate(15)
    background(0);
    canvas.center();
    canvas.position(windowWidth / 2 - 250, 150)
    stroke(255);
    strokeWeight(10)
    moveFood();
    for (let i = 0; i < snakeLength; i++) {
        snakeX.push(snakeStartX + i * 10);
        snakeY.push(snakeStartY);
    }
}

function draw() {
    for (let i = 0; i < snakeLength - 1; i++) {
        line(snakeX[i], snakeY[i], snakeX[i + 1], snakeY[i + 1]);
    }
    moveSnake();
    generateFood();
}

function generateFood() {
    point(fruitX, fruitY);
    if (snakeX[snakeX.length - 1] === fruitX && snakeY(snakeY.length - 1) === fruitY) {
        ++score;
        snakeX.unshift(snakeX[0]);
        snakeY.unshift(snakeY[0]);
        snakeLength++;
        moveFood();
    }

}

function moveFood() {
    fruitX = random(499);
    fruitY = random(499);
}

function moveSnake() {
    for(let i = 0; i < snakeLength - 1; i ++) {
        snakeX[i] = snakeX[i + 1];
        snakeY[i] = snakeY[i + 1];
    }

    switch(direction) {
        case 'up':
            snakeX[snakeLength - 1] = snakeX[snakeLength - 2];
            snakeY[snakeLength - 1] = snakeY[snakeLength - 2] - 10;
            break;
        case 'right':
            snakeX[snakeLength - 1] = snakeX[snakeLength - 2] + 10;
            snakeY[snakeLength - 1] = snakeY[snakeLength - 2];
            break;
        case 'down':
            snakeX[snakeLength - 1] = snakeX[snakeLength - 2];
            snakeY[snakeLength - 1] = snakeY[snakeLength - 2] + 10;
            break;
        case 'left':
            snakeX[snakeLength - 1] = snakeX[snakeLength - 2] - 10;
            snakeY[snakeLength - 1] = snakeY[snakeLength - 2];
    }
}

function keyPressed() {
    switch (keyCode) {
      case 38:
        if (direction !== 'down') {
          direction = 'up';
        }
        break;
      case 39:
        if (direction !== 'left') {
          direction = 'right';
        }
        break;
      case 40:
        if (direction !== 'up') {
          direction = 'down';
        }
        break;
      case 37:
        if (direction !== 'right') {
          direction = 'left';
        }
        break;
    }
  }