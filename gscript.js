//--CANVAS SETUP
const canvas = document.getElementById("screen")
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false
canvas.style.imageRendering = "pixelated"

ctx.imageSmoothingEnabled = false
canvas.style.imageRendering = "pixelated"

canvas.height = 720
canvas.width = 1280

//--GAME VARIABLES
const FPS=60
const gravity = 100
const animSpeed=5
const ground = 650
const players = []

function UpDrawImage(img, x, y, flipX, width, height, fsW,fsH, frame) {
    if (!img.complete) return

    const sx = frame * fsW
    const sy = 0
    const sWidth = fsW
    const sHeight = fsH

    ctx.save()
    if (flipX) {
        ctx.scale(-1, 1)
        ctx.drawImage(
            img,
            sx, sy, sWidth, sHeight,
            -x - width, y, width, height
        )
    } else {
        ctx.drawImage(
            img,
            sx, sy, sWidth, sHeight,
            x, y, width, height
        )
    }

    ctx.restore()
}

//--CHARACTER IMAGES
const Axel = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run"].forEach(name => {
  Axel[name] = [new Image(),135]
  Axel[name][0].src = `assets/Axel/${name}.png`
})

const Guantano = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run"].forEach(name => {
  Guantano[name] = [new Image(),126]
  Guantano[name][0].src = `assets/Guantano/${name}.png`
})

const Kiara = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run"].forEach(name => {
  Kiara[name] = [new Image(),150]
  Kiara[name][0].src = `assets/Kiara/${name}.png`
})

const Kimal = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run"].forEach(name => {
  Kimal[name] = [new Image(),200]
  Kimal[name][0].src = `assets/Kimal/${name}.png`
})

const Lizen = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run"].forEach(name => {
  Lizen[name] = [new Image(),162]
  Lizen[name][0].src = `assets/Lizen/${name}.png`
})

const Zaruto = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run"].forEach(name => {
  Zaruto[name] = [new Image(),200]
  Zaruto[name][0].src = `assets/Zaruto/${name}.png`
})



class Sprite{
    constructor(x, y, id, character){
        this.x = x
        this.y = y
        this.id = id
        this.velocityY=0
        this.velocityX=0
        this.height=200
        this.touchGrass=false
        this.isAttacking = false
        this.animation='Idle'
        this.flipX=false
        this.totalFrames=0
        this.frame=0
        this.stepCount=0
        this.character=character
        this.attacking=false
        this.atType=1
    }

    attack(type){
        if(!this.attacking){
            this.frame=0
            this.atType=type
            this.attacking=true
            console.log(9)
        }
    }

    update(delta){
        this.x+=this.velocityX*delta

        this.velocityY+=gravity
        this.y+=this.velocityY*delta
        if(this.y >= ground){
            this.y=ground
            this.velocityY=0
            this.touchGrass=true
        }
        else{this.touchGrass=false}
    }
    draw(){
        
        this.animation='Idle'

        if(this.velocityX!=0){this.animation='Run'}

        if(!this.touchGrass){
            this.animation = 'Jump'
        }
        if(this.attacking){
            this.animation='Attack'+this.atType
            if(this.frame>=this.totalFrames-1){this.attacking=false; this.animation='Idle'}
        }


        const anim = this.animation
        const image = this.character[anim][0]
        const width = this.character[anim][1]
        this.totalFrames = image.width/width
        this.stepCount+=1
        if(this.stepCount>=animSpeed){
            this.frame = (this.frame+1)%this.totalFrames
            this.stepCount=0
        }

        UpDrawImage(image,this.x-500,this.y-620,this.flipX,1000,1000,width,image.height,this.frame)
        
        ctx.fillStyle='rgba(255,0,0,0.5)'
        ctx.fillRect(this.x-50,this.y-this.height,100,this.height)
    }

    jump(){
        if(this.touchGrass){this.velocityY=-1800}
    }
    move(dir){
        const speed = 600
        if(dir=='left'){this.velocityX=-speed; this.flipX=true}
        else if(dir=='right'){this.velocityX=speed; this.flipX = false}
        else{this.velocityX=0}
    }
}

const entities = []


entities.push(new Sprite(100,20,entities.length,Lizen))
players.push(0)
entities.push(new Sprite(1100,30,entities.length,Zaruto))
entities.push(new Sprite(800,30,entities.length,Kimal))
enemy1 = new EnemyController(1,4)
enemy2 = new EnemyController(2,2)

function sal(){entities[0].move('right')}


const keysBoard = {
    up:false,
    left:false,
    right:false,
    o:false,
    p:false,

    w:false,
    a:false,
    d:false,
    r:false,
    t:false,
}
function KeyboardUpdate(){
    if(keysBoard.up){entities[0].jump()}
    
    if(keysBoard.left){entities[0].move('left')}
    else if(keysBoard.right){entities[0].move('right')}
    else if(keysBoard.o){entities[0].attack(1)}
    else{entities[0].move('none')}
}



function render(){
    ctx.imageSmoothingEnabled = false
    canvas.style.imageRendering = "pixelated"
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = 'green'
    ctx.fillRect(0,ground,1500,600)
    for(let i=0; i<entities.length; i++){
        entities[i].draw()
    }
}
function update(delta){
    KeyboardUpdate()
    enemy1.update(delta)
    enemy2.update(delta)
    for(let i=0; i<entities.length; i++){
        entities[i].update(delta)
    }
}



let lastTime = 0
const timestep = 1000/FPS

function gameLoop(ctime){
    const deltaTime = (ctime - lastTime)/1000

    if (ctime - lastTime >= timestep){
        update(deltaTime)
        render()
        lastTime = ctime
    }

    requestAnimationFrame(gameLoop)
}
requestAnimationFrame(gameLoop)
