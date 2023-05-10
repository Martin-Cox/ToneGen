import { ToneGenerator } from "../../audio/ToneGenerator";
import { ScriptAction } from "./ScriptAction";

export class SetFrequencyScriptAction extends ScriptAction {
    private readonly _frequency: number;

    private readonly _toneGenerator: ToneGenerator;

    public constructor(command: string, frequency: number, toneGenerator: ToneGenerator) {
        super(command);

        this._frequency = frequency;
        this._toneGenerator = toneGenerator;
    }

    protected async _performAction(): Promise<void> {
        this._toneGenerator.setFrequency(this._frequency);
    }
}