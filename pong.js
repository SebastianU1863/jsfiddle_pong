//The goal of this pong game is for you guys to have fun, but also to learn how to code
//Please play around and tinker with this code as much as you want

// P1 is the left side and P2 is the right side

// ===================================================================== //
// VARIABLES AND SETTINGS
// ===================================================================== //

//The width and height of the screen you play on
const canvasWidth = 500, canvasHeight = 500;

//PLATFORM SETTINGS
//X is the width and Y is the height
let p1PlatformWidth = 10;
let p1PlatformHeight = 125;
let p2PlatformWidth = 10;
let p2PlatformHeight = 125;
//Starting positions for the platforms
//I've soft coded them to be based on the width and height of the screen
let p1PlatformXPos = 0.1 * canvasWidth;
let p1PlatformYPos = canvasHeight / 2 - p1PlatformHeight / 2;
let p2PlatformXPos = 0.9 * canvasWidth;
let p2PlatformYPos = canvasHeight / 2 - p2PlatformHeight / 2;
//Starting Y velocity of the platforms
let p1PlatformYVelocity = 0;
let p2PlatformYVelocity = 0;

//BALL SETTINGS
//starting position for the ball
let ballXPos = canvasWidth / 2;
let ballYPos = canvasHeight / 2;
//ball size
let ballSize = 10;
//keep this a negative value or else the ball won't bounce, it'll just phase through objects
//I wouldn't suggest playing around with this part too much cause it can break the game quite a bit
let bounceVelocity = -1;

//These velocity/speed settings will be taken after the first bounce
let ballXVelocityMultiplier = 2;
let ballYVelocity = 0.1;

//Score that stops the game (It is "First to 3" right now)
let maxScore = 3;


// ===================================================================== //
// FUNCTIONS (play around with these)
// ===================================================================== //
//Runs when ball collides with ceiling
function onBallCollideCeiling() {

}
//Runs when ball collides with floor
function onBallCollideFloor() {

}
//Runs when ball collides with left paddle/wall
function onBallCollideP1() {

}
//Runs when ball collides with right paddle/wall
function onBallCollideP2() {

}

// ===================================================================== //
// CONTROLS (you can try changing your opponent's controls if you want)
// ===================================================================== //

//Controls, k and m are for P2
//w and s are for P1
function onKeyDown(event) {
  switch (event.key) {
    case 'k' || 'K':
      p2PlatformYVelocity = -0.75;
      break;
    case 'm' || 'M':
      p2PlatformYVelocity = 0.75;
      break;
    case 'w' || 'W':
      p1PlatformYVelocity = -0.75;
      break;
    case 's' || 'S':
      p1PlatformYVelocity = 0.75;
      break;
  }
}

//on key up the velocity gets set to 0 so that players can stop in place
//if you change this, it can prevent players from stopping in place
function onKeyUp(event) {
  switch (event.key) {
    case 'k' || 'K':
      p2PlatformYVelocity = 0;
      break;
    case 'm' || 'M':
      p2PlatformYVelocity = 0;
      break;
    case 'w' || 'W':
      p1PlatformYVelocity = 0;
      break;
    case 's' || 'S':
      p1PlatformYVelocity = 0;
      break;
  }
}










// ===================================================================== //
// Don't worry about anything past this point; it's mainly physics stuff
// If you choose to edit the stuff below, you have a high chance of breaking the game
// (Unless you know what you are doing)
// ===================================================================== //

// CANVAS SETUP
//These set up the dimensions for the screen
//If you want to, you can edit the width and height of the screen
let canvas = document.createElement('canvas');
canvas.height = canvasHeight;
canvas.width = canvasWidth;
document.body.appendChild(canvas);
let drawContext = canvas.getContext('2d');
let clear = () => {
  drawContext.fillStyle = '#000000';
  drawContext.fillRect(0, 0, canvasWidth, canvasHeight);
};
//basically: whenever a key is pressed the function onKeyDown is called
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);



