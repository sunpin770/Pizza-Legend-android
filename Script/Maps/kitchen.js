window.overworldMaps.kitchen = {
    id:"kitchen",
    upperSrc: "images/maps/KitchenUpper.png",
    lowerSrc: "images/maps/KitchenLower.png",
    gameObject: {
        hero: new Player({
            src: "/images/characters/people/hero.png",
            x: withGrid(5),
            y: withGrid(9),
            useShadow: true,
        }, 64),
        npc1: new Npc({
            src: "/images/characters/people/npc1.png",
            x: withGrid(2),
            y: withGrid(5),
            useShadow: true,
        }, 96),
        npc2: new Npc({
            src: "/images/characters/people/npc2.png",
            x: withGrid(10),
            y: withGrid(6),
            useShadow: true,
            behaviorLoop: [
                {type:"walk", direction: "left"},
                {type:"stand", direction: "down", time: 300},
                {type:"walk", direction: "left"},
                {type:"walk", direction: "left"},
                {type:"stand", direction: "down", time:1000},
                {type:"walk", direction: "left"},
                {type:"stand", direction: "down", time:1000},

                {type:"walk", direction: "right"},
                {type:"stand", direction: "down", time: 500},
                {type:"walk", direction: "right"},
                {type:"walk", direction: "right"},
                {type:"stand", direction: "down", time:1000},
                {type:"walk", direction: "right"},
                {type:"stand", direction: "down", time:1000},
            ]
        }),
        npc3: new Npc({
            src: "/images/characters/people/npc3.png",
            x: withGrid(2),
            y: withGrid(6),
            useShadow: true,
            behaviorLoop: [
                {type:"stand", direction: "down", time:1000},
                {type:"stand", direction: "up", time:500},
                {type:"stand", direction: "right", time:500},
                {type:"stand", direction: "left", time:500},
            ]
        }),
        npc4: new Npc({
            src: "/images/characters/people/npc4.png",
            x: withGrid(2),
            y: withGrid(7),
            useShadow: true,
        }),
    },
    walls: {
        //Down
            //Wall
        [gridWall(6, 10)]: true,
        [gridWall(7, 10)]: true,
        [gridWall(8, 10)]: true,
        [gridWall(9, 10)]: true,
        [gridWall(10, 10)]: true,
        [gridWall(11, 10)]: true,
        [gridWall(12, 10)]: true,

        [gridWall(4, 10)]: true,
        [gridWall(3, 10)]: true,
        [gridWall(2, 10)]: true,
        [gridWall(1, 10)]: true,
        

            //Object
        [gridWall(9, 9)]: true,
        [gridWall(10, 9)]: true,
        [gridWall(1, 9)]: true,
        [gridWall(2, 9)]: true,
        
        //Left 
            //Wall
            [gridWall(0, 8)]: true,
            [gridWall(1, 7)]: true,
            [gridWall(1, 6)]: true,
            [gridWall(1, 5)]: true,
        
        //Up
            //Object
            [gridWall(1, 4)]: true,
            [gridWall(2, 4)]: true,
            [gridWall(3, 4)]: true,
            [gridWall(5, 4)]: true,
            [gridWall(6, 4)]: true,
            [gridWall(7, 4)]: true,
            [gridWall(8, 4)]: true,
            [gridWall(9, 4)]: true,
            [gridWall(10, 4)]: true,

            //Walls
            [gridWall(4, 3)]: true,

        //Right
            //Walls
            [gridWall(13, 6)]: true,
            [gridWall(13, 7)]: true,
            [gridWall(13, 8)]: true,
            [gridWall(13, 9)]: true,

            //Object
            [gridWall(12, 5)]: true,
            [gridWall(11, 5)]: true,

        //Center Object
        [gridWall(10, 7)]: true,
        [gridWall(9, 7)]: true,
        [gridWall(7, 7)]: true,
        [gridWall(6, 7)]: true,
    },
    caseEvent:  {
        [gridWall(5, 10)]: {
            event: [
                {
                type:"changeMap", 
                map:"diningRoom",
                x: withGrid(7),
                y: withGrid(4),
                direction: "down",
                }
            ]
        }
    }
}