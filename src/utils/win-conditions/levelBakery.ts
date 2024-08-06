export function oneLineColorCondition(conchas: string[]) {
    let win = true;
    let lineColor = '';
    conchas.every((concha, index) => {
        const split = concha.split("-");
        const conchaColor = split[0];

        // determine the line color
        if (index === 0 || index === 6 || index === 12) {
            lineColor = split[0];
        }

        // line one
        if (index >= 0 && index <= 5) {
            if (conchaColor === lineColor) {
                return true;
            }
        }

        // line two
        if (index >= 6 && index <= 11) {
            if (conchaColor === lineColor) {
                return true;
            }
        }

        // line three
        if (index >= 12 && index <= 17) {
            if (conchaColor === lineColor) {
                return true;
            }
        }
        win = false;
        return false;
    });

    return win;
}

function verifyIfGroupIsSameColor(conchaGroup: string[], color: string) {
    let colorGroupIsSame = true;


    conchaGroup.every((concha, index) => {
        const split = concha.split("-");
        const conchaColor = split[0];

        if (color === conchaColor) return true;

        colorGroupIsSame = false;
        return false;
    });

    return colorGroupIsSame;
}

export function twoVerticalLinesColorsCondition(conchas: string[]) {
    // first group
    const firstGroupConcha = conchas[0];
    const firstGroupSplit = firstGroupConcha.split("-");
    const firstGroupConchaColor = firstGroupSplit[0];

    const firstGroup = [conchas[0], conchas[1], conchas[6], conchas[7], conchas[12], conchas[13]];

    const firstGroupIsSame = verifyIfGroupIsSameColor(firstGroup, firstGroupConchaColor);

    if (!firstGroupIsSame) return false;

    // second group
    const secondGroupConcha = conchas[2];
    const secondGroupSplit = secondGroupConcha.split("-");
    const secondGroupConchaColor = secondGroupSplit[0];

    const secondGroup = [conchas[2], conchas[3], conchas[8], conchas[9], conchas[14], conchas[15]];

    const secondGroupIsSame = verifyIfGroupIsSameColor(secondGroup, secondGroupConchaColor);

    if (!secondGroupIsSame) return false;

    // third group
    const thirdGroupConcha = conchas[4];
    const thirdGroupSplit = thirdGroupConcha.split("-");
    const thirdGroupConchaColor = thirdGroupSplit[0];

    const thirdGroup = [conchas[4], conchas[5], conchas[10], conchas[11], conchas[16], conchas[17]];

    const thirdGroupIsSame = verifyIfGroupIsSameColor(thirdGroup, thirdGroupConchaColor);

    if (!thirdGroupIsSame) return false;


    return true;
}