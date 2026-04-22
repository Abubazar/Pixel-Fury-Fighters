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
        keysBoard.left=true
    }
    if (key == 'KeyP'){
        keysBoard.left=true
    }

    if (key == 'KeyW'){
        keysBoard.left=true
    }
    if (key == 'KeyA'){
        keysBoard.left=true
    }
    if (key == 'KeyD'){
        keysBoard.left=true
    }
    if (key == 'KeyR'){
        keysBoard.left=true
    }
    if (key == 'KeyT'){
        keysBoard.left=true
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
        keysBoard.left=false
    }
    if (key == 'KeyP'){
        keysBoard.left=false
    }

    if (key == 'KeyW'){
        keysBoard.left=false
    }
    if (key == 'KeyA'){
        keysBoard.left=false
    }
    if (key == 'KeyD'){
        keysBoard.left=false
    }
    if (key == 'KeyR'){
        keysBoard.left=false
    }
    if (key == 'KeyT'){
        keysBoard.left=false
    }
})

