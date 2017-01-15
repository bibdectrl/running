var canvas;
var runners;

function Runner(pos){
    this.y = pos;
    this.x = 0;
    this.speed = Math.random();
    this.fail = Math.random() * 2 / 1000;
    this.failed = false;
    this.red = Math.floor(Math.random() * 255);
    this.blue = Math.floor(Math.random() * 255);
    this.green = Math.floor(Math.random() * 255);
}

Runner.prototype.draw = function(){
    fill(this.red, this.blue, this.green);
    rect(this.x, this.y, 40, 40);
}

Runner.prototype.update = function(){
    if (! this.failed){
        this.x += this.speed;
    }
    if (Math.random() < fail){
        this.failed = true;
    }
}

Runner.prototype.reset = function(){
    this.x = 0;
}

function setup(){
    canvas = createCanvas(800, 800);
    runners = [];
    for (var i = 0; i < 10; i++){
        runners.push(new Runner(i * 40 + 5));
    }
}

function draw(){
    clear();
    allFailed = true;
    Array.forEach(runners, function(runner){
        runner.draw();
        runner.update();
        if (! runner.failed) {
            allFailed = false;
        }
    });
    if (allFailed) {
        // select winner based on who got the furthest
    }
}
