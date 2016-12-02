

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var kbd;
var spaceship;
var asteroids = [];

var bullets;

var fireRate = 100;
var nextFire = 0;

function preload() {
    game.load.image('spaceship', 'spaceship.gif');
    game.load.image('asteroid', 'asteroid.gif');
    game.load.image('bullet', 'Laser.png');
    
    kbd = game.input.keyboard.createCursorKeys();
}

function create() {    
    //  Our player ship
    spaceship = game.add.sprite(300, 300, 'spaceship');
    spaceship.anchor.set(0.5);

    //  and its physics settings
    game.physics.enable(spaceship, Phaser.Physics.ARCADE);
 
    spaceship.body.drag.set(100);
    spaceship.body.maxVelocity.set(200);
    //  This is the collision rule
    game.world.setBounds(0, 0, 800, 600);
    spaceship.body.collideWorldBounds = false;
    spaceship.body.setCircle(15);
    
    makeAsteroids(7);
    
    // bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
}

function update() {
    checkWorldPosition(spaceship)
    move()
    checkAsteroidCollision()
}

function checkWorldPosition(object) {
// check position
    if (object.position.x > game.world.bounds.width) {
        object.position.x = 0
    }
    
    if (object.position.x < 0) {
        object.position.x = game.world.bounds.width
    }
    
    if (object.position.y > game.world.bounds.height) {
        object.position.y = 0
    }
    
    if (object.position.y < 0) {
        object.position.y = game.world.bounds.height
    }   
}

function move() {
    if (kbd.up.isDown)  // isDown means key was pressed
    {
        game.physics.arcade.accelerationFromRotation(spaceship.rotation, 80, spaceship.body.acceleration);
    }
    else if (kbd.down.isDown)
    {   
        game.physics.arcade.accelerationFromRotation(spaceship.rotation, -80, spaceship.body.acceleration); 
    }
    else 
    {
        spaceship.body.acceleration.set(0);
    }
    
    if (kbd.left.isDown)
    {
        spaceship.body.angularVelocity = -300;
    }
    else if (kbd.right.isDown)
    {
        spaceship.body.angularVelocity = 300;
    }
    else
    {
        spaceship.body.angularVelocity = 0;
    }
}

function checkAsteroidCollision() {
    asteroids.forEach(function(a){
        checkWorldPosition(a)
        var collided = game.physics.arcade.collide(spaceship, a)
        if (collided) {
            spaceship.kill();
            
            asteroids.forEach(function(a) { 
                a.kill();
            });
            create();            
        }
    });
}

function makeAsteroids(numberOfAsteroids) {
    for (var i = 0; i < numberOfAsteroids; i++) {
        
        var asteroid = game.add.sprite(getRandomBetween(0, 800), getRandomBetween(0, 600), 'asteroid'); 
    
        //  and its physics settings
        game.physics.enable(asteroid, Phaser.Physics.ARCADE);
        
        asteroid.body.velocity.x = getRandomBetween(-90,90);
        asteroid.body.velocity.y = getRandomBetween(-90,90);
        asteroid.body.angularVelocity = 15;
        
        asteroid.speed = 200;
        
        //  This is the collision rule
       asteroid.body.collideWorldBounds = false;
       asteroid.body.setCircle(15)
       
       asteroids.push(asteroid)
    }
}

// From Mozilla
function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
