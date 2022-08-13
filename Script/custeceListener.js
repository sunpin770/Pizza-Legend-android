class CutsceneListener {
    constructor({map}) {
        this.map = map
    }

    listenOnFlag(flag) {
        if (this.map.id === "demoRoom" && flag === "GET_FIRST_PIZZA") {       
           document.addEventListener("endOfCutscene", () => {      
            this.map.startCutscene([
                {type:"textMessage", text:`You get your First Pizza, it's time for your first fight.`, who: tutorName},
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