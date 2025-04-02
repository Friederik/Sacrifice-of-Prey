import JSONConvertible from "../core/JSONConvertible.js";
import Card from "./Card.js";

/**
 * Класс ячейки карты
 */
export default class Cell extends JSONConvertible {
    /** Карта ячейки */
    protected _card: Card | null

    /**
     * Создает экземпляр ячейки карты
     * @param card Новая карта
     */
    constructor(card?: Card | null | undefined) {
        super()
        this._card = card ?? null
    }

    get card(): Card | null { return this._card }

    /**
     * Проверяет есть ли карта в ячейке
     * @returns `true`, если в ячейке находится карта, иначе `false`
     */
    checkCard(): boolean {
        if (this._card !== null){
            return this._card instanceof Card
        }
        return false
    }

    /**
     * Вставляет карту в ячейку
     * @param card Новая карта
     */
    insertCard(card: Card | null): void {
        if (card === null) return
        this._card = card.clone()
    }

    /**
     * Вытаскивает карту из ячейки
     * @returns Текущую карту `Card`, если карта находится в ячейке, иначе `null`
     */
    pullOutCard(): Card | null {
        if (this._card === null) return null
        let temp = this._card
        this._card = null
        return temp
    }
}