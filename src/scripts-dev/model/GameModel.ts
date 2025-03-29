import { GameDifficult } from "./core/Enums.js"
import { AfterFightInfo } from "./core/Interfaces.js"
import Board from "./elements/Board.js"
import Deck from "./elements/Deck.js"
import Hand from "./elements/Hand.js"
import Shop from "./elements/Shop.js"
import Cell from "./entities/Cell.js"
import Player from "./entities/Player.js"
import GameData from "./utilities/GameData.js"

/**
 * Класс игровой модели
 */
export default class GameModel {
    /** Текущий уровень */
    private _difficult: GameDifficult
    /** Текущий счет */
    private _score: number
    
    /** Сущность игровых данных */
    private _gameData: GameData
    /** Сущность игрока */
    private _player: Player
    /** Сущность руки */
    private _hand: Hand
    /** Сущность колоды */
    private _deck: Deck
    /** Сущность магазина */
    private _shop: Shop
    /** Сущность алтаря */
    private _altar: Cell
    /** Сущность стола */
    private _board: Board

    private _isFirstTurn: boolean 

    constructor() {
        this._difficult = GameDifficult.Spring
        this._score = 0
        this._gameData = new GameData()
        this._player = new Player()
        this._hand = new Hand()
        this._deck = new Deck(this._gameData.getStartDeck())
        this._shop = new Shop(this._gameData.getStartShop())
        this._altar = new Cell()
        this._board = new Board()
        this._isFirstTurn = true
    }

    get difficult(): GameDifficult { return this._difficult }
    get score(): number { return this._score }
    get gameData(): GameData { return this._gameData} 
    get player(): Player { return this._player }
    get hand(): Hand { return this._hand }
    get deck(): Deck { return this._deck }
    get shop(): Shop { return this._shop }
    get altar(): Cell { return this._altar }
    get board(): Board { return this._board }

    /**
     * Увеличивает уровень
     */
    increaseDifficult(): void {
        this._difficult += 1
    }

    /**
     * Добавлет счет
     * @param someScore Новый счет
     */
    addScore(someScore: number): void {
        if (someScore > 0) {
            this._score += someScore
        }
    }

    /**
     * Начинает новый ход.
     * Тянутся карты из колоды, 
     * используются эффекты карт для хода,
     * обновляется магазин со второго хода,
     * раскрывает существующие угрозы,
     * добавляет новые угрозы
     */
    startTurn(): void {
        this._hand.addToHand(this._deck.drawCardsInTurn(this._isFirstTurn)) 
        this._board.useTurnEffects()
        this._board.releaseThreats()
        if (this._isFirstTurn) {
            this._board.randomPlaceThreats([
                this._gameData.generateThreat(this._difficult),
                this._gameData.generateThreat(this._difficult)
            ])
        } else {
            this._shop.refresh(this._gameData.generateShopCards(this._difficult))
            this._board.randomPlaceThreats([
                this._gameData.generateThreat(this._difficult)
            ])
        }
        this._isFirstTurn = false
    }

    /**
     * Заканчивает ход.
     * Производится бой на столе,
     * убираются в сброс погибшие карты игрока,
     * добавляются кости на счет игрока,
     * считается урон игроку
     */
    endTurn(): AfterFightInfo {
        let altarCard = this._altar.pullOutCard()
        if (altarCard) this._hand.addToHand(altarCard)
        let fightInfo = this._board.fight()
        this._deck.addToDiscard(fightInfo.discard)
        this._player.addMoney(fightInfo.moneyReceived)
        this._player.takeDamage(fightInfo.playerTakenDamage)
        return fightInfo
    }

    /**
     * Выставляет на алтарь выбранную карту из руки.
     * Если на алтаре уже есть карта, то она обратно уходит в руку
     * @param cardId Номер карты в руке
     */
    chooseCard(cardId: number): void {
        let altarCard = this._altar.pullOutCard()
        let card = this._hand.pullOutCard(cardId)
        this._altar.insertCard(card)
        if (altarCard) this._hand.addToHand(altarCard)
        
    }

    sacrificeCard(): void {
        
    }
    
    soldCard(): void {
        
    }

    placeCard(): void {
        
    }

    buyCard(): void {
        
    }

    refreshShop(): void {
        
    }
}