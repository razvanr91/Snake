let gameBoard = document.getElementById('gameBoard');
let loseGame = false;

let scoreDisplay = document.getElementById('currentScore');
let highScoreDisplay = document.getElementById('highScore');

let startModalElement = document.getElementById('startModal');
let startModal = new bootstrap.Modal(startModalElement);

let endModalElement = document.getElementById('endModal');
let endModal = new bootstrap.Modal(endModalElement);

let scoreKeeper = 0;
let highScore = 0;

let directionCoordonates = { x: 0, y: 0 };
let direction = '';

let food = { x: generateCoordonates(), y: generateCoordonates() };

let previousTime = 0;
let snakeSpeed = 10;

let snakePieces = [{ x: 10, y: 11 }];

let speedSpan = document.getElementById('selectSpeed');
let snakeSpeedInput = document.getElementById('snakeSpeed');
snakeSpeedInput.addEventListener('change', (e) => {
    changeSpeed();
})

function changeSpeed() {
    let speedNow = snakeSpeedInput.value;
    if (speedNow < 10) {
        speedSpan.classList.value = '';
        speedSpan.classList.add('text-success');
    } else if (speedNow >= 10 && speedNow < 15) {
        speedSpan.classList.value = '';
        speedSpan.classList.add('text-warning');
    } else {
        speedSpan.classList.value = '';
        speedSpan.classList.add('text-danger');
    }
    speedSpan.innerHTML = speedNow;
}

function setHighScore() {
    if ("highScore" in localStorage) {
        highScore = localStorage.getItem("highScore");
    } else {
        highScore = 0;
        localStorage.setItem('highScore', highScore);
    }

    highScoreDisplay.innerHTML = highScore;
}

function playGame(currentTime) {
    window.requestAnimationFrame(playGame)
    let timeSinceLastRender = (currentTime - previousTime) / 1000;
    if (timeSinceLastRender < 1 / snakeSpeed) return;

    previousTime = currentTime;

    setHighScore();
    moveSnake();
    draw();
}


function growSnake() {
    if (eatFood()) {
        moveFood();
        snakePieces.push({ ...food });
        scoreKeeper++;
        scoreDisplay.innerHTML = scoreKeeper;
    }
}

function checkEnd() {
    return snakePieces.some((piece, index) => {
        if (index === 0) return;
        return piece.x === snakePieces[0].x && piece.y === snakePieces[0].y;
    })
}

function eatFood() {
    return snakePieces[0].x === food.x && snakePieces[0].y === food.y
}

function moveSnake() {
    if (!loseGame) {
        growSnake();
        getDirection();
        if (snakePieces[0].x === 0 || snakePieces[0].y === 0 || snakePieces[0].x > 21 || snakePieces[0].y > 21 || (snakePieces.length > 2 && checkEnd())) {
            endGame();
            return;
        }
        for (let i = snakePieces.length - 2; i >= 0; i--) {
            snakePieces[i + 1] = { ...snakePieces[i] };
        }

        snakePieces[0].x += directionCoordonates.x;
        snakePieces[0].y += directionCoordonates.y;
    }
}

function moveFood() {
    let newFoodLocation = { x: generateCoordonates(), y: generateCoordonates() }

    food = newFoodLocation;
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
        switch (e.key) {
            case 'ArrowUp':
                if (direction !== 'down') {
                    direction = "up";
                    directionCoordonates = { x: -1, y: 0 };
                }
                break;
            case 'ArrowRight':
                if (direction !== 'left') {
                    direction = "right";
                    directionCoordonates = { x: 0, y: 1 };
                }
                break;
            case 'ArrowDown':
                if (direction !== 'up') {
                    direction = "down";
                    directionCoordonates = { x: 1, y: 0 };
                }
                break;
            case 'ArrowLeft':
                if (direction !== 'right') {
                    direction = "left";
                    directionCoordonates = { x: 0, y: -1 };
                }
                break;
        }
    })
}

function generateCoordonates() {
    return Math.floor(Math.random() * 21 + 1);
}

function startGame() {
    startModal.hide();
    snakeSpeed = parseInt(document.getElementById('snakeSpeed').value);
    window.requestAnimationFrame(playGame);
}

function playAgain() {
    location.reload();
}

function endGame() {
    loseGame = true;
    if (scoreKeeper > highScore) {
        localStorage.setItem('highScore', scoreKeeper);
        document.getElementById('endGameText').innerHTML = `WOW! You've outdone yourself! The new highscore is ${highScore}`;
    } else {
        document.getElementById('endGameText').innerHTML = 'Better luck next time!';
    }

    endModal.show();
}

function gameSetup() {
    setHighScore();
    speedSpan.innerHTML = 10;
    snakeSpeedInput.value = 10;
    startModal.show()
}

window.onload = (e) => {
    gameSetup();
}