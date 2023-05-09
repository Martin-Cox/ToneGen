import { nanoid } from "nanoid";
import { ToneGenerator } from "../../audio/models/ToneGenerator";

export abstract class ScriptAction {
    protected readonly _toneGenerator: ToneGenerator;

    private readonly _command: string;

    private readonly _id: string;

    public constructor(toneGenerator: ToneGenerator, command: string) {
        this._toneGenerator = toneGenerator;
        this._command = command;
        this._id = nanoid(8);
    }

    public get command(): string {
        return this._command;
    }

    public get id(): string {
        return this._id;
    }

    public get isValid(): boolean {
        return true;
    }

    public async execute(): Promise<void> {
        console.info(`Executing action: ${this._command}`);

        try {
            await this._performAction();
        } catch {
            console.error(`Error executing action: ${this._command}`);
        }
    }

    protected abstract _performAction(): Promise<void>;
}