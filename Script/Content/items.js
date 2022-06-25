
window.items = {
    basicHealingItem: {
        name: "Huile a Pizza",
        descriptions: "Un peu comme une potions",
        succes: [
            {type:"textMessage", text: "{CASTER} utilise une {ACTION}"}, 
            { type:"stateChange", recovery: 30},
        ]
    },
    superHealingItem: {
        name: "Huile a Pizza +",
        descriptions: "Un peu comme une super potions",
        succes: [
            {type:"textMessage", text: "{CASTER} utilise une {ACTION}"}, 
            { type:"stateChange", recovery: 100},
            {type:"textMessage", text: "{CASTER} se soigne de 100hp"},
        ]
    },
    hyperHealingItem: {
        name: "Huile a Pizza ++",
        descriptions: "Un peu comme une hyper potions",
        succes: [
            {type:"textMessage", text: "{CASTER} utilise une {ACTION}"}, 
            { type:"stateChange", recovery: 200},
            {type:"textMessage", text: "{CASTER} se soigne de 200hp"},
        ]
    },
    resetStatus: {
        name: "Purification",
        descriptions: "Enlève tous status appliquer sur une pizza",
        succes : [
            {type:"textMessage", text: "{CASTER} utilise une {ACTION}"}, 
            { type:"stateChange", status: null, onCaster: true},
        ]
    }
}