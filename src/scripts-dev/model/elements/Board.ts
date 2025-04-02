import { BoardSide } from "../core/Enums.js";
import { AfterFightInfo } from "../core/Interfaces.js";
import BoardCell from "../entities/BoardCell.js";
import Card from "../entities/Card.js";
import Threat from "../entities/Threat.js";
import GameModel from "../GameModel.js";

/**
 * Класс игрового стола
 */
export default class Board {
    /** Сторона игрока */
    private _sidePlayer: BoardCell[]
    /** Сторона противника */
    private _sideOpponent: BoardCell[]

    /** 
     * Создает сущность игрового стола
     */
    constructor() {
        this._sidePlayer = [new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell()]
        this._sideOpponent = [new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell()]
    }

    get data(): [BoardCell[], BoardCell[]] { 
        return [this._sideOpponent, this._sidePlayer] 
    }
    get sidePlayer(): BoardCell[] { return this._sidePlayer }
    get sideOpponent(): BoardCell[] { return this._sideOpponent }

    /**
     * Размещение карты на пустую ячейку по выбранной стороне.
     * При попытке разместить на занятой ячейке, ничего не произойдет
     * @param side Сторона, на которой нужно разместить карту
     * @param cellPos Позиция ячейки
     * @param newCard Сущность карты для размещения
     */
    placeCard(side: BoardSide, cellPos: number, newCard: Card): void {
        if (cellPos >=5 && cellPos <= 0) return
        switch(side) {
            case "Player":
                this._sidePlayer[cellPos].insertCard(newCard)
                break
            case "Opponent":
                this._sideOpponent[cellPos].insertCard(newCard)
                break
        }
    }

    /**
     * Изъятие карты из ячейки
     * @param side Сторона изъятия
     * @param cellPos Позиция ячейки
     * @returns `Card`, если в ячейке находится карта, иначе `null`
     */
    removeCard(side: BoardSide, cellPos: number): Card | null {
        if (cellPos >=5 && cellPos <= 0) null
        switch(side) {
            case "Player":
                return this._sidePlayer[cellPos].pullOutCard()
            case "Opponent":
                return this._sideOpponent[cellPos].pullOutCard()
            default:
                return null
        }
    }

    /**
     * Размещение угрозы на заданную ячейку противника.
     * Если в ячейке уже содержится карта, не размещает угрозу
     * @param cellPos Позиция ячейки
     * @param newThreat Сущность угрозы
     */
    addThreat(cellPos: number, newThreat: Threat): void {
        this._sideOpponent[cellPos].insertThreat(newThreat)
    }

    /**
     * Заменяет все угрозы на соответствующие им карты
     */
    releaseThreats(): void {
        for (let i = 0; i < this._sideOpponent.length; i++) {
            if (this._sideOpponent[i].checkThreat()) {
                let curThreat = this._sideOpponent[i].threat
                if (curThreat) this._sideOpponent[i].insertCard(curThreat.card.clone())
            }
        }
    }

    /**
     * Размещает угрозы по свободным местам.
     * Не помещяющиеся - пропускает.
     * Если массив пустой - ничего не размещает
     * @param threats Угрозы для размещения
     */
    randomPlaceThreats(threats: Threat[]): void {
        for (let i = 0; i < threats.length; i++) {
            let emptyCells: BoardCell[] | null = this.findEmptyCells(BoardSide.Opponent)
            if (emptyCells) {
                let randomIndex = Math.floor(Math.random() * emptyCells.length)
                let tempThreat = threats[i]
                emptyCells[randomIndex].insertThreat(tempThreat)
            } else {
                break
            }
        }
    }

    /**
     * Находит все свободные ячейки на выбранной стороне
     * @param side Сторона поиска
     * @returns `BoardCell[]`, если есть пустые ячейки, иначе `null`
     */
    findEmptyCells(side: BoardSide): BoardCell[] | null {
        let emptyCells: BoardCell[] = []
        for (let i = 0; i < 5; i++) {
            switch (side) {
                case "Player":
                    if (!(this._sidePlayer[i].checkCard() || this._sidePlayer[i].checkThreat())) {
                        emptyCells.push(this._sidePlayer[i])
                    }
                    break
                case "Opponent":
                    if (!(this._sideOpponent[i].checkCard() || this._sideOpponent[i].checkThreat())) {
                        emptyCells.push(this._sideOpponent[i])
                    }
                    break
            }
        }
        if (emptyCells.length !== 0) return emptyCells
        return null
    }

