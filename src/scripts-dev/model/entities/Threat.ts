import JSONConvertible from "../core/JSONConvertible.js";
import Card from "./Card.js";

/**
 * Класс угрозы, которая содержит карту для замены
 */
export default class Threat extends JSONConvertible {
    /**Содержащаяся карта */
    private _card: Card

    /**
     * Создает экземпляр угрозы
     * @param card Новая Карта
     */
    constructor(card: Card | null | undefined) {
        if (card === null || card === undefined) throw new Error("Карта должна существовать")
        super()
        this._card = card.clone()
    }

    get card(): Card { return this._card }
}