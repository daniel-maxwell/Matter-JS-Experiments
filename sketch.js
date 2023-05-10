var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies

var Constraint = Matter.Constraint;

var engine;
var ground;
var constraint1;
var poly1A, poly1B;

function setup() {
    createCanvas(900, 600);

    // Create an engine instance
    engine = Engine.create()

    // Define shapes as Bodies instances

    poly1A = Bodies.polygon(700, 100, 6, 20);
    poly1B = Bodies.polygon(700, 250, 1, 50);

    constraint1 = Constraint.create({
        bodyA : poly1A,
        point1A : {x: 0, y: 0},
        bodyB : poly1B,
        point1B : {x: -10, y: -10},
        stiffness : 0.008
    })


    ground = Bodies.rectangle(width/2, height-20, 800, 10, {isStatic: true, angle: 0});
    
    // Add of all the bodies to the world
    World.add(engine.world, [ground, poly1A, poly1B, constraint1]);
}

// p5 draw() - called on each frame of the simulation
function draw() {
    background(0);
    Engine.update(engine);
    fill(255);
    drawVertices(poly1A.vertices);
    drawVertices(poly1B.vertices);

    stroke(128);
    strokeWeight(3);
    drawConstraint(constraint1);



    fill(128);
    drawVertices(ground.vertices)
}

// Function to draw shapes to canvas
function drawVertices(vertices) {
    beginShape();
    for (let i=0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y)
    }
    endShape(CLOSE);
}

function drawConstraint(constraint)
{
    var offsetA = constraint.pointA;
    var posA = {x:0, y:0};
    if (constraint.bodyA) {
        posA = constraint.bodyA.position;
    }

    var offsetB = constraint.pointB;

    var posB = {x:0, y:0};

    if (constraint.bodyB) {
        posB = constraint.bodyB.position;
    }

    line(
        posA.x + offsetA.x,
        posA.y + offsetA.y,
        posB.x + offsetB.x,
        posB.y + offsetB.y,
    );
}