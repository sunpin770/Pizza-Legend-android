class Shop extends GameObject {
    constructor(config) {
        super(config)
    }

    getOptions() {
        return [
            {
                label:'Huile à Pizza',
                descriptions: "Soin de faible qualité",
                right: () => {
                    return "200$"
                },
                handler: () => {
                    this.buy("basicHealingItem", 200)
                }

            },
            {
                label:'Huile à Pizza +',
                descriptions: "Soin de moyenne qualité",
                right: () => {
                    return "850$"
                },
                handler: () => {
                    this.buy("superHealingItem", 850)
                }

            },
            {
                label:'Huile à Pizza +',
                descriptions: "Soin de grande qualité",
                right: () => {
                    return "1550$"
                },
                handler: () => {
                    this.buy("hyperHealingItem", 1550)
                }

            },
            {
                label:'Purification',
                descriptions: "Purifier votre pizza",
                right: () => {
                    return "1$"
                },
                handler: () => {
                    this.buy("resetStatus", 1)
                }

            },
            {
                label:'Back',
                descriptions: "Quitter",
                handler: () => {
                    this.close()
                }

            },
        ]
    }
    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("overlayMenu")
        this.element.innerHTML = (`
        <h2>Shop Menu</h2>
        `)
     
    }

    buy(actionsId, price) {
        if (playerState.money < price) return
        playerState.money -= price
        const newInstanceId = `h${Date.now()}`+ Math.floor(Math.random() * 9999) 
        playerState.items.push({actionsId, instanceId: newInstanceId})
        utils.createCustomEvent("moneyChanged")
    }

    close() {
        this.element.remove()
        this.menu.end()
        this.onComplete()
    }

    init(container) {
        this.createElement()
        this.menu = new KeyboardMenu({
            descriptionsContainer: container
        })
        this.menu.init(this.element)
        this.menu.setOptions(this.getOptions())
        container.appendChild(this.element)
    }
}