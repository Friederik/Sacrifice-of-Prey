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

/** Перечисление возможных очков */
export enum ScoreData {
    /** Убийство карты противника */
    KillEnemy = 200,
    /** Нанесение урона противнику */
    DealDamage = 70,
    /** Начало нового раунда */
    StartNewTurn = 30,
    /** Продажа карты */
    SellCard = 60,
    /** Покупка карты */
    BuyCard = 100,
    /** Жертвование карты */
    SacrificeCard = 100,
    /** Обновление магазина */
    ResfreshShop = 50,
    /** Установка карты */
    PlaceCard = 20
}