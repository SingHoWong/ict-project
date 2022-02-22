namespace SpriteKind {
    export const item = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const Boss2 = SpriteKind.create()
    export const Powerup = SpriteKind.create()
    export const EnemyProjectile = SpriteKind.create()
    export const Projectile2 = SpriteKind.create()
    export const Mode = SpriteKind.create()
}
namespace StatusBarKind {
    export const EnemyHealth2 = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Powerup, function (sprite, otherSprite) {
    music.powerUp.play()
    otherSprite.destroy(effects.spray, 500)
    TripleFireMode = sprites.create(assets.image`Power Up Laser`, SpriteKind.Mode)
    TripleFireMode.setPosition(48, 7)
    TripleFireMode.lifespan = 15000
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Laser`, mySprite, 200, 0)
    music.pewPew.play()
    if (TripleFireMode && TripleFireMode.lifespan > 0) {
        projectile.y += -5
        projectile = sprites.createProjectileFromSprite(assets.image`TripleFireMode`, mySprite, 200, 0)
        projectile.y += 5
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss2, function (sprite, otherSprite) {
    sprite.vx = 0
    sprite.destroy(effects.fire, 500)
})
function EnemyDeath (Enemy: Sprite) {
    Enemy.destroy(effects.spray, 2000)
    scene.cameraShake(8, 2000)
    if (Math.percentChance(75)) {
        Power_up = sprites.create(assets.image`Power Up 1`, SpriteKind.Powerup)
        Power_up.x = Enemy.x
        Power_up.y = Enemy.y
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    sprite.destroy()
    sprite.destroy(effects.fire, 500)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -10
})
statusbars.onZero(StatusBarKind.EnemyHealth2, function (status) {
    EnemyDeath2(status.spriteAttachedTo())
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.item, function (sprite, otherSprite) {
    info.changeLifeBy(2)
    music.beamUp.play()
    otherSprite.vx = 0
    otherSprite.destroy(effects.spray, 100)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    EnemyDeath(status.spriteAttachedTo())
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    music.beamUp.play()
    otherSprite.vx = 0
    otherSprite.destroy(effects.spray, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss2, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    otherSprite.destroy(effects.spray, 5000)
    music.knock.play()
    pause(100)
    music.knock.play()
    pause(100)
    music.knock.play()
    pause(100)
    music.knock.play()
})
function EnemyDeath2 (Enemy: Sprite) {
    Enemy.destroy(effects.spray, 500)
    if (Math.percentChance(10)) {
        Power_up = sprites.create(assets.image`Power Up 1`, SpriteKind.Powerup)
        Power_up.x = Enemy.x
        Power_up.y = Enemy.y
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.fire, 500)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth2, otherSprite).value += -50
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.knock.play()
    otherSprite.destroy(effects.spray, 500)
    otherSprite.vx = 0
    scene.cameraShake(30, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    otherSprite.destroy(effects.spray, 5000)
    otherSprite.vx = 0
    scene.cameraShake(30, 5000)
    for (let index = 0; index < 5; index++) {
        music.knock.play()
        pause(100)
        music.knock.play()
        pause(100)
        music.knock.play()
        pause(100)
        music.knock.play()
        pause(100)
        music.knock.play()
        pause(100)
        music.knock.play()
        pause(100)
        music.knock.play()
        pause(100)
        music.knock.play()
    }
})
let item2: Sprite = null
let Boss22: Sprite = null
let item: Sprite = null
let Boss3: Sprite = null
let MyEnemy3: Sprite = null
let myEnemy: Sprite = null
let statusbar: StatusBarSprite = null
let MyEnemy2: Sprite = null
let Power_up: Sprite = null
let projectile: Sprite = null
let TripleFireMode: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    .......111122...........
    .......1................
    .......11...............
    .......116111122........
    .....221116.............
    .....2221111............
    ......1112211111........
    ....1111112211111111....
    ......1112211111........
    .....2221111............
    .....221116.............
    .......116111122........
    .......11...............
    .......1................
    .......111122...........
    ........................
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
mySprite.setStayInScreen(true)
mySprite.setPosition(5, 55)
info.setLife(5)
game.onUpdateInterval(5000, function () {
    MyEnemy2 = sprites.create(assets.image`dashing ghost`, SpriteKind.Enemy)
    MyEnemy2.x = scene.screenWidth()
    MyEnemy2.vx = -200
    MyEnemy2.y = randint(10, scene.screenHeight() - -10)
    statusbar = statusbars.create(30, 2, StatusBarKind.EnemyHealth2)
    statusbar.max = 100
    statusbar.attachToSprite(MyEnemy2)
})
game.onUpdateInterval(2000, function () {
    myEnemy = sprites.create(assets.image`jellyfish UFO`, SpriteKind.Enemy)
    myEnemy.x = scene.screenWidth()
    myEnemy.vx = -20
    myEnemy.y = randint(10, scene.screenHeight() - -10)
    statusbar = statusbars.create(20, 2, StatusBarKind.EnemyHealth2)
    statusbar.max = 100
    statusbar.attachToSprite(myEnemy)
})
game.onUpdateInterval(2000, function () {
    MyEnemy3 = sprites.create(img`
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
        ..................1111..............
        .................b11111111..........
        ................1bb11111bb1.........
        ................11b1511bb111........
        ................1bb1111bb1111.......
        .................1111111b1111.......
        ...................11111bbb111......
        ....................111111b1111.....
        .....................1bbbbbbbbb.....
        ......................1111b111b.....
        .........................11b11b.....
        .........................21b111.....
        .........................21bb11.....
        .........................11bbb1.....
        .....................1111bb1111.....
        ...................11111bb1111......
        .................1111111b1111.......
        ...............1111bbbbbb1111.......
        ...............1bbbb1111111.........
        ...............1b11bbbb111..........
        ...............1bb111b111...........
        ................1bb11bb1............
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
        `, SpriteKind.Enemy)
    MyEnemy3.x = scene.screenWidth()
    MyEnemy3.vx = -50
    MyEnemy3.y = randint(10, scene.screenHeight() - -10)
    statusbar = statusbars.create(10, 2, StatusBarKind.EnemyHealth2)
    statusbar.max = 100
    statusbar.attachToSprite(MyEnemy3)
})
game.onUpdateInterval(60000, function () {
    Boss3 = sprites.create(assets.image`Ghost Boss`, SpriteKind.Boss2)
    Boss3.x = scene.screenWidth()
    Boss3.vx = -250
    Boss3.y = randint(10, scene.screenHeight() - -10)
})
game.onUpdateInterval(20000, function () {
    item = sprites.create(assets.image`Fixing Tool`, SpriteKind.Food)
    item.x = scene.screenWidth()
    item.vx = -20
    item.y = randint(10, scene.screenHeight() - -10)
})
game.onUpdateInterval(40000, function () {
    Boss22 = sprites.create(assets.image`Jerry Fish UFO Boss`, SpriteKind.Boss)
    Boss22.x = scene.screenWidth()
    Boss22.vx = -10
    Boss22.y = randint(10, scene.screenHeight() - -10)
    statusbar = statusbars.create(100, 2, StatusBarKind.EnemyHealth)
    statusbar.max = 100
    statusbar.attachToSprite(Boss22)
    Boss22.setBounceOnWall(true)
})
game.onUpdateInterval(40000, function () {
    item2 = sprites.create(assets.image`Golden`, SpriteKind.item)
    item2.x = scene.screenWidth()
    item2.vx = -40
    item2.y = randint(10, scene.screenHeight() - -10)
})
