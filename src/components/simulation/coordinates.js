

export const trackOffsetX = 100;
export const trackOffsetY = 100;

export const startX = 0;
export const startY = 0;

export const pitStartX = 300;
export const pitStartY = -50;

export const trackWidth = 600;
export const trackHeight = 250;

export const imageBoltSize = 36;

//Out Lap
export const trigger1Position = {
    x: 150, y: pitStartY / 2
}

//Straight
export const trigger2Position = {
    x: 300, y: startY
}

//In Lap
export const trigger3Position = {
    x: 450, y: pitStartY / 2
}

const startLine = { x: 300, y: 0 }  //end of lap

const pitGarage = { x: pitStartX, y: pitStartY }

//TODO; DRY by splitting into segments

// Counter clock wise
const hotLap = [
    startLine,
    { x: 200, y: startY },
    { x: 100, y: startY },
    { x: 50, y: startY },

    { x: startX, y: 50 },
    { x: startX, y: 150 },
    { x: startX, y: 200 },

    { x: 50, y: trackHeight },
    { x: 100, y: trackHeight },
    { x: 200, y: trackHeight },
    { x: 300, y: trackHeight },
    { x: 400, y: trackHeight },
    { x: 500, y: trackHeight },
    { x: 550, y: trackHeight },

    { x: trackWidth, y: 200 },
    { x: trackWidth, y: 150 },
    { x: trackWidth, y: 50 },

    { x: 550, y: startY },
    { x: 500, y: startY },
    { x: 400, y: startY },
    trigger2Position,
];

const outLap = [
    pitGarage,
    { x: 200, y: pitStartY },
    trigger1Position,
    { x: 100, y: startY },
    { x: 50, y: startY },

    { x: startX, y: 50 },
    { x: startX, y: 150 },
    { x: startX, y: 200 },

    { x: 50, y: trackHeight },
    { x: 100, y: trackHeight },
    { x: 200, y: trackHeight },
    { x: 300, y: trackHeight },
    { x: 400, y: trackHeight },
    { x: 500, y: trackHeight },
    { x: 550, y: trackHeight },

    { x: trackWidth, y: 200 },
    { x: trackWidth, y: 150 },
    { x: trackWidth, y: 50 },

    { x: 550, y: startY },
    { x: 500, y: startY },
    { x: 400, y: startY },
    startLine,
];

const inLap = [
    startLine,
    { x: 200, y: startY },
    { x: 100, y: startY },
    { x: 50, y: startY },

    { x: startX, y: 50 },
    { x: startX, y: 150 },
    { x: startX, y: 200 },

    { x: 50, y: trackHeight },
    { x: 100, y: trackHeight },
    { x: 200, y: trackHeight },
    { x: 300, y: trackHeight },
    { x: 400, y: trackHeight },
    { x: 500, y: trackHeight },
    { x: 550, y: trackHeight },

    { x: trackWidth, y: 200 },
    { x: trackWidth, y: 150 },
    { x: trackWidth, y: 50 },

    { x: 550, y: startY },
    { x: 500, y: startY },
    trigger3Position,
    { x: 400, y: pitStartY },
    pitGarage,
];

export const getHotLapPath = () => {
    return hotLap.map(p => {
        return { x: p.x + trackOffsetX, y: p.y + trackOffsetY };
    });
}

export const getOutLapPath = () => {
    return outLap.map(p => {
        return { x: p.x + trackOffsetX, y: p.y + trackOffsetY };
    });
}

export const getInLapPath = () => {
    return inLap.map(p => {
        return { x: p.x + trackOffsetX, y: p.y + trackOffsetY };
    });
}

export const getRunPath = () => {
    return [...getOutLapPath(), ...getHotLapPath(), ...getInLapPath()];
}

export const shouldTrigger = (point) => {
    var rawX = point.x - trackOffsetX;
    var rawY = point.y - trackOffsetY;

    if (rawX === trigger1Position.x) {
        if (rawY === trigger1Position.y) {
            return 1;
        }
    }

    if (rawX === trigger2Position.x) {
        if (rawY === trigger2Position.y) {
            return 2;
        }
    }

    if (rawX === trigger3Position.x) {
        if (rawY === trigger3Position.y) {
            return 3;
        }
    }

    return -1;
}