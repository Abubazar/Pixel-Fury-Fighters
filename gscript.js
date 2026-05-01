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
let plr1Score = 0
let plr2Score = 0
let gameRound = 1
let gamePause = false
let totaGameRounds = 3


const gameMode = localStorage.getItem("gameMode")

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
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run", "hurt"].forEach(name => {
  Axel[name] = [new Image(),135]
  Axel[name][0].src = `assets/Axel/${name}.png`
  allImages.push(Axel[name][0])
})

const Kiara = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run", "hurt"].forEach(name => {
  Kiara[name] = [new Image(),150]
  Kiara[name][0].src = `assets/Kiara/${name}.png`
  allImages.push(Kiara[name][0])
})

const Kimal = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run", "hurt"].forEach(name => {
  Kimal[name] = [new Image(),200]
  Kimal[name][0].src = `assets/Kimal/${name}.png`
  allImages.push(Kimal[name][0])
})

const Lizen = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run", "hurt"].forEach(name => {
  Lizen[name] = [new Image(),162]
  Lizen[name][0].src = `assets/Lizen/${name}.png`
  allImages.push(Lizen[name][0])
})

const Zaruto = {};
["Attack1", "Attack2", "Death", "Idle", "Jump", "Run", "hurt"].forEach(name => {
  Zaruto[name] = [new Image(),200]
  Zaruto[name][0].src = `assets/Zaruto/${name}.png`
  allImages.push(Zaruto[name][0])
})

const allCharacters = [Axel,Kiara,Kimal,Lizen,Zaruto]
const allCharacters1 = [Zaruto,Lizen,Kimal,Kiara,Axel]

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
        this.alive=true
        this.pain=0
    }

    attack(type){
        if(this.alive){
            if(!this.attacking){
                this.frame=0
                this.atType=type
                this.attacking=true
            }
        }
    }

    hurt(){
        console.log('hurt')
        if(this.alive){
            this.hp-=5
            this.frame=0
            this.pain=1
        }
        if(this.hp<=0 && this.alive){
            this.alive=false
            roundEnd(this.id)
        }
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

        if(!this.alive){
            this.animation="Death"
        }

        if(this.pain>0){
            this.animation="hurt"
            this.pain+=1
            if(this.pain>=10){this.pain=0}
        }

        const anim = this.animation
        const image = this.character[anim][0]
        const width = this.character[anim][1]
        this.totalFrames = image.width/width
        this.stepCount+=1
        if(!this.alive && this.frame==this.totalFrames-1){
        }
        else if(this.stepCount>=animSpeed){
            this.frame = (this.frame+1)%this.totalFrames
            this.stepCount=0
        }
        

        UpDrawImage(image,this.x-500,this.y-620,this.flipX,1000,1000,width,image.height,this.frame)
        
        // ctx.fillStyle='rgba(255, 0, 0, 0.5)'
        // ctx.fillRect(this.x-50,this.y-this.height,100,this.height)
        if(this.attacking){
            let side
            if(this.frame>=this.atp && this.frame<=this.atp+2){
                if(!this.flipX){side=140}
                else{side=-200}
                // ctx.fillStyle='rgba(0, 255, 0, 0.5)'
                // ctx.fillRect((this.x-60)+side,this.y-this.height-40,180,160)
            }
        }
    }

    jump(){
        if(this.alive){
            if(this.touchGrass){this.velocityY=-1800; this.fame = 0}
        }
    }
    move(dir){
        if(this.alive){
            const speed = 600
            if(dir=='left'){this.velocityX=-speed; this.flipX=true}
            else if(dir=='right'){this.velocityX=speed; this.flipX = false}
            else{this.velocityX=0}
        }
    }
}

const entities = []
let player1, player2
switch(localStorage.getItem('player1')){
    case 'Axel':
        player1=Axel;
        break;
    case 'Kiara':
        player1=Kiara;
        break;
    case 'Kimal':
        player1=Kimal;
        break;
    case 'Lizen':
        player1=Lizen;
        break;
    case 'Zaruto':
        player1=Zaruto;
        break;
}

switch(localStorage.getItem('player2')){
    case 'Axel':
        player2=Axel;
        break;
    case 'Kiara':
        player2=Kiara;
        break;
    case 'Kimal':
        player2=Kimal;
        break;
    case 'Lizen':
        player2=Lizen;
        break;
    case 'Zaruto':
        player2=Zaruto;
        break;
}

entities.push(new Sprite(100,20,entities.length,player1))
entities.push(new Sprite(1230,20,entities.length,player2))
entities[0].opponent = entities[1]
entities[1].opponent = entities[0]
entities[1].flipX=true


let ctPlr1=0
let ctPlr2=0
if(gameMode==2 || gameMode==3){
    totaGameRounds=5
    entities[0].character=allCharacters[0]
    entities[1].character=allCharacters1[0]
}

