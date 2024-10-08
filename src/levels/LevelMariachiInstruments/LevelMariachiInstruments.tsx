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
import Container from "@LevelMariachiInstruments/components/Container";
import Instrument from "@LevelMariachiInstruments/components/Instrument";
import putItem from "@sounds/putitem.mp3";
import { Helmet } from "react-helmet";
import ScreenWin from "pages/ScreenWin";
import "animate.css";
import { shuffleArray } from "@utils/arrays";
import { verifyWin } from "@LevelMariachiInstruments/win-conditions";
import { initialInstruments } from "@LevelMariachiInstruments/mocks";
import { NavigationHelper } from "@utils/components/Navigation/NavigationContainer";

type LevelMariachiInstrumentsProps = {
  navigation?: NavigationHelper;
};

export function LevelMariachiInstruments({
  navigation,
}: LevelMariachiInstrumentsProps) {
  const [items, setItems] = useState<string[]>([]);
  const [activeId, setActiveId] = useState();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  const putItemSound = new Audio(putItem);

  function shuffleArrayAndVerify(array) {
    const arrayShuffled = shuffleArray(array);

    if (verifyWin(arrayShuffled)) shuffleArrayAndVerify(array);

    return arrayShuffled;
  }

  useEffect(() => {
    const shuffledConchas = shuffleArrayAndVerify(initialInstruments);
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

  const style = {
    background:
      "radial-gradient(circle, rgba(0,165,255,1) 0%, rgba(0,141,255,1) 89%, rgba(0,104,255,1) 100%)",
  };

  const reset = () => {
    const shuffledConchas = shuffleArrayAndVerify(initialInstruments);
    setItems(shuffledConchas);
    setRemoveLevel(false);
    setWin(false);
  };

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Instrumentos</title>
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
          className={`flex flex-column justify-center items-center overflow-hidden h-screen bg-[#00a5ff]  ${
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
                <Instrument id={activeId} instrument={activeId} isDragging />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      )}
    </>
  );
}
