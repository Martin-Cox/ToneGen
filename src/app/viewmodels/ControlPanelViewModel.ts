import { computed, makeObservable } from "mobx";
import { ScriptExecutor } from "../../script/models/ScriptExecutor";

export class ControlPanelViewModel {
    private readonly _scriptExecutor: ScriptExecutor;

    public constructor(scriptExecutor: ScriptExecutor) {
        makeObservable(this);

        this._scriptExecutor = scriptExecutor;
    }

    @computed
    public get isExecuting(): boolean {
        return this._scriptExecutor.isExecuting;
    }

    @computed
    public get scriptActionCommands(): string[] {
        return this._scriptExecutor.actions.map((action) => action.command);
    }

    @computed
    public get currentScriptActionCommand(): string {
        return this._scriptExecutor.currentAction?.command || "";
    }

    public start(): void {
        this._scriptExecutor.executeScript();
    }
}