
class Map {
    constructor(config, overworld) {
        
        this.upperImage = new Image()
        this.upperImage.src = config.upperSrc || ""
        this.lowerImage = new Image()
        this.lowerImage.src = config.lowerSrc || ""
        this.overworld = overworld;
        this.walls = config.walls || {}
        this.gameObject = config.gameObject
        this.caseEvent = config.caseEvent || {}
        this.cutscenePlaying = false
        this.id = config.id
        
    }

    drawUpperMap(ctx, cameraPerson) {
        let x = cameraPerson.centerX - cameraPerson.person.x + 8 // 8 + character sprite
        let y = cameraPerson.centerY - cameraPerson.person.y + 18 // 18 = character sprite
        ctx.drawImage(
            this.upperImage,
            x, y
        )
    }

    drawLowerMap(ctx, cameraPerson) {
        let x = cameraPerson.centerX - cameraPerson.person.x + 8 // 8 + character sprite
        let y = cameraPerson.centerY - cameraPerson.person.y + 18 // 18 = character sprite
        ctx.drawImage(
            this.lowerImage,
            x, y
        )
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x, y} = nextPosition(currentX, currentY, direction)
       
        return this.walls[`${x}, ${y}`] || false
    }

    addWalls(x, y) {
        this.walls[`${x}, ${y}`] = true
    }

    removeWalls(x, y) {
        delete this.walls[`${x}, ${y}`] 
    }

    moveWalls(wasX, wasY, direction) {
        const {x ,y} = nextPosition(wasX, wasY, direction)
        this.removeWalls(wasX, wasY)
        this.addWalls(x, y)  
    }

    onEventBlock() {
        return this.intersection[`${this.gameObject.hero.x}, ${this.gameObject.hero.y}`] || false
    }


    appearObject() {
        Object.keys(this.gameObject).forEach(key => {

            let object = this.gameObject[key]
            object.id = key
            //System pour voir si l'object doit apparait ou pas ex: une clé qui est pickup
            object.appear(this)
        })
    }

    async startCutscene(events) {
        this.cutscenePlaying = true
        let isChangingMap = false
        for (let i = 0; i < events.length; i++) {     
            if (events[i].type === "changeMap") { 
                isChangingMap = true
                //Reset position + Behavior Npcs
            }
            const eventHandler = new OverworldEvent({
                map: this,
                eventConfig: events[i]
            })
            //On attend le await avant de continuer dans la boucle
            const result = await eventHandler.init();
            if (result === "LOST_BATTLE" || result === "CLOSED_CRAFT_MENU") {
                break;
            }
            
        }
    
        this.cutscenePlaying = false
        
        
        if (isChangingMap) return
        Object.values(this.gameObject).forEach(obj => {
            obj.doBehaviorEvent(this)
        })
       
        utils.createCustomEvent("endOfCutscene")
    }

    checkCaseEvent() {
        //Add requires System
        const hero = this.gameObject['hero']
        const match = this.caseEvent[`${hero.x}, ${hero.y}`] || false
        let rightEvent = []
        if (match.length && !this.cutscenePlaying) {
            //Look for the right Event with Story Flag  
            rightEvent = utils.checkRequires(match)     
                   
            this.startCutscene(rightEvent)
        } else if (match && !this.cutscenePlaying) {
            this.startCutscene(match.event)
        }
    }   
    
    checkInteraction() {
        //A Changer pour modifier le Player
   
        const hero = this.gameObject['hero']
        const nextCords = nextPosition(hero.x, hero.y, hero.direction)

        const match = Object.values(this.gameObject).find(object => {
            return `${object.x}, ${object.y}` === `${nextCords.x}, ${nextCords.y}`
        })
       
        if (!this.cutscenePlaying && match && match.talking.length) {
            const theScenario = match.talking.find(scenario => {
                return (scenario.requires || []).every(storyFlags => {
                    return playerState.storyFlags[storyFlags]
                })
            })
            theScenario && this.startCutscene(theScenario.box)
        } 
    }


    resetPosition() {
        this.allNpcsId = Object.keys(this.gameObject).filter(gameObject => {         
            return gameObject.includes("npc")      
        })
        //Remet la position d'origine des Npcs
        this.allNpcsId.forEach(npcId => {
            const npc = this.gameObject[npcId]
            npc.x = npc.startX
            npc.y = npc.startY
            npc.direction = npc.startDirection
            //Wall
            this.removeWalls(npc.x, npc.y)
            this.addWalls(npc.startX, npc.startY)
            //Reset Behavior
            npc.behaviorLoopIndex = 0
            npc.moveProgressRemain = 0
            //Finir le walking pour tout les Npcs
            utils.createCustomEvent("IFinishWalk", {
                whoId: this.id
            })
            
        })
    }
}