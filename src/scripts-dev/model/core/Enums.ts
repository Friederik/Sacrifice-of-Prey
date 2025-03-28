/**
 * Перечисление сложностей игры 1-7
 */
export enum GameDifficult {
    /** Весна */
    Spring=1,
    /** Лето */
    Summer,
    /** Осень */
    Autumn,
    /** Зима */
    Winter,
    /** Метель */
    Blizzard,
    /** Ледниковый период */
    IceAge,
    /** Вечная ночь */
    EternalNight
}

/**
 * Перечисление сторон стола
 */
export enum BoardSide {
    /** Сторона игрока */
    Player = "Player",
    /** Сторона противника */
    Opponent = "Opponent"
}