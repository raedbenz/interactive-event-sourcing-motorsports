import { combineReducers } from 'redux';
import eventstore from './eventstore';
import aggregates from './aggregates';
import laps from './laps';
import runs from './runs';

export default combineReducers({
    eventstore,
    laps,
    runs,
    aggregates
});
