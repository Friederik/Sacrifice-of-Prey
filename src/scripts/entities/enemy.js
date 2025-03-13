import Card from "./card.js";

/**
 * Класс карты противника
 */
export default class Enemy extends Card {
    #award

    /**
     * Создает карту противника, по заданным параметрам
     * @param {string} name - Название карты
     * @param {string} cover - Путь до портрета карты
     * @param {number} attack - Значение атаки карты
     * @param {number} health - Значение здоровья карты
     * @param {Array<string>} abilities - Набор способностей карты
     * @param {number} award -  
     */
    constructor(name, cover, attack, health, abilities, award) {
        super(name, cover, attack, health, abilities)
        this.#award = award
    }

    clone() {
        return new Enemy(super.data.name, super.data.cover, super.data.attack, super.data.health,
            super.data.abilities, this.#award
        )
    }
}