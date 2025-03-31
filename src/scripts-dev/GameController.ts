import Board from "./model/elements/Board.js";
import GameModel from "./model/GameModel.js";

let gameModel = new GameModel()



function render() {
    let player = document.querySelector('.player')
    if (player) {
        player.innerHTML = `
            <div>❤️ ${gameModel.player.health}</div>
            <div>💰 ${gameModel.player.money}</div>
        `
    }

    let deck = document.querySelector(".deck")
    if (deck) {
        deck.innerHTML = `
            <div class="box">📚 Колода: ${gameModel.deck.cards.length}</div>
            <div class="box">♻️ Сброс: ${gameModel.deck.discard.length}</div>
        `
    }

    let hand = document.querySelector(".hand")
    if (hand) {
        let handData = gameModel.hand
        hand.innerHTML = ''
        for (let i = 0; i < handData.cards.length; i++) {
            hand.innerHTML += `
                <div class="card" id="card${i}">
                   <img class="cover" src="${handData.getCard(i).coverPath}">
                </div>
            `
        }
    }

    for (let i = 0; i < 5; i++) {
        let opponent = document.querySelector(`#table-opponent-${i}`)
        let player = document.querySelector(`#table-player-${i}`)
        if (opponent) {
            let opponentCard = gameModel.board.sideOpponent[i]
            if (opponentCard.checkThreat()) {
                opponent.innerHTML = "😈"
            } else if (opponentCard.checkCard()) {
                opponent.innerHTML = `
                    <img class="cover" src="${opponentCard.card?.coverPath}">
                `
            }
        }
    }

    let altar = document.querySelector(".altar .card")
    if (altar) {
        if (gameModel.altar.checkCard()) {
            altar.innerHTML = `
                <img class="cover" src="${gameModel.altar.card?.coverPath}">
            `
        }
    }

    updateHand()
}
gameModel.startTurn()
gameModel.startTurn()

// gameModel.hand.addToHand(gameModel.deck.drawCards(2))

function updateHand() {
    for (let i = 0; i < gameModel.hand.cards.length; i++) {
        let card = document.querySelector(`#card${i}`)
        if (card){
            card.addEventListener("click", () => {
                let id = Number(card.id.slice(-1))
                gameModel.selectCard(id)
                console.log(card)
                render()
                updateHand()
            })
        }
    }
}

let endTurnBtn = document.querySelector(".end-turn")
if (endTurnBtn) {
    endTurnBtn.addEventListener("click", () => {
        gameModel.endTurn()
        gameModel.startTurn()
        render()
    })
}

render()
