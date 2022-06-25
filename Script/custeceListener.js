class CutsceneListener {
    constructor({map}) {
        this.map = map
    }

    listenOnFlag(flag) {
        if (this.map.id === "demoRoom" && flag === "GET_FIRST_PIZZA") {       
           document.addEventListener("endOfCutscene", () => {      
            this.map.startCutscene([
                {type:"textMessage", text:`Premier pizza de récupérer`, who:"Mister V"},
                {type:"textMessage", text:`Maintenant ton premier combat`, who:"Mister V"},
                {type:"walk", direction:"down", who:"npc1"},
                {type:"walk", direction:"down", who:"npc1"},
                {type:"walk", direction:"left", who:"npc1"},
                {type:"walk", direction:"down", who:"npc1"},
                {type:"walk", direction:"down", who:"npc1"},
                {type:"stand", direction:"left", who:"npc1"},
                {type:"walk", direction:"right", who:"hero"},
                {type:"stand", direction:"right", who:"hero", time: 500},
                {type:"battle", ennemyId:"npc1"},
                {type:"addStoryFlags", flag:"WIN_FIRST_BATTLE"},
                ])
           }, {once: true})
        }
    }
    
}