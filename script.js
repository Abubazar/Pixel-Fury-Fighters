const canvas = document.getElementById("lookhole")
const ctx = canvas.getContext('2d')

const char = new Image()
char.src = "assets/Lizen/Idle.png"

char.onload = playIdle()

frame = 0
totalFrames = 9
function playIdle(){

}