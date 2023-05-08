

export abstract class ScriptAction {
    private readonly _command: string;

    public constructor(command: string) {
        this._command = command;
    }

    public get command(): string {
        return this._command;
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