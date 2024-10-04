const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let rocket = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  width: 20,
  height: 30,
};
let enemies = [];
let enemyCounter = 0;
let gameOver = false;
let paused = false;

function drawRocket() {
  ctx.beginPath();
  ctx.rect(
    rocket.x - rocket.width / 2,
    rocket.y - rocket.height / 2,
    rocket.width,
    rocket.height
  );
  ctx.font = "20px Arial";
  ctx.fillText("🚀", rocket.x - 10, rocket.y + 5);
}

function drawEnemies() {
  enemies.forEach((enemy) => {
    ctx.font = "20px Arial";
    ctx.fillText(enemy.emoji, enemy.x, enemy.y);
  });
}

function createEnemy() {
  const emojis = ["🌞", "🌙", "🌟", "🪐"];
  const enemy = {
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    x: Math.random() * (canvas.width - 20),
    y: 0,
    speed: 2,
    height: 20,
  };
  enemies.push(enemy);
}

function updateEnemies() {
  enemies = enemies.filter((enemy) => enemy.y < canvas.height + enemy.height);
  enemies.forEach((enemy) => {
    enemy.y += enemy.speed;
  });
}

function checkCollision() {
  let collision = false;
  for (const enemy of enemies) {
    if (
      rocket.x < enemy.x + 20 &&
      rocket.x + rocket.width > enemy.x &&
      rocket.y < enemy.y + 20 &&
      rocket.y + rocket.height > enemy.y
    ) {
      collision = true;
      // Draw collision emoji at collision point
      ctx.font = "30px Arial";
      ctx.fillText("💥", rocket.x, rocket.y);
      paused = true;
      setTimeout(() => {
        paused = false;
      }, 500);
      break; // Exit loop after finding a collision
    }
  }
  return collision;
}

function resetGame() {
  rocket = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 20,
    height: 30,
  };
  enemies = [];
  enemyCounter = 0;
  gameOver = false;
}

let leftPressed = false;
let rightPressed = false;

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    leftPressed = true;
  } else if (event.key === "ArrowRight") {
    rightPressed = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    leftPressed = false;
  } else if (event.key === "ArrowRight") {
    rightPressed = false;
  }
});

function gameLoop() {
  if (paused) {
    requestAnimationFrame(gameLoop);
    return;
  }
  if (gameOver) {
    resetGame();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRocket();
  if (leftPressed && rocket.x > rocket.width / 2) {
    rocket.x -= 5;
  }
  if (rightPressed && rocket.x < canvas.width - rocket.width / 2) {
    rocket.x += 5;
  }

  enemyCounter++;
  if (enemyCounter % 20 === 0) {
    createEnemy();
  }

  updateEnemies();
  drawEnemies();

  if (checkCollision()) {
    gameOver = true;
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
