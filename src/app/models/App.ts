import { ToneGenerator } from "../../audio/models/ToneGenerator";
import { ScriptExecutor } from "../..//script/models/ScriptExecutor";
import { StartScriptAction } from "../../script/models/StartScriptAction";
import { WaitScriptAction } from "../../script/models/WaitScriptAction";
import { SetFrequencyScriptAction } from "../../script/models/SetFrequencyScriptAction";
import { NOTE_FREQUENCIES } from "../../Constants";
import { StopScriptAction } from "../../script/models/StopScriptAction";


export class App {
    private readonly _toneGenerator: ToneGenerator;

    private readonly _scriptExecutor: ScriptExecutor;

    public constructor() {
        this._toneGenerator = new ToneGenerator();

        // For demonstration purposes
        this._scriptExecutor = new ScriptExecutor();
        this._scriptExecutor.addAction(new SetFrequencyScriptAction(this._toneGenerator, "SET FREQUENCY C4", NOTE_FREQUENCIES["C4"]));
        this._scriptExecutor.addAction(new StartScriptAction(this._toneGenerator, "START"));
        this._scriptExecutor.addAction(new WaitScriptAction(this._toneGenerator, "WAIT 5000", 5000));
        this._scriptExecutor.addAction(new SetFrequencyScriptAction(this._toneGenerator, "SET FREQUENCY A4", NOTE_FREQUENCIES["A4"]));
        this._scriptExecutor.addAction(new WaitScriptAction(this._toneGenerator, "WAIT 5000", 5000));
        this._scriptExecutor.addAction(new StopScriptAction(this._toneGenerator, "STOP"));
    }

    public get scriptExecutor(): ScriptExecutor {
        return this._scriptExecutor;
    }
}