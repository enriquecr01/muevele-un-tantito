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
  Candy,
  ICandy,
  lollipopCandies,
  rectangleCandies,
  roundedCandies,
  BoxDroppable,
  EmptySpaceDroppable,
  verifyWin,
} from "@LevelCandy/index";

type LevelCandyProps = {
  navigation?: NavigationHelper;
};

export function LevelCandy({ navigation }: LevelCandyProps) {
  const [activeId, setActiveId] = useState<ICandy>();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  const [candiesDefault, setCandiesDefault] = useState<ICandy[]>([]);
  const [candies, setCandies] = useState<ICandy[]>([]);
  const [candies2, setCandies2] = useState<ICandy[]>([]);
  const [candies3, setCandies3] = useState<ICandy[]>([]);

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
        e.over?.id !== "box-1" &&
        e.over?.id !== "box-2" &&
        e.over?.id !== "box-3") ||
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

    putItemSound.play();
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

  const style = {
    background:
      "radial-gradient(circle, rgba(255,198,198,1) 0%, rgba(227,170,170,1) 100%)",
  };

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Dulces</title>
      </Helmet>
      {win && (
        <div
          className={`${win ? "animate__animated animate__jackInTheBox" : ""}`}
        >
          <ScreenWin
            nextLevel="LevelTalavera"
            navigation={navigation}
            reset={reset}
          />
        </div>
      )}
      {!win && (
        <div
          className={`flex flex-column justify-center items-center overflow-hidden h-screen bg-[#ffc6c6] ${
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
                <BoxDroppable id="box-1" items={candies} />

                <BoxDroppable id="box-2" items={candies2} />

                <BoxDroppable id="box-3" items={candies3} />
              </div>

              <div className="flex flex-col items-center">
                <ul className="flex justify-center w-full">
                  <EmptySpaceDroppable
                    id="default-box"
                    items={candiesDefault}
                  />
                </ul>
              </div>

              <DragOverlay transition={null}>
                {activeId ? (
                  <Candy
                    id={activeId.id}
                    image={activeId.image}
                    type={activeId.type}
                    isDragging
                  />
                ) : null}
              </DragOverlay>
            </main>
          </DndContext>
        </div>
      )}
    </>
  );
}
