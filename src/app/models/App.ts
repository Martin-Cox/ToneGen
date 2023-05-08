import { action, computed, makeObservable, observable } from "mobx";
import { ToneGenerator } from "../../audio/models/ToneGenerator";
import { ScriptExecutor } from "../..//script/models/ScriptExecutor";
import { LogScriptAction } from "../../script/models/LogScriptAction";


export class App {
    private readonly _toneGenerator: ToneGenerator;

    public constructor() {
        this._toneGenerator = new ToneGenerator();


        // For demonstration purposes
        const scriptExecutor = new ScriptExecutor();
        scriptExecutor.addAction(new LogScriptAction("LOG testing 1", "testing 1"));
        scriptExecutor.addAction(new LogScriptAction("LOG testing 2", "testing 2"));
        scriptExecutor.addAction(new LogScriptAction("LOG testing 3", "testing 3"));
        scriptExecutor.executeScript();
    }

    public get toneGenerator(): ToneGenerator {
        return this._toneGenerator;
    }
}