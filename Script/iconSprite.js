class IconSprite {
    constructor(config) {
        this.image = new Image()
        this.image.src = config.src
        this.image.onload = () => {
            this.imageLoaded = true
        }
 
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("iconHud")
        this.moneyText = document.createElement("p")
        this.moneyText.textContent = `${playerState.money}`
        this.element.appendChild(this.moneyText)
        this.element.appendChild(this.image)
    }

    update() {
        this.moneyText.textContent = `${playerState.money}`
    }

    init(container) {
        this.createElement()
        container.appendChild(this.element)
        document.addEventListener("moneyChanged", () => {
            this.update()
        })
    }
}