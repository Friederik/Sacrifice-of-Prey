/**
 * Класс карты
 */
export default class Card {
    #name
    #cover
    #attack
    #health
    #abilities

    constructor(name, cover, attack, health, abilities) {
        this.#name = name
        this.#cover = cover
        this.#attack = attack
        this.#health = health
        this.#abilities = abilities    
    }

    printCard() {
        console.log(
            this.#name, 
            this.#cover, 
            this.#attack, 
            this.#health, 
            this.#abilities)
    }
}