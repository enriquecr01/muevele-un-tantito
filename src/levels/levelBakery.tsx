import React, { useState } from "react";
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
import Container from "@components/levelBakery/Container";
import Concha from "@components/levelBakery/Concha";
import putItem from "@sounds/putitem.mp3";
import {
  oneLineColorCondition,
  twoVerticalLinesColorsCondition,
} from "@win-conditions/levelBakery";
import { Helmet } from "react-helmet";
import ScreenWin from "pages/screenWin";
import "animate.css";

export function LevelBakery() {
  const initialItems = [
    "chocolate-1",
    "chocolate-4",
    "chocolate-2",
    "chocolate-5",
    "chocolate-6",
    "chocolate-3",
    "vainilla-3",
    "vainilla-5",
    "vainilla-2",
    "vainilla-6",
    "vainilla-1",
    "vainilla-4",
    "fresa-5",
    "fresa-4",
    "fresa-1",
    "fresa-3",
    "fresa-2",
    "fresa-6",
  ];

  const [items, setItems] = useState([
    "chocolate-4",
    "vainilla-4",
    "vainilla-3",
    "chocolate-2",
    "fresa-2",
    "chocolate-3",
    "chocolate-6",
    "vainilla-5",
    "fresa-1",
    "vainilla-6",
    "vainilla-1",
    "fresa-5",
    "fresa-4",
    "chocolate-5",
    "fresa-3",
    "chocolate-1",
    "vainilla-2",
    "fresa-6",
  ]);
  const [activeId, setActiveId] = useState();
  const [activeColor, setActiveColor] = useState();
  const [win, setWin] = useState(false);
  const [removeLevel, setRemoveLevel] = useState(false);

  const putItemSound = new Audio(putItem);

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

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Panadería</title>
      </Helmet>
      {win && (
        <div
          className={`${win ? "animate__animated animate__jackInTheBox" : ""}`}
        >
          <ScreenWin />
        </div>
      )}
      {!win && (
        <div
          className={`flex flex-column justify-center overflow-hidden ${
            removeLevel ? "animate__animated animate__fadeOutDown" : ""
          }`}
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
