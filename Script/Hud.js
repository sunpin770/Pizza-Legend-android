class Hud {
    constructor() {
        this.ui = []
    }

    update() {
        this.ui.forEach(pizzaUi => {
            pizzaUi.update(window.playerState.pizzas[pizzaUi.id]) // Class = Combatant
        })
    }

    createElement() {

        if (this.element) {
            this.element.remove()
            this.ui = []
        }
        this.element = document.createElement("div")
        this.element.classList.add("hud")
        const playerState = window.playerState

        playerState.lineup.forEach(key => {
            const pizza = playerState.pizzas[key]
            const pizzaUi = new Combatant({
                id: key,
                ...window.pizzas[pizza.pizzaId],
                ...pizza,
            }, null)
            pizzaUi.createElement()
            this.ui.push(pizzaUi)
            this.element.appendChild(pizzaUi.hudElement)
        })
        this.update()
    }
    init(container) {
        this.createElement()
        container.appendChild(this.element)

        //Dés qu'on change les data du player on update le Hud
        document.addEventListener("PlayerStateUpdated", () => {
            this.update()
        })

        document.addEventListener("lineupChanged", () => {
            this.createElement()
            container.appendChild(this.element)
        })
    }
}