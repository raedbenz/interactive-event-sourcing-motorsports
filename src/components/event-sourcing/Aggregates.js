import React from 'react';

function Aggregates({ aggregates }) {
    return (
        <table className="table">
            <tbody>
                <tr key='avg'>
                    <td>Average</td>
                    <td>{aggregates.avg && aggregates.avg.toFixed(2)}</td>
                </tr>
                <tr key='min'>
                    <td>Min</td>
                    <td>{aggregates.min}</td>
                </tr>
                <tr key='max'>
                    <td>Max</td>
                    <td>{aggregates.max}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Aggregates;