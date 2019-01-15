import { domainEvent } from './events';

export const lapType = Object.freeze({
    unknown: Symbol('unknown'),
    outLap: Symbol('outLap'),
    hotLap: Symbol('hotLap'),
    inLap: Symbol('inLap'),
});

export const lapTrigger = Object.freeze({
    none: -1,
    pitOut: 1,
    straight: 2,
    pitIn: 3,
});


/**** Materialise laps ****/

// Assumptions
// 1- lap events are chronologically ordered
// 2- only lap events - prefiltered
// Returns [{number, duration, type, startTime}]
export const projectRunLaps = (events) => {
    var laps = [];
    var lastTrigger = -1;
    var lastTriggerTime = 0;
    var count = 0;

    for (var i = 0; i < events.length; i++) {
        var trigger = events[i].message;
        var timestamp = events[i].timestamp;

        if (lastTrigger === lapTrigger.none) {
            lastTrigger = trigger;
            lastTriggerTime = timestamp;
            continue;
        }

        var type = Symbol();

        if (trigger === lapTrigger.straight && lastTrigger === lapTrigger.pitOut) {
            type = lapType.outLap;
        } else if (trigger === lapTrigger.straight && lastTrigger === lapTrigger.straight) {
            type = lapType.hotLap;
        } else if (trigger === lapTrigger.pitIn && lastTrigger === lapTrigger.straight) {
            type = lapType.inLap;
        }

        if (type) {
            laps.push({
                number: ++count,
                duration: timestamp - lastTriggerTime,
                type: type,
                startTime: lastTriggerTime
            });
        }

        lastTrigger = trigger;
        lastTriggerTime = timestamp;
    }

    return laps;
}

// Assumptions
// 1- lap events are chronologically ordered
// 2- No events filtering needed
// Returns [{number, duration, type, startTime, runId}]
export const projectLaps = (events) => {
    var laps = [];
    var lastTrigger = -1;
    var lastTriggerTime = 0;
    var count = 0;

    var runId = null;

    for (var i = 0; i < events.length; i++) {

        var event = events[i];

        if (event.name === domainEvent.runStarted) {
            runId = event.message;
            continue;
        } else if (event.name === domainEvent.runEnded) {
            runId = null;
            lastTrigger = -1;
            lastTriggerTime = 0;
            continue;
        }

        if (!runId) {
            continue;
        }

        var trigger = events[i].message;
        var timestamp = events[i].timestamp;

        if (lastTrigger === lapTrigger.none) {
            lastTrigger = trigger;
            lastTriggerTime = timestamp;
            continue;
        }

        var type = Symbol();

        if (trigger === lapTrigger.straight && lastTrigger === lapTrigger.pitOut) {
            type = lapType.outLap;
        } else if (trigger === lapTrigger.straight && lastTrigger === lapTrigger.straight) {
            type = lapType.hotLap;
        } else if (trigger === lapTrigger.pitIn && lastTrigger === lapTrigger.straight) {
            type = lapType.inLap;
        }

        if (type) {
            laps.push({
                number: ++count,
                duration: timestamp - lastTriggerTime,
                type: type,
                startTime: lastTriggerTime,
                runId: runId
            });
        }

        lastTrigger = trigger;
        lastTriggerTime = timestamp;
    }

    return laps;
}

export const projectLapsPerRun = (eventsPerRun) => {
    var laps = [];

    for (var group in eventsPerRun) {
        var array = projectRunLaps(group.events);
        if (array && array.length > 0) {
            laps = [
                ...laps,
                ...array
            ];
        }
    }

    return laps;
}