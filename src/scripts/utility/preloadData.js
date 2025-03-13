import Card from "../entities/card.js"
import Enemy from "../entities/enemy.js"

/**
 * Загрузка коллекций карт
 * @returns {Object} Коллекции карт и противников
 */
export async function preloadCardsInfo() {
    let response = await fetch("src/data/card-data.json")
    if (response.ok) {
        let data = await response.json()

        let cardsCollection = createCollection(data["cardsInfo"], "cards")
        console.log("Загрузка карт завершена.", cardsCollection)

        let enemiesCollection = createCollection(data["enemiesInfo"], "enemies")
        console.log("Загрузка противников завершена.", enemiesCollection)

        
        return {
            "cardsData": cardsCollection,
            "enemiesData": enemiesCollection
        }
    }    
}

/**
 * 
 * @param {JSON} someCollection - Коллекция, по которой нужно создать карты
 * @param {string} nameOfCollection - Тип коллеции { cards, enemies } 
 * @returns 
 */
function createCollection(someCollection, nameOfCollection) {
    let readyCollection = new Map()
    for (let i = 0; i < someCollection.length; i++) {
        switch(nameOfCollection) {
            case "cards":
                readyCollection.set(someCollection[i]["name"], new Card(
                    someCollection[i]["name"],
                    someCollection[i]["cover"],
                    someCollection[i]["attack"],
                    someCollection[i]["health"],
                    someCollection[i]["abilities"]
                ))
                break
            case "enemies":
                readyCollection.set(someCollection[i]["name"], new Enemy(
                    someCollection[i]["name"],
                    someCollection[i]["cover"],
                    someCollection[i]["attack"],
                    someCollection[i]["health"],
                    someCollection[i]["abilities"],
                    someCollection[i]["award"]
                ))

        }
        
    }
    return readyCollection
}

export async function preloadTierInfo() {
    let response = await fetch("src/data/tier-data.json")
    if (response.ok) {
        let data = await response.json()
        return data
    }    
}
