
class PlayerState {
    constructor() {
        this.name = "hero"
        this.pizzas = {}
        
        this.statPizzaUpdate()
        this.lineup = []
        this.items = []
        
        this.storyFlags = {}
        this.numberFlags = 0;
        this.moneyIcon = new IconSprite({
            src: "/images/icons/Money Sprite.png"
        })
        this.money = 0
        
    }

    swapLineup(oldId, newId) {
        
        const oldIndex = this.lineup.indexOf(oldId)
        this.lineup[oldIndex] = newId
        utils.createCustomEvent("lineupChanged")
       
    }

    moveToFront(frontId) {
        this.lineup = this.lineup.filter(id => id !== frontId)
        this.lineup.unshift(frontId)
        utils.createCustomEvent("lineupChanged")
    }

    addPizza(pizzaId) {
        const newId = `p${Date.now()}`+ Math.floor(Math.random() * 9999)
        //A changer les stats

        this.pizzas[newId] = pizzas.getPizzaStat(pizzaId)

        if (this.lineup.length < 4) {
            this.lineup.push(newId)
        }

        utils.createCustomEvent("lineupChanged")
    }

    statPizzaUpdate() {
     
        document.addEventListener("pizzaLvlUp", (e) => {
            const pizza = e.detail.whoPizz
            const getNewAttack = () => { 
                const newAttack = this.pizzaGetNewAttack(pizza)
                if (!newAttack) return
                pizza.actions.push(newAttack)
            }

            //Set up Stat
            window.pizzas.addStat(pizza)

            //Set up New Attack
            if (pizza.level > 6 && pizza.level % 5 === 0) {
                getNewAttack()
            } else if (pizza.level > 3 && pizza.level % 3 === 0) {
                getNewAttack()
            } else if (pizza.level < 3 && pizza.level % 2 === 0) {
                getNewAttack()
            }
          
        })
    }

    pizzaGetNewAttack(pizza) {
        let newAction;
        for (let i = 0;i < pizza.canGetActions.length; i++) {
            
            //Check new Action who the pizza don't have, a optmiser en cherchant dans la boucle a chaque fois
            if (!pizza.actions.includes(pizza.canGetActions[i]) ) {
                newAction = pizza.canGetActions[i]
                break;
            };
        }
        return newAction
    }

    getPlayerName(map) {
      
        const introNpc = map.gameObject.npc2
        map.removeWalls(introNpc.x, introNpc.y)
        map.gameObject.npc2.x = withGrid(5)
        map.gameObject.npc2.y = withGrid(10)
        map.gameObject.npc2.direction = "up"
        const event = [
            {type: "textMessage", text:"Dit-moi ton Pseudo ?", getPlayerName:true}, 
            {type: "textMessage", text:"Toi là"},
            {type:"walk", direction:"up", who:"npc2"},
            {type:"walk", direction:"up", who:"npc2"},
            {type: "textMessage", text:"__Intro-Cinématique__", who:"Mister V"},
            {type: "textMessage", text:"Pour l'instant j'ai pas de skin mais c'est black Mister V", who:"Mister V"},
            {type: "textMessage", text:"Comme tu sais on a tous les 2 une mission, le même objectif", who:"Mister V"},
            {type: "textMessage", text:"Pour l'accomplir je vais t'aider a fabriquer ta premier pizza", who:"Mister V"},
            {type: "textMessage", text:"Puis tu vas t'entrainer avec d'autre chef Pizza du coin", who:"Mister V"},
            {type: "textMessage", text:"Quand t'aura le niveau nécessaire on iras dans 7 pays différents pour imposer la vrai Pizza.", who:"Mister V"},
            {type: "textMessage", text:"Bon pour créer ta première pizza tu vas sur le truc à droite.", who:"Mister V"},
            {type: "textMessage", text:"C'est une pierre à pizza du futur avec ça tu peux faire une pizza de A à Z.", who:"Mister V"},
            {type:"walk", direction:"left", who:"npc2"},
            {type:"walk", direction:"left", who:"npc2"},
            {type:"walk", direction:"left", who:"npc2"},
            
        ]
        
        map.startCutscene(event)
    }
}


window.playerState = new PlayerState()
