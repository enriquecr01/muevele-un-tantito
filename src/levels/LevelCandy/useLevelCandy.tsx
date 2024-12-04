import { useEffect, useState } from "react";
import { shuffleArray } from "@utils/index";
import {
  ICandy,
  lollipopCandies,
  rectangleCandies,
  roundedCandies,
  verifyWin,
} from "@LevelCandy/index";

export const useLevelCandy = () => {
  const [activeId, setActiveId] = useState<ICandy>();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  const [candiesDefault, setCandiesDefault] = useState<ICandy[]>([]);
  const [candies, setCandies] = useState<ICandy[]>([]);
  const [candies2, setCandies2] = useState<ICandy[]>([]);
  const [candies3, setCandies3] = useState<ICandy[]>([]);

  const addToBox = (currentBox, overBox, active, newItem) => {
    let currentArray = [];
    let tempArray = [];

    switch (currentBox) {
      case "default-box":
        currentArray = [...candiesDefault];
        break;
      case "box-1":
        currentArray = [...candies];
        break;
      case "box-2":
        currentArray = [...candies2];
        break;
      case "box-3":
        currentArray = [...candies3];
        break;
    }

    switch (overBox) {
      case "default-box":
        tempArray = [...candiesDefault];
        break;
      case "box-1":
        tempArray = [...candies];
        break;

      case "box-2":
        tempArray = [...candies2];
        break;
      case "box-3":
        tempArray = [...candies3];
        break;
    }

    const index = currentArray.findIndex((candy) => candy.id === active.id);
    newItem.currentBox = overBox;

    currentArray.splice(index, 1);
    tempArray.push(newItem);

    switch (currentBox) {
      case "default-box":
        setCandiesDefault(currentArray);
        break;
      case "box-1":
        setCandies(currentArray);
        break;
      case "box-2":
        setCandies2(currentArray);
        break;
      case "box-3":
        setCandies3(currentArray);
        break;
    }

    switch (overBox) {
      case "default-box":
        setCandiesDefault(tempArray);
        break;
      case "box-1":
        setCandies(tempArray);
        break;
      case "box-2":
        setCandies2(tempArray);
        break;
      case "box-3":
        setCandies3(tempArray);
        break;
    }
  };

  const verifyWinCandy = (candies, candies2, candies3) => {
    const win = verifyWin(candies, candies2, candies3);

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
    const candiesDefaultArrays: ICandy[] = [
      ...lollipopCandies,
      ...roundedCandies,
      ...rectangleCandies,
    ];
    const shuffledCandies = shuffleArray(candiesDefaultArrays);
    setCandiesDefault(shuffledCandies);
  }, []);

  useEffect(() => {
    verifyWinCandy(candies, candies2, candies3);
  }, [
    candies,
    candies2,
    candies3,
    setCandies,
    setCandies2,
    setCandies3,
    setCandiesDefault,
  ]);

  const reset = () => {
    const candiesDefaultArrays: ICandy[] = [
      ...lollipopCandies,
      ...roundedCandies,
      ...rectangleCandies,
    ];
    const shuffledCandies = shuffleArray(candiesDefaultArrays);
    setCandiesDefault(shuffledCandies);
    setCandies([]);
    setCandies2([]);
    setCandies3([]);
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
    candiesDefault,
    setCandiesDefault,
    candies,
    setCandies,
    candies2,
    setCandies2,
    candies3,
    setCandies3,
    reset,
    addToBox,
  };
};
