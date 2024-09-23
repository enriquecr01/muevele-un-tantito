const orderedArrayAscending = [
    "tequila",
    "mezcal",
    "champurrado",
    "tepache",
    "atole",
    "tejuino",
    "pulque",
];

const orderedArrayDescending = [
    "pulque",
    "tejuino",
    "atole",
    "tepache",
    "champurrado",
    "mezcal",
    "tequila",
];

const orderedArrayAlphabetically = [
    "atole",
    "champurrado",
    "mezcal",
    "pulque",
    "tejuino",
    "tepache",
    "tequila",
];

function verifyOrderedAscending(array) {
    if (JSON.stringify(array) === JSON.stringify(orderedArrayAscending)) {
        return true;
    }

    return false;
}

function verifyOrderedDescending(array) {
    if (JSON.stringify(array) === JSON.stringify(orderedArrayDescending)) {
        return true;
    }

    return false;
}

function verifyOrderedAlphabetically(array) {
    if (JSON.stringify(array) === JSON.stringify(orderedArrayAlphabetically)) {
        return true;
    }

    return false;
}

export function verifyWin(array) {
    if (verifyOrderedAscending(array)) return true;
    if (verifyOrderedDescending(array)) return true;
    if (verifyOrderedAlphabetically(array)) return true;

    return false;
}
