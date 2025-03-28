import JSONConvertible from "../core/JSONConvertible.js";
/**
 * Класс угрозы, которая содержит карту для замены
 */
export default class Threat extends JSONConvertible {
    /**
     * Создает экземпляр угрозы
     * @param card Новая Карта
     */
    constructor(card) {
        if (card === null || card === undefined)
            throw new Error("Карта должна существовать");
        super();
        this._card = card.clone();
    }
    get card() { return this._card; }
}
