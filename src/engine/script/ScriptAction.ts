import { nanoid } from "nanoid";

export abstract class ScriptAction {
    private readonly _command: string;

    private readonly _id: string;

    public constructor(command: string) {
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