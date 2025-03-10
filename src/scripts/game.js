import Card from "./entities/card.js"
import { preloadCardsInfo } from "./utility/preload.js"

/**
 * Исходный класс игры, необходимо после инициализации loadResourses()
 */
class Game {
    #playerHealth
    #coins
    #score
    #difficult

    #deck
    #discard
    #hand
    #field
    #opponentField
    
    #cardCollection

    constructor() {
        this.#playerHealth = 30
        this.#coins = 0
        this.#score = 0
        this.#difficult = 1

        this.#deck = []
        this.#discard = []
        this.#hand = []
        
        this.#field = [null, null, null, null, null]
        this.#opponentField = [null, null, null, null, null]
    }

    async loadResourses() {
        this.#cardCollection = await preloadCardsInfo()
        console.log('Загрузка завершена!', this.#cardCollection)
    }

    get cardCollection() {
        return this.#cardCollection
    }

    get playerHealth() {
        return this.#playerHealth
    }
}

const game = new Game()
await game.loadResourses()


