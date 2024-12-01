import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import putItem from "@sounds/putitem.mp3";
import { Helmet } from "react-helmet";
import { ScreenWin } from "pages/index";
import "animate.css";
import {
  NavigationHelper,
  shuffleArray,
  useMueveleTantitoSensors,
} from "@utils/index";
import {
  Fruit,
  IFruit,
  FruitDroppable,
  initialFruits,
  EmptySpaceDroppable,
  verifyWin,
} from "@LevelFruits/index";

type LevelFruitProps = {
  navigation?: NavigationHelper;
};

export function LevelFruits({ navigation }: LevelFruitProps) {
  const [activeId, setActiveId] = useState<IFruit>();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  const [fruitDefault, setFruitsDefault] = useState<IFruit[]>([]);
  const [aguacate, setAguacate] = useState<IFruit>();
  const [papaya, setPapaya] = useState<IFruit>();
  const [pitaya, setPitaya] = useState<IFruit>();

  const { sensors } = useMueveleTantitoSensors();

  const putItemSound = new Audio(putItem);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.data.current.data);
  };

  const addToBox = (e: DragEndEvent) => {
    const newItem = { ...e.active.data.current.data };
    const { active, over } = e;
    if (
      (e.over?.id !== "default-box" &&
        e.over?.id !== "aguacate" &&
        e.over?.id !== "papaya" &&
        e.over?.id !== "pitaya") ||
      !newItem
    )
      return;

    const currentBox = active.data.current.data.currentBox;
    const overBox = over.id;

    if (currentBox === overBox) return;

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

    console.log(currentBox, currentArray);

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

    putItemSound.play();
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

  const style = {
    background:
      "radial-gradient(circle, rgba(192,199,140,1) 0%, rgba(149,157,100,1) 100%)",
  };

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Frutas</title>
      </Helmet>
      {win && (
        <div
          className={`${win ? "animate__animated animate__jackInTheBox" : ""}`}
        >
          <ScreenWin
            nextLevel="LevelMariachiInstruments"
            navigation={navigation}
            reset={reset}
          />
        </div>
      )}
      {!win && (
        <div
          className={`flex flex-column justify-center items-center overflow-hidden h-screen bg-[#c0c78c] ${
            removeLevel ? "animate__animated animate__fadeOutDown" : ""
          }`}
          style={style}
        >
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={addToBox}
            sensors={sensors}
          >
            <main className="flex flex-col items-center md:gap-16 md:p-4 w-full">
              <div className="flex flex-row flex-wrap justify-center md:gap-4 w-full">
                <FruitDroppable id="aguacate" fruit={aguacate} />

                <FruitDroppable id="papaya" fruit={papaya} />

                <FruitDroppable id="pitaya" fruit={pitaya} />
              </div>

              <div className="flex flex-col items-center">
                <ul className="flex justify-center w-full">
                  <EmptySpaceDroppable id="default-box" items={fruitDefault} />
                </ul>
              </div>

              <DragOverlay transition={null}>
                {activeId ? (
                  <Fruit id={activeId.id} image={activeId.image} isDragging />
                ) : null}
              </DragOverlay>
            </main>
          </DndContext>
        </div>
      )}
    </>
  );
}
