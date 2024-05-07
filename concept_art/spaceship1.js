noStroke();

let x = 300;
let y = 200;

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
    beginShape();
}

function draw() {
    spaceship();
    jets();
}