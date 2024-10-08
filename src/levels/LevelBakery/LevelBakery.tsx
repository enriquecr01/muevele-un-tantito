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
import Container from "@LevelBakery/components/Container";
import Concha from "@LevelBakery/components/Concha";
import putItem from "@sounds/putitem.mp3";
import {
  oneLineColorCondition,
  twoVerticalLinesColorsCondition,
} from "@LevelBakery/win-conditions";
import { Helmet } from "react-helmet";
import ScreenWin from "pages/ScreenWin";
import "animate.css";
import { shuffleArray } from "@utils/arrays";
import { initialConchas } from "@LevelBakery/mocks";
import { NavigationHelper } from "@utils/components/Navigation/NavigationContainer";

type LevelBakeryProps = {
  navigation?: NavigationHelper;
};

export function LevelBakery({ navigation }: LevelBakeryProps) {
  const [items, setItems] = useState<string[]>([]);
  const [activeId, setActiveId] = useState();
  const [activeColor, setActiveColor] = useState();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  const putItemSound = new Audio(putItem);

  useEffect(() => {
    const shuffledConchas = shuffleArray(initialConchas);
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

    const splitedId = id.split("-");
    const color = splitedId[0];

    setActiveId(id);
    setActiveColor(color);
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

      win = oneLineColorCondition(newItems);
      if (!win) {
        win = twoVerticalLinesColorsCondition(newItems);
      }

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
    const shuffledConchas = shuffleArray(initialConchas);
    setItems(shuffledConchas);
    setRemoveLevel(false);
    setWin(false);
  };

  const style = {
    background:
      "radial-gradient(circle, rgba(255,220,69,1) 0%, rgba(252,199,19,1) 100%)",
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
          className={`flex flex-column justify-center items-center overflow-hidden h-screen bg-[#ffdc45] ${
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
            <Container id="charola" items={items} />
            <DragOverlay transition={null}>
              {activeId ? (
                <Concha id={activeId} color={activeColor} isDragging />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      )}
    </>
  );
}
