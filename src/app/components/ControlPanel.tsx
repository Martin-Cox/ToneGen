import React from 'react';
import { observer } from "mobx-react";

import { ControlPanelViewModel } from '../viewmodels/ControlPanelViewModel';

type ControlPanelProps = {
    model: ControlPanelViewModel
}

export const ControlPanel: React.FunctionComponent<ControlPanelProps> = observer(({ model }) => {
    const startButton = <button onClick={() => model.start()}>Start</button>;
    const executingButton = <button disabled>Executing script</button>;
    const allCommands = model.scriptActionCommands.map((command) => <p key={command}>{command}</p>);

    return (
        <div className='control-panel'>
            {model.isExecuting ? executingButton : startButton}
            <p>Current command: {model.currentScriptActionCommand}</p>
            <br />
            {allCommands}
        </div>
    );
});