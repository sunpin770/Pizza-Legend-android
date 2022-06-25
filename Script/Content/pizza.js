
window.pizzaTypes = {
    normal: "normal",
    spicy: "spicy",
    fungi: "fungi",
    chill: "chill",
    veggie: "veggie", 
    chesse: "fromage",
    viande: "viande"
}


window.pizzas = {
    "s001": {
        name: "Samourai Kebab",
        type: window.pizzaTypes.viande,
        descriptions: "Rapide et puissante, une icone des pays mahgrebien",
        src:"/images/characters/pizzas/s001.png",
        icon: 'images/icons/meat.png',
        canGetActions: ["meatBasic", "basicBurn", "hotTime"]
    },
    "v001": {
        name: "La Vegana", 
        type: window.pizzaTypes.veggie,
        descriptions: "Sans gluten, qui respecte les animeaux",
        src:"/images/characters/pizzas/v001.png",
        icon: 'images/icons/veggie.png',
        canGetActions: ["veggieBasic", "basicRecoveryVeggie", "basicDefStatus"]
    },
    "c002": {
        name: "G.O.A.T",
        type: window.pizzaTypes.chesse,
        descriptions: "Le Chèvre",
        src:"/images/characters/pizzas/c002.png",
        icon: 'images/icons/cheese.png',
        canGetActions: ["cheeseBasic", "Poison", "buffAtkSpe"]
    },
    "c001": {
        name: "Blue Cheese",
        type: window.pizzaTypes.chesse,
        descriptions: "Fromage fort et puissant",
        src:"/images/characters/pizzas/c001.png",
        icon: 'images/icons/cheese.png',
        canGetActions: ["cheeseBasic", "basicDefSpeSatus", "buffAtkSpe"]
    },
    "f001": {
        name: "Mushy",
        type: window.pizzaTypes.fungi,
        descriptions: "Oula t'es un bizzare",
        src:"/images/characters/pizzas/f001.png",
        icon: 'images/icons/fungi.png',
        canGetActions: ["fungiBasic", "Poison", "buffAtkSpe"]
    }
    

}


window.pizzas.getPizzaStat = (pizzaId) => {
    // For the Lvl 1
    const baseState = {
        pizzaId,
        maxXp: 100,
        xp: 0,
        status: {
            buffAtk: null,
            buffAtkSpe: null,
            debuff: null,
            debuffAtkSpe: null,
        },
        level: 1,
        actions: ["damage1"]
    }
    if (pizzaId === "s001") {
        return {
            pizzaId: "s001",
                hp: 40,
                maxHp: 40 ,
                attack: 20,
                attackSpe: 5,
                defenseSpe: 10,
                defense: 3,
                speed: 10,
                ...baseState,
                actions: ["damage1"]
        }
    } else if (pizzaId === "v001") {
        return {
            pizzaId: "v001",
            hp: 60,
            maxHp: 60,
            attack: 10,
            attackSpe: 15,
            defenseSpe: 13,
            defense: 14,
            speed: 5,
            ...baseState
        }
    } else if (pizzaId === "c001") {
        return {
            maxHp: 50,
            hp: 50,
            attack: 12,
            attackSpe: 12,
            defenseSpe: 10,
            defense: 8,
            speed: 8,
            ...baseState
        }
    } else if (pizzaId === "c002") {
        return {
            maxHp: 45,
            hp: 45,
            attack: 15,
            attackSpe: 7,
            defense: 6,
            defenseSpe: 7,
            speed: 9,
            ...baseState
        }
    } else if (pizzaId === "f001") {
        return {
        maxHp: 45,
        hp: 45,
        attack: 10,
        attackSpe: 20,
        defenseSpe: 17,
        defense: 10,
        speed:9,
        ...baseState
        }
    }
}


pizzas.addStat = (pizza) => {
    const id = pizza.pizzaId
    //next Level
    pizza.maxXp += 100
    pizza.xp = 0
    pizza.level += 1
    
    //Upgrade Stat
    if (id === "s001") {
        pizza.attack += 3
        pizza.attackSpe += 2
        pizza.defense += 1
        pizza.defenseSpe += 2
        pizza.maxHp += 2
        pizza.speed += 3
       
    } else if (id === "v001") {
        pizza.attack += 1
        pizza.attackSpe += 2
        pizza.defense += 2
        pizza.defenseSpe += 2
        pizza.maxHp += 3
        pizza.speed += 1
    } else if (id === "f001") {
        pizza.attack += 2
        pizza.attackSpe += 3
        pizza.defense += 2
        pizza.defenseSpe += 3
        pizza.maxHp += 2
        pizza.speed += 2
    } else if (id === "c001") {
        pizza.attack += 4
        pizza.attackSpe += 2
        pizza.maxHp += 1
        pizza.defenseSpe += 1
        pizza.defense += 1
        pizza.speed += 2
    } else if (id === "c002") {
        pizza.attack += 2
        pizza.attackSpe += 2
        pizza.maxHp += 3
        pizza.defense += 2
        pizza.defenseSpe += 1
        pizza.speed += 2
    }
}

pizzas.getPizzaByLvl = (pizzaId, lvl= 1) => {
    const newPizza = pizzas.getPizzaStat(pizzaId)
    for (let i = 1; i < lvl; i++) {
        pizzas.addStat(newPizza)
    }
    newPizza.hp = newPizza.maxHp
    return newPizza
}

//Donne le Coef en fonction du type de l'attaque
window.pizzas.getTypeEffect = (typeAttack, typeTarget) => {
   
    if (typeAttack === "viande" && (typeTarget === "veggie") ) {
        return 2
    } else if (typeAttack === "viande" && (typeTarget === "miel" || typeTarget === "viande" || typeTarget === "fromage" || typeTarget === "spicy") ) {
        return 0.5
    } 

    else if (typeAttack === "veggie" && (typeTarget === "fromage" || typeTarget === "piment") ) {
        return 2
    } else if (typeAttack === "veggie" && (typeTarget === "miel" || typeTarget === "veggie" || typeTarget === "viande") ) {
        return 0.5
    }

    else if (typeAttack === "fromage" && (typeTarget === "viande" || typeTarget === "miel" || typeTarget === "spicy")) {
        return 2
    } else if (typeAttack === "fromage" && (typeTarget === "veggie" || typeTarget === "piment") ) {
        return 0.5
    }

    else if (typeAttack === "spicy" && (typeTarget === "fromage")) {
        return 2
    } else if (typeAttack === "spicy" && (typeTarget === "veggie")) {
        return 0.5
    }
    else {
        return 1
    }
}
