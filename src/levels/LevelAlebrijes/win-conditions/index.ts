const rainbowOrder = [
    "rojo",
    "naranja",
    "amarillo",
    "verde",
    "azul",
    "indigo",
    "violeta",
];

function verifyRainbowOrder(array) {
    if (JSON.stringify(array) === JSON.stringify(rainbowOrder)) {
        return true;
    }

    return false;
}

export function verifyWin(array) {
    if (verifyRainbowOrder(array)) return true;

    return false;
}
