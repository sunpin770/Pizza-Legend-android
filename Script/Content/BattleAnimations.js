
window.battleAnimation = {
    async spin(event, onComplete) {
        
        const element = event.caster.pizzaElement
        const animationName = event.caster.team === "player" ? "spin-move-attack-right" : "spin-move-attack-left"
        element.classList.add(animationName)

        element.addEventListener("animationend", () => {
            element.classList.remove(animationName)
        }, {once: true})

        await utils.wait(100)

        onComplete()
    }
}