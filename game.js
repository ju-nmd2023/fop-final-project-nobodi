/*
 * This code includes contributions from ChatGPT by OpenAI.
 * ChatGPT provided assistance with game logic, class structure, 
 * and handling user interactions.
 * (Date of assistance: August 15, 2024)
 */

let mothership;
let gameObjects = [];
let x = 100;
let y = 200;
let spaceshipYSpeed = 0;
const spaceshipYSpeedIncrement = 10;
let lightShots = [];
let lasers = [];
let score = 0;
let lives = 2;
let level = 1;
let gameOverFlag = false;
let gameStarted = false;
let startButton;
let stars = [];

function setup() {
    createCanvas(1200, 600);
    setInterval(spawnUfo, 3000);
    createStatScreen();
    createStartScreen();
    generateStars(); 
    noStroke();
    mothership = null;
}

class Laser { 
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.speed = -20;
    }

    display() {
        fill(230, 10, 0);
        rect(this.x, this.y, this.size, this.size);
    }

    move() {
        this.x += this.speed;
    }
}

class Mothership {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 100;
        this.verticalSpeed = 6;
        this.timer = 0;
        this.fireRate = 60;
        this.verticalDirection = 1;
    }

    display() {
        fill(200, 0, 0);
        arc(this.x, this.y + 20, this.width, this.height, PI, PI + PI, PIE);
        fill(0, 200, 255);
        arc(this.x, this.y - 20, this.width * 0.2, this.height * 0.4, PI, PI + PI, PIE);
        fill(255, 255, 0);
        ellipse(this.x, this.y, 20);
        ellipse(this.x - 65, this.y, 20);
        ellipse(this.x - 35, this.y, 20);
        ellipse(this.x + 35, this.y, 20);
        ellipse(this.x + 65, this.y, 20);
    }
    
    move() {
        this.timer++;
        if (this.timer % this.fireRate === 0) {
            this.fireLaser();
        }
        this.y += this.verticalSpeed * this.verticalDirection;
        if (this.y <= 100 || this.y >= 600) {
            this.verticalDirection *= -1;
        }
    }

    fireLaser() {
        let laser = new Laser(this.x - 100, this.y);
        lasers.push(laser);
    }
}

// GAME ENGINE
function draw() {
    if (!gameStarted) {
        drawStartScreen();
    } else {
        background(0, 10, 30);
        drawStars();
        spaceship();
        jets();
        moveLightShots();
        displayLightShots();

        if (!gameOverFlag) {
            if (score < 150) {
                for (let i = gameObjects.length - 1; i >= 0; i--) {
                    gameObjects[i].display();
                    gameObjects[i].move();

                    // Collision Spaceship/UFO
                    if (dist(gameObjects[i].x, gameObjects[i].y, x, y) < 200) {
                        gameOver();
                        console.log(x + "," + y);
                    }

                    // Contact Light shot/UFO
                    for (let j = lightShots.length - 1; j >= 0; j--) {
                        if (dist(gameObjects[i].x, gameObjects[i].y, lightShots[j].x, lightShots[j].y) < 50) {
                            gameObjects.splice(i, 1);
                            score += 10;
                            break;
                        }
                    }
                }
            } else {
                console.log("Score threshold reached.");
                if (!mothership) {
                    console.log("Spawning mothership.");
                    mothership = new Mothership(900, 300);
                }

                mothership.display();
                mothership.move();

                // Collision Spaceship/Mothership
                if (dist(mothership.x, mothership.y, x, y) < 200) {
                    gameOver();
                    console.log(x + "," + y);
                }

                // Contact Light shot/Mothership
                for (let j = lightShots.length - 1; j >= 0; j--) {
                    if (dist(mothership.x, mothership.y, lightShots[j].x, lightShots[j].y) < 50) {
                        score += 50;
                        mothership = null;
                        break;
                    }
                }

                // Lasers shot from Mothership
                for (let k = lasers.length - 1; k >= 0; k--) {
                    lasers[k].display();
                    lasers[k].move();

                    // Contact Laser/Spaceship
                    if (dist(lasers[k].x, lasers[k].y, x, y) < 50) {
                        gameOver();
                        console.log(x + "," + y);
                    }
                }
            }

            y += spaceshipYSpeed;
            y = constrain(y, 75, height - 75);

            updateStatScreen();
        }
    }
}

