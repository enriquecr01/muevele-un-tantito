import { ICandy } from "@LevelCandy/index";

export function allBoxesHaveSameCandyType(candyArray1: ICandy[], candyArray2: ICandy[], candyArray3: ICandy[]) {

    let firstBoxAccepted = true;
    let secondBoxAccepted = true;
    let thirdBoxAccepted = true;

    let currentType = candyArray1[0].type;

    candyArray1.every((candy) => {
        if (candy.type !== currentType) {
            firstBoxAccepted = false;
            return false;
        }

        return true;
    });

    currentType = candyArray2[0].type;
    candyArray2.every((candy) => {
        if (candy.type !== currentType) {
            secondBoxAccepted = false;
            return false;
        }

        return true;
    });

    currentType = candyArray3[0].type;
    candyArray3.every((candy) => {
        if (candy.type !== currentType) {
            thirdBoxAccepted = false;
            return false;
        }

        return true;
    });

    return firstBoxAccepted && secondBoxAccepted && thirdBoxAccepted;
}

export function verifyWin(candyArray1: ICandy[], candyArray2: ICandy[], candyArray3: ICandy[]) {

    let atLeastOneArrayLength4 = false;

    if (candyArray1.length < 3 || candyArray2.length < 3 || candyArray3.length < 3) return false;

    if (candyArray1.length === 4) atLeastOneArrayLength4 = true;
    if (candyArray2.length === 4) atLeastOneArrayLength4 = true;
    if (candyArray3.length === 4) atLeastOneArrayLength4 = true;

    if (!atLeastOneArrayLength4) return false;

    return allBoxesHaveSameCandyType(candyArray1, candyArray2, candyArray3);
}
