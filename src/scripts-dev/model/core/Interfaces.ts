import Card from "../entities/Card.js"

/**
 * Интерфейс, описывающий данные карты
 */
export interface CardData {
    /** Название карты */
    name: string,
    /** Путь до портрета карты */
    coverPath: string,
    /** Атака карты */
    attack: number,
    /** Здоровье карты */
    health: number,
    /** Цена карты */
    price: number,
    /** Описание карты */
    description: string,
    /** Название эффекта при жертвовании */
    effectSacrificeName: string,
    /** Название эффекта при начале хода */
    effectTurnName: string
    /** Эффект при жертвовании */
    effectSacrifice: Effect,
    /** Эффект при начале хода */
    effectTurn: Effect
}

/**
 * Интерфейс, описывающий данные уровня
 */
export interface DifficultData {
    /** Карты игрока для данного уровня */
    player: string[],
    /** Карты противника для данного уровня */
    enemies: string[]
}

/**
 * Интерфейс, описывающий информацию после боя
 */
export interface AfterFightInfo {
    /** Набор карт для сброса */
    discard: Card[],
    /** Получено костей */
    moneyReceived: number,
    /** Полученный игроком урон */
    playerTakenDamage: number,
    /** Полученный противником урон */
    opponentTakenDamage: number,
    /** Ячейки игрока получившие урон */
    playerCellDamagePosition: number[],
    /** Ячейки противника получившие урон */
    opponentCellDamagePosition: number[]
    /** Погибло врагов */
    enemiesDeath: number
}

/**
 * Тип эффекта 
 */
export type Effect = (...args: any[]) => void