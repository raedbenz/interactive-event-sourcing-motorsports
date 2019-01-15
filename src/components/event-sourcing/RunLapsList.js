import React from 'react';

function RunLapsList(props) {
    const rows = props.runLaps.map(e => {
        return (
            <tr key={e.startTime}>
                <td>{e.number}</td>
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
                        <th>Number</th>
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

export default RunLapsList;