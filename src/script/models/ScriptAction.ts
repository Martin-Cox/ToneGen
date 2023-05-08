

export abstract class ScriptAction {
    private readonly _rawCommand: string;

    public constructor(rawCommand: string) {
        this._rawCommand = rawCommand;
    }

    public async execute(): Promise<void> {
        console.info(`Executing action: ${this._rawCommand}`);

        try {
            await this._performAction();
        } catch {
            console.error(`Error executing action: ${this._rawCommand}`);
        }
    }

    protected abstract _performAction(): Promise<void>;
}