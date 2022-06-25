class SceneTransition {
    constructor() {
        this.element = null
    }

    init(container, callback) {
        this.element = document.createElement("div")
        this.element.classList.add("sceneTransition")

        container.appendChild(this.element)

        this.element.addEventListener("animationend", () => {
            callback()
        }, {once: true})

    }

    fadeOut() {
        this.element.classList.add("fadeOut")
        this.element.addEventListener("animationend", () => {
            this.element.remove()
        }, {once: true})
    }
}