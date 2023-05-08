import { ScriptAction } from "./ScriptAction";

export class WaitScriptAction extends ScriptAction {
    private readonly _delay: number;

    public constructor(rawCommand: string, delay: number) {
        super(rawCommand);

        this._delay = delay;
    }

    protected _performAction(): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), this._delay);
        })
    }
}