let gameObjects = [];

function setup() {
    createCanvas(800, 800);
    setInterval(spawnUfo, 3000);
}
 
noStroke();


function draw() {
    background (0, 10, 30);
    
    for (let i = gameObjects.length - 1; i >= 0; i--) {
        gameObjects[i].display();
        gameObjects[i].move();

        if (gameObjects[i].x <= -100) {
            gameObjects.splice(i, 1);
        }
    }
}

class Ufo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 50;
        this.moveSpeed = -2;
        this.delay = 800; // Delay of 8 seconds
        this.timer = 0;
    }

    display() {
        fill(200, 0, 0);
        arc(this.x, this.y, 100, 50, PI, PI + PI, PIE);
        fill(0, 200, 255);
        arc(this.x, this.y-20, 60, 60, PI, PI + PI, PIE);
        fill(255, 255, 0);
        ellipse(this.x, this.y-10, 10);
        ellipse(this.x-20, this.y-10, 10);
        ellipse(this.x-35, this.y-10, 10);
        ellipse(this.x+20, this.y-10, 10);
        ellipse(this.x+35, this.y-10, 10);
    }

    move() {
        this.timer++;
        if (this.timer >= this.delay) {
            this.x += this.moveSpeed; // Move the UFO to the left
        }
    } 
}

function spawnUfo() {
    let y = Math.random() * height;
    let newUfo = new Ufo(600, y);
    gameObjects.push(newUfo);
}