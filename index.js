const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let speed = 7;
let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;

//variables to move the snake around
let xMomentum = 0;
let yMomentum = 0;

//looping the game depending on the speed variable
function updateGame() {
  clearScreen();
  changeSnakePosition();
  getSnake();
  setTimeout(updateGame, 1000 / speed);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getSnake() {
  ctx.fillStyle = 'green';
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  //changing the headX and headY position for example if headX is 4 and the xMomentum is -1
  // 4 + -1 = 3
  headX = headX + xMomentum;
  headY = headY + yMomentum;
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
  //up 
  if (event.key == "ArrowUp") {
    yMomentum = -1;
    xMomentum = 0;
  }

  //down
  if (event.key == "ArrowDown") {
    yMomentum = 1;
    xMomentum = 0;
  }

  //left
  if (event.key == "ArrowLeft") {
    yMomentum = 0;
    xMomentum = -1;
  }

  //right
  if (event.key == "ArrowRight") {
    yMomentum = 0;
    xMomentum = 1;
  }
}

updateGame();


