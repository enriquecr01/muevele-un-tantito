import { useEffect, useState } from "react";
import { shuffleArray } from "@utils/index";
import { verifyWin, initialTiles } from "@LevelTalavera/index";

export const useLevelTalavera = () => {
  const [items, setItems] = useState<string[]>([]);
  const [activeId, setActiveId] = useState();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  function shuffleArrayAndVerify(array) {
    const arrayShuffled = shuffleArray(array);

    if (verifyWin(arrayShuffled)) shuffleArrayAndVerify(array);

    return arrayShuffled;
  }

  useEffect(() => {
    const shuffledDrinks = shuffleArrayAndVerify(initialTiles);
    setItems(shuffledDrinks);
  }, [setItems]);

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
    const shuffledTiles = shuffleArrayAndVerify(initialTiles);
    setItems(shuffledTiles);
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
