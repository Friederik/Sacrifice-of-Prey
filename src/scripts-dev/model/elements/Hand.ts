import Card from "../entities/Card.js"

/**
 * Класс руки игрока
 */
export default class Hand {
    /** Карты в руке */
    private _cards: Card[]
    /** Максимальное количество карт в руке */
    private _handLimit: number

    /** Создает сущность руки */
    constructor() {
        this._cards = []
        this._handLimit = 5
    }

    get cards(): Card[] { return this._cards }
    get handLimit(): number { return this._handLimit }

    getCard(cardId: number): Card {
        return this._cards[cardId]
    }

    /**
     * Добавляет в руку карты,
     * возвращает избыток для сброса
     * @param cards Карты или массив карт
     * @returns Карты для сброса
     */
    addToHand(cards: Card[] | Card): Card[] {
        let discard: Card[] = []
        if (cards instanceof Card) {
            if (this._cards.length < this.handLimit) {
                cards.restore()
                this._cards.push(cards)
            } else {
                discard.push(cards)
            }
        } else {
            for (let i = 0; i < cards.length; i++) {
                if (this._cards.length < this.handLimit) {
                    this._cards.push(cards[i])
                } else {
                    discard.push(cards[i])
                }
            }
        }
        return discard
    }

    /**
     * Вытаскиевает выбранную карту из руки
     * @param cardId Номер карты
     * @returns `Card` - если карта найдена, `null` - если такого номера нет, или рука пуста
     */
    pullOutCard(cardId: number): Card | null {
        if (cardId > this._cards.length || cardId < 0) return null
        if (this._cards.length > 0) return this._cards.splice(cardId, 1)[0]
        return null
    }

    /**
     * Увеличивает максимальное количество карт в руке на 1
     */
    increaseHandLimit(): void {
        if (this._handLimit >= 15) return
        this._handLimit++
    }
}