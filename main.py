@namespace
class SpriteKind:
    item = SpriteKind.create()
    Boss = SpriteKind.create()
    Boss2 = SpriteKind.create()

def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . 5 5 5 5 . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . .
        """),
        mySprite,
        200,
        0)
    music.pew_pew.play()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    sprite.destroy(effects.fire, 500)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Boss2, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    sprite2.destroy(effects.fire, 500)
    statusbars.get_status_bar_attached_to(StatusBarKind.enemy_health, otherSprite2).value += -10
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Boss, on_on_overlap2)

def on_on_overlap3(sprite3, otherSprite3):
    info.change_life_by(2)
    music.power_up.play()
    otherSprite3.vx = 0
    otherSprite3.destroy(effects.spray, 100)
sprites.on_overlap(SpriteKind.player, SpriteKind.item, on_on_overlap3)

def on_on_zero(status):
    statusbar.sprite_attached_to().destroy(effects.spray, 5000)
    scene.camera_shake(30, 5000)
    for index in range(5):
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
statusbars.on_zero(StatusBarKind.enemy_health, on_on_zero)

def on_b_pressed():
    info.set_life(0)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_on_overlap4(sprite4, otherSprite4):
    info.change_life_by(1)
    music.power_up.play()
    otherSprite4.vx = 0
    otherSprite4.destroy(effects.spray, 100)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap4)

def on_on_overlap5(sprite5, otherSprite5):
    info.change_life_by(-2)
    otherSprite5.destroy(effects.spray, 5000)
    music.knock.play()
    pause(100)
    music.knock.play()
    pause(100)
    music.knock.play()
    pause(100)
    music.knock.play()
sprites.on_overlap(SpriteKind.player, SpriteKind.Boss2, on_on_overlap5)

def on_on_overlap6(sprite6, otherSprite6):
    info.change_score_by(1)
    otherSprite6.vx = 0
    otherSprite6.destroy(effects.spray, 500)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap6)

def on_on_overlap7(sprite7, otherSprite7):
    info.change_life_by(-1)
    music.knock.play()
    otherSprite7.destroy(effects.spray, 500)
    otherSprite7.vx = 0
    scene.camera_shake(30, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap7)

def on_on_overlap8(sprite8, otherSprite8):
    info.change_life_by(-2)
    otherSprite8.destroy(effects.spray, 5000)
    otherSprite8.vx = 0
    scene.camera_shake(30, 5000)
sprites.on_overlap(SpriteKind.player, SpriteKind.Boss, on_on_overlap8)

item2: Sprite = None
Boss22: Sprite = None
item3: Sprite = None
Boss3: Sprite = None
myEnemy: Sprite = None
MyEnemy2: Sprite = None
statusbar: StatusBarSprite = None
projectile: Sprite = None
mySprite: Sprite = None
effects.star_field.start_screen_effect()
mySprite = sprites.create(img("""
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
    """),
    SpriteKind.player)
controller.move_sprite(mySprite, 100, 100)
mySprite.set_stay_in_screen(True)
info.set_life(5)

def on_update_interval():
    global MyEnemy2
    MyEnemy2 = sprites.create(assets.image("""
        dashing ghost
    """), SpriteKind.enemy)
    MyEnemy2.x = scene.screen_width()
    MyEnemy2.vx = -200
    MyEnemy2.y = randint(10, scene.screen_height() - -10)
game.on_update_interval(5000, on_update_interval)

def on_update_interval2():
    global myEnemy
    myEnemy = sprites.create(assets.image("""
        jellyfish UFO
    """), SpriteKind.enemy)
    myEnemy.x = scene.screen_width()
    myEnemy.vx = -20
    myEnemy.y = randint(10, scene.screen_height() - -10)
game.on_update_interval(2000, on_update_interval2)

def on_update_interval3():
    global Boss3
    Boss3 = sprites.create(assets.image("""
        Ghost Boss
    """), SpriteKind.Boss2)
    Boss3.x = scene.screen_width()
    Boss3.vx = -250
    Boss3.y = randint(10, scene.screen_height() - -10)
game.on_update_interval(60000, on_update_interval3)

def on_update_interval4():
    global item3
    item3 = sprites.create(assets.image("""
        Fixing Tool
    """), SpriteKind.food)
    item3.x = scene.screen_width()
    item3.vx = -20
    item3.y = randint(10, scene.screen_height() - -10)
game.on_update_interval(20000, on_update_interval4)

def on_update_interval5():
    global Boss22, statusbar
    Boss22 = sprites.create(assets.image("""
            Jerry Fish UFO Boss
        """),
        SpriteKind.Boss)
    Boss22.x = scene.screen_width()
    Boss22.vx = -10
    Boss22.y = randint(10, scene.screen_height() - -10)
    statusbar = statusbars.create(100, 2, StatusBarKind.enemy_health)
    statusbar.max = 100
    statusbar.attach_to_sprite(Boss22)
    Boss22.set_bounce_on_wall(True)
game.on_update_interval(40000, on_update_interval5)

def on_update_interval6():
    global item2
    item2 = sprites.create(assets.image("""
        Golden
    """), SpriteKind.item)
    item2.x = scene.screen_width()
    item2.vx = -40
    item2.y = randint(10, scene.screen_height() - -10)
game.on_update_interval(40000, on_update_interval6)
