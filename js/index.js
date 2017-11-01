var myGamePiece;

function startGame() {
    myGamePiece = new component(15, 15, "black", 190, 190); //this creates the snake
    myObstacle  = new component(12, 12, "green", 300, 120); //this creates some food
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);   //not sure what this does
    }
};

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        document.getElementById("xSpeed").innerHTML = this.speedX; //these are here just for debugging purpuses
        document.getElementById("ySpeed").innerHTML = this.speedY; //these are here just for debugging purpuses
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);

        //first the crash condition is set to true then its changed to false
        //if its not colliding to anyhting then the crash value is chanaged to false
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

}

function updateGameArea() {

    //if the snake collides with the food then the foods pos i chnaged
    if (myGamePiece.crashWith(myObstacle)) {
        myObstacle.x = setRandPos();
        myObstacle.y = setRandPos();
    }

    myGameArea.clear();
    myObstacle.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function moveup() {
    if (checkValidMove(myGamePiece.speedY, -1)) { //checks if you can go faster
        myGamePiece.speedX = 0;
        myGamePiece.speedY -= 1;
    }
}

function movedown() {
    if (checkValidMove(myGamePiece.speedY, 1)) {
        myGamePiece.speedX =0; //this is done to disable the opposite axis movement so that you cant move diagonally
        myGamePiece.speedY += 1;
    }
}

function moveleft() {
    if (checkValidMove(myGamePiece.speedX, -1)) {
        myGamePiece.speedY =0;
        myGamePiece.speedX -= 1;
    }
}

function moveright() {
    if (checkValidMove(myGamePiece.speedX, 1)) {
        myGamePiece.speedY =0;
        myGamePiece.speedX += 1;
    }
}
function uniKeyCode(event) {
    var key = event.keyCode;
    switch (key) {
        case 38:
            moveup();
            break;
        case 40:
            movedown();
            break;
        case 37:
            moveleft();
            break;
        case 39:
            moveright();
            break;
        default:
            console.log("invalid")
    }
}

function checkValidMove(currSpeed, n) { //this runs a check to see if we are allowed to go that fast

    var x = currSpeed + n;
    var maxSpeed = 1;       //sets the max speed for the game

    return (x >= -maxSpeed && x <= maxSpeed && x != 0);

}


function setRandPos() {
    //this is used so that you dont get a position outside the canvas
    var maxNumber = myGameArea.canvas.width - myGamePiece.width;

    return Math.floor(Math.random() * maxNumber);
}