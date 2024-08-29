import { checkSortedAscending, checkSortedDescending } from "@utils/arrays";

export function checkIfAllArraysAreSortedInAscending(array1, array2, array3) {
    if (checkSortedAscending(array1) && checkSortedAscending(array2) && checkSortedAscending(array3)) {
        return true;
    }

    return false;
}

export function checkIfAllArraysAreSortedInDescending(array1, array2, array3) {
    if (checkSortedDescending(array1) && checkSortedDescending(array2) && checkSortedDescending(array3)) {
        return true;
    }

    return false;
}

export function verifyWin(array1, array2, array3) {
    if (
        checkIfAllArraysAreSortedInAscending(
            array1, array2, array3
        )
    ) {
        return true;
    }
    if (
        checkIfAllArraysAreSortedInDescending(
            array1, array2, array3
        )
    ) {
        return true;
    }

    return false;
};
