import { ToneGenerator } from "../../audio/models/ToneGenerator";
import { ScriptAction } from "./ScriptAction";

export class StartScriptAction extends ScriptAction {
    protected async _performAction(): Promise<void> {
        ToneGenerator.start();
    }
}