import React from 'react';
import { observer } from "mobx-react";

import { ToneGeneratorViewModel } from '../viewmodels/ToneGeneratorViewModel';

type ToneGeneratorProps = {
    model: ToneGeneratorViewModel
}

export const ToneGenerator: React.FunctionComponent<ToneGeneratorProps> = observer(({ model }) => {
    const startButton = <button onClick={() => model.start()}>Start</button>;
    const stopButton = <button onClick={() => model.stop()}>Stop</button>;

    return (
        <div className='tone-generator'>
            {model.isPlaying ? stopButton : startButton}
            <br/>
            <label htmlFor="frequency">Frequency:</label>
            <select name="frequency" id="frequency" value={model.frequency} onChange={(change) => model.setFrequency(parseFloat(change.target.value))}>
                <option value="233.1">233.1 (Bb3)</option>
                <option value="246.9">246.9 (B3)</option>
                <option value="261.6">261.6 (C4)</option>
                <option value="277.2">277.2 (C#4)</option>
                <option value="293.7">293.7 (D4)</option>
            </select>
        </div>
    );
});