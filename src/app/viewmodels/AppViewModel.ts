import { ToneGeneratorViewModel } from "../../audio/viewmodels/ToneGeneratorViewModel";
import { App } from "../models/App";

export class AppViewModel {
    private readonly _app: App;

    private readonly _toneGeneratorViewModel: ToneGeneratorViewModel;

    public constructor(app: App) {
        this._app = app;
        this._toneGeneratorViewModel = new ToneGeneratorViewModel(app.toneGenerator);
    }

    public get toneGeneratorViewModel(): ToneGeneratorViewModel {
        return this._toneGeneratorViewModel;
    }
}