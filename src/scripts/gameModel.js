import Card from "./entities/card.js"
import Enemy from "./entities/enemy.js"
import Threat from "./entities/threat.js"

/**
 * Исходный класс игры, необходимо после инициализации вызвать loadResourses()
 */
export default class GameModel {
    /**
     * @private @type {number} Здоровье игрока
     */
    #playerHealth
    /**
     * @private @type {number} Количество костей
     */
    #bones
    /**
     * @private @type {Array} Счет игрока
     */
    #score
    /**
     * @private @type {Array} Показатель сложности
     */
    #difficult
    /**
     * @private @type {number} Номер тира
     */
    #tier
    /**
     * @private @type {boolean} Первый ход
     */
    #isFirstTurn

    /**
     * @private @type {Array<Card>} Колода карт игрока
     */
    #deck
    /**
     * @private @type {Array<Card>} Колода сброшенных карт игрока
     */
    #discard
    /**
     * @private @type {Array<Card>} Рука игрока
     */
    #hand
    /**
     * @private @type {number} Лимит карт в руке
     */
    #handLimit
    /**
     * @private @type {Array<Card>} Поля для карт на стороне игрока
     */
    #fieldPlayer
    /**
     * @private @type {Array<Card>} Поля для карт на стороне противника
     */
    #fieldOpponent
    
    /**
     * @private @type {Object} Коллекции карт (cards - игровые, enemies - противники)
     */
    #cardCollection
    /**
     * @private @type {Object} Коллекция тиров
     */
    #tierCollection
    /**
     * Стартовая колода
     */
    #startDeck

    /**
     * Создает новый сеанс игры
     * @param {Array} data - Данные предзагрузки
     * @param {Object} selectedCards - Стартовая колода
     * @param {number} playerHealth - Здоровье игрока
     * @param {number} bones - Количество костей на счету
     * @param {number} score - Счет игрока
     * @param {number} difficult - Текущая сложность
     * @param {number} handLimit - Максимальное количество карт в руке
     * @param {number} tier - Текущий тир 
     * @param {boolean} isFirstTurn - Первый ход
     * @param {Array<Card>} deck - Колода карт игрока
     * @param {Array<Card>} discard - Колода сброшенных карт игрока
     * @param {Array<Card>} hand - Рука игрока
     * @param {Array<Card>} fieldPlayer - Поля для карт на стороне игрока
     * @param {Array<Card>} fieldPlayer - Поля для карт на стороне противника
     */
    constructor(data, selectedCards, playerHealth = 30, bones = 0, 
                    score = 0, difficult = 1, handLimit = 5, tier = 1, 
                    isFirstTurn = true, deck = [], discard = [], hand = [],
                    fieldPlayer = [null, null, null, null, null],
                    fieldOpponent = [null, null, null, null, null] 
                    ) {    
        this.#playerHealth = playerHealth
        this.#bones = bones
        this.#score = score
        this.#difficult = difficult
        this.#handLimit = handLimit
        this.#tier = tier
        this.#isFirstTurn = isFirstTurn

        this.#deck = deck
        this.#discard = discard
        this.#hand = hand
        
        this.#fieldPlayer = fieldPlayer
        this.#fieldOpponent = fieldOpponent

        this.#cardCollection = data[0]
        this.#tierCollection = data[1]
        console.log('Загрузка завершена!', this.#cardCollection, this.#tierCollection)

        this.#startDeck = selectedCards
    }

    /**
     * Возвращает стол
     */
    get table() {
        return [this.#fieldOpponent, this.#fieldPlayer]
    }

    /**
     * Возвращает руку
     */
    get hand() {
        return this.#hand
    }

    /**
     * Создание стартовой колоды
     * @param {Object} selectedCards - Набор карт для колоды
     */
    createStartDeck() {
        for(let name in this.#startDeck) {
            for(let i = 0; i < this.#startDeck[name]; i++){
                this.#deck.push(this.#cardCollection['cardsData'].get(name).clone())
            }
        }
        this.#deck = this.shuffleDeck(this.#deck)
    }

    /**
     * Перемешивание колоды
     * @param {Array<Card>} someDeck - Колода которую нужно перемешать
     * @returns {Array<Card>} Перемешенная колода
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

    /**
     * Начинает новую игру
     * @param {Array<Card>} startDeck - Стартовая колода
     */
    startNewGame(startDeck) {
        this.createStartDeck(startDeck)
        this.beginTurn()

        console.log("Игра началась!")
        console.table(this)
    }

    /**
     * Начало хода. Добор карт, появление угроз, появление противников
     */
    beginTurn() {
        if (this.#isFirstTurn) {
            this.drawCard(3)
            this.addThreat(2)
            this.#isFirstTurn = false
        }
        else {
            this.releaseThreats()
            this.drawCard(2)
            this.addThreat(1)
        }
    }

    /**
     * Добавляет на пустые поля противника угрозы
     * @param {number} count Количество новых угроз
     */
    addThreat(count) {
        let tableFull = 0
        for (let place in this.#fieldOpponent) {
            if (this.#fieldOpponent[place] !== null) {
                tableFull += 1
            }
        }
        if (tableFull === 5) {
            return
        }
        for(let i = 0; i < count; i++) {
            let index = Math.floor(Math.random() * 5)
            while(this.#fieldOpponent[index] !== null) {
                index = (index + 1) % 5
            }
            this.#fieldOpponent[index] = new Threat(this.#tier, this.#tierCollection["tierEnemy"])
        }
    }

    /**
     * Заменяет все угрозы на столе противниками
     */
    releaseThreats() {
        for(let i = 0; i < 5; i++) {
            if(this.#fieldOpponent[i] !== null && this.#fieldOpponent[i].constructor.name === "Threat") {
                this.#fieldOpponent[i] = this.#cardCollection["enemiesData"].get(this.#fieldOpponent[i].enemyName).clone()
            }
        }
    }

    endTurn() {
        
    }  
}
