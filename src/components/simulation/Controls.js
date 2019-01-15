import React from 'react';

function Controls(props) {
    return (
        <div className="btn-group-vertical">
            <button type="button" className="btn btn-dark btn-lg" onClick={props.startRun}>Start Run</button>
            <button type="button" className="btn btn-warning btn-lg" onClick={props.resetAll}>Reset All</button>
        </div>
    );
}

export default Controls;