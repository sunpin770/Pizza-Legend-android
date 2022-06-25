class KeyPressListener {
    constructor(key, callback) {
        this.keySafe = true
        this.key = key
        this.callback = callback
        this.keyDownFunction = (e) => {
            this.keyDown(e)
        }
            
        this.keyUpFunction = (e) => {
            this.keyUp(e)
        }

        document.addEventListener("keypress", this.keyDownFunction)
        document.addEventListener("keyup",this.keyUpFunction)
    }

    unbind() {      
        document.removeEventListener("keypress", this.keyDownFunction)
        document.removeEventListener("keyup", this.keyUpFunction)
    }

    rebind() {
        document.addEventListener("keypress", (e) => {
            this.keyDownFunction(e)
        })
        document.addEventListener("keyup", (e) => {
            this.keyUpFunction(e)
        })
    }

    keyDown(e) {
        if (e.key === this.key && this.keySafe) {      
            this.keySafe = false
            this.callback()
        }
    }

    keyUp(e) {
        if (e.key === this.key) {
            this.keySafe = true
        }
    }
}