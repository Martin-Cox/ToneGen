import { ScriptAction } from "./ScriptAction";

export class StartScriptAction extends ScriptAction {
    protected async _performAction(): Promise<void> {
        this._toneGenerator.start();
    }
}