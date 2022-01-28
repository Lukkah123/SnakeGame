let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');

class SnakeBody{
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;
let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;
let snakeBodyParts = [];
let tailLength = 1;

let foodX = 5;
let foodY = 5;

//variables to move the snake around
let xMomentum = 0;
let yMomentum = 0;

let score = 0;

//looping the game depending on the speed variable
function updateGame() {
  clearScreen();
  changeSnakePosition();
  checkFoodCollision();
  getFood();
  getSnake();
  getScore();
  setTimeout(updateGame, 1000 / speed);
}

function getScore() {
  ctx.fillStyle = 'white';
  ctx.font = '10px Arial';
  ctx.fillText("Score: " + score,10, 390);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getSnake() {
  ctx.fillStyle = 'green';
  //tilesize is a little bit smaller just to have a small gap
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

  ctx.fillStyle = 'green';
  for (let i = 0; i < snakeBodyParts.length; i++){
    let part = snakeBodyParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  //put a part in the end of the list
  snakeBodyParts.push(new SnakeBody(headX, headY));
  while (snakeBodyParts.length > tailLength) {
    //remove if we have more than the tailsize
    snakeBodyParts.shift();
  }
}

function changeSnakePosition() {
  //changing the headX and headY position for example if headX is 4 and the xMomentum is -1, the new position is 3
  // 4 + -1 = 3
  headX = headX + xMomentum;
  headY = headY + yMomentum;
}

function getFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

function checkFoodCollision() {
  if (foodX === headX && foodY === headY) {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    //increment the tail
    tailLength++;

  }
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


