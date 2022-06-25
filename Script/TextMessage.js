class TextMessage {
    constructor({text, onComplete, npcName, getPlayerName}) {
        this.elem = null
        this.text = text
        this.onComplete = onComplete
        this.npcName = npcName
        this.getPlayerName = getPlayerName
    }

    createElement() {
        this.elem = document.createElement("div")
        this.elem.classList.add("TextMessage")
       
        if (this.npcName) {
            this.elem.innerHTML = (`
                <p class="TextMessage-p"><p>
                <div class="npc-name">${this.npcName}</div>
                <button class="TextMessage-button">Next</button>
            `)
        } else {
            this.elem.innerHTML = (`
                <p class="TextMessage-p"><p>
                <button class="TextMessage-button">Next</button>
            `)
        }
        
        this.typeWriter = new TypeWriter({
            element: this.elem.querySelector(".TextMessage-p"),
            text: this.text
        })
        this.button = this.elem.querySelector("button")
        const test = () => {
             this.done()
         }
        this.button.addEventListener("click", test)
        
        this.actionListener = new KeyPressListener("Enter", () => {
            if (this.typeWriter.isDone) {
                this.done()    
            } else {
                this.typeWriter.warpToDone()
            }
        })
        
    }

    getNameForm() {
        this.form = document.createElement("input") 
        this.form.placeholder = "Ton nom..."
        this.form.classList.add("input-playername")
    }


    done() {
        this.button.removeEventListener("click", test)  
        this.elem.remove()
        this.actionListener.unbind()
        this.onComplete()

        if (!this.getPlayerName) return
        window.playerState.name = this.form.value
        this.form.remove()
    }

    init(container) {
        this.createElement()
        container.appendChild(this.elem)
        this.typeWriter.init()


        if (!this.getPlayerName) return
        this.getNameForm()
        container.appendChild(this.form)
        this.form.focus() 
    }
}