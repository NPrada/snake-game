var pixelSize = 20;      //size of the squares in pixels
var canvasSize = 600;    //size of the canvas in pixels

var tailLength = 0;
var startingPos = [180,180];
var headPos =[];
headPos[0] = startingPos;

var frameRate = 100;


function startGame() {

    snake = new Snake( "blue", startingPos[0], startingPos[1]); //this creates the snake
    food = new Food("green", 180, 120); //this creates some food

    gameArea.start();
}

function run() {

    //if the snake collides with the food then the foods pos i changes and a tailpiece is spawned
    if (snake.eat(food)) {
       food.newFood()
    }

    gameArea.clear();
    snake.newPos();
    snake.update();

    food.update();


}
var gameArea = {
    canvas: document.createElement("canvas"),
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
        clearInterval(this.interval);   //not sure what this does
    }
};

function moveup() {
        snake.speedX = 0; //this is done to disable the opposite axis movement so that you cant move diagonally
        snake.speedY = -1;
}

function movedown() {
        snake.speedX = 0;
        snake.speedY = 1;
}

function moveleft() {
        snake.speedY = 0;
        snake.speedX = -1;
}

function moveright() {
        snake.speedY = 0;
        snake.speedX = 1;
}

document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event; //this is used for older browser compatibility
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

