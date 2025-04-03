import { BoardSide, GameDifficult } from "./model/core/Enums.js";
import Board from "./model/elements/Board.js";
import Card from "./model/entities/Card.js";
import GameModel from "./model/GameModel.js";

let gameModel = new GameModel()

function main() {
    gameModel.startTurn()
    gameModel.hand.addToHand(gameModel.gameData.getCard("Bear"))
    render()
}

function render() {
    /** Характеристики игрока */
    let player = document.querySelector('.player')
    if (player) {
        player.innerHTML = `
            <div class="box">❤️ ${gameModel.player.health}</div>
            <div class="box">💰 ${gameModel.player.money}</div>
        `
    }
    
    /** Счет */
    let score = document.querySelector("#score")
    if (score) {
        score.innerHTML = `Счет: ${gameModel.score}`
    }

    /** Сложность */
    let difficult = document.querySelector("#difficult")
    if (difficult) {
        switch (gameModel.difficult) {
            case 1:
                difficult.innerHTML = `Сложность: Весна`
                break
            case 2:
                difficult.innerHTML = `Сложность: Лето`
                break
            case 3:
                difficult.innerHTML = `Сложность: Осень`
                break
            case 4:
                difficult.innerHTML = `Сложность: Зима`
                break
        }
        
    }

    /** Колода */
    let deck = document.querySelector(".deck")
    if (deck) {
        deck.innerHTML = `
            <div class="box">📚 Колода: ${gameModel.deck.cards.length}</div>
            <div class="box">🤲 Тянуть: ${gameModel.deck.drawCount}</div>
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
            card.className = "card card-active"
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
                        card.className = "card card-active"
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

    checkAltarBtn()

    /** Проигрыш */
    if (!gameModel.player.isAlive) gameOver(false)
    
    /** Выигрыш */
    if (gameModel.isWin) gameOver(true)
}

function bindHand(card: HTMLDivElement): void {
    if (card) {
        card.addEventListener("click", () => {
            let id = Number(card.id.slice(-1))
            gameModel.selectCard(id)
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
        <div class="card-battle">
            <p class="card-effect stats">${cardInfo.effectSacrificeName}</p>
            <p class="card-effect stats">${cardInfo.effectTurnName}</p>
        </div>
        <p class="card-price stats">${cardInfo.price}</p>
    `
    return card
}

function gameOver(isWin: boolean): void {
    let gameOverForm = document.getElementById("game-over") as HTMLDialogElement
    let score = document.querySelector("#score-end")
    let title = document.querySelector("#game-over-title")
    if (gameOverForm && score && title) {
        if (isWin) title.innerHTML = "🗣🗣🗣!WIN WIN WIN!🗣🗣🗣"
        else title.innerHTML = "Вы проиграли"
        score.innerHTML = `Счет: ${gameModel.score}`
        gameOverForm.showModal()
    }
}

/** Кнопка жертвования */
let sacrificeBtn = document.querySelector("#btn-sacrifice") as HTMLButtonElement
sacrificeBtn.addEventListener("click", () => {
    gameModel.sacrificeAltarCard(gameModel)
    render()
})

/** Кнопка продажи */
let sellBtn = document.querySelector("#btn-sell") as HTMLButtonElement
sellBtn.addEventListener("click", () => {
    console.log(2)
    gameModel.sellAltarCard()
    render()
})

function bindThisPlace(cells: number[], cellId: number) {
    gameModel.placeAltarCard(cells[cellId])
    render()
}

function bindPlaces(isActive: boolean): void {
    if (isActive) {
        let emptyCells = gameModel.board.findEmptyCellIds(BoardSide.Player)
        if (emptyCells) {
            for (let i = 0; i < emptyCells.length; i++) {
                let cell = document.querySelector(`#table-player-${emptyCells[i]}`)
                if (cell) {
                    cell.innerHTML = `🔻`
                    cell.addEventListener("click", () => bindThisPlace(emptyCells, i), {once: true})
                } 
            }
        }
    } else {
        let emptyCells = gameModel.board.findEmptyCellIds(BoardSide.Player)
        if (emptyCells) {
            for (let i = 0; i < emptyCells.length; i++) {
                let cell = document.querySelector(`#table-player-${emptyCells[i]}`)
                if (cell) {
                    cell.innerHTML = `🔲`
                } 
            }
        }
    }
}

function checkAltarBtn():void {
    /** Кнопка жертвования */
    !gameModel.altar.checkCard() || gameModel.altar.card?.effectSacrificeName === "" 
        ? sacrificeBtn.disabled = true
        : sacrificeBtn.disabled = false

    /** Кнопка продажи */
    !gameModel.altar.checkCard()
        ? sellBtn.disabled = true
        : sellBtn.disabled = false

    /** Кнопка установки */
    !gameModel.altar.checkCard()
        ? bindPlaces(false)
        : bindPlaces(true)
}

// function 

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

main()