const config = {
    width: 180,
    height: 320,
    parent: "container",
    type: Phaser.AUTO,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 100
            }
        }
    }
}
var game = new Phaser.Game(config);

function preload() {
    this.load.image("Background", "./assets/Background.png");
    this.load.image("Pikes_L", "./assets/Pikes.png");
    this.load.image("Pikes_R", "./assets/Pikes.png");
    this.load.image("Player_01", "./assets/Pikes.png");
    this.load.image("Player_02", "./assets/Pikes.png");
    this.load.image("Player_03", "./assets/Pikes.png");
}
function create() {
    this.BG = this.add.image(0, 0, "Background");
    this.Pikes_L = this.physics.add.image(29, 0, "Pikes_L");
    this.Pikes_R = this.physics.add.image(153, 0, "Pikes_R");
    //this.Player
    
    this.BG.setOrigin(0, 0);
    this.Pikes_L.setOrigin(0, 1);
    this.Pikes_R.flipX = true;
    this.Pikes_R.setOrigin(1, 1);

}
function update(time, delta) {
    console.log("Preloading");
}