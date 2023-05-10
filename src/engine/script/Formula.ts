import { ScriptExecutor } from "./ScriptExecutor";

export type Formula = (formulaHelper: FormulaHelper) => any;

export function createFormula(rawFormula: string): Formula {
    const parsedFormula = rawFormula.replace(/\((\w+)\)/g, (_: string, variableName: string) => `formulaHelper.getVariableValue("${variableName}")`);

    let formula: Formula;

    try {
        formula = new Function("formulaHelper", `return (${parsedFormula});`) as Formula;
    } catch {
        console.error(`Error parsing formula '${formula}'`);
        formula = new Function("formulaHelper", "return '';") as Formula;
    }

    return formula;
}

export class FormulaHelper {
    private readonly _scriptExecutor: ScriptExecutor;

    public constructor(scriptExecutor: ScriptExecutor) {
        this._scriptExecutor = scriptExecutor;
    }

    public getVariableValue(variable: string): any {
        const variableValue = this._scriptExecutor.getVariable(variable);

        if (variableValue === null || variableValue === undefined) {
            return "";
        } else {
            return variableValue;
        }
    }
}