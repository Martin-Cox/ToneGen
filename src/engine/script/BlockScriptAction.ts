import { ToneGenerator } from "../audio/ToneGenerator";
import { ScriptAction } from "./ScriptAction";

export class BlockScriptAction extends ScriptAction {
    private readonly _name: string;

    public constructor(command: string, name: string) {
        super(command);

        this._name = name;
    }

    public get name(): string {
        return this._name;
    }
    
    protected async _performAction(): Promise<void> {
        // A block script action does not do anything.
    }
}