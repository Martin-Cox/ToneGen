import { computed, makeObservable } from "mobx";
import { ScriptExecutor } from "../../engine/script/models/ScriptExecutor";
import { ScriptAction } from "../../engine/script/models/ScriptAction";

export class ControlPanelViewModel {
    private readonly _scriptExecutor: ScriptExecutor;

    public constructor(scriptExecutor: ScriptExecutor) {
        makeObservable(this);

        this._scriptExecutor = scriptExecutor;

        //TODO: Set up reaction to create the ScriptActionViewModels and expose those here.
    }

    @computed
    public get isExecuting(): boolean {
        return this._scriptExecutor.isExecuting;
    }

    @computed
    public get scriptActions(): ScriptAction[] {
        return this._scriptExecutor.actions;
    }

    @computed
    public get currentScriptAction(): ScriptAction {
        return this._scriptExecutor.currentAction;
    }

    public start(): void {
        this._scriptExecutor.executeScript();
    }
}