class Npc extends Person {
    constructor(config) {
        super(config);


    }

    update(state) {
        
        this.updatePostion()
        this.updateSprite(state)
        
    }

    startBehavior(state, behavior) {
        this.direction = behavior.direction
       
        if (behavior.type === "walk") {
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                this.moveProgressRemain = 0
                //Si une cinématique on anule et on fait la cinématique, -> Puis on se remet a l'étape inital
                if (state.map.cutscenePlaying) {
                    utils.createCustomEvent("IFinishWalk",{
                        whoId: this.id
                    })
                    this.behaviorLoopIndex -= 1
                    return
                }

                //Les Npc force pour se déplacer
                setTimeout(() => {
                    this.startBehavior(state, behavior)
                }, 10)     
                return       
            }
            
            this.moveProgressRemain = 16
            state.map.moveWalls(this.x, this.y, this.direction)

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