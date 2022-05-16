const config = {
    width: 180,
    height: 320,
    parent: "container",
    type: Phaser.AUTO,
    physics: { default: "arcade" },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}
var game = new Phaser.Game(config);

var score = 0;
var pikeSpeed = 0;
var timeLeft = 7500;
var offWallTime = 500;
var jumpTimer = 1000;
var start= false;
var isPaused = true; 
var gameOver = false;
var playerOffWall = false;
var jumpDir = 1;
var boost = 1;
var canJump = false;
var onAir = false;
var playerStop = 137;

function preload() {
    this.load.image("Background", "./assets/Background.png");
    this.load.image("Pikes", "./assets/Pikes.png");
    this.load.spritesheet('Player_SS', './assets/Player_SprtSht.png', 
                            { frameWidth: 28, frameHeight: 38});
}
function create() {
    this.BG = this.add.image(0, 0, "Background");
    this.BG.setOrigin(0, 0);
    
    Pikes_L = this.physics.add.sprite(29, 400, "Pikes");
    Pikes_R = this.physics.add.sprite(153, 400, "Pikes");
    Pikes_L.setOrigin(0, 1);
    Pikes_R.flipX = true;
    Pikes_R.setOrigin(1, 1);
    
    player = this.physics.add.sprite(42, 266, 'Player_SS', 0);

    ui = this.add.text(90, 53, 'Change sides \n with SPACE', 
    { fontFamily: 'Arial', fontSize: 16, color: '#000000',
    align: 'center' }).setOrigin(0.5);
    
    this.physics.add.collider(player, Pikes_L, function (player, Pikes_L) {
        gameOver = true;
        ui.text = 'Game Over \n' + score;
    })
    this.physics.add.collider(player, Pikes_R, function (player, Pikes_R) {
        gameOver = true;
        ui.text = 'Game Over \n' + score;
    })

    this.input.keyboard.on('keydown', function (event) {
        if(!start) {
            PausePikeSpeed();
            ui.text = score;  
            CallPikes();
            start = true;
        }
        if(gameOver) {
            this.scene.restart();
        }
    });
    this.input.keyboard.on('keydown-SPACE', function (event) {
        if(start) { ChangeSide(); }
        if(canJump) { onAir = true; }
    });
    this.input.keyboard.on('keydown-ESC', function (event) {
        PausePikeSpeed();
        ui.text = 'Press ESC \n to resume';        
    });
}
function update(time, delta) {
    if(!gameOver) {
        score += pikeSpeed;
        if(start && !isPaused) ui.text = score;
        Pikes_L.y += pikeSpeed;
        Pikes_R.y += pikeSpeed;
    
        if(!isPaused) {
            timeLeft -= delta;
            if(timeLeft <= 0) { CallPikes(); }
    
            if(playerOffWall && player.x != playerStop) {
                offWallTime -= delta;
                canJump = true; 
                player.x += jumpDir * boost;
                player.setFrame (1);
                if(onAir){
                    if(player.x == 90){
                        jumpTimer -= delta;
                        player.setFrame (2);
                        boost = 0;
                        pikeSpeed = 2;
                    }
                    if(jumpTimer <= 0) {
                        boost = 1;
                        jumpTimer = 1000;
                        pikeSpeed = 1;
                        onAir = false;
                    }
                }
            } 
        }
            if(player.x == playerStop) {
            playerOffWall = false;
            offWallTime = 500;
            canJump = false;
            onAir = false;
            player.setFrame(0);
        }
    }
}
function ChangeSide(){
    if(!isPaused){
        if(player.x == 42){
            jumpDir = 1;
            playerOffWall = true;
            playerStop = 137;
            player.flipX = true;
        }
        if(player.x == 137){
            jumpDir = -1;
            playerOffWall = true;
            playerStop = 42;
            player.flipX = false;
        }
    }
}
function CallPikes() {
    pikeForm = Phaser.Math.RND.integerInRange(0, 2);
    switch(pikeForm){
        case 0:
            Pikes_L.y = 0;
            break;
        case 1:
            Pikes_R.y = 0;
            break;
        case 2:
            Pikes_L.y = 0;
            Pikes_R.y = 0;
            break;
    }
    timeLeft = 7500;
}
function PausePikeSpeed() {
    if(!isPaused){
        pikeSpeed = 0;
        isPaused = true;
    } else if (isPaused) {
        pikeSpeed = 1
        isPaused = false;
    }
}