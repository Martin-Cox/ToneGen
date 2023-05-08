import { ToneGenerator } from "../../audio/models/ToneGenerator";
import { ScriptExecutor } from "../..//script/models/ScriptExecutor";
import { StartScriptAction } from "../../script/models/StartScriptAction";
import { WaitScriptAction } from "../../script/models/WaitScriptAction";
import { SetFrequencyScriptAction } from "../../script/models/SetFrequencyScriptAction";
import { NOTE_FREQUENCIES } from "../../Constants";
import { StopScriptAction } from "../../script/models/StopScriptAction";


export class App {
    private readonly _scriptExecutor: ScriptExecutor;

    public constructor() {
        new ToneGenerator();

        // For demonstration purposes
        this._scriptExecutor = new ScriptExecutor();
        this._scriptExecutor.addAction(new SetFrequencyScriptAction("SET FREQUENCY C4", NOTE_FREQUENCIES["C4"]));
        this._scriptExecutor.addAction(new StartScriptAction("START"));
        this._scriptExecutor.addAction(new WaitScriptAction("WAIT 5000", 5000));
        this._scriptExecutor.addAction(new SetFrequencyScriptAction("SET FREQUENCY A4", NOTE_FREQUENCIES["A4"]));
        this._scriptExecutor.addAction(new WaitScriptAction("WAIT 5000", 5000));
        this._scriptExecutor.addAction(new StopScriptAction("STOP"));
    }

    public get scriptExecutor(): ScriptExecutor {
        return this._scriptExecutor;
    }
}