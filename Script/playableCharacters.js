class Player extends Person {
    constructor(config) {
        super(config);
    }
    update(state) {
      

        if (state.movInput && state.map.cutscenePlaying === false) {
            if (this.moveProgressRemain === 0) { 
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.movInput
                })
                

            } else if (state.movInput != this.direction) {
                //Cancel haut et bas movement + fluide
                // let ContraryDirection = utils.checkContraryDirection(state.movInput, this.direction)[0]
                // let wichSide = utils.checkContraryDirection(state.movInput, this.direction)[1]

                // if (ContraryDirection) {
                //     if (wichSide === "height") {
                //         var x = this.x
                //         if (state.movInput === "up") {
                //             var y = this.y + this.moveProgressRemain
                //         } else {
                //             var y = this.y - this.moveProgressRemain
                //         }
                //     } else if (wichSide === "side") {
                //         var y = this.y
                //         if (state.movInput === "left") {
                //             var x = this.x + this.moveProgressRemain
                //         } else {
                //             var x = this.x - this.moveProgressRemain
                //         }
                //     }
                //     this.moveProgressRemain = 16 - this.moveProgressRemain
                //     this.direction = state.movInput
                //     state.map.moveWalls(x, y, this.direction)
                // }

            }
        }
        
        this.updatePostion()
        this.updateSprite(state)
        
    }

}