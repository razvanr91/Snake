let gameBoard = document.getElementById('gameBoard');

let directionCoordonates = {x: 0, y: 0};
let direction = '';

let food = {x: generateCoordonates(), y: generateCoordonates()};

let lastRenderTime = 0;
const snakeSpeed = 10;

let snakePieces = [{x: 10, y: 11}];

function playGame(currentTime) {
    window.requestAnimationFrame(playGame)
    let timeSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if(timeSinceLastRender < 1 / snakeSpeed) return;

    lastRenderTime = currentTime;
    moveSnake();
    draw();
}


function growSnake() {
    if(eatFood()) {
        moveFood();
        snakePieces.push({...food});
    }
}

function eatFood() {
    return snakePieces.some(piece => {
        return piece.x === food.x && piece.y === food.y;
    })
}

function moveSnake() {
    growSnake();
    getDirection();
    if(snakePieces[0].x === 0 || snakePieces[0].x === 22 || snakePieces[0].y === 0 || snakePieces[0].y === 22) {
        console.log("You lose!");
        return;
    }
    for(let i = snakePieces.length - 2; i >= 0; i--) {
        snakePieces[i+1] = { ...snakePieces[i] };
    }

    snakePieces[0].x += directionCoordonates.x;
    snakePieces[0].y += directionCoordonates.y;
}

function moveFood() {
    food = {x: generateCoordonates(), y: generateCoordonates()};
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake();
    drawFood();
}

function drawFood() {
    let foodPiece = document.createElement('div');
    foodPiece.style.gridRowStart = food.x;
    foodPiece.style.gridColumnStart = food.y;
    foodPiece.classList.add('food');
    gameBoard.appendChild(foodPiece);
}

function drawSnake() {
    snakePieces.forEach(piece => {
        let part = document.createElement('div');
        part.style.gridRowStart = piece.x;
        part.style.gridColumnStart = piece.y;
        part.classList.add('snake');
        gameBoard.appendChild(part);
    })
}

function getDirection() {
    window.addEventListener('keydown', e => {
        switch(e.key) {
            case 'ArrowUp':
                if(direction === 'down') break;
                direction = "up";
                directionCoordonates = {x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if(direction === 'left') break;
                direction = "right";
                directionCoordonates = {x: 0, y: 1};
                break;
            case 'ArrowDown':
                if(direction === 'up') break;
                direction = "down";
                directionCoordonates = {x: 1, y: 0};
                break;
            case 'ArrowLeft':
                if(direction === 'right') break;
                direction = "left";
                directionCoordonates = {x: 0, y: -1};
                break;
        }
    })
}

function generateCoordonates() {
    return Math.floor(Math.random() * 21 + 1);
}

window.requestAnimationFrame(playGame);