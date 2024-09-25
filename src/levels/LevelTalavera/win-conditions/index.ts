const orderedArray = [
    "huevo",
    "nacido",
    "mediano",
    "cayendo",
    "volando"
];

function verifyOrder(array) {
    if (JSON.stringify(array) === JSON.stringify(orderedArray)) {
        return true;
    }

    return false;
}

export function verifyWin(array) {
    if (verifyOrder(array)) return true;

    return false;
}
