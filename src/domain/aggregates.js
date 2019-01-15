
//https://math.stackexchange.com/questions/95909/why-is-an-average-of-an-average-usually-incorrect
// For more accurate results use weighted average.
function calculateAvg(array) {
    return array.reduce((a, b) => a + b, 0) / array.length;
}

export const getAggregates = (laps, accumulator) => {
    var durations = laps.map(lap => lap.duration);
    var result = {
        avg: calculateAvg(durations),
        max: Math.max(...durations),
        min: Math.min(...durations)
    }

    if (accumulator) {
        result.avg = (result.avg + accumulator.avg) / 2;
        result.max = Math.max(result.max, accumulator.max);
        result.min = Math.min(result.min, accumulator.min);
    }

    return result;
}