import { GameDifficult, EffectType } from "../core/Enums.js";
import { CardData, DifficultData, Effect } from "../core/Interfaces.js";

// ToDo: Сделай загрузку асинхронной с файлов
export default class GameData {
    private _effects: Map<string, Effect>
    private _cards: Map<string, CardData>
    private _difficults: Map<GameDifficult, DifficultData>
    private _config: Object

    constructor() {
        this._effects = this.loadEffects()
        this._cards = this.loadCards()
        this._difficults = this.loadDifficults()
        this._config = this.loadConfig()
        console.log("Загрузка завершена!")
    }

    get effets(): Map<string, Effect> { return Object.freeze(this._effects) }
    get cards(): Map<string, CardData> { return Object.freeze(this._cards) }
    get difficults(): Map<GameDifficult, DifficultData> { return Object.freeze(this._difficults) }
    get config(): Object { return Object.freeze(this._config) }

    private loadEffects(): Map<string, Effect> {
        let newEffects = new Map<string, Effect>()

        let someEffects: Effect[] = [
            () => { console.log("Just Nothing") },
            () => { console.log("Я АТАКУЮЮЮЮ!") },
            () => { console.log("НУ КА НУКА ТЫ КУДА??") },
            () => { console.log("ХИЛЛ") }
        ]

        let someEffectsNames: string[] = [
            "Пустой",
            "Атака",
            "Защита",
            "Восстановление"
        ]

        if (someEffects.length !== someEffectsNames.length) throw new Error("Ошибка загрузки эффектов")
        for(let i = 0; i < someEffectsNames.length; i++) {
            newEffects.set(someEffectsNames[i], someEffects[i])
        }

        console.log("Загрузка эффектов завершена...")
        return newEffects
    }

    private loadCards(): Map<string, CardData> {
        let newCards = new Map<string, CardData>()

        if (this._effects.size <= 1) throw new Error("Ошибка загрузки эффектов")

        let someCards: CardData[] = [
            
        ]

        console.log("Загрузка карт завершена...")
        return newCards
    }

    private loadDifficults(): Map<GameDifficult, DifficultData> {
        let newDifficults = new Map<GameDifficult, DifficultData>()

        //

        console.log("Загрузка уровней завершена...")
        return newDifficults
    }

    private loadConfig(): Object {
        let newConfig = {}

        //

        console.log("Загрузка конфигурации завершена...")
        return newConfig
    }
}