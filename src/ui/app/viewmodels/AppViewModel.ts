import { App } from "../models/App";
import { ControlPanelViewModel } from "./ControlPanelViewModel";

export class AppViewModel {
    private readonly _app: App;

   private readonly _controlPanelViewModel: ControlPanelViewModel;

    public constructor(app: App) {
        this._app = app;
        this._controlPanelViewModel = new ControlPanelViewModel(app.scriptExecutor);
    }

    public get controlPanelViewModel(): ControlPanelViewModel {
        return this._controlPanelViewModel;
    }
}