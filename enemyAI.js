
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

        this.hp = entities[spriteId].hp

        this.enemy.flipX=true
        this.attackCooldown = 0
        this.dodgeCooldown = 0
        this.jumpCooldown = 0
        this.decisionCooldown = 0

        this.stateTime = 0
    }

    update(delta){
        let player = entities[0]

        this.hp=this.enemy.hp
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
                const engageChance = 0.01 + this.difficulty * 0.1

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

                    // Strong bias toward fighting
                    let fightChance = 0.6 + this.difficulty * 0.25

                    // Reduce aggression in bad situations
                    if (lowHealth) fightChance -= 0.25
                    if (playerAttacking) fightChance -= 0.15

                    // Slight hesitation only on low difficulty
                    let hesitation = 0.15 * (1 - this.difficulty * 0.2)

                    if (distance < 150){
                        fightChance += 0.2
                        hesitation *= 0.3
                    }

                    if (Math.random() < hesitation){
                        newAction = "idle"
                    }
                    else if (Math.random() < fightChance){
                        if(this.enemy.opponent.hp>0){newAction = "fight"}
                    }
                    else {
                        newAction = "retreat"
                        this.intent = "none"
                    }
                }
            }

            if (this.action !== newAction){

                const forceImmediate =
                    distance < 150 && newAction === "fight"

                if (forceImmediate || this.stateTime <= 0 || this.intent === "attack"){
                    this.action = newAction
                    this.stateTime = 0.3 + Math.random() * 0.2
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

            this.enemy.attack(getRandomInt(1,2))
        }

    }
}


