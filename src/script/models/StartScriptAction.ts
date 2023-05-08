import { ToneGenerator } from "../../audio/models/ToneGenerator";
import { ScriptAction } from "./ScriptAction";

export class StartScriptAction extends ScriptAction {
    protected _performAction(): Promise<void> {
        return new Promise((resolve, reject) => {
            ToneGenerator.start();
            resolve();
        })
    }
}