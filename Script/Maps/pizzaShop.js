window.overworldMaps.pizzaShop = {
    id:"pizzaShop",
    upperSrc: "images/maps/PizzaShopUpper.png",
    lowerSrc: "images/maps/PizzaShopLower.png",
    gameObject: {
        hero: new Player({
            src: "/images/characters/people/hero.png",
            x: withGrid(5),
            y: withGrid(11),
            direction: "up"
        }, 64),
        npc1: new Npc({
            src: "/images/characters/people/npc2.png",
            x: withGrid(3),
            y: withGrid(5),
            useShadow: true,
        }),
        shop1: new Shop({
            x: withGrid(3),
            y: withGrid(6),
            talkingBox: [
                {
                    box: [
                        {type:"textMessage", text:"Je suis le magasin"},
                        {type:"shopMenu", which:"shop1"}
                    ]
                }
            ]
        })
    },
    caseEvent: {
        [gridWall(5, 12)]: {
            event: [
                { 
                    type:"changeMap", map:'streetLower',
                    x: withGrid(29),
                    y: withGrid(10),
                    direction: "down"
                }
            ]
        }
    },
    walls: {
    //Wall Down
        //Void Down
        [gridWall(1,12)]: true,
        [gridWall(2,12)]: true,
        [gridWall(3,12)]: true,
        [gridWall(4,12)]: true,
        [gridWall(6,12)]: true,
        [gridWall(7,12)]: true,
        [gridWall(8,12)]: true,
        [gridWall(9,12)]: true,
        [gridWall(10,12)]: true,
    //Wall Left
        //Void left
        [gridWall(11,11)]: true,
        [gridWall(11,10)]: true,
        [gridWall(11,9)]: true,
        [gridWall(11,8)]: true,
        [gridWall(11,7)]: true,
        [gridWall(11,6)]: true,
        [gridWall(11,5)]: true,
        [gridWall(11,4)]: true,
    //Wall Right
        //Void Right
        [gridWall(0,11)]: true,
        [gridWall(0,10)]: true,
        [gridWall(0,9)]: true,
        [gridWall(0,8)]: true,
        [gridWall(0,7)]: true,
        [gridWall(0,6)]: true,
        [gridWall(0,5)]: true,
        [gridWall(0,4)]: true,
    //Wall Up 
        //Limit 
        [gridWall(1,3)]: true,
        [gridWall(7,3)]: true,
        [gridWall(8,3)]: true,
        [gridWall(10,3)]: true,
        //BookShelve
        [gridWall(6,4)]: true,
        [gridWall(5,4)]: true,
        [gridWall(4,4)]: true,
        [gridWall(3,4)]: true,
        //Comptoire
        [gridWall(2,4)]: true,
        [gridWall(2,5)]: true,
        [gridWall(2,6)]: true,
        [gridWall(3,6)]: true,
        [gridWall(4,6)]: true,
        [gridWall(5,6)]: true,
        [gridWall(7,6)]: true,
        [gridWall(8,6)]: true,
        [gridWall(9,6)]: true,
        [gridWall(9,5)]: true,
        [gridWall(9,4)]: true,
    //Wall Midle
        //Left Thing
        [gridWall(4,8)]: true,
        [gridWall(4,9)]: true,
        [gridWall(4,10)]: true,
        [gridWall(3,8)]: true,
        [gridWall(3,9)]: true,
        [gridWall(3,10)]: true,

        //Right thing
        [gridWall(7,8)]: true,
        [gridWall(8,8)]: true,
        [gridWall(7,9)]: true,
        [gridWall(8,9)]: true,
    }
}