window.attack = {
    damage1: {
        name: "Roulade",
        power: 0.5,
        typeAttack: "normal",
        succes: [
            {
                type: "textMessage",
                text: "{CASTER} utilise {ACTION}"
            },
            {
                type: "animation",
                animation: "spin"
            },
            {
                type: "stateChange",
                damage: 10
            }
        ]
    },
    meatBasic: {
        name: "Eminc\xe9 de Kebab",
        power: 1,
        typeAttack: "viande",
        specialDamage: true,
        succes: [
            {
                type: "textMessage",
                text: "{CASTER} utilise {ACTION}"
            },
            {
                type: "stateChange",
                damage: 10
            }
        ]
    },
    veggieBasic: {
        name: "Graine de Soja",
        power: 1,
        typeAttack: "veggie",
        succes: [
            {
                type: "textMessage",
                text: "{CASTER} utilise {ACTION}"
            },
            {
                type: "stateChange",
                damage: 10
            }
        ]
    },
    cheeseBasic: {
        name: "Crottin de ch\xe8vre",
        power: 1,
        typeAttack: "fromage",
        succes: [
            {
                type: "textMessage",
                text: "{CASTER} utilise {ACTION}"
            },
            {
                type: "stateChange",
                damage: 10
            }
        ]
    },
    spicyBasic: {
        name: "Mini Poivron",
        power: 1,
        typeAttack: "spicy",
        succes: [
            {
                type: "textMessage",
                text: "{CASTER} utilise {ACTION}"
            },
            {
                type: "stateChange",
                damage: 10
            }
        ]
    },
    fungiBasic: {
        name: "Pi\xe8ce de C\xe8pe",
        power: 1,
        typeAttack: "fungi",
        succes: [
            {
                type: "textMessage",
                text: "{CASTER} utilise {ACTION}"
            },
            {
                type: "stateChange",
                damage: true
            }
        ]
    },
    ...window.items,
    ...window.attackSpe
};

//# sourceMappingURL=index.4fc6d79b.js.map
