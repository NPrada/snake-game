var pixelSize = 20;      //size of the squares in pixels
var canvasSize = 600;    //size of the canvas in pixels needs to be a multiple of the pixel size
var frameRate = 100; //how much time between frames
var highScore = 0;

var gameState = "beforeStart";//
var tailLength = 0;
var startingPos = [300, 480]; // x, y
var headPos = [];
headPos[0] = startingPos;
var tailPiece = [];
var move = [[0, 0]];

var gameArea = {
    canvas: document.getElementById("gameCanvas"),
    start: function () {
        this.canvas.width = canvasSize;
        this.canvas.height = canvasSize;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(run, frameRate); //this sets how often the game area is updated
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);   //this removes the interval so that it does not refresh so often
    }
};

function mainMenu() {
    ctx = gameArea.context;
    ctx.font = "30px Arial";
    ctx.strokeText("Welcome to Snake", 170, 50);
    ctx.strokeText("Press the any of the arrow keys to start", 35, 300);
}

function gameOver() {
    gameState = "gameOver";

    tailLength = 0;
    startingPos = [300, 480]; // x, y
    headPos = [];
    headPos[0] = startingPos;
    tailPiece = [];
    move = [[0, 0]];
    gameArea.stop();

    ctx = gameArea.context;
    ctx.font = "30px Arial";
    ctx.strokeText("Game Over", 170, 50);
    ctx.strokeText("Press the any of the arrow keys to start", 35, 300);
}

function startGame() {

    snake = new Snake("black", startingPos[0], startingPos[1]); //this creates the snake
    food = new Food("green", 180, 120); //this creates some food

    gameArea.start();
}

function run() { //the order in which these things are place is quite important
    console.log(gameState); //log in the console the game state
    gameArea.clear();
    if (gameState === "beforeStart") {
        mainMenu()
    }
    else if (gameState === "gameOver") {
        gameOver()
    }
    //if the snake collides with the food then the foods pos i changes and a tailpiece is spawned
    if (snake.eat(food)) {
        food.newFood()
    }

    food.update(); //refreshes the positon of food
    checkMove(); //checks if the move its about to do is valid
    snake.newPos();

    for (var i = 0; i < tailPiece.length; i++) {
        tailPiece[i].newPos(i);
        tailPiece[i].update()
    }

    snake.update();
    checkCollision(); //this must be kept after the snake.newPos()
}

//basically there is always the current move stored in here, once a new one is entered then it is compared to see
//if it is trying to go the opposite way than the current direction. If it is then the last move that is entered is
//dicarded, otherwise the new move is added to the snake speed and then the first item of the array is removed
//so that the new one is then set
function checkMove() {
    if (move.length > 1) { //this is just for error checking in the code

        if (move[0][0] * move[1][0] === -1 || move[0][1] * move[1][1] === -1) {
            //invalid move
            move.pop() //then the last move is removed
        } else {
            snake.speedX = move[1][0];
            snake.speedY = move[1][1];
            move.shift();
        }
    }
}

function checkCollision() {
    if (snake.x + snake.speedX > canvasSize || snake.x < 0 || snake.y < 0 || snake.y + snake.speedY > canvasSize) {
        gameState = "game Over";
        if (tailLength > highScore) {
            highScore = tailLength
        }
        gameOver();
    }
    for (var i = 0; i < tailPiece.length; i++) {
        if (snake.x === tailPiece[i].x && snake.y === tailPiece[i].y) {
            gameState = "game Over";
            if (tailLength > highScore) {
                highScore = tailLength
            }
            gameOver();
        }
    }
}

function moveup() {
    move.push([0, -1]);
}

function movedown() {
    move.push([0, 1]);
}

function moveleft() {
    move.push([-1, 0]);
}

function moveright() {
    move.push([1, 0]);
}

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event; //this is used for older browser compatibility
    if (gameState === "gameOver") {
        startGame()
    }
    gameState = "running";
    if (e.keyCode === 38) {
        moveup()
    }
    else if (e.keyCode === 40) {
        movedown()
    }
    else if (e.keyCode === 37) {
        moveleft()
    }
    else if (e.keyCode === 39) {
        moveright()
    }
}

//this is used to stop the screen from scrolling up and down when the arrow keys are pressed
window.addEventListener("keydown", function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);





