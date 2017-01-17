/* things to add:
 * - betting mechanism
 * - statistics for oddsmaking
 * - simulate initial number of races so that statistical data exists
 * - switching between betting and racing modes
 * - 
 *
 */




var canvas;
var runners;
var raceOver;
var raceMessages;

function Runner(pos, id){
    this.y = pos;
    this.x = 0;
    this.id = id
    this.speed = Math.random() + 0.01;
    this.fail = Math.random() * 2 / 1000;
    this.failed = false;
    this.red = Math.floor(Math.random() * 255);
    this.blue = Math.floor(Math.random() * 255);
    this.green = Math.floor(Math.random() * 255);
}

Runner.prototype.draw = function(){
    push();
    fill(this.red, this.blue, this.green);
    rect(this.x, this.y, 40, 40);
    pop();
}

Runner.prototype.update = function(){
    if (! this.failed){
        this.x += this.speed;
    } else {
        return;
    }
    if (Math.random() < this.fail){
        this.failed = true;
        raceMessages.push(`Bad luck for ${this.id}`);
    }
}

Runner.prototype.reset = function(){
    this.x = 0;
}

function setup(){
    canvas = createCanvas(800, 800);
    runners = [];
    raceMessages = [];
    for (var i = 0; i < 10; i++){
        runners.push(new Runner(i * 40 + 5, i));
    }
    raceOver = false;
}

function draw(){
    var winner = undefined;
    clear();
    var allFailed = true;
    push();
    fill(255, 0, 0);
    line(0, 0, 0, height);
    line(540, 0, 540, height);
    for (var i = 0; i < raceMessages.length; i++){
        text(raceMessages[i], 600, i * 20);
    }
    if (! raceOver) {
        for (var i = 0; i < runners.length; i++){
            if (runners[i].x > 500){
                raceOver = true;
                winner = runners[i];
            }
            runners[i].draw();
            runners[i].update();
            if (! runners[i].failed) {
                allFailed = false;
            }
        }
    }
    if (allFailed) {
        // select winner based on who got the furthest
        winner = runners[0];
        for (var i = 0; i < runners.length; i++){
            if (runners[i].x > winner.x){
                winner = runners[i];
            }
            runners[i].draw();
        }
    } else if (raceOver){
        for (var i = 0; i < runners.length; i++){
            runners[i].draw();
        }
    }
    if (winner != undefined){
        push();
        fill(winner.red, winner.blue, winner.green);
        text("Winner is " + winner.id, width/2, 600);
        pop();
    }
}
