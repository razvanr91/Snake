let lastRenderTime = 0;
const snakeSpeed = 2;

function playGame(currentTime) {
    window.requestAnimationFrame(playGame)
    let timeSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if(timeSinceLastRender < 1 / snakeSpeed) return;

    lastRenderTime = currentTime;
    console.log(timeSinceLastRender);
}

window.requestAnimationFrame(playGame);