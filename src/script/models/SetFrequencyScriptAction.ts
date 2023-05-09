import { ToneGenerator } from "../../audio/models/ToneGenerator";
import { ScriptAction } from "./ScriptAction";

export class SetFrequencyScriptAction extends ScriptAction {
    private readonly _frequency: number;

    public constructor(toneGenerator: ToneGenerator, command: string, frequency: number) {
        super(toneGenerator, command);

        this._frequency = frequency;
    }

    protected async _performAction(): Promise<void> {
        this._toneGenerator.setFrequency(this._frequency);
    }
}