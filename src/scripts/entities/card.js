/**
 * Класс игровой карты
 */
export default class Card {
    #name
    #cover
    #attackMax
    #healthMax
    #attack
    #health
    #abilities

    /**
     * Создает игровую карту, по заданным параметрам
     * @param {string} name - Название карты
     * @param {string} cover - Путь до портрета карты
     * @param {number} attack - Значение атаки карты
     * @param {number} health - Значение здоровья карты
     * @param {Array<string>} abilities - Набор способностей карты
     */
    constructor(name, cover, attack, health, abilities) {
        this.#name = name
        this.#cover = cover
        this.#attackMax = attack
        this.#healthMax = health
        this.#attack = attack
        this.#health = health
        this.#abilities = abilities    
    }

    get data() {
        return Object.freeze({
            name: this.#name,
            cover: this.#cover,
            attack: this.#attack,
            health: this.#health,
            abilities: this.#abilities
        })
    }

    clone() {
        return new Card(this.#name, this.#cover, this.#attack, this.#health, this.#abilities)
    }

    get attack() {
        return this.#attack
    }

    get health() {
        return this.#health
    }

    takeDamage(damage) {
        this.#health -= damage
    }

    restore() {
        this.#attack = this.#attackMax
        this.#health = this.#healthMax
    }

    increaseAttack(value) {
        this.#attack += value
        this.#attackMax += value
    }

    increaseHealth(value) {
        this.#health += value
        this.#healthMax += value
    }
}