player = 0
if(gameMode==0 || gameMode==2){aiEnemy = new EnemyController(1,localStorage.getItem('aimode'))}
else{playerB2=1}



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
    //--PLAYER 1 CONTROLS
    if(keysBoard.up){entities[player].jump()}
    
    if(keysBoard.left){entities[player].move('left')}
    else if(keysBoard.right){entities[player].move('right')}
    else if(keysBoard.o){entities[player].attack(1)}
    else if(keysBoard.p){entities[player].attack(2)}
    else{entities[player].move('none')}

    //--PLAYER 2 CONTROLS
    if(gameMode==1 || gameMode==3){
        if(keysBoard.w){entities[playerB2].jump()}
    
        if(keysBoard.a){entities[playerB2].move('left')}
        else if(keysBoard.d){entities[playerB2].move('right')}
        else if(keysBoard.r){entities[playerB2].attack(1)}
        else if(keysBoard.t){entities[playerB2].attack(2)}
        else{entities[playerB2].move('none')}
    }
}


function displayUI(){
    //520
    let hb1 = 60
    let hb2 = 700
    hb1=entities[0].hp*5.2
    hb2=entities[1].hp*5.2
    
    ctx.fillStyle = "rgb(210, 210, 210)"
    ctx.fillRect(50,50,1180,60)

    ctx.fillStyle = "rgb(126, 125, 125)"
    ctx.fillRect(60,60,520,40)
    ctx.fillRect(700,60,520,40)

    ctx.fillStyle = "rgb(194, 43, 43)"
    ctx.fillRect(60+(520-hb1),60,hb1,40)

    ctx.fillRect(700,60,hb2,40)

    ctx.fillStyle = "rgb(210, 210, 210)"
    ctx.fillRect(580,40,120,80)

    
    ctx.font = "50px pixel";

    ctx.fillStyle = "rgb(210, 210, 210)"
    ctx.fillRect(50,5,180,55)

    ctx.fillStyle = "blue"
    ctx.fillText('Human',65,50)

    if(gameMode=='0' || gameMode=='2'){
        ctx.fillStyle = "rgb(210, 210, 210)"
        ctx.fillRect(1050,5,180,55)

        ctx.fillStyle = "green"
        ctx.fillText('Cmptr',1070,50)

    }
    else if(gameMode=='1' || gameMode=='3'){
        ctx.fillStyle = "rgb(210, 210, 210)"
        ctx.fillRect(1050,5,180,55)

        ctx.fillStyle = "green"
        ctx.fillText('Human',1070,50)

    }

    ctx.fillStyle = "rgb(73, 73, 73)"
    ctx.fillText(plr1Score,590,100)
    ctx.fillText(plr2Score,665,100)

    ctx.fillStyle = "rgba(205, 205, 205, 0.68)"
    ctx.font='70px pixel'
    const txtpos = (canvas.width/2)-(ctx.measureText('Round '+gameRound).width/2)
    ctx.fillText('Round '+gameRound,txtpos,180)
}

function roundEnd(loser){
    if(loser==0){
        plr2Score+=1
    }
    else if(loser==1){
        plr1Score+=1
    }
    setTimeout(() => {
        gamePause=true
        let text='Round Ended!'
        let topPlr
        if(plr1Score>plr2Score){topPlr="Player1"}
        else{topPlr="Player2"}
        if(gameRound==totaGameRounds){text=topPlr+' is the Winner!'}
        ctx.font='110px pixel'
        const txtpos = (canvas.width/2)-(ctx.measureText(text).width/2)
        
        ctx.fillStyle = "rgba(233, 233, 233, 0.85)"
        ctx.fillText(text,txtpos,400)
        if(gameRound<totaGameRounds){
            setTimeout(() => {
                gamePause=false
                gameRound+=1

                
                if(loser==0 && totaGameRounds==5){
                    ctPlr1+=1
                    entities[0].character = allCharacters[ctPlr1]
                }
                if(loser==1 && totaGameRounds==5){
                    ctPlr2+=1
                    entities[1].character = allCharacters[ctPlr2]
                }

                entities[0].x = 100
                entities[0].y = 20

                entities[1].x = 1230
                entities[1].y = 20

                entities[0].alive=true
                entities[1].alive=true

                entities[0].hp=100
                entities[1].hp=100

                entities[0].flipX=false
                entities[1].flipX=true
            }, 2000);
        }
    }, 2000);
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
    displayUI()
}

function update(delta){
    KeyboardUpdate()
    if(gameMode==0 || gameMode==2){aiEnemy.update(delta)}
    for(let i=0; i<entities.length; i++){
        entities[i].update(delta)
    }
}



//-=GAME LOOP=-
let lastTime = 0
const timestep = 1000/FPS

function gameLoop(ctime){
    const deltaTime = (ctime - lastTime)/1000

    if (ctime - lastTime >= timestep && !gamePause){
        update(deltaTime)
        render()
        lastTime = ctime
    }

    requestAnimationFrame(gameLoop)
}


function togglePause(){
    gamePause = !gamePause
    if(gamePause){
        canvas.style.filter = "blur(3px)";
    }
    else{
        canvas.style.filter = "blur(0)";
    }
}