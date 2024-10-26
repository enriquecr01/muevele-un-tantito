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
import { defaultFood } from "@LevelFood/mocks";
import EmptySpaceDroppable from "@LevelFood/components/EmptySpaceDroppable";
import { verifyWin } from "@LevelFood/win-conditions";

type LevelFoodProps = {
  navigation?: NavigationHelper;
};

export function LevelFood({ navigation }: LevelFoodProps) {
  const [activeId, setActiveId] = useState<IFood>();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  const [foodDefault, setFoodDefault] = useState<IFood[]>([]);

  const [tacos, setTacos] = useState<IFood[]>([]);
  const [tamales, setTamales] = useState<IFood[]>([]);
  const [quesadillas, setQuesadillas] = useState<IFood[]>([]);
  const [elote, setElote] = useState<IFood[]>([]);

  const putItemSound = new Audio(putItem);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.data.current.data);
  };

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

    putItemSound.play();
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

  const style = {
    background:
      "radial-gradient(circle, rgba(255,247,209,1) 0%, rgba(255,243,183,1) 100%)",
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
            nextLevel="LevelBakery"
            navigation={navigation}
            reset={reset}
          />
        </div>
      )}
      {!win && (
        <div
          className={`flex flex-column justify-center items-center overflow-hidden h-screen bg-[#fff7d1] ${
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
                  <EmptySpaceDroppable id="default-box" items={foodDefault} />
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
