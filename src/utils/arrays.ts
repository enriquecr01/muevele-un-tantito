export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function sortAscendingArray(numbers) {
    numbers.sort((a, b) => a - b);
    return numbers;
}

export function sortDescendingArray(numbers) {
    numbers.sort((a, b) => b - a);
    return numbers;
}

export function checkSortedAscending(array) {
    const sortArray = sortAscendingArray([...array]);
    return JSON.stringify(array) === JSON.stringify(sortArray);
}

export function checkSortedDescending(array) {
    const sortArray = sortDescendingArray([...array]);
    return JSON.stringify(array) === JSON.stringify(sortArray);
}

export function shuffleAndVerifyArraysAreNotSorted(array) {
    const arrayShuffled = shuffleArray(array);

    if (checkSortedAscending(array)) shuffleAndVerifyArraysAreNotSorted(array);
    if (checkSortedDescending(array)) shuffleAndVerifyArraysAreNotSorted(array);

    return arrayShuffled;
}

export function swapArrays(items, active, over) {
    const newItems = [...items];

    const activeItem = items.find((x) => x === active.id)!;
    const activeIdx = items.indexOf(activeItem);

    const overItem = items.find((x) => x === over.id)!;
    const overIdx = items.indexOf(overItem);
    //Yes, I know I could have used findIndex
    [newItems[activeIdx], newItems[overIdx]] = [
        newItems[overIdx],
        newItems[activeIdx],
    ];
    return newItems;
}