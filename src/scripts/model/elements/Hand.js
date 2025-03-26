import Card from "../entities/Card.js";
export default class Hand {
    constructor() {
        this._cards = [];
        this._handLimit = 5;
    }
    get cards() { return Object.freeze(this._cards); }
    get handLimit() { return this._handLimit; }
    addToHand(cards) {
        if (cards instanceof Card) {
            cards.restore();
            this._cards.push(cards);
        }
        else {
            for (let i = 0; i < cards.length; i++) {
                this._cards.push(cards[i]);
            }
        }
    }
    pullOutCard(cardId) {
        if (this._cards.length > 0)
            return this._cards[cardId];
        return null;
    }
    increaseHandLimit() {
        if (this._handLimit > 15)
            return;
        this._handLimit++;
    }
}