    /**
     * Находит все номера свободных ячейек на выбранной стороне
     * @param side Сторона поиска
     * @returns `number[]`, если есть пустые ячейки, иначе `null`
     */
    findEmptyCellIds(side: BoardSide): number[] | null {
        let emptyCellIds: number[] = []
        for (let i = 0; i < 5; i++) {
            switch (side) {
                case "Player":
                    if (!(this._sidePlayer[i].checkCard() || this._sidePlayer[i].checkThreat())) {
                        emptyCellIds.push(i)
                    }
                    break
                case "Opponent":
                    if (!(this._sideOpponent[i].checkCard() || this._sideOpponent[i].checkThreat())) {
                        emptyCellIds.push(i)
                    }
                    break  
            }
        }
        if (emptyCellIds.length !== 0) return emptyCellIds
        return null
    }

    /**
     * Использует эффекты начала хода каждой карты
     */
    useTurnEffects(gameModel: GameModel): void {
        for (let i = 0; i < 5; i++) {
            let effect = this._sideOpponent[i].card?.effectTurn
            if (effect !== undefined) {
                effect(gameModel, i, BoardSide.Opponent)
            }
        }
        for (let i = 0; i < 5; i++) {
            let effect = this._sidePlayer[i].card?.effectTurn
            if (effect !== undefined) {
                effect(gameModel, i, BoardSide.Player)
            }
        }
    }

    /**
     * Проверяет стол на наличие мертвых карт
     * @returns Двумерный массив, где первая мера: `0` - Противник, `1` - Игрок. 
     * Вторая мера: `true` - если на позиции мертвая карта, `false` иначе
     */
    checkDeaths(): boolean[][] {
        let deaths = [[false, false, false, false, false], [false, false, false, false, false]]
        for (let i = 0; i < 5; i++) {
            if (this._sideOpponent[i].card?.health === 0) deaths[0][i] = true
            if (this._sidePlayer[i].card?.health === 0) deaths[1][i] = true
        }
        return deaths
    }

    /**
     * Производит бой.
     * Убирает погибшие карты со стола, карты игрока убирает в сброс.
     * Считает полученный урон, каждой стороны.
     * Считает полученные кости
     * @returns Итоги боя
     */
    fight(): AfterFightInfo {
        let discard: (Card | null)[] = []
        let moneyReceived = 0
        let playerTakenDamage = 0
        let opponentTakenDamage = 0
        let playerCellDamagePosition = [0, 0, 0, 0, 0]
        let opponentCellDamagePosition = [0, 0, 0, 0, 0]
        let enemiesDeath = 0
        for (let i = 0; i < 5; i++) {
            let playerCell = this._sidePlayer[i]
            let opponentCell = this._sideOpponent[i]
            
            if (playerCell.checkCard() && opponentCell.checkCard() && playerCell.card !== null && opponentCell.card !== null) {
                playerCell.card.takeDamage(opponentCell.card.attack)
                opponentCell.card.takeDamage(playerCell.card.attack)
                playerCellDamagePosition[i] += opponentCell.card.attack
                opponentCellDamagePosition[i] += playerCell.card.attack
                if (playerCell.card.health === 0) {
                    let card = playerCell.pullOutCard()
                    // card?.restore()
                    discard.push(card)
                }
                if (opponentCell.card.health === 0) {
                    moneyReceived += opponentCell.card.price
                    opponentCell.card.restore()
                    opponentCell.pullOutCard()
                    enemiesDeath += 1
                }
            } else if (playerCell.checkCard() && playerCell.card !== null) {
                opponentTakenDamage += playerCell.card.attack
                opponentCellDamagePosition[i] += playerCell.card.attack
            } else if (opponentCell.checkCard() && opponentCell.card !== null) {
                playerTakenDamage += opponentCell.card.attack
                playerCellDamagePosition[i] += opponentCell.card.attack
            }

        }
        discard = discard.filter(card => card !== null)
        let readyDiscard: Card[] = discard as Card[]
        let info: AfterFightInfo = {
            discard: readyDiscard,
            moneyReceived: moneyReceived,
            playerTakenDamage: playerTakenDamage,
            opponentTakenDamage: opponentTakenDamage,
            playerCellDamagePosition: playerCellDamagePosition,
            opponentCellDamagePosition: opponentCellDamagePosition,
            enemiesDeath: enemiesDeath
        }
        return info
    }
}

