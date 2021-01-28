const config = {
    type: Phaser.AUTO,
    width: screenW,
    height: screenH,
    parent: 'app',
    audio: {
        disableWebAudio: true
    },
    physics:{
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        gameStart,
        gamePlay,
    ]
}

const game = new Phaser.Game(config);