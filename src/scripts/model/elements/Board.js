import { BoardSide } from "../core/Enums.js";
import BoardCell from "../entities/BoardCell.js";
/**
 * Класс игрового стола
 */
export default class Board {
    /**
     * Создает сущность игрового стола
     */
    constructor() {
        this._sidePlayer = [new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell()];
        this._sideOpponent = [new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell()];
    }
    get data() {
        return [Object.freeze(this._sideOpponent), Object.freeze(this._sidePlayer)];
    }
    get sidePlayer() { return Object.freeze(this._sidePlayer); }
    get sideOpponent() { return Object.freeze(this._sideOpponent); }
    /**
     * Размещение карты на пустую ячейку по выбранной стороне.
     * При попытке разместить на занятой ячейке, ничего не произойдет
     * @param side Сторона, на которой нужно разместить карту
     * @param cellPos Позиция ячейки
     * @param newCard Сущность карты для размещения
     */
    placeCard(side, cellPos, newCard) {
        if (cellPos >= 5 && cellPos <= 0)
            return;
        switch (side) {
            case "Player":
                this._sidePlayer[cellPos].insertCard(newCard);
                break;
            case "Opponent":
                this._sideOpponent[cellPos].insertCard(newCard);
                break;
        }
    }
    /**
     * Изъятие карты из ячейки
     * @param side Сторона изъятия
     * @param cellPos Позиция ячейки
     * @returns `Card`, если в ячейке находится карта, иначе `null`
     */
    removeCard(side, cellPos) {
        if (cellPos >= 5 && cellPos <= 0)
            null;
        switch (side) {
            case "Player":
                return this._sidePlayer[cellPos].pullOutCard();
            case "Opponent":
                return this._sideOpponent[cellPos].pullOutCard();
            default:
                return null;
        }
    }
    /**
     * Размещение угрозы на заданную ячейку противника.
     * Если в ячейке уже содержится карта, не размещает угрозу
     * @param cellPos Позиция ячейки
     * @param newThreat Сущность угрозы
     */
    addThreat(cellPos, newThreat) {
        this._sideOpponent[cellPos].insertThreat(newThreat);
    }
    /**
     * Заменяет все угрозы на соответствующие им карты
     */
    releaseThreats() {
        for (let i = 0; i < this._sideOpponent.length; i++) {
            if (this._sideOpponent[i].checkThreat()) {
                let curThreat = this._sideOpponent[i].threat;
                if (curThreat)
                    this._sideOpponent[i].insertCard(curThreat.card);
            }
        }
    }
    /**
     * Размещает угрозы по свободным местам.
     * Не помещяющиеся - пропускает.
     * Если массив пустой - ничего не размещает
     * @param threats Угрозы для размещения
     */
    randomPlaceThreats(threats) {
        for (let i = 0; i < threats.length; i++) {
            let emptyCells = this.findEmptyCells(BoardSide.Opponent);
            if (emptyCells) {
                let randomIndex = Math.floor(Math.random() * emptyCells.length);
                let tempThreat = threats[i];
                emptyCells[randomIndex].insertThreat(tempThreat);
            }
            else {
                break;
            }
        }
    }
    /**
     * Находит все свободные ячейки на выбранной стороне
     * @param side Сторона поиска
     * @returns `BoardCell[]`, если есть пустые ячейки, иначе `null`
     */
    findEmptyCells(side) {
        let emptyCells = [];
        for (let i = 0; i < 5; i++) {
            switch (side) {
                case "Player":
                    if (!(this._sidePlayer[i].checkCard() || this._sidePlayer[i].checkThreat())) {
                        emptyCells.push(this._sidePlayer[i]);
                    }
                    break;
                case "Opponent":
                    if (!(this._sideOpponent[i].checkCard() || this._sideOpponent[i].checkThreat())) {
                        emptyCells.push(this._sideOpponent[i]);
                    }
                    break;
            }
        }
        if (emptyCells.length !== 0)
            return emptyCells;
        return null;
    }
    /**
     * Использует эффекты начала хода каждой карты
     */
    useTurnEffects() {
        var _a, _b, _c, _d;
        for (let i = 0; i < 5; i++) {
            (_b = (_a = this._sideOpponent[i].card) === null || _a === void 0 ? void 0 : _a.effectTurn) === null || _b === void 0 ? void 0 : _b.cast();
        }
        for (let i = 0; i < 5; i++) {
            (_d = (_c = this._sidePlayer[i].card) === null || _c === void 0 ? void 0 : _c.effectTurn) === null || _d === void 0 ? void 0 : _d.cast();
        }
    }
    /**
     * Производит бой.
     * Убирает погибшие карты со стола, карты игрока убирает в сброс.
     * Считает полученный урон, каждой стороны.
     * Считает полученные кости
     * @returns Итоги боя
     */
    fight() {
        let discard = [];
        let moneyReceived = 0;
        let playerTakenDamage = 0;
        let opponentTakenDamage = 0;
        let playerCellDamagePosition = [0, 0, 0, 0, 0];
        let opponentCellDamagePosition = [0, 0, 0, 0, 0];
        for (let i = 0; i < 5; i++) {
            let playerCell = this._sidePlayer[i];
            let opponentCell = this._sideOpponent[i];
            if (playerCell.checkCard() && opponentCell.checkCard() && playerCell.card !== null && opponentCell.card !== null) {
                playerCell.card.takeDamage(opponentCell.card.attack);
                opponentCell.card.takeDamage(playerCell.card.attack);
                playerCellDamagePosition[i] += opponentCell.card.attack;
                opponentCellDamagePosition[i] += playerCell.card.attack;
                if (playerCell.card.health === 0) {
                    discard.push(playerCell.pullOutCard());
                }
                if (opponentCell.card.health === 0) {
                    moneyReceived += opponentCell.card.price;
                    opponentCell.pullOutCard();
                }
            }
            else if (playerCell.checkCard() && playerCell.card !== null) {
                opponentTakenDamage += playerCell.card.attack;
                opponentCellDamagePosition[i] += playerCell.card.attack;
            }
            else if (opponentCell.checkCard() && opponentCell.card !== null) {
                playerTakenDamage += opponentCell.card.attack;
                playerCellDamagePosition[i] += opponentCell.card.attack;
            }
        }
        discard = discard.filter(card => card !== null);
        let readyDiscard = discard;
        let info = {
            discard: readyDiscard,
            moneyReceived: moneyReceived,
            playerTakenDamage: playerTakenDamage,
            opponentTakenDamage: opponentTakenDamage,
            playerCellDamagePosition: playerCellDamagePosition,
            opponentCellDamagePosition: opponentCellDamagePosition
        };
        return info;
    }
}
