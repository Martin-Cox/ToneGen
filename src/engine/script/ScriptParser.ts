


//create dictionary of regex to ScriptAction constructor
//for each line in the script, execute each regex against it, if we find a match - call the corresponding constructor

import { parseFrequency } from "../../Utils";
import { ToneGenerator } from "../../audio/ToneGenerator";
import { BlockScriptAction } from "./BlockScriptAction";
import { ConditionalScriptAction } from "./ConditionalScriptAction";
import { ErrorScriptAction } from "./ErrorScriptAction";
import { GotoScriptAction } from "./GotoScriptAction";
import { ScriptAction } from "./ScriptAction";
import { ScriptExecutor } from "./ScriptExecutor";
import { SetFrequencyScriptAction } from "./SetFrequencyScriptAction";
import { SetVariableScriptAction } from "./SetVariableScriptAction";
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

    private static REGEX_BLOCK = /^BLOCK (\w+)$/;

    private static REGEX_GOTO = /^GOTO (\w+)$/;

    private static REGEX_SET_VARIABLE = /^SET VARIABLE (.+) = (.+)$/;

    private static REGEX_CONDITIONAL = /^IF (.+) THEN (.+) ELSE (.+)$/;

    private readonly _toneGenerator: ToneGenerator;

    private readonly _scriptExecutor: ScriptExecutor;

    public constructor(toneGenerator: ToneGenerator, scriptExecutor: ScriptExecutor) {
        this._toneGenerator = toneGenerator;
        this._scriptExecutor = scriptExecutor;
    }

    public parse(script: string): ScriptAction[] {
        try {
            const scriptActions: ScriptAction[] = [];
            const lines = script.split(/[\r\n]+/);

            lines.forEach((line) => {
                const action = this._parseLine(line.trim());

                scriptActions.push(action);
            });

            return scriptActions;
        } catch {
            console.error("Fatal error parsing script");
            return [];
        }
    }


    private _parseLine(line: string): ScriptAction {
        // TODO: Make this much nicer...
        const regexes = [
            ScriptParser.REGEX_START,
            ScriptParser.REGEX_STOP,
            ScriptParser.REGEX_WAIT,
            ScriptParser.REGEX_SET_FREQUENCY,
            ScriptParser.REGEX_BLOCK,
            ScriptParser.REGEX_GOTO,
            ScriptParser.REGEX_SET_VARIABLE,
            ScriptParser.REGEX_CONDITIONAL
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
                return new StartScriptAction(line, this._toneGenerator);
            case ScriptParser.REGEX_STOP:
                return new StopScriptAction(line, this._toneGenerator);
            case ScriptParser.REGEX_WAIT:
                return new WaitScriptAction(line, parseInt(matches[1]));
            case ScriptParser.REGEX_SET_FREQUENCY:
                return new SetFrequencyScriptAction(line, parseFrequency(matches[1]), this._toneGenerator);
            case ScriptParser.REGEX_BLOCK:
                return new BlockScriptAction(line, matches[1]);
            case ScriptParser.REGEX_GOTO:
                return new GotoScriptAction(line, matches[1], this._scriptExecutor);
            case ScriptParser.REGEX_SET_VARIABLE:
                return new SetVariableScriptAction(line, matches[1], matches[2], this._scriptExecutor);
            case ScriptParser.REGEX_CONDITIONAL:
                return new ConditionalScriptAction(line, matches[1], this._parseLine(matches[2]), this._parseLine(matches[3]), this._scriptExecutor);
            default:
                return new ErrorScriptAction(line);
        }
    }
}