const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; //ukuran kotak
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box }; //posisi awal ular

let food = {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box,
};

let score = 0;
let direction;

//kontrol ular
document.addEventListener("keydown" , changeDirection);

function changeDirection(event) {
    if (event.keyCode == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode == 38 && direction != "DOWN") {
        direction = "UP";
    } else if (event.keyCode == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode == 40 && direction != "UP") {
        direction = "DOWN";
    }
}

function collision(newHead, snake) {
    for (let i = 0; i < snake.lenght; i++) {
        if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead,snake)) {
        clearInterval(game);
        alert("Game Over! Your Score Was: " + score);
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 5, 20);

}

let game = setInterval(draw, 100);