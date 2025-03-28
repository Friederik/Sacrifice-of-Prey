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
