import { CardData, Effect } from "../core/Interfaces.js";
import JSONConvertible from "../core/JSONConvertible.js";

/**
 * Класс игровой карты
 */
export default class Card extends JSONConvertible {
    /** Название карты */
    private _name: string
    /** Путь до портрета карты */
    private _coverPath: string
    /** Максимальная атака карты*/
    private _attackMax: number
    /** Максимальное здоровье карты */
    private _healthMax: number
    /** Нормальная цена карты */
    private _priceNormal: number
    /** Атака карты */
    private _attack: number
    /** Здоровье карты */
    private _health: number 
    /** Цена карты */
    private _price: number
    /** Описание карты */
    private _description: string
    /** Название эффекта при жертвовании */
    private _effectSacrificeName: string
    /** Название эффекта при начале хода */
    private _effectTurnName: string
    /** Эффект при жертвовании */
    private readonly _effectSacrifice: Effect
    /** Эффект при начале хода */
    private readonly _effectTurn: Effect
    /** Данные карты */
    private _cardData: CardData

    /**
     * Создает экземпляр карты
     * @param cardData Данные карты
     */
    constructor(cardDataProto: CardData) {
        super()
        let cardData = { ...cardDataProto } //JSON.parse(JSON.stringify(cardDataProto))
        this._name = cardData.name
        this._coverPath = cardData.coverPath
        this._attackMax = cardData.attack
        this._healthMax = cardData.health
        this._priceNormal = cardData.price
        this._attack = cardData.attack
        this._health = cardData.health
        this._price = cardData.price
        this._effectSacrificeName = cardData.effectSacrificeName
        this._effectTurnName = cardData.effectTurnName
        this._effectSacrifice = cardData.effectSacrifice
        this._effectTurn = cardData.effectTurn 
        this._description = cardData.description
        this._cardData = cardData
    }

    get data(): CardData { return this._cardData }
    get name(): string { return this._name }
    get coverPath(): string { return this._coverPath }
    get attack(): number { return this._attack }
    get health(): number { return this._health }
    get price(): number { return this._price }
    get description(): string { return this._description }
    get effectSacrificeName(): string { return this._effectSacrificeName }
    get effectTurnName(): string { return this._effectTurnName }
    get effectSacrifice() { return this._effectSacrifice }
    get effectTurn() { return this._effectTurn }

    /**
     * Обновляет внутренние настройки карты
     */
    updateCardData(): void {
        this._cardData.attack = this._attack
        this._cardData.health = this._health
        this._cardData.price = this._price
    }

    /**
     * Копирует текущую карту
     * @returns Копия карты
     */
    clone(): Card {
        return new Card(this._cardData)
    }

    /**
     * Получение урона картой
     * @param value Количество урона
     */
    takeDamage(value: number): void {
        if (value < 0) return
        this._health -= value
        if (this._health < 0) this._health = 0
        this.updateCardData()
    }

    /**
     * Восстановление характеристик карты
     */
    restore(): void {
        this._attack = this._attackMax
        this._health = this._healthMax
        this._price = this._priceNormal
        this.updateCardData()
    }

    /**
     * Увеличение атаки карты
     * @param value Количество атаки
     */
    increaseAttack(value: number): void {
        if (value < 0) return
        this._attack += value
        this._attackMax += value
        this.updateCardData()
    }

    /**
     * Увеличение количества здоровья карты
     * @param value Количество здоровья
     */
    increaseHealth(value: number): void {
        if (value < 0) return
        this._health += value
        this._healthMax += value
        this.updateCardData()
    }

    /**
     * Увеличение стоимости карты
     * @param value Количество единиц
     */
    increasePrice(value: number): void {
        if (value < 0) return
        this._price += value
        this.updateCardData()
    }

    /**
     * Уменьшение стоимости карты
     * @param value Количество единиц
     */
    decreasePrice(value: number): void {
        if (value < 0) return
        this._price -= value
        this.updateCardData()
    }
}