import React, { useEffect, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Container from "@LevelAltarDeMuertos/components/Container";
import Concha from "@LevelAltarDeMuertos/components/Level";
import putItem from "@sounds/putitem.mp3";
import { verifyWin } from "@LevelAltarDeMuertos/win-conditions";
import { Helmet } from "react-helmet";
import ScreenWin from "pages/ScreenWin";
import "animate.css";
import { shuffleAndVerifyArraysAreNotSorted } from "@utils/arrays";
import { initialLevels } from "@LevelAltarDeMuertos/mocks";
import { NavigationHelper } from "@utils/components/Navigation/NavigationContainer";

type LevelAltarDeMuertosProps = {
  navigation?: NavigationHelper;
};

export function LevelAltarDeMuertos({ navigation }: LevelAltarDeMuertosProps) {
  const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
  const [activeId, setActiveId] = useState();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  const putItemSound = new Audio(putItem);

  useEffect(() => {
    const shuffledConchas = shuffleAndVerifyArraysAreNotSorted(initialLevels);
    setItems(shuffledConchas);
  }, [setItems]);

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

  const reset = () => {
    const shuffledConchas = shuffleAndVerifyArraysAreNotSorted(initialLevels);
    setItems(shuffledConchas);
    setRemoveLevel(false);
    setWin(false);
  };

  const style = {
    background:
      "radial-gradient(circle, rgba(173,159,240,1) 0%, rgba(201,186,255,1) 100%)",
  };

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Panadería</title>
      </Helmet>
      {win && (
        <div
          className={`${win ? "animate__animated animate__jackInTheBox" : ""}`}
        >
          <ScreenWin
            nextLevel="LevelCandy"
            navigation={navigation}
            reset={reset}
          />
        </div>
      )}
      {!win && (
        <div
          className={`flex flex-column justify-center items-stretch overflow-hidden h-screen bg-[#ad9ff0] ${
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
            <Container id="levels" items={items} />
            <DragOverlay transition={null}>
              {activeId ? <Concha id={activeId} isDragging /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      )}
    </>
  );
}
