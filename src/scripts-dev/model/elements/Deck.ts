import Card from "../entities/Card.js"

/**
 * Класс колоды игрока
 */
export default class Deck {
    /** Карты в действительной колоде */
    private _cards: Card[]
    /** Карты в сбросе */
    private _discard: Card[]
    /** Количество вытягивающихся карт в начале хода */
    private _drawCount: number

    /**
     * Создает сущность колоды
     * @param startDeck Стартовая колода, [! НЕ ИСПОЛЬЗОВАТЬ ЕЕ БОЛЬШЕ НИГДЕ !]
     */
    constructor(startDeck: Card[]) {
        this._cards = startDeck
        this._discard = []
        this._drawCount = 2
        // this.shuffleDeck()
    }
    
    get cards():  Card[] { return this._cards }
    get discard(): Card[] { return this._discard }
    get drawCount(): number { return this._drawCount }

    /**
     * Перемешивает колоду по алгоритму Фишера-Йетса
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

    /**
     * Замешивает в действительную колоду карты из сброса
     */
    pullDeck(): void {
        this.addToDeck(this._discard)
        this._discard = []
        this.shuffleDeck()
    }

    /**
     * Добавляет карты в действительную колоду.
     * Восстанавливает их
     * @param cards Карта или массив карт
     */
    addToDeck(cards: Card[] | Card): void {
        if (cards instanceof Card) {
            cards.restore()
            this._cards.unshift(cards)
        } else {
            for (let i = 0; i < cards.length; i++) {
                cards[i].restore()
            }
            this._cards = cards.concat(this._cards)
        }
    }

    /**
     * Добавляет карты в сброс
     * @param cards Карта или массив карт
     */
    addToDiscard(cards: Card[] | Card): void {
        if (cards instanceof Card) {
            this._discard.unshift(cards)
        } else {
            if (cards.length === 0) return
            this._discard = this._discard.concat(cards)
        }
    }

    /**
     * Вытаскивает из колоды заданное количество карт
     * @param count Количество карт
     * @returns Массив карт
     */
    drawCards(count: number): Card[] {
        let outCards: Card[] = []
        for (let i = 0; i < count; i++) {
            if (this._cards.length <= 0) break
            let card = this._cards.pop()
            if (!card) break
            else outCards.push(card)
        }
        return outCards
    }

    /**
     * Вытаскивает из колоды карты в начале хода
     * @param isFirstTurn `true`, если сейчас первый ход, иначе `false` или не обязателен
     * @returns Массив карт
     */
    drawCardsInTurn(isFirstTurn?: boolean): Card[] {
        let outCards: Card[] = []
        if (isFirstTurn) {
            outCards = outCards.concat(this.drawCards(this.drawCount + 1))
        } else {
            outCards = outCards.concat(this.drawCards(this.drawCount))
        }
        return outCards
    }

    /**
     * Увеличивает количество добираемых карт за ход на 1
     */
    increaseDrawCount(): void {
        if (this._drawCount >= 10) return
        this._drawCount++
    }
}