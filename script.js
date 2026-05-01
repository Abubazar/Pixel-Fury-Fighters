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
animSpeed = 5
step = 0

player1 = 'none'
player2 = 'none'
aimode = 1

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
const dialogBox = document.getElementById("dia-area")

currentgamemode=0
function playGame(mode){
    dialog.style.visibility = 'visible'
    currentgamemode=mode
    if(mode==0){
        document.getElementById('player1Desc').textContent = "Player1 (Human)"
        document.getElementById('player2Desc').textContent = "Player2 (Computer)"
    }
    else if(mode==1){
        document.getElementById('player1Desc').textContent = "Player1 (Human)"
        document.getElementById('player2Desc').textContent = "Player2 (Human)"
    }
    if(mode==2){
        dialogBox.style.visibility='hidden'
    }
}

function cancelDia(){
    dialog.style.visibility='hidden'

    if(player1==null){}
    else{
        document.getElementById(player1+'ch1').style.backgroundColor="rgb(72, 72, 72)"
        
    }
    if(player2==null){}
    else{
        document.getElementById(player2+'ch2').style.backgroundColor="rgb(72, 72, 72)"
        
    }
}

let lastChar
function player1Char(character){
    if(lastChar==null){lastChar=character}
    else{
        document.getElementById(lastChar+'ch1').style.backgroundColor="rgb(72, 72, 72)"
        
    }
    document.getElementById(character+'ch1').style.backgroundColor="rgb(207, 207, 207)"
    lastChar=character
    player1=character
}

let lastChar2
function player2Char(character){
    if(lastChar2==null){lastChar2=character}
    else{
        document.getElementById(lastChar2+'ch2').style.backgroundColor="rgb(72, 72, 72)"
        
    }
    document.getElementById(character+'ch2').style.backgroundColor="rgb(207, 207, 207)"
    lastChar2=character
    player2=character
}


function enterGame(){
    if(player1=='none' || player2=='none')return
    else{
        localStorage.setItem('player1', player1)
        localStorage.setItem('player2', player2)
        localStorage.setItem('aimode', document.getElementById('aimode').value)
        localStorage.setItem('gameMode', currentgamemode)
        window.location.href = "game.html"
    }
}

function settings(){
    dialog.style.visibility = 'visible'
}

let allKeys = {
    left:'ArrowLeft',
    right:'ArrowRight',
    jump:'ArrowUp',
    att1:'KeyO',
    att2:'KeyP',

    left1:'KeyA',
    right1:'KeyD',
    jump1:'KeyW',
    att11:'KeyR',
    att12:'KeyT',
}

function recalibrateKeys(){
    //--PLAYER1
    document.getElementById('btSetleft').textContent = allKeys.left
    document.getElementById('btSetright').textContent = allKeys.right
    document.getElementById('btSetjump').textContent = allKeys.jump
    document.getElementById('btSetatt1').textContent = allKeys.att1
    document.getElementById('btSetatt2').textContent = allKeys.att2
    //--PLAYER2
    document.getElementById('btSetBleft').textContent = allKeys.left1
    document.getElementById('btSetBright').textContent = allKeys.right1
    document.getElementById('btSetBjump').textContent = allKeys.jump1
    document.getElementById('btSetBatt1').textContent = allKeys.att11
    document.getElementById('btSetBatt2').textContent = allKeys.att12

}

if(localStorage.getItem('keysMap')){
    allKeys = JSON.parse(localStorage.getItem('keysMap'))
    recalibrateKeys()
}


let editBtn = ''
let keyToEdit=''

function handleKey(e) {
    e.preventDefault()
    allKeys[keyToEdit] = e.code
    document.getElementById(editBtn).textContent = e.code
    localStorage.setItem("keysMap", JSON.stringify(allKeys));

    window.removeEventListener("keydown", handleKey)
}


function setKey(key){
    keyToEdit = key
    editBtn = 'btSet'+key
    document.getElementById(editBtn).textContent = 'waiting...'
    window.addEventListener("keydown", handleKey)
}

function setKey1(key){
    keyToEdit = key+'1'
    editBtn = 'btSetB'+key
    document.getElementById(editBtn).textContent = 'waiting...'
    window.addEventListener("keydown", handleKey)
}
