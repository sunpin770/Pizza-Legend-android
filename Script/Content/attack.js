
window.attack = {

    damage1: {
        name: "Roll",
        power: 0.5,
        descriptions: "The most basic attack.",
        typeAttack:"normal",
        succes: [
            {type:"textMessage", text: "{CASTER} uses {ACTION}"}, 
            { type:"animation", animation: "spin"},
            { type:"stateChange", damage: 10 }
        ]
    },
    meatBasic: {
        name: "Sliced Kebab",
        descriptions: "A wind blade made of kebab",
        power: 1,
        typeAttack:"viande",
        specialDamage: true,
        succes: [
            {type:"textMessage", text: "{CASTER} uses {ACTION}"}, 
            { type:"stateChange", damage: 10}
        ]
    },
    veggieBasic: {
        name: "Soybean Seed",
        power: 1,
        typeAttack:"veggie",
        descriptions: "Several seeds will grow under your ennemies.",
        succes: [
            {type:"textMessage", text: "{CASTER} uses {ACTION}"}, 
            { type:"stateChange", damage: 10}
        ]
    },
    cheeseBasic: {
        name: "Cheesy Splash",
        descriptions: "Splash of melted cheese.",
        power: 1,
        typeAttack:"fromage",
        succes: [
            {type:"textMessage", text: "{CASTER} uses {ACTION}"}, 
            { type:"stateChange", damage: 10}
        ]
    },
    spicyBasic: {
        name: "Mini Pepper",
        power: 1,
        typeAttack:"spicy",
        succes: [
            {type:"textMessage", text: "{CASTER} uses {ACTION}"}, 
            { type:"stateChange", damage: 10}
        ]
    },
    fungiBasic: {
        name: "Mushy Roll",
        descriptions: "A roll imbued with nature power.",
        power: 1,
        typeAttack:"fungi",
        succes: [
            {type:"textMessage", text: "{CASTER} uses {ACTION}"}, 
            { type:"stateChange", damage: true}
        ]
    },
    ...window.items,
    ...window.attackSpe,
}