class TurnCycle {
    constructor({battle, onNewEvent, onWinner}) {
        this.battle = battle
        this.onNewEvent = onNewEvent
        this.onWinner = onWinner
        this.currentTeam = "player" // A rendre modifiable
    }

    async turn() {

        //Pre Event, qui fait quoi
        const casterId = this.battle.activeCombatants[this.currentTeam]
        const caster = this.battle.combatants[casterId]
        this.caster = caster
        const ennemyTeam = this.currentTeam === "player" ? "ennemy" : "player"
        const ennemyId = this.battle.activeCombatants[ennemyTeam]
        const ennemy = this.battle.combatants[ennemyId]
        this.ennemy = ennemy
        
        this.action = await this.onNewEvent({
            type:"actionMenu",
            caster: caster,
            ennemy: ennemy
        })

        this.ennemyAction = await this.onNewEvent({
            type:"actionMenu",
            caster: ennemy,
            ennemy: caster
        })
        //Si on switch on fait d'autre truc
        
        if (this.action.replacement) {          
            await this.onNewEvent({
                type:"switch",
                replacer: this.action.replacement
            })
            this.caster = this.action.replacement
         
            await this.ennemyDoActions()
            let teamDead = await this.anyoneDead()  
            if (teamDead === "winner") return
            await this.PlayerPostEvent(teamDead)
            await this.ennemyPostEvent(teamDead)
            teamDead = await this.anyoneDead()
            if (teamDead === "winner") return
            await this.playerExpiredEvent(teamDead)
            await this.ennemyExpiredEvent(teamDead)
            this.nextTurn()
            return
        }


        if (this.action.instanceId) {
            //Enlever les items pour l'overworld
            this.battle.usedIntancesId[this.action.instanceId] = true

            //Enlever les items du combats
            this.battle.items = this.battle.items.filter(item => {
                return this.action.instanceId !== item.instanceId
            })
        }
       
        
        if (this.caster.speed > this.ennemy.speed) {
           
          
            await this.playerDoActions()
            let teamDead = await this.anyoneDead()  
            if (teamDead === "winner") return
            await this.ennemyDoActions(teamDead)
            teamDead = await this.anyoneDead(teamDead)
            if (teamDead === "winner") return
            await this.ennemyPostEvent(teamDead)
            await this.PlayerPostEvent(teamDead)
            //Object Dead
            teamDead = await this.anyoneDead(teamDead)
            if (teamDead === "winner") return       
            await this.playerExpiredEvent(teamDead)
            await this.ennemyExpiredEvent(teamDead)
            
        } else {
            await this.ennemyDoActions()        
            let teamDead = await this.anyoneDead()  
            if (teamDead === "winner") return
            await this.playerDoActions(teamDead)
            teamDead = await this.anyoneDead(teamDead)
            if (teamDead === "winner") return
            await this.PlayerPostEvent(teamDead)      
            await this.ennemyPostEvent(teamDead)
            teamDead = await this.anyoneDead(teamDead)
            if (teamDead === "winner") return
            await this.playerExpiredEvent(teamDead)
            await this.ennemyExpiredEvent(teamDead)
        }
        
        this.nextTurn()
        return
    }

    nextTurn() {  
        this.turn()
    }

    getWinningTeam() {
        //Object avec les 2 teams en clé
        let aliveTeams = {}
        Object.values(this.battle.combatants).forEach(combatant => {
            if (combatant.hp > 0) {
                aliveTeams[combatant.team] = true
            }
        })

        if (!aliveTeams["player"]) { return "ennemy"}
        if (!aliveTeams["ennemy"]) { return "player"}
        return null
    }

   
    async playerDoActions(dead) {
        
        if (dead === "player") return
        const resultingEvent =  this.action.attack.succes
        
            //Event on fais les bails
            for (let i = 0; i < resultingEvent.length; i++) {
                const event = {
                    ...resultingEvent[i],
                    action: this.action,
                    attack: this.action.attack,
                    caster: this.caster,
                    target: this.ennemy
                }
              
                await this.onNewEvent(event)
            }
        return new Promise(resolve => {
            resolve()
        })
    }
    
