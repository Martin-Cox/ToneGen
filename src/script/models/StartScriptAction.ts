import { ToneGenerator } from "../../audio/models/ToneGenerator";
import { ScriptAction } from "./ScriptAction";

export class StartScriptAction extends ScriptAction {
    private readonly _toneGenerator: ToneGenerator;

    public constructor(command: string, toneGenerator: ToneGenerator) {
        super(command);

        this._toneGenerator = toneGenerator;
    }

    protected async _performAction(): Promise<void> {
        this._toneGenerator.start();
    }
}