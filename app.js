let gameBoard = document.getElementById('gameBoard');

let directionCoordonates = {x: 0, y: 0};
let direction = '';

let lastRenderTime = 0;
const snakeSpeed = 5;

let snakePieces = [{x: 10, y: 11}];

function playGame(currentTime) {
    window.requestAnimationFrame(playGame)
    let timeSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if(timeSinceLastRender < 1 / snakeSpeed) return;

    lastRenderTime = currentTime;
    console.log(timeSinceLastRender);
    moveSnake();
    draw();
}



function moveSnake() {
    getDirection();
    for(let i = snakePieces.length - 2; i >= 0; i--) {
        snakePieces[i+1] = { ...snakePieces[i] };
    }

    snakePieces[0].x += directionCoordonates.x;
    snakePieces[0].y += directionCoordonates.y;
}

function draw() {
    gameBoard.innerHTML = '';
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
        console.log(e.key);
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

window.requestAnimationFrame(playGame);