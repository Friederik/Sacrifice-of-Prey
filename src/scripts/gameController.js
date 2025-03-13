import GameModel from "./gameModel.js"
import Enemy from "./entities/enemy.js"
import { preloadCardsInfo, preloadTierInfo } from "./utility/preloadData.js"

const cardsInfo = await preloadCardsInfo()
const tierInfo = await preloadTierInfo() 

const data = [cardsInfo, tierInfo]
const selectedCards = {
    "Dog": 2,
    "Rabbit": 3,
    "Dear": 4,
    "Wolf": 1
}

const game = new GameModel(data, selectedCards)

game.startNewGame()


//console.table(game.hand)
game.beginTurn()
console.table(game.table)
game.beginTurn()
console.table(game.table)
