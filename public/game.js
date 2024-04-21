let gameObjects = [];
let x = 300;
let y = 200;
let spaceshipYSpeed = 0;
const spaceshipYSpeedIncrement = 5;

function setup() {
    createCanvas(800, 800);
    setInterval(spawnUfo, 8000);
}
 
function draw() {
    background (0, 10, 30);
    spaceship();
    jets();
    
    for (let i = gameObjects.length - 1; i >= 0; i--) {
        gameObjects[i].display();
        gameObjects[i].move();

        if (gameObjects[i].x <= -100) {
            gameObjects.splice(i, 1);
        }
    }
    
    // Update spaceship position
    y += spaceshipYSpeed;
    // Keep the spaceship within the canvas bounds
    y = constrain(y, 75, height - 75);
}

function spawnUfo() {
    let y = Math.random() * height;
    let newUfo = new Ufo(600, y);
    gameObjects.push(newUfo);
}

class Ufo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 50;
        this.moveSpeed = -2;
        this.delay = Math.random() * 3000; // Delay of 3 seconds
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
        if (this.timer >= this.delay) {
            this.x += this.moveSpeed; // Move the UFO to the left
        } else {
            this.timer++;
        }
    }
}

function spaceship() {
    push();
    fill(20, 0, 220);
    quad(x, y-75, x, y+75, x-75, y+50, x-75, y-50);
    quad(x, y-75, x, y+75, x+200, y+25, x+200, y-25);
    rect(x, y-130, 30, 80);
    rect(x, y+50, 30, 80);
    rect(x-75, y-150, 250, 50);
    rect(x-75, y+100, 250, 50);
    fill(0, 200, 255);
    ellipse(x+100, y, 100, 50);
    pop();
}

function jets() {
    // yellow
    push();
    fill(255, 255, 0);
    beginShape();
    vertex(x-80, y+40);
    bezierVertex(x-80, y+40, x-500, y, x-80, y-40);
    endShape();
    beginShape();
    vertex(x-80, y-110);
    bezierVertex(x-80, y-110, x-400, y-125, x-80, y-140);
    endShape();
    beginShape();
    vertex(x-80, y+110);
    bezierVertex(x-80, y+110, x-400, y+125, x-80, y+140);
    endShape();
    pop();
    // orange
    fill(255, 180, 0);
    beginShape();
    vertex(x-80, y+30);
    bezierVertex(x-80, y+30, x-300, y, x-80, y-30);
    endShape();
    beginShape();
    vertex(x-80, y-115);
    bezierVertex(x-80, y-115, x-250, y-125, x-80, y-135);
    endShape();
    beginShape();
    vertex(x-80, y+115);
    bezierVertex(x-80, y+115, x-250, y+125, x-80, y+135);
    endShape();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        spaceshipYSpeed -= spaceshipYSpeedIncrement;
    } else if (keyCode === DOWN_ARROW) {
        spaceshipYSpeed += spaceshipYSpeedIncrement;
    }
}

function keyReleased() {
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
        spaceshipYSpeed = 0;
    }
}
