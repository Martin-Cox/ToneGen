import { action, computed, makeObservable, observable } from "mobx";
import { ToneGenerator } from "../../audio/models/ToneGenerator";


export class App {
    private readonly _toneGenerator: ToneGenerator;

    public constructor() {
        this._toneGenerator = new ToneGenerator();
    }

    public get toneGenerator(): ToneGenerator {
        return this._toneGenerator;
    }
}