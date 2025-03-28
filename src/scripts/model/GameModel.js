import { GameDifficult } from "./core/Enums.js";
import Board from "./elements/Board.js";
import Deck from "./elements/Deck.js";
import Hand from "./elements/Hand.js";
import Shop from "./elements/Shop.js";
import Cell from "./entities/Cell.js";
import Player from "./entities/Player.js";
import GameData from "./utilities/GameData.js";
/**
 * Класс игровой модели
 */
export default class GameModel {
    constructor() {
        this._difficult = GameDifficult.Spring;
        this._score = 0;
        this._gameData = new GameData();
        this._player = new Player();
        this._hand = new Hand();
        this._deck = new Deck(this._gameData.getStartDeck());
        this._shop = new Shop(this._gameData.getStartShop());
        this._altar = new Cell();
        this._board = new Board();
    }
    get difficult() { return this._difficult; }
    get score() { return this._score; }
    get gameData() { return Object.freeze(this._gameData); }
    get player() { return Object.freeze(this._player); }
    get hand() { return Object.freeze(this._hand); }
    get deck() { return Object.freeze(this._deck); }
    get shop() { return Object.freeze(this._shop); }
    get altar() { return Object.freeze(this._altar); }
    get board() { return Object.freeze(this._board); }
    /**
     * Увеличивает уровень
     */
    increaseDifficult() {
        this._difficult += 1;
    }
    /**
     * Добавлет счет
     * @param someScore Новый счет
     */
    addScore(someScore) {
        this._score += someScore;
    }
    startTurn() {
    }
}
