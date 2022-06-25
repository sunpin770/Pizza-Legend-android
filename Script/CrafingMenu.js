class CraftingMenu {
    constructor({pizzas, onComplete, overworld}) {
        this.pizzas = pizzas
        this.onComplete = onComplete
    }   

    getOptions() {
     
        const menuOptions = this.pizzas.map(id => {
            const base = window.pizzas[id]
            return {
                label: base.name,
                descriptions: base.descriptions,
                handler: () => {
                    playerState.addPizza(id)
                    this.close()
                   
                }
            }
        })
        const backOptions = {
            label: "Back",
            descriptions: "Retour en Arrière",
            handler: () => {
                this.close(true)
            }
        }
        menuOptions.push(backOptions)
        return menuOptions
        
    }
    close(didClose = false) {
        this.keyboardMenu.end()
        this.element.remove()
        this.onComplete(didClose)
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("overlayMenu")
        this.element.innerHTML =(`
            <h2>Créer ta pizza</h2>
        `)
    }

    updatePizza() {
        //Retourne que les pizza que le joueur ne possède pas
        const listOfPlayerPizzaId = Object.values(playerState.pizzas).map(pizza => {
            return pizza.pizzaId
        })

        this.pizzas = this.pizzas.filter(id => {
            return !listOfPlayerPizzaId.includes(id)
        })
        
    }
    init(container) {
        this.createElement()
        this.updatePizza()
        this.keyboardMenu = new KeyboardMenu({
            descriptionsContainer: container
        })
        this.keyboardMenu.init(this.element)
        this.keyboardMenu.setOptions(this.getOptions())

        container.appendChild(this.element)

    }
}