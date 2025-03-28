import Card from "../entities/Card.js";
// ToDo: Сделай загрузку асинхронной с файлов
export default class GameData {
    constructor() {
        this._effects = this.loadEffects();
        this._cards = this.loadCards();
        this._difficults = this.loadDifficults();
        this._config = this.loadConfig();
        console.log("Загрузка завершена!");
    }
    get effects() { return Object.freeze(this._effects); }
    getEffect(effectName) {
        let effect = this._effects.get(effectName);
        if (effect)
            return effect;
        return () => { console.log("Just Nothing"); };
    }
    get cards() { return Object.freeze(this._cards); }
    get difficults() { return Object.freeze(this._difficults); }
    get config() { return Object.freeze(this._config); }
    loadEffects() {
        let newEffects = new Map();
        let someEffects = [
            () => { console.log("Just Nothing"); },
            (card, count) => {
                if (card) {
                    card.takeDamage(count);
                    console.log(`Я АТАКУЮ: ${card.name}`);
                }
            },
            () => { console.log("НУ КА НУКА ТЫ КУДА??"); },
            (count) => { console.log(`ХИЛЛ ${count}`); }
        ];
        let someEffectsNames = [
            "Пусто",
            "Атака",
            "Защита",
            "Восстановление"
        ];
        if (someEffects.length !== someEffectsNames.length)
            throw new Error("Ошибка загрузки эффектов");
        for (let i = 0; i < someEffectsNames.length; i++) {
            newEffects.set(someEffectsNames[i], someEffects[i]);
        }
        console.log("Загрузка эффектов завершена...");
        return newEffects;
    }
    loadCards() {
        let newCards = new Map();
        if (this._effects.size <= 1)
            throw new Error("Ошибка загрузки эффектов");
        let someCards = [
            {
                name: "Hunter",
                coverPath: "assets/images/Hunter.webp",
                attack: 4,
                health: 2,
                price: 2,
                description: "Он почти крутой",
                effectSacrifice: "Пусто",
                effectTurn: "Атака"
            },
            {
                name: "Shaman",
                coverPath: "assets/images/Shaman.webp",
                attack: 5,
                health: 1,
                price: 1,
                description: "Крейзи чел",
                effectSacrifice: "Восстановление",
                effectTurn: "Пусто"
            },
            {
                name: "Shaman",
                coverPath: "assets/images/Cultist.webp",
                attack: 2,
                health: 9,
                price: 15,
                description: "ОН ТРУС",
                effectSacrifice: "Пусто",
                effectTurn: "Защита"
            },
            {
                name: "Dog",
                coverPath: "assets/images/Dog.webp",
                attack: 2,
                health: 3,
                price: 5,
                description: "Он че то там крутой в общем",
                effectSacrifice: "Атака",
                effectTurn: "Атака"
            },
            {
                name: "Rabbit",
                coverPath: "assets/images/Rabbit.webp",
                attack: 1,
                health: 1,
                price: 3,
                description: "Микрик",
                effectSacrifice: "Пусто",
                effectTurn: "Пусто"
            },
            {
                name: "Dear",
                coverPath: "assets/images/Dear.webp",
                attack: 4,
                health: 6,
                price: 7,
                description: "Слов нет - он крутой",
                effectSacrifice: "Защита",
                effectTurn: "Пусто"
            },
            {
                name: "Bear",
                coverPath: "assets/images/Bear.webp",
                attack: 8,
                health: 8,
                price: 10,
                description: "Не спит даже",
                effectSacrifice: "Защита",
                effectTurn: "Защита"
            },
            {
                name: "Dear",
                coverPath: "assets/images/Totem.webp",
                attack: 0,
                health: 1,
                price: 2,
                description: "Стоит че то",
                effectSacrifice: "Восстановление",
                effectTurn: "Атака"
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
                effectSacrifice: this.getEffect(someCards[i].effectSacrifice),
                effectTurn: this.getEffect(someCards[i].effectTurn)
            });
        }
        console.log("Загрузка карт завершена...");
        return newCards;
    }
    loadDifficults() {
        let newDifficults = new Map();
        //
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
