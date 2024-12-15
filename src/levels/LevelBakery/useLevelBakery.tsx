import { useEffect, useState } from "react";
import { shuffleArray } from "@utils/index";
import {
  oneLineColorCondition,
  twoVerticalLinesColorsCondition,
  initialConchas,
} from "@LevelBakery/index";

export const useLevelBakery = () => {
  const [items, setItems] = useState<string[]>([]);
  const [activeId, setActiveId] = useState();
  const [activeColor, setActiveColor] = useState();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  useEffect(() => {
    const shuffledConchas = shuffleArray(initialConchas);
    setItems(shuffledConchas);
  }, [setItems]);

  function handleWin(items) {
    let win = oneLineColorCondition(items);
    if (!win) {
      win = twoVerticalLinesColorsCondition(items);
    }

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
    const shuffledConchas = shuffleArray(initialConchas);
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
    activeColor,
    handleWin,
    setActiveColor,
  };
};
