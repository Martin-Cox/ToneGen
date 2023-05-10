import React from 'react';
import { observer } from "mobx-react";

import { ControlPanelViewModel } from '../viewmodels/ControlPanelViewModel';

type ControlPanelProps = {
    model: ControlPanelViewModel
}

export const ControlPanel: React.FunctionComponent<ControlPanelProps> = observer(({ model }) => {
    const allCommands = model.scriptActions.map((action) => <p key={action.id}>{action.command}</p>);

    return (
        <div className='control-panel'>
            <button disabled={model.isExecuting} onClick={() => model.start()}>{model.isExecuting ? "Executing script" : "Start"}</button>
            <p>{model.currentScriptAction ? `Current command: ${model.currentScriptAction.command}` : "No command"}</p>
            <br />
            {allCommands}
        </div>
    );
});