import { ToneGenerator } from "../../audio/models/ToneGenerator";
import { ScriptExecutor } from "../..//script/models/ScriptExecutor";
import { StartScriptAction } from "../../script/models/StartScriptAction";
import { WaitScriptAction } from "../../script/models/WaitScriptAction";
import { SetFrequencyScriptAction } from "../../script/models/SetFrequencyScriptAction";
import { NOTE_FREQUENCIES } from "../../Constants";
import { StopScriptAction } from "../../script/models/StopScriptAction";


export class App {
    public constructor() {
        new ToneGenerator();

        // For demonstration purposes
        const scriptExecutor = new ScriptExecutor();
        scriptExecutor.addAction(new SetFrequencyScriptAction("SET FREQUENCY C4", NOTE_FREQUENCIES["C4"]));
        scriptExecutor.addAction(new StartScriptAction("START"));
        scriptExecutor.addAction(new WaitScriptAction("WAIT 5000", 5000));
        scriptExecutor.addAction(new SetFrequencyScriptAction("SET FREQUENCY A4", NOTE_FREQUENCIES["A4"]));
        scriptExecutor.addAction(new WaitScriptAction("WAIT 5000", 5000));
        scriptExecutor.addAction(new StopScriptAction("STOP"));
        scriptExecutor.executeScript();
    }
}