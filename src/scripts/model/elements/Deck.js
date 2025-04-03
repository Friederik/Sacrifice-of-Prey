import Card from "../entities/Card.js";
/**
 * Класс колоды игрока
 */
export default class Deck {
    /**
     * Создает сущность колоды
     * @param startDeck Стартовая колода, [! НЕ ИСПОЛЬЗОВАТЬ ЕЕ БОЛЬШЕ НИГДЕ !]
     */
    constructor(startDeck) {
        this._cards = startDeck;
        this._discard = [];
        this._drawCount = 2;
        this.shuffleDeck();
    }
    get cards() { return this._cards; }
    get discard() { return this._discard; }
    get drawCount() { return this._drawCount; }
    /**
     * Перемешивает колоду по алгоритму Фишера-Йетса
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
    /**
     * Замешивает в действительную колоду карты из сброса
     */
    pullDeck() {
        this.addToDeck(this._discard);
        this._discard = [];
        this.shuffleDeck();
    }
    /**
     * Добавляет карты в действительную колоду.
     * Восстанавливает их
     * @param cards Карта или массив карт
     */
    addToDeck(cards) {
        if (cards instanceof Card) {
            cards.restore();
            this._cards.unshift(cards);
        }
        else {
            for (let i = 0; i < cards.length; i++) {
                cards[i].restore();
            }
            this._cards = cards.concat(this._cards);
        }
    }
    /**
     * Добавляет карты в сброс
     * @param cards Карта или массив карт
     */
    addToDiscard(cards) {
        if (cards instanceof Card) {
            this._discard.unshift(cards);
        }
        else {
            if (cards.length === 0)
                return;
            this._discard = this._discard.concat(cards);
        }
    }
    /**
     * Вытаскивает из колоды заданное количество карт
     * @param count Количество карт
     * @returns Массив карт
     */
    drawCards(count) {
        let outCards = [];
        for (let i = 0; i < count; i++) {
            if (this._cards.length <= 0)
                this.pullDeck();
            let card = this._cards.pop();
            if (!card)
                break;
            else
                outCards.push(card);
        }
        return outCards;
    }
    /**
     * Вытаскивает из колоды карты в начале хода
     * @param isFirstTurn `true`, если сейчас первый ход, иначе `false` или не обязателен
     * @returns Массив карт
     */
    drawCardsInTurn(isFirstTurn) {
        let outCards = [];
        if (isFirstTurn) {
            outCards = outCards.concat(this.drawCards(this.drawCount + 1));
        }
        else {
            outCards = outCards.concat(this.drawCards(this.drawCount));
        }
        return outCards;
    }
    /**
     * Увеличивает количество добираемых карт за ход на 1
     */
    increaseDrawCount() {
        if (this._drawCount >= 5)
            return;
        this._drawCount++;
    }
}
