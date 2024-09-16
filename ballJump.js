const ball = document.getElementById('ball');
const obstacle = document.getElementById('obstacle');
let jumping = false;
let gameInterval;

function jump() {
    if (jumping) return;
    jumping = true;
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallInterval);
                    jumping = false;
                } else {
                    jumpHeight -= 5;
                    ball.style.bottom = jumpHeight + 'px';
                }
            }, 20);
        } else {
            jumpHeight += 5;
            ball.style.bottom = jumpHeight + 'px';
        }
    }, 20);
}

function startGame() {
    obstacle.style.right = '-20px';
    gameInterval = setInterval(() => {
        const ballRect = ball.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            ballRect.left < obstacleRect.left + obstacleRect.width &&
            ballRect.left + ballRect.width > obstacleRect.left &&
            ballRect.top < obstacleRect.top + obstacleRect.height &&
            ballRect.height + ballRect.top > obstacleRect.top
        ) {
            alert('Game Over!');
            clearInterval(gameInterval);
            location.reload();
        }

        let obstacleRight = parseInt(obstacle.style.right);
        obstacleRight += 5;
        obstacle.style.right = obstacleRight + 'px';

        if (obstacleRight > 600) {
            obstacle.style.right = '-20px';
        }
    }, 20);
}

document.body.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

startGame();