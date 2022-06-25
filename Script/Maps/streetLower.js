window.overworldMaps.streetLower =  
    {
    id: "streetLower",
    lowerSrc: "images/maps/StreetLower.png",
    upperSrc: "images/maps/StreetUpper.png",
    gameObject: {
        hero: new Player({
            src: "/images/characters/people/hero.png",
            x: withGrid(20),
            y: withGrid(9), //x: 5, y: 10
        }),
        npc4: new Npc({
            src: "/images/characters/people/npc4.png",
            x: withGrid(24),
            y: withGrid(11),
            useShadow: true,
            talkingBox: [ 
                {
                    box: [
                         {type:"textMessage", text:"En tant que femme mon rôle est de soigner"},
                         {type:"textMessage", text:"J'aime accomplir mon rôle et contribuer à la société"},
                         {type:"healTeam"},
                         {type:"textMessage", text:"Vos pizzas sont désormais soigner grâce au fait que je sois une femme"},
                    ]
                }
             ],
             behavior: [
                 {
                     behaviorLoop: [
                         {type:"stand", direction:"left", time: 2000},
                         {type:"stand", direction:"down", time: 1500},
                      ]
                 }
             ]
        }),
        npc7: new Npc({
            src: "/images/characters/people/npc3.png",
            x: withGrid(15),
            y: withGrid(11),
            useShadow: true,
            direction: "left",
            talkingBox: [ 
                {
                    requires:["DEFEATED_GREEN_BOSS"],
                    box: [
                         {type:"textMessage", text:"Wow t'as battu Vegan Man"},
                         {type:"textMessage", text:"Fais moi voir ton potentiel"},
                         {type:"battle", ennemyId:"npc3"},
                    ]
                },
                {
                    box: [
                         {type:"textMessage", text:"Yo le nouveau, Mister V à parlé de toi"},
                         {type:"textMessage", text:"Je t'explique ici c'est une zone de combat tu peux le voir au panneau"},
                         {type:"textMessage", text:"Ce sont tous des chefs pizza prêt à dahack"},
                         {type:"textMessage", text:"Mais c'est un excellent entrainement"},
                         {type:"textMessage", text:"Si tu les bats tous, tu auras le droit à un combat avec moi"},
                         {type:"textMessage", text:"Je te conseille d'améliorer ton équipe pour cela t'as des pierre à pizzas à l'est."},
                    ]
                }
             ],
             
        }),
        npc11: new Npc({
            src: "/images/characters/people/npc1.png",
            x: withGrid(24),
            y: withGrid(10),
            useShadow: true,
            direction: "left",
            talkingBox: [ 
                {
                    box: [
                         {type:"textMessage", text:"Moi je suis Caca le plus nul après Truc quand même."},
                         {type:"battle", ennemyId:"npc11"},    
                         {type:"addStoryFlags", flag:"FIRST_WIN"},  
                    ]
                }
             ],
             behavior: [
                {
                    behaviorLoop: [
                        {type:"walk", direction:"up"},
                        {type:"stand", direction:"down", time: 10000},
                        {type:"walk", direction:"down"},
                        {type:"stand", direction:"left", time: 10000},
                     ]
                }
            ]
        }),
        npc12: new Npc({
            src: "/images/characters/people/npc1.png",
            x: withGrid(18),
            y: withGrid(9),
            useShadow: true,
            direction: "right",
            talkingBox: [ 
                {
                    requires: ["DEFEATED RANDOM-STREET-2"],
                    box: [
                         {type:"textMessage", text:"Vous avez battu un petit caca"},
                    ]
                },
                {
                    box: [
                         {type:"textMessage", text:"Moi je suis un caca mais plus petit"},
                         {type:"textMessage", text:"Le saviez-vous Truc est si nul qu'il y a que le mot alain pour le décrire !"},
                         {type:"battle", ennemyId:"npc12"},    
                         {type:"addStoryFlags", flag:"SECOND_WIN"},  
                         {type:"addStoryFlags", flag:"DEFEATED RANDOM-STREET-2"}  
                    ]
                }
             ],
             behavior: [
                {
                    behaviorLoop: [
                        {type:"stand", direction:"up", time: 1000},
                        {type:"stand", direction:"down", time: 1000},
                        {type:"stand", direction:"right", time: 1000},
                        {type:"stand", direction:"left", time: 1000},
                     ]
                }
            ]
        }),
        npc13: new Npc({
            src: "/images/characters/people/npc1.png",
            x: withGrid(20),
            y: withGrid(10),
            useShadow: true,
            direction: "right",
            talkingBox: [ 
                {
                    requires: ["DEFEATED_RANDOM_STREET_3"],
                    box: [
                         {type:"textMessage", text:"Azy me parle app, le mec après il te va déchirer"},
                    ]
                },
                {
                    box: [
                         {type:"textMessage", text:"Moi je suis pas un caca mais le mec derrière il est le plus fort de la zone, Bonne chance"},
                         {type:"battle", ennemyId:"npc13"},    
                         {type:"addStoryFlags", flag:"THIRD_WIN"},  
                         {type:"addStoryFlags", flag:"DEFEATED_RANDOM_STREET_3"},  
                    ]
                }
             ],
             behavior: [
                {
                    behaviorLoop: [
                        {type:"stand", direction:"right", time: 6000},
                        {type:"stand", direction:"down", time: 4000}
                     ]
                }
            ]
        }),
        npc14: new Npc({
            src: "/images/characters/people/npc1.png",
            x: withGrid(18),
            y: withGrid(10),
            useShadow: true,
            direction: "right",
            talkingBox: [ 
                {
                    requires: ["DEFEATED_RANDOM_STREET_4"],
                    box: [
                         {type:"textMessage", text:"Toi avoir gagné mois être nul."},    
                    ]
                },
                {
                    box: [
                         {type:"textMessage", text:"Victoire moi avoir."},
                         {type:"battle", ennemyId:"npc14"},    
                         {type:"addStoryFlags", flag:"FOURTH_WIN"},    
                         {type:"addStoryFlags", flag:"DEAFEATED_RANDOM_STREET_4"},    
                    ]
                }
             ] 
        }),
        pizzaStone1: new PizzaStone({
            x: withGrid(33),
            y: withGrid(10),
            storyFlag: "GET_SECOND_PIZZA",
            pizzas: ["f001", "v001", "s001", "c001"],
            talkingBox: [ 
                {
                    requires:["GET_SECOND_PIZZA"],
                    box: [
                        { type:"textMessage", text:"Y'a plus de pizza mon reuf"},
                    ]
                },
                {
                    requires:["FIRST_WIN"],
                    box: [
                        {type:"textMessage", text:"Choisi une nouvelle Pizza"},
                        { type:"craftingMenu", pizzas: ["f001", "v001", "s001"] },
                        { type:"addStoryFlags", flag: "GET_SECOND_PIZZA"}
                    ]
                },
                {
                    box: [
                        { type:"textMessage", text:"Viens me voir quand tu auras 1 Victoire"},
                    ]
                },
            ] 
        }), 
        pizzaStone2: new PizzaStone({
            x: withGrid(33),
            y: withGrid(11),
            storyFlag: "GET_THIRD_PIZZA",
            pizzas: ["f001", "v001", "s001", "c001"],
            talkingBox: [ 
                {
                    requires: ["GET_THIRD_PIZZA"],
                    box: [
                        { type:"textMessage", text:"Y'a plus de pizza mon reuf"},
                    ]
                },
                {
                    requires:["SECOND_WIN"],
                    box: [
                        {type:"textMessage", text:"Choisi une nouvelle Pizza"},
                        { type:"craftingMenu", pizzas: ["f001", "v001", "s001"] },
                        { type:"addStoryFlags", flag: "GET_THIRD_PIZZA"}
                    ]
                },
                {
                    box: [
                        { type:"textMessage", text:"Y'a plus de pizza mon reuf"},
                    ]
                },
            ] 

        }),
        pizzaStone3: new PizzaStone({
            x: withGrid(33),
            y: withGrid(12),
            storyFlag: "GET_FOURTH_PIZZA",
            pizzas: ["f001", "v001", "s001", "c001", "c002"],
            talkingBox: [ 
                {
                    requires: ["GET_FOURTH_PIZZA"],
                    box: [
                        { type:"textMessage", text:"Y'a plus de pizza mon reuf"},
                    ]
                },
                {
                    requires:["THIRD_WIN"],
                    box: [
                        {type:"textMessage", text:"Choisi une nouvelle Pizza"},
                        { type:"craftingMenu", pizzas: ["f001", "v001", "s001", "c001", "c002"] },
                        { type:"addStoryFlags", flag: "GET_FOURTH_PIZZA"}
                    ]
                },
                {
                    box: [
                        { type:"textMessage", text:"Viens me voir quand tu auras 3 Victoire"},
                    ]
                },
            ] 
        })




    },
    caseEvent: {
        [gridWall(29, 9)]: {
            event: [
                { 
                    type:"changeMap", map:'pizzaShop',
                    x: withGrid(5),
                    y: withGrid(11),
                    direction: "up"
                }
            ]
        },
        [gridWall(5, 9)]: {
            event: [
                { 
                    type:"changeMap", map:'demoRoom',
                    x: withGrid(5),
                    y: withGrid(9),
                    direction: "up"
                }
            ]
        },
        [gridWall(25, 5)]: {
            event: [
                { 
                    type:"changeMap", map:'streetNorth',
                    x: withGrid(7),
                    y: withGrid(15),
                    direction: "up"
                }
            ]
        },
    },
    walls: {
    //Wall Up 
    
        //Grass 
        [gridWall(26,5)]: true,
        [gridWall(26,6)]: true,
        [gridWall(26,7)]: true,
        [gridWall(27,7)]: true,
        //Shop
        [gridWall(28,7)]: true,
        [gridWall(28,8)]: true,
        [gridWall(28,9)]: true,
        [gridWall(30,9)]: true,
        [gridWall(31,9)]: true,
        [gridWall(32,9)]: true,
        [gridWall(33,9)]: true,

        //Building
        [gridWall(4,9)]: true,
        [gridWall(6,9)]: true,
        [gridWall(7,9)]: true,
        [gridWall(8,9)]: true,
        [gridWall(9,9)]: true,
        [gridWall(10,9)]: true,
        [gridWall(11,9)]: true,
        [gridWall(12,9)]: true,
        [gridWall(13,8)]: true,
        [gridWall(14,8)]: true,
        [gridWall(15,7)]: true,
        [gridWall(16,7)]: true,
        [gridWall(17,7)]: true,
        [gridWall(18,7)]: true,
        [gridWall(19,7)]: true,
        [gridWall(20,7)]: true,
        [gridWall(21,7)]: true,
        [gridWall(22,7)]: true,
        [gridWall(23,7)]: true,
        [gridWall(24,7)]: true,
        [gridWall(24,6)]: true,
    
    //Wall Right
        //Void right
        [gridWall(34,9)]: true,
        [gridWall(34,10)]: true,
        [gridWall(34,11)]: true,
        [gridWall(34,12)]: true,
        [gridWall(34,13)]: true,
        [gridWall(34,14)]: true,
        [gridWall(34,15)]: true,
        [gridWall(34,16)]: true,
        [gridWall(34,17)]: true,
        [gridWall(34,18)]: true,
    
    //Wall down
        //little Tree
        [gridWall(33,14)]: true,
        [gridWall(32,14)]: true,
        [gridWall(31,14)]: true,
        [gridWall(30,14)]: true,
        [gridWall(29,14)]: true,
        [gridWall(28,14)]: true,
        [gridWall(27,14)]: true,
        [gridWall(26,14)]: true,
        [gridWall(25,14)]: true,
        [gridWall(24,14)]: true,
        [gridWall(23,14)]: true,
        [gridWall(22,14)]: true,
        [gridWall(21,14)]: true,
        [gridWall(20,14)]: true,
        [gridWall(19,14)]: true,
        [gridWall(18,14)]: true,
        [gridWall(17,14)]: true,
        [gridWall(16,14)]: true,
        [gridWall(15,14)]: true,
        [gridWall(14,14)]: true,
        [gridWall(13,14)]: true,
        [gridWall(12,14)]: true,
        [gridWall(11,14)]: true,
        [gridWall(10,14)]: true,
        [gridWall(9,14)]: true,
        [gridWall(8,14)]: true,
        [gridWall(7,14)]: true,
        [gridWall(6,14)]: true,
        [gridWall(5,14)]: true,
        [gridWall(4,14)]: true,
    
    //Wall Left 
        //Void Left
        [gridWall(3,13)]: true,
        [gridWall(3,12)]: true,
        [gridWall(3,11)]: true,
        [gridWall(3,10)]: true,
    
    //Wall Middle
        //Place of dahack
        [gridWall(16,9)]: true,
        [gridWall(16,10)]: true,
        [gridWall(16,11)]: true,
        [gridWall(17,9)]: true,
        [gridWall(17,10)]: true,
        [gridWall(17,11)]: true,

        [gridWall(18,11)]: true,
        [gridWall(19,11)]: true,

        [gridWall(25,11)]: true,
        [gridWall(25,10)]: true,
        [gridWall(25,9)]: true,
        [gridWall(26,9)]: true,
        [gridWall(26,10)]: true,
        [gridWall(26,11)]: true,
    }
}