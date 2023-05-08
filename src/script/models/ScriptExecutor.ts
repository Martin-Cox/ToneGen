import { ScriptAction } from "./ScriptAction";

export class ScriptExecutor {
    private _actions: ScriptAction[] = [];

    private _currentActionIndex = 0;

    public async executeScript(): Promise<void> {
        console.info("Begin executing script");

        while (this._currentActionIndex < this._actions.length) {
            try {
                await this._actions[this._currentActionIndex].execute();
                this._currentActionIndex++;
            } catch {
                break;
            }
        }

        console.info("End executing script");
    }

    public clearActions(): void {
        this._actions = [];
    }

    public addAction(scriptAction: ScriptAction): void {
        this._actions.push(scriptAction);
    }
}