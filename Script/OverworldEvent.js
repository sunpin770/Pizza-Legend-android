class OverworldEvent {
    constructor({map, eventConfig}) {
        this.map = map
        this.event = eventConfig
        this.container = document.querySelector(".game-container")
     
    }

    stand(resolve) {
        
        const who = this.map.gameObject[this.event.who]

        who.startBehavior({
            map: this.map
        }, {
            type: this.event.type,
            direction: this.event.direction,
            time: this.event.time
        })

        const completeHandler = e => {  
            if (e.detail.whoId === who.id) {
                document.removeEventListener("IFinishStand", completeHandler)          
                resolve()
            }
        }
        document.addEventListener("IFinishStand", completeHandler)
    }
    //Wall of the Player
    //Behavior of Npc when he walking
    walk(resolve) {
        const who = this.map.gameObject[ this.event.who ]
        
        who.startBehavior({
            map: this.map
        }, {
            type: this.event.type,
            direction: this.event.direction
        })      

        const completeHandler = e => {  
            if (e.detail.whoId === who.id) {              
                document.removeEventListener("IFinishWalk", completeHandler)    
                resolve()
            }
        }
        document.addEventListener("IFinishWalk", completeHandler)
    }

    textMessage(resolve) {
        if (this.event.faceHero) {
            const obj = this.map.gameObject[this.event.faceHero]   
        
            obj.direction = utils.oppositeDirection(this.map.gameObject["hero"].direction)
        }
        const text = this.event.text
        .replace("{playerName}", playerState.name)
        const npcName = this.event.who
        const getPlayerName = this.event.getPlayerName ? true : false
        const message = new TextMessage({text, npcName, getPlayerName, onComplete: () => {
            resolve()
        }})
        message.init(document.querySelector(".game-container"))
    }

    changeMap(resolve) {
        const sceneTransition = new SceneTransition()
        const map = window.overworldMaps[this.event.map]
        const overworld = this.map.overworld
        sceneTransition.init(document.querySelector(".game-container"), () => {
            this.map.overworld.startMap(map,{
                x: this.event.x,
                y: this.event.y,
                direction: this.event.direction
            }, overworld)
            overworld.map.resetPosition()
            resolve()   
            sceneTransition.fadeOut()
        })
    }

    battle(resolve) {
        const ennemyId = window.ennemies[this.event.ennemyId]
        const battleScene = new Battle({
            ennemyId,
            onComplete: (didWin) => {
                resolve(didWin ? "WON_BATTLE" : "LOST_BATTLE")
            }
        })    
        battleScene.init(this.container)
    }

    pause(resolve) {
        
        const pauseMenu = new PauseMenu({
            progress: this.map.overworld.progress,
            onComplete: () => {
                resolve()
            }
        })
        pauseMenu.init(this.container)
        
    }

    addStoryFlags(resolve) {
        const cutsceneListener = new CutsceneListener({map: this.map})
        playerState.storyFlags[this.event.flag] = true
        playerState.numberFlags += 1
        resolve()
        cutsceneListener.listenOnFlag(this.event.flag)
    }

    craftingMenu(resolve) {
        const menu = new CraftingMenu({
            pizzas: this.event.pizzas,
            onComplete: (didClose) => {
                resolve(didClose ? "CLOSED_CRAFT_MENU" : "USED_CRAFT_MENU")
            }
        })
        menu.init(this.container)
    }

    healTeam(resolve) {
        playerState.lineup.forEach(id => {
            const pizza = playerState.pizzas[id]
            pizza.hp = pizza.maxHp
        })

        utils.createCustomEvent("PlayerStateUpdated")

        resolve()
    }

    appearNpc({npcId, x, y}) {
        const npcData = window.npcData[npcId]
        this.map.gameObject[npcId] = {
            ...npcData,
            x: withGrid(x),
            y: withGrid(y),
        }
    }

    earnMoney(resolve) {
        const amoutOfMoney = this.event.money  
        playerState.money += amoutOfMoney
        utils.createCustomEvent("moneyChanged")
        resolve()
    }

    shopMenu(resolve) {
        
        const whichShop = this.map.gameObject[this.event.which]
        whichShop.onComplete = () => {
            resolve()
        }
        whichShop.init(this.map.overworld.element)
    }
    init() {
        
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }
}