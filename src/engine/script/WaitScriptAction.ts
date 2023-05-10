import { delay } from "../../Utils";
import { ScriptAction } from "./ScriptAction";

export class WaitScriptAction extends ScriptAction {
    private readonly _delay: number;

    public constructor(command: string, delay: number) {
        super(command);

        this._delay = delay;
    }

    protected async _performAction(): Promise<void> {
        await delay(this._delay);
    }
}