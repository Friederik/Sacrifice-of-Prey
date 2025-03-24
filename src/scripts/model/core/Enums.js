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
 * Перечисление типов эффектов карт
 */
export var EffectType;
(function (EffectType) {
    /** Во время хода */
    EffectType["Turn"] = "Turn";
    /** При жертвовании */
    EffectType["Sacrifice"] = "Sacrifice";
})(EffectType || (EffectType = {}));
