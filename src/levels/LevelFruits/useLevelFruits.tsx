import { useEffect, useState } from "react";
import { shuffleArray } from "@utils/index";
import { IFruit, verifyWin, initialFruits } from "@LevelFruits/index";

export const useLevelFruits = () => {
  const [activeId, setActiveId] = useState<IFruit>();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  const [fruitDefault, setFruitsDefault] = useState<IFruit[]>([]);
  const [aguacate, setAguacate] = useState<IFruit>();
  const [papaya, setPapaya] = useState<IFruit>();
  const [pitaya, setPitaya] = useState<IFruit>();

  const addToBox = (currentBox, overBox, active, newItem) => {
    let currentArray = [];
    let tempArray = [];

    switch (currentBox) {
      case "default-box":
        currentArray = [...fruitDefault];
        break;
      case "aguacate":
        currentArray = aguacate ? [aguacate] : [];
        break;
      case "papaya":
        currentArray = papaya ? [papaya] : [];
        break;
      case "pitaya":
        currentArray = pitaya ? [pitaya] : [];
        break;
    }

    switch (overBox) {
      case "default-box":
        tempArray = [...fruitDefault];
        break;
      case "aguacate":
        tempArray = aguacate ? [aguacate] : [];
        break;
      case "papaya":
        tempArray = papaya ? [papaya] : [];
        break;
      case "pitaya":
        tempArray = pitaya ? [pitaya] : [];
        break;
    }

    if (
      (overBox === "aguacate" ||
        overBox === "papaya" ||
        overBox === "pitaya") &&
      tempArray.length > 0
    ) {
      return false;
    }
    const index = currentArray.findIndex((candy) => candy.id === active.id);
    newItem.currentBox = overBox;

    currentArray.splice(index, 1);
    tempArray.push(newItem);

    switch (currentBox) {
      case "default-box":
        setFruitsDefault(currentArray);
        break;
      case "aguacate":
        setAguacate(currentArray[0]);
        break;
      case "papaya":
        setPapaya(currentArray[0]);
        break;
      case "pitaya":
        setPitaya(currentArray[0]);
        break;
    }

    switch (overBox) {
      case "default-box":
        setFruitsDefault(tempArray);
        break;
      case "aguacate":
        setAguacate(tempArray[0]);
        break;
      case "papaya":
        setPapaya(tempArray[0]);
        break;
      case "pitaya":
        setPitaya(tempArray[0]);
        break;
    }
  };

  const verifyWinCandy = (aguacate: IFruit, papaya: IFruit, pitaya: IFruit) => {
    const win = verifyWin(aguacate, papaya, pitaya);

    if (win) {
      setTimeout(() => {
        setRemoveLevel(true);
      }, 1000);
      setTimeout(() => {
        setWin(win);
      }, 2000);
    }
  };

  useEffect(() => {
    const candiesDefaultArrays: IFruit[] = [...initialFruits];
    const shuffledCandies = shuffleArray(candiesDefaultArrays);
    setFruitsDefault(shuffledCandies);
  }, []);

  useEffect(() => {
    verifyWinCandy(aguacate, papaya, pitaya);
  }, [
    aguacate,
    papaya,
    pitaya,
    setAguacate,
    setPapaya,
    setPitaya,
    setFruitsDefault,
  ]);

  const reset = () => {
    const candiesDefaultArrays: IFruit[] = [...initialFruits];
    const shuffledCandies = shuffleArray(candiesDefaultArrays);
    setFruitsDefault(shuffledCandies);
    setAguacate(null);
    setPapaya(null);
    setPitaya(null);
    setRemoveLevel(false);
    setWin(false);
  };

  return {
    activeId,
    setActiveId,
    win,
    setWin,
    removeLevel,
    setRemoveLevel,
    addToBox,
    reset,
    aguacate,
    setAguacate,
    papaya,
    setPapaya,
    pitaya,
    setPitaya,
    fruitDefault,
  };
};
