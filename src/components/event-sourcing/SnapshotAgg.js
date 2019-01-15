import React from 'react';

function SnapshotAgg({ aggregates }) {
    var agg = aggregates || {};
    return (
        <table className="table">
            <tbody>
                <tr key='avg'>
                    <td>Average</td>
                    <td>{agg.avg && agg.avg.toFixed(2)}</td>
                </tr>
                <tr key='min'>
                    <td>Min</td>
                    <td>{agg.min}</td>
                </tr>
                <tr key='max'>
                    <td>Max</td>
                    <td>{agg.max}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default SnapshotAgg;