
class Input {
    constructor(config) {
        this.callStackDirection = []
        this.keyDirection = {
            "z": "up",
            "s": "down",
            "q": "left",
            "d": "right"
        }
        
    }
    
    get direction() {
        return this.callStackDirection[0]
    }

    init() {
        document.addEventListener("keypress", e => {
            let direction = this.keyDirection[e.key]

            if (direction && this.callStackDirection.indexOf(direction) == -1) {
                this.callStackDirection.unshift(direction)
            }
            
        })

        document.addEventListener("keyup", e => {
            const direction = this.keyDirection[e.key]
            const index = this.callStackDirection.indexOf(direction)

            if (index > -1) {
                this.callStackDirection.splice(index, 1)
            }
           
        })
    }
} 