export default class Threat {
    #enemyName
    #tierId

    constructor(tier, tierCollection) {
        this.#tierId = tier
        let enemiesCollection = tierCollection[this.#tierId - 1]["enemies"]
        this.#enemyName = enemiesCollection[Math.floor(Math.random() * enemiesCollection.length)]
    }

    get enemyName() {
        return this.#enemyName
    }
}