//--CANVAS SETUP
const canvas = document.getElementById("screen")
const ctx = canvas.getContext('2d')

ctx.imageSmoothingEnabled = false
canvas.style.imageRendering = "pixelated"

canvas.height = 720
canvas.width = 1280

//--GAME VARIABLES
const FPS=60
const gravity = 0.5
const animSpeed=5
const ground = 650

class Sprite{
    constructor(x,y){
        this.x = x
        this.y = y
        this.velocityY=0
        this.height=200
        this.touchGrass=false
    }

    update(delta){
        this.velocityY+=gravity
        this.y+=this.velocityY
        if(this.y > ground-this.height){
            this.y=ground-this.height
            this.velocityY=0
        }
    }
    draw(){
        ctx.fillRect(this.x,this.y,100,this.height)
    }
}

const entities = []


entities.push(new Sprite(100,20))
entities.push(new Sprite(300,30))

function sal(){entities[0].velocityY=-20}

function render(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for(let i=0; i<entities.length; i++){
        entities[i].draw()
    }
}
function update(delta){
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
