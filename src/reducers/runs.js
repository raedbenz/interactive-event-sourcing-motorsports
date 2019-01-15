import { combineReducers } from 'redux';
import * as actions from '../actions';
import { runsProjection } from '../domain/runs';

const views = (state = [], action) => {
    switch (action.type) {
        case actions.RUN_ENDED:
            return runsProjection(action.events);
        case actions.RESET_ALL:
            return [];
        default:
            return state;
    }
}

const summary = (state = {}, action) => {
    switch (action.type) {
        case actions.RUN_STARTED:
            return {
                ...state,
                lastStartTime: action.event.timestamp,
                id: action.event.message
            }
        case actions.RESET_ALL:
            return {};
        default:
            return state;
    }
}

export const selectRuns = (state) => {
    return state.runs.views;
}

export const selectRunsSince = (state, since) => {
    return state.runs.views.filter(run => run.startTime >= since);
}

export const selectRunCount = (state) => {
    return state.runs.views.length;
}

export const lastRunStartTime = (state) => {
    return state.runs.summary.lastStartTime;
}

export const lastRunId = (state) => {
    return state.runs.summary.id;
}

const runs = combineReducers({
    views,
    summary
});

export default runs;