const config = {
    width: 180,
    height: 320,
    parent: "container",
    type: Phaser.AUTO,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}
var game = new Phaser.Game(config);
function preload() {
    console.log("Preloading");
}
function create() {
    console.log("Creating");
}
function update(time, delta) {
    console.log("Preloading");
}