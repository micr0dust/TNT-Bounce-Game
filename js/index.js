const config = {
    type: Phaser.CANVAS,
    width: screenW,
    height: screenH,
    parent: 'app',
    input :{
		activePointers:3
	  },
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