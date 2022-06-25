
class NotifPizza {
    constructor({currentPizza}) {
        this.currentPizza = currentPizza
        this.currentPlayerStatePizza = {}
    }

    getOptions() {
        return [
            {
                label: `Niveau: ${this.currentPlayerStatePizza.level}`,
                descriptions: "",
                disable: true,
                handler: () => {}
            },
            {
                label: `Pv: ${this.currentPizza.hp} / ${this.currentPlayerStatePizza.maxHp}`,
                descriptions: "",
                disable: true,
                handler: () => {}
            },
            {
                label: `Attaque: ${this.currentPlayerStatePizza.attack}`,
                descriptions: "",
                disable: true,
                handler: () => {}
            },
            {
                label: `Defense: ${this.currentPlayerStatePizza.defense}`,
                descriptions: "",
                disable: true,
                handler: () => {}
            },    
            {
                label: `DefenseSpe: ${this.currentPlayerStatePizza.defenseSpe}`,
                descriptions: "",
                disable: true,
                handler: () => {}
            },  
            {
                label: `Speed: ${this.currentPlayerStatePizza.speed}`,
                descriptions: "",
                disable: true,
                handler: () => {}
            },       
        ]
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("overlayMenu")
        this.element.classList.add("notifPizza")
    }

    getNextValue() {
        this.nextValue = {
            niveau: 1,
            maxHp: this.currentPizza.maxHp - this.currentPlayerStatePizza.maxHp,
            attack: this.currentPizza.attack - this.currentPlayerStatePizza.attack,
            defense: this.currentPizza.defense - this.currentPlayerStatePizza.defense,
            defenseSpe: this.currentPizza.defenseSpe - this.currentPlayerStatePizza.defenseSpe,
            speed: this.currentPizza.speed - this.currentPlayerStatePizza.speed
        } 
    }
    
    getAllOptions() {
        this.allOptions = document.querySelectorAll(".overlayMenu.notifPizza .options button")
        //Sauf le back Options
    }

    displayNextValue() {

        const nextValueKey = Object.keys(this.nextValue) 
        for (let i = 0; i < this.allOptions.length; i++) {
            if (i >= nextValueKey.length) {
                break
            }
            let element = document.createElement("p")
            element.textContent = `+ ${this.nextValue[nextValueKey[i]]}`
            element.classList.add("nextValue")
            this.allOptions[i].appendChild(element)
        }
       
    }

    close() {
        this.element.remove()
        this.menu.end()
    }

    updateData() {      
        //Mettre a jour les données lors de l'initialisation du combattant
        this.currentPlayerStatePizza.attack = this.currentPizza.attack
        this.currentPlayerStatePizza.defense = this.currentPizza.defense
        this.currentPlayerStatePizza.defenseSpe = this.currentPizza.defenseSpe
        this.currentPlayerStatePizza.hp = this.currentPizza.hp
        this.currentPlayerStatePizza.maxHp = this.currentPizza.maxHp
        this.currentPlayerStatePizza.level = this.currentPizza.level
        this.currentPlayerStatePizza.xp = this.currentPizza.xp
        this.currentPlayerStatePizza.maxXp = this.currentPizza.maxXp
        this.currentPlayerStatePizza.speed = this.currentPizza.speed
        this.currentPlayerStatePizza.actions = this.currentPizza.actions
        
    }

    update(resolve) {
      
        this.currentPlayerStatePizza.attack = this.currentPizza.attack
        this.currentPlayerStatePizza.defense = this.currentPizza.defense
        this.currentPlayerStatePizza.defenseSpe = this.currentPizza.defenseSpe
        this.currentPlayerStatePizza.hp = this.currentPizza.hp
        this.currentPlayerStatePizza.maxHp = this.currentPizza.maxHp
        this.currentPlayerStatePizza.level = this.currentPizza.level
        this.currentPlayerStatePizza.xp = this.currentPizza.xp
        this.currentPlayerStatePizza.maxXp = this.currentPizza.maxXp
        this.currentPlayerStatePizza.speed = this.currentPizza.speed
        this.currentPlayerStatePizza.actions = this.currentPizza.actions
        
        const nextValue = document.querySelectorAll(".nextValue")[0]
        nextValue.addEventListener("animationend", async () => {
            this.menu.setOptions(this.getOptions())
            await utils.wait(800)
            this.close()
            resolve()
        }, {once: true})
    }

    init(container) {
        this.createElement()
        this.getNextValue()
        this.menu = new KeyboardMenu()
        this.menu.init(this.element)
        this.menu.setOptions(this.getOptions())
        container.append(this.element)
        this.getAllOptions()
        this.displayNextValue()

        return new Promise(resolve => {
            this.update(resolve)
        })


    }
}