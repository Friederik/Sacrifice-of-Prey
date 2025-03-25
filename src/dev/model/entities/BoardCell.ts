import Card from "./Card.js";
import Cell from "./Cell.js";
import Threat from "./Threat.js";

/**
 * Класс ячейки карты для стола
 */
export default class BoardCell extends Cell {
    /** Угроза, находящаяся в ячейке */
    private _threat: Threat | null

    /**
     * Создает экземпляр ячейки карты для стола
     * @param card Новая карта
     */
    constructor(card?: Card | null | undefined) {
        super(card)
        this._threat = null
    }

    get threat(): Threat | null { return this._threat }

    /**
     * Проверяет есть ли угроза в ячейке
     * @returns `true`, если в ячейке находится угроза, иначе `false`
     */
    checkThreat(): boolean {
        if (this._threat !== null){
            return this._threat.constructor.name === "Threat"
        }
        return false
    }

    /**
     * Вставляет карту в ячейку
     * @param card Новая карта
     */
    insertCard(card: Card | null): void {
        if (this.checkCard()) return
        if (card === null) return
        this._card = card
        this._threat = null
    }

    /**
     * Вставляет угрозу в ячейку
     * @param threat Новая угроза
     */
    insertThreat(threat: Threat): void {
        if (!this.checkCard()) this._threat = threat
    }
}