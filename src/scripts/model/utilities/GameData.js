// ToDo: Сделай загрузку асинхронной с файлов
export default class GameData {
    constructor() {
        this._effects = this.loadEffects();
        this._cards = this.loadCards();
        this._difficults = this.loadDifficults();
        this._config = this.loadConfig();
        console.log("Загрузка завершена!");
    }
    get effets() { return Object.freeze(this._effects); }
    get cards() { return Object.freeze(this._cards); }
    get difficults() { return Object.freeze(this._difficults); }
    get config() { return Object.freeze(this._config); }
    loadEffects() {
        let newEffects = new Map();
        let someEffects = [
            () => { console.log("Just Nothing"); },
            () => { console.log("Я АТАКУЮЮЮЮ!"); },
            () => { console.log("НУ КА НУКА ТЫ КУДА??"); },
            () => { console.log("ХИЛЛ"); }
        ];
        let someEffectsNames = [
            "Пустой",
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
        let someCards = [];
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
