import { BoardSide, GameDifficult } from "../core/Enums.js";
import { CardData, DifficultData, Effect } from "../core/Interfaces.js";
import Card from "../entities/Card.js";
import Threat from "../entities/Threat.js";
import GameModel from "../GameModel.js";

// ToDo: Сделай загрузку асинхронной с файлов
/**
 * Класс предзагрузки данных
 */
export default class GameData {
    /** Данные эффектов */
    private _effects: Map<string, Effect>
    /** Данные карт */
    private _cards: Map<string, Card>
    /** Данные уровней */
    private _difficults: Map<GameDifficult, DifficultData>
    /** Данные конфигурации */
    private _config: Object

    /**
     * Создает сущность данных, и выполняет их загрузку
     */
    constructor() {
        this._effects = this.loadEffects()
        this._cards = this.loadCards()
        this._difficults = this.loadDifficults()
        this._config = this.loadConfig()
        console.log("Загрузка завершена!")
    }

    get effects(): Map<string, Effect> { return Object.freeze(this._effects) }
    get cards(): Map<string, Card> { return Object.freeze(this._cards) }
    get difficults(): Map<GameDifficult, DifficultData> { return Object.freeze(this._difficults) }
    get config(): Object { return Object.freeze(this._config) }

    /**
     * Возвращает эффект по названию
     * @param effectName Название эффекта
     * @returns Сущность эффекта
     */
    getEffect(effectName: string): Effect { 
        let effect = this._effects.get(effectName)
        if (!effect) throw new Error("Такого эффекта нет")
        return effect
    }

    /**
     * Возвращает карту по названию
     * @param cardName Название карты
     * @returns Сущность карты
     */
    getCard(cardName: string): Card {
        let card = this._cards.get(cardName)
        if (!card) throw new Error("Такой карты нет")
        return card.clone()
    }

    /**
     * Возвращает уровень по его номеру
     * @param difficultNumber Номер уровня
     * @returns Сущность уровня
     */
    getDifficult(difficultNumber: GameDifficult): DifficultData {
        let difficult = this._difficults.get(difficultNumber)
        if (!difficult) throw new Error("Такого уровня нет")
        return difficult
    }

    /**
     * Возвращает стартовую колоду
     * @returns Стартовая колода
     */
    getStartDeck(): Card[] {
        return [
            this.getCard("Dog"),
            this.getCard("Dog"),
            this.getCard("Rabbit"),
            this.getCard("Rabbit"),
            this.getCard("Raven"),
            this.getCard("Totem"),
            this.getCard("Totem"),
            this.getCard("Totem"),
            this.getCard("Totem")
        ]
    }

    /**
     * Возвращает стартовый набор магазина
     * @returns Стартовый набор магазина
     */
    getStartShop(): Card[] {
        return [
            this.getCard("Rabbit"),
            this.getCard("Dog"),
            this.getCard("Bear"),
            this.getCard("Dear")
        ]
    }

    /**
     * Генерирует случайную карту текущей сложности и выбранной стороны
     * @param difficultNumber Номер сложности
     * @param side Сторона
     * @returns Сгенерированная карта
     */
    generateCard(difficultNumber: GameDifficult, side: BoardSide) : Card {
        let difficult = this.getDifficult(difficultNumber)
        let cards: string[] = []
        switch(side) {
            case "Player":
                cards = difficult.player
                break
            case "Opponent":
                cards = difficult.enemies
                break
        }
        let randomName = cards[Math.floor(Math.random() * cards.length)]
        return this.getCard(randomName)
    }

    generateThreat(difficultNumber: GameDifficult): Threat {
        return new Threat(this.generateCard(difficultNumber, BoardSide.Opponent))
    }

    /**
     * Генерирует набор для магазина
     * @param difficultNumber Номер сложности
     * @returns Набор для магазина
     */
    generateShopCards(difficultNumber: GameDifficult) : Card[] {
        let generatedCards: Card[] = []
        for(let i = 0; i < 2; i++) {
            generatedCards.push(this.generateCard(difficultNumber, BoardSide.Player))
        }
        for(let i = 0; i < 2; i++) {
            generatedCards.push(this.generateCard(difficultNumber + 1, BoardSide.Player))
        }
        return generatedCards
    }

