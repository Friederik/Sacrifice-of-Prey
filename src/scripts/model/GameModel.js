import { BoardSide, GameDifficult, ScoreData } from "./core/Enums.js";
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
        this._isFirstTurn = true;
        this._isGameWon = false;
    }
    get difficult() { return this._difficult; }
    get score() { return this._score; }
    get gameData() { return this._gameData; }
    get player() { return this._player; }
    get hand() { return this._hand; }
    get deck() { return this._deck; }
    get shop() { return this._shop; }
    get altar() { return this._altar; }
    get board() { return this._board; }
    get isWin() { return this._isGameWon; }
    /**
     * Увеличивает уровень
     */
    setDifficult(difficult) {
        this._difficult = difficult;
    }
    /**
     * Добавлет счет
     * @param someScore Новый счет
     */
    addScore(someScore) {
        if (someScore > 0) {
            this._score += someScore;
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
    startTurn() {
        this._deck.addToDiscard(this._hand.addToHand(this._deck.drawCardsInTurn(this._isFirstTurn)));
        this._board.useTurnEffects(this);
        this._board.releaseThreats();
        if (this._isFirstTurn) {
            this._board.randomPlaceThreats([
                this._gameData.generateThreat(this._difficult),
                this._gameData.generateThreat(this._difficult)
            ]);
        }
        else {
            this._shop.refresh(this._gameData.generateShopCards(this._difficult));
            this._board.randomPlaceThreats([
                this._gameData.generateThreat(this._difficult)
            ]);
        }
        this._isFirstTurn = false;
        this.addScore(ScoreData.StartNewTurn);
        switch (true) {
            case this.score >= 0 && this.score < 5000:
                this.setDifficult(GameDifficult.Spring);
                break;
            case this.score >= 5000 && this.score < 10000:
                this.setDifficult(GameDifficult.Summer);
                break;
            case this.score >= 10000 && this.score < 20000:
                this.setDifficult(GameDifficult.Autumn);
                break;
            case this.score >= 20000 && this.score < 25000:
                this.setDifficult(GameDifficult.Winter);
                break;
            case this.score > 25000:
                this._isGameWon = true;
                break;
        }
    }
    /**
     * Заканчивает ход.
     * Производится бой на столе,
     * убираются в сброс погибшие карты игрока,
     * добавляются кости на счет игрока,
     * считается урон игроку
     */
    endTurn() {
        let altarCard = this._altar.pullOutCard();
        if (altarCard) {
            this._deck.addToDiscard(this._hand.addToHand(altarCard));
        }
        let fightInfo = this._board.fight();
        this._deck.addToDiscard(fightInfo.discard);
        this._player.addMoney(fightInfo.moneyReceived);
        this._player.takeDamage(fightInfo.playerTakenDamage);
        this.addScore(ScoreData.KillEnemy * fightInfo.enemiesDeath);
        this.addScore(ScoreData.DealDamage * fightInfo.opponentTakenDamage);
        return fightInfo;
    }
    /**
     * Выставляет на алтарь выбранную карту из руки.
     * Если на алтаре уже есть карта, то она обратно уходит в руку
     * @param cardId Номер карты в руке
     */
    selectCard(cardId) {
        let altarCard = this._altar.pullOutCard();
        let card = this._hand.pullOutCard(cardId);
        this._altar.insertCard(card);
        if (altarCard)
            this._hand.addToHand(altarCard);
    }
    /**
     * Жертвует карту с алтаря
     * @param args Аргументы для эффекта жертвования карты
     */
    sacrificeAltarCard(...args) {
        let altarCard = this._altar.pullOutCard();
        if (altarCard) {
            altarCard.effectSacrifice(...args);
            this._deck.addToDiscard(altarCard);
        }
        this.addScore(ScoreData.SacrificeCard);
    }
    /**
     * Убирает карту с алтаря и добавляет ее стоимость игроку
     */
    sellAltarCard() {
        let altarCard = this._altar.pullOutCard();
        if (altarCard) {
            this._player.addMoney(altarCard.price);
            this.addScore(ScoreData.SellCard * altarCard.price);
            altarCard = null;
        }
    }
    returnAltarCard() {
        let altarCard = this._altar.pullOutCard();
        if (altarCard) {
            this._deck.addToDiscard(this._hand.addToHand(altarCard));
        }
    }
    /**
     * Ставит карту на ячейку поля и убирает с алтаря, если не занята
     * @param cellId Номер ячейки поля
     */
    placeAltarCard(cellId) {
        if (!this._board.sidePlayer[cellId].checkCard()) {
            let altarCard = this._altar.pullOutCard();
            if (altarCard)
                this._board.placeCard(BoardSide.Player, cellId, altarCard);
        }
        this.addScore(ScoreData.PlaceCard);
    }
    /**
     * Купить выбранную карту в магазине.
     * Нельзя купить при полной руке или недостаточности монет
     * @param cardId Номер карты в магазине
     */
    buyCard(cardId) {
        if (this._shop.allCells[cardId].checkCard()
            && (this._shop.cellPrice(cardId) <= this._player.money)
            && (this._hand.cards.length !== this._hand.handLimit)) {
            let price = this._shop.cellPrice(cardId);
            let card = this._shop.buyCell(cardId);
            if (card) {
                this._player.spendMoney(price);
                this.addScore(ScoreData.BuyCard);
                this._hand.addToHand(card);
            }
        }
    }
    /**
     * Обновить магазин за 5 монет
     */
    refreshShop() {
        if (this._player.money < 5)
            return;
        this._player.spendMoney(5);
        let newCards = this.gameData.generateShopCards(this._difficult);
        this._shop.refresh(newCards);
        this.addScore(ScoreData.ResfreshShop);
    }
}
