import { delay } from "../../Utils";
import { ScriptAction } from "./ScriptAction";
import { ToneGenerator } from "../../audio/models/ToneGenerator";

export class WaitScriptAction extends ScriptAction {
    private readonly _delay: number;

    public constructor(toneGenerator: ToneGenerator, command: string, delay: number) {
        super(toneGenerator, command);

        this._delay = delay;
    }

    protected async _performAction(): Promise<void> {
        await delay(this._delay);
    }
}