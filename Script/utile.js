
const withGrid = function(number) {
    return number * 16
}

const gridWall = function(x, y) {
    return `${x * 16}, ${y * 16}`
}



const nextPosition = function(currentPositionX, currentPositionY, direction) {
    let x = currentPositionX
    let y = currentPositionY
    const space = 16
    if (direction == "right") {
        x += space
    } 
    else if (direction == "left") {
        x -= space
    } 
    else if (direction == "up") {
        y -= space
    } 
    else if (direction == "down") {
        y += space
    }

    return {x, y}
    
}

const plusOne = function(element) {
    return element + 1
}


function test() {
    console.log("Sucess")
}

function checkContraryDirection(input, direction) {

}

const utils = {
    checkContraryDirection(input, direction) {
        if (direction == "up" || direction == "down") {
            if (input == "down" || input == "up") {
                return [true, "height"]
            }
        } else if (direction == "left" || direction == "right") {
            if (input == "left" || input == "right") {
                return [true, "side"]
            }
        }

        return false

    },

    caseSprite(n) {
        //For 32 case or Grid Sprite
        return n * 32
    },

    createCustomEvent(name, detail) {
        const event = new CustomEvent(name, {detail})
        document.dispatchEvent(event)
    },

    oppositeDirection(direction) {
        if (direction == "left") { return "right"}
        if (direction == "right") { return "left"}
        if (direction == "up") { return "down"}
        if (direction == "down") { return "up" }
    },

    wait(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    },

    checkRequires(match) { 
        let rightEvent;
        for (let i = 0; i < match.length; i++) {

            const objectEvent = match[i]
            const requires = objectEvent.requires || [];
            const haveStoryFlags = requires.every(stroryFlag => {
                return playerState.storyFlags[stroryFlag]
            })
            if (haveStoryFlags) {
                rightEvent = objectEvent.event || objectEvent.behaviorLoop
                break
            }
        }
        
        return rightEvent
    },

   goodPizzaMod() {
    Object.keys(playerState.pizzas).forEach((key) => {
        const pizza = playerState.pizzas[key]
        console.log(pizza)
        pizza.maxHp = 9999
        pizza.hp = 9999
        pizza.attack = 9999
    })
   },

   getRandomNumber() {
       return Math.floor(Math.random() * 100)
   }
    
    
}
