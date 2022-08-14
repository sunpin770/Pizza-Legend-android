window.overworldMaps.demoRoom = {
  id: "demoRoom",
  upperSrc: "images/maps/DemoUpper.png",
  lowerSrc: "images/maps/DemoLower.png",
  walls: {
    //Mur Mileu
    [gridWall(7, 6)]: true,
    [gridWall(8, 6)]: true,
    [gridWall(7, 7)]: true,
    [gridWall(8, 7)]: true,

    //Mur Droite
    [gridWall(11, 4)]: true,
    [gridWall(11, 5)]: true,
    [gridWall(11, 6)]: true,
    [gridWall(11, 7)]: true,
    [gridWall(11, 8)]: true,
    [gridWall(11, 9)]: true,

    //Mur Bas
    [gridWall(10, 10)]: true,
    [gridWall(9, 10)]: true,
    [gridWall(8, 10)]: true,
    [gridWall(7, 10)]: true,
    [gridWall(6, 10)]: true,
    [gridWall(5, 11)]: true,
    [gridWall(4, 10)]: true,
    [gridWall(3, 10)]: true,
    [gridWall(2, 10)]: true,
    [gridWall(1, 10)]: true,

    //Mur Gauche
    [gridWall(0, 4)]: true,
    [gridWall(0, 5)]: true,
    [gridWall(0, 6)]: true,
    [gridWall(0, 7)]: true,
    [gridWall(0, 8)]: true,
    [gridWall(0, 9)]: true,

    //Mur Haut
    [gridWall(1, 3)]: true,
    [gridWall(2, 3)]: true,
    [gridWall(3, 4)]: true,
    [gridWall(4, 4)]: true,
    [gridWall(5, 3)]: true,
    [gridWall(6, 4)]: true,
    [gridWall(7, 3)]: true, //A changer pour le translate entre les maps
    [gridWall(8, 4)]: true,
    [gridWall(9, 3)]: true,
    [gridWall(10, 3)]: true,
  },
  caseEvent: {
    [gridWall(7, 4)]: [
      {
        requires: ["DEFEATED_GREEN_BOSS"],
        event: [
          // {
          //   type: "changeMap",
          //   map: "diningRoom",
          //   x: withGrid(6),
          //   y: withGrid(11),
          //   direction: "up",
          // },
          {
            type: "textMessage",
            text: "In Developement...",
            who: "Yanis-Gerst"
          }
        ],
      },
      {
        requires: [],
        event: [{ type: "textMessage", text: "This is close." }],
      },
    ],
    [gridWall(5, 10)]: [
      {
        requires: ["GET_FIRST_PIZZA"],
        event: [
          {
            type: "changeMap",
            map: "streetLower",
            x: withGrid(5),
            y: withGrid(10),
            direction: "down",
          },
        ],
      },
      {
        requires: [],
        event: [
          {
            type: "textMessage",
            text: "You need to unlock your first Pizza to leave this room.",
          },
        ],
      },
    ],
  },
  gameObject: {
    hero: new Player({
      src: "images/characters/people/hero.png",
      x: withGrid(5),
      y: withGrid(7),
      useShadow: true,
    }),
    npc2: new Npc({
      src: "images/characters/people/npc2.png",
      x: withGrid(2),
      y: withGrid(8),
      name: tutorName,
      useShadow: true,
      behavior: [
        {
          requires: ["GET_FIRST_PIZZA"],
          behaviorLoop: [
            { type: "stand", direction: "down", time: 3000 },
            { type: "stand", direction: "left", time: 1000 },
          ],
        },
        {
          requires: [],
          behaviorLoop: [
            { type: "stand", direction: "right", time: 1000 },
            { type: "stand", direction: "up", time: 1000 },
          ],
        },
      ],
      talkingBox: [
        {
          requires: ["DEFEATED_GREEN_BOSS"],
          box: [
            {
              type: "textMessage",
              text: "Impresionnant je savais que je pouvais compter sur toi",
            },
            { type: "textMessage", text: "__Pas de suite__" },
          ],
        },
        {
          requires: ["WIN_FIRST_BATTLE"],
          box: [
            {
              type: "textMessage",
              text: "GG, You won your first fight.",
              faceHero: "npc2",
              who: "Mister V",
            },
            {
              type: "textMessage",
              text: "When you won a fight you earn some money and xp.",
              who: "Mister V",
            },
            {
              type: "textMessage",
              text: "Money can be used at the Store to buy some useful items when you fight.",
              who: "Mister V",
            },
            {
              type: "textMessage",
              text: "Also you can learn more about types in the bookshelves of this room.",
              who: "Mister V",
            },
            {
              type: "textMessage",
              text: "Got the city to beat some Chief Pizza.",
              who: "Mister V",
            },
          ],
        },
        {
          requires: [],
          box: [
            { type: "textMessage", text: "Choose your Pizza!", who: tutorName },
          ],
        },
      ],
    }),
    npc1: new Npc({
      src: "images/characters/people/npc1.png",
      x: withGrid(7),
      y: withGrid(3),
      name: "Truc",
      useShadow: true,
      behavior: [],
      talkingBox: [
        {
          box: [
            {
              type: "textMessage",
              text: "Hello.",
            },
            {
              type: "textMessage",
              text: "...",
            },
          ],
        },
      ],
    }),
    pizzaStone1: new PizzaStone({
      x: withGrid(2),
      y: withGrid(7),
      storyFlag: "GET_FIRST_PIZZA",
      pizzas: ["v001", "s001", "c002"],
    }),
    bookShelve1: new Shop({
      x: withGrid(4),
      y: withGrid(4),
      talkingBox: [
          {
              box: [
                  {type:"textMessage", text:"Meat beat vegatable. Veggie beat Cheese. Cheese beat Meat. Fungi is Neutral"},
                  {type:"textMessage", text:"Pizza have attack and attack Special."},
                  {type:"textMessage", text:"Pure attack is based on attack statistical."},
                  {type:"textMessage", text:"Buff and status is based on attack Special."},
              ]
          }
      ]
  }),
  bookShelve2: new Shop({
    x: withGrid(3),
    y: withGrid(4),
    talkingBox: [
        {
            box: [
                {type:"textMessage", text:"Meat beat vegatable. Veggie beat Cheese. Cheese beat Meat. Fungi is Neutral"},
                {type:"textMessage", text:"Pizza have attack and attack Special."},
                  {type:"textMessage", text:"Pure attack is based on attack statistical."},
                  {type:"textMessage", text:"Buff and status is based on attack Special."},
            ]
        }
    ]
}),
  },
};
