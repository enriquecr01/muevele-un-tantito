import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import putItem from "@sounds/putitem.mp3";
import { Helmet } from "react-helmet";
import ScreenWin from "pages/ScreenWin";
import "animate.css";
import { shuffleArray } from "@utils/arrays";
import { NavigationHelper } from "@utils/components/Navigation/NavigationContainer";
import { Food, IFood } from "@LevelFood/components/Food";
import TacosBox from "@LevelFood/components/TacosBox";
import TamalesBox from "@LevelFood/components/TamalesBox";
import QuesadillasBox from "@LevelFood/components/QuesadillasBox";
import EloteBox from "@LevelFood/components/EloteBox";
import {
  lollipopCandies,
  rectangleCandies,
  roundedCandies,
  defaultFood,
} from "@LevelFood/mocks";
import EmptySpaceDroppable from "@LevelFood/components/EmptySpaceDroppable";
import { verifyWin } from "@LevelFood/win-conditions";

type LevelFoodProps = {
  navigation?: NavigationHelper;
};

export function LevelFood({ navigation }: LevelFoodProps) {
  const [activeId, setActiveId] = useState<IFood>();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  const [candiesDefault, setCandiesDefault] = useState<IFood[]>([]);
  const [candies, setCandies] = useState<IFood[]>([]);
  const [candies2, setCandies2] = useState<IFood[]>([]);
  const [candies3, setCandies3] = useState<IFood[]>([]);

  const [tacos, setTacos] = useState<IFood[]>([]);
  const [tamales, setTamales] = useState<IFood[]>([]);
  const [quesadillas, setQuesadillas] = useState<IFood[]>([]);
  const [elote, setElote] = useState<IFood[]>([]);

  const putItemSound = new Audio(putItem);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.data.current.data);
  };

  const addToBox = (e: DragEndEvent) => {
    const newItem = { ...e.active.data.current.data };
    const { active, over } = e;
    if (
      (e.over?.id !== "default-box" &&
        e.over?.id !== "tacos" &&
        e.over?.id !== "tamales" &&
        e.over?.id !== "quesadillas" &&
        e.over?.id !== "elote") ||
      !newItem
    )
      return;

    const currentBox = active.data.current.data.currentBox;
    const overBox = over.id;

    if (currentBox === overBox) return;

    if (currentBox === "elote" && elote.length >= 1) return;

    if (currentBox === "elote" && elote.length >= 1) return;

    let currentArray = [];
    let tempArray = [];

    switch (currentBox) {
      case "default-box":
        currentArray = [...candiesDefault];
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
        tempArray = [...candiesDefault];
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

    const index = currentArray.findIndex((candy) => candy.id === active.id);
    newItem.currentBox = overBox;

    currentArray.splice(index, 1);
    tempArray.push(newItem);

    switch (currentBox) {
      case "default-box":
        setCandiesDefault(currentArray);
        break;
      case "tacos":
        setTacos(currentArray);
        break;
      case "tamales":
        setTamales(currentArray);
        break;
      case "quesadillas":
        setQuesadillas(tempArray);
        break;
      case "elote":
        setElote(tempArray);
        break;
    }

    switch (overBox) {
      case "default-box":
        setCandiesDefault(tempArray);
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
    const candiesDefaultArrays: IFood[] = [...defaultFood];
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

  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 8,
      },
    }),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const reset = () => {
    const candiesDefaultArrays: IFood[] = [
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
      "radial-gradient(circle, rgba(193,225,193,1) 0%, rgba(206,228,171,1) 100%)",
  };

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Comida</title>
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
          className={`flex flex-column justify-center items-center overflow-hidden h-screen bg-[#c1e1c1] ${
            removeLevel ? "animate__animated animate__fadeOutDown" : ""
          }`}
          style={style}
        >
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={addToBox}
            sensors={sensors}
          >
            <main className="flex flex-col items-center w-full h-full md:p-4">
              <div className="flex flex-row items-center justify-center w-full lg:w-3/6 h-64 lg:h-80">
                <div className="h-5/6 w-1/3">
                  <div className="flex flex-col h-full">
                    <TacosBox items={tacos} />
                    <TamalesBox items={tamales} />
                  </div>
                </div>

                <QuesadillasBox items={quesadillas} />

                <EloteBox items={elote} />
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
                  <Food
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
