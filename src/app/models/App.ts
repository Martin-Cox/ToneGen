import { ToneGenerator } from "../../audio/models/ToneGenerator";
import { ScriptExecutor } from "../..//script/models/ScriptExecutor";
import { StartScriptAction } from "../../script/models/StartScriptAction";
import { WaitScriptAction } from "../../script/models/WaitScriptAction";
import { SetFrequencyScriptAction } from "../../script/models/SetFrequencyScriptAction";
import { NOTE_FREQUENCIES } from "../../Constants";
import { StopScriptAction } from "../../script/models/StopScriptAction";
import { ScriptParser } from "../../script/models/ScriptParser";


const testScript = `SET FREQUENCY C4
START
WAIT 5000
SET FREQUENCY A4
WAIT 5000
STOP`;

const testLoopScript = `SET FREQUENCY C4
START
BLOCK LOOP_START
SET FREQUENCY C4
WAIT 5000
SET FREQUENCY A4
WAIT 5000
GOTO LOOP_START
STOP`;

const testLoopWithVariablesScript = `SET FREQUENCY C4
SET VARIABLE COUNT = 0
START
BLOCK LOOP_START
SET VARIABLE COUNT = (COUNT) + 1
SET FREQUENCY C4
WAIT 5000
SET FREQUENCY A4
WAIT 5000
STOP`;

//TODO: Add Conditional commands/blocks
//IF COUNT > 3 THEN STOP ELSE GOTO LOOP_START

export class App {
    private readonly _toneGenerator: ToneGenerator;

    private readonly _scriptExecutor: ScriptExecutor;

    private readonly _scriptParser: ScriptParser;

    public constructor() {
        this._toneGenerator = new ToneGenerator();        
        this._scriptExecutor = new ScriptExecutor();
        this._scriptParser = new ScriptParser(this._toneGenerator, this._scriptExecutor);

        const actions = this._scriptParser.parse(testLoopWithVariablesScript);

        this._scriptExecutor.setActions(actions);
    }

    public get scriptExecutor(): ScriptExecutor {
        return this._scriptExecutor;
    }
}