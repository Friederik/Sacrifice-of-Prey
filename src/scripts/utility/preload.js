import Card from "../entities/card.js"

/**
 * Загрузка коллекций карт
 * @returns Объект, в котором содержатся объекты карт
 */
export async function preloadCardsInfo() {
    let response = await fetch("src/paths/card-data.json")
    if (response.ok) {
        let data = await response.json()

        let cardsCollection = createCards(data["cardsInfo"])
        console.log("Загрузка карт завершена.", cardsCollection)

        let enemiesCollection = createCards(data["enemiesInfo"])
        console.log("Загрузка противников завершена.", enemiesCollection)

        
        return {
            "cardsData": cardsCollection,
            "enemiesData": enemiesCollection
        }
    }    
}

function createCards(someCollection) {
    let readyCollection = new Map()
    for (let i = 0; i < someCollection.length; i++) {
        readyCollection.set(someCollection[i]["name"], new Card(
            someCollection[i]["name"],
            someCollection[i]["cover"],
            someCollection[i]["attack"],
            someCollection[i]["health"],
            someCollection[i]["abilities"]
        ))
    }
    return readyCollection
}