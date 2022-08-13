window.overworldMaps.streetLower = {
  id: "streetLower",
  lowerSrc: "images/maps/StreetLower.png",
  upperSrc: "images/maps/StreetUpper.png",
  gameObject: {
    hero: new Player({
      src: "/images/characters/people/hero.png",
      x: withGrid(20),
      y: withGrid(9),
    }),
    npc4: new Npc({
      src: "/images/characters/people/npc4.png",
      x: withGrid(24),
      y: withGrid(11),
      useShadow: true,
      talkingBox: [
        {
          box: [
            {
              type: "textMessage",
              text: "Hello, I can heal your Pizza.",
            },
            { type: "healTeam" },
            {
              type: "textMessage",
              text: "Your Pizzas is complety heal.",
            },
          ],
        },
      ],
      behavior: [
        {
          behaviorLoop: [
            { type: "stand", direction: "left", time: 2000 },
            { type: "stand", direction: "down", time: 1500 },
          ],
        },
      ],
    }),
    npc7: new Npc({
      src: "/images/characters/people/npc3.png",
      x: withGrid(15),
      y: withGrid(11),
      useShadow: true,
      direction: "left",
      talkingBox: [
        {
          requires: ["DEFEATED_GREEN_BOSS"],
          box: [
            { type: "textMessage", text: "Wow t'as battu Vegan Man" },
            { type: "textMessage", text: "Fais moi voir ton potentiel" },
            { type: "battle", ennemyId: "npc3" },
          ],
        },
        {
          box: [
            {
              type: "textMessage",
              text: "Ohhh, a newbie, you have some Pizzas!",
              who: secondaryBoss,
            },
            {
              type: "textMessage",
              text: "This is a fighting place, you can fight with other chef Pizza.",
              who: secondaryBoss,
            },
            {
              type: "textMessage",
              text: "This the best way to gain some experience and become better Chief Pizza.",
              who: secondaryBoss,
            },
            {
              type: "textMessage",
              text: "If you fight all Chief Pizza in this city, I will fight against you.",
              who: secondaryBoss,
            },
            {
              type: "textMessage",
              text: "Good Luck.",
              who: secondaryBoss,
            },
          ],
        },
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
            {
              type: "textMessage",
              text: "We are 4 here and there is a hierarchy. You should do it from the most lamest to the strongest.",
            },
            {
              type: "textMessage",
              text: "I'm the lamest.",
            },
            { type: "battle", ennemyId: "npc11" },
            { type: "addStoryFlags", flag: "FIRST_WIN" },
          ],
        },
      ],
      behavior: [
        {
          behaviorLoop: [
            { type: "walk", direction: "up" },
            { type: "stand", direction: "down", time: 10000 },
            { type: "walk", direction: "down" },
            { type: "stand", direction: "left", time: 10000 },
          ],
        },
      ],
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
            {
              type: "textMessage",
              text: "Hahaha you beat me but i'm not very good.",
            },
            {
              type: "textMessage",
              text: "When you beat a new Chief Pizza you can do a new Pizza.",
            },
            {
              type: "textMessage",
              text: "There are some Pizza Stone to the East of this city.",
            },
          ],
        },
        {
          box: [
            {
              type: "textMessage",
              text: "I'm the third Chief Pizza here.",
            },
            {
              type: "textMessage",
              text: "Anyway you won't be able to beat the first one.",
            },
            { type: "battle", ennemyId: "npc12" },
            { type: "addStoryFlags", flag: "SECOND_WIN" },
            { type: "addStoryFlags", flag: "DEFEATED RANDOM-STREET-2" },
          ],
        },
      ],
      behavior: [
        {
          behaviorLoop: [
            { type: "stand", direction: "up", time: 1000 },
            { type: "stand", direction: "down", time: 1000 },
            { type: "stand", direction: "right", time: 1000 },
            { type: "stand", direction: "left", time: 1000 },
          ],
        },
      ],
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
            {
              type: "textMessage",
              text: "You know, i'm respectful men I don't play with that.",
            },
            {
              type: "textMessage",
              text: "There is famine in the world.",
            },
          ],
        },
        {
          box: [
            {
              type: "textMessage",
              text: "I think use Pizza is disrespectful. You must never play with food.",
            },
            {
              type: "textMessage",
              text: "I'm kidding let's fight.",
            },
            { type: "battle", ennemyId: "npc13" },
            { type: "addStoryFlags", flag: "THIRD_WIN" },
            { type: "addStoryFlags", flag: "DEFEATED_RANDOM_STREET_3" },
          ],
        },
      ],
      behavior: [
        {
          behaviorLoop: [
            { type: "stand", direction: "right", time: 6000 },
            { type: "stand", direction: "down", time: 4000 },
          ],
        },
      ],
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
            {
              type: "textMessage",
              text: "There are other Chief Pizza in the North of the city and there are stronger than me.",
            },
          ],
        },
        {
          box: [
            { type: "textMessage", text: "I juste want to win." },
            { type: "battle", ennemyId: "npc14" },
            { type: "addStoryFlags", flag: "FOURTH_WIN" },
            { type: "addStoryFlags", flag: "DEAFEATED_RANDOM_STREET_4" },
          ],
        },
      ],
    }),
    pizzaStone1: new PizzaStone({
      x: withGrid(33),
      y: withGrid(10),
      storyFlag: "GET_SECOND_PIZZA",
      pizzas: ["f001", "v001", "s001", "c001"],
      talkingBox: [
        {
          requires: ["GET_SECOND_PIZZA"],
          box: [{ type: "textMessage", text: "..." }],
        },
        {
          requires: ["FIRST_WIN"],
          box: [
            { type: "textMessage", text: "Choose a new Pizza." },
            { type: "craftingMenu", pizzas: ["f001", "v001", "s001"] },
            { type: "addStoryFlags", flag: "GET_SECOND_PIZZA" },
          ],
        },
        {
          box: [
            {
              type: "textMessage",
              text: "Come when you beat the lamest men.",
            },
          ],
        },
      ],
    }),
    pizzaStone2: new PizzaStone({
      x: withGrid(33),
      y: withGrid(11),
      storyFlag: "GET_THIRD_PIZZA",
      pizzas: ["f001", "v001", "s001", "c001"],
      talkingBox: [
        {
          requires: ["GET_THIRD_PIZZA"],
          box: [{ type: "textMessage", text: "..." }],
        },
        {
          requires: ["SECOND_WIN"],
          box: [
            { type: "textMessage", text: "Choose a new Pizza." },
            { type: "craftingMenu", pizzas: ["f001", "v001", "s001"] },
            { type: "addStoryFlags", flag: "GET_THIRD_PIZZA" },
          ],
        },
        {
          box: [
            { type: "textMessage", text: "Come when you beat the third men." },
          ],
        },
      ],
    }),
    pizzaStone3: new PizzaStone({
      x: withGrid(33),
      y: withGrid(12),
      storyFlag: "GET_FOURTH_PIZZA",
      pizzas: ["f001", "v001", "s001", "c001", "c002"],
      talkingBox: [
        {
          requires: ["GET_FOURTH_PIZZA"],
          box: [{ type: "textMessage", text: "Choose a new Pizza." }],
        },
        {
          requires: ["THIRD_WIN"],
          box: [
            { type: "textMessage", text: "Choose a new Pizza" },
            {
              type: "craftingMenu",
              pizzas: ["f001", "v001", "s001", "c001", "c002"],
            },
            { type: "addStoryFlags", flag: "GET_FOURTH_PIZZA" },
          ],
        },
        {
          box: [
            {
              type: "textMessage",
              text: "Come when you beat the Second Men",
            },
          ],
        },
      ],
    }),
  },
  caseEvent: {
    [gridWall(29, 9)]: {
      event: [
        {
          type: "changeMap",
          map: "pizzaShop",
          x: withGrid(5),
          y: withGrid(11),
          direction: "up",
        },
      ],
    },
    [gridWall(5, 9)]: {
      event: [
        {
          type: "changeMap",
          map: "demoRoom",
          x: withGrid(5),
          y: withGrid(9),
          direction: "up",
        },
      ],
    },
    [gridWall(6, 12)]: [
      {
        requires: ["GET_TUTORIALS"],
        event: [],
      },
      {
        requires: [],
        event: [
          { type: "textMessage", text: "Yooo, listen a minute." },
          {
            type: "textMessage",
            text: "You can go in the Pause Menu with the button '&'.",
          },
          {
            type: "textMessage",
            text: "It's very useful you can do some save and manage your Team.",
          },
          { type: "addStoryFlags", flag: "GET_TUTORIALS" },
        ],
      },
    ],
    [gridWall(6, 10)]: [
      {
        requires: ["GET_TUTORIALS"],
        event: [],
      },
      {
        requires: [],
        event: [
          { type: "textMessage", text: "Yooo, listen a minute." },
          {
            type: "textMessage",
            text: "You can go in the Pause Menu with the button '&'.",
          },
          {
            type: "textMessage",
            text: "It's very useful you can save and manage your Team.",
          },
          { type: "addStoryFlags", flag: "GET_TUTORIALS" },
        ],
      },
    ],
    [gridWall(6, 11)]: [
      {
        requires: ["GET_TUTORIALS"],
        event: [],
      },
      {
        requires: [],
        event: [
          { type: "textMessage", text: "Yooo, listen a minute." },
          {
            type: "textMessage",
            text: "You can go in the Pause Menu with the button '&'.",
          },
          {
            type: "textMessage",
            text: "It's very useful you can save and manage your Team.",
          },
          { type: "addStoryFlags", flag: "GET_TUTORIALS" },
        ],
      },
    ],
    [gridWall(25, 5)]: {
      event: [
        {
          type: "changeMap",
          map: "streetNorth",
          x: withGrid(7),
          y: withGrid(15),
          direction: "up",
        },
      ],
    },
  },
  walls: {
    //Wall Up

    //Grass
    [gridWall(26, 5)]: true,
    [gridWall(26, 6)]: true,
    [gridWall(26, 7)]: true,
    [gridWall(27, 7)]: true,
    //Shop
    [gridWall(28, 7)]: true,
    [gridWall(28, 8)]: true,
    [gridWall(28, 9)]: true,
    [gridWall(30, 9)]: true,
    [gridWall(31, 9)]: true,
    [gridWall(32, 9)]: true,
    [gridWall(33, 9)]: true,

    //Building
    [gridWall(4, 9)]: true,
    [gridWall(6, 9)]: true,
    [gridWall(7, 9)]: true,
    [gridWall(8, 9)]: true,
    [gridWall(9, 9)]: true,
    [gridWall(10, 9)]: true,
    [gridWall(11, 9)]: true,
    [gridWall(12, 9)]: true,
    [gridWall(13, 8)]: true,
    [gridWall(14, 8)]: true,
    [gridWall(15, 7)]: true,
    [gridWall(16, 7)]: true,
    [gridWall(17, 7)]: true,
    [gridWall(18, 7)]: true,
    [gridWall(19, 7)]: true,
    [gridWall(20, 7)]: true,
    [gridWall(21, 7)]: true,
    [gridWall(22, 7)]: true,
    [gridWall(23, 7)]: true,
    [gridWall(24, 7)]: true,
    [gridWall(24, 6)]: true,

    //Wall Right
    //Void right
    [gridWall(34, 9)]: true,
    [gridWall(34, 10)]: true,
    [gridWall(34, 11)]: true,
    [gridWall(34, 12)]: true,
    [gridWall(34, 13)]: true,
    [gridWall(34, 14)]: true,
    [gridWall(34, 15)]: true,
    [gridWall(34, 16)]: true,
    [gridWall(34, 17)]: true,
    [gridWall(34, 18)]: true,

    //Wall down
    //little Tree
    [gridWall(33, 14)]: true,
    [gridWall(32, 14)]: true,
    [gridWall(31, 14)]: true,
    [gridWall(30, 14)]: true,
    [gridWall(29, 14)]: true,
    [gridWall(28, 14)]: true,
    [gridWall(27, 14)]: true,
    [gridWall(26, 14)]: true,
    [gridWall(25, 14)]: true,
    [gridWall(24, 14)]: true,
    [gridWall(23, 14)]: true,
    [gridWall(22, 14)]: true,
    [gridWall(21, 14)]: true,
    [gridWall(20, 14)]: true,
    [gridWall(19, 14)]: true,
    [gridWall(18, 14)]: true,
    [gridWall(17, 14)]: true,
    [gridWall(16, 14)]: true,
    [gridWall(15, 14)]: true,
    [gridWall(14, 14)]: true,
    [gridWall(13, 14)]: true,
    [gridWall(12, 14)]: true,
    [gridWall(11, 14)]: true,
    [gridWall(10, 14)]: true,
    [gridWall(9, 14)]: true,
    [gridWall(8, 14)]: true,
    [gridWall(7, 14)]: true,
    [gridWall(6, 14)]: true,
    [gridWall(5, 14)]: true,
    [gridWall(4, 14)]: true,

    //Wall Left
    //Void Left
    [gridWall(3, 13)]: true,
    [gridWall(3, 12)]: true,
    [gridWall(3, 11)]: true,
    [gridWall(3, 10)]: true,

    //Wall Middle
    //Place of dahack
    [gridWall(16, 9)]: true,
    [gridWall(16, 10)]: true,
    [gridWall(16, 11)]: true,
    [gridWall(17, 9)]: true,
    [gridWall(17, 10)]: true,
    [gridWall(17, 11)]: true,

    [gridWall(18, 11)]: true,
    [gridWall(19, 11)]: true,

    [gridWall(25, 11)]: true,
    [gridWall(25, 10)]: true,
    [gridWall(25, 9)]: true,
    [gridWall(26, 9)]: true,
    [gridWall(26, 10)]: true,
    [gridWall(26, 11)]: true,
  },
};
