import React from 'react';
import { connect } from 'react-redux';
import EventStore from './EventStore';
import RunsList from './RunsList';
import RunLapsList from './RunLapsList';
import Aggregates from './Aggregates';
import SnapshotAgg from './SnapshotAgg';
import { selectEvents } from '../../reducers/eventstore';
import { selectLaps } from '../../reducers/laps';
import { selectRuns } from '../../reducers/runs';
import { selectLapsAggregates, selectSnapshotAgg } from '../../reducers/aggregates';

class EventSourcingContent extends React.Component {
    render() {
        return (
            <div className="row">
                <div className='col-md-3 bg-warning'>
                    <h4 className='tableTitle'>EventStore</h4>
                    <EventStore events={this.props.events} />
                </div>
                <div className='col-md-7 bg-secondary'>
                    <h4 className='tableTitle'>Projections</h4>
                    <div className="row">
                        <div className='col-md-5'>
                            <h5 className='tableTitle'>Laps per Run</h5>
                            <RunLapsList runLaps={this.props.runLaps} />
                        </div>
                        <div className='col-md-5'>
                            <h5 className='tableTitle'>Runs</h5>
                            <RunsList runs={this.props.runs} />
                        </div>
                        <div className='col-md-2'>
                            <h5 className='tableTitle'>Aggregates</h5>
                            <Aggregates aggregates={this.props.aggregates} />
                        </div>
                    </div>
                </div>
                <div className='col-md-2 bg-warning'>
                    <h4 className='tableTitle'>Snaphots - Aggregates</h4>
                    <SnapshotAgg aggregates={this.props.snapshotAgg} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    events: selectEvents(state),
    runLaps: selectLaps(state),
    runs: selectRuns(state),
    aggregates: selectLapsAggregates(state),
    snapshotAgg: selectSnapshotAgg(state)
});

export default connect(mapStateToProps)(EventSourcingContent);