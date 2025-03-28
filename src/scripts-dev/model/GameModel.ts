import { GameDifficult } from "./core/Enums.js"
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
    }

    get difficult(): GameDifficult { return this._difficult }
    get score(): number { return this._score }
    get gameData(): Readonly<GameData> { return Object.freeze(this._gameData)} 
    get player(): Readonly<Player> { return Object.freeze(this._player) }
    get hand(): Readonly<Hand> { return Object.freeze(this._hand) }
    get deck(): Readonly<Deck> { return Object.freeze(this._deck) }
    get shop(): Readonly<Shop> { return Object.freeze(this._shop) }
    get altar(): Readonly<Cell> { return Object.freeze(this._altar) }
    get board(): Readonly<Board> { return Object.freeze(this._board) }

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
        this._score += someScore
    }

    startTurn(): void {

    }
}