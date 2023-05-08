import { ToneGenerator } from "../../audio/models/ToneGenerator";
import { ScriptAction } from "./ScriptAction";

export class StopScriptAction extends ScriptAction {
    protected _performAction(): Promise<void> {
        return new Promise((resolve, reject) => {
            ToneGenerator.stop();
            resolve();
        })
    }
}