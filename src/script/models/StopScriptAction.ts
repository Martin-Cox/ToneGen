import { ScriptAction } from "./ScriptAction";

export class StopScriptAction extends ScriptAction {
    protected async _performAction(): Promise<void> {
        this._toneGenerator.stop();
    }
}