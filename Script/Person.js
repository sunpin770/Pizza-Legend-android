class Person extends GameObject {
    constructor(config) {
        super(config);
        this.moveProgressRemain = 0;
        this.isStanding = false
        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1]
        }
        
    }

    update(state) {   
       
        this.updatePostion()
        this.updateSprite(state)
        
    }

    

    updatePostion() {
        if (this.moveProgressRemain > 0) {
        
            
            const [proprety, change] = this.directionUpdate[this.direction]
            this[proprety] += change
            
            this.moveProgressRemain -= 1

            if (this.moveProgressRemain === 0) {          
                utils.createCustomEvent("IFinishWalk",{
                    whoId: this.id
                })

            }
        }
    }

    updateSprite(state) {
        //Verifier si y'a toujours la bonne animation
        if (!state.movInput && this.moveProgressRemain == 0) {
            
            this.sprite.setAnimation("stand-"+this.direction)
        }
        if (this.moveProgressRemain > 0) {
            this.sprite.setAnimation("walk-"+this.direction)
        }
    }

    startBehavior(state, behavior) {
        this.direction = behavior.direction
      
        if (behavior.type === "walk") {
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return
            }
            state.map.moveWalls(this.x, this.y, this.direction)
            this.moveProgressRemain = 16
        }

    
        if (behavior.type === "stand") {
            this.isStanding = true
            setTimeout(() => {

                utils.createCustomEvent("IFinishStand", {
                    whoId: this.id
                })
                this.isStanding = false
            }, behavior.time)   
            
        }
        
    }
}