//Variables related to score and initial values
let ballRadius = ballSize;
let p1Score = 0;
let p2Score = 0;
let gameOver = false;
let winScreenText = 'P1 Wins';
let pastFirstHit = false;
let hasBallCollided = false;

//If you change this initial ball VelocityX to be anything with a magnitude greater than -1
//It will keep that velocity, and not speed up after the first bounce
let ballVelocityX = 0.1 * (Math.random() > 0.5 ? 1 : -1);
//If you change this ballVelocityY value it could be difficult to get the first hit
let ballVelocityY = 0;

//Physics dt so that the ball is based on system time
let dt = 0;
let lastFrameTime = Date.now();
function calculateDeltatime() {
  dt = Date.now() - lastFrameTime;
  lastFrameTime = Date.now();
}

//Reset function for when a player scores
function startNewRound() {
  ballXPos = canvasWidth / 2;
  ballYPos = canvasHeight / 2;
  ballVelocityX = 0.1 * (Math.random() > 0.5 ? 1 : -1);
  ballVelocityY = 0;
  ballRadius = ballSize;
  pastFirstHit = false;
  if (
    (p1Score >= maxScore || p2Score >= maxScore) &&
    gameOver == false
  ) {
    if (p1Score < p2Score) winScreenText = 'P2 Wins';
    gameOver = true;
  }
}

//Draws the frames
function loop() {
  // Clear the window, so we can draw new stuff without the old stuff staying visible
  clear();

  drawContext.fillStyle = '#FFEE8C'; // YELLOW
  drawContext.font = '150px sans serif';
  drawContext.textAlign = 'center';
  drawContext.fillText(
    p1Score,
    canvasWidth / 4,
    canvasHeight / 2 + 50,
  );
  drawContext.fillText(
    p2Score,
    (canvasWidth * 3) / 4,
    canvasHeight / 2 + 50,
  );

  drawContext.fillStyle = '#ffffff'; // WHITE
  drawContext.fillRect(
    p1PlatformXPos,
    p1PlatformYPos,
    p1PlatformWidth,
    p1PlatformHeight,
  ); // fills in a rectangle
  drawContext.fillRect(
    p2PlatformXPos,
    p2PlatformYPos,
    p2PlatformWidth,
    p2PlatformHeight,
  ); // fills in a rectangle

  drawContext.fillStyle = '#ffffff'; // WHITE
  drawContext.beginPath();
  drawContext.arc(ballXPos, ballYPos, ballRadius, 0, 2 * Math.PI, false);
  drawContext.fill();

  if (gameOver) {
    drawContext.fillStyle = '#ffffff'; // WHITE
    drawContext.fillRect(0, 0, canvasWidth, canvasHeight); // blocks screen
    drawContext.fillStyle = '#000000'; // BLACK
    drawContext.font = '100px roboto';
    drawContext.fillText(winScreenText, canvasWidth / 2, canvasHeight / 2 + 50);
  }

  tick(); // do all physics calculations

  // Call this very function again
  window.requestAnimationFrame((frame) => loop());
}

//Checks if the ball is colliding with the platforms based on distance

function ballCollidesP1Platform() {
  let testX = ballXPos,
    testY = ballYPos; // this will be the closest platform vertex to the ball

  //tracks distances between the ball and platforms to check for collisions
  if (ballXPos < p1PlatformXPos) testX = p1PlatformXPos;
  else if (ballXPos > p1PlatformXPos + p1PlatformWidth)
    testX = p1PlatformXPos + p1PlatformWidth;
  if (ballYPos < p1PlatformYPos) testY = p1PlatformYPos;
  else if (ballYPos > p1PlatformYPos + p1PlatformHeight)
    testY = p1PlatformYPos + p1PlatformHeight;

  // https://www.jeffreythompson.org/collision-detection/circle-rect.php
  // don't be afraid to google something you don't know, but make sure to give credit!

  let distance = (ballXPos - testX) ** 2 + (ballYPos - testY) ** 2;
  return distance <= ballRadius ** 2;
}

