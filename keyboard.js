if (localStorage.getItem('')){}




window.addEventListener('keydown', (e) =>{
    const key = e.code

    if (key == 'ArrowUp'){
        keysBoard.up=true
    }
    if (key == 'ArrowRight'){
        keysBoard.right=true
    }
    if (key == 'ArrowLeft'){
        keysBoard.left=true
    }
    if (key == 'KeyO'){
        keysBoard.o=true
    }
    if (key == 'KeyP'){
        keysBoard.p=true
    }

    if (key == 'KeyW'){
        keysBoard.w=true
    }
    if (key == 'KeyA'){
        keysBoard.a=true
    }
    if (key == 'KeyD'){
        keysBoard.d=true
    }
    if (key == 'KeyR'){
        keysBoard.r=true
    }
    if (key == 'KeyT'){
        keysBoard.t=true
    }
})


window.addEventListener('keyup', (e) =>{
    const key = e.code

    if (key == 'ArrowUp'){
        keysBoard.up=false
    }
    if (key == 'ArrowRight'){
        keysBoard.right=false
    }
    if (key == 'ArrowLeft'){
        keysBoard.left=false
    }
    if (key == 'KeyO'){
        keysBoard.o=false
    }
    if (key == 'KeyP'){
        keysBoard.p=false
    }

    if (key == 'KeyW'){
        keysBoard.w=false
    }
    if (key == 'KeyA'){
        keysBoard.a=false
    }
    if (key == 'KeyD'){
        keysBoard.d=false
    }
    if (key == 'KeyR'){
        keysBoard.r=false
    }
    if (key == 'KeyT'){
        keysBoard.t=false
    }
})

