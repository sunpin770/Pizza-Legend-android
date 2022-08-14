window.attackSpe = {
    basicSaucyStatus: {
        id: "basicSaucyStatus",
        name: "+Gout",
        power: 0.2,
        succes: [
            {type: "textMessage", text:"{CASTER} uses {ACTION}"},
            {type:"stateChange", status: {name: "Assaisonner", expireIn: 3}, onCaster: true},

        ]
    },
    basicBurn: {
        id: "basicBurn",
        name: "Capsaïcine",
        power: 0.7,
        descriptions: "Inflicts Burns for 3 turns",
        specialDamage: true,
        succes: [
            {type: "textMessage", text:"{CASTER} uses {ACTION}"},
            {type:"stateChange", status: {id: "basicBurn", expireIn: 3}, onCaster: false},
            {type: "textMessage", text:"{TARGET} is Burning"},
        ]
    },
    Poison: {
        id: "Poison",
        name: "Poison",
        descriptions: "Inflicts Poison for 2 turns",
        specialDamage: true,
        caster: true,
        power: 0.7,
        succes: [
            {type: "textMessage", text:"{CASTER} uses {ACTION}"},
            {type:"stateChange", status: {id:"Poison", expireIn: 2}, onCaster: false},
            {type: "textMessage", text:"{TARGET} is poisoned"},
        ]
    },
    hotTime: {
        id: "hotTime",
        name: "Hot Time",
        descriptions: "Your Pizza is on fire for 3 turns.",
        power: 1,
        buff: true,
        caster: true,
        succes: [
            {type: "textMessage", text:"{CASTER} uses {ACTION}"},
            {type:"stateChange", status: {id:"hotTime", expireIn: 3}, onCaster: true},
            {type: "textMessage", text:"{CASTER} is on fire."},
        ]
    },
    basicRecoveryVeggie: {
        id: "basicRecoveryVeggie",
        name: "Natural",
        descriptions: "Heal your pizza for 3 turns.",
        recovery: true,
        power: 0.5,
        succes: [
            {type: "textMessage", text:"{CASTER} uses {ACTION}"},
            {type:"stateChange", status: {id: "basicRecoveryVeggie", expireIn: 3}, onCaster: true},
        ]
    },
    basicDebuffAtk: {
        id: "basicDebuffAtk",
        name: "Atk -",
        descriptions: "Debuff of Attack for 3 turns.",
        power: 1,
        debuff: true,
        caster:true,
        succes: [
            {type: "textMessage", text:"{CASTER} uses {ACTION}"},
            {type:"stateChange", status: {id:"basicDebuffAtk", expireIn: 3}, onCaster: false},
        ]
    },
    basicDefSpeStatus: {
        id: "basicDefSpeStatus",
        name: "AtkSpe -",
        descriptions: "Debuff of Special Attack for 3 turns.",
        power: .5,
        debuff: true,
        caster: true,
        succes: [
            {type: "textMessage", text:"{CASTER} uses {ACTION}"},
            {type:"stateChange", status: {id: "basicDefSpeStatus", expireIn: 3}, onCaster: false},
        ]
    },
    buffAtkSpe: {
        id: "buffAtkSpe",
        name: "AtkSpe +",
        descriptions: "Buff of Special Attack for 3 turns.",
        buff: true,
        power: 0.8,
        succes: [
            {type: "textMessage", text:"{CASTER} uses {ACTION}"},
            {type:"stateChange", status: {id:"buffAtkSpe", expireIn: 3}, onCaster: true},
        ]
    },
    
    
}