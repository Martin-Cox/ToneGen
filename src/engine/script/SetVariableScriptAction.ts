import { Formula, FormulaHelper, createFormula } from "./Formula";
import { ScriptAction } from "./ScriptAction";
import { ScriptExecutor } from "./ScriptExecutor";

export class SetVariableScriptAction extends ScriptAction {
    private readonly _variable: string;

    private readonly _formula: Formula;

    private readonly _formulaProvider: FormulaHelper;

    private readonly _scriptExecutor: ScriptExecutor;

    public constructor(command: string, variable: string, rawFormula: string, scriptExecutor: ScriptExecutor) {
        super(command);

        this._variable = variable;
        this._formula = createFormula(rawFormula);
        this._formulaProvider = new FormulaHelper(scriptExecutor);
        this._scriptExecutor = scriptExecutor;
    }
    
    protected async _performAction(): Promise<void> {
        const value = this._formula(this._formulaProvider);

        this._scriptExecutor.setVariable(this._variable, value);
    }
}

