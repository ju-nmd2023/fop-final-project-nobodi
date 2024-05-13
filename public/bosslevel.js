

let x = 600;
let y = 200;

function ufo() {
    fill(200, 0, 0);
    arc(x, y, 400, 200, PI, PI + PI, PIE);
    fill(0, 200, 255);
    arc(x, y-80, 200, 200, PI, PI + PI, PIE);
    fill(255, 255, 0);
    ellipse(x, y-40, 40);
    ellipse(x-75, y-40, 40);
    ellipse(x-140, y-40, 40);
    ellipse(x+75, y-40, 40);
    ellipse(x+140, y-40, 40);
}