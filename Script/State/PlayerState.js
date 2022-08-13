
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
            src: "images/icons/Money Sprite.png"
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
            {type: "textMessage", text:"Tell me your name.", getPlayerName:true}, 
            {type:"walk", direction:"up", who:"npc2"},
            {type:"walk", direction:"up", who:"npc2"},
            //Put Dialogue
            {type:"textMessage", text:"Welcome to PizzaMania!", who:"??"},
            {type:"textMessage", text:`I'm ${tutorName} a pizza Teacher.`, who:tutorName},
            {type:"textMessage", text:"This world is similar to another world named 'Pokemon' but with Pizzas.", who: tutorName},
            {type:"textMessage", text:"On the left, there is a Pizza Stone which is an item that can give you your first Pizza.", who: tutorName},
            {type:"textMessage", text:"In this one you be able to select only one among 3 Pizzas. The 2 that are left can be unlocked soon.", who: tutorName},
            // {type:"textMessage", text:"This world work with types, to win fight you need to have the right type of Pizza.", who:"??"},
            {type:"textMessage", text:"Choose the right one!", who: tutorName},
            {type:"walk", direction:"left", who:"npc2"},
            {type:"walk", direction:"left", who:"npc2"},
            {type:"walk", direction:"left", who:"npc2"},
            
        ]
        
        map.startCutscene(event)
    }
}


window.playerState = new PlayerState()
