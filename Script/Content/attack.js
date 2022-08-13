
window.attack = {

    damage1: {
        name: "Roll",
        power: 0.5,
        descriptions: "The most basic attack.",
        typeAttack:"normal",
        succes: [
            {type:"textMessage", text: "{CASTER} use {ACTION}"}, 
            { type:"animation", animation: "spin"},
            { type:"stateChange", damage: 10 }
        ]
    },
    meatBasic: {
        name: "Sliced Kebab",
        descriptions: "Litteraly a gust of kebab.",
        power: 1,
        typeAttack:"viande",
        specialDamage: true,
        succes: [
            {type:"textMessage", text: "{CASTER} use {ACTION}"}, 
            { type:"stateChange", damage: 10}
        ]
    },
    veggieBasic: {
        name: "Soybean Seed",
        power: 1,
        typeAttack:"veggie",
        descriptions: "A bunch of seed will grow under your ennemies.",
        succes: [
            {type:"textMessage", text: "{CASTER} use {ACTION}"}, 
            { type:"stateChange", damage: 10}
        ]
    },
    cheeseBasic: {
        name: "Cheesy Splash",
        descriptions: "An splash of melt chesse.",
        power: 1,
        typeAttack:"fromage",
        succes: [
            {type:"textMessage", text: "{CASTER} use {ACTION}"}, 
            { type:"stateChange", damage: 10}
        ]
    },
    spicyBasic: {
        name: "Mini Pepper",
        power: 1,
        typeAttack:"spicy",
        succes: [
            {type:"textMessage", text: "{CASTER} use {ACTION}"}, 
            { type:"stateChange", damage: 10}
        ]
    },
    fungiBasic: {
        name: "Mushy Rool",
        descriptions: "A rool with the power of the nature",
        power: 1,
        typeAttack:"fungi",
        succes: [
            {type:"textMessage", text: "{CASTER} use {ACTION}"}, 
            { type:"stateChange", damage: true}
        ]
    },
    ...window.items,
    ...window.attackSpe,
}