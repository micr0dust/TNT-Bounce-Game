const gameStart = {
    key: 'gameStart',
    preload: function () {
        // 載入資源
        this.load.image('bg1', 'images/bg1.png');
        this.load.image('bg2', 'images/bg2.png');
        this.load.image('bg3', 'images/bg3.png');
        this.load.image('bg4', 'images/bg4.png');
        this.load.image('bg5', 'images/bg5.png');
        this.load.image('bg6', 'images/bg6.png');
        this.load.image('title', 'images/title.png');
        this.load.image('btn', 'images/btn.png');

        this.load.audio('hob', 'sounds/hob.mp3');
        this.load.audio('decision', 'sounds/decision5.wav');
    },
    create: function () {
        // 資源載入完成，加入遊戲物件及相關設定
        //this.bg1 = this.add.tileSprite(x, y, width, height, 'bg1');
        this.bg1 = this.add.tileSprite(screenW / 2, screenH / 2, screenW, screenH, 'bg1');
        this.bg2 = this.add.tileSprite(screenW / 2, screenW / 2, screenW, screenW, 'bg2');
        this.bg5 = this.add.tileSprite(screenW / 2, screenW / 2, screenW, screenW, 'bg5');
        this.bg4 = this.add.tileSprite(screenW / 2, screenW / 2, screenW, screenW, 'bg4');
        this.bg3 = this.add.tileSprite(screenW / 2, screenW / 2, screenW, screenW, 'bg3');
        this.bg6 = this.add.tileSprite(screenW / 2, screenW / 2, screenW, screenW, 'bg6');
        this.title = this.add.image(screenW / 2, screenH / 4, 'title');
        this.title.setScale(screenW/1724*17/19,screenH/332*3/8)
        this.btn = this.add.image(screenW / 2, screenH*3 / 4, 'btn');
        this.btn.setScale(screenW/600/3,screenW/600/3)
        this.btn.setInteractive();
        this.btn.on('pointerdown',()=>{
            this.sound.play('decision');
            this.scene.start('gamePlay');
            music.stop();
        });

        var music = this.sound.add('hob',{loop: true});
        music.play();
    },
    update: function () {
        // 遊戲狀態更新
        this.bg2.tilePositionY -= 1;
        this.bg3.tilePositionY -= 3;
        this.bg4.tilePositionY -= 2;
        this.bg5.tilePositionY -= 1.5;
        this.bg6.tilePositionY -= 4;
        this.bg2.tilePositionX -= 1;
        this.bg3.tilePositionX -= 3;
        this.bg4.tilePositionX -= 2;
        this.bg5.tilePositionX -= 1.5;
        this.bg6.tilePositionX -= 4;
    }
}