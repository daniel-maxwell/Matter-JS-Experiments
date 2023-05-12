var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies

var Constraint = Matter.Constraint;
var MouseConstraint = Matter.MouseConstraint;
var Mouse = Matter.Mouse;

var engine;
var ground;
var constraint1;
var poly1A, poly1B;

var poly2;
var constraint2;

var poly3;
var constraint3;

var canvas;

function setup() {
    canvas = createCanvas(900, 600);

    // Create an engine instance
    engine = Engine.create()

    // Define shapes as Bodies instances

    // Connect two bodies together
    poly1A = Bodies.polygon(700, 100, 6, 20);
    poly1B = Bodies.polygon(700, 250, 1, 50);

    constraint1 = Constraint.create({
        bodyA : poly1A,
        point1A : {x: 0, y: 0},
        bodyB : poly1B,
        point1B : {x: -10, y: -10},
        stiffness : 0.008
    })
    World.add(engine.world, [poly1A, poly1B, constraint1]);


    // Connect a body to a place in the world
    poly2 = Bodies.polygon(300, 200, 5, 40);
    constraint2 = Constraint.create({
        pointA : {x: 150, y: 50},
        bodyB : poly2,
        pointB : {x: -10, y: -20},
    })
    World.add(engine.world, [poly2, constraint2]);


    // Connect a body to a place in the world with elasticity
    poly3 = Bodies.polygon(400, 100, 4, 30);
    constraint3 = Constraint.create({
        pointA : {x: 400, y: 120},
        bodyB : poly3,
        pointB : {x: -10, y: -10},
        stiffness : 0.001,
        damping : 0.05
    })
    World.add(engine.world, [poly3, constraint3]);

    ground = Bodies.rectangle(width/2, height-20, 800, 10, {isStatic: true, angle: 0});
    World.add(engine.world, [ground]);

    // Mouse
    var mouse  = Mouse.create(canvas.elt);
    var mouseParams = {
        mouse: mouse
    };

    var mouseConstraint = MouseConstraint.create(engine, mouseParams);
    mouseConstraint.mouse.pixelRation = pixelDensity();
    World.add(engine.world, mouseConstraint);

}

// p5 draw() - called on each frame of the simulation
function draw() {
    background(0);
    Engine.update(engine);
    fill(255);
    drawVertices(poly1A.vertices);
    drawVertices(poly1B.vertices);
    drawVertices(poly2.vertices);
    drawVertices(poly3.vertices);

    stroke(128);
    strokeWeight(3);
    drawConstraint(constraint1);
    drawConstraint(constraint2);
    drawConstraint(constraint3);

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