    /**
     * Прогружает эффекты. ВАЖНО: Необходимо, чтобы количество,
     * реализации, а также порядок эффектов совпадал
     * @returns Данные эффектов
     */
    private loadEffects(): Map<string, Effect> {
        let newEffects = new Map<string, Effect>()

        let someEffects: Effect[] = [
            () => { console.log("Just Nothing") },
            (gameModel, cellId: number, side: BoardSide) => {
                let thisCard = gameModel.board.getCard(cellId, side)
                if (thisCard) {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, side)
                        if (card) {
                            card.increaseAttack(2)
                        }
                    }
                } else {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, BoardSide.Player)
                        if (card) {
                            card.increaseAttack(2)
                        }
                    }
                }
            },
            (gameModel, cellId: number, side: BoardSide) => {
                let thisCard = gameModel.board.getCard(cellId, side)
                if (thisCard) {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, side)
                        if (card) {
                            card.increaseAttack(4)
                        }
                    }
                } else {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, BoardSide.Player)
                        if (card) {
                            card.increaseAttack(4)
                        }
                    }
                }
            },
            (gameModel: GameModel, cellId: number, side: BoardSide) => {
                let thisCard = gameModel.board.getCard(cellId, side)
                if (thisCard) {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, side)
                        if (card) {
                            card.increaseHealth(2)
                        }
                    }
                } else {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, BoardSide.Player)
                        if (card) {
                            card.increaseHealth(2)
                        }
                    }
                }
                
            },
            (gameModel: GameModel, cellId: number, side: BoardSide) => {
                let thisCard = gameModel.board.getCard(cellId, side)
                if (thisCard) {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, side)
                        if (card) {
                            card.increaseHealth(4)
                        }
                    }
                } else {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, BoardSide.Player)
                        if (card) {
                            card.increaseHealth(4)
                        }
                    }
                }
            },
            (gameModel: GameModel, cellId: number, side: BoardSide) => {
                gameModel.board.removeCard(side ,cellId)
            },
            (gameModel: GameModel, cellId: number, side: BoardSide) => {
                gameModel.hand.addToHand(gameModel.deck.drawCards(2))
            },
            (gameModel: GameModel, cellId: number, side: BoardSide) => {
                gameModel.deck.increaseDrawCount()
            },
            (gameModel: GameModel, cellId: number, side: BoardSide) => {
                let thisCard = gameModel.board.getCard(cellId, side)
                if (thisCard) {
                    thisCard.increaseAttack(thisCard.attack)
                    thisCard.increaseHealth(thisCard.health)
                }
            }
        ]

        let someEffectsNames: string[] = [
            "",
            "🐺",
            "🐺🐺",
            "🍖",
            "🍖🍖",
            "🏃",
            "🃏",
            "🤲",
            "💀"

        ]

        if (someEffects.length !== someEffectsNames.length) throw new Error("Ошибка загрузки эффектов")
        for(let i = 0; i < someEffectsNames.length; i++) {
            newEffects.set(someEffectsNames[i], someEffects[i])
        }

        console.log("Загрузка эффектов завершена...")
        return newEffects
    }

    /**
     * Прогружает данные карт
     * @returns Данные карт
     */
    private loadCards(): Map<string, Card> {
        let newCards = new Map<string, Card>()

        if (this._effects.size <= 1) throw new Error("Ошибка загрузки эффектов")

        let someCards = [
            {
                name: "Hunter",
                coverPath: "assets/images/Hunter.webp",
                attack: 4,
                health: 5,
                price: 4,
                description: "Он почти крутой",
                effectSacrificeName: "",
                effectTurnName: ""
            },
            {
                name: "Shaman",
                coverPath: "assets/images/Shaman.webp",
                attack: 7,
                health: 6,
                price: 6,
                description: "Крейзи чел",
                effectSacrificeName: "",
                effectTurnName: ""
            },
            {
                name: "Cultist",
                coverPath: "assets/images/Cultist.webp",
                attack: 3,
                health: 12,
                price: 12,
                description: "ОН 🏃",
                effectSacrificeName: "",
                effectTurnName: "🏃"
            },
            {
                name: "Fisher",
                coverPath: "assets/images/Fisher.webp",
                attack: 10,
                health: 12,
                price: 8,
                description: "Выудил",
                effectSacrificeName: "",
                effectTurnName: "🍖"
            },
            {
                name: "High_Shaman",
                coverPath: "assets/images/High_Shaman.webp",
                attack: 12,
                health: 12,
                price: 15,
                description: "Чем раньше, тем лучше",
                effectSacrificeName: "",
                effectTurnName: "💀"
            },
            {
                name: "Dog",
                coverPath: "assets/images/Dog.webp",
                attack: 3,
                health: 2,
                price: 6,
                description: "Он че то там крутой в общем",
                effectSacrificeName: "🐺",
                effectTurnName: ""
            },
            {
                name: "Rabbit",
                coverPath: "assets/images/Rabbit.webp",
                attack: 2,
                health: 2,
                price: 5,
                description: "Микрик",
                effectSacrificeName: "🍖",
                effectTurnName: ""
            },
            {
                name: "Dear",
                coverPath: "assets/images/Dear.webp",
                attack: 3,
                health: 3,
                price: 15,
                description: "Слов нет - он крутой",
                effectSacrificeName: "🤲",
                effectTurnName: ""
            },
            {
                name: "Bear",
                coverPath: "assets/images/Bear.webp",
                attack: 5,
                health: 5,
                price: 20,
                description: "Не спит даже",
                effectSacrificeName: "🐺🐺",
                effectTurnName: "🍖🍖"
            },
            {
                name: "Goat",
                coverPath: "assets/images/Goat.webp",
                attack: 4,
                health: 4,
                price: 9,
                description: "Стоит на стене",
                effectSacrificeName: "🍖🍖",
                effectTurnName: ""
            },
            {
                name: "Raven",
                coverPath: "assets/images/Raven.webp",
                attack: 5,
                health: 2,
                price: 7,
                description: "Птица летучая",
                effectSacrificeName: "🃏",
                effectTurnName: ""
            },
            {
                name: "Totem",
                coverPath: "assets/images/Totem.webp",
                attack: 0,
                health: 5,
                price: 3,
                description: "Стоит че то",
                effectSacrificeName: "",
                effectTurnName: ""
            }
        ]

        for (let i in someCards) {
            let card = new Card(
                {
                    name: someCards[i].name,
                    coverPath: someCards[i].coverPath,
                    attack: someCards[i].attack,
                    health: someCards[i].health,
                    price: someCards[i].price,
                    description: someCards[i].description,
                    effectSacrificeName: someCards[i].effectSacrificeName,
                    effectTurnName: someCards[i].effectTurnName,
                    effectSacrifice: this.getEffect(someCards[i].effectSacrificeName),
                    effectTurn: this.getEffect(someCards[i].effectTurnName)
                }
            )
            newCards.set(card.name, card)
        }

        console.log("Загрузка карт завершена...")
        return newCards
    }

    /**
     * Прогружает данные уровней
     * @returns Данные уровней
     */
    private loadDifficults(): Map<GameDifficult, DifficultData> {
        let newDifficults = new Map<GameDifficult, DifficultData>()

        let someDifficults: DifficultData[] = [
            {
                player: [
                    "Rabbit",
                    "Dog",
                    "Totem"
                ],
                enemies: [
                    "Hunter",
                    "Shaman"
                ]
            },
            {
                player: [
                    "Rabbit",
                    "Dog",
                    "Totem",
                    "Raven"
                ],
                enemies: [  
                    "Hunter",
                    "Shaman",
                    "Cultist"
                ]
            },
            {
                player: [
                    "Rabbit",
                    "Dog",
                    "Totem",
                    "Raven",
                    "Dear",
                    "Goat"
                ],
                enemies: [  
                    "Shaman",
                    "Cultist",
                    "Fisher"
                ]
            },
            {
                player: [
                    "Dog",
                    "Raven",
                    "Dear",
                    "Goat"
                ],
                enemies: [  
                    "Shaman",
                    "Fisher"
                ]
            },
            {
                player: [
                    "Dog",
                    "Goat",
                    "Bear"
                ],
                enemies: [  
                    "Hish_Shaman"
                ]
            }
        ]
        
        for (let i in someDifficults) {
            newDifficults.set(Number(i) + 1, someDifficults[i])
        }

        console.log("Загрузка уровней завершена...")
        return newDifficults
    }

    private loadConfig(): Object {
        let newConfig = {}

        //

        console.log("Загрузка конфигурации завершена...")
        return newConfig
    }
}