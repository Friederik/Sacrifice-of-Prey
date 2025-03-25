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
    card(cardId: number): Card { return this._cards[cardId] }

    addToHand(cards: Card[]): void {
        for (let i = 0; i < cards.length; i++) {
            this._cards.push(cards[i])
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