
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

if(localStorage.getItem('keysMap')){
    allKeys = JSON.parse(localStorage.getItem('keysMap'))
}

window.addEventListener('keydown', (e) =>{
    const key = e.code

    //--PLAYER 1
    if (key == allKeys.jump){
        keysBoard.up=true
    }
    if (key == allKeys.right){
        keysBoard.right=true
    }
    if (key == allKeys.left){
        keysBoard.left=true
    }
    if (key == allKeys.att1){
        keysBoard.o=true
    }
    if (key == allKeys.att2){
        keysBoard.p=true
    }

    //--PLAYER 2
    if (key == allKeys.jump1){
        keysBoard.w=true
    }
    if (key == allKeys.left1){
        keysBoard.a=true
    }
    if (key == allKeys.right1){
        keysBoard.d=true
    }
    if (key == allKeys.att11){
        keysBoard.r=true
    }
    if (key == allKeys.att12){
        keysBoard.t=true
    }
})


window.addEventListener('keyup', (e) =>{
    const key = e.code

    //--PLAYER 1
    if (key == allKeys.jump){
        keysBoard.up=false
    }
    if (key == allKeys.right){
        keysBoard.right=false
    }
    if (key == allKeys.left){
        keysBoard.left=false
    }
    if (key == allKeys.att1){
        keysBoard.o=false
    }
    if (key == allKeys.att2){
        keysBoard.p=false
    }

    //--PLAYER 2
    if (key == allKeys.jump1){
        keysBoard.w=false
    }
    if (key == allKeys.left1){
        keysBoard.a=false
    }
    if (key == allKeys.right1){
        keysBoard.d=false
    }
    if (key == allKeys.att11){
        keysBoard.r=false
    }
    if (key == allKeys.att12){
        keysBoard.t=false
    }
})

