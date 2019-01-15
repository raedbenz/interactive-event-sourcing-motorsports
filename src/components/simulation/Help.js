import React from 'react';

function Help() {
    return (
        <ul>
            <li>Click 'Start Run' to start a run</li>
            <li>Each run is consisted of 3 laps; (out-lap, hot-lap, and in-lap)</li>
            <li>Yellow bolts <img src="images/light.svg" height="24px" width="24px" /> are the lap triggers installed on the track</li>
            <li>An aggregate snapshot is taken every 2 runs</li>
        </ul>
    );
}

export default Help;