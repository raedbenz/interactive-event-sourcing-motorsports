import * as actions from '../actions';
import { combineReducers } from 'redux';
import { projectRunLaps } from '../domain/laps';

const runLaps = (state = [], action) => {
    switch (action.type) {
        case actions.LAP_TRIGGERED:
            return projectRunLaps(action.events);
        case actions.RESET_ALL:
        case actions.RUN_STARTED:
            return [];
        default:
            return state;
    }
}

export const selectLaps = (state) => {
    return state.laps.runLaps;
}

export const selectLapCount = (state) => {
    return state.laps.runLaps.length;
}

const laps = combineReducers({
    runLaps,
});

export default laps;