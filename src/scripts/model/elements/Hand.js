import Card from "../entities/Card.js";
/**
 * Класс руки игрока
 */
export default class Hand {
    /** Создает сущность руки */
    constructor() {
        this._cards = [];
        this._handLimit = 5;
    }
    get cards() { return Object.freeze(this._cards); }
    get handLimit() { return this._handLimit; }
    /**
     * Добавляет в руку карты,
     * возвращает избыток для сброса
     * @param cards Карты или массив карт
     * @returns Карты для сброса
     */
    addToHand(cards) {
        let discard = [];
        if (cards instanceof Card) {
            if (this._cards.length < this.handLimit) {
                cards.restore();
                this._cards.push(cards);
            }
            else {
                discard.push(cards);
            }
        }
        else {
            for (let i = 0; i < cards.length; i++) {
                if (this._cards.length < this.handLimit) {
                    this._cards.push(cards[i]);
                }
                else {
                    discard.push(cards[i]);
                }
            }
        }
        return discard;
    }
    /**
     * Вытаскиевает выбранную карту из руки
     * @param cardId Номер карты
     * @returns `Card` - если карта найдена, `null` - если такого номера нет, или рука пуста
     */
    pullOutCard(cardId) {
        if (cardId > this._cards.length || cardId < 0)
            return null;
        if (this._cards.length > 0)
            return this._cards.splice(cardId, 1)[0];
        return null;
    }
    /**
     * Увеличивает максимальное количество карт в руке на 1
     */
    increaseHandLimit() {
        if (this._handLimit >= 15)
            return;
        this._handLimit++;
    }
}
