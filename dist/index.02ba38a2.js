class Player extends Person {
    constructor(config){
        super(config);
    }
    update(state) {
        if (state.movInput && state.map.cutscenePlaying === false) {
            if (this.moveProgressRemain === 0) this.startBehavior(state, {
                type: "walk",
                direction: state.movInput
            });
            else state.movInput, this.direction;
        }
        this.updatePostion();
        this.updateSprite(state);
    }
}

//# sourceMappingURL=index.02ba38a2.js.map
