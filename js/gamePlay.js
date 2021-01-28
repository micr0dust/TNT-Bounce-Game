const gamePlay = {
    key: 'gamePlay',
    preload: function () {
        // 載入資源
        this.load.image('bg1', 'images/bg1.png');
        this.load.image('scoreBackground', 'images/score_background.jpg');
        this.load.image('scoreBackground2', 'images/score_background2.jpg');
        this.load.spritesheet('p1', 'images/p1.png', { frameWidth: 231, frameHeight: 209 });
        this.load.spritesheet('p2', 'images/p2.png', { frameWidth: 231, frameHeight: 209 });
        this.load.spritesheet('tnt', 'images/tnt.png', { frameWidth: 1487, frameHeight: 1479 });
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    
        this.load.audio('fuse', 'sounds/tnt/fuse.wav');
        this.load.audio('explode1', 'sounds/tnt/explode1.wav');
        this.load.audio('explode2', 'sounds/tnt/explode2.wav');
        this.load.audio('explode3', 'sounds/tnt/explode3.wav');
        this.load.audio('explode4', 'sounds/tnt/explode4.wav');

    },
    create: function () {
        // 資源載入完成，加入遊戲物件及相關設定
        this.bg1 = this.add.tileSprite(screenW / 2, screenH / 2, screenW, screenH, 'bg1');
        this.scoreBackground1 = this.add.tileSprite(screenW - ((screenW - screenH) / 2 / 2), screenH / 2, 214, 394, 'scoreBackground');
        this.scoreBackground1.setScale((screenW - screenH) / 2 / 214, screenH / 394)
        this.scoreBackground2 = this.add.tileSprite((screenW - screenH) / 2 / 2, screenH / 2, 214, 394, 'scoreBackground2');
        this.scoreBackground2.setScale((screenW - screenH) / 2 / 214, screenH / 394)
        this.physics.add.existing(this.scoreBackground1);
        this.physics.add.existing(this.scoreBackground2);

        this.bg = this.add.group();
        this.player = this.add.group();
        this.blocks = this.add.group();
        this.boom = this.add.group();

        //變數
        this.direct = 'u';
        this.direct1 = 'u';
        this.tnts = [];
        this.tnts_x;
        this.tnts_y;
        this.gameStop = false;   // 控制遊戲是否停止
        this.rScore = 0;      // 藍隊分數
        this.bScore = 0;      // 紅隊分數
        this.boomTnt;
        this.x1 = (screenW - screenH) / 2 + screenH / 13 / 2 + screenH / 13 * (Math.floor(Math.random() * (13 - 1 + 1) + 1) - 1);
        this.y1 = screenH / 13 / 2 + screenH / 13 * (Math.floor(Math.random() * (13 - 1 + 1) + 1) - 1);
        this.x2 = (screenW - screenH) / 2 + screenH / 13 / 2 + screenH / 13 * (Math.floor(Math.random() * (13 - 1 + 1) + 1) - 1);
        this.y2 = screenH / 13 / 2 + screenH / 13 * (Math.floor(Math.random() * (13 - 1 + 1) + 1) - 1);


        keyFrame(this);



        this.bg.add(this.scoreBackground1);
        this.bg.add(this.scoreBackground2);
        //this.scoreBackground1.setDepth(1);
        //this.scoreBackground2.setDepth(1);

        //虛擬控制桿
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: (screenW - screenH) / 4,
            y: screenH / 2,
            radius: (screenW - screenH) / 6,
            base: this.add.circle(0, 0, (screenW - screenH) / 6, 0x888888),
            thumb: this.add.circle(0, 0, (screenW - screenH) / 12, 0xcccccc),
        });
        this.joyStick1 = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: screenW - (screenW - screenH) / 4,
            y: screenH / 2,
            radius: (screenW - screenH) / 6,
            base: this.add.circle(0, 0, (screenW - screenH) / 6, 0x888888),
            thumb: this.add.circle(0, 0, (screenW - screenH) / 12, 0xcccccc),
        });

        //if (this.device.desktop){console.log("desktop")}


        // 加入物理效果
        const addPhysics = GameObject => {
            this.physics.add.existing(GameObject);
            GameObject.body.immovable = true;
            GameObject.body.moves = false;
        }
        const gameOver = GameObject => {
            this.gameStop = GameObject;
            this.cameras.main.shake(500);
            this.player.remove(this.p1);
            this.player.remove(this.p2);
            this.p1.setVelocityX(0);
            this.p1.setVelocityY(0);
            this.p2.setVelocityX(0);
            this.p2.setVelocityY(0);
            this.time.delayedCall(2000,() => {
                this.cameras.main.fade(1000);
                this.tnts=[];
                this.time.delayedCall(1000,() => { this.scene.start("gamePlay"); });
            });
        }

        addPhysics(this.scoreBackground1);
        addPhysics(this.scoreBackground2);


        this.p1 = this.physics.add.sprite(this.x1, this.y1, 'p1');
        this.p1.setScale(screenH / 209 / 13); //設定顯示大小
        this.p1.setDepth(1);
        this.p1.setBodySize(screenH / 5, screenH / 4);
        this.p1.setCollideWorldBounds(true);
        this.player.add(this.p1);


        this.p2 = this.physics.add.sprite(this.x2, this.y2, 'p2');
        this.p2.setScale(screenH / 209 / 13); //設定顯示大小
        this.p2.setDepth(1);
        this.player.add(this.p2);
        this.p2.setCollideWorldBounds(true);
        this.p2.setBodySize(screenH / 5, screenH / 4);

        //blocks.anims.play('shing', true);
        this.physics.add.collider(this.player, this.player);
        this.physics.add.collider(this.player, this.blocks);
        this.physics.add.collider(this.blocks, this.blocks);
        this.physics.add.collider(this.player, this.bg);
        this.physics.add.collider(this.blocks, this.bg);
        this.physics.add.overlap(this.p1, this.boom, null, p1die, this);
        this.physics.add.overlap(this.p2, this.boom, null, p2die, this);
        function p1die() {
            if (this.gameStop) return;
            this.p1.anims.play('p1die', true);
            gameOver(true);
        }
        function p2die() {
            if (this.gameStop) return;
            this.p2.anims.play('p2die', true);
            gameOver(true);
        }
        var timedEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.gameStop) return;
                this.tnts_x = (screenW - screenH) / 2 + screenH / 13 / 2 + screenH / 13 * Math.floor(Math.random() * (12 - 1 + 1) + 1);
                this.tnts_y = screenH / 13 / 2 + screenH / 13 * Math.floor(Math.random() * (12 - 1 + 1) + 1);
                this.tnt = this.physics.add.sprite(this.tnts_x, this.tnts_y, 'tnt');
                this.tnt.setScale(screenH / 1479 / 13); //設定顯示大小
                this.tnt.setBodySize(1479 * 9 / 10, 1479 * 9 / 10);
                this.tnt.setBounce(1);
                this.tnt.setCollideWorldBounds(true);
                this.blocks.add(this.tnt);
                this.tnt.setVelocityX(Math.floor(Math.random() * screenH / 2 / 3));
                this.tnt.setVelocityY(Math.floor(Math.random() * screenH / 2 / 3));
                this.tnt.anims.play('shing', true);
                this.sound.play('fuse');
                this.tnts.push(this.tnt);
                this.time.delayedCall(8000,() => {
                    this.boomTnt = this.tnts.shift();
                    if(!this.boomTnt) return;
                    addPhysics(this.boomTnt);
                    this.blocks.remove(this.boomTnt);
                    this.boomTnt.anims.play('explore', true);
                    this.type=Math.floor(Math.random() * (4 - 1 + 1) + 1);
                    console.log(this.type)
                    if(this.type===1){
                        this.sound.play('explode1');
                    }else if(this.type===2){
                        this.sound.play('explode2');
                    }else if(this.type===3){
                        this.sound.play('explode3');
                    }else{
                        this.sound.play('explode4');
                    }
                    this.boom.add(this.boomTnt);
                    this.boomTnt.setScale(screenH / 1479 / 13 * 3);
                    this.time.delayedCall(500,() => {
                        if(!this.boomTnt) return;
                        this.boomTnt.destroy(true);
                    });
                });
            },
            callbackScope: this,
            loop: true });
    },
    update: function () {
        // 遊戲狀態更新
        if (this.gameStop) return;
        const walk1 = way => {
            this.direct1 = way;
        }
        const walk2 = way => {
            this.direct = way;
        }
        let cursorKeys = this.joyStick1.createCursorKeys();
        let cursorKeys1 = this.joyStick.createCursorKeys();
        let force1 = Math.floor(this.joyStick1.force) / 100
        let force2 = Math.floor(this.joyStick.force) / 100
        if (force1 > 1) force1 = 1;
        if (force2 > 1) force2 = 1;
        if (force1 === 0) force1 = 1;
        if (force2 === 0) force2 = 1;
        let speed1 = screenH / 2 * force1;
        let speed2 = screenH / 2 * force2;

        let cursors = this.input.keyboard.createCursorKeys();
        if (cursors.right.isDown || cursorKeys.right.isDown) {
            walk1("r");
            this.p1.setVelocityX(speed2);
        }
        if (cursors.left.isDown || cursorKeys.left.isDown) {
            walk1("l");
            this.p1.setVelocityX(-speed2);
        }
        if (cursors.up.isDown || cursorKeys.up.isDown) {
            walk1("u");
            this.p1.setVelocityY(-speed2);
        }
        if (cursors.down.isDown || cursorKeys.down.isDown) {
            walk1("d");
            this.p1.setVelocityY(speed2);
        }
        if (!cursors.up.isDown && !cursors.down.isDown && !cursorKeys.up.isDown && !cursorKeys.down.isDown) {
            this.p1.setVelocityY(0);
        }
        if (!cursors.right.isDown && !cursors.left.isDown && !cursorKeys.right.isDown && !cursorKeys.left.isDown) {
            this.p1.setVelocityX(0);
        }

        let p2 = this.input.keyboard.addKeys('W,S,A,D');
        if (p2.D.isDown || cursorKeys1.right.isDown) {
            walk2("r");
            this.p2.setVelocityX(speed1);
        }
        if (p2.A.isDown || cursorKeys1.left.isDown) {
            walk2("l");
            this.p2.setVelocityX(-speed1);
        }
        if (p2.S.isDown || cursorKeys1.down.isDown) {
            walk2("d");
            this.p2.setVelocityY(speed1);
        }
        if (p2.W.isDown || cursorKeys1.up.isDown) {
            walk2("u");
            this.p2.setVelocityY(-speed1);
        }
        if (!p2.W.isDown && !p2.S.isDown && !cursorKeys1.up.isDown && !cursorKeys1.down.isDown) {
            this.p2.setVelocityY(0);
        }
        if (!p2.D.isDown && !p2.A.isDown && !cursorKeys1.right.isDown && !cursorKeys1.left.isDown) {
            this.p2.setVelocityX(0);
        }
        if (this.direct === "u") this.p2.anims.play('u2', true);
        if (this.direct === "d") this.p2.anims.play('d2', true);
        if (this.direct === "l") this.p2.anims.play('l2', true);
        if (this.direct === "r") this.p2.anims.play('r2', true);
        if (this.direct1 === "u") this.p1.anims.play('u1', true);
        if (this.direct1 === "d") this.p1.anims.play('d1', true);
        if (this.direct1 === "l") this.p1.anims.play('l1', true);
        if (this.direct1 === "r") this.p1.anims.play('r1', true);
    }
}