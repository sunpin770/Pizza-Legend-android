class ReplacementMenu {
    constructor(config) {
        this.replacements = config.replacements
        this.onComplete = config.onComplete
    }

    decide() {
        this.menuSubmit(this.replacements[0])
    }
    showMenu(container) {
        this.keyboardMenu = new KeyboardMenu()
        this.keyboardMenu.init(container)
        this.keyboardMenu.setOptions(
            this.replacements.map(replacer => {
                return {
                    label: replacer.name,
                    descriptions: replacer.descriptions,
                    handler: () => {
                        this.menuSubmit(replacer)
                    }
                }
            })
        )
    }

    menuSubmit(replacer) {
        this.keyboardMenu?.end()
       
        this.onComplete(replacer)

    }
    init(container) {
        if (this.replacements[0].isPlayerControlled)  {
            this.showMenu(container)
        } else {
            this.decide()
        }
    }
}