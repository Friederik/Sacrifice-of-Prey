/**
 * Перечисление сложностей игры 1-7
 */
export var GameDifficult;
(function (GameDifficult) {
    /** Весна */
    GameDifficult[GameDifficult["Spring"] = 1] = "Spring";
    /** Лето */
    GameDifficult[GameDifficult["Summer"] = 2] = "Summer";
    /** Осень */
    GameDifficult[GameDifficult["Autumn"] = 3] = "Autumn";
    /** Зима */
    GameDifficult[GameDifficult["Winter"] = 4] = "Winter";
    /** Метель */
    GameDifficult[GameDifficult["Blizzard"] = 5] = "Blizzard";
    /** Ледниковый период */
    GameDifficult[GameDifficult["IceAge"] = 6] = "IceAge";
    /** Вечная ночь */
    GameDifficult[GameDifficult["EternalNight"] = 7] = "EternalNight";
})(GameDifficult || (GameDifficult = {}));
/**
 * Перечисление сторон стола
 */
export var BoardSide;
(function (BoardSide) {
    /** Сторона игрока */
    BoardSide["Player"] = "Player";
    /** Сторона противника */
    BoardSide["Opponent"] = "Opponent";
})(BoardSide || (BoardSide = {}));
/** Перечисление возможных очков */
export var ScoreData;
(function (ScoreData) {
    /** Убийство карты противника */
    ScoreData[ScoreData["KillEnemy"] = 200] = "KillEnemy";
    /** Нанесение урона противнику */
    ScoreData[ScoreData["DealDamage"] = 70] = "DealDamage";
    /** Начало нового раунда */
    ScoreData[ScoreData["StartNewTurn"] = 30] = "StartNewTurn";
    /** Продажа карты */
    ScoreData[ScoreData["SellCard"] = 60] = "SellCard";
    /** Покупка карты */
    ScoreData[ScoreData["BuyCard"] = 100] = "BuyCard";
    /** Жертвование карты */
    ScoreData[ScoreData["SacrificeCard"] = 100] = "SacrificeCard";
    /** Обновление магазина */
    ScoreData[ScoreData["ResfreshShop"] = 50] = "ResfreshShop";
    /** Установка карты */
    ScoreData[ScoreData["PlaceCard"] = 20] = "PlaceCard";
})(ScoreData || (ScoreData = {}));
