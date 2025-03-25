import Card from "../entities/Card.js"

export default class Deck {
    private _cards: Card[]
    private _discard: Card[]
    private _drawCount: number

    constructor(startDeck: Card[]) {
        this._cards = startDeck
        this._discard = []
        this._drawCount = 2
    }
    
    get cards(): readonly Card[] { return Object.freeze(this._cards) }
    get discard(): readonly Card[] { return Object.freeze(this._discard) }
    get drawCount(): number { return this._drawCount }

    /**
     * Фишера-Йетса
     */
    shuffleDeck(): void {
        let tempDeck = this._cards
        for (let i = tempDeck.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1))
            let temp = tempDeck[i]
            tempDeck[i] = tempDeck[randIndex]
            tempDeck[randIndex] = temp
        }
        this._cards = tempDeck
    }

    pullDeck(): void {
        this._cards = this._cards.concat(this._discard)
        this.shuffleDeck()
    }

    addToDeck(cards: Card[]): void {
        for (let i = 0; i < cards.length; i++) {
            this._cards.push(cards[i])
        }
    }

    addToDiscard(cards: Card[]): void {
        for (let i = 0; i < cards.length; i++) {
            this._discard.push(cards[i])
        }
    }

    drawCards(count: number): Card[] {
        let outCards: Card[] = []
        for (let i = 0; i < count; i++) {
            if (this._cards.length > 0) {
                outCards = outCards.concat(this._cards.splice(1, 0))
            }
        }
        return outCards
    }

    increaseDrawCount(): void {
        if (this._drawCount > 10) return
        this._drawCount++
    }
}