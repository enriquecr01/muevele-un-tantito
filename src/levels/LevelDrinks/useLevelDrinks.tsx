import { useEffect, useState } from "react";
import { shuffleArray } from "@utils/index";
import { verifyWin, initialDrinks } from "@LevelDrinks/index";

export const useLevelDrinks = () => {
  const [items, setItems] = useState<string[]>([]);
  const [activeId, setActiveId] = useState();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  useEffect(() => {
    const shuffledDrinks = shuffleArrayAndVerify(initialDrinks);
    setItems(shuffledDrinks);
  }, [setItems]);

  function swapArrays(items, active, over) {
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

  function shuffleArrayAndVerify(array) {
    const arrayShuffled = shuffleArray(array);

    if (verifyWin(arrayShuffled)) shuffleArrayAndVerify(array);

    return arrayShuffled;
  }

  function handleWin(items) {
    const win = verifyWin(items);

    if (win) {
      setTimeout(() => {
        setRemoveLevel(true);
      }, 1000);
      setTimeout(() => {
        setWin(win);
      }, 2000);
    }
  }

  const reset = () => {
    const shuffledDrinks = shuffleArrayAndVerify(initialDrinks);
    setItems(shuffledDrinks);
    setRemoveLevel(false);
    setWin(false);
  };

  return {
    items,
    setItems,
    activeId,
    setActiveId,
    win,
    setWin,
    removeLevel,
    setRemoveLevel,
    reset,
    swapArrays,
    handleWin,
  };
};
