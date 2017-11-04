function Snake(color, x, y) {
    this.width = pixelSize;
    this.height = pixelSize;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    this.update = function () {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = function () { //used to translate the current speed to the actual position
        this.x += this.speedX * pixelSize; //this is so that the snake moves by 20pixels at a time
        this.y += this.speedY * pixelSize;
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
        console.log(this.x +" " + this.y);
        function setRandPos() {
            //this is used so that you dont get a position outside the canvas
            var maxNumber = canvasSize - pixelSize;
            var random = Math.floor((Math.random() * maxNumber));


            return Math.floor(random/pixelSize)*pixelSize;
        }

        // function setJelloShots(num){
        //     var cols = floor(width / pixel_size);
        //     var rows = floor(height / pixel_size);
        //     for(var i=0;i<num;i++){
        //         var location = createVector(floor(random(cols)), floor(random(rows))).mult(pixel_size);
        //         while(snake_intersect(location)){
        //             location = createVector(floor(random(cols)), floor(random(rows))).mult(pixel_size);
        //         }
        //         shots.push(location);
        //     }
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