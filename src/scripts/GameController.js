import { BoardSide } from "./model/core/Enums.js";
import GameModel from "./model/GameModel.js";
function render() {
    /** Характеристики игрока */
    let player = document.querySelector('.player');
    if (player) {
        player.innerHTML = `
            <div class="box">❤️ ${gameModel.player.health}</div>
            <div class="box">💰 ${gameModel.player.money}</div>
        `;
    }
    /** Счет */
    let score = document.querySelector("#score");
    if (score) {
        score.innerHTML = `Счет: ${gameModel.score}`;
    }
    /** Сложность */
    let difficult = document.querySelector("#difficult");
    if (difficult) {
        switch (gameModel.difficult) {
            case 1:
                difficult.innerHTML = `Сложность: Весна`;
                break;
            case 2:
                difficult.innerHTML = `Сложность: Лето`;
                break;
            case 3:
                difficult.innerHTML = `Сложность: Осень`;
                break;
            case 4:
                difficult.innerHTML = `Сложность: Зима`;
                break;
        }
    }
    /** Колода */
    let deck = document.querySelector(".deck");
    if (deck) {
        deck.innerHTML = `
            <div class="box">📚 Колода: ${gameModel.deck.cards.length}</div>
            <div class="box">♻️ Сброс: ${gameModel.deck.discard.length}</div>
        `;
    }
    /** Рука */
    let hand = document.querySelector(".hand");
    if (hand) {
        let handData = gameModel.hand;
        hand.innerHTML = '';
        for (let i = 0; i < handData.cards.length; i++) {
            let card = createCard(handData.getCard(i), "hand-" + i);
            card.className = "card card-active";
            bindHand(card);
            hand.appendChild(card);
        }
    }
    /** Стол */
    for (let i = 0; i < 5; i++) {
        let opponent = document.querySelector(`#table-opponent-${i}`);
        let player = document.querySelector(`#table-player-${i}`);
        if (opponent) {
            let opponentCell = gameModel.board.sideOpponent[i];
            if (opponentCell.checkThreat()) {
                opponent.innerHTML = "😈";
            }
            else if (opponentCell.checkCard()) {
                if (opponentCell.card) {
                    opponent.innerHTML = '';
                    opponent.appendChild(createCard(opponentCell.card, "opponent-" + i));
                }
            }
            else {
                opponent.innerHTML = "🔲";
            }
        }
        if (player) {
            let playerCell = gameModel.board.sidePlayer[i];
            if (playerCell.checkCard()) {
                if (playerCell.card) {
                    player.innerHTML = '';
                    player.appendChild(createCard(playerCell.card, "player" + i));
                }
            }
            else {
                player.innerHTML = "🔲";
            }
        }
    }
    /** Алтарь */
    let altar = document.querySelector("#altar-card-place");
    if (altar) {
        if (gameModel.altar.checkCard()) {
            if (gameModel.altar.card) {
                altar.innerHTML = '';
                altar.appendChild(createCard(gameModel.altar.card, "altar"));
            }
        }
        else {
            altar.innerHTML = "🔲";
        }
    }
    /** Магазин */
    let shop = document.querySelector(".shop");
    if (shop) {
        for (let i = 0; i < gameModel.shop.allCells.length; i++) {
            let shopCell = document.querySelector(`#shop-${i}`);
            if (shopCell) {
                let cell = gameModel.shop.allCells[i];
                if (cell.isUnLocked) {
                    if (cell.card) {
                        let card = createCard(cell.card, `shop-` + i);
                        card.className = "card card-active";
                        bindShop(card);
                        shopCell.innerHTML = '';
                        shopCell.appendChild(card);
                    }
                    else {
                        shopCell.innerHTML = '💯';
                    }
                }
                else {
                    shopCell.innerHTML = "⛔";
                }
            }
        }
    }
    checkAltarBtn();
    /** Проигрыш */
    if (!gameModel.player.isAlive)
        gameOver(false);
    /** Выигрыш */
    if (gameModel.isWin)
        gameOver(true);
}
function bindHand(card) {
    if (card) {
        card.addEventListener("click", () => {
            let id = Number(card.id.slice(-1));
            gameModel.selectCard(id);
            render();
        });
    }
}
function bindShop(card) {
    if (card) {
        card.addEventListener("click", () => {
            let id = Number(card.id.slice(-1));
            gameModel.buyCard(id);
            render();
        });
    }
}
function createCard(cardInfo, cardId) {
    let card = document.createElement('div');
    card.className = "card";
    card.id = `card-${cardId}`;
    card.innerHTML = `
        <img class="cover" src="${cardInfo.coverPath}">
        <div class="card-battle">
            <p class="card-attack stats">${cardInfo.attack}</p>
            <p class="card-health stats">${cardInfo.health}</p>
        </div>
            <p class="card-price stats">${cardInfo.price}</p>
            <p class="card-effect stats">${cardInfo.effectSacrificeName}</p>
        
    `;
    return card;
}
function gameOver(isWin) {
    let gameOverForm = document.getElementById("game-over");
    let score = document.querySelector("#score-end");
    let title = document.querySelector("#game-over-title");
    if (gameOverForm && score && title) {
        if (isWin)
            title.innerHTML = "🗣🗣🗣!WIN WIN WIN!🗣🗣🗣";
        else
            title.innerHTML = "Вы проиграли";
        score.innerHTML = `Счет: ${gameModel.score}`;
        gameOverForm.showModal();
    }
}
/** Кнопка жертвования */
let sacrificeBtn = document.querySelector("#btn-sacrifice");
sacrificeBtn.addEventListener("click", () => {
    gameModel.sacrificeAltarCard(gameModel);
    render();
});
/** Кнопка продажи */
let sellBtn = document.querySelector("#btn-sell");
sellBtn.addEventListener("click", () => {
    console.log(2);
    gameModel.sellAltarCard();
    render();
});
/** Кнопка установки */
let placeBtn = document.querySelector("#btn-place");
placeBtn.addEventListener("click", () => {
    let emptyCells = gameModel.board.findEmptyCellIds(BoardSide.Player);
    if (emptyCells) {
        for (let i = 0; i < emptyCells.length; i++) {
            let cell = document.querySelector(`#table-player-${emptyCells[i]}`);
            if (cell) {
                cell.innerHTML = `🔻`;
                cell.addEventListener("click", () => {
                    gameModel.placeAltarCard(emptyCells[i]);
                    render();
                });
            }
        }
    }
});
function checkAltarBtn() {
    var _a;
    /** Кнопка жертвования */
    !gameModel.altar.checkCard() || ((_a = gameModel.altar.card) === null || _a === void 0 ? void 0 : _a.effectSacrificeName) === "Пусто"
        ? sacrificeBtn.disabled = true
        : sacrificeBtn.disabled = false;
    /** Кнопка продажи */
    !gameModel.altar.checkCard()
        ? sellBtn.disabled = true
        : sellBtn.disabled = false;
    /** Кнопка возврата карты */
    // let returnBtn = document.querySelector("#btn-return") as HTMLButtonElement
    // !gameModel.altar.checkCard()
    //     ? returnBtn.disabled = true
    //     : returnBtn.disabled = false
    // returnBtn.addEventListener("click", () => {
    //     gameModel.returnAltarCard()
    //     render()
    // })
    /** Кнопка установки */
    !gameModel.altar.checkCard()
        ? placeBtn.disabled = true
        : placeBtn.disabled = false;
}
// function 
let startNewGameBtn = document.querySelector('#new-game-btn');
if (startNewGameBtn) {
    startNewGameBtn.addEventListener("click", () => {
        gameModel = new GameModel();
        gameModel.startTurn();
        render();
        let gameOverForm = document.getElementById("game-over");
        if (gameOverForm) {
            gameOverForm.close();
        }
    });
}
let resfreshShopBtn = document.querySelector('#resfresh-shop-btn');
if (resfreshShopBtn) {
    resfreshShopBtn.addEventListener('click', () => {
        gameModel.refreshShop();
        render();
    });
}
let endTurnBtn = document.querySelector(".end-turn");
if (endTurnBtn) {
    endTurnBtn.addEventListener("click", () => {
        gameModel.endTurn();
        gameModel.startTurn();
        render();
    });
}
let gameModel = new GameModel();
gameModel.startTurn();
// gameModel.board.placeCard(BoardSide.Player, 2, gameModel.gameData.getCard("Bear"))
// gameModel.board.placeCard(BoardSide.Player, 0, gameModel.gameData.getCard("Bear"))
// gameModel.board.sidePlayer[2].card?.increaseHealth(2)
// gameModel.board.placeCard(BoardSide.Opponent, 2, gameModel.gameData.getCard("Cultist"))
// gameModel.board.placeCard(BoardSide.Player, 2, gameModel.gameData.getCard("Cultist"))
// gameModel.board.placeCard(BoardSide.Player, 1, gameModel.gameData.getCard("Cultist"))
render();
