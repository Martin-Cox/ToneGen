import { ToneGenerator } from "../../audio/models/ToneGenerator";
import { ScriptAction } from "./ScriptAction";

export class SetFrequencyScriptAction extends ScriptAction {
    private readonly _frequency: number;

    public constructor(rawCommand: string, frequency: number) {
        super(rawCommand);

        this._frequency = frequency;
    }

    protected async _performAction(): Promise<void> {
        ToneGenerator.setFrequency(this._frequency);
    }
}