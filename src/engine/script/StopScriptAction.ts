import { ToneGenerator } from "../../audio/ToneGenerator";
import { ScriptAction } from "./ScriptAction";

export class StopScriptAction extends ScriptAction {
    private readonly _toneGenerator: ToneGenerator;

    public constructor(command: string, toneGenerator: ToneGenerator) {
        super(command);

        this._toneGenerator = toneGenerator;
    }
    
    protected async _performAction(): Promise<void> {
        this._toneGenerator.stop();
    }
}