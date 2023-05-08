import { ToneGenerator } from "../../audio/models/ToneGenerator";
import { ScriptAction } from "./ScriptAction";

export class SetFrequencyScriptAction extends ScriptAction {
    private readonly _frequency: number;

    public constructor(rawCommand: string, frequency: number) {
        super(rawCommand);

        this._frequency = frequency;
    }

    protected _performAction(): Promise<void> {
        return new Promise((resolve, reject) => {
            ToneGenerator.setFrequency(this._frequency);
            resolve();
        })
    }
}