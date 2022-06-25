class TypeWriter {
    constructor(config) {
        this.element = config.element
        this.text = config.text
        this.speed = config.speed || 70
        this.isDone = false
    }

    visibleText(charactersList) {
        let nextCharacter = charactersList.splice(0, 1)[0]
        
        nextCharacter.span.classList.add("visible")
        
        if (charactersList.length > 0) {
            this.timeout = setTimeout(() => {
                this.visibleText(charactersList)
            }, nextCharacter.delayAfter)
        } else {
            this.isDone = true
        }
    }

    warpToDone() {
        clearTimeout(this.timeout)
        this.isDone = true
        this.element.querySelectorAll("span").forEach((s) => {
            s.classList.add("visible")
        })

    }
    init() {
        let characters = []
        this.text.split("").forEach(character => {
            const span = document.createElement("span")
            span.textContent = character
            this.element.appendChild(span)

            characters.push({
                span: span,
                delayAfter: character === " " ? 0 : this.speed
            })
        })

        this.visibleText(characters)
    }
}