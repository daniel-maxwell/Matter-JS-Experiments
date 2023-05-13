var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body

var engine;
var box1;
var ground;
var boxes = [];
var propeller;
var p_angle=0;
var p_anglespeed = 0.1;

function setup() {
    createCanvas(900, 600);

    // Create an engine instance
    engine = Engine.create()

    // Define shapes as Bodies instances
    box1 = Bodies.rectangle(200, 200, 80, 80, {restitution: .8, friction:0.5});
    ground = Bodies.rectangle(500, 500, 500, 10, {isStatic: true, angle: Math.PI * -0.06});

    propeller = Bodies.rectangle(width/2, height/2, 300, 15, {isStatic:true, angle: p_angle});
    
    // Add of all the bodies to the world
    World.add(engine.world, [box1, ground, propeller]);
}

// p5 draw() - called on each frame of the simulation
function draw() {
    background(0);
    Engine.update(engine);

    fill(255);
    drawVertices(box1.vertices);
    drawVertices(propeller.vertices);
    p_angle += p_anglespeed;
    Body.setAngle(propeller, p_angle);
    Body.setAngularVelocity(propeller, p_anglespeed);


    if (random(1) < 0.2) generateObject(width/2, 0)

    for (let i=0; i<boxes.length; i++)
    {
        drawVertices(boxes[i].vertices);
        if (isOffScreen(boxes[i])){
            World.remove(engine.world, boxes[i])
            boxes.splice(i, 1);
            i--
        } 
    }

    fill(125);
    drawVertices(ground.vertices);
}

function generateObject(x, y) {
    const b = Bodies.rectangle(x,y, random(10,30), random(10,30), {restitution:.8, friction: .5})
    boxes.push(b);
    World.add(engine.world, [b]);
}

function isOffScreen(body){
    var pos = body.position;
    return (pos.y > height || pos.x < 0 || pos.x > width);
}

// Function to draw shapes to canvas
function drawVertices(vertices) {
    beginShape();
    for (let i=0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y)
    }
    endShape(CLOSE);
}