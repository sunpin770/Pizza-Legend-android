

window.overworldMaps = {}


//Get Starting Position 

function startPosition() {
    Object.keys(window.overworldMaps).forEach(mapId => {
        const map = window.overworldMaps[mapId]
        const allNpcsId = Object.keys(map.gameObject).filter(gameObject => {         
            return gameObject.includes("npc")      
        })
     
        allNpcsId.forEach(npcId => {
            const npc = map.gameObject[npcId]      
            npc.startX = npc.x
            npc.startY = npc.y
            npc.startDirection = npc.direction
        })
    })
}


