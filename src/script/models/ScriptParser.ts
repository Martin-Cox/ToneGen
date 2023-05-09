


//create dictionary of regex to ScriptAction constructor
//for each line in the script, execute each regex against it, if we find a match - call the corresponding constructor

import { parseFrequency } from "../../Utils";
import { ToneGenerator } from "../../audio/models/ToneGenerator";
import { ErrorScriptAction } from "./ErrorScriptAction";
import { ScriptAction } from "./ScriptAction";
import { SetFrequencyScriptAction } from "./SetFrequencyScriptAction";
import { StartScriptAction } from "./StartScriptAction";
import { StopScriptAction } from "./StopScriptAction";
import { WaitScriptAction } from "./WaitScriptAction";

// type ConstructorAndArgs<T extends new (...args: any) => ScriptAction> = {
//     constructor: T;
//     args: ConstructorParameters<T>
// };


// type ScriptActionConstructor = new (...args: any) => ScriptAction;


export class ScriptParser {
    // private static COMMAND_TO_ACTION: { [key: string]: ConstructorAndArgs<any> } = {

    // }

    private static REGEX_START = /^START$/;

    private static REGEX_STOP = /^STOP$/;

    private static REGEX_WAIT = /^WAIT (\d+)$/;

    private static REGEX_SET_FREQUENCY = /^SET FREQUENCY (.+)$/;

    private readonly _toneGenerator: ToneGenerator;

    public constructor(toneGenerator: ToneGenerator) {
        this._toneGenerator = toneGenerator;
    }

    public parse(script: string): ScriptAction[] {
        try {
            const scriptActions: ScriptAction[] = [];
            const lines = script.split(/[\r\n]+/);

            lines.forEach((line) => {
                this._parseLine(line.trim(), scriptActions);
            });

            return scriptActions;
        } catch {
            console.error("Fatal error parsing script");
            return [];
        }
    }


    private _parseLine(line: string, scriptActions: ScriptAction[]): void {
        // TODO: Make this much nicer...
        const regexes = [
            ScriptParser.REGEX_START,
            ScriptParser.REGEX_STOP,
            ScriptParser.REGEX_WAIT,
            ScriptParser.REGEX_SET_FREQUENCY
        ];

        let matchingRegex: RegExp;

        for (const regex of regexes) {
            if (regex.test(line)) {
                matchingRegex = regex;
                break;
            }
        }

        const matches = matchingRegex?.exec(line);

        switch (matchingRegex) {
            case ScriptParser.REGEX_START:
                scriptActions.push(new StartScriptAction(this._toneGenerator, line));
                break;
            case ScriptParser.REGEX_STOP:
                scriptActions.push(new StopScriptAction(this._toneGenerator, line));
                break;
            case ScriptParser.REGEX_WAIT:
                scriptActions.push(new WaitScriptAction(this._toneGenerator, line, parseInt(matches[1])));
                break;
            case ScriptParser.REGEX_SET_FREQUENCY:
                scriptActions.push(new SetFrequencyScriptAction(this._toneGenerator, line, parseFrequency(matches[1])));
                break;
            default:
                scriptActions.push(new ErrorScriptAction(this._toneGenerator, line));
                break;
        }
    }
}