import React from 'react';

function EventStore(props) {
    const rows = props.events.map(e => {
        return (
            <tr key={e.id}>
                <td>{e.timestamp}</td>
                <td>{e.name.description}</td>
                <td>{e.message || ''}</td>
            </tr>
        );
    })
    return (
        <div className='table-wrapper-scroll-y'>
            <table className="table">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Event</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

export default EventStore;