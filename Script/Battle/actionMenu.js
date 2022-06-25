class ActionMenu {
    constructor({caster, ennemy, items, replacement, onComplete}) {
        this.caster = caster
        this.ennemy = ennemy 
        this.onComplete = onComplete
        this.replacement = replacement
        
        let quantityItems = {}
        items.forEach(item => {
            if (item.team === this.caster.team) {

                if (!quantityItems[item.actionsId]) {
                    quantityItems[item.actionsId] = {
                        actionsId: item.actionsId,
                        quantity: 1,
                        instanceId: item.instanceId
                    }
                } else {
                    quantityItems[item.actionsId].quantity += 1
                }
            }
            
        })

        this.items = Object.values(quantityItems)
    
    }


    submitMenu(action, instanceId = null) {
       
        this.keyboardMenu?.end()
        this.onComplete({
            attack: action,
            target: this.ennemy,   
            instanceId
        })
    }

    submitMenuReplace(replacer) {
        this.keyboardMenu?.end()

        this.onComplete({
            replacement: replacer
        })
    }

    decide() {
        const typeTarget = this.ennemy.type
        
        const typeConflictDef = pizzas.getTypeEffect(typeTarget, this.caster.type)
        const typeConflictOff = pizzas.getTypeEffect(this.caster.type, typeTarget)
       //Select the attack most efficient & powerful
       // Jte résiste me buff si j'ai pas de buuf
       // Tu tape fort jte débuff si t'as pas de débuff
       // J'ai -25hp me heal et que t'as plus de 20% de ta vie

       const defaultAttackOptions = window.attack[this.caster.actions[0]]
       let attackOptions = {
           attack: defaultAttackOptions,
           efficiency: pizzas.getTypeEffect(defaultAttackOptions.typeAttack, typeTarget),
           power: defaultAttackOptions.power
       }
       

        for (let i = 0; i < this.caster.actions.length; i++) {
            let attack = window.attack[this.caster.actions[i]]
            let efficiency = pizzas.getTypeEffect(attack.typeAttack, typeTarget)
            let power = attack.power 

            const asignAttackOptions = () => {
                attackOptions.attack = attack
                attackOptions.efficiency = efficiency ? efficiency : 1
                attackOptions.power = power
           }
   
            if (attack.buff && !this.buff && typeConflictDef < 1) {
                asignAttackOptions()
                break
            } else if (attack.debuff && !this.ennemy.debuff && typeConflictDef > 1) {
                asignAttackOptions()
                break
            } else if (attack.specialDamage && !this.ennemy.specialDamage &&  utils.getRandomNumber() > 75) {
                asignAttackOptions()
                break
            } else if (attack.recovery && this.caster.hpPercent <= 25 && this.ennemy.hpPercent > 20) {
                asignAttackOptions()
                break
            }
                

            if (efficiency > attackOptions.efficiency && !attack.buff && ! attack.debuff && attack.specialDamage && attack.recovery) {
                asignAttackOptions()
            } else if (efficiency === attackOptions.efficiency && power > attackOptions.power && !attack.buff && ! attack.debuff && attack.specialDamage && attack.recovery) {
                asignAttackOptions()
            }
        }
        this.onComplete({
            attack: attackOptions.attack, 
            target: this.ennemy
        })
    }


    getPages() {

        const backOptions = {
            label: "Back",
            descriptions: "Revenir en arrière",
            handler: () => {
                this.keyboardMenu.setOptions( this.getPages().root)
            }
        }
        return {
            root: [
            {
                label:"Attack",
                descriptions:"Choisir une attaque",
                handler: () => {
                    this.keyboardMenu.setOptions(this.getPages().attacks)
                }
            },
            {
            label: "Items",
            descriptions: "Choisir un Item",
            handler: () => {
                    this.keyboardMenu.setOptions( this.getPages().items)
                }
            },
            {
                label: "Swap",
                descriptions: "Changer de Pizza",
                handler: () => {
                    this.keyboardMenu.setOptions(this.getPages().switch)
                }
            },     
          ],

          attacks: [
            ...this.caster.actions.map(key => {
                const action = window.attack[key]
               
                return {
                    label: action.name,
                    descriptions: action.descriptions,
                    handler: () => {
                        this.submitMenu(action)
                    }
                }
            }),
              backOptions
          ],
          items: [
              ...this.items.map(item => {
                  const itemAction = window.attack[item.actionsId]
                  return {
                      label: itemAction.name,
                      descriptions: itemAction.descriptions,
                      right: () => {
                        return   "x" + item.quantity
                      },
                      handler: () => {
                          this.submitMenu(itemAction, item.instanceId)
                      }
                  }

              }),
              backOptions
          ],
          switch: [
                ...this.replacement.filter(replacer => {
                    return replacer.hp > 0
                }).map((replacer) => {
                    return {
                        label: replacer.name,
                        descriptions: replacer.descriptions,
                        handler: () => {
                            this.submitMenuReplace(replacer)
                        },
                        right: () => {
                            //a voir si on laisse
                            return `${replacer.hp} Hp`
                        }
                    }
                }),
              backOptions
          ]
        }
        
        
    } 

    showMenu(container) {
        this.keyboardMenu = new KeyboardMenu()
        this.keyboardMenu.init(container)
        this.keyboardMenu.setOptions( this.getPages().root)
    }


    
    init(container) {
        if (this.caster.isPlayerControlled) {
            this.showMenu(container)
        } else {
            this.decide()
        }
    }

   
}