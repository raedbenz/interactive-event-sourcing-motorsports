import React from 'react';

function FastestLaps(props) {
    const rows = props.laps.map(e => {
        return (
            <tr key={e.runId}>
                <td>{e.runId}</td>
                <td>{e.duration}</td>
                <td>{e.type.description}</td>
                <td>{e.startTime}</td>
            </tr>
        );
    })
    return (
        <div className='table-wrapper-scroll-y'>
            <table className="table">
                <thead>
                    <tr>
                        <th>RunId</th>
                        <th>Duration</th>
                        <th>Type</th>
                        <th>StartTime</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

export default FastestLaps;