class EnemyController{
    constructor(spriteId,difficulty){
        this.spriteId = spriteId
        this.difficulty = difficulty
        this.enemy = entities[spriteId]
    }
    

    update(){
        const action='chase'

        if(action=='chase'){
            if(Math.abs(entities[players[0]].x-this.enemy.x)>200*this.difficulty){
                if(entities[players[0]].x-this.enemy.x>0){
                    this.enemy.move('right')
                }
                else{
                    this.enemy.move('left')
                }
            }
        }
    }
}


