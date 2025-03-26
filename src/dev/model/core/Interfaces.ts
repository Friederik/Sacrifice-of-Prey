import Card from "../entities/Card.js"
import { EffectType } from "./Enums.js"

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
    /** Эффект при жертвовании */
    effectSacrifice?: Effect,
    /** Эффект при начале хода */
    effectTurn?: Effect
}

/**
 * Интерфейс, описывающий данные уровня
 */
export interface TiersData {
    /** Карты игрока для данного уровня */
    player: string[],
    /** Карты противника для данного уровня */
    enemies: string[]
}

/**
 * Интерфейс, описывающий эффекты карт
 */
export interface Effect {
    /** Название эффекта */
    name: string,
    /** Тип эффекта */
    type: EffectType | string,
    /** Сущность эффекта */
    cast: (...args: any[]) => void
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
}