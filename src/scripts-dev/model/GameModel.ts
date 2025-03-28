import { GameDifficult } from "./core/Enums.js"
import Board from "./elements/Board.js"
import Deck from "./elements/Deck.js"
import Hand from "./elements/Hand.js"
import Shop from "./elements/Shop.js"
import Cell from "./entities/Cell.js"
import Player from "./entities/Player.js"
import GameData from "./utilities/GameData.js"

export default class GameModel {
    private _difficult: GameDifficult
    // private _score: number
    
    // private _gameData: GameData
    // private _player: Player
    // private _hand: Hand
    // private _deck: Deck
    // private _shop: Shop
    // private _altar: Cell
    // private _board: Board

    constructor() {
        this._difficult = GameDifficult.Spring
    }
}