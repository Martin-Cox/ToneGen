import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { ScriptAction } from "./ScriptAction";
import { delay } from "../../Utils";

export class ScriptExecutor {
    @observable
    private _actions: ScriptAction[] = [];

    @observable
    private _currentActionIndex = 0;

    @observable
    private _isExecuting: boolean = false;

    @observable
    private _variables: Record<string, any> = {};

    public constructor() {
        makeObservable(this);
    }
    
    @computed
    public get isExecuting(): boolean {
        return this._isExecuting;
    }

    @computed
    public get currentAction(): ScriptAction {
        return this._actions[this._currentActionIndex];
    }

    @computed
    public get actions(): ScriptAction[] {
        return this._actions;
    }

    @action
    public async executeScript(): Promise<void> {
        console.info("Begin executing script");

        this._isExecuting = true;

        while (this._currentActionIndex < this._actions.length) {
            try {
                await this.currentAction.execute();

                //TEMP: Add artifical delay so it's easier to see the script executing
                await delay(2000);

                runInAction(() => this._currentActionIndex++);                
            } catch {
                break;
            }
        }

        runInAction(() => {
            this._isExecuting = false;
            this._currentActionIndex = 0;
        });

        console.info("End executing script");
    }

    @action
    public clearActions(): void {
        this._actions = [];
    }

    @action
    public setActions(actions: ScriptAction[]): void {
        this._actions = actions;
    }

    @action
    public addAction(scriptAction: ScriptAction): void {
        this._actions.push(scriptAction);
    }

    @action
    public goToAction(action: ScriptAction | string): void {
        let targetAction: ScriptAction;

        if (typeof action === "string") {
            targetAction === this.actions.find((possibleAction) => possibleAction.id === action);
        } else {
            targetAction = action
        }

        if (!targetAction) {
            throw new Error("Error trying to go to action");
        }

        const targetActionIndex = this.actions.indexOf(targetAction);

        this._currentActionIndex = targetActionIndex;
    }

    @action
    public setVariable(variable: string, value: any): void {
        this._variables[variable] = value;
    }

    public getVariable(variable: string): any {
        return this._variables[variable];
    }
}