import ShopCell from "../entities/ShopCell.js";
/**
 * Класс магазина
 */
export default class Shop {
    /**
     * Создает сущность магазина
     * @param startShop Начальные карты магазина
     */
    constructor(startShop) {
        this._cells = [
            new ShopCell(startShop[0], true),
            new ShopCell(startShop[1], true),
            new ShopCell(startShop[2]),
            new ShopCell(startShop[3])
        ];
    }
    get allCells() { return this._cells; }
    /**
     * Цена выбранной карты в магазине
     * @param cellPos Номер ячейки
     * @returns Цена
     */
    cellPrice(cellPos) { return this._cells[cellPos].price; }
    /**
     * Выкупает карту из выбранной ячейки
     * @param cellPos Номер ячейки
     * @returns `Card` - если есть возможность выкупить, `null` - если нет или ячейка заблокирована
     */
    buyCell(cellPos) {
        return this._cells[cellPos].pullOutCard();
    }
    /**
     * Обновляет весь магазин
     * @param cards Новые карты
     */
    refresh(cards) {
        if (cards.length !== 4)
            throw new Error("Карт должно быть 4");
        for (let i = 0; i < 4; i++) {
            this._cells[i].changeCard(cards[i]);
        }
    }
}
