import { useEffect, useState } from "react";
import { shuffleAndVerifyArraysAreNotSorted } from "@utils/index";
import {
  initialCantaritos,
  initialOllas,
  initialPlatos,
  verifyWin,
} from "@LevelClayCraft/index";

export const useLevelClayCraft = () => {
  const [cantaritos, setCantaritos] = useState<number[]>([]);
  const [ollas, setOllas] = useState<number[]>([]);
  const [platos, setPlatos] = useState<number[]>([]);

  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

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

  function setByType(type: string, active, over) {
    let items: number[] = [];
    if (type === "platos") items = platos;
    if (type === "cantaritos") items = cantaritos;
    if (type === "ollas") items = ollas;

    const newItems = swapArrays(items, active, over);

    if (type === "platos") setPlatos(newItems);
    if (type === "cantaritos") setCantaritos(newItems);
    if (type === "ollas") setOllas(newItems);
  }

  useEffect(() => {
    setCantaritos(shuffleAndVerifyArraysAreNotSorted(initialCantaritos));
    setOllas(shuffleAndVerifyArraysAreNotSorted(initialOllas));
    setPlatos(shuffleAndVerifyArraysAreNotSorted(initialPlatos));
  }, []);

  useEffect(() => {
    if (cantaritos.length > 0 && ollas.length > 0 && platos.length > 0) {
      const win = verifyWin(cantaritos, ollas, platos);
      if (win) {
        setTimeout(() => {
          setRemoveLevel(true);
        }, 1000);
        setTimeout(() => {
          setWin(win);
        }, 2000);
      }
    }
  }, [cantaritos, ollas, platos]);

  const reset = () => {
    setCantaritos(shuffleAndVerifyArraysAreNotSorted(initialCantaritos));
    setOllas(shuffleAndVerifyArraysAreNotSorted(initialOllas));
    setPlatos(shuffleAndVerifyArraysAreNotSorted(initialPlatos));
    setRemoveLevel(false);
    setWin(false);
  };

  return {
    ollas,
    setOllas,
    swapArrays,
    win,
    setWin,
    removeLevel,
    setRemoveLevel,
    cantaritos,
    setCantaritos,
    platos,
    setPlatos,
    reset,
    setByType,
  };
};
