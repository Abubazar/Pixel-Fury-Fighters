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

const allImages = []


const Axel = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run"].forEach(name => {
  Axel[name] = [new Image(),135]
  Axel[name][0].src = `assets/Axel/${name}.png`
  allImages.push(Axel[name][0])
})

const Kiara = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run"].forEach(name => {
  Kiara[name] = [new Image(),150]
  Kiara[name][0].src = `assets/Kiara/${name}.png`
  allImages.push(Kiara[name][0])
})

const Kimal = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run"].forEach(name => {
  Kimal[name] = [new Image(),200]
  Kimal[name][0].src = `assets/Kimal/${name}.png`
  allImages.push(Kimal[name][0])
})

const Lizen = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run"].forEach(name => {
  Lizen[name] = [new Image(),162]
  Lizen[name][0].src = `assets/Lizen/${name}.png`
  allImages.push(Lizen[name][0])
})

const Zaruto = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run"].forEach(name => {
  Zaruto[name] = [new Image(),200]
  Zaruto[name][0].src = `assets/Zaruto/${name}.png`
  allImages.push(Zaruto[name][0])
})

const bg = new Image(); bg.src = "assets/Background.png"
allImages.push(bg)

imagesLoaded = 0
for(let i=0; i<allImages.length; i++){
    allImages[i].onload = function(){
        imagesLoaded+=1
        if(imagesLoaded==allImages.length){requestAnimationFrame(gameLoop)}
    }
    
}

class Sprite{
    constructor(x, y, id, character){
        this.x = x
        this.y = y
        this.id = id
        this.velocityY=0
        this.velocityX=0
        this.height=200
        this.touchGrass=false
        this.animation='Idle'
        this.flipX=false
        this.totalFrames=0
        this.frame=0
        this.stepCount=0
        this.character=character
        this.attacking=false
        this.atType=1
        this.atp = 2
        this.opponent = null
        this.attacked=false
        this.hp=100
    }

    attack(type){
        if(!this.attacking){
            this.frame=0
            this.atType=type
            this.attacking=true
        }
    }

    hurt(){
        console.log('hurt')
        this.hp-=5
    }

    update(delta){
        this.x += this.velocityX*delta
        this.x = Math.max(50, Math.min(1230, this.x))
        
        this.velocityY+=gravity
        this.y+=this.velocityY*delta
        if(this.y >= ground){
            this.y=ground
            this.velocityY=0
            this.touchGrass=true
        }
        else{this.touchGrass=false}

        let side
        if(this.attacking && this.frame>=this.atp && this.frame<=this.atp+2){
            if(!this.flipX){side=140}
            else{side=-200}
            if (
            !(
                (this.x - 60 + side) > (this.opponent.x + 50) ||
                (this.x - 60 + side + 180) < (this.opponent.x - 50) ||
                (this.y - this.height - 40) > (this.opponent.y - this.opponent.height + this.opponent.height) ||
                (this.y - this.height - 40 + 160) < (this.opponent.y - this.opponent.height)
            )
            ) {
            // overlapping
            if(!this.attacked){this.opponent.hurt(); this.attacked=true}
            }
        }
    }
    draw(){
        
        this.animation='Idle'

        if(this.velocityX!=0){this.animation='Run'}

        if(!this.touchGrass){
            this.animation = 'Jump'
        }
        if(this.attacking){
            this.animation='Attack'+this.atType
            if(this.frame>=this.totalFrames-1){this.attacking=false; this.animation='Idle'; this.attacked=false}
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
        
        ctx.fillStyle='rgba(255, 0, 0, 0.5)'
        ctx.fillRect(this.x-50,this.y-this.height,100,this.height)
        if(this.attacking){
            let side
            if(this.frame>=this.atp && this.frame<=this.atp+2){
                if(!this.flipX){side=140}
                else{side=-200}
                ctx.fillStyle='rgba(0, 255, 0, 0.5)'
                ctx.fillRect((this.x-60)+side,this.y-this.height-40,180,160)
            }
        }
        
        ctx.fillStyle='rgb(255, 255, 255)'
        ctx.fillRect(this.x-2,this.y-2,4,4)
    }

    jump(){
        if(this.touchGrass){this.velocityY=-1800; this.fame = 0}
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
entities.push(new Sprite(1230,30,entities.length,Kiara))
entities[0].opponent = entities[1]
entities[1].opponent = entities[0]

player = 0
player2 = new EnemyController(1,4)

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
    if(keysBoard.up){entities[player].jump()}
    
    if(keysBoard.left){entities[player].move('left')}
    else if(keysBoard.right){entities[player].move('right')}
    else if(keysBoard.o){entities[player].attack(1)}
    else if(keysBoard.p){entities[player].attack(2)}
    else{entities[player].move('none')}
}



function render(){
    ctx.imageSmoothingEnabled = false
    canvas.style.imageRendering = "pixelated"
    ctx.clearRect(0, 0,canvas.width,canvas.height)
    ctx.drawImage(bg,-1000,-3850,2784*2,2379*2)
    ctx.fillStyle = 'green'
    ctx.fillRect(-1000,ground-3,9000,600)
    ctx.fillStyle = 'rgb(11, 12, 17)'
    ctx.fillRect(-1000,ground+4,9000,600)

    for(let i=0; i<entities.length; i++){
        entities[i].draw()
    }
}

function update(delta){
    KeyboardUpdate()
    player2.update(delta)
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
