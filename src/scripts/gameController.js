import GameModel from "./gameModel.js"
import Enemy from "./entities/enemy.js"
import { preloadCardsInfo, preloadTierInfo } from "./utility/preloadData.js"

const cardsInfo = await preloadCardsInfo()
const tierInfo = await preloadTierInfo() 

const data = [cardsInfo, tierInfo]
const selectedCards = {
    "Dog": 0,
    "Rabbit": 5,
    "Dear": 0,
    "Wolf": 0
}

const game = new GameModel(data, selectedCards)

game.startNewGame()

game.placeEnemy(2, "Hunter")
game.placeEnemy(4, "Cultist")
game.placeCard(0, 4)
game.placeCard(0, 2)


console.table(game.hand)
console.table(game.table)

game.endTurn()

console.table(game.table)
