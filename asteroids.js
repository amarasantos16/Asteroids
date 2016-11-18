

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var kbd;
var spaceship;
var asteroid;

function preload() {
    game.load.image('spaceship', 'spaceship.gif');
    game.load.image('asteroid', 'asteroid.png'); 
    
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
   spaceship.body.collideWorldBounds = true;
   spaceship.body.setCircle(15)
   
   asteroid = game.add.sprite (300, 300, 'asteroid'); 
   asteroid.anchor.set(1);
    
    //  and its physics settings
    game.physics.enable(asteroid, Phaser.Physics.ARCADE);
 
    asteroid.body.velocity.x = 67;
    asteroid.body.velocity.y = 139;
    asteroid.body.angularVelocity = 30;

    asteroid.speed = 100;
    
    //  This is the collision rule
   asteroid.body.collideWorldBounds = true;
   asteroid.body.setCircle(15)
    
    

}


function update() {
 
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
