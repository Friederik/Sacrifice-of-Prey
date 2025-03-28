import JSONConvertible from "../core/JSONConvertible.js";
/**
 * Класс игровой карты
 */
export default class Card extends JSONConvertible {
    /**
     * Создает экземпляр карты
     * @param cardData Данные карты
     */
    constructor(cardData) {
        super();
        this._name = cardData.name;
        this._coverPath = cardData.coverPath;
        this._attackMax = cardData.attack;
        this._healthMax = cardData.health;
        this._priceNormal = cardData.price;
        this._attack = cardData.attack;
        this._health = cardData.health;
        this._price = cardData.price;
        this._effectSacrifice = cardData.effectSacrifice;
        this._effectTurn = cardData.effectTurn;
        this._description = cardData.description;
        this._cardData = cardData;
    }
    get data() { return Object.freeze(this._cardData); }
    get name() { return this._name; }
    get coverPath() { return this._coverPath; }
    get attack() { return this._attack; }
    get health() { return this._health; }
    get price() { return this._price; }
    get description() { return this._description; }
    get effectSacrifice() { return this._effectSacrifice; }
    get effectTurn() { return this._effectTurn; }
    /**
     * Обновляет внутренние настройки карты
     */
    updateCardData() {
        this._cardData.attack = this._attack;
        this._cardData.health = this._health;
        this._cardData.price = this._price;
    }
    /**
     * Копирует текущую карту
     * @returns Копия карты
     */
    clone() {
        return new Card(this._cardData);
    }
    /**
     * Получение урона картой
     * @param value Количество урона
     */
    takeDamage(value) {
        if (value < 0)
            return;
        this._health -= value;
        if (this._health < 0)
            this._health = 0;
        this.updateCardData();
    }
    /**
     * Восстановление характеристик карты
     */
    restore() {
        this._attack = this._attackMax;
        this._health = this._healthMax;
        this._price = this._priceNormal;
        this.updateCardData();
    }
    /**
     * Увеличение атаки карты
     * @param value Количество атаки
     */
    increaseAttack(value) {
        if (value < 0)
            return;
        this._attack += value;
        this._attackMax += value;
        this.updateCardData();
    }
    /**
     * Увеличение количества здоровья карты
     * @param value Количество здоровья
     */
    increaseHealth(value) {
        if (value < 0)
            return;
        this._health += value;
        this._healthMax += value;
    }
    /**
     * Увеличение стоимости карты
     * @param value Количество единиц
     */
    increasePrice(value) {
        if (value < 0)
            return;
        this._price += value;
        this.updateCardData();
    }
    /**
     * Уменьшение стоимости карты
     * @param value Количество единиц
     */
    decreasePrice(value) {
        if (value < 0)
            return;
        this._price -= value;
        this.updateCardData();
    }
}
