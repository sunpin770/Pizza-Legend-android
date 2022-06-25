
class Sprite {
    constructor(config) {

        this.gameObject = config.gameObject
        this.image = new Image()
        this.image.src = config.src
        
        
        if (config.useShadow) {
            this.shadow = new Image()
            this.shadow.src = "images/characters/shadow.png"
            this.shadow.onload = () => {
                this.shadowLoaded = true
            }
        }

        this.image.onload = () => {
            this.imageLoaded = true
        }


        //Animation & Inital State 

        this.animation = config.animation || {
            "stand-down": [ [0,0] ],
            "stand-up": [ [0,2] ],
            "stand-left": [ [0,3] ],
            "stand-right": [ [0,1] ],
            "walk-down": [ [0,0], [1,0], [0,0], [3,0] ],
            "walk-up": [ [0,2], [1,2], [0,2], [3,2] ],
            "walk-left": [ [0,3], [1,3], [0,3], [3,3] ],
            "walk-right": [ [0,1], [1,1], [0,1], [3,1] ]
        }
        this.currentAnimation = config.currentAnimation || "stand-down"
        this.currentAnimationFrame = 0
        this.animationFrameLimit = config.animationFrameLimit || 8
        this.animationProgress = this.animationFrameLimit

    }

    get frame() {
        
        return this.animation[this.currentAnimation][this.currentAnimationFrame]
    }

    updateAnimation() {
        //Faire défiler Les Frames
        if (this.animationProgress > 0) {
            this.animationProgress -= 1
        } else {
            this.animationProgress = this.animationFrameLimit
            this.currentAnimationFrame += 1
        }

        if (this.frame == undefined) {
            this.currentAnimationFrame = 0
        }
    }
    
    setAnimation(key) {
        
        if (key != this.currentAnimation)  {
            this.currentAnimation = key
            this.animationProgress = this.animationFrameLimit
            this.currentAnimationFrame = 0
        }
    }

    draw(ctx, cameraPerson) {
        let x = this.gameObject.x + cameraPerson.centerX - cameraPerson.person.x
        let y = this.gameObject.y + cameraPerson.centerY - cameraPerson.person.y
        
        
        let [spriteX, spriteY] = this.frame
       
        if (this.shadowLoaded) {
            ctx.drawImage(
                this.shadow,
                0, 0,
                32, 32,
                x, y,
                32, 32
            )
        }

        if (this.imageLoaded) {
            ctx.drawImage(
                this.image,
                utils.caseSprite(spriteX), utils.caseSprite(spriteY),
                32, 32,
                x, y,
                32, 32
            )
        }
        

        this.updateAnimation()
    }

  

}