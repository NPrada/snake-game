function Snake(color, x, y) {
    this.width = pixelSize;
    this.height = pixelSize;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    this.update = function () {
        document.getElementById("score").innerHTML = tailLength;
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = function () { //used to translate the current speed to the actual position
        headPos.push([this.x, this.y]);
        headPos.shift();
        this.x += this.speedX * pixelSize; //this is so that the snake moves by 20pixels at a time
        this.y += this.speedY * pixelSize;
    };
    this.eat = function (otherobj) {
        var food = otherobj;
        if (this.x === food.x && this.y === food.y) { //checks if the heads position matches the foods

            if (tailLength >= headPos.length) { //this is because we want the array to match the length of the tail
                headPos.push([this.x, this.y]);
            }
            tailPiece.push(new Tail(color, headPos[tailLength][0], headPos[tailLength][1]));
            tailLength++;

            return true; //yes the snake did eat the food
        } else {
            return false;
        }
    }
}

function Tail(color, x, y) {
    this.width = pixelSize;
    this.height = pixelSize;
    this.x = x;
    this.y = y;

    this.update = function () {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = function (tailNum) {
        tailPiece[tailNum].x = headPos[tailNum][0];
        tailPiece[tailNum].y = headPos[tailNum][1];
    }
}

function Food(color, x, y) {
    this.width = pixelSize;
    this.height = pixelSize;
    this.x = x;
    this.y = y;

    this.update = function () {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newFood = function () { //used to translate the current speed to the actual position
        this.x = setRandPos(); //this is so that the snake moves by 20pixels at a time
        this.y = setRandPos();

        function setRandPos() {
            //this is used so that you dont get a position outside the canvas
            var maxNumber = canvasSize - pixelSize;
            var random = Math.floor((Math.random() * maxNumber)); //this sets a random number between the allowed range
            return Math.floor(random / pixelSize) * pixelSize;
        }
    };
}