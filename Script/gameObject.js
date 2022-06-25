class GameObject {
    constructor(config) {
        this.id = null
        this.isAppeared = false
        this.x = config.x
        this.y = config.y 
        this.direction = config.direction || 'down'
        this.behavior = config.behavior
        this.behaviorLoop = this.checkBehaviorEvent() || []
        this.behaviorLoopIndex = 0
        this.isBehave = false
        this.talking = config.talkingBox || []
        this.currentStoryFlagsUpdate = playerState.numberFlags
        
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "",
            x: this.x,
            y: this.y,
            useShadow: config.useShadow || null
        })
    }

    update(state) {

    }

    appear(map) {

        this.isAppeared = true
        if (this.previousPosition) {
            this.x = this.previousPosition.x
            this.y = this.previousPosition.y
            map.addWalls(this.previousPosition.x, this.previousPosition.y)
        } else {
            map.addWalls(this.x, this.y)
        }
        this.doBehaviorEvent(map)
    }

    disappear(map) {
        this.isAppeared = false
        map.removeWalls(this.x, this.y)
        //Innacesible
        this.previousPosition = {
            x: this.x,
            y: this.y
        }
        this.x = withGrid(100)
        this.y = withGrid(100)
    }
    
    draw(ctx, cameraPerson) {
        this.sprite.draw(ctx, cameraPerson)
    }

    checkBehaviorEvent() {
        if (!this.behavior) return
        let behaviorLoop = utils.checkRequires(this.behavior)
        return behaviorLoop
    }
    async doBehaviorEvent(map) {
        if (this.behaviorLoop.length === 0 || map.cutscenePlaying || this.isStanding || !this.isAppeared || this.isBehave)  {       
            return
        }
        this.isBehave = true

        const eventConfig = this.behaviorLoop[this.behaviorLoopIndex]
        eventConfig.who = this.id
        
        const eventHandler = new OverworldEvent({map, eventConfig})

        await eventHandler.init();
       
        this.behaviorLoopIndex += 1
        
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0
            if (this.currentStoryFlagsUpdate !== playerState.numberFlags) {
                this.currentStoryFlagsUpdate = playerState.numberFlags
                this.behaviorLoop = this.checkBehaviorEvent()
            }

        }
        this.isBehave = false
        this.doBehaviorEvent(map)

    }
}