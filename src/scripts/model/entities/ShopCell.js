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
        this._isUnLocked = isUnLocked !== null && isUnLocked !== void 0 ? isUnLocked : false;
    }
    get price() { return this._price; }
    get isUnLocked() { return this._isUnLocked; }
    /**
     * Вытаскивает карту из ячейки
     * @returns Текущую карту `Card`, если карта находится в ячейка, иначе `null`
     */
    pullOutCard() {
        if (this._isUnLocked) {
            this._price = 0;
            return super.pullOutCard();
        }
        return null;
    }
    /**
     * Вставляет в ячейку магазина новую карту и обновляет стоимость
     * @param card Новая карта
     */
    insertCard(card) {
        if (card === null || this.checkCard())
            return;
        this._card = card.clone();
        this._price = card.price;
    }
    /**
     * Заменяет карту в ячейке новой
     * @param card Новая карта
     */
    changeCard(card) {
        super.pullOutCard();
        this.insertCard(card);
    }
    /**
     * Разблокирует ячейку
     */
    unlock() {
        this._isUnLocked = true;
    }
}
