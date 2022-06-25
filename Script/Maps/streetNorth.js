window.overworldMaps.streetNorth =  {
    id: "streetNorth",
    upperSrc: "images/maps/StreetNorthUpper.png",
    lowerSrc: "images/maps/StreetNorthLower.png",
    gameObject: {
        hero: new Player({
            src: "/images/characters/people/hero.png",
            x: withGrid(13),
            y: withGrid(11),
            direction: "up", 
        }),
        npc15: new Npc({
            src:"/images/characters/people/npc7.png",
            x: withGrid(7),
            y: withGrid(11),
            useShadow: true,
            direction: "down",
            name: "Julio",
            talkingBox: [
                {
                    requires: ["FOURTH_WIN"],
                    box: [
                        {type:"textMessage", text:"Bien joué maintenant que tu as prouvé que tu a certain niveau, tu peux accéder à ta première cuisine,", faceHero:"npc15", who:"Julio"},
                        {type:"textMessage", text:" la Cuisine Verte, a l'intérieur un redoutable chef pizza Pizza d'attend", who:"Julio"},
                        {type:"textMessage", text:"Ptit conseil sa pizza favorite est de type légume, bref y'a ses discipline a vaincre", who:"Julio"},
                        {type:"textMessage", text:"Tu sais ce que  t'as à faire.", who:"Julio"},
                    ]
                }
            ]
        }),
        //Fight Npc
        npc16: new Npc({
            src:"/images/characters/people/npc8.png",
            x: withGrid(13),
            y: withGrid(10),
            talkingBox: [
                {
                    requires: ["JUMELLE1_DEFEATED"],
                    box: [
                        {type:"textMessage", text:"Ok Bat ma soeur maintenant", faceHero:"npc16"},
                    ]
                },
                {      
                    box: [
                        {type:"textMessage", text:"Yo on est des jumeles Vegan, on détéste les Samourai Kebab", faceHero:"npc16"},
                        {type:"textMessage", text:"Pour rentrer dans la cuisine faudras que tu me passe sur le corp"},
                        {type:"battle", ennemyId:"npc16"},
                        {type:"addStoryFlags", flag:"JUMELLE1_DEFEATED"},
                    ]
                }
            ],
            behavior: [
                {
                    requires: [],
                    behaviorLoop: [
                        {type:"stand", direction:"down", time: 3000},
                        {type:"stand", direction:"left", time: 1500},
                    ]
                }
            ]
        }),
        npc17: new Npc({
            src:"/images/characters/people/npc8.png",
            x: withGrid(9),
            y: withGrid(8),
            talkingBox: [
                {
                    requires: ["JUMELLE2_DEFEATED"],
                    box: [
                        {type:"textMessage", text:"Ok Bat Vegan Man maintenant", faceHero:"npc16"},
                    ]
                },
                {      
                    box: [
                        {type:"textMessage", text:"Yo on est des jumeles Vegan, on détéste les Samourai Kebab", faceHero:"npc16"},
                        {type:"textMessage", text:"Par contre moi je perd pas"},
                        {type:"battle", ennemyId:"npc17"},
                        {type:"addStoryFlags", flag:"JUMELLE2_DEFEATED"},
                    ]
                }
            ],
            behavior: [
                {
                    requires: [],
                    behaviorLoop: [
                        {type:"walk", direction:"right"},
                        {type:"stand", direction:"left", time: 1500},
                        {type:"walk", direction:"down"},
                        {type:"stand", direction:"up", time: 1500},
                        {type:"walk", direction:"left"},
                        {type:"stand", direction:"right", time: 1500},
                        {type:"walk", direction:"up"},
                        {type:"stand", direction:"down", time: 1500},
                        
                    ]
                }
            ]
        }),
    },
    caseEvent: {
        [gridWall(7, 5)]: {
            event: [
                {
                    type:"changeMap", map:'greenKitchen',
                    x: withGrid(5),
                    y: withGrid(11),
                    direction: "up"
                }
            ]
        },
        [gridWall(7, 16)]: {
            event: [
                {
                    type:"changeMap", map:'streetLower',
                    x: withGrid(25),
                    y: withGrid(6),
                    direction: "down"
                }
            ]
        },
        //rentre Dans la Zone qu'une fois avoir battu les 4 npcs dans StreetLower
        // [gridWall(7, 14)]: [
        //     {
        //         requires: ["FOURTH_WIN"],
        //         event: []
        //     },
        //     {
        //         requires: [],
        //         event: [
        //             {who:"npc15", type:"walk", direction:"down"},
        //             {who:"npc15", type:"walk", direction:"down"},
        //             {type:"textMessage", text:"Bats tous les Npcs d'en bat avec de venir ici"},
        //             {who:"npc15", type:"stand", direction:"down", time: 1},
        //             {who:"hero", type:"walk", direction:"down"},
        //             {
        //                 type:"changeMap", map:'streetLower',
        //                 x: withGrid(25),
        //                 y: withGrid(6),
        //                 direction: "down"
        //             },
        //         ]
        //     }
        // ]
    },
    walls: {
        //Mur en bas
        [gridWall(13, 15)]: true,
        [gridWall(12, 15)]: true,
        [gridWall(11, 15)]: true,
        [gridWall(10, 15)]: true,
        [gridWall(9, 15)]: true,
        [gridWall(8, 15)]: true,
        [gridWall(6, 15)]: true,
        [gridWall(5, 15)]: true,
        [gridWall(4, 15)]: true,
        [gridWall(3, 15)]: true,
        [gridWall(2, 15)]: true,

        //Mur Gauche
        [gridWall(1, 14)]: true,
        [gridWall(1, 13)]: true,
        [gridWall(1, 12)]: true,
        [gridWall(1, 11)]: true,
        [gridWall(1, 10)]: true,
        [gridWall(1, 9)]: true,
        [gridWall(1, 8)]: true,

        //Mur Haut
        [gridWall(2, 7)]: true,
        [gridWall(3, 7)]: true,
        [gridWall(3, 6)]: true,
        [gridWall(4, 5)]: true,
        [gridWall(5, 5)]: true,
        [gridWall(6, 5)]: true,
        [gridWall(8, 5)]: true,
        [gridWall(9, 5)]: true,
        [gridWall(10, 5)]: true,
        [gridWall(11, 6)]: true,
        [gridWall(12, 6)]: true,
        [gridWall(13, 6)]: true,
        
        //Mur droite
        [gridWall(14, 7)]: true,
        [gridWall(14, 8)]: true,
        [gridWall(14, 9)]: true,
        [gridWall(14, 10)]: true,
        [gridWall(14, 11)]: true,
        [gridWall(14, 12)]: true,
        [gridWall(14, 13)]: true,
        [gridWall(14, 14)]: true,

        //Mur milieu
        [gridWall(7, 10)]: true,
        [gridWall(7, 9)]: true,
        [gridWall(7, 8)]: true,
        [gridWall(8, 8)]: true,
        [gridWall(8, 9)]: true,
        [gridWall(8, 10)]: true,
        [gridWall(9, 10)]: true,
        [gridWall(10, 10)]: true,
        

    }
}

