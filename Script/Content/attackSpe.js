window.attackSpe = {
    basicSaucyStatus: {
        id: "basicSaucyStatus",
        name: "+Gout",
        power: 0.2,
        succes: [
            {type: "textMessage", text:"{CASTER} utiliser {ACTION}"},
            {type:"stateChange", status: {name: "Assaisonner", expireIn: 3}, onCaster: true},

        ]
    },
    basicBurn: {
        id: "basicBurn",
        name: "Capsaïcine",
        power: 0.7,
        specialDamage: true,
        succes: [
            {type: "textMessage", text:"{CASTER} utiliser {ACTION}"},
            {type:"stateChange", status: {id: "basicBurn", expireIn: 3}, onCaster: false},
            {type: "textMessage", text:"{TARGET} est Bruler"},
        ]
    },
    Poison: {
        id: "Poison",
        name: "Poison",
        specialDamage: true,
        caster: true,
        power: 0.7,
        succes: [
            {type: "textMessage", text:"{CASTER} utiliser {ACTION}"},
            {type:"stateChange", status: {id:"Poison", expireIn: 2}, onCaster: false},
            {type: "textMessage", text:"{TARGET} est empoisonné"},
        ]
    },
    hotTime: {
        id: "hotTime",
        name: "Moment Chaud",
        power: 1,
        buff: true,
        caster: true,
        succes: [
            {type: "textMessage", text:"{CASTER} utiliser {ACTION}"},
            {type:"stateChange", status: {id:"hotTime", expireIn: 3}, onCaster: true},
            {type: "textMessage", text:"La pizza choisi est chaud"},
        ]
    },
    basicRecoveryVeggie: {
        id: "basicRecoveryVeggie",
        name: "naturel",
        recovery: true,
        power: 0.5,
        succes: [
            {type: "textMessage", text:"{CASTER} utiliser {ACTION}"},
            {type:"stateChange", status: {id: "basicRecoveryVeggie", expireIn: 3}, onCaster: true},
        ]
    },
    basicDebuffAtk: {
        id: "basicDebuffAtk",
        name: "Atk -",
        power: 1,
        debuff: true,
        caster:true,
        succes: [
            {type: "textMessage", text:"{CASTER} utiliser {ACTION}"},
            {type:"stateChange", status: {id:"basicDebuffAtk", expireIn: 3}, onCaster: false},
        ]
    },
    basicDefSpeStatus: {
        id: "basicDefSpeStatus",
        name: "AtkSpe -",
        power: .5,
        debuff: true,
        caster: true,
        succes: [
            {type: "textMessage", text:"{CASTER} utiliser {ACTION}"},
            {type:"stateChange", status: {id: "basicDefSpeStatus", expireIn: 3}, onCaster: false},
        ]
    },
    buffAtkSpe: {
        id: "buffAtkSpe",
        name: "AtkSpe +",
        buff: true,
        power: 0.8,
        succes: [
            {type: "textMessage", text:"{CASTER} utiliser {ACTION}"},
            {type:"stateChange", status: {id:"buffAtkSpe", expireIn: 3}, onCaster: true},
        ]
    },
    
    
}