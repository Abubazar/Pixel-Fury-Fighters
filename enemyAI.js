
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

   return Math.floor(Math.random() * (max - min + 1)) + min
}


class EnemyController{
    constructor(spriteId, difficulty){
        this.spriteId = spriteId
        this.difficulty = difficulty
        this.enemy = entities[spriteId]

        this.action = "idle"
        this.intent = "none"

        this.hp = 100

        this.attackCooldown = 0
        this.dodgeCooldown = 0
        this.jumpCooldown = 0
        this.decisionCooldown = 0

        this.stateTime = 0
    }

    update(delta){
        let player = entities[players[0]]

        const dx = player.x - this.enemy.x
        const dy = player.y - this.enemy.y
        const distance = Math.abs(dx)

        const safeDistance = 200 + (4 - this.difficulty) * 120
        const closeDistance = 140
        const stopDistance = 60

        this.decisionCooldown -= delta
        this.attackCooldown -= delta
        this.jumpCooldown -= delta
        this.stateTime -= delta

        if (this.decisionCooldown <= 0){

            this.decisionCooldown = 0.2 + Math.random() * 0.15

            // INTENT
            if (this.intent === "none"){
                const engageChance = 0.08 + this.difficulty * 0.12

                if (Math.random() < engageChance){
                    this.intent = "attack"
                    this.stateTime = 2 + Math.random() * this.difficulty
                }
            } else {
                if (this.stateTime <= 0){
                    this.intent = "none"
                }
            }

            // PLAYER MOVEMENT
            const playerAdvancing =
                Math.sign(player.vx) === Math.sign(dx)

            let newAction = this.action

            // DEFAULT (DEFENSIVE)
            if (this.intent === "none"){

                if (distance < safeDistance){
                    newAction = "retreat"
                } else {
                    newAction = "idle"
                }

            }

            // ENGAGING
            else {

                // --APPROACH
                if (distance > closeDistance){

                    if (playerAdvancing){
                        const pressure = (closeDistance / distance)
                        const retreatBias =
                            pressure + (1 - this.difficulty * 0.2)

                        if (Math.random() < retreatBias){
                            newAction = "retreat"
                        } else {
                            newAction = "chase"
                        }
                    } else {
                        newAction = "chase"
                    }

                }

                // --CLOSE COMBAT
                else {

                    const lowHealth = this.hp < 30
                    const playerAttacking = player.isAttacking

                    let retreatChance = 0

                    if (lowHealth) retreatChance += 0.4
                    if (playerAttacking) retreatChance += 0.3
                    retreatChance += (1 - this.difficulty * 0.2)

                    const hesitation =
                        0.15 + (1 - this.difficulty * 0.2)

                    if (Math.random() < hesitation){
                        newAction = "idle"
                    }
                    else if (Math.random() < retreatChance){
                        newAction = "retreat"
                        this.intent = "none"
                    } else {
                        newAction = "fight"
                    }
                }
            }

            if (this.action !== newAction){
                if (this.stateTime <= 0 || this.intent === "attack"){
                    this.action = newAction
                    this.stateTime = 0.4 + Math.random() * 0.3
                }
            }
        }

        //--JUMP LOGIC
        const shouldJump =
            dy < -60 &&
            distance < 250 &&
            this.jumpCooldown <= 0

        if (shouldJump){
            const jumpChance = 0.15 + this.difficulty * 0.15

            if (Math.random() < jumpChance){
                this.enemy.jump()
                this.jumpCooldown = 0.8 + Math.random() * 0.4
            }
        }

        //--MOVEMENT
        if (this.action === "chase"){

            if (distance > stopDistance){
                this.enemy.move(dx > 0 ? "right" : "left")
            } else {
                this.enemy.move("none")
            }

        }
        else if (this.action === "retreat"){

            if (distance < safeDistance){
                this.enemy.move(dx > 0 ? "left" : "right")
            } else {
                this.enemy.move("none")
            }

        }
        else{
            this.enemy.move("none")
        }

        //--ATTACK
        if (this.action === "fight"){

            if (this.attackCooldown <= 0){
                this.enemy.attack?.()

                this.attackCooldown =
                    1.2 - (this.difficulty * 0.2)
            }
        }

    }
}


