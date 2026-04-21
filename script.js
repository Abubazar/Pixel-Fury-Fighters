const canvas = document.getElementById("lookhole")
const ctx = canvas.getContext('2d')
canvas.width=200
canvas.height=200
ctx.imageSmoothingEnabled = false
canvas.style.imageRendering = "pixelated"
const char = new Image()
char.src = "assets/Lizen/Idle.png"

char.onload = function(){requestAnimationFrame(playIdle)}


frame = 0
totalFrames = 9
frameWidth = 162
animSpeed=5
step =0

let lastTime = 0
const FPS = 60
const timestep = 1000/FPS

function playIdle(ctime){
const deltaTime = (ctime - lastTime)/1000
    if (ctime - lastTime >= timestep){
        ctx.clearRect(0,0,200,200)
        ctx.drawImage(char,frameWidth + (frameWidth*frame),0,162,162, -150,-150,500,500)
        step = (step+1)%animSpeed
        if(step==animSpeed-1){
            frame = (frame+1)%9
        }
        lastTime = ctime
    }
    requestAnimationFrame(playIdle)
}

const dialog = document.getElementById("dialog")
const dialogBox = document.getElementById("dialog-box")
function playGame(mode){
    if(mode==0){}
}