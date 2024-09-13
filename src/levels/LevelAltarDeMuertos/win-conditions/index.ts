import { checkSortedAscending } from "@utils/arrays";

export function verifyWin(levels) {
    if (checkSortedAscending(levels)) {
        return true;
    }

    return false;
};
