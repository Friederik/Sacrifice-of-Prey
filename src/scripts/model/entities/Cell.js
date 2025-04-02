import JSONConvertible from "../core/JSONConvertible.js";
import Card from "./Card.js";
/**
 * Класс ячейки карты
 */
export default class Cell extends JSONConvertible {
    /**
     * Создает экземпляр ячейки карты
     * @param card Новая карта
     */
    constructor(card) {
        super();
        this._card = card !== null && card !== void 0 ? card : null;
    }
    get card() { return this._card; }
    /**
     * Проверяет есть ли карта в ячейке
     * @returns `true`, если в ячейке находится карта, иначе `false`
     */
    checkCard() {
        if (this._card !== null) {
            return this._card instanceof Card;
        }
        return false;
    }
    /**
     * Вставляет карту в ячейку
     * @param card Новая карта
     */
    insertCard(card) {
        if (card === null)
            return;
        this._card = card.clone();
    }
    /**
     * Вытаскивает карту из ячейки
     * @returns Текущую карту `Card`, если карта находится в ячейке, иначе `null`
     */
    pullOutCard() {
        if (this._card === null)
            return null;
        let temp = this._card;
        this._card = null;
        return temp;
    }
}
