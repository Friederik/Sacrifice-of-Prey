import Card from "../entities/Card.js";
import ShopCell from "../entities/ShopCell.js";

/**
 * Класс магазина
 */
export default class Shop {
    /** Ячейки карт */
    private _cells: ShopCell[]

    /**
     * Создает сущность магазина
     * @param startShop Начальные карты магазина
     */
    constructor(startShop: Card[]) {
        this._cells = [
            new ShopCell(startShop[0], true),
            new ShopCell(startShop[1], true),
            new ShopCell(startShop[2]),
            new ShopCell(startShop[3])
        ]
    }

    get allCells(): readonly ShopCell[] { return Object.freeze(this._cells) }
    /**
     * Цена выбранной карты в магазине
     * @param cellPos Номер ячейки
     * @returns Цена
     */
    cellPrice(cellPos: number): number { return this._cells[cellPos].price }

    /**
     * Выкупает карту из выбранной ячейки
     * @param cellPos Номер ячейки
     * @returns `Card` - если есть возможность выкупить, `null` - если нет или ячейка заблокирована
     */
    buyCell(cellPos: number): Card | null {
        return this._cells[cellPos].pullOutCard()
    }

    /**
     * Обновляет весь магазин
     * @param cards Новые карты
     */
    refresh(cards: Card[]): void {
        if (cards.length !== 4) throw new Error("Карт должно быть 4")
        for(let i = 0; i < 4; i++) {
            this._cells[i].changeCard(cards[i])
        }
    }
}