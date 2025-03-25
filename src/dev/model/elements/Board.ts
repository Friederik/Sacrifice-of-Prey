import { BoardSide } from "../core/Enums.js";
import { AfterFightInfo } from "../core/Interfaces.js";
import BoardCell from "../entities/BoardCell.js";
import Card from "../entities/Card.js";
import Threat from "../entities/Threat.js";

export default class Board {
    private _sidePlayer: BoardCell[]
    private _sideOpponent: BoardCell[]

    constructor() {
        this._sidePlayer = [new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell()]
        this._sideOpponent = [new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell(), new BoardCell()]
    }

    get sidePlayer(): readonly BoardCell[] { return Object.freeze(this._sidePlayer) }
    get sideOpponent(): readonly BoardCell[] { return Object.freeze(this._sideOpponent) }

    placePlayerCard(cellPos: number, newCard: Card): void {
        this._sidePlayer[cellPos].insertCard(newCard)
    }

    placeOpponentCard(cellPos: number, newEnemy: Card): void {
        this._sideOpponent[cellPos].insertCard(newEnemy)
    }

    removeCard(side: BoardSide, cellPos: number): Card | null {
        switch(side) {
            case "Player":
                return this._sidePlayer[cellPos].pullOutCard()
            case "Opponent":
                return this._sideOpponent[cellPos].pullOutCard()
            default:
                return null
        }
    }

    addThreat(cellPos: number, newThreat: Threat): void {
        this._sideOpponent[cellPos].insertThreat(newThreat)
    }

    releaseThreats(): void {
        for (let i = 0; i < this._sideOpponent.length; i++) {
            if (this._sideOpponent[i].checkThreat()) {
                let curThreat = this._sideOpponent[i].threat
                if (curThreat) this._sideOpponent[i].insertCard(curThreat.card)
            }
        }
    }

    randomPlaceThreats(threats: Threat[]): void {
        let countOfThreats = threats.length
        for (let i = 0; i < countOfThreats; i++) {
            let emptyCells: BoardCell[] = this.findEmptyCells(BoardSide.Opponent)
            let randomIndex = Math.floor(Math.random() * emptyCells.length)
            let tempThreat = threats.pop();
            if (tempThreat) {
                emptyCells[randomIndex].insertThreat(tempThreat)
                emptyCells.slice(randomIndex, 1)
            }
        }
    }

    findEmptyCells(side: BoardSide): BoardCell[] {
        let emptyCells: BoardCell[] = []
        for (let i = 0; i < 5; i++) {
            switch (side) {
                case "Player":
                    if (this._sidePlayer[i].checkCard() || this._sidePlayer[i].checkThreat()) {
                        i++
                    } else {
                        emptyCells.push(this._sidePlayer[i])
                    }
                case "Opponent":
                    if (this._sideOpponent[i].checkCard() || this._sideOpponent[i].checkThreat()) {
                        i++
                    } else {
                        emptyCells.push(this._sideOpponent[i])
                    }
            }
        }
        return emptyCells
    }

    fight(): AfterFightInfo {
        let discard: (Card | null)[] = []
        let playerTakenDamage = 0
        let opponentTakenDamage = 0
        for (let i = 0; i < 5; i++) {
            let playerCell = this._sidePlayer[i]
            let opponentCell = this._sideOpponent[i]
            
            if (playerCell.checkCard() && opponentCell.checkCard() && playerCell.card !== null && opponentCell.card !== null) {
                playerCell.card.takeDamage(opponentCell.card.attack)
                opponentCell.card.takeDamage(playerCell.card.attack)
                if (playerCell.card.health === 0) {
                    discard.push(playerCell.pullOutCard())
                }
                if (opponentCell.card.health === 0) {
                    opponentCell.pullOutCard()
                }
            } else if (playerCell.checkCard() && playerCell.card !== null) {
                opponentTakenDamage += playerCell.card.attack
            } else if (opponentCell.checkCard() && opponentCell.card !== null) {
                playerTakenDamage += opponentCell.card.attack
            }

        }
        discard = discard.filter(card => card !== null)
        let readyDiscard: Card[] = discard as Card[]
        let info: AfterFightInfo = {
            discard: readyDiscard,
            playerTakenDamage: playerTakenDamage,
            opponentTakenDamage: opponentTakenDamage
        }
        return info
    }
}

