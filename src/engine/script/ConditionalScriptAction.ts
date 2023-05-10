import { Formula, FormulaHelper, createFormula } from "./Formula";
import { ScriptAction } from "./ScriptAction";
import { ScriptExecutor } from "./ScriptExecutor";

//TODO: Remove the restirction to have an "ELSE" clause
export class ConditionalScriptAction extends ScriptAction {
    private readonly _formula: Formula;

    private readonly _successAction: ScriptAction;

    private readonly _failureAction: ScriptAction;

    private readonly _formulaProvider: FormulaHelper;

    public constructor(command: string, rawFormula: string, successAction: ScriptAction, failureAction: ScriptAction, scriptExecutor: ScriptExecutor) {
        super(command);

        this._formula = createFormula(rawFormula);
        this._successAction = successAction;
        this._failureAction = failureAction;
        this._formulaProvider = new FormulaHelper(scriptExecutor);
    }
    
    protected async _performAction(): Promise<void> {
        const value: boolean = this._formula(this._formulaProvider);

        if (value) {
            await this._successAction.execute();
        } else {
            await this._failureAction.execute();
        }
    }
}

