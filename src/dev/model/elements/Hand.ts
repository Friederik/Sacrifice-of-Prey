import Card from "../entities/Card.js"

export default class Hand {
    private _cards: Card[]
    private _handLimit: number

    constructor() {
        this._cards = []
        this._handLimit = 5
    }

    get cards(): readonly Card[] { return Object.freeze(this._cards)}
    get handLimit(): number { return this._handLimit }

    addToHand(cards: Card[] | Card): void {
        if (cards instanceof Card) {
            cards.restore()
            this._cards.push(cards)
        } else {
            for (let i = 0; i < cards.length; i++) {
                this._cards.push(cards[i])
            }
        }
    }

    pullOutCard(cardId: number): Card | null {
        if (this._cards.length > 0) return this._cards[cardId]
        return null
    }

    increaseHandLimit(): void {
        if (this._handLimit > 15) return
        this._handLimit++
    }
}