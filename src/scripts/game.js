import Card from "./entities/card.js"
import Enemy from "./entities/enemy.js"
import { preloadCardsInfo } from "./utility/preloadCardsInfo.js"

/**
 * Исходный класс игры, необходимо после инициализации вызвать loadResourses()
 */
export default class Game {
    #playerHealth
    #bones
    #score
    #difficult

    #deck
    #discard
    #hand
    #handLimit
    #fieldPlayer
    #fieldOpponent
    
    #cardCollection

    /**
     * Создает игру со сдандартными настройками

     * @param {number} playerHealth - Здоровье игрока
     * @param {number} coins - Количество костей на счету
     * @param {number} score - Счет
     * @param {number} difficult - Текущая сложность
     * @param {number} handLimit - Максимальное количество карт в руке
     * @param {Array} deck - Колода карт игрока
     * @param {Array} discard - Колода сброшенных карт игрока
     * @param {Array} fieldPlayer - Поля для карт на стороне игрока
     * @param {Array} fieldPlayer - Поля для карт на стороне противника
     */
    constructor(playerHealth = 30, bones = 0, score = 0, difficult = 1,
                    handLimit = 5, deck = [], discard = [], hand = [],
                    fieldPlayer = [null, null, null, null, null],
                    fieldOpponent = [null, null, null, null, null] 
                    ) {
                        
        this.#playerHealth = playerHealth
        this.#bones = bones
        this.#score = score
        this.#difficult = difficult
        this.#handLimit = handLimit

        this.#deck = deck
        this.#discard = discard
        this.#hand = hand
        
        this.#fieldPlayer = fieldPlayer
        this.#fieldOpponent = fieldOpponent
    }

    /**
     * Прогружает необходимые ресурсы
     */
    async loadResourses() {
        this.#cardCollection = await preloadCardsInfo()
        console.log('Загрузка завершена!', this.#cardCollection)
    }

    /**
     * Создание стартовой колоды
     * @param {Object} selectedCards - Набор карт для колоды
     */
    createStartDeck(selectedCards) {
        for(let name in selectedCards) {
            for(let i = 0; i < selectedCards[name]; i++){
                this.#deck.push(this.#cardCollection['cardsData'].get(name))
            }
        }
        this.#deck = this.shuffleDeck(this.#deck)
    }

    /**
     * Перемешивание колоды
     * @param {Array} someDeck - Колода которую нужно перемешать
     * @returns {Array} Перемешенная колода
     */
    shuffleDeck(someDeck) {
        for(let i = someDeck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let buffer = someDeck[j]
            someDeck[j] = someDeck[i]
            someDeck[i] = buffer
        }
        return someDeck
    }

    /**
     * Замешивание в колоду из сброса
     */
    pullDeck() {
        console.log("Замешивание сброса.")
        this.#deck = this.#deck.concat(this.#discard)
        this.#deck = this.shuffleDeck(this.#deck)
        this.#discard = []
    }

    /**
     * Вытягивание карт из колоды
     * @param {number} count - Количество карт, которые нужно взять
     * @returns {}
     */
    drawCard(count) {
        for(let i = 0; i < count; i++) {
            if(this.#hand.length === this.#handLimit) {
                return
            }
            if(this.#deck.length === 0) {
                this.pullDeck()
                return
            }
            this.#hand.push(this.#deck.pop(Math.floor(Math.random() * this.#deck.length)))
        }
    }

    /**
     * Помещает выбранную карту на выбранное место
     * @param {number} cardId - ID карты в руке 
     * @param {number} placeId - ID места для карты 
     */
    placeCard(cardId, placeId) {
        if(this.#fieldPlayer[placeId] === null) {
            this.#fieldPlayer[placeId] = this.#hand.splice(cardId, 1)
        }
        
    }
}

const game = new Game()
const selectedCards = {
    "Dog": 2,
    "Rabbit": 3,
    "Dear": 4,
    "Wolf": 1
}
console.log(game)
await game.loadResourses()
game.createStartDeck(selectedCards)

game.drawCard(3)
game.placeCard(1, 3)
game.placeCard(1, 1)
console.table(game)


