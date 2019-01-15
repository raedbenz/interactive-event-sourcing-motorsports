import * as actions from '.';
import { domainEvent } from '../domain/events';
import * as es from '../reducers/eventstore';
import * as runs from '../reducers/runs';
import * as laps from '../reducers/laps';
import * as agg from '../reducers/aggregates';
import { v4 } from 'node-uuid';
import shortid from 'shortid';

const saveToEventStore = (event) => ({
    type: actions.EVENT_STORE_ADD,
    event: {
        id: v4(),
        ...event
    }
})

export const lapTriggered = (trigger) => (dispatch, getState) => {

    // 1. Save event to store
    const event = {
        timestamp: Date.now(),
        name: domainEvent.lapTriggered,
        message: trigger
    };

    dispatch(saveToEventStore(event));

    // 2. Project laps
    let state = getState();

    var publish = {
        type: actions.LAP_TRIGGERED,
        events: es.selectLapEventsSince(state, runs.lastRunStartTime(state))
    };

    dispatch(publish);

    //3. Project lap aggregates
    state = getState();

    if (isLapCompleted(state)) {
        publish = {
            type: actions.AGG_LAPS,
            events: queryLapEventsSinceSnapshot(state),
            accumulator: agg.selectSnapshotAgg(state)
        };

        dispatch(publish);
    }
};

export const runStarted = () => (dispatch) => {
    const event = {
        timestamp: Date.now(),
        name: domainEvent.runStarted,
        message: shortid.generate() //runId
    };

    dispatch(saveToEventStore(event));

    const publish = {
        type: actions.RUN_STARTED,
        event: event
    };

    dispatch(publish);
};

export const runEnded = () => (dispatch, getState) => {
    var state = getState();

    // 1. Save event to store
    const event = {
        timestamp: Date.now(),
        name: domainEvent.runEnded,
        message: runs.lastRunId(state)
    };

    dispatch(saveToEventStore(event));

    // 2. Publish/Project completed runs
    state = getState();

    var publish = {
        type: actions.RUN_ENDED,
        events: es.selectEvents(state) //full replay
        //events: es.selectRunEventsSince(state, lastRunStartTime(state)) //partial replay
    };

    dispatch(publish);

    // 3. 
    // state = getState();

    // publish = {
    //     type: actions.AGG_LAPS,
    //     events: queryLapEvents(state),
    //     //events: queryLapEventsPerRun(state),
    //     accumulator: agg.selectSnapshotAgg(state)
    // };

    // dispatch(publish);

    // 3. Take aggregate snapshot
    state = getState();

    if (shouldSnapshot(state)) {
        publish = {
            type: actions.SNAPSHOT_AGG,
            agg: agg.selectLapsAggregates(state),
            timestamp: event.timestamp
        };

        dispatch(publish);
    }
}

// Domain dependant, e.g. based on count, time period, etc...
const snapshotFreq = 2;

const shouldSnapshot = (state) => {
    var count = runs.selectRunCount(state);
    return count > 0 && (count % snapshotFreq === 0);
}

/********************************/
/*********** Querying ***********/
/********************************/

// Less complex
const queryLapEventsSinceSnapshot = (state) => {
    var lastSnapshot = agg.selectSnapshotTime(state) + 1;
    return es.selectEventsBetween(state, lastSnapshot);
}

// Complex query
const queryLapEventsPerRun = (state) => {
    var lastSnapshot = agg.selectSnapshotTime(state) + 1;
    var events = runs.selectRunsSince(state, lastSnapshot);
    var runTimes = events.map(run => {
        return {
            startTime: run.startTime,
            endTime: run.endTime
        }
    });

    return es.selectEventsByRegions(state, runTimes);
}

const isLapCompleted = (state) => {
    // More clever rules can be applied.
    return laps.selectLapCount(state) > 0;
}