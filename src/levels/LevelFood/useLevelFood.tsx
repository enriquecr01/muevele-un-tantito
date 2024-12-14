import { useEffect, useState } from "react";
import { shuffleArray } from "@utils/index";
import { verifyWin, IFood, defaultFood } from "@LevelFood/index";

export const useLevelFood = () => {
  const [activeId, setActiveId] = useState<IFood>();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  const [foodDefault, setFoodDefault] = useState<IFood[]>([]);

  const [tacos, setTacos] = useState<IFood[]>([]);
  const [tamales, setTamales] = useState<IFood[]>([]);
  const [quesadillas, setQuesadillas] = useState<IFood[]>([]);
  const [elote, setElote] = useState<IFood[]>([]);

  const approvesTamalesBoxRules = (currentFood) => {
    if (currentFood.type === "elote") return false;
    if (tamales.length === 3) return false;
    return true;
  };

  const approvesTacoBoxRules = (currentFood) => {
    if (currentFood.type === "elote") return false;
    if (currentFood.type === "tamal") return false;
    if (currentFood.type === "quesadilla") return false;
    return true;
  };

  const approvesEloteAndQuesadillasBoxRules = (array, currentFood) => {
    if (currentFood.type === "elote" && array.length === 1) return false;
    if (array.length === 1) {
      if (array[0].type === "tamal" && currentFood.type === "tamal")
        return false;
      if (array[0].type === "elote") return false;
    }
    if (array.length === 2) {
      if (
        (array[0].type === "taco" || array[0].type === "quesadilla") &&
        array[1].type === "tamal"
      )
        return false;

      if (
        array[0].type === "tamal" &&
        (array[1].type === "taco" || array[1].type === "quesadilla")
      )
        return false;

      if (currentFood.type === "elote" || currentFood.type === "tamal")
        return false;
    }
    if (array.length === 3) return false;

    return true;
  };

  const addToBox = (currentBox, overBox, active, newItem) => {
    if (overBox === "elote") {
      if (!approvesEloteAndQuesadillasBoxRules(elote, newItem)) return;
    }

    if (overBox === "quesadillas") {
      if (!approvesEloteAndQuesadillasBoxRules(quesadillas, newItem)) return;
    }

    if (overBox === "tamales") {
      if (!approvesTamalesBoxRules(newItem)) return;
    }

    if (overBox === "tacos") {
      if (!approvesTacoBoxRules(newItem)) return;
    }

    let currentArray = [];
    let tempArray = [];

    switch (currentBox) {
      case "default-box":
        currentArray = [...foodDefault];
        break;
      case "tacos":
        currentArray = [...tacos];
        break;
      case "tamales":
        currentArray = [...tamales];
        break;
      case "quesadillas":
        currentArray = [...quesadillas];
        break;
      case "elote":
        currentArray = [...elote];
        break;
    }

    switch (overBox) {
      case "default-box":
        tempArray = [...foodDefault];
        break;
      case "tacos":
        tempArray = [...tacos];
        break;
      case "tamales":
        tempArray = [...tamales];
        break;
      case "quesadillas":
        tempArray = [...quesadillas];
        break;
      case "elote":
        tempArray = [...elote];
        break;
    }

    const index = currentArray.findIndex((food) => food.id === active.id);
    newItem.currentBox = overBox;

    currentArray.splice(index, 1);
    tempArray.push(newItem);

    switch (currentBox) {
      case "default-box":
        setFoodDefault(currentArray);
        break;
      case "tacos":
        setTacos(currentArray);
        break;
      case "tamales":
        setTamales(currentArray);
        break;
      case "quesadillas":
        setQuesadillas(currentArray);
        break;
      case "elote":
        setElote(currentArray);
        break;
    }

    switch (overBox) {
      case "default-box":
        setFoodDefault(tempArray);
        break;
      case "tacos":
        setTacos(tempArray);
        break;
      case "tamales":
        setTamales(tempArray);
        break;
      case "quesadillas":
        setQuesadillas(tempArray);
        break;
      case "elote":
        setElote(tempArray);
        break;
    }
  };

  const verifyWinCandy = () => {
    const win = verifyWin(elote, quesadillas, tamales, tacos);

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
    const candiesDefaultArrays: IFood[] = [...defaultFood];
    const shuffledCandies = shuffleArray(candiesDefaultArrays);
    setFoodDefault(shuffledCandies);
  }, []);

  useEffect(() => {
    verifyWinCandy();
  }, [
    elote,
    quesadillas,
    tamales,
    tacos,
    defaultFood,
    setElote,
    setTamales,
    setQuesadillas,
    setTacos,
    setFoodDefault,
  ]);

  const reset = () => {
    const foodDefaultArray: IFood[] = [...defaultFood];
    const shuffledCandies = shuffleArray(foodDefaultArray);
    setFoodDefault(shuffledCandies);
    setElote([]);
    setTacos([]);
    setQuesadillas([]);
    setTamales([]);
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
    foodDefault,
    setFoodDefault,
    tacos,
    setTacos,
    tamales,
    setTamales,
    quesadillas,
    setQuesadillas,
    elote,
    setElote,
    addToBox,
    reset,
  };
};
