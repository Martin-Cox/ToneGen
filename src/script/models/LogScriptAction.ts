import { ScriptAction } from "./ScriptAction";

/** A simple script action that logs to the console and waits for 2 seconds. */
export class LogScriptAction extends ScriptAction {
    private readonly _message: string;

    public constructor(rawCommand: string, message: string) {
        super(rawCommand);

        this._message = message;
    }

    protected _performAction(): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log(this._message);
            setTimeout(() => resolve(), 2000);
        })
    }
}