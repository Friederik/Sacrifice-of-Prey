import Card from "./Card.js";
import Cell from "./Cell.js";

/**
 * Класс ячейки карты для магазина 
 */
export default class ShopCell extends Cell {
    /** Цена карты */
    private _price: number
    /** Определяет заблокирована ли ячейка.
     * `true` - если ячейка разблокирована, `false` - если заблокирована
     */
    private _isUnLocked: boolean

    /**
     * Создает экземпляр ячейки карты для магазина
     * @param card Новая карта
     * @param isUnLocked Определяет заблокирована ли ячейка
     */
    constructor(card: Card, isUnLocked?: boolean) {
        super(card)
        this._price = card.price
        this._isUnLocked = isUnLocked ?? false
    }

    get price(): number { return this._price }
    get isUnLocked(): boolean { return this._isUnLocked }

    /**
     * Вытаскивает карту из ячейки
     * @returns Текущую карту `Card`, если карта находится в ячейка, иначе `null`
     */
    pullOutCard(): Card | null {
        if (this._isUnLocked) {
            this._price = 0
            return super.pullOutCard()
        } 
        return null
    }

    /**
     * Вставляет в ячейку магазина новую карту и обновляет стоимость
     * @param card Новая карта
     */
    insertCard(card: Card | null): void {
        if (card === null || this.checkCard()) return
        this._card = card.clone()
        this._price = card.price
    }

    /**
     * Заменяет карту в ячейке новой
     * @param card Новая карта
     */
    changeCard(card: Card): void {
        super.pullOutCard()
        this.insertCard(card)
    }

    /**
     * Разблокирует ячейку
     */
    unlock(): void {
        this._isUnLocked = true
    }
}