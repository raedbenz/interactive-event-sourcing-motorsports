import * as actions from '../actions';
import { combineReducers } from 'redux';
import { getAggregates } from '../domain/aggregates';
import { projectLaps } from '../domain/laps';

// Calculate accumulated aggregates
const laps = (state = {}, action) => {
    switch (action.type) {
        case actions.AGG_LAPS:
            var laps = projectLaps(action.events);  //reconstruct laps
            return getAggregates(laps, action.accumulator);
        case actions.RESET_ALL:
            return {};
        default:
            return state;
    }
}

const snapshot = (state = { timestamp: 0, agg: null }, action) => {
    switch (action.type) {
        case actions.SNAPSHOT_AGG:
            return {
                agg: action.agg,
                timestamp: action.timestamp
            };
        case actions.RESET_ALL:
            return {};
        default:
            return state;
    }
}

export const selectLapsAggregates = (state) => {
    return state.aggregates.laps;
}

export const selectSnapshotAgg = (state) => {
    return state.aggregates.snapshot.agg;
}

export const selectSnapshotTime = (state) => {
    return state.aggregates.snapshot.timestamp;
}

const aggregates = combineReducers({
    laps,
    snapshot
});

export default aggregates;