function ballCollidesP2Platform() {
  let testX = ballXPos,
    testY = ballYPos; // this will be the closest platform vertex to the ball

  //tracks distances between the ball and platforms to check for collisions
  if (ballXPos < p2PlatformXPos) testX = p2PlatformXPos;
  else if (ballXPos > p2PlatformXPos + p2PlatformWidth)
    testX = p2PlatformXPos + p2PlatformWidth;
  if (ballYPos < p2PlatformYPos) testY = p2PlatformYPos;
  else if (ballYPos > p2PlatformYPos + p2PlatformHeight)
    testY = p2PlatformYPos + p2PlatformHeight;

  // https://www.jeffreythompson.org/collision-detection/circle-rect.php
  // don't be afraid to google something you don't know, but make sure to give credit!

  let distance = (ballXPos - testX) ** 2 + (ballYPos - testY) ** 2;
  return distance <= ballRadius ** 2;
}







function tick() {
  //floor
  if (ballYPos + ballRadius >= canvasHeight) {
    ballVelocityY *= bounceVelocity;
    ballYPos = canvasHeight - ballRadius;
    onBallCollideFloor();
  }
  //ceiling
  if (ballYPos - ballRadius <= 0) {
    ballVelocityY *= bounceVelocity;
    ballYPos = ballRadius;
    onBallCollideCeiling();
  }
  //Hitting side walls
  if (ballXPos - ballRadius <= 0) {
    p2Score += 1;
    startNewRound();
  }
  if (ballXPos + ballRadius >= canvasWidth) {
    p1Score += 1;
    startNewRound();
  }

  p1PlatformYPos += p1PlatformYVelocity * dt;
  if (
    p1PlatformYPos + p1PlatformHeight >= canvasHeight ||
    p1PlatformYPos <= 0
  ) {
    p1PlatformYPos -= p1PlatformYVelocity * dt;
    p1PlatformYVelocity = 0;
  }
  p2PlatformYPos += p2PlatformYVelocity * dt;
  if (
    p2PlatformYPos + p2PlatformHeight >= canvasHeight ||
    p2PlatformYPos <= 0
  ) {
    p2PlatformYPos -= p2PlatformYVelocity * dt;
    p2PlatformYVelocity = 0;
  }

  let isBallCollidingP1 = ballCollidesP1Platform();
  let isBallCollidingP2 = ballCollidesP2Platform();

  if (!hasBallCollided && isBallCollidingP1) {
    if (!pastFirstHit) {
      ballVelocityX *= ballXVelocityMultiplier;
      ballVelocityY = ballYVelocity;
      pastFirstHit = true;
    }
    onBallCollideP1();
    ballVelocityX *= bounceVelocity;
    if (ballYPos > p1PlatformYPos + p1PlatformHeight / 2) {
      ballVelocityY = Math.abs(ballVelocityY);
    } else {
      ballVelocityY = -Math.abs(ballVelocityY);
    }

    hasBallCollided = true;
  } else {
    ballXPos += ballVelocityX * dt;
    ballYPos += ballVelocityY * dt;
  }
  if (!hasBallCollided && isBallCollidingP2) {
    if (!pastFirstHit) {
      ballVelocityX *= ballXVelocityMultiplier;
      ballVelocityY = ballYVelocity;
      pastFirstHit = true;
    }
    onBallCollideP2();
    ballVelocityX *= bounceVelocity;
    if (ballYPos > p2PlatformYPos + p2PlatformHeight / 2) {
      ballVelocityY = Math.abs(ballVelocityY);
    } else {
      ballVelocityY = -Math.abs(ballVelocityY);
    }
    hasBallCollided = true;
  } else {
    ballXPos += ballVelocityX * dt;
    ballYPos += ballVelocityY * dt;
  }

  if (!(isBallCollidingP1 || isBallCollidingP2) && hasBallCollided)
    hasBallCollided = false;

  calculateDeltatime();
}

// Call the loop function, which will then repeatedly call itself
loop();
