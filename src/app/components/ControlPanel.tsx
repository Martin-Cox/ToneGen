import React from 'react';
import { observer } from "mobx-react";

import { ControlPanelViewModel } from '../viewmodels/ControlPanelViewModel';

type ControlPanelProps = {
    model: ControlPanelViewModel
}

export const ControlPanel: React.FunctionComponent<ControlPanelProps> = observer(({ model }) => {
    const startButton = <button onClick={() => model.start()}>Start</button>;
    const executingButton = <button disabled>Executing script</button>;
    const allCommands = model.scriptActions.map((action) => <p key={action.id}>{action.command}</p>);

    return (
        <div className='control-panel'>
            {model.isExecuting ? executingButton : startButton}
            <p>{model.currentScriptAction ? `Current command: ${model.currentScriptAction.command}` : "No command"}</p>
            <br />
            {allCommands}
        </div>
    );
});