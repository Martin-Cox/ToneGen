import { action, computed, makeObservable, observable } from "mobx";
import { ScriptAction } from "./ScriptAction";

export class ScriptExecutor {
    @observable
    private _actions: ScriptAction[] = [];

    @observable
    private _currentActionIndex = 0;

    @observable
    private _isExecuting: boolean = false;

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
                this._currentActionIndex++;
            } catch {
                break;
            }
        }

        this._isExecuting = false;
        this._currentActionIndex = 0;

        console.info("End executing script");
    }

    public clearActions(): void {
        this._actions = [];
    }

    public addAction(scriptAction: ScriptAction): void {
        this._actions.push(scriptAction);
    }
}