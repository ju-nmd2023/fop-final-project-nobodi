let gameObjects = [];
let x = 100;
let y = 200;
let spaceshipYSpeed = 0;
const spaceshipYSpeedIncrement = 10;
let lightShots = [];
let score = 0;
let lives = 2;
let level = 1;
let health = 100;

function setup() {
    createCanvas(800, 800);
    setInterval(spawnUfo, 3000);
    createStatScreen(); 
}

function spawnUfo() {
    let y = Math.random() * height;
    let newUfo = new Ufo(600, y);
    newUfo.timer = newUfo.delay;
    gameObjects.push(newUfo);
}

noStroke();

function draw() {
    background (0, 10, 30);
    spaceship();
    // jets();
    healthBar();
    jets();
    moveLightShots();
    displayLightShots();
    
    for (let i = gameObjects.length - 1; i >= 0; i--) {
        if (gameObjects[i] instanceof Ufo) {
            gameObjects[i].display();
            gameObjects[i].move();

            if (gameObjects[i].x <= -100) {
            gameObjects.splice(i, 1);
            } 

            for (let j = lightShots.length - 1; j >= 0; j--) {
                if (dist(gameObjects[i].x, gameObjects[i].y, lightShots[j].x, lightShots[j].y) < 50) {
                    gameObjects.splice(i, 1);
                    lightShots.splice(j, 1);
                    score += 10; // Increase score when UFO is destroyed
                    break; 
                } 
            }      
    }
    y += spaceshipYSpeed;
    y = constrain(y, 75, height - 75);
    
    updateStatScreen(); // Update the stat screen
    
    }
}

class Ufo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 50;
        this.moveSpeed = -5;
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
    } else if (key === ' ') { 
        fireLightShot();
    }
}

function keyReleased() {
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
        spaceshipYSpeed = 0;
    }
}

function fireLightShot() {
    for (let i = 0; i < 5; i++) { 
        let lightShot = {
            x: x + 200, 
            y: y + i * 20 - 40,
            size: 10,
            speed: 10
        };
        lightShots.push(lightShot);
    }
}

function moveLightShots() {
    for (let i = lightShots.length - 1; i >= 0; i--) {
        lightShots[i].x += lightShots[i].speed;
        if (lightShots[i].x > width) {
            lightShots.splice(i, 1);
        }
    }
}

function displayLightShots() {
    fill(255, 255, 0);
    for (let i = 0; i < lightShots.length; i++) {
        ellipse(lightShots[i].x, lightShots[i].y, lightShots[i].size);
    }
}

function healthBar() {
    push();
    fill(0, 255, 0);
    rect(10, 100, 0, 100);
    fill(255, 0, 0);
    let healthBarWidth = map(health, 0, 100, 0, 100);
    rect(10, 10, healthBarWidth, 10);
    pop();
}

function gameOver() {
    console.log('GAME OVER');
} 


function createStatScreen() {
    let statDiv = createDiv('');
    statDiv.id('statDiv');
    statDiv.style('position', 'absolute');
    statDiv.style('top', '20px');
    statDiv.style('left', '20px');
    statDiv.style('color', 'white');
    statDiv.style('font-size', '20px');
}

function updateStatScreen() {
    let statDiv = select('#statDiv');
    statDiv.html(`Score: ${score}<br>Lives: ${lives}<br>Level: ${level}`);
}