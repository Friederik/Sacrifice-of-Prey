import Cell from "./Cell.js";
/**
 * Класс ячейки карты для стола
 */
export default class BoardCell extends Cell {
    /**
     * Создает экземпляр ячейки карты для стола
     * @param card Новая карта
     */
    constructor(card) {
        super(card);
        this._threat = null;
    }
    get threat() { return this._threat; }
    /**
     * Проверяет есть ли угроза в ячейке
     * @returns `true`, если в ячейке находится угроза, иначе `false`
     */
    checkThreat() {
        if (this._threat !== null) {
            return this._threat.constructor.name === "Threat";
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
        this._card = card;
        this._threat = null;
    }
    /**
     * Вставляет угрозу в ячейку
     * @param threat Новая угроза
     */
    insertThreat(threat) {
        if (!this.checkCard())
            this._threat = threat;
    }
}