class Ufo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 50;
        this.moveSpeed = -10;
        this.delay = 800;
        this.timer = 0;
    }

    display() {
        fill(200, 0, 0);
        arc(this.x, this.y, 100, 50, PI, PI + PI, PIE);
        fill(0, 200, 255);
        arc(this.x, this.y - 20, 60, 60, PI, PI + PI, PIE);
        fill(255, 255, 0);
        ellipse(this.x, this.y - 10, 10);
        ellipse(this.x - 20, this.y - 10, 10);
        ellipse(this.x - 35, this.y - 10, 10);
        ellipse(this.x + 20, this.y - 10, 10);
        ellipse(this.x + 35, this.y - 10, 10);
    }

    move() {
        this.timer++;
        if (this.timer >= this.delay) {
            this.x += this.moveSpeed; 
        }
    }
}  

function spawnUfo() {
    if (score < 150) {  // Only spawn UFOs if the score is less than 150
        let y = Math.random() * height;
        let newUfo = new Ufo(1200, y);
        newUfo.timer = newUfo.delay;
        gameObjects.push(newUfo);
    }
}

function spaceship() {
    push();
    fill(20, 0, 220);
    quad(x, y - 37.5, x, y + 37.5, x - 37.5, y + 25, x - 37.5, y - 20);
    quad(x, y - 37.5, x, y + 37.5, x + 100, y + 12.5, x + 100, y - 12.5);
    rect(x, y - 65, 15, 40);
    rect(x, y + 25, 15, 40);
    rect(x - 37.5, y - 75, 125, 25);
    rect(x - 37.5, y + 50, 125, 25);
    fill(0, 200, 255);
    ellipse(x + 50, y, 50, 25);
    pop();
}

function jets() {
    // yellow
    push();
    fill(255, 255, 0);
    beginShape();
    vertex(x - 40, y + 20);
    bezierVertex(x - 40, y + 20, x - 250, y, x - 40, y - 20);
    endShape();
    beginShape();
    vertex(x - 40, y - 55);
    bezierVertex(x - 40, y - 55, x - 200, y - 62.5, x - 40, y - 70);
    endShape();
    beginShape();
    vertex(x - 40, y + 55);
    bezierVertex(x - 40, y + 55, x - 200, y + 62.5, x - 40, y + 70);
    endShape();
    pop();
    // orange
    fill(255, 180, 0);
    beginShape();
    vertex(x - 40, y + 15);
    bezierVertex(x - 40, y + 15, x - 150, y, x - 40, y - 15);
    endShape();
    beginShape();
    vertex(x - 40, y - 57.5);
    bezierVertex(x - 40, y - 57.5, x - 125, y - 62.5, x - 40, y - 67.5);
    endShape();
    beginShape();
    vertex(x - 40, y + 57.5);
    bezierVertex(x - 40, y + 57.5, x - 125, y + 62.5, x - 40, y + 67.5);
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
            x: x + 100,
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

function gameOver() {
    gameOverFlag = true; 
    noLoop();
    background(0);
    textAlign(CENTER);
    textSize(50);
    fill(255);
    text("Game Over", width / 2, height / 3);
    startOverButton = createButton('Start Over');
    startOverButton.position(width / 2, height / 2);
    startOverButton.mousePressed(drawStartScreen);
}

function createStartScreen() {
    startButton = createButton('Start');
    startButton.position(width / 2, height / 2);
    startButton.mousePressed(startGame);
}

function startGame() {
    gameStarted = true;
    startButton.remove(); // Remove the start button
}

function drawStartScreen() {
    background(0); 
    textAlign(CENTER);
    textSize(50);
    fill(255);
    text("Space Shooter", width / 2, height / 2 - 50);
    textSize(20);
    text("Press Start to begin", width / 2, height / 2 + 50);
    textSize(16);
    text("ARROW KEYS: Move up and down", width / 2, height / 2 + 100);
    text("SPACE: Shoot", width / 2, height / 2 + 120);
}

function generateStars() {
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            size: random(1, 3)
        });
    }
}

function drawStars() {
    fill(255);
    for (let star of stars) {
        ellipse(star.x, star.y, star.size);
    }
}