const player = document.getElementById("player");
const gameContainer = document.getElementById("gameContainer");
const scoreDisplay = document.getElementById("score");

let playerX = gameContainer.clientWidth / 2 - player.clientWidth / 2;
let playerY = gameContainer.clientHeight - player.clientHeight;
let score = 0;
let gameInterval;
let obstacleInterval;
let playerSpeed = 5;
let obstacleSpeed = 5;

// Управление движением игрока
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && playerX > 0) {
    playerX -= playerSpeed;
  } else if (
    event.key === "ArrowRight" &&
    playerX < gameContainer.clientWidth - player.clientWidth
  ) {
    playerX += playerSpeed;
  }
  player.style.left = `${playerX}px`;
});

// Функция создания препятствий
function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.style.width = `${Math.random() * 40 + 20}px`; // Размер препятствия
  obstacle.style.height = "20px";
  obstacle.style.backgroundColor = "#00ff00";
  obstacle.style.position = "absolute";
  obstacle.style.top = "0";
  obstacle.style.left = `${Math.random() * (gameContainer.clientWidth - 40)}px`;
  gameContainer.appendChild(obstacle);

  // Движение препятствия
  const moveObstacle = setInterval(() => {
    let obstacleTop = parseInt(obstacle.style.top);
    obstacleTop += obstacleSpeed;

    if (obstacleTop > gameContainer.clientHeight) {
      clearInterval(moveObstacle);
      gameContainer.removeChild(obstacle);
      score++;
      scoreDisplay.innerText = `Очки: ${score}`;
    }

    obstacle.style.top = `${obstacleTop}px`;

    // Проверка на столкновение с игроком
    if (
      obstacleTop + 20 >= playerY && // Нижняя часть препятствия
      parseInt(obstacle.style.left) + obstacle.offsetWidth >= playerX &&
      parseInt(obstacle.style.left) <= playerX + player.clientWidth
    ) {
      clearInterval(moveObstacle);
      gameOver();
    }
  }, 1000 / 60); // 60 FPS
}

// Функция окончания игры
function gameOver() {
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);
  alert("Игра окончена! Ваши очки: " + score);
  score = 0;
  scoreDisplay.innerText = "Очки: 0";
  playerX = gameContainer.clientWidth / 2 - player.clientWidth / 2;
  player.style.left = `${playerX}px`;
  startGame();
}

// Функция старта игры
function startGame() {
  gameInterval = setInterval(() => {
    createObstacle();
  }, 1500); // Новое препятствие каждую 1.5 секунды

  obstacleInterval = setInterval(() => {
    // Создание новых препятствий
    createObstacle();
  }, 1500);
}

startGame();
