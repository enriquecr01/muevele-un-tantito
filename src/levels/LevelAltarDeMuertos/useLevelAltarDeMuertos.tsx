import { useEffect, useState } from "react";
import { shuffleAndVerifyArraysAreNotSorted } from "@utils/index";
import { verifyWin, initialLevels } from "@LevelAltarDeMuertos/index";

export const useLevelAltarDeMuertos = () => {
  const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
  const [activeId, setActiveId] = useState();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  useEffect(() => {
    const shuffledLevels = shuffleAndVerifyArraysAreNotSorted(initialLevels);
    setItems(shuffledLevels);
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
    const shuffledConchas = shuffleAndVerifyArraysAreNotSorted(initialLevels);
    setItems(shuffledConchas);
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
