
window.items = {
    basicHealingItem: {
        name: "Pizza Oil",
        descriptions: "Restore a little amount of Hp",
        succes: [
            {type:"textMessage", text: "{CASTER} use a {ACTION}"}, 
            { type:"stateChange", recovery: 30},
        ]
    },
    superHealingItem: {
        name: "Pizza Oil +",
        descriptions: "Restore a medium amount of Hp",
        succes: [
            {type:"textMessage", text: "{CASTER} use a {ACTION}"}, 
            { type:"stateChange", recovery: 100},
            {type:"textMessage", text: "{CASTER} heal 100hp"},
        ]
    },
    hyperHealingItem: {
        name: "Pizza Oil ++",
        descriptions: "Restore a huge amount of Hp",
        succes: [
            {type:"textMessage", text: "{CASTER} use a {ACTION}"}, 
            { type:"stateChange", recovery: 200},
            {type:"textMessage", text: "{CASTER} heal 200hp"},
        ]
    },
    resetStatus: {
        name: "Magic Oil",
        descriptions: "Remove all status",
        succes : [
            {type:"textMessage", text: "{CASTER} use a {ACTION}"}, 
            { type:"stateChange", status: null, onCaster: true},
        ]
    }
}