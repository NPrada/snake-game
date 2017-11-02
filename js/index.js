var myGamePiece;
var tailSections = [];

var maxSpeed = 15;       //sets the max speed for the game

var headPos = []; //(x,y) sets the starting head positon, it is also used to log the heads position when the head turns
var headSize = 15;  //size of the head
var StartingTailLength = 7;
function startGame() {


    myGamePiece = new component(headSize, headSize, "blue", 190, 190); //this creates the snake

    for (var i=0;i<StartingTailLength; i++){
        tailSections.push(new component(headSize, headSize, "black", myGamePiece.x, myGamePiece.y + headSize *(i+1)));//create first piece of the tail
    }
    myObstacle = new component(12, 12, "green", 190, 120); //this creates some food

    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 150);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
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
    this.newPos = function () { //used to translate the current speed to the actual position
        this.x += this.speedX;
        this.y += this.speedY;
    };
    this.crashWith = function (otherobj) {
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

    //if the snake collides with the food then the foods pos i changes and a tailpiece is spawned
    if (myGamePiece.crashWith(myObstacle)) {
        myObstacle.x = setRandPos();
        myObstacle.y = setRandPos();
        spawnTail();
    }

    myGameArea.clear();
    myObstacle.update();
    myGamePiece.newPos();
    console.log(headPos.length);

    if (headPos.length) { //used so that headPos is not accessed by tailMove() when its empty
        tailMove();//check if the tail needs to move in this gametick
    }

    //this is used to update the position of every tail section
    for (var i = 0; i < tailSections.length; i++) {
        if (typeof tailSections[i] != 'undefined') {
            tailSections[i].newPos();
            tailSections[i].update();
        }
    }

    myGamePiece.update();
}

function moveup() {
    if (checkValidMove(myGamePiece.speedY, -maxSpeed)) { //checks if you can go faster

        if (myGamePiece.speedY == 0 && myGamePiece.speedX ==0){ //this is for the beginning only if the head is still then also make the tail move
            for (var i=0;i<tailSections.length;i++){
                tailSections[i].speedY -= maxSpeed;
            }
        }else { //otherwise log it as a turn
            headPos.push([myGamePiece.x, myGamePiece.y, "up"]);
        }

        myGamePiece.speedX = 0; //this is done to disable the opposite axis movement so that you cant move diagonally
        myGamePiece.speedY -= maxSpeed;
    }
}

function movedown() {
    if (checkValidMove(myGamePiece.speedY, maxSpeed)) {

        headPos.push([myGamePiece.x, myGamePiece.y, "down"]);
        myGamePiece.speedX = 0;
        myGamePiece.speedY += maxSpeed;
    }
}

function moveleft() {
    if (checkValidMove(myGamePiece.speedX, -maxSpeed)) {

        headPos.push([myGamePiece.x, myGamePiece.y, "left"]); //log the heads position in this turn
        myGamePiece.speedY = 0;
        myGamePiece.speedX -= maxSpeed;
    }
}

function moveright() {
    if (checkValidMove(myGamePiece.speedX, maxSpeed)) {

        headPos.push([myGamePiece.x, myGamePiece.y, "right"]);
        myGamePiece.speedY = 0;
        myGamePiece.speedX += maxSpeed;
    }
}

function tailMove() {//used to make the tail move in a direction at the right time
    //console.log(headPos);
    for (var i = 0; i < tailSections.length; i++) {
        for (var k=0;k<headPos.length;k++){
            if (tailSections[i].x == headPos[k][0] && tailSections[i].y == headPos[k][1]) { //of this tail section is in the heads previous turn position do this
                tailDirection(headPos[k][2], i); //[0][2] stores the direction the head turned at those coordinates
                if (i == tailSections.length-1){//this means that thi is the last piece of the tail so we should delete this turn position
                    headPos.shift();        //remove the oldest turn move
                }
            }
        }
    }
}

function tailDirection(direction, sectionNum) { //takes the tail section number

    switch (direction) {
        case "up":
            tailSections[sectionNum].speedX = 0;
            tailSections[sectionNum].speedY -= maxSpeed;
            break;
        case "down":
            tailSections[sectionNum].speedX = 0;
            tailSections[sectionNum].speedY += maxSpeed;
            break;
        case "left":
            tailSections[sectionNum].speedY = 0;
            tailSections[sectionNum].speedX -= maxSpeed;
            break;
        case "right":
            tailSections[sectionNum].speedY = 0;
            tailSections[sectionNum].speedX += maxSpeed;
            break;
        default:
            console.log("invalid movement key")
    }
}

function checkValidMove(currSpeed, n) { //this runs a check to see if we are allowed to go that fast

    var x = currSpeed + n;
    //maxspeed is set at the beginning
    return (x >= -maxSpeed && x <= maxSpeed && x != 0);

}

function setRandPos() {
    //this is used so that you dont get a position outside the canvas
    var maxNumber = myGameArea.canvas.width - myGamePiece.width;

    return Math.floor(Math.random() * maxNumber);
}

function spawnTail() { //this is all done so that the new tail part is spawned at the right spot

    var headSize = myGamePiece.width; //this is to fetch the size of the head in px

    if (myGamePiece.speedX > 0 && myGamePiece.speedX != 0) {
        tailSections.push(new component(headSize, headSize, "black", myGamePiece.x - headSize, myGamePiece.y));
        tailSections[tailSections.length - 1].speedX += maxSpeed;
    }
    if (myGamePiece.speedX < 0 && myGamePiece.speedX != 0) {
        tailSections.push(new component(headSize, headSize, "black", myGamePiece.x + headSize, myGamePiece.y));
        tailSections[tailSections.length - 1].speedX -= maxSpeed;
    }
    if (myGamePiece.speedY > 0 && myGamePiece.speedY != 0) {
        tailSections.push(new component(headSize, headSize, "black", myGamePiece.x, myGamePiece.y - headSize));
        tailSections[tailSections.length - 1].speedY += maxSpeed;
    }
    if (myGamePiece.speedY < 0 && myGamePiece.speedY != 0) {
        tailSections.push(new component(headSize, headSize, "black", myGamePiece.x, myGamePiece.y + headSize));
        tailSections[tailSections.length - 1].speedY -= maxSpeed;
    }
}

function uniKeyCode(event) { //call the right result after the correct key is pressed
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
            console.log("invalid movement key")
    }
}