    async ennemyDoActions(dead) {
        if (dead === "ennemy") return
        const ennemyEvent = this.ennemyAction.attack.succes
            for (let i = 0; i < ennemyEvent.length; i++) {
                const eventEn = {
                    ...ennemyEvent[i],
                    action: this.ennemyAction,
                    attack: this.ennemyAction.attack,
                    caster: this.ennemy,
                    target: this.caster,
                }
                await this.onNewEvent(eventEn)
            }
        
        return new Promise(resolve => {
            resolve()
        })
    }

    async playerExpiredEvent(dead) {
        if (dead === "player") return
        const casterExpiredEvent = this.caster.decrementStatus()
        for (let i = 0; i < casterExpiredEvent.length; i++) {
            const event = {
                ...casterExpiredEvent[i],
                action: this.action,
                attack: this.action.attack,
                caster: this.caster,
                target: this.ennemy,
            }
            await this.onNewEvent(event)
        }
    }

    async ennemyExpiredEvent(dead) {
        if (dead === "ennemy")  return
        const ennemyExpiredEvent = this.ennemy.decrementStatus()
        for (let i = 0; i < ennemyExpiredEvent.length; i++) {
            const event = {
                ...ennemyExpiredEvent[i],
                action: this.ennemyAction,
                attack: this.ennemyAction.attack,
                caster: this.ennemy,
                target: this.caster,
            }
            await this.onNewEvent(event)
        }
    }
    async anyoneDead(teamAlreadyDead) {
        const oneIsDead = this.caster.hp <= 0 || this.ennemy.hp <= 0
        
        if(!oneIsDead) return

        const who = this.caster.hp > 0 ? this.ennemy : this.caster
        if (teamAlreadyDead) {
            if (who.team === teamAlreadyDead) return teamAlreadyDead
        }
        
        await this.onNewEvent({
            type:"textMessage", text:`${who.name} est mort!!`
        })

        if (who === this.ennemy) {
            const alivePizza = this.caster
            const xp = who.givesXp

            await this.onNewEvent({
                type:"textMessage", text:` ${alivePizza.name} a gagné ${xp} XP !`
            })

            await this.onNewEvent({ 
                type:"giveXp",
                xp: xp,
                combatant: alivePizza
            })
        }
        //Victory ?
        const winner = this.getWinningTeam()

        if (winner) {
            await this.onNewEvent({
                type:"textMessage",
                text:`${winner === "player" ? playerState.name : this.battle.ennemy.name} a gagné`
            })
            this.onWinner(winner)
            return "winner"
        }

        const replacer = await this.onNewEvent({
            type:"replacementMenu",
            team: who.team
        })

        await this.onNewEvent({
            type: "switch",
            replacer: replacer
        })

        await this.onNewEvent({
            type:"textMessage",
            text:`${replacer.name} veut dahack`
        })
        const team = who.team
      
        return new Promise(resolve => {
            resolve(team)
        })
    }

    async PlayerPostEvent(dead) {
        if (dead === "player") return
        const casterPostEvent = this.caster.getPostEvent()
       
        for (let i = 0; i < casterPostEvent.length; i++) {
            const event = {
                ...casterPostEvent[i],
                caster: this.caster,
                target: this.ennemy,
            }
            await this.onNewEvent(event)
        }

        return new Promise(resolve => {
            resolve()
        })

    }

    async ennemyPostEvent(dead) {
        if (dead === "ennemy") return
        const ennemyPostEvent = this.ennemy.getPostEvent()
        for (let i = 0; i < ennemyPostEvent.length; i++) {
            const ennemyEvent = {
                ...ennemyPostEvent[i],
                caster: this.ennemy,
                target: this.caster,
            }
            await this.onNewEvent(ennemyEvent)
        }

        return new Promise(resolve => {
            resolve()
        })
    }
    async init() {
        await this.onNewEvent({
            type: "textMessage",
            text: "Ca veut dahack"
        })

        this.turn()
    }

    
}