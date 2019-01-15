import React from 'react';
import * as coordinates from './coordinates';

//https://stackoverflow.com/a/31828345/1912383

function Track({ carPosition }) {
    return (
        <svg width="800" height="400">

            {/* Arrow */}
            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="2" orient="auto-start-reverse" markerUnits="strokeWidth">
                    <path d="M0,0 L0,4 L4,2 z" fill="#000" />
                </marker>
            </defs>
            <line x1="370" y1="320" x2="440" y2="320" stroke="#000" strokeWidth="5" markerEnd="url(#arrow)" />

            {/* Track route */}
            <rect x={coordinates.trackOffsetX} y={coordinates.trackOffsetY} rx='40' width={coordinates.trackWidth} height={coordinates.trackHeight} style={{ fill: 'none', stroke: 'black', strokeWidth: '10' }} />
            {/* Track name */}
            <text x="230" y="240" className='big'>Circuit de AbuSanad</text>

            {/* Lap end flag */}
            <line x1="390" y1="80" x2="390" y2="120" style={{ stroke: 'black', strokeWidth: '5', strokeDasharray: '5,5' }} />
            <line x1="395" y1="85" x2="395" y2="125" style={{ stroke: 'black', strokeWidth: '5', strokeDasharray: '5,5' }} />
            <line x1="400" y1="80" x2="400" y2="120" style={{ stroke: 'black', strokeWidth: '5', strokeDasharray: '5,5' }} />
            <line x1="405" y1="85" x2="405" y2="125" style={{ stroke: 'black', strokeWidth: '5', strokeDasharray: '5,5' }} />

            {/* Lap trigger 2 */}
            <image xlinkHref="images/light.svg" x={380} y={120} height="36px" width="36px" />
            <text x="410" y="140" fill='#ffe066'>2</text>

            {/* Pit lane */}
            <text x="360" y="30" >Pit Lane</text>
            <polyline points="200,100 300,50 500,50 600,100" style={{ fill: 'none', stroke: 'black', strokeWidth: '10', strokeDasharray: '10,10' }} />

            {/* Lap trigger 1 */}
            <image xlinkHref="images/light.svg" x={230} y={36} height="36px" width="36px" />
            <text x="230" y="55" fill='#ffe066'>1</text>
            {/* <circle cx={250} cy={75} r="5" fill="#ff0000" /> */}

            {/* Lap trigger 3 */}
            <image xlinkHref="images/light.svg" x={530} y={36} height="36px" width="36px" />
            <text x="560" y="55" fill='#ffe066'>3</text>

            <circle id="car" cx={carPosition.x} cy={carPosition.y} r="12" fill="#FEA201" />

        </svg>
    );
}

export default Track;