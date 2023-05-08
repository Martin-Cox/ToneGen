import { action, computed, makeObservable, observable } from "mobx";

export class App {
    @observable
    private _time: Date;

    public constructor() {
        makeObservable(this);

        this._updateTime();

        setInterval(() => this._updateTime(), 1000);
    }

    @computed
    public get time(): Date {
        return this._time;
    }

    @action
    private _updateTime(): void {
        this._time = new Date();
    }
}