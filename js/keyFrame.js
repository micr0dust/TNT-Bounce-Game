const keyFrame = (self) => {
    self.anims.create({
        key: 'u2',
        frames: self.anims.generateFrameNumbers('p2', { start: 1, end: 1 }),
        frameRate: 1,
        repeat: -1
    })
    self.anims.create({
        key: 'd2',
        frames: self.anims.generateFrameNumbers('p2', { start: 0, end: 0 }),
        frameRate: 1,
        repeat: -1
    })
    self.anims.create({
        key: 'l2',
        frames: self.anims.generateFrameNumbers('p2', { start: 2, end: 2 }),
        frameRate: 1,
        repeat: -1
    })
    self.anims.create({
        key: 'r2',
        frames: self.anims.generateFrameNumbers('p2', { start: 3, end: 3 }),
        frameRate: 1,
        repeat: -1
    })
    self.anims.create({
        key: 'u1',
        frames: self.anims.generateFrameNumbers('p1', { start: 1, end: 1 }),
        frameRate: 1,
        repeat: -1
    })
    self.anims.create({
        key: 'd1',
        frames: self.anims.generateFrameNumbers('p1', { start: 0, end: 0 }),
        frameRate: 1,
        repeat: -1
    })
    self.anims.create({
        key: 'l1',
        frames: self.anims.generateFrameNumbers('p1', { start: 2, end: 2 }),
        frameRate: 1,
        repeat: -1
    })
    self.anims.create({
        key: 'r1',
        frames: self.anims.generateFrameNumbers('p1', { start: 3, end: 3 }),
        frameRate: 1,
        repeat: -1
    })
    self.anims.create({
        key: 'shing',
        frames: self.anims.generateFrameNumbers('tnt', { start: 0, end: 1 }),
        frameRate: 1.5,
        repeat: -1
    })
    self.anims.create({
        key: 'explore',
        frames: self.anims.generateFrameNumbers('tnt', { start: 2, end: 2 }),
        frameRate: 0.5,
        repeat: -1
    })
    self.anims.create({
        key: 'p1die',
        frames: self.anims.generateFrameNumbers('p1', { start: 4, end: 4 }),
        frameRate: 1,
        repeat: -1
    })
    self.anims.create({
        key: 'p2die',
        frames: self.anims.generateFrameNumbers('p2', { start: 4, end: 4 }),
        frameRate: 1,
        repeat: -1
    })
}