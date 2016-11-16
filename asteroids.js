var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var kbd;
var spaceship;

function preload() {
    game.load.image('spaceship', 'spaceship.gif');
    kbd = game.input.keyboard.createCursorKeys();
}

function create() {

    //  Our player ship
    spaceship = game.add.sprite(300, 300, 'spaceship');
    spaceship.anchor.set(0.5);

    //  and its physics settings
    game.physics.enable(spaceship, Phaser.Physics.ARCADE);

}


function update() {
 
    if (kbd.up.isDown)  // isDown means key was pressed
    {
        game.physics.arcade.accelerationFromRotation(spaceship.rotation, 80, spaceship.body.acceleration);
    }
    else
    {
        spaceship.body.acceleration.set(0);
    }

}
