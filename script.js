const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const html = document.documentElement;
const snowBallRadius = 10;
const colorSnow = '#0f0';
let $width = (canvas.width = html.scrollWidth);
let $height = (canvas.height = html.scrollHeight);
let snowBallsArray = [];
let columns = Math.floor($width / snowBallRadius);

const times = length => Array.from({ length }, (_, i) => i);
const resizeCanvas = () => {
  $width = canvas.width = html.scrollWidth;
  $height = canvas.height = html.scrollHeight;
  columns = Math.floor($width / snowBallRadius);
  fillSnowBallsArray();
};
const randomVelocityX = () => Math.floor(Math.random() * 5) - 2;
const randomVelocityY = () => Math.floor(Math.random() * 5) + 2;
const randomY = () => Math.floor(Math.random() * $height) - 100;
const randomX = () => Math.floor(Math.random() * $width) + 100;
const snowflakeYesOrNot = () => Math.floor(Math.random() * 102);

const fillSnowBallsArray = () => {
  snowBallsArray = times(columns).map(col => ({
    x: col * snowBallRadius + 8,
    y: randomY(),
    velocityY: randomVelocityY(),
    velocityX: randomVelocityX(),
    snowOpacity: (Math.random() * 1.3 + 0.5).toFixed(2)
  }));
};

const drawSnowBalls = () => {
  ctx.clearRect(0, 0, $width, $height);

  snowBallsArray.forEach(snow => {
    ctx.beginPath();
    ctx.fillStyle = colorSnow;

    if (snow.y > $height) {
      snow.y = -10;
      snow.velocityY = randomVelocityY();
    } else {
      snow.y += snow.velocityY;
    }

    if (snow.x > $width) {
      snow.y = -10;
      snow.velocityX = randomVelocityX();
    } else {
      snow.x += snow.velocityX;
    }

    if (snow.x > $width || snow.x < 0) {
      snow.x = randomX();
      snow.y = -10;
      snow.velocityX = randomVelocityX();
    } else {
      snow.x += snow.velocityX;
    }

    ctx.arc(snow.x, snow.y, snowBallRadius / 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.closePath();
  });

  requestAnimationFrame(drawSnowBalls);
};

document.addEventListener('DOMContentLoaded', () => {
  fillSnowBallsArray();
  drawSnowBalls();
  window.addEventListener('resize', resizeCanvas);
});
