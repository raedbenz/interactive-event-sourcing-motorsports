import * as actions from '../actions';
import { domainEvent } from '../domain/events';
import { OrderedSet } from 'immutable';

const eventstore = (state = OrderedSet(), action) => {
    switch (action.type) {
        case actions.EVENT_STORE_ADD:
            return state.add(action.event);
        case actions.RESET_ALL:
            return OrderedSet();
        default:
            return state;
    }
}

const filterByEvent = (events, interested) => {
    return events.filter(e => e.name === interested);
}

export const selectEvents = (state) => {
    return state.eventstore.toArray();
}

export const selectLapEvents = (state) => {
    var array = state.events.toArray();
    return array.filter(e => e.name === domainEvent.lapTriggered);
}

export const selectLapEventsSince = (state, since) => {
    return selectEventsBetween(state, since, undefined, domainEvent.lapTriggered);
}

export const selectRunEvents = (state) => {
    var array = state.eventstore.toArray();
    return array.filter(e => e.name !== domainEvent.lapTriggered);
}

export const selectRunEventsSince = (state, since) => {
    var array = selectEventsBetween(state, since);
    return array.filter(e => e.name !== domainEvent.lapTriggered);
}

// ranges = [{start1, end1}, {start2, end2}, ...]
export const selectEventsByRegions = (state, ranges, name = domainEvent.lapTriggered) => {
    var groups = [];

    for (let i = 0; i < ranges.length; i++) {
        let range = ranges[i];
        let array = selectEventsBetween(state, range.startTime, range.endTime, name);

        if (array && array.length > 0) {
            groups.push({ id: (groups.length), events: array });
        }
    }

    return groups;
}

// Room for optimisation e.g. binary search, reverser traversing, etc...
// to = undefined; till end of events
// name = undefined; return all types (no filter)
export const selectEventsBetween = (state, from, to = undefined, name = undefined) => {
    var startIndex = -1, endIndex = -1;
    let events = state.eventstore.toArray();

    for (let i = 0; i < events.length; i++) {
        if (events[i].timestamp >= from) {
            startIndex = i;
            break;
        }
    }

    if (startIndex === -1) {
        return [];
    }

    if (to) {
        for (let i = startIndex; i < events.length; i++) {
            if (events[i].timestamp <= to) {
                endIndex = i;
            } else {
                break;
            }
        }
    } else {
        endIndex = events.length - 1;
    }

    if (endIndex === -1) {
        return [];
    }

    var range = events.slice(startIndex, endIndex + 1);
    return name ? filterByEvent(range, name) : range;
}

export default eventstore;