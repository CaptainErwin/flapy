const canvas = document.getElementById("flappy");
const ctx = canvas.getContext("2d");

const bird = new Image();
const bg = new Image();
const pipe = new Image();

bird.src = "assets/bird.png";
bg.src = "assets/bg.png";
pipe.src = "assets/pipe.png";

let gap = 85;
let constant = pipe.height + gap;

let bX = 10;
let bY = 150;

let gravity = 1.5;
let score = 0;

document.addEventListener("keydown", () => bY -= 25);

let pipes = [];
pipes[0] = { x: canvas.width, y: 0 };

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipes.length; i++) {
    constant = pipe.height + gap;
    ctx.drawImage(pipe, pipes[i].x, pipes[i].y);
    ctx.drawImage(pipe, pipes[i].x, pipes[i].y + constant);

    pipes[i].x--;

    if (pipes[i].x == 125) {
      pipes.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipe.height) - pipe.height
      });
    }

    // collision
    if (
      bX + bird.width >= pipes[i].x &&
      bX <= pipes[i].x + pipe.width &&
      (bY <= pipes[i].y + pipe.height || bY + bird.height >= pipes[i].y + constant)
    ) {
      location.reload();
    }

    if (pipes[i].x == 5) score++;
  }

  ctx.drawImage(bird, bX, bY);
  bY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score: " + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}

draw();
