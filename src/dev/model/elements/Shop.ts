import Card from "../entities/Card.js";
import ShopCell from "../entities/ShopCell.js";

export default class Shop {
    private _cells: ShopCell[]

    constructor(cards: Card[]) {
        this._cells = [
            new ShopCell(cards[0], true),
            new ShopCell(cards[1], true),
            new ShopCell(cards[2]),
            new ShopCell(cards[3])
        ]
    }

    get allCells(): readonly ShopCell[] { return Object.freeze(this._cells) }
    cell(cellPos: number): ShopCell { return this._cells[cellPos] }

    buyCell(cellPos: number): Card | null {
        return this._cells[cellPos].pullOutCard()
    }

    refresh(cards: Card[]): void {
        if (cards.length !== 4) throw new Error("Карт должно быть 4")
        for(let i = 0; i < 4; i++) {
            this._cells[i].changeCard(cards[i])
        }
    }
}