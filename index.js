const canvas = document.querySelector('.game');
let ctx = canvas.getContext('2d');
const latestScore = document.querySelector('.latestScore');
const highScore = document.querySelector('.highScore')
const savedScore = JSON.parse(localStorage.getItem('scoreLocalStorage'));

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

let scoreLocalstorage = {
  lastRoundScore: 0,
  highScore: 0,
};

//looping the game depending on the speed variable
function updateGame() {
  createLocalStorage();

  changeSnakePosition();
 
   let result = isGameOver();
  if (result) {
    return;
  } 

  clearScreen();
  
  checkFoodCollision();
  getFood();
  getSnake();
  getScore();

  if (score > 3) {
    speed = 10;
  }
  if (score > 7) {
    speed = 16;
  }
  setTimeout(updateGame, 1000 / speed);
  

  displayScores();
}

function isGameOver() {
  let gameOver = false;

  if (yMomentum === 0 && xMomentum === 0) {
    return false;
  }

  //if the head hits the walls
  if(headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBodyParts.length; i++){
    let part = snakeBodyParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial"
    ctx.fillText("GAME OVER", canvas.width / 5, canvas.height / 2);
    scoreLocalstorage.lastRoundScore = score;
    scoreLocalstorage.highScore = savedScore.highScore;
    if (scoreLocalstorage.lastRoundScore > scoreLocalstorage.highScore) {
      scoreLocalstorage.highScore = scoreLocalstorage.lastRoundScore;
      localStorage.setItem('scoreLocalStorage', JSON.stringify(scoreLocalstorage));
    }
    localStorage.setItem('scoreLocalStorage', JSON.stringify(scoreLocalstorage));
    document.location.reload();
  }

  return gameOver;
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
    score++;

  }
}

const createLocalStorage = () => {
  if (savedScore === null) {
    localStorage.setItem('scoreLocalStorage', JSON.stringify(scoreLocalstorage));
    document.location.reload();
  }
}

const displayScores = () => {
  latestScore.textContent = `Latest Score: ${savedScore.lastRoundScore}`;
  highScore.textContent = `Highscore: ${savedScore.highScore}`;
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


