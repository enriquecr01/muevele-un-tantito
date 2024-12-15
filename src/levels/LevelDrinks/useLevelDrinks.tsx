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
    handleWin,
  };
};
