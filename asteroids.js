
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('spaceship', 'spaceship.gif');
}

function create() {
    game.add.sprite(0, 0, 'spaceship');
}

function update() {
}
