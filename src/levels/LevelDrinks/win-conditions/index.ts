const orderedArrayAscending = [
    "trompeta",
    "violin",
    "acordeon",
    "vihuela",
    "guitarra",
    "guitarron",
];

const orderedArrayDescending = [
    "guitarron",
    "guitarra",
    "vihuela",
    "acordeon",
    "violin",
    "trompeta",
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

export function verifyWin(array) {
    if (verifyOrderedAscending(array)) return true;
    if (verifyOrderedDescending(array)) return true;

    return false;
}
