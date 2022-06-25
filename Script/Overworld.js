startPosition()


//config = gameContainer
class Overlord {
    constructor(config) {
        //Init
        this.element = config
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d")
        this.gameFrameCounter = 0  
        
        //Test Area
        
    }

    startGameLoop() {
      
        const step = () => {
            //Clear the canvas 
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            const cameraPerson = {
                person: this.map.gameObject.hero,
                centerX: withGrid(10.5),
                centerY: withGrid(6),
            }
            
            //Update Game Object

            Object.values(this.map.gameObject).forEach(object => {
               
                object.update({
                    movInput: this.input.direction,
                    map: this.map
                })
            })
            //Draw LowerMap
            this.map.drawLowerMap(this.ctx, cameraPerson)

            
            //Game Object
            Object.values(this.map.gameObject).sort((a, b) => {
                return a.y - b.y
            }).forEach(object => {
                //Draw GameObject
                object.draw(this.ctx, cameraPerson)
            })

            //Draw Upper map
            this.map.drawUpperMap(this.ctx, cameraPerson)


            //Recursion On every Frame
           
            requestAnimationFrame(step)
            
            
            
        }
        step();
    }

    checkHeroPosition() {   
        document.addEventListener("IFinishWalk", e => {
            if (e.detail.whoId === "hero") {
                this.map.checkCaseEvent()
            }
        })
    }

    startMap(mapSrc,heroInitialState = null, overworld) {
        this.map = new Map(mapSrc, overworld)
        this.map.overworld = this
        const hero = this.map.gameObject.hero
        if (heroInitialState) {
            this.map.removeWalls(hero.x, hero.y)
            hero.x = heroInitialState.x
            hero.y = heroInitialState.y
            hero.direction = heroInitialState.direction
            this.map.addWalls(hero.x, hero.y)  
        }
        setTimeout(() => {
            this.map.appearObject()

        }, 10)

        this.progress.mapId = mapSrc.id
        this.progress.startingHeroX = hero.x
        this.progress.startingHeroY = hero.Y
        this.progress.startingHeroDirection = hero.direction

        
    }

    bindActionInput() {
        
        this.interactInput = new KeyPressListener("f", () => (
            this.map.checkInteraction()
        ))

        this.pauseInput = new KeyPressListener("&", () => {
            if (!this.map.cutscenePlaying) {
                this.map.startCutscene([{
                    type:"pause"
                }])
            }
        })

    }

    intro() {
        window.playerState.getPlayerName(this.map)
    }

    init() {

        //save File area
        this.progress = new Progress()
        let heroInitialState = null;
        const saveFile = this.progress.load()
        
        
        this.input = new Input()
        this.input.init()
        this.hud = new Hud()
        this.hud.init(this.element)
        playerState.moneyIcon.init(this.element)
        this.startMap(window.overworldMaps[this.progress.mapId], heroInitialState, this)
        
        
        
        this.startGameLoop()
        this.bindActionInput()
        this.checkHeroPosition()
        
        
        if (saveFile) {
            heroInitialState = {
                x: this.progress.startingHeroX,
                y: this.progress.startingHeroy,
                direction: this.progress.startingHeroDirection,
            }
        } else {
            setTimeout(() => {
                this.intro()
            }, 100)    
        }
    }

     
 
}





