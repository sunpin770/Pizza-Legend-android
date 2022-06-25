class Battle {
    constructor({ennemyId, onComplete}) {    
        this.ennemy = ennemyId
        this.onComplete = onComplete
    
      
        this.combatants = {
        }

        this.activeCombatants = {
            player: null,
            ennemy: null
        }
        
        //Player Pizzas
        window.playerState.lineup.forEach(id => {
            this.addCombatant(id, "player", window.playerState.pizzas[id])
        })

        //Ennemy Pizza
        Object.keys(this.ennemy.pizzas).forEach(key => {
            this.addCombatant("e_" + key, "ennemy", this.ennemy.pizzas[key])
        })
        //Mettre les Id

        Object.keys(this.combatants).forEach(key => {    
            let combatant = this.combatants[key]
            combatant.id = key
        })

        //Items 
        this.items = []
        window.playerState.items.forEach(item => {
            this.items.push({
                ...item,
                team: "player"
            })
        })
        
        this.usedIntancesId = {}
        
      
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("battle")

        //Mettre les Perso
        this.element.innerHTML = (`
            <div class="battle-hero">
                <img src="${'/images/characters/people/hero.png'}" alt="Hero" />
            </div>

            <div class="battle-ennemy">
                <img src="${this.ennemy.src}" alt="Hero" />
            </div>
        `)
    }

    addCombatant(id, team, config) {
        this.combatants[id] = new Combatant({
            ...window.pizzas[config.pizzaId],
            ...config,
            team,
            isPlayerControlled: team === "player"
        }, this)

        //Le premier ajouter est sur le terrain
        this.activeCombatants[team] = this.activeCombatants[team] || id
    }

    init(container) {
        
        this.createElement()
        container.appendChild(this.element)

        this.playerTeam = new Team("player", "Hero")
        this.ennemyTeam = new Team("ennemy", "Richard")
        Object.values(this.combatants).forEach(combatant => {
            combatant.init(this.element)

            if (combatant.team === "player") {
                this.playerTeam.combatants.push(combatant)
            } else if (combatant.team === "ennemy") {
                this.ennemyTeam.combatants.push(combatant)
            }
        })

        this.playerTeam.init(this.element)
        this.ennemyTeam.init(this.element)
        
        this.turnCycle = new TurnCycle({
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this)
                    battleEvent.init(resolve)
                })
            },
            onWinner: winner => {
                if (winner === "player") {          
                    const playerState = window.playerState
                    Object.keys(playerState.pizzas).forEach(id => {
                        
                        const playerStatePizza = playerState.pizzas[id]
                        const wasFight = this.combatants[id]
                      
                        //Persistant Stat
                        if (wasFight) {
                            //Pizza Persistant
                            //Lors d'une défait prend du dernier notifPizza update a voir si on change 
                            playerStatePizza.attack = wasFight.attack
                            playerStatePizza.defense = wasFight.defense
                            playerStatePizza.hp = wasFight.hp
                            playerStatePizza.maxHp = wasFight.maxHp
                            playerStatePizza.level = wasFight.level
                            playerStatePizza.xp = wasFight.xp
                            playerStatePizza.maxXp = wasFight.maxXp
                            playerStatePizza.actions = wasFight.actions
                            playerStatePizza.speed = wasFight.speed
                                
                        }

                        //Persistant Item
                        playerState.items = playerState.items.filter(item => {
                            return !this.usedIntancesId[item.instanceId]
                        })
                    }) 
                    //Basic Earning Money entre 0 et 200 random
                    playerState.money += Math.floor(Math.random() * 100 + Math.random() * 100)
                    utils.createCustomEvent("moneyChanged")


                }
                this.element.remove()
                this.onComplete(winner === "player")
                utils.createCustomEvent("PlayerStateUpdated")
            }
        })

        this.turnCycle.init()
    }
}