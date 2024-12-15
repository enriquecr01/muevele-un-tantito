import { useEffect, useState } from "react";
import { shuffleArray } from "@utils/index";
import { verifyWin, initialInstruments } from "@LevelMariachiInstruments/index";

export const useLevelMariachiInstruments = () => {
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
    const shuffledConchas = shuffleArrayAndVerify(initialInstruments);
    setItems(shuffledConchas);
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
    const shuffledConchas = shuffleArrayAndVerify(initialInstruments);
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
