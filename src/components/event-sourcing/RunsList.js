import React from 'react';

function RunsList(props) {
    const rows = props.runs.map(e => {
        return (
            <tr key={e.startTime}>
                <td>{e.number}</td>
                <td>{e.startTime}</td>
                <td>{e.endTime}</td>
            </tr>
        );
    })
    return (
        <div className='table-wrapper-scroll-y'>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Start</th>
                        <th>End</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

export default RunsList;