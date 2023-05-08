import { computed, makeObservable } from "mobx";
import { App } from "../components/App";


export class AppViewModel {
    private readonly _app: App;

    public constructor(app: App) {
        makeObservable(this);

        this._app = app;
    }

    @computed
    public get time(): string {
        return `The time is ${this._app.time.toDateString()} ${this._app.time.toTimeString()}`;
    }
}