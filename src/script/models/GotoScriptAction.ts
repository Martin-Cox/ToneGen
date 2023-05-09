import { BlockScriptAction } from "./BlockScriptAction";
import { ScriptAction } from "./ScriptAction";
import { ScriptExecutor } from "./ScriptExecutor";

export class GotoScriptAction extends ScriptAction {
    private readonly _scriptExecutor: ScriptExecutor;

    private readonly _name: string;

    public constructor(command: string, name: string, scriptExecutor: ScriptExecutor) {
        super(command);

        this._name = name;
        this._scriptExecutor = scriptExecutor;
    }
    
    protected async _performAction(): Promise<void> {
        const targetBlockScriptAction = this._scriptExecutor.actions
            .filter((action) => action instanceof BlockScriptAction)
            .find((action: BlockScriptAction) => action.name.toLowerCase() === this._name.toLowerCase());

        if (!targetBlockScriptAction) {
            throw new Error(`Could not find a block named '${this._name}' to go to`);
        }

        this._scriptExecutor.goToAction(targetBlockScriptAction);
    }
}