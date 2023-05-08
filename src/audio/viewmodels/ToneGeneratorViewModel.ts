import { computed, makeObservable } from "mobx";
import { ToneGenerator } from "../models/ToneGenerator";

export class ToneGeneratorViewModel {
    private readonly _toneGenerator: ToneGenerator;

    public constructor(toneGenerator: ToneGenerator) {
        makeObservable(this);

        this._toneGenerator = toneGenerator;
    }

    @computed
    public get isPlaying(): boolean {
        return this._toneGenerator.isPlaying;
    }

    @computed
    public get frequency(): number {
        return this._toneGenerator.frequency;
    }

    public start(): void {
        this._toneGenerator.start();
    }

    public stop(): void {
        this._toneGenerator.stop();
    }

    public setFrequency(frequency: number) {
        this._toneGenerator.setFrequency(frequency);
    }
}