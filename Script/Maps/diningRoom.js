window.overworldMaps.diningRoom =  {
    id:"diningRoom",
    upperSrc: "/images/maps/diningRoomUpper.png",
    lowerSrc: "/images/maps/diningRoomLower.png",
    gameObject: {
        hero: new Player({
            src: "/images/characters/people/hero.png",
            x: withGrid(5),
            y: withGrid(11), 
        }),
        npcD1: new Npc({
            name:"Guillaud",
            src: "/images/characters/people/guillaud.png",
            x: withGrid(6),
            y: withGrid(8), 
            talkingBox: [
                {
                    requires: [],
                    box: [
                        {type:"textMessage", text:"Je suis Madame Guillaud", who:"Mme.Guillaud"},
                        {type:"textMessage", text:"Yanis est meilleur que moi en Python", who:"Mme.Guillaud"},
                        {type:"textMessage", text:"Yanis est le meilleur en Nsi tout époque confondue. ", who:"Mme.Guillaud"},
                    ]
                }
            ]
        })
    },
    caseEvent: {
        [gridWall(7, 3)]: [
            {
                event: [
                    {
                        type:"changeMap", map: "kitchen",
                        x: withGrid(5),
                        y: withGrid(9),
                        direction: "up"
                    }
                ]
            }
        ],
        [gridWall(6, 12)]: [
            {
                event: [
                    {
                        type:"changeMap", map: "demoRoom",
                        x: withGrid(7),
                        y: withGrid(5),
                        direction: "down"
                    }
                ]
            }
        ]
    },
    walls: {
        //Wall Down
        [gridWall(1, 12)]: true,
        [gridWall(2, 12)]: true,
        [gridWall(3, 12)]: true,
        [gridWall(4, 12)]: true,
        [gridWall(5, 12)]: true,
        [gridWall(7, 12)]: true,
        [gridWall(8, 12)]: true,
        [gridWall(9, 12)]: true,
        [gridWall(10, 12)]: true,
        [gridWall(11, 12)]: true,
        [gridWall(12, 12)]: true,

        //Wall right
        [gridWall(13, 11)]: true,
        [gridWall(13, 10)]: true,
        [gridWall(13, 9)]: true,
        [gridWall(13, 8)]: true,
        [gridWall(13, 7)]: true,
        [gridWall(13, 6)]: true,
        [gridWall(13, 5)]: true,

        //Wall Up
        [gridWall(12, 4)]: true,
        [gridWall(11, 4)]: true,
        [gridWall(10, 4)]: true,
        [gridWall(9, 4)]: true,
        [gridWall(9, 3)]: true,
        [gridWall(8, 3)]: true,
        [gridWall(6, 3)]: true,
        [gridWall(5, 3)]: true,
        [gridWall(4, 3)]: true,
        [gridWall(3, 3)]: true,
        [gridWall(2, 3)]: true,
        [gridWall(1, 3)]: true,

        //Wall left
        [gridWall(0, 4)]: true,
        [gridWall(0, 5)]: true,
        [gridWall(0, 6)]: true,
        [gridWall(0, 7)]: true,
        [gridWall(0, 8)]: true,
        [gridWall(0, 9)]: true,
        [gridWall(0, 10)]: true,
        [gridWall(0, 11)]: true,

        //Wall Middle 
            //Table & Chair
            [gridWall(12, 5)]: true,
            [gridWall(11, 5)]: true,
            [gridWall(10, 5)]: true,

            [gridWall(9, 7)]: true,
            [gridWall(8, 7)]: true,
            [gridWall(7, 7)]: true,

            [gridWall(9, 10)]: true,
            [gridWall(8, 10)]: true,
            [gridWall(7, 10)]: true,

            [gridWall(4, 7)]: true,
            [gridWall(3, 7)]: true,
            [gridWall(2, 7)]: true,

            [gridWall(4, 10)]: true,
            [gridWall(3, 10)]: true,
            [gridWall(2, 10)]: true,

            //Comptoire
            [gridWall(6, 4)]: true,
            [gridWall(6, 5)]: true,
            [gridWall(4, 5)]: true,
            [gridWall(3, 5)]: true,
            [gridWall(2, 5)]: true,
            [gridWall(1, 5)]: true,

        
           

    }

}