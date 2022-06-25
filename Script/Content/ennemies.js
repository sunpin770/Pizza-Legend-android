window.ennemies = {
    "npc2": {
        name: "Richard",
        src:"/images/characters/people/npc2.png",
        pizzas: {
            "a": {
                pizzaId:"v001",
                maxHp: 50,
                level: 2,
                attack: 10,
            }
        }
    },
    "npc1": {
        name: "Truc",
        src:"/images/characters/people/npc1.png",
        pizzas: {
            "a": {
                pizzaId:"f001",
                maxHp: 10,
                level: 1,
                attack: 10,
                attackSpe: 20,
                defense: 10,
                speed: 1,
                status: {
                    buff: null
                },
                actions: ["damage1"]
            }
        }
    },
    "npc3": {
        name:"BlazeDeMec",
        src:"/images/characters/people/npc3.png",
        pizzas: {
            "b1": {
                ...pizzas.getPizzaByLvl("c001", 10),
                actions: ["cheeseBasic", "meatBasic", "veggieBasic"]
            },
            "b2": {
                ...pizzas.getPizzaByLvl("f001", 8),
                actions: ["cheeseBasic", "damage1"]
            },
            "b3": {
                ...pizzas.getPizzaByLvl("c001", 9),
                actions: ["meatBasic", "basicSaucyStatus"]
            },
        }
    },
    "npc11": {
        name:"random1",
        src:"/images/characters/people/npc1.png",
        pizzas: {
            "b1": {
                ...pizzas.getPizzaByLvl("c001", 2),
                actions: ["damage1"],
                hp: 1
            },
        }
    },
    "npc12": {
        name:"random2",
        src:"/images/characters/people/npc1.png",
        pizzas: {
            "b1": {
                ...pizzas.getPizzaByLvl("v001", 2),
                actions: ["veggieBasic", "damage1"]
            },
            "b2": {
                ...pizzas.getPizzaByLvl("s001", 2),
                actions: ["meatBasic", "damage1"]
            },
        },
    },
    "npc13": {
        name:"random3",
        src:"/images/characters/people/npc1.png",
        pizzas: {
            "b1": {
                ...pizzas.getPizzaByLvl("c001", 3),
                actions: ["damage1"]
            },
            "b2": {
                ...pizzas.getPizzaByLvl("s001", 3),
                actions: ["meatBasic", "damage1"]
            },
            "b3": {
                ...pizzas.getPizzaByLvl("f001", 4),
                actions: ["damage1"]
            },
        },
    },
    "npc14": {
        name:"random3",
        src:"/images/characters/people/npc1.png",
        pizzas: {
            "b1": {
                ...pizzas.getPizzaByLvl("s001", 4),
                actions: ["damage1"]
            },
            "b2": {
                ...pizzas.getPizzaByLvl("v001", 2),
                actions: ["veggieBasic", "damage1"]
            },
            "b3": {
                ...pizzas.getPizzaByLvl("c001", 4),
                actions: ["meatBasic"]
            },
        },
    },
    "npc16": {
        name:"Random16",
        src:"/images/characters/people/npc8.png",
        pizzas: {
            "b1": {
                ...pizzas.getPizzaByLvl("f001", 5),
                actions: ["cheeseBasic", "Poison"]
            },
            "b2": {
                ...pizzas.getPizzaByLvl("v001", 5),
                actions: ["veggieBasic", "basicRecoveryVeggie"]
            }
        }
    },
    "npc17": {
        name:"Random17",
        src:"/images/characters/people/npc8.png",
        pizzas: {
            "b1": {
                ...pizzas.getPizzaByLvl("c001", 5),
                actions: [ "cheeseBasic", "basicDebuffAtk"]
            },
            "b2": {
                ...pizzas.getPizzaByLvl("v001", 7),
                actions: ["veggieBasic", "basicRecoveryVeggie", "basicDebuffAtk"]
            }
        }
    },
    "veganMan": {
        name:"veganMan",
        src:"/images/characters/people/npc5.png",
        pizzas: {
            "v1": {
                ...pizzas.getPizzaByLvl("c002", 8),
                actions: ["cheeseBasic", "hotTime", "basicDebuffAtk"],
            },
            "v2": {
                ...pizzas.getPizzaByLvl("f001", 8),
                actions: ["meatBasic", "Poison"],
            },
            "v3": {
                ...pizzas.getPizzaByLvl("c001", 9),
                actions: ["meatBasic", "cheeseBasic"],
            },
            "v4": {
                ...pizzas.getPizzaByLvl("v001", 10),
                actions: ["veggieBasic", "basicRecoveryVeggie", "basicDebuffAtk"],
                attack: 35,
                attackSpe: 30
            },

        }
    }

}