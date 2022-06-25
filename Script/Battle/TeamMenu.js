class TeamMenu {
    constructor(config) {
        this.battle = config.battle

    }

    getOptions(resolve) {
        //Back Options
        const playerPizza = Object.values(this.battle.combatants).filter(pizza => {
            return pizza.hp > 0 && pizza.isPlayerControlled 
        })

        return playerPizza.map(pizza => {
            return {
                label: pizza.name,
                descriptions: "",
                handler: () => {
                    this.close()
                    resolve(pizza)
                }
            }
        })
      
        
    }
    
    close() {
        this.element.remove()
        this.menu.end()
    }
    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("whoBuff")
    }

    init(resolve) {
        this.createElement()
        this.menu = new KeyboardMenu({
            descriptionsContainer: this.battle.element
        })
        this.menu.init(this.element)
        this.menu.setOptions(this.getOptions(resolve))
        this.battle.element.append(this.element)
        
        
    }
}