import { BoardSide } from "./model/core/Enums.js";
import Board from "./model/elements/Board.js";
import Card from "./model/entities/Card.js";
import GameModel from "./model/GameModel.js";

let gameModel = new GameModel()

function render() {
    /** Характеристики игрока */
    let player = document.querySelector('.player')
    if (player) {
        player.innerHTML = `
            <div>❤️ ${gameModel.player.health}</div>
            <div>💰 ${gameModel.player.money}</div>
        `
    }

    /** Колода */
    let deck = document.querySelector(".deck")
    if (deck) {
        deck.innerHTML = `
            <div class="box">📚 Колода: ${gameModel.deck.cards.length}</div>
            <div class="box">♻️ Сброс: ${gameModel.deck.discard.length}</div>
        `
    }

    /** Рука */
    let hand = document.querySelector(".hand")
    if (hand) {
        let handData = gameModel.hand
        hand.innerHTML = ''
        for (let i = 0; i < handData.cards.length; i++) {
            let card = createCard(handData.getCard(i), "hand-"+i)
            bindHand(card)
            hand.appendChild(card)
        }
    }

    /** Стол */
    for (let i = 0; i < 5; i++) {
        let opponent = document.querySelector(`#table-opponent-${i}`)
        let player = document.querySelector(`#table-player-${i}`)
        if (opponent) {
            let opponentCell = gameModel.board.sideOpponent[i]
            if (opponentCell.checkThreat()) {
                opponent.innerHTML = "😈"
            } else if (opponentCell.checkCard()) {
                if (opponentCell.card) {
                    opponent.innerHTML = ''
                    opponent.appendChild(createCard(opponentCell.card, "opponent-"+i))
                }
            } else {
                opponent.innerHTML = "🔲"
            }

            
        }
        if (player) {
            let playerCell = gameModel.board.sidePlayer[i]
            if (playerCell.checkCard()) {
                if(playerCell.card){
                    player.innerHTML = ''
                    player.appendChild(createCard(playerCell.card, "player"+i))
                }
            } else {
                player.innerHTML = "🔲"
            }
        }
    }

    /** Алтарь */
    let altar = document.querySelector("#altar-card-place")
    if (altar) {
        if (gameModel.altar.checkCard()) {
            if (gameModel.altar.card) {
                altar.innerHTML = ''
                altar.appendChild(createCard(gameModel.altar.card, "altar"))
            }   
        }
        else {
            altar.innerHTML = "🔲"
        }
    }

    /** Магазин */
    let shop = document.querySelector(".shop")
    if (shop) {
        for (let i = 0; i < gameModel.shop.allCells.length; i++) {
            let shopCell = document.querySelector(`#shop-${i}`)
            if (shopCell) {
                let cell = gameModel.shop.allCells[i]
                if (cell.isUnLocked) {
                    if (cell.card) {
                        let card = createCard(cell.card, `shop-`+i)
                        bindShop(card)
                        shopCell.innerHTML = ''
                        shopCell.appendChild(card)
                    } else {
                        shopCell.innerHTML = '💯'
                    }
                } else {
                    shopCell.innerHTML = "⛔"
                }
            }
        }
    }

    /** Проигрыш */
    if (!gameModel.player.isAlive) {
        gameOver()
    }
}

function bindHand(card: HTMLDivElement): void {
    if (card) {
        card.addEventListener("click", () => {
            let id = Number(card.id.slice(-1))
            gameModel.selectCard(id)
            let sacrificeBtn = document.querySelector("#btn-sacrifice") as HTMLButtonElement
            console.log(gameModel.altar.card?.effectSacrificeName)
            gameModel.altar.card?.effectSacrificeName === "Пусто" 
                ? sacrificeBtn.disabled = true
                : sacrificeBtn.disabled = false
            render()
        })
    }
}

function bindShop(card: HTMLDivElement): void {
    if (card) {
        card.addEventListener("click", () => {
            let id = Number(card.id.slice(-1))
            gameModel.buyCard(id)
            render()
        })
    }
}

function createCard(cardInfo: Card, cardId: string): HTMLDivElement {
    let card = document.createElement('div')
    card.className = "card"
    card.id = `card-${cardId}`
    card.innerHTML = `
        <img class="cover" src="${cardInfo.coverPath}">
        <div class="card-battle">
            <p class="card-attack stats">${cardInfo.attack}</p>
            <p class="card-health stats">${cardInfo.health}</p>
        </div>
        <p class="card-price stats">${cardInfo.price}</p>
    `
    return card
}

function gameOver(): void {
    let gameOverForm = document.getElementById("game-over") as HTMLDialogElement
    if (gameOverForm) {
        gameOverForm.showModal()
    }
}

let startNewGameBtn = document.querySelector('#new-game-btn')
if (startNewGameBtn) {
    startNewGameBtn.addEventListener("click", () => {
        gameModel = new GameModel()
        gameModel.startTurn()
        render()

        let gameOverForm = document.getElementById("game-over") as HTMLDialogElement
        if (gameOverForm) {
            gameOverForm.close()
        }
    })
}

let resfreshShopBtn = document.querySelector('#resfresh-shop-btn')
if (resfreshShopBtn) {
    resfreshShopBtn.addEventListener('click', () => {
        gameModel.refreshShop()
        render()
    })
}

let endTurnBtn = document.querySelector(".end-turn")
if (endTurnBtn) {
    endTurnBtn.addEventListener("click", () => {
        gameModel.endTurn()
        gameModel.startTurn()
        render()
    })
}

let returnBtn = document.querySelector("#btn-return")
if (returnBtn) {
    returnBtn.addEventListener("click", () => {
        gameModel.returnAltarCard()
        render()
    })
}

gameModel.startTurn()
gameModel.board.placeCard(BoardSide.Opponent, 2, gameModel.gameData.getCard("Cultist"))
gameModel.board.placeCard(BoardSide.Player, 2, gameModel.gameData.getCard("Cultist"))
gameModel.board.placeCard(BoardSide.Player, 1, gameModel.gameData.getCard("Cultist"))

render()

