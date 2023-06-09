import { delay } from "../../Utils";
import { ScriptAction } from "./ScriptAction";

/** A simple script action that logs to the console and waits for 2 seconds. */
export class LogScriptAction extends ScriptAction {
    private readonly _message: string;

    public constructor(command: string, message: string) {
        super(command);

        this._message = message;
    }

    protected async _performAction(): Promise<void> {
        console.log(this._message);

        await delay(2000);
    }
}