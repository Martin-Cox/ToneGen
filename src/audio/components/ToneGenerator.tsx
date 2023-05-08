import React from 'react';
import { observer } from "mobx-react";

import { ToneGeneratorViewModel } from '../viewmodels/ToneGeneratorViewModel';
import { NOTE_FREQUENCIES } from '../../Constants';

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
                {Object.keys(NOTE_FREQUENCIES).map((note) => {
                    const frequency = NOTE_FREQUENCIES[note];

                    return (
                        <option value={frequency.toString()}>{note} [{frequency}]</option>
                    )
                })}
            </select>
        </div>
    );
});