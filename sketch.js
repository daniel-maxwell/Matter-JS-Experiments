var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies

var engine;
var box1;
var ground1, ground2;
var circle;
var polygon;

function setup() {
    createCanvas(900, 600);

    // Create an engine instance
    engine = Engine.create()

    // Define shapes as Bodies instances
    box1 = Bodies.rectangle(200, 200, 80, 80, {restitution: .8, friction:0.5});
    circle = Bodies.circle(80, 0, 20, {restitution: .6, friction:0.5});
    polygon = Bodies.polygon(100, 0, 5, 30, {restitution: .9, friction:0.5});

    ground1 = Bodies.rectangle(100, 200, 500, 10, {isStatic: true, angle: Math.PI * 0.06});
    ground2 = Bodies.rectangle(500, 500, 500, 10, {isStatic: true, angle: Math.PI * -0.06});
    
    // Add of all the bodies to the world
    World.add(engine.world, [box1, circle, polygon, ground1, ground2]);
}

// p5 draw() - called on each frame of the simulation
function draw() {
    background(0);
    Engine.update(engine);

    fill(255);
    drawVertices(box1.vertices);
    drawVertices(circle.vertices);
    drawVertices(polygon.vertices);

    fill(125);
    drawVertices(ground1.vertices);
    drawVertices(ground2.vertices);
}

// Function to draw shapes to canvas
function drawVertices(vertices) {
    beginShape();
    for (let i=0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y)
    }
    endShape(CLOSE);
}