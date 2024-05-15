let mothership;
let gameObjects = [];
let x = 100;
let y = 200;
let spaceshipYSpeed = 0;
const spaceshipYSpeedIncrement = 10;
let lightShots = [];
let score = 0;
let lives = 2;
let level = 1;
let gameOverFlag = false;
let gameStarted = false;
let startButton;
let stars = [];

function setup() {
    createCanvas(800, 500);
    // setInterval(spawnUfo, 3000);
    mothership = new Mothership(width, random(100, 400));
    createStatScreen();
    generateStars(); 
    noStroke();
} 

class Mothership {
    constructor(x, y) {
        this.x = 600;
        this.y = y;
        this.width = 200;
        this.height = 100;
        this.moveSpeed = -5;
        this.verticalSpeed = 3;
        this.delay = 800;
        this.timer = 0;
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
        if (this.timer >= this.delay) {
            this.x += this.moveSpeed; 
            this.y += this.verticalSpeed * this.verticalDirection;
        }
        if (this.y <= 100 || this.y >= 400) {
            this.verticalDirection *= -1;
        }
    }
}


function draw() {
    if (!gameStarted) {
        background(0, 10, 30);
        drawStars();
        spaceship();
        moveLightShots();
        displayLightShots();

        mothership.display();
        mothership.move();

        if (!gameOverFlag) {
            for (let i = gameObjects.length - 1; i >= 0; i--) {
                gameObjects[i].display();
                gameObjects[i].move();

                // ---
                if (dist(gameObjects[i].x, gameObjects[i].y, x, y) < 200) {
                    gameOver();
                    console.log(x + "," + y);
                }

                // Contact Light shot/Mothership (unfin)
                for (let j = lightShots.length - 1; j >= 0; j--) {
                    if (dist(gameObjects[i].x, gameObjects[i].y, lightShots[j].x, lightShots[j].y) < 50) {
                        gameObjects.splice(i, 1);
                        score += 10;
                        break;
                    }
                }
            }

            y += spaceshipYSpeed;
            y = constrain(y, 75, height - 75);

            updateStatScreen();
        }
    }
}

/* function spawnUfo() {
    let y = Math.random() * height;
    let newUfo = new Ufo(600, y);
    newUfo.timer = newUfo.delay;
    gameObjects.push(newUfo);
} */

function spaceship() {
    push();
    fill(20, 0, 220);
    quad(x, y - 75, x, y + 75, x - 75, y + 50, x - 75, y - 50);
    quad(x, y - 75, x, y + 75, x + 200, y + 25, x + 200, y - 25);
    rect(x, y - 130, 30, 80);
    rect(x, y + 50, 30, 80);
    rect(x - 75, y - 150, 250, 50);
    rect(x - 75, y + 100, 250, 50);
    fill(0, 200, 255);
    ellipse(x + 100, y, 100, 50);
    pop();
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
    text("Game Over", width / 2, height / 2); 
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