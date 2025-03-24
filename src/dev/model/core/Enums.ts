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
 * Перечисление типов эффектов карт
 */
export enum EffectType {
    /** Во время хода */
    Turn = "Turn",
    /** При жертвовании */
    Sacrifice = "Sacrifice"
}