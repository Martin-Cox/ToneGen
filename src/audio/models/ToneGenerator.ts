import { action, computed, makeObservable, observable } from "mobx";
import { NOTE_FREQUENCIES } from "../../Constants";

export class ToneGenerator {
    private readonly _audioContext: AudioContext;

    private readonly _oscillator: OscillatorNode;

    private readonly _gain: GainNode;

    @observable
    private _isPlaying: boolean = true;

    @observable
    private _frequency: number = NOTE_FREQUENCIES["C4"];
    
    public constructor() {
        makeObservable(this);

        this._audioContext = new AudioContext();
        this._oscillator = this._audioContext.createOscillator();
        this._gain = this._audioContext.createGain();
        this._oscillator.type = "sine";
        this._oscillator.frequency.value = this._frequency;
        this._oscillator.connect(this._gain);
        this._gain.connect(this._audioContext.destination);
        this._oscillator.start();
        this.stop();
    }

    @computed
    public get isPlaying(): boolean {
        return this._isPlaying;
    }

    @computed
    public get frequency(): number {
        return this._frequency;
    }

    @action
    public start(): void {
        if (this._isPlaying) {
            return;
        }

        this._isPlaying = true;
        this._audioContext.resume();
    }

    @action
    public stop(): void {
        if (!this._isPlaying) {
            return;
        }

        this._isPlaying = false;
        this._audioContext.suspend();
    }

    @action
    public setFrequency(frequency: number): void {
        this._frequency = frequency;
        this._oscillator.frequency.value = frequency;
    }
}