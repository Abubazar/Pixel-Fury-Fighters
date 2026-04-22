//--CANVAS SETUP
const canvas = document.getElementById("screen")
const ctx = canvas.getContext('2d')

ctx.imageSmoothingEnabled = false
canvas.style.imageRendering = "pixelated"

canvas.height = 720
canvas.width = 1280

//--GAME VARIABLES
const FPS=60
const gravity = 25
const animSpeed=5
const ground = 650
const players = []

class Sprite{
    constructor(x, y, id){
        this.x = x
        this.y = y
        this.id = id
        this.velocityY=0
        this.velocityX=0
        this.height=200
        this.touchGrass=false
    }

    update(delta){
        this.x+=this.velocityX*delta

        this.velocityY+=gravity
        this.y+=this.velocityY*delta
        if(this.y > ground-this.height){
            this.y=ground-this.height
            this.velocityY=0
            this.touchGrass=true
        }
        else{this.touchGrass=false}
    }
    draw(){
        ctx.fillRect(this.x,this.y,100,this.height)
    }

    jump(){
        if(this.touchGrass){this.velocityY=-900}
    }
    move(dir){
        const speed = 400
        if(dir=='left'){this.velocityX=-speed}
        else if(dir=='right'){this.velocityX=speed}
        else{this.velocityX=0}
    }
}

const entities = []


entities.push(new Sprite(100,20,entities.length))
players.push(0)
entities.push(new Sprite(1100,30,entities.length))
enemy1 = new EnemyController(1,1)

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
    else{entities[0].move('none')}
}



function render(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for(let i=0; i<entities.length; i++){
        entities[i].draw()
    }
}
function update(delta){
    KeyboardUpdate()
    enemy1.update()
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
