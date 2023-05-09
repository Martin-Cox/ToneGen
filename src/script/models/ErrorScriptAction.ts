import { ScriptAction } from "./ScriptAction";

export class ErrorScriptAction extends ScriptAction {
    public get isValid(): boolean {
        return false;
    }

    protected async _performAction(): Promise<void> {
        // An error script action does not do anything.
    }
}