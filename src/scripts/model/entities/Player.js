/**
 * Класс игрока
 */
export default class Player {
    /**
     * Создает сущность игрока
     */
    constructor() {
        this._health = 30;
        this._money = 0;
        this._isAlive = true;
    }
    get health() { return this._health; }
    get money() { return this._money; }
    get isAlive() { return this._isAlive; }
    /**
     * Получение игроком урона
     * @param value Количество урона
     */
    takeDamage(value) {
        if (value < 0)
            return;
        this._health -= value;
        if (this._health <= 0)
            this._isAlive = false;
    }
    /**
     * Потратить деньги со счета
     * @param value Количество денег
     * @returns `true` - если оплата прошла, `false` - если отказано
     */
    spendMoney(value) {
        if (this._money < value || value < 0)
            return false;
        this._money -= value;
        return true;
    }
    /**
     * Добавить деньги на счет
     * @param value Количество денег
     */
    addMoney(value) {
        if (value < 0)
            return;
        this._money += value;
    }
}
