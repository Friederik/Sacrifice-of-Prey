export default class Deck {
    constructor(startDeck) {
        this._cards = startDeck;
        this._discard = [];
        this._drawCount = 2;
    }
    get cards() { return Object.freeze(this._cards); }
    get discard() { return Object.freeze(this._discard); }
    get drawCount() { return this._drawCount; }
    /**
     * Фишера-Йетса
     */
    shuffleDeck() {
        let tempDeck = this._cards;
        for (let i = tempDeck.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            let temp = tempDeck[i];
            tempDeck[i] = tempDeck[randIndex];
            tempDeck[randIndex] = temp;
        }
        this._cards = tempDeck;
    }
    pullDeck() {
        this._cards = this._cards.concat(this._discard);
        this.shuffleDeck();
    }
    addToDeck(cards) {
        for (let i = 0; i < cards.length; i++) {
            cards[i].restore();
            this._cards.push(cards[i]);
        }
    }
    addToDiscard(cards) {
        for (let i = 0; i < cards.length; i++) {
            this._discard.push(cards[i]);
        }
    }
    drawCards(count, isFirstTurn) {
        let outCards = [];
        for (let i = 0; i < count; i++) {
            if (isFirstTurn) {
                i--;
                isFirstTurn = false;
            }
            if (this._cards.length > 0) {
                outCards = outCards.concat(this._cards.splice(1, 0));
            }
        }
        return outCards;
    }
    increaseDrawCount() {
        if (this._drawCount > 10)
            return;
        this._drawCount++;
    }
}
