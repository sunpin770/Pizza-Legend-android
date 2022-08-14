class PizzaStone extends GameObject {
    //Value of plater Pizza recup tous les pizzas ou les Id sont diff
    constructor(config) {
        super(config);

        this.sprite = new Sprite({
            gameObject: this,
            src:"./images/characters/pizza-stone.png",
            animation: {

                "used-down" : [[0,0]],
                "unused-down": [[1,0]]
            },
            currentAnimation: "unused-down"
        })
        this.storyFlag = config.storyFlag
        this.pizzas = config.pizzas 
        this.talking = config.talkingBox || [
            {
                requires: [this.storyFlag],
                box: [
                    { type:"textMessage", text:"..." }
                ]
            },
            {
                box: [
                    { type:"textMessage", text:"Choose one Pizza." },
                    { type:"craftingMenu", pizzas: this.pizzas },
                    { type:"addStoryFlags", flag:`${this.storyFlag}`}

                ]
            }
        ]

    }

    update() {
        this.sprite.currentAnimation = playerState.storyFlags[this.storyFlag] ? "used-down" : "unused-down"
    }

}