import React, { useEffect, useState } from "react";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
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
  Container,
  verifyWin,
  initialAlebrijes,
  Alebrije,
} from "@LevelAlebrijes/index";

type LevelAlebrijesProps = {
  navigation?: NavigationHelper;
};

export function LevelAlebrijes({ navigation }: LevelAlebrijesProps) {
  const [items, setItems] = useState<string[]>([]);
  const [activeId, setActiveId] = useState();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  const { sensors } = useMueveleTantitoSensors();

  const putItemSound = new Audio(putItem);

  function shuffleArrayAndVerify(array) {
    const arrayShuffled = shuffleArray(array);

    if (verifyWin(arrayShuffled)) shuffleArrayAndVerify(array);

    return arrayShuffled;
  }

  useEffect(() => {
    const shuffledConchas = shuffleArrayAndVerify(initialAlebrijes);
    setItems(shuffledConchas);
  }, [setItems]);

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  async function handleDragEnd(event) {
    const { active, over } = event;
    const { id: overId } = over;
    let win = false;

    if (activeId === overId) {
      return;
    }

    setItems((items) => {
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

      win = verifyWin(newItems);

      if (win) {
        setTimeout(() => {
          setRemoveLevel(true);
        }, 1000);
        setTimeout(() => {
          setWin(win);
        }, 2000);
      }

      setActiveId(null);
      putItemSound.play();
      return newItems;
    });
  }

  const style = {
    background:
      "radial-gradient(circle, rgba(236,172,93,1) 0%, rgba(222,153,67,1) 100%)",
  };

  const reset = () => {
    const shuffledConchas = shuffleArrayAndVerify(initialAlebrijes);
    setItems(shuffledConchas);
    setRemoveLevel(false);
    setWin(false);
  };

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Alebrijes</title>
      </Helmet>
      {win && (
        <div
          className={`${win ? "animate__animated animate__jackInTheBox" : ""}`}
        >
          <ScreenWin
            nextLevel="LevelAltarDeMuertos"
            navigation={navigation}
            reset={reset}
          />
        </div>
      )}
      {!win && (
        <div
          className={`flex flex-column justify-center items-center overflow-hidden h-screen bg-[#ecac5d]  ${
            removeLevel ? "animate__animated animate__fadeOutDown" : ""
          }`}
          style={style}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <Container id="container" items={items} />
            <DragOverlay transition={null}>
              {activeId ? (
                <Alebrije id={activeId} alebrije={activeId} isDragging />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      )}
    </>
  );
}
