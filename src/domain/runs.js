import { domainEvent } from './events';

export const runsProjection = (events) => {
    var runs = [];
    var count = 0;
    var lastEvent = null;

    for (var i = 0; i < events.length; i++) {

        var event = events[i];
        var name = event.name;

        // Ideally prefilter
        if (name !== domainEvent.runStarted && name !== domainEvent.runEnded) {
            continue;
        }

        // First thing first; Find valid start
        if (!lastEvent) {
            if (name === domainEvent.runStarted) {
                lastEvent = event;
            }
            continue;
        }

        if (name === lastEvent.name) {
            lastEvent = null;
            if (name === domainEvent.runStarted) {
                lastEvent = event;
            }

            continue;
        }

        if (name === domainEvent.runEnded && lastEvent.name === domainEvent.runStarted) {
            // End of run detected
            runs.push({
                number: ++count,
                startTime: lastEvent.timestamp,
                endTime: event.timestamp,
            });
        }

        lastEvent = event;
    }

    return runs;
}
