class Combatant {
    constructor(config, battle) {
        this.battle = battle 
        this.buff = null;
        this.debuff = null;
        this.specialDamage = null;
        this.recovery = null;
        this.statusEffects = ["buff", "debuff", "specialDamage", "recovery"]
        Object.keys(config).forEach(key => {
            // Stat informations
            this[key] = config[key]
        })
        this.notifPizza = new NotifPizza({currentPizza: this})
        this.notifPizza.updateData()
        //Mettre le hp = maxHp de base
        this.hp = typeof(this.hp) === "undefined" ? this.maxHp : this.hp
    

    }

    init(container) {
        this.createElement()
        container.appendChild(this.hudElement)
        container.appendChild(this.pizzaElement)
        this.update()
    }
    
    get hpPercent() {
        const percent = this.hp / this.maxHp * 100
        return percent > 0 ? percent : 0
    }

    get xpPercent() {
        return this.xp / this.maxXp * 100
    }

    get isActive() {
        return this.battle?.activeCombatants[this.team] === this.id
    }

    get givesXp() {
        //Voir un leveling System
        let bonusLvl = this.level - 1
        return 100 + 50 * bonusLvl
    }


    createElement() {
        this.hudElement = document.createElement('div')
        this.hudElement.classList.add("combatant")
        this.hudElement.setAttribute("data-combatant", this.id)
        this.hudElement.setAttribute("data-team", this.team)
        this.hudElement.innerHTML =  (`
            <p class="combatant-name">${this.name}</p>
            <p class="combatant-level">${this.level}</p>
            <div class="combatant-character-container">
                <img class="combatant-character" src="${this.src}" alt="${this.name}" />
            </div>
            <img class="combatant-type" src="${this.icon}" alt="${this.type}" />
            <svg viewBox="0 0 26 3" class="combatant-life-container">
                <rect x=0 y=0 width="0%" height = 1 fill="#82ff71"" />
                <rect x=0 y=1 width="0%" height = 2 fill="#3ef126"" />
            </svg>
            <svg viewBox="0 0 26 2" class="combatant-xp-container">
                <rect x=0 y=0 width="0%" height = 1 fill="#ffd76a"" />
                <rect x=0 y=1 width="0%" height = 1 fill="#ffc934"" />
            </svg>
            <div class="combatant-status">
                <p class="combatant-status-buff"></p>
                <p class="combatant-status-debuff"></p>
                <p class="combatant-status-specialDamage"></p>
                <p class="combatant-status-recovery"></p>
            </div>
        `)

        this.pizzaElement = document.createElement('img')
        this.pizzaElement.classList.add("pizza")
        this.pizzaElement.setAttribute("src", this.src)
        this.pizzaElement.setAttribute("alt", this.name)
        this.pizzaElement.setAttribute("data-team", this.team)

        this.hpFills = this.hudElement.querySelectorAll(".combatant-life-container > rect")
        this.xpFills = this.hudElement.querySelectorAll(".combatant-xp-container > rect")
        this.hudLevel = this.hudElement.querySelector(".combatant-level")
    }

    update(changes = {}) {
        
        Object.keys(changes).forEach(key => {
            this[key] = changes[key]
        })

        //Independancies Status effect
        

        this.hudElement.setAttribute("data-active", this.isActive)
        this.pizzaElement.setAttribute("data-active", this.isActive)
        this.hudLevel.textContent = this.level

        this.hpFills.forEach(fill => {
            fill.style.width = `${this.hpPercent}%`
        })
        // A Voir pour Faire 1 forEach + perf
        this.xpFills.forEach(fill => {
            fill.style.width = `${this.xpPercent}%`
        }) 
        
       
        this.allStatusDisplay()     

    }

    allStatusDisplay() {
        this.statusEffects.forEach(effect => {
            this.statusDisplay(effect)
        })
    }
    statusDisplay(propretry) {
        const statusElement = this.hudElement.querySelector(`.combatant-status-${propretry}`)
        if (this[propretry]) {
            statusElement.textContent = this[propretry].name
            statusElement.style.opacity = 1
        } else {
            statusElement.textContent = ""
            statusElement.style.opacity = 0
        }
    }

    getPostEvent() {

        if (this.recovery) {
            return [
                {type:"stateChange", recovery: true, onCaster: true, power:this.recovery.power}
            ]
        } else if (this.specialDamage) {
            return [
                {type:"stateChange", specialDamage: true, onCaster: true, power:this.specialDamage.power}
            ]
        }

        return []
    }

    getBuff() {

        if (this.buff?.name === "Moment Chaud") {
            this.buff.buffAtk = 1 + Math.round(this.buff.caster.attackSpe * this.buff.power) / 100
        } else if (this.buff?.name === "AtkSpe +") {
            if (this.debuff.buffAtkSpe) return
            this.buff.buffAtkSpe = 1 + Math.round(this.buff.caster.attackSpe * this.buff.power) / 100
        } else if (this.debuff?.name === "Atk -") {
            // Pourcentage
            this.debuff.debuffAtk = 1 - Math.round(this.debuff.caster.attackSpe * this.debuff.power) / 100
        } else if (this.debuff?.name === "AtkSpe -") {
            if (this.status.debuffAtkSpe) return
            this.debuff.debuffAtkSpe =  Math.round(this.debuff.caster.attackSpe * this.debuff.power) / 100
        }
    }

    decrementEffect(propretry) {
      
        if (this[propretry]?.expireIn > 0) {
            this[propretry].expireIn -= 1

            if (this[propretry].expireIn === 0) {
                
                const expiredEffectName = this[propretry].name
                this.update({
                    [propretry]: null
                })
                return [
                    {type:"textMessage", text:`${expiredEffectName} est finito`}
                ]
            } 
        }
        
        return []
    }
    decrementStatus() {
        const expiredEvent = this.statusEffects.reduce((previousEffect, currentEffect) => {
            if (typeof previousEffect === "object") return previousEffect.concat(this.decrementEffect(currentEffect))
            return this.decrementEffect(previousEffect).concat(this.decrementEffect(currentEffect)) 
        })  
        return expiredEvent

        
    }

}