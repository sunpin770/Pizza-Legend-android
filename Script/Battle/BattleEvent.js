class BattleEvent {
    constructor(event, battle) {
        this.event = event
        this.battle = battle
    }

    textMessage(resolve) {
        
        const text = this.event.text
        .replace("{CASTER}", this.event.caster?.name)
        .replace("{TARGET}", this.event.target?.name)
        .replace("{ACTION}", this.event.attack?.name)
        
        
        const message = new TextMessage({
            text: text,
            onComplete: () => {
                resolve()
            }
        })
        message.init(this.battle.element)
    }
    
    actionMenu(resolve) {
        const menu = new ActionMenu({
            caster: this.event.caster,
            ennemy: this.event.ennemy,
            items: this.battle.items,
            replacement: Object.values(this.battle.combatants).filter(combatant => {
                return  combatant.id !== this.event.caster.id && combatant.team === this.event.caster.team
            }),
            onComplete: action => {
                //L'action qu'on doit faire selon le choix fait
                resolve(action)
            }
        })
        menu.init(this.battle.element)
    }
    init(resolve) {
        this[this.event.type](resolve)
    }
    
    getAmountOfDamage(caster, target) {

        let amountOfDamage  = caster.attack * this.event.action.attack.power
        if (caster.buff?.buffAtk) amountOfDamage = amountOfDamage * caster.buff.buffAtk
        if (caster.debuff?.debuffAtk) amountOfDamage = amountOfDamage * caster.debuff.debuffAtk
        const typeAttack = this.event.action.attack.typeAttack
        const targetType = target.type
        const defenseModifier = 1 - target.defense / 100
        const efficiency = window.pizzas.getTypeEffect(typeAttack, targetType)

        amountOfDamage = Math.round(amountOfDamage * efficiency * defenseModifier)
        
        return {amountOfDamage, efficiency}
    }

    getAmountOfSpecialDamage(caster, target) {
        //Buff && debuff
        const powerOfSpeAtk = this.event.power
        let amountOfDamage  = caster.attackSpe * powerOfSpeAtk
        if (caster.buff?.buffAtkSpe) amountOfDamage = amountOfDamage * caster.buff.buffAtkSpe
        if (caster.debuff?.debuffAtkSpe) amountOfDamage = amountOfDamage * caster.debuff.debuffAtkSpe
        const defenseModifier = 1 - target.defenseSpe / 100
        
        amountOfDamage = Math.round(amountOfDamage * defenseModifier)
       
        return amountOfDamage
    }

    getAmountOfHeal(caster, target) {
        //Forte chance que ça change, Donne un pourcentage entre x et x % selon les stats
        const powerOfHeal = this.event.power
        let amountOfHeal = caster.attackSpe * powerOfHeal
        const defenseModifier = 1 - target.defenseSpe / 100
        amountOfHeal = Math.round(amountOfHeal * defenseModifier)
        return amountOfHeal
    }

    async stateChange(resolve) {
        const {caster, target, damage, specialDamage, recovery, power, status} = this.event
        const who = this.event.onCaster ? caster : target
        let efficiency = null;
        if (damage) {
            const battleInfo = this.getAmountOfDamage(caster, target)
            this.amountOfDamage = battleInfo.amountOfDamage
            efficiency = battleInfo.efficiency
            target.update({
                hp: target.hp - this.amountOfDamage
            })
            target.pizzaElement.classList.add("taking-damage")
            
        } else if (specialDamage) {
            this.amountOfDamage = this.getAmountOfSpecialDamage(target, caster)
            
            who.update({
                hp: who.hp - this.amountOfDamage
            })
            caster.pizzaElement.classList.add("taking-damage")
        }

        if (recovery) {
            if (typeof(recovery) === "number") {
                this.amountOfHeal = recovery
            } else {
                this.amountOfHeal = this.getAmountOfHeal(caster, target)
            }
           
            
            let newHp = caster.hp + this.amountOfHeal
            if (newHp > caster.maxHp) {
                newHp = caster.maxHp
            }
            caster.update({
                hp: newHp
            })
        }

        if (status) {
          
            const power = this.event.action.attack.power
            const statusId = status.id
            const statusConfig = window.attack[statusId]
            let whoIsBuff = who
            
            if (statusConfig.buff) {
                whoIsBuff = await this.teamMenu()          
            }
            const effect = this.getStatusEffect(statusConfig)

            whoIsBuff.update({
                [effect]: {
                    name: statusConfig.name,
                    caster: caster, 
                    expireIn: status.expireIn,
                    power: power,
                }
            })
           
            if (statusConfig.buff || statusConfig.debuff) {
                whoIsBuff.getBuff()
            }
        }

        if (status === null) {
            who.update({
                buff: null,
                debuff: null,
                specialDamage: null,
            })
            
        }

        await utils.wait(600)

        let feedBackText;
        if(damage) {
            feedBackText = this.getFeedBackMessage(efficiency)
        } 

        target.pizzaElement.classList.remove("taking-damage")
        caster.pizzaElement.classList.remove("taking-damage")
        this.battle.playerTeam.update()
        this.battle.ennemyTeam.update()
        
        if (feedBackText) {
            //Efficency + nb Dmg
            const feedBackTextMessage = new TextMessage({
                text: feedBackText,
                onComplete: () => {
                    //Txt avec les dégats afficher
                    const textDamage = new TextMessage({
                        text: `${target.name} a subit ${this.amountOfDamage} dégats`,
                        onComplete: () => {
                            resolve()
                        }
                    })
                    textDamage.init(this.battle.element)
                }
            })
            feedBackTextMessage.init(this.battle.element)

        } else if (damage) {
            //nb Dmg
            const textMessage = new TextMessage({
                text: `${target.name} a subit ${this.amountOfDamage} dégats`,
                onComplete: () => {
                    resolve()
                }
            })
            textMessage.init(this.battle.element)
        } else if (specialDamage) {
            //nb Special Damage
            const feedBackTextMessage = new TextMessage({
                text: `${caster.name} subit ${this.amountOfDamage} dégats`,
                onComplete: () => {
                    resolve()
                }
            }) 
            feedBackTextMessage.init(this.battle.element)
        } else if (recovery) {
            const feedBackTextMessage = new TextMessage({
                text: `${caster.name} se soigne de ${this.amountOfHeal} Hp.`,
                onComplete: () => {resolve()}
            })
            feedBackTextMessage.init(this.battle.element)
        } else {
            resolve()          
        }


    }

    animation(resolve) {
        window.battleAnimation[this.event.animation](this.event, resolve)
    }

    async switch(resolve) {
        const replacer = this.event.replacer
        //reset l'ancienne pizza
        let prevCombatant = this.battle.activeCombatants[replacer.team]
        prevCombatant = this.battle.combatants[prevCombatant]      
        this.battle.activeCombatants[replacer.team] = null;
        prevCombatant.update()

        await utils.wait(400)

        //On met le nouveau
        this.battle.activeCombatants[replacer.team] = replacer.id
        replacer.update()

        await utils.wait(400)

        //Update Team Hud
    
        this.battle.playerTeam.update()
        this.battle.ennemyTeam.update()
        

        resolve()

    }

    teamMenu() {
        const menu = new TeamMenu({battle: this.battle})
        return new Promise((resolve) => {
            menu.init(resolve)
        })
    }

    replacementMenu(resolve) {
        const allReplacer =  Object.values(this.battle.combatants).filter(combatant => {
            return combatant.team === this.event.team && combatant.hp > 0
        })
        const replacementMenu = new ReplacementMenu({
            replacements: allReplacer,
            onComplete: (replacer) => {
                resolve(replacer)
            }
        })
 
        replacementMenu.init(this.battle.element)

        
    }

    giveXp(resolve) {
        //Async Give Xp wait Menu -> Enter Player
        let amount = this.event.xp
        let who = this.event.combatant
        const step = async () => {
            
            if (amount > 0 && who.maxXp - who.xp > 50) {
                amount -= 3
                who.xp += 3
            } else if (amount > 0 && who.maxXp - who.xp <= 50) {
                amount -= 1
                who.xp += 1

                if (who.xp === who.maxXp) {

                    //Event for Lvl Up
                    utils.createCustomEvent("pizzaLvlUp", {
                        whoPizz: who
                    })
                    
                    
                    await who.notifPizza.init(this.battle.element)
                    who.update()
                    
                }
            }

            if (amount > 0) {
                who.update()
                requestAnimationFrame(step)
                return
            }
            
            resolve()
            return
        }
        requestAnimationFrame(step)
    }

    getStatusEffect(statusConfig) {
        if (statusConfig.buff) return "buff"
        if (statusConfig.debuff) return "debuff"
        if (statusConfig.specialDamage) return "specialDamage"
        if (statusConfig.recovery) return "recovery"
    } 

    getFeedBackMessage(efficiency) {
        if (efficiency > 1) {
            return "C'est super efficace"
        } else if (efficiency < 1) {
            return "C'est pas très éfficace"
        } else {
            return null
        }
    }
}
