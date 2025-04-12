import { BoardSide } from "../core/Enums.js";
import Card from "../entities/Card.js";
import Threat from "../entities/Threat.js";
// ToDo: Сделай загрузку асинхронной с файлов
/**
 * Класс предзагрузки данных
 */
export default class GameData {
    /**
     * Создает сущность данных, и выполняет их загрузку
     */
    constructor() {
        this._effects = this.loadEffects();
        this._cards = this.loadCards();
        this._difficults = this.loadDifficults();
        this._config = this.loadConfig();
        console.log("Загрузка завершена!");
    }
    get effects() { return Object.freeze(this._effects); }
    get cards() { return Object.freeze(this._cards); }
    get difficults() { return Object.freeze(this._difficults); }
    get config() { return Object.freeze(this._config); }
    /**
     * Возвращает эффект по названию
     * @param effectName Название эффекта
     * @returns Сущность эффекта
     */
    getEffect(effectName) {
        let effect = this._effects.get(effectName);
        if (!effect)
            throw new Error("Такого эффекта нет");
        return effect;
    }
    /**
     * Возвращает карту по названию
     * @param cardName Название карты
     * @returns Сущность карты
     */
    getCard(cardName) {
        let card = this._cards.get(cardName);
        if (!card)
            throw new Error("Такой карты нет");
        return card.clone();
    }
    /**
     * Возвращает уровень по его номеру
     * @param difficultNumber Номер уровня
     * @returns Сущность уровня
     */
    getDifficult(difficultNumber) {
        let difficult = this._difficults.get(difficultNumber);
        if (!difficult)
            throw new Error("Такого уровня нет");
        return difficult;
    }
    /**
     * Возвращает стартовую колоду
     * @returns Стартовая колода
     */
    getStartDeck() {
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
        ];
    }
    /**
     * Возвращает стартовый набор магазина
     * @returns Стартовый набор магазина
     */
    getStartShop() {
        return [
            this.getCard("Rabbit"),
            this.getCard("Dog"),
            this.getCard("Bear"),
            this.getCard("Dear")
        ];
    }
    /**
     * Генерирует случайную карту текущей сложности и выбранной стороны
     * @param difficultNumber Номер сложности
     * @param side Сторона
     * @returns Сгенерированная карта
     */
    generateCard(difficultNumber, side) {
        let difficult = this.getDifficult(difficultNumber);
        let cards = [];
        switch (side) {
            case "Player":
                cards = difficult.player;
                break;
            case "Opponent":
                cards = difficult.enemies;
                break;
        }
        let randomName = cards[Math.floor(Math.random() * cards.length)];
        return this.getCard(randomName);
    }
    generateThreat(difficultNumber) {
        return new Threat(this.generateCard(difficultNumber, BoardSide.Opponent));
    }
    /**
     * Генерирует набор для магазина
     * @param difficultNumber Номер сложности
     * @returns Набор для магазина
     */
    generateShopCards(difficultNumber) {
        let generatedCards = [];
        for (let i = 0; i < 2; i++) {
            generatedCards.push(this.generateCard(difficultNumber, BoardSide.Player));
        }
        for (let i = 0; i < 2; i++) {
            generatedCards.push(this.generateCard(difficultNumber + 1, BoardSide.Player));
        }
        return generatedCards;
    }
    /**
     * Прогружает эффекты. ВАЖНО: Необходимо, чтобы количество,
     * реализации, а также порядок эффектов совпадал
     * @returns Данные эффектов
     */
    loadEffects() {
        let newEffects = new Map();
        let someEffects = [
            () => { console.log("Just Nothing"); },
            (gameModel, cellId, side) => {
                let thisCard = gameModel.board.getCard(cellId, side);
                if (thisCard) {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, side);
                        if (card) {
                            card.increaseAttack(2);
                        }
                    }
                }
                else {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, BoardSide.Player);
                        if (card) {
                            card.increaseAttack(2);
                        }
                    }
                }
            },
            (gameModel, cellId, side) => {
                let thisCard = gameModel.board.getCard(cellId, side);
                if (thisCard) {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, side);
                        if (card) {
                            card.increaseAttack(4);
                        }
                    }
                }
                else {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, BoardSide.Player);
                        if (card) {
                            card.increaseAttack(4);
                        }
                    }
                }
            },
            (gameModel, cellId, side) => {
                let thisCard = gameModel.board.getCard(cellId, side);
                if (thisCard) {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, side);
                        if (card) {
                            card.increaseHealth(2);
                        }
                    }
                }
                else {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, BoardSide.Player);
                        if (card) {
                            card.increaseHealth(2);
                        }
                    }
                }
            },
            (gameModel, cellId, side) => {
                let thisCard = gameModel.board.getCard(cellId, side);
                if (thisCard) {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, side);
                        if (card) {
                            card.increaseHealth(4);
                        }
                    }
                }
                else {
                    for (let i = 0; i < 5; i++) {
                        let card = gameModel.board.getCard(i, BoardSide.Player);
                        if (card) {
                            card.increaseHealth(4);
                        }
                    }
                }
            },
            (gameModel, cellId, side) => {
                gameModel.board.removeCard(side, cellId);
            },
            (gameModel, cellId, side) => {
                gameModel.hand.addToHand(gameModel.deck.drawCards(2));
            },
            (gameModel, cellId, side) => {
                gameModel.deck.increaseDrawCount();
            },
            (gameModel, cellId, side) => {
                let thisCard = gameModel.board.getCard(cellId, side);
                if (thisCard) {
                    thisCard.increaseAttack(thisCard.attack);
                    thisCard.increaseHealth(thisCard.health);
                }
            }
        ];
        let someEffectsNames = [
            "",
            "🐺",
            "🐺🐺",
            "🍖",
            "🍖🍖",
            "🏃",
            "🃏",
            "🤲",
            "💀"
        ];
        if (someEffects.length !== someEffectsNames.length)
            throw new Error("Ошибка загрузки эффектов");
        for (let i = 0; i < someEffectsNames.length; i++) {
            newEffects.set(someEffectsNames[i], someEffects[i]);
        }
        console.log("Загрузка эффектов завершена...");
        return newEffects;
    }
    /**
     * Прогружает данные карт
     * @returns Данные карт
     */
    loadCards() {
        let newCards = new Map();
        if (this._effects.size <= 1)
            throw new Error("Ошибка загрузки эффектов");
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
                attack: 20,
                health: 20,
                price: 12,
                description: "ОН 🏃",
                effectSacrificeName: "",
                effectTurnName: "🏃"
            },
            {
                name: "Fisher",
                coverPath: "assets/images/Fisher.webp",
                attack: 30,
                health: 30,
                price: 8,
                description: "Выудил",
                effectSacrificeName: "",
                effectTurnName: "🍖"
            },
            {
                name: "High_Shaman",
                coverPath: "assets/images/High_Shaman.webp",
                attack: 40,
                health: 40,
                price: 10,
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
        ];
        for (let i in someCards) {
            let card = new Card({
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
            });
            newCards.set(card.name, card);
        }
        console.log("Загрузка карт завершена...");
        return newCards;
    }
    /**
     * Прогружает данные уровней
     * @returns Данные уровней
     */
    loadDifficults() {
        let newDifficults = new Map();
        let someDifficults = [
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
                    "Goat",
                    "Bear"
                ],
                enemies: [
                    "High_Shaman"
                ]
            },
            {
                player: [
                    "Bear"
                ],
                enemies: [
                    "High_Shaman"
                ]
            }
        ];
        for (let i in someDifficults) {
            newDifficults.set(Number(i) + 1, someDifficults[i]);
        }
        console.log("Загрузка уровней завершена...");
        return newDifficults;
    }
    loadConfig() {
        let newConfig = {};
        //
        console.log("Загрузка конфигурации завершена...");
        return newConfig;
    }
}
