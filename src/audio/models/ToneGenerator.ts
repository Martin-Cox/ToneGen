import { action, computed, makeObservable, observable } from "mobx";
import { NOTE_FREQUENCIES } from "../../Constants";


export class ToneGenerator {
    private static _audioContext: AudioContext;

    private static _oscillator: OscillatorNode;

    private static _gain: GainNode;

    @observable
    private static _isPlaying: boolean = true;

    @observable
    private static _frequency: number = NOTE_FREQUENCIES["C4"];
    
    public constructor() {
        //makeObservable(this);

        ToneGenerator._audioContext = new AudioContext();
        ToneGenerator._oscillator = ToneGenerator._audioContext.createOscillator();
        ToneGenerator._gain = ToneGenerator._audioContext.createGain();
        ToneGenerator._oscillator.type = "sine";
        ToneGenerator._oscillator.frequency.value = ToneGenerator._frequency;
        ToneGenerator._oscillator.connect(ToneGenerator._gain);
        ToneGenerator._gain.connect(ToneGenerator._audioContext.destination);
        ToneGenerator._oscillator.start();
        ToneGenerator.stop();
    }

    @computed
    public static get isPlaying(): boolean {
        return ToneGenerator._isPlaying;
    }

    @computed
    public static get frequency(): number {
        return ToneGenerator._frequency;
    }

    @action
    public static start(): void {
        if (ToneGenerator._isPlaying) {
            return;
        }

        ToneGenerator._isPlaying = true;
        ToneGenerator._audioContext.resume();
    }

    @action
    public static stop(): void {
        if (!ToneGenerator._isPlaying) {
            return;
        }

        ToneGenerator._isPlaying = false;
        ToneGenerator._audioContext.suspend();
    }

    @action
    public static setFrequency(frequency: number): void {
        ToneGenerator._frequency = frequency;
        ToneGenerator._oscillator.frequency.value = frequency;
    }
}