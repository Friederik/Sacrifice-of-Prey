import Cell from "./Cell.js";
/**
 * Класс ячейки карты для магазина
 */
export default class ShopCell extends Cell {
    /**
     * Создает экземпляр ячейки карты для магазина
     * @param card Новая карта
     * @param isUnLocked Определяет заблокирована ли ячейка
     */
    constructor(card, isUnLocked) {
        super(card);
        this._price = card.price;
        this._isUnLocked = isUnLocked !== null && isUnLocked !== void 0 ? isUnLocked : true;
    }
    get price() { return this._price; }
    get isLocked() { return this._isUnLocked; }
    /**
     *
     * @returns Текущую карту `Card`, если карта находится в ячейка, иначе `null`
     */
    pullOutCard() {
        if (this._isUnLocked)
            return super.pullOutCard();
        return null;
    }
    /**
     * Разблокирует ячейку
     */
    unlock() {
        this._isUnLocked = true;
